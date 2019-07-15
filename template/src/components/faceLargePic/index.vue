<template>
    <div>
        <el-dialog
            class="picdialog"
            :visible.sync="dialogVisible"
            :width="width">
            <div class="PicContainer">
                <div class="prev arrowButton" @click="prevImage" v-if="isHasOtherPic"><</div>
                <div class="infoContent">
                    <div class="img" v-loading='imgLoading'>
                        <img :src="choosePic.largeStorageUrl" :onerror="error" ref="img" @mousedown='moveStart'>
                        <div class="block" ref='block' v-show="showBlock"></div>
                    </div>
                </div>
                <div class="next arrowButton" @click="nextImage" v-if="isHasOtherPic">></div>
            </div>
        </el-dialog>
    </div>
</template>

<script type='text/babel'>
    export default {
        name:"largePic",
        data(){
            return{
               searchManResult:[],
               searchManVisible:false,
               dialogVisible:false,
               imgLoading:false,
               facePicSearchLoading:false,
               infoEmpty:false,
               showBlock:false,
               isBindloading:false,
               findInfoPicHold:80,
               clickedTime:{

               },
               clicked:1,
               chooseBase:"",
               base64Img:"",
               error:'this.src="'+require('../../assets/images/error.png')+'";this.style',
               orginTop:0,
               orginLeft:0,
               movingDisX:0,
               movingDisY:0
            }
        },
        mounted(){
           
        },
        props:{
            choosePic:{
                required:true,
                type:Object, 
                default:{}
            },
            width:{
                type:String,
                default:"1000px"
            },
            isHasOtherPic:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            show(){
                let vue = this;
                this.dialogVisible= true;
                this.base64Img='';
                setTimeout(function(){
                    let myimage = vue.$refs.img,
                        naturalWidth = myimage.naturalWidth,
                        naturalHeight = myimage.naturalHeight;
                    myimage.style.top=0;
                    myimage.style.left=0;
                    myimage.style.width = '100%';
                    myimage.parentElement.style.height = parseInt(vue.width)/naturalWidth*naturalHeight+'px';
                    myimage.style.height = '100%';
                    if (myimage.addEventListener) {
                        // IE9, Chrome, Safari, Opera
                        myimage.addEventListener("mousewheel", vue.MouseWheelHandler, false);
                        myimage.addEventListener("click", vue.dbclick, false);
                        // Firefox
                        myimage.addEventListener("DOMMouseScroll", vue.MouseWheelHandler, false);
                    }
                    // if(vue.choosePic.SubImageList.SubImageInfoObject[0].Width){
                    //     vue.showBlock = true;
                    //     let block = document.querySelector('.infoContent .img .block'),
                    //         img = document.querySelector('.infoContent .img img'),
                    //         nowwidth = img.offsetWidth,
                    //         nowheight = img.offsetHeight,
                    //         originWidth = vue.choosePic.SubImageList.SubImageInfoObject[0].Width,
                    //         originHeight = vue.choosePic.SubImageList.SubImageInfoObject[0].Height;
                    //     if(originWidth===0||originHeight===0){
                    //         block.style.left = 0+'px';
                    //         block.style.top = 0+'px';
                    //         block.style.width = 0+'px';
                    //         block.style.height = 0+'px';
                    //     }else{
                    //         block.style.left = vue.choosePic.LeftTopX*nowwidth/originWidth+'px';
                    //         block.style.top = vue.choosePic.LeftTopY*nowheight/originHeight+'px';
                    //         block.style.width = vue.choosePic.SubImageList.SubImageInfoObject[1].Width*nowwidth/originWidth+'px';
                    //         block.style.height = vue.choosePic.SubImageList.SubImageInfoObject[1].Height*nowheight/originHeight+'px';
                    //     }
                    // }else{
                    //     vue.showBlock = false;
                    // }
                },200)
            },

            dbclick(){
                if(this.clicked==1){
                    this.clickedTime.timeA=new Date();
                    this.clicked++;  
                }else if(this.clicked==2){
                    this.clickedTime.timeB=new Date();
                    if (Math.abs(this.clickedTime.timeA-this.clickedTime.timeB)<400){
                        this.clicked = 1;
                        let myimage = this.$refs.img;
                        myimage.style.top=0;
                        myimage.style.left=0;
                        myimage.style.width = '100%';
                        if(myimage.style.height!==''){
                            myimage.style.height = '100%';
                        }
                    }else{
                        this.clickedTime.timeA=new Date();
                    };
                }
            },
            MouseWheelHandler(event) {
                let oImg = this.$refs.img,
                    left = oImg.parentElement.getBoundingClientRect().left,
                    top = oImg.parentElement.getBoundingClientRect().top;
                let ev = event || window.event;//返回WheelEvent
                ev.preventDefault();
                let delta = ev.detail ? ev.detail > 0 : ev.wheelDelta < 0;
                let ratioL = (ev.clientX - oImg.offsetLeft-left) / oImg.offsetWidth,
                    ratioT = (ev.clientY - oImg.offsetTop-top) / oImg.offsetHeight,
                    ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
                    w = parseInt(oImg.offsetWidth * ratioDelta),
                    h = parseInt(oImg.offsetHeight * ratioDelta),
                    l = Math.round(ev.clientX-left - (w * ratioL)),
                    t = Math.round(ev.clientY- top- (h * ratioT));
                    oImg.style.width = w +'px';
                    oImg.style.height = h +'px';
                    oImg.style.left = l +'px';
                    oImg.style.top = t +'px';
            },
            prevImage(){
                let myimage = this.$refs.img;
                this.$emit('prevImage');
            },
            nextImage(){
                let myimage = this.$refs.img;
                this.$emit('nextImage');
            },
            pauseEvent(e){
                if(e.stopPropagation) e.stopPropagation();
                if(e.preventDefault) e.preventDefault();
                e.cancelBubble=true;
                e.returnValue=false;
                return false;
            },
            //移动
            moveStart(e){

                e = e || window.event;
                
                if(e.button===2){
                  return;  
                }
                let el = e.target;

                if(!el.classList.contains('resizeline')){

                    this.orginTop = parseFloat(el.style.top);

                    this.orginLeft = parseFloat(el.style.left);

                    this.movingDisX = e.clientX - el.offsetLeft;

                    this.movingDisY = e.clientY - el.offsetTop;
                
                    this.$refs.img.addEventListener('mousemove',this.moving,false);

                    this.$refs.img.addEventListener('mouseup',this.moveEnd,false);
                    
                }
            },
            moving(e){
               
                this.pauseEvent(e);
                e = e || window.event;

                let el = e.target;

                this.$refs.img.style.left = (e.clientX - this.movingDisX ) + 'px';

                this.$refs.img.style.top = (e.clientY - this.movingDisY ) + 'px';
            
            },
            moveEnd(e){
    
                e = e || window.event;

                let el = e.target;

                this.$refs.img.removeEventListener('mousemove',this.moving,false);

                this.$refs.img.removeEventListener('mouseup',this.moveEnd,false);
            },
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
   .PicContainer
        width:100%;
        height:100%;
        position:relative;
        .arrowButton
            position:absolute;
            top:40%;
            font-size:60px;
            color:#fff;
            cursor:pointer;
            z-index: 111;
        .prev
            left:0;
        .next
            right:0;
            color:#000;
        .infoContent
            height:100%;
            width:100%
            display:flex;
            justify-content: center;
            position:relative;
            .img
                height:100%;
                width:100%;
                // display:flex;
                // align-items:center;
                // justify-content: center;
                background-color:#000;
                position:relative;
                overflow:hidden;
                img
                    width:100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                .block
                    position:absolute;
                    border:2px solid #2a7efb;
                    border-radius:20px;
            .info
                background-color:#fff;
                width:300px;
                .title
                    font-size:16px;
                    font-weight:bolder;
                    margin:30px 0;
                .row
                    display:flex;
                    padding:5px 10px;
                    .label
                        color:#444;
                img
                    width:100%;
</style> 