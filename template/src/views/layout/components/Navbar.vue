<template>
  <div class="navbar">
    <div class="brand lg" v-if="isOpen">韬安信息</div>
    <div class="brand mini" v-if="!isOpen">韬</div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <headerMenu></headerMenu>
    <el-tooltip content="换肤" effect="dark" placement="bottom">
      <theme-picker class="right-menu-item hover-effect"/>
    </el-tooltip>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ThemePicker from '@/components/ThemePicker'
import Hamburger from '@/components/Hamburger'
import headerMenu from './headerMenu.vue'
export default {
  data() {
    return {
      isOpen:true,
      theme:""
    }
  },
  components: {
    Hamburger,
    ThemePicker,
    headerMenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      let vue = this;
      this.$store.dispatch('ToggleSideBar');
      if(!this.sidebar.opened){
        this.$el.querySelector('.lg').style.width='36px';
        setTimeout(function(){
          vue.isOpen = false;
        } , 100)
      }else{
        this.isOpen = true;
        setTimeout(function(){
          vue.$el.querySelector('.lg').style.width='180px';
        }, 50)
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: #409eff;
  display:flex;
  .brand{
    display: inline-block;
    height: 50px;
    float: left;
    font-size: 20px;
    color:#fff;
    text-align: center;
    font-weight: bold;
    transition: width .3s;
    img{
      width:36px;
    }
  }
  .lg{
    width:180px;
  }
  .mini{
    width:36px;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

