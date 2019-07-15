<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" v-if="permission_sideRouters!==undefined&&permission_sideRouters.length>0">
    <div class="hamburger_nowMenu">
        <span class="monitor" v-if="sidebar.opened">\{{nowHeaderName}}</span>
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical">
      <sidebar-item v-for="route in permission_sideRouters" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import Hamburger from "@/components/Hamburger";
export default {
  components: { SidebarItem,Hamburger},
  computed: {
    ...mapGetters([
        'permission_sideRouters',
        'sidebar',
        'nowHeaderName'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  methods:{
      toggleSideBar() {
            let vue = this;
            this.$store.dispatch("ToggleSideBar");
            if (!this.sidebar.opened) {
                this.$el.querySelector(".lg").style.width = "68px";
                setTimeout(function() {
                    vue.isOpen = false;
                }, 100);
            } else {
                this.isOpen = true;
                setTimeout(function() {
                    vue.$el.querySelector(".lg").style.width = "250px";
                }, 50);
            }
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .hamburger_nowMenu{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #001b6d;
        height:60px;
        line-height: 60px;
        padding:0 20px;
        .monitor{
            color:#fff;
            font-size:14px;
        }
    }
    .hamburger-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right:20px;
        top:0;
        height:60px;
        line-height: 60px;
    }
</style>

