<template>
    <el-dialog :title="RoleAuth" class='diaClass' :close-on-click-modal="false" :modal='false' width="350px" :visible.sync="visible">
        <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="pval"
            style="height:300px"
            ref="menuListTree"
            show-checkbox>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { getPerMissionList } from "@/api/permission";
    import { getRolePermission,updateRolePermission } from "@/api/role";
    export default {
        data() {
            return {
                visible: false,
                RoleAuth: "配置权限",
                chooseFunc: [],
                roleID: "",
                menuList:[],
                menuListTreeProps: {
                    label: "pname",
                    children: "children"
                },
            };
        },
        methods: {
            init(id) {
                this.visible = true;
                this.roleID = id;
                getPerMissionList().then(response => {
                    let res = response.permMap,
                        data = [],
                        array = [];
                    for(let key in res){
                        for(let item of res[key]){
                            data.push(item)
                        }
                    }
                    for(let el of data){
                        if(el.parent===null){
                            array.push(el);
                            this.getChildren(el,data);
                        }
                    };
                    this.menuList = array;
                    getRolePermission(id).then(response => {
                        console.log(response);
                        this.$refs.menuListTree.setCheckedKeys(response.menuPvals);
                    })
                })
            },
            getChildren(item,data){
                for(let el of data){
                    if(el.parent===item.pval){
                        item.children.push(el);
                        this.getChildren(el,data);
                    }
                }
            },
            // 表单提交
            dataFormSubmit() {
                let data = this.$refs.menuListTree.getCheckedNodes(),
                    array = [];
                for(let el of data){
                    array.push({
                        rid:this.roleID,
                        ptype:el.ptype,
                        pvals:[el.pval]
                    })
                }
                updateRolePermission(array).then(response => {
                    this.$message({
                        message: "操作成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                })
            }
        }
    };
</script>

<style>
    .funcCheckBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .funcCheckBox .el-checkbox {
        margin-right: 0px !important;
        margin-bottom: 10px;
    }
    .diaClass .el-dialog{
        height:500px;
    }
    .diaClass .el-dialog__body{
        height:calc(100% - 114px);
        overflow-y: scroll;
    }
</style>
