<script setup>
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import { pauseMusic } from '../utils/player';
  import { addSong, setShuffledList } from '../utils/player'
  import { useRouter } from 'vue-router';
  import { usePlayerStore } from '../store/playerStore'
  import { storeToRefs } from 'pinia'
  const router = useRouter()
  const playerStore = usePlayerStore()
  const { playing, progress, playMode, currentMusic, currentIndex, listInfo, songList, shuffledList, shuffleIndex, songId, widgetState, playlistWidgetShow, lyricShow } = storeToRefs(playerStore)

  const clearPlaylist = () => {
    playlistWidgetShow.value = false
    pauseMusic()
    const clearMusic = setTimeout(() => {
      songList.value = null
      listInfo.value = null
      songId.value = null
      shuffledList.value = null
      currentIndex.value = 0
      shuffleIndex.value = 0
      currentMusic.value.unload()
      currentMusic.value = null
      progress.value = 0
      if(!widgetState.value) widgetState.value = true
      clearTimeout(clearMusic)
    }, 300);
  }

  const checkArtist = (artistId) => {
    if(songList.value[currentIndex.value].type != 'local') {
      router.push('/mymusic/artist/' + artistId)
      playerStore.forbidLastRouter = true
      if(!widgetState.value) {widgetState.value = true;playlistWidgetShow.value = false;lyricShow.value = false}
    }
  }

  const play = (id, index) => {
    addSong(id, index, true)
  }

  const delCurrentSong = async (index, id) => {
    //·删除的是当前播放歌曲之前的
    if(index < currentIndex.value) {
      songList.value.splice(index, 1)
      currentIndex.value--
      if(playMode.value == 3) setShuffledList()
      return
    }
    //·删除的是当前播放歌曲之后的
    if(index > currentIndex.value) {
      songList.value.splice(index, 1)
      if(playMode.value == 3) setShuffledList()
      return
    }
    //·删除的是当前播放歌曲
    if(index == currentIndex.value) {
      let id = null
      let curIndex = null
      //·如果是最后一首
      if(index == songList.value.length - 1) {
        //且只有一首歌
        if(songList.value.length == 1) {clearPlaylist();return}
        //且不只有一首歌
        curIndex = index - 1
        id = songList.value[curIndex].id
        addSong(id, curIndex, playing.value)
        songList.value.splice(index, 1)
        if(playMode.value == 3) setShuffledList()
      } else {
      //·如果不是最后一首
        curIndex = currentIndex.value + 1
        id = songList.value[curIndex].id
        addSong(id, curIndex, playing.value)
        songList.value.splice(index, 1)
        currentIndex.value--
        if(playMode.value == 3) setShuffledList()
      }
    }
  }
</script>

<template>
    <div class="playlist-widget">
      <div class="playlist-widget-header">
        <div class="playlist-widget-info">
          <span class="info-title">当前播放</span>
          <span class="info-num">({{songList.length}})</span>
        </div>
        <svg t="1670563159799" @click="clearPlaylist()" class="playlist-widget-delete" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4514" width="200" height="200"><path d="M224.561403 320 224.561403 896 778.105263 896 778.105263 320 712.982456 320 712.982456 832 289.68421 832 289.68421 320 224.561403 320 224.561403 320ZM387.368421 320.664062 452.491228 320.664062 452.491228 768.664062 387.368421 768.664062 387.368421 320.664062 387.368421 320.664062ZM550.175438 320.664062 615.298246 320.664062 615.298246 768.664062 550.175438 768.664062 550.175438 320.664062 550.175438 320.664062ZM387.368421 192 192 192 192 256 810.666664 256 810.666664 192 647.859649 192 647.859649 128 387.368421 128 387.368421 192 387.368421 192Z" p-id="4515"></path></svg>
      </div>
      <div class="line"></div>
      <RecycleScroller
        class="playlist-widget-item"
        :items="songList.slice(0, songList.length + 1)"
        :item-size="37"
        key-field="id"
        v-slot="{ item, index }"
      >
        <div class="list-item" :class="{'list-item-playing': songId == item.id}" @dblclick="play(item.id, index)">
          <div class="item-info">
            <svg v-show="(songId == item.id)" t="1669115475194" class="playing-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10562" width="200" height="200"><path d="M158.249961 614.402466c37.219322 0 67.372153 30.559802 67.372153 68.272422v273.065023c0 37.700288-30.152831 68.260089-67.372153 68.260089S90.865475 993.440198 90.865475 955.739911V682.674888a68.753387 68.753387 0 0 1 19.731914-48.269194 66.977515 66.977515 0 0 1 47.652572-20.003228zM394.083329 0.04933c37.20699 0 67.372153 30.572134 67.372153 68.272422v887.418159c0 37.700288-30.165163 68.260089-67.372153 68.260089s-67.322823-30.559802-67.322824-68.260089V68.272422c0-37.700288 30.103501-68.223092 67.322824-68.223092zM629.916696 273.077355c37.20699 0 67.384486 30.559802 67.384486 68.260089v614.402467c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089v-614.402467c0-37.700288 30.165163-68.260089 67.384486-68.260089z m235.833368-136.544844a66.878855 66.878855 0 0 1 47.640239 20.003228 68.704057 68.704057 0 0 1 19.731914 48.269194v750.934978c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089V204.767936a68.753387 68.753387 0 0 1 19.731914-48.269195 66.928185 66.928185 0 0 1 47.652572-20.003227z m0 0" p-id="10563"></path></svg>
            <span class="item-name">{{item.name  || item.localName}}</span>
            <span class="item-separator"> - </span>
            <span class="item-author" @dblclick.stop @click="checkArtist(singer.id)" v-for="(singer, index) in item.ar">{{singer.name}}{{index == item.ar.length -1 ? '' : '/'}}</span>
          </div>
          <svg t="1670569532229" @dblclick.stop @click="delCurrentSong(index, item.id)" class="item-delete" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2597" width="200" height="200"><path d="M558.933333 529.066667l285.866667 285.866666-29.866667 29.866667-285.866666-285.866667-285.866667 285.866667-29.866667-29.866667 285.866667-285.866666L213.333333 243.2l29.866667-29.866667 285.866667 285.866667L814.933333 213.333333l29.866667 29.866667-285.866667 285.866667z" fill="#444444" p-id="2598"></path></svg>
        </div>
      </RecycleScroller>
    </div>
</template>

<style scoped lang="scss">
  .playlist-widget{
    width: 310Px;
    height: 0;
    background-color: rgba(225, 240, 240, 1);
    transition: 0.3s cubic-bezier(.19,.8,.49,.99);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    .playlist-widget-header{
      padding: 8Px 12Px 0 12Px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .playlist-widget-info{
        .info-title{
          font: 16Px SourceHanSansCN-Bold;
          color: black;
        }
        .info-num{
          font: 12Px SourceHanSansCN-Bold;
          color: rgb(118, 118, 118);
        }
      }
      .playlist-widget-delete{
        width: 20Px;
        height: 20Px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .line{
      margin: 8Px 0;
      width: 92%;
      height: 0.5Px;
      background-color: black;
    }
    .playlist-widget-item{
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar{
        display: none;
      }
      .list-item{
        width: 100%;
        padding: 8Px 12Px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s;
        &:hover{
            background-color: rgba(0, 0, 0, 0.045);
        }
        .item-info{
          width: 240Px;
          text-align: left;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-all;
          svg{
            margin-right: 6Px;
            width: 14Px;
            height: 14Px;
          }
          .item-name{
            font: 14Px SourceHanSansCN-Bold;
            color: black;
          }
          .item-separator{
            font: 12Px SourceHanSansCN-Bold;
            color: rgb(169, 169, 169);
          }
          .item-author{
            font: 12Px SourceHanSansCN-Bold;
            color: rgb(169, 169, 169);
            transition: 0.2s;
            &:hover{
              cursor: pointer;
              color: black;
            }
          }
        }
        .item-delete{
          width: 20Px;
          height: 20px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      // .list-item:last-child{
      //   margin-bottom: 8Px;
      // }
      .list-item-playing{
        background-color: rgba(0, 0, 0, 0.045);
      }
    }
  }
</style>