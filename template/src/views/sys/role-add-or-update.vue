<template>
    <el-dialog :title="!dataForm.rid ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="角色名称" prop="rname">
                <el-input v-model="dataForm.rname" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="rdesc">
                <el-input v-model="dataForm.rdesc" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="角色值" prop="rval">
                <el-input v-model="dataForm.rval" placeholder="角色值"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { treeDataTranslate } from "@/utils";
    import { addRole, updateRole } from "@/api/role";
    export default {
        data() {
            return {
            visible: false,
            menuList: [],
            menuListTreeProps: {
                label: "name",
                children: "children"
            },
            dataForm: {
                id: 0,
                rname: "",
                remark: "",
                rval: ""
            },
            rval:[{
                value:"root",
                label:"管理员"
            },{
                value:"common",
                label:"普通用户"
            }],
            dataRule: {
                rname: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
                rval: [{ required: true, message: "角色值", trigger: "blur" }],
            },
            tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
            };
        },
        methods: {
            init(data) {
                this.visible = true;
                if (data) {
                    this.dataForm = JSON.parse(JSON.stringify(data));
                } else {
                    this.dataForm = {};
                }
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        if (this.dataForm.hasOwnProperty("rid")) {
                            updateRole({
                                rid: this.dataForm.rid,
                                rname: this.dataForm.rname,
                                rdesc: this.dataForm.rdesc,
                                rval: this.dataForm.rval,
                            }).then(response => {
                                if (response.code == 200) {
                                    this.$message({
                                        message: "操作成功",
                                        type: "success",
                                        duration: 1500,
                                        onClose: () => {
                                            this.visible = false;
                                            this.$emit("refreshDataList");
                                        }
                                    });
                                } else {
                                    this.$message.error(response.msg);
                                }
                            });
                        } else {
                            addRole({
                                rname: this.dataForm.rname,
                                rdesc: this.dataForm.rdesc,
                                rval: this.dataForm.rval
                            }).then(response => {
                                if (response.code == 200) {
                                    this.$message({
                                        message: "操作成功",
                                        type: "success",
                                        duration: 1500,
                                        onClose: () => {
                                            this.visible = false;
                                            this.$emit("refreshDataList");
                                        }
                                    });
                                } else {
                                    this.$message.error(response.msg);
                                }
                            });
                        }
                    }
                });
            }
        }
    };
</script>
