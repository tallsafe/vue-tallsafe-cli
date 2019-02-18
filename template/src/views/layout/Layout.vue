<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/> -->
    <navbar/>
    <div class="main-container">
      <sidebar class="sidebar-container"/>
      <div class="content">
        <tags-view/>
        <app-main/>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain ,TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    TagsView,
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .content{
    width: 100%;
    height: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
