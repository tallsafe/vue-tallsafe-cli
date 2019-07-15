<template>
    <div class="video-container">
      <video src="@/assets/video/test.mp4" autoplay="autoplay" muted="muted" :style="videoStyle" @contextmenu.prevent="showMenu($event)"  @click.prevent="closeMenu($event)">
        您的浏览器不支持 video 标签。
      </video>

      <div class="videoControls" @contextmenu.prevent=""> 
          <div class="controlWarp">
              <button class="playBtn" title="Play">自定义</button> 
          </div> 
      </div> 

      <div>
        <RightMenu
        :popItems="popItems"
        :mouse="mouse"
        @ListItemClick="ListItemClick"
        :borderRadius="borderRadius"
        ></RightMenu>
      </div>
    </div>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import videojs from 'video.js'
import RightMenu from '@/components/RightMenu'

import { mapGetters } from 'vuex'
export default {
  components: {
    RightMenu
  },
  props: {
    vid:{
      type:String
    },
    width: {
      type: String,
      default: 12
    },
    height: {
      type: String,
      default: 4
    },

  },
  data() {
    return {
      //hasContextMenu:false,
      popItems:[
        {
          class:'',
          txt:'1',
          handler:'one'
        },
        {
          class:'',
          txt:'2',
          handler:'two'
        },
      ],
      mouse:[],
      borderRadius:'3px',
      
    }
  },
  computed: {
    videoStyle(){
      let result = {};

      result.width= this.width;
      result.height= this.height;

      return result;
    }
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    showMenu(e){
      this.mouse=[];
      this.mouse.push(e.clientX);
      this.mouse.push(e.clientY);

    },
    closeMenu(e){
      this.mouse=[];
      this.mouse.push('close');
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    ListItemClick(handler){
      console.log(handler,'handler');
      this.mouse=['close'];
      console.log(typeof this.one,'typeof');
      console.log(typeof this[handler],'typeof');
      if (typeof this[handler] === 'function') {
        this[handler]();
      } else {
         this.$message(`没有找到该操作`);
      }
    },
    one(){

    }
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.video-container{
  height:100%;
  width:100%;
  overflow:hidden;
  position:relative;

  video{
    object-fit:fill;
    padding-bottom:3px;
  }

  .videoControls{
    width:100%;
    position: absolute;
    bottom: 5px;
    .controlWarp{
      padding:2px;

    }
    
  }

        
}

</style>


