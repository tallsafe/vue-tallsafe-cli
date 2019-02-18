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
  background-color: #409eff;
}
.headerMenu .el-menu-item{
  background-color: inherit;
  color:#fff;
}
</style>


