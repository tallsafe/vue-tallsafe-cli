<template>
    <el-menu
      class="headerMenu"
      :default-active="$route.path"
      @select='selectMenu'
      router
      mode="horizontal">
      <el-menu-item v-for="route in permission_routers" :index="route.path" :key="route.path">\{{route.name}}</el-menu-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { getHeaderMenu } from '@/api/menu'
export default {
    name: 'headerMenu',
    computed: {
        ...mapGetters([
        'permission_routers',
        'roles'
        ]),
        variables() {
          return variables
        },
    },
    created(){
      let vue = this;
      if(Window.config.isWebGetMenu){
        getHeaderMenu().then(res => {
          this.$store.dispatch('WebGetRoute',{route:res.data,role:vue.roles});
        }).catch(() => {
          
        })
      }
    },
    methods:{
      selectMenu(index,indexPath){
        this.$store.dispatch('GenerateSideRouters',index);
      }
    }
}
</script>
<style scoped>
.el-menu--horizontal{
  display: inline;
}
.headerMenu{
  background-color: #376bf0;
}
.headerMenu .el-menu-item,.headerMenu .el-menu-item:hover{
  background-color: inherit;
}
.headerMenu .el-menu-item{
  color:#c9d3fa;
}
.headerMenu .el-menu-item:hover,.headerMenu .el-menu-item.is-active{
  color:#fff;
}
.headerMenu .el-menu-item.is-active{
  background-color: inherit;
  border-bottom: 5px solid #ffcc00!important;
}
</style>


