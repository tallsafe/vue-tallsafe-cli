<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar_opened',
      'permission_sideRouters'
    ]),
  },
  watch: {
    sidebar_opened(value){
      this.isHasSideMenu();
    },
    permission_sideRouters(value){
      this.isHasSideMenu();
    }
  },
  mounted() {
    // this.isHasSideMenu(this.permission_sideRouters);
    this.isHasSideMenu();
  },
  methods: {
    isHasSideMenu(){
      var value = this.permission_sideRouters;
      var flag = this.sidebar_opened;
      value===undefined?value = []:value;
      if(value.length>0){
        if(flag){
          this.$el.style.width = 'calc(100% - 250px)';
          this.$el.style.height = 'calc(100% - 130px)';
          this.$el.style.margin = '128px 5px 0px 250px';
        }else{
          this.$el.style.width = 'calc(100% - 41px)';
          this.$el.style.margin = '128px 5px 0px 68px';
        }
      }else{
        this.$el.style.width = '100%';
        this.$el.style.margin = '128px 5px 0px 0px';
      }
    },
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  margin:128px 15px 15px 195px;
  /* padding:20px; */
  min-height: calc(100% - 130px);
  width: calc(100% - 250px);
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
</style>
