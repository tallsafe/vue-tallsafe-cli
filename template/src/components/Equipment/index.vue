<template>
    <div class="flexContainer">
        <el-select v-model="deviceID" placeholder="请选择" @visible-change="toChooseEquipment">
        </el-select>
        <div class="el-input-group__append" @click="chooseMap" v-if="isHasChooseMap">
            <i class="el-icon-news"></i>
        </div>
        <el-dialog
            class='chooseEquipment'
            :visible.sync="chooseEquipmentVisible"
            :modal="false"
            width="579px">
            <div class="flex">
                <div class="search">
                    <el-input placeholder="输入筛选" v-model="filterText"></el-input>
                    <el-tree
                        :data='fomatDevice'
                        :filter-node-method="filterNode"
                        show-checkbox
                        node-key="id"
                        ref='tree'
                        @check-change='checkChange'>
                    </el-tree>
                </div>
                <div class="searchResult">
                    <div class="checkedLength">已选\{{checkedLength}}</div>
                    <div class="checkedResult">
                        <div v-for="el in checkedResult">\{{el.Name}}</div>
                    </div>
                </div>
            </div>
            <div class="checkButton">
                <el-button @click="chooseAll">全选</el-button>
                <el-button @click="empty">清空</el-button>
                <el-button @click="chooseEquipmentVisible=false">取消</el-button>
                <el-button type="primary" @click='returnData'>确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type='text/babel'>
    export default {
        name:'equipment',
        data() {
            return {
                filterText:"",
                fomatDevice:[],
                deviceID:'选择了所有点位',
                checkedResult:[],
                checkedID:[],
                chooseEquipmentVisible:false,
                checkedLength:0
            }
        },
        watch:{
            filterText(val){
                this.$refs.tree.filter(val);
            },
            device(now,past){
                this.fomatDevice = now;
            },
            receiveDevice(now,past){
                this.deviceID = '选择了'+now.length+'条';
            }
        },
        methods:{
            toChooseEquipment(data){
                let vue = this;
                if(data===true){
                    setTimeout(function(){
                        for(let el of document.querySelectorAll('.el-select-dropdown.el-popper')){
                            el.style.display='none';
                        }
                        vue.chooseEquipmentVisible = true;
                        let node = [];
                        if(vue.receiveDevice.length!==0){
                            for(let el of vue.receiveDevice){
                                for(let dev of vue.allDevice){
                                    if(el===dev.DeviceID){
                                        dev.label = dev.Name;
                                        dev.id = dev.DeviceID;
                                        node.push(dev);
                                    }
                                }
                            }
                            setTimeout(function(){
                                vue.$refs.tree.setCheckedNodes(node);
                            },200) 
                        }
                    },500)
                }
            },
            filterNode(value,data){
                if(!value) return true;
                return data.label.indexOf(value)!==-1||(data.hasOwnProperty('DeviceID')&&data.DeviceID.indexOf(value)!==-1)
            },
            checkChange(value){
                let data = this.$refs.tree.getCheckedNodes(),
                    array = [],
                    ID = [];
                for(let el of data){
                    if(el.hasOwnProperty('DeviceID')){
                        array.push(el);
                        ID.push(el.DeviceID);
                    }
                }
                this.checkedID = ID;
                this.checkedResult = array;
                this.checkedLength = array.length;
            },
            returnData(){
                // if(this.checkedID.length>1024){
                //     this.$message({
                //         message:"点位不能超过1024个",
                //         type:"error"
                //     })
                //     return;
                // }
                if(this.checkedID.length===0){
                    this.deviceID = '选择了所有点位';
                }else{
                    this.deviceID = '选择了'+this.checkedID.length+'条';
                }
                this.chooseEquipmentVisible = false;
                this.$emit('returnData',this.checkedID);
            },
            empty(){
                this.$refs.tree.setCheckedKeys([]);
            },
            chooseAll(){
                this.$refs.tree.setCheckedKeys([]);
                this.deviceID = '选择了所有点位';
                this.chooseEquipmentVisible = false;
                this.$emit('returnData',null);
            },
            chooseMap(){
                this.$emit('chooseMap');
            }
        },
        props:{
            device:{
                required:true,
                type:Array, 
                default:[]
            },
            receiveDevice:{
                type:Array, 
                default:function(){
                    return []
                }
            },
            allDevice:{
                type:Array, 
                default:function(){
                    return []
                }
            },
            isHasChooseMap:{
                type:Boolean, 
                default:false
            }
        },
    }
</script>
<style>
    .flexContainer .el-input-group__append{
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .flexContainer .el-input__inner{
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
    }
</style>
<style lang='stylus' rel='stylesheet/stylus' scoped>
    .flexContainer
        display:flex;
    .chooseEquipment
        .flex
            display:flex;
            height: calc(100% - 53px);
            .search
                width:270px;
                border-right:1px solid #e4e7ea;
                padding:20px;
                height:100%;
                overflow: hidden;
            .searchResult
                width:249px;
                padding:20px 10px;
                overflow:hidden;
                .checkedLength
                    margin-bottom:15px;
                    font-size:12px;
                .checkedResult
                    height:350px;
                    width:275px;
                    overflow-y:scroll;
                    overflow-x:hidden;
                    div
                        font-size:12px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        text-align:left;
                        padding-left:10px;
        .checkButton
            padding:10px 0px;
    
    .chooseEquipment .el-dialog__header{
        display: none;
    }

    .chooseEquipment .el-dialog__body{
        padding:0;
        height:100%;
    }

    .chooseEquipment .el-input{
        margin-bottom:20px;
    }

    .chooseEquipment .el-dialog{
        height:411px;
    }

    .chooseEquipment .el-tree{
        height:320px;
        width: 310px;
        overflow-y: scroll;
    }

    .chooseEquipment .el-tree-node__label{
        font-size: 12px;
    }

    .chooseEquipment .el-button+.el-button{
        margin-left:30px;
    }

    .chooseEquipment .el-button--small{
        padding:9px 40px;
    }

</style>