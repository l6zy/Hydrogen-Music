<script setup>
  import { ref } from 'vue'
  const show = ref(false)
  setInterval(() => {
    show.value = !show.value
  }, 3000);
</script>

<template>
    <div class="update-page" v-if="show">
        <div class="update-container">
            <div class="back-img"></div>
            <div class="update-animation">
                <svg t="1676121807390" class="update-icon-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18788" data-spm-anchor-id="a313x.7781069.0.i24" width="200" height="200"><path d="M803.5 671.7l-34.8-114.3c-3.9-12.6-17.2-19.7-29.8-15.9l-114.3 34.8c-6.3 1.9-11.3 6.3-14.1 11.7l53.7 28.7c-34.6 52.8-94.4 87.7-162.3 87.7-97.6 0-178.2-72.2-191.7-166.1h-89.5C234.7 681.3 355.2 793 502 793c101.8 0 190.8-53.9 240.5-134.7l59.3 31.6c2.8-5.4 3.6-11.9 1.7-18.2zM221.7 354.9l34.8 114.3c3.9 12.6 17.2 19.7 29.8 15.9l114.3-34.8c6.3-1.9 11.3-6.2 14.1-11.6L361 410c34.6-52.8 94.4-87.7 162.3-87.7 97.6 0 178.2 72.2 191.7 166.1h89.5c-14-143-134.6-254.8-281.3-254.8-101.8 0-190.8 53.9-240.5 134.7l-59.3-31.6c-2.7 5.4-3.6 11.9-1.7 18.2z m290.7-289c246.9 0 447.7 200.9 447.7 447.7 0 246.9-200.9 447.7-447.7 447.7-246.9 0-447.7-200.9-447.7-447.7 0-246.8 200.9-447.7 447.7-447.7z" fill="#ffffff" p-id="18789" data-spm-anchor-id="a313x.7781069.0.i25" class="selected"></path></svg>
            </div>
            <div class="update-img">
                <!-- <svg t="1676121383977" class="update-icon-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12662" width="200" height="200"><path d="M1024 651.636364 512 0 0 651.636364 279.272727 651.636364 279.272727 1024 698.181818 1024 698.181818 651.636364Z" fill="#ffffff" p-id="12663"></path></svg> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
  .update-page{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 999;
    .update-container{
        width: 100%;
        height: 0;
        background-color: black;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        overflow: hidden;
        animation: update-container-in 1s cubic-bezier(.5,0,.15,1) forwards;
        @keyframes update-container-in {
            0%{height: 0;}
            100%{height: 50%;}
        }
        .back-img{
            width: 70%;
            height: 200%;
            background-image: linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0)), url('../assets/img/halftone.png');
            transform: rotate(30deg);
            position: absolute;
            top: -60%;
            right: -15%;
            z-index: -1;
        }
        .update-animation{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.94;
            .update-icon-1{
                width: 35vh;
                height: 35vh;
                animation: update-icon-1 1.6s cubic-bezier(.5,0,.15,1) forwards;
                @keyframes update-icon-1 {
                    0%{transform: scale(3) rotate(0deg) translateX(0%);}
                    100%{transform: scale(1) rotate(0deg) translateX(-110%);}
                }
            }
        }
        
        .update-img{
            svg{
                width: 40vh;
                height: 40vh;
                opacity: 0.92;
                position: absolute;
                bottom: -50%;
                left: 20%;
            }
        }
    }
  }
</style>