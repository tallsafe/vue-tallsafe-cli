<template>
    <div class="mod-user">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="dataList"
            border
            height="80%"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%;">
            <el-table-column
                type="selection"
                header-align="center"
                align="center"
                width="50">
            </el-table-column>
            <el-table-column
                prop="uname"
                header-align="center"
                align="center"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="nick"
                header-align="center"
                align="center"
                label="用户名">
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                width="80"
                label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.lock === 0" size="small" type="danger">禁用</el-tag>
                    <el-tag v-else size="small">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="角色">
                <template slot-scope="scope">
                    <el-tag v-for='el in scope.row.roleList' :key='el.rid' size="small">\{{el.rname}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="created"
                header-align="center"
                align="center"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updated"
                header-align="center"
                align="center"
                label="更新时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改信息</el-button>
                    <!-- <el-button type="text" size="small" @click="deleteHandle(scope)">修改密码</el-button> -->
                    <el-button type="text" size="small" @click="deleteHandle(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
    import AddOrUpdate from './user-add-or-update'
    import { getUserList,deleteUser } from '@/api/user'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                dataForm: {
                    userName: '',
                },
                roleList:[],
                dataList: [],
                dataList2: [{
                    uid:"",
                    nick:"",
                    status:"1",
                    created:"",
                }],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
            }
        },
        components: {
            AddOrUpdate
        },
        activated () {
            this.getDataList()
        },
        created(){
            this.getDataList()
        },
        computed:mapState({

        }),
        mounted(){
        
        },
        methods: {
            // 获取数据列表
            getDataList () {
                this.dataListLoading = true;
                let data = {
                    nick:this.dataForm.userName,
                    current:this.pageIndex,
                    size:this.pageSize
                };
                getUserList(data).then(response => {
                    this.dataList = response.page.records;
                    this.totalPage = response.page.total;
                    for(let el of response.page.records){
                        el.created = el.created.replace('.000+0000','').replace('T',' ');
                        if(el.hasOwnProperty('updated')&&el.updated!==null){
                            el.updated = el.updated.replace('.000+0000','').replace('T',' ');
                        }
                        el.roleIDs = [];
                        for(let role of el.roleList){
                            el.roleIDs.push(role.rid);
                        }
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 多选
            selectionChangeHandle (val) {
                let array = [];
                for(let el of val){
                    array.push(el.uid);
                }
                this.dataListSelections = array;
            },
            // 新增/修改
            addOrUpdateHandle (data) {
                this.addOrUpdateVisible = true;
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(data)
                })
            },
            // 删除
            deleteHandle (val) {
                let uids;
                if(this.dataListSelections.length===0){
                    uids= [val.row.uid];
                }else{
                    uids= this.dataListSelections;
                }
                this.$confirm(`确定删除操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(uids).then(response => {
                        if (response && response.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(response.msg)
                        }
                    })
                }).catch(() => {})
                this.getDataList()
            }
        }
    }
</script>

<style>
  .mod-user{
    padding:20px;
    height: 100%;
  }
</style>