<script setup>
  import Banner from '../components/Banner.vue'
  import Recommendation from '../components/Recommendation.vue';
  import NewestSong from '../components/NewestSong.vue';
  import RecList from '../components/RecList.vue';
  
</script>

<template>
  <div class="home-page">
    <div class="page-header">
      <Banner class="banner"></Banner>
      <Recommendation class="recommendation"></Recommendation>
      <NewestSong class="newest-song"></NewestSong>
    </div>
    <div class="page-content">
      <RecList class="rec-list"></RecList>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home-page{
    height: 100%;
    display: flex;
    flex-direction: column;
    .page-header{
      padding-top: 2.8vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .banner{
        
      }
    }
    .page-content{
      margin-top: 40px;
      .rec-list{
        margin-bottom: 140px;
      }
    }
  }
</style>