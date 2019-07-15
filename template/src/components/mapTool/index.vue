<template>
    <div id="container"></div> 
</template>

<script type='text/babel'>
    export default {
        name:"mapTool",
        data(){
            return {
                
            }
        },
        mounted(){
            let map = new AMap.Map('container',{
                zooms: [13,20],
                zoom : 14,//设置地图初始化级别
                center : [121.455536,31.249452],//设置地图中心点坐标
                animation : true,//设置地图缩放动画效果
            });
        },
        computed:{
        
        },
        methods: {
        
        },
    }
</script>

<style scoped>
    #container {width:1000px; height: 1000px; }  
</style>