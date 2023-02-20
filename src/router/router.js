import { createRouter, createWebHashHistory } from 'vue-router'
import { isLogin } from '../utils/authority'
import { noticeOpen } from '../utils/dialog'
import HomePage from '../views/HomePage.vue'
import CloudDisk from '../views/CloudDisk.vue'
import LoginPage from '../views/LoginPage.vue'
import LoginContent from '../components/LoginContent.vue'
import MyMusic from '../views/MyMusic.vue'
import LibraryDetail from '../components/LibraryDetail.vue'
import RecommendSongs from '../components/RecommendSongs.vue'
import LocalMusicDetail from '../components/LocalMusicDetail.vue'
import SearchResult from '../views/SearchResult.vue'
import Settings from '../views/Settings.vue'

import { useUserStore } from '../store/userStore'
import { useLibraryStore } from '../store/libraryStore'
import { useLocalStore } from '../store/localStore'
import { storeToRefs } from 'pinia'
import { useOtherStore } from '../store/otherStore'
const userStore = useUserStore()
const libraryStore = useLibraryStore()
const { updateLibraryDetail } = libraryStore
const { libraryInfo } = storeToRefs(libraryStore)
const localStore = useLocalStore()
const otherStore = useOtherStore()

const routes = [
    {
        path: '/',
        name: 'homepage',
        component: HomePage,
        beforeEnter: (to, from, next) => {
            if(!userStore.homePage) next({name: 'mymusic'})
            else next()
        },
    },
    {
        path: '/cloud',
        name: 'clouddisk',
        component: CloudDisk,
        beforeEnter: (to, from, next) => {
            if(!userStore.cloudDiskPage) next({name: 'mymusic'})
            else if(isLogin()) next()
            else {next({name: 'login'});noticeOpen("请先登录", 2)}
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/mymusic',
        name: 'mymusic',
        component: MyMusic,
        children: [
            {
                path: '/mymusic/playlist/:id',
                name: 'playlist',
                component: LibraryDetail,
                beforeEnter: (to, from, next) => {
                    if(!libraryInfo.value || from.name != 'playlist') updateLibraryDetail(to.params.id, to.name)
                    next()
                }
            },
            {
                path: '/mymusic/album/:id',
                name: 'album',
                component: LibraryDetail,
                beforeEnter: (to, from, next) => {
                    if(!libraryInfo.value || from.name != 'album') updateLibraryDetail(to.params.id, to.name).then(() => {
                        next()
                        if(document.getElementById('libraryScroll'))
                            document.getElementById('libraryScroll').scrollTop = 0
                    })
                }
            },
            {
                path: '/mymusic/artist/:id',
                name: 'artist',
                component: LibraryDetail,
                beforeEnter: (to, from, next) => {
                    if(!libraryInfo.value || from.name != 'artist') updateLibraryDetail(to.params.id, to.name)
                    next()
                }
            },
            {
                path: '/mymusic/playlist/rec',
                name: 'rec',
                component: RecommendSongs,
                beforeEnter: (to, from, next) => {
                    if(isLogin()) {
                        libraryStore.updateRecommendSongs().then(() => {
                            next()
                        })
                    } else {
                        noticeOpen("请先登录", 2)
                        next({name: 'login'})
                    }
                }
            },
            {
                path: '/mymusic/local/files',
                name: 'localFiles',
                component: LocalMusicDetail,
                beforeEnter: (to, from, next) => {
                    if(from.name != 'localFiles') localStore.updateLocalMusicDetail(to.name, to.query)
                    next()
                }
            },
            {
                path: '/mymusic/local/album/:id',
                name: 'localAlbum',
                component: LocalMusicDetail,
                beforeEnter: (to, from, next) => {
                    if(from.name != 'localAlbum') localStore.updateLocalMusicDetail(to.name, null, to.params.id)
                    next()
                }
            },
            {
                path: '/mymusic/local/artist/:id',
                name: 'localArtist',
                component: LocalMusicDetail,
                beforeEnter: (to, from, next) => {
                    if(from.name != 'localArtist') localStore.updateLocalMusicDetail(to.name, null, to.params.id)
                    next()
                }
            },
        ],
        beforeEnter: (to, from, next) => {
            // if(isLogin()) next()
            // else if((from.name == 'homepage' || from.name == 'search') && to.fullPath != '/mymusic') next()
            // else next({name: 'login'})
            next()
        },
    },
    {
        path: '/login/account',
        name: 'account',
        component: LoginContent
    },
    {
        path: '/library',
        name: 'library',
        component: LibraryDetail
    },
    {
        path: '/search',
        name: 'search',
        component: SearchResult,
        beforeEnter: (to, from, next) => {
            otherStore.getSearchInfo(to.query.keywords)
            next()
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        beforeEnter: (to, from, next) => {
            next()
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router