<template>
    <el-dialog
        :title="!dataForm.uid ? '新增' : '修改'"
        :close-on-click-modal="false"
        :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="账号" prop="uname">
                <el-input v-model="dataForm.uname" placeholder="登录帐号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd" :class="{ 'is-required': !dataForm.uid }" v-if="!dataForm.uid">
                <el-input v-model="dataForm.pwd" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="nick">
                <el-input v-model="dataForm.nick" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="角色" size="mini" prop="roleIDs">
                <el-select v-model="dataForm.roleIDs" multiple collapse-tags>
                    <el-option v-for="role in roleList" :key="role.rid" :label="role.rname" :value="role.rid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" size="mini" prop="status" v-if="dataForm.uid">
                <el-radio-group v-model="dataForm.lock">
                <el-radio :label="0">禁用</el-radio>
                <el-radio :label="1">正常</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { mapState } from 'vuex'  
    import { addUser,updateUser } from '@/api/user'
    import { getRoleList } from '@/api/role'
    export default {
        data () { 
            var validateRole = (data, value, callback) => {
                if(value.length===0){
                    callback(new Error('角色不能为空'))
                }else{
                    callback();
                }
            }
            return {
                visible: false,
                roleList: [],
                dataForm: {
                    uname: '',
                    pwd:'',
                    nick: '',
                    roleIDs: [],
                    status: 1
                },
                dataRule: {
                    uname: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                        { message: '密码不能为空', trigger: 'blur' }
                    ],
                    roleIDs:[
                        { required: true,validator:validateRole, trigger: 'blur' }
                    ]
                }
            }
        },
        components:{},
        mounted(){
            this.getRoleList();
        },
        methods: {
            init (data) {
                this.visible = true;
                if(data){
                    this.dataForm = JSON.parse(JSON.stringify(data));
                }else{
                    this.dataForm = {};
                }
            },
            getRoleList(){
                getRoleList({
                    "rname": null,
                    "current": 1,
                    "size": 100
                }).then(response => {
                    this.roleList = response.page.records;
                })
            },
            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        if(this.dataForm.hasOwnProperty('uid')){
                            updateUser({
                                uid:this.dataForm.uid,
                                uname:this.dataForm.uname,
                                nick:this.dataForm.nick,
                                // pwd:this.dataForm.pwd,
                                rids:this.dataForm.roleIDs,
                                lock:this.dataForm.lock
                            }).then(response => {
                                if ( response.code == 200) {
                                    this.$message({
                                        message: '操作成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            this.visible = false
                                            this.$emit('refreshDataList')
                                        }
                                    })
                                } else {
                                    this.$message.error(response.msg)
                                }
                            })
                        }else{
                            addUser({
                                uname:this.dataForm.uname,
                                nick:this.dataForm.nick,
                                pwd:this.dataForm.pwd,
                                rids:this.dataForm.roleIDs,
                            }).then(response => {
                                if ( response.code == 200) {
                                    this.$message({
                                        message: '操作成功',
                                        type: 'success',
                                        duration: 1500,
                                        onClose: () => {
                                            this.visible = false
                                            this.$emit('refreshDataList')
                                        }
                                    })
                                } else {
                                    this.$message.error(response.msg)
                                }
                            })
                        }
                    }
                })
            }
        }
    }
</script>
