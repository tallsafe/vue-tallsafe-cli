<template>
    <div class="mod-role">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="dataForm.rname" placeholder="角色名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-table height="80%" :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50">
            </el-table-column>
            <el-table-column prop="rname" header-align="center" align="center" label="角色名称">
            </el-table-column>
            <el-table-column prop="rdesc" header-align="center" align="center" label="备注">
            </el-table-column>
            <el-table-column prop="created" header-align="center" align="center" label="创建时间">
            </el-table-column>
            <el-table-column prop="updated" header-align="center" align="center" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="permission(scope.row.rid)">权限</el-button>
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.rid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
        <changeAuth ref="changeAuth"></changeAuth>
    </div>
</template>

<script>
    import AddOrUpdate from "./role-add-or-update";
    import changeAuth from "./changeAuth";
    import { mapState } from "vuex";
    import { getRoleList,deleteRole } from '@/api/role'
    export default {
        data() {
            return {
                dataForm: {
                    roleName: "",
                    rid: "1",
                    rname: ""
                },
                updateVisiblevisible: false,
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false
            };
        },
        components: {
            AddOrUpdate,
            changeAuth
        },
        activated () {
            this.getDataList()
        },
        created() {
            this.getDataList();
        },
        methods: {
            // 获取数据列表
            getDataList(rname, current, size) {
                this.dataListLoading = true;
                let data = {
                    rname:this.dataForm.rname,
                    current:this.pageIndex,
                    size:this.pageSize
                };
                getRoleList(data).then(response => {
                    this.dataList = response.page.records;
                    this.totalPage = response.page.total;
                    for(let el of response.page.records){
                        el.created = el.created.replace('.000+0000','').replace('T',' ');
                        if(el.hasOwnProperty('updated')&&el.updated!==null){
                            el.updated = el.updated.replace('.000+0000','').replace('T',' ');
                        }
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val;
                this.getDataList();
            },
            // 多选
            selectionChangeHandle(val) {
                let array = [];
                for(let el of val){
                    array.push(el.rid);
                }
                this.dataListSelections = array;
            },
            // 新增 / 修改
            addOrUpdateHandle(data) {
                this.addOrUpdateVisible = true;
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(data);
                });
            },
            // 修改
            updateHandle(val) {
                this.updateVisiblevisible = true;
                this.dataList2 = val.row;
            },
            // 删除
            deleteHandle(rid) {
                let rids;
                if(this.dataListSelections.length===0){
                    rids= [rid];
                }else{
                    rids= this.dataListSelections;
                }
                this.$confirm(
                    `确定删除吗?`,
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then(() => {
                    deleteRole(rids).then(response => {
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
                })
            },
            permission(rid){
                this.$nextTick(() => {
                    this.$refs.changeAuth.init(rid)
                })
            }
        }
    }
</script>

<style>
    .mod-role {
        padding: 20px;
        height: 100%;
    }
</style>
