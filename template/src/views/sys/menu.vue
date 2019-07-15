<template>
    <div class="mod-menu">
        <el-form :inline="true" :model="dataForm">
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table height="80%" 
            :data="dataList" 
            border 
            style="width: 100%;" 
            row-key="pval" 
            :tree-props="{children: 'children'}">
            <el-table-column prop="pval" header-align="center" align="center" label="ID">
            </el-table-column>
            <table-tree-column prop="pname" header-align="center" align="center" treeKey="menuId" label="名称">
            </table-tree-column>
            <el-table-column prop="parent" header-align="center" align="center" label="上级菜单">
            </el-table-column>
            <el-table-column header-align="center" align="center" label="图标">
                <template slot-scope="scope">

                </template>
            </el-table-column>
            <el-table-column prop="ptype" header-align="center" align="center" label="类型">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
                    <el-tag v-else-if="scope.row.ptype === 1" size="small" type="success">菜单</el-tag>
                    <el-tag v-else-if="scope.row.ptype === 2" size="small" type="info">接口</el-tag>
                    <el-tag v-else-if="scope.row.ptype === 3" size="small" type="info">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="orderNum" header-align="center" align="center" label="排序号">
            </el-table-column>
            <!-- <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="菜单URL">
            </el-table-column> -->
            <!-- <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="授权标识">
            </el-table-column> -->
            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
import TableTreeColumn from "@/components/table-tree-column";
import AddOrUpdate from "./menu-add-or-update";
import { treeDataTranslate } from "@/utils";
export default {
  data() {
    return {
      dataForm: {},
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false
    };
  },
  components: {
    TableTreeColumn,
    AddOrUpdate
  },
  // activated () {
  //   //this.getDataList()
  // },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.axios({
        method: "get",
        url: "http://10.0.0.31:8083/newtallsafe/v2/sys_perm/list/all",
        params: {}
      }).then(response => {
        let res = response.data.permMap,
          data = [];
        console.log(0, res);

        for (let key in res) {
          for (let item of res[key]) {
            data.push(item);
            console.log(0, item);
          }
        }
        console.log(data);
        let array = [];
        for (let el of data) {
          if (el.parent === null) {
            array.push(el);
            this.getChildren(el, data);
          }
        }
        this.dataList = array;

        this.dataListLoading = false;
      });
    },
    getChildren(item, data) {
      console.log(1, item);
      for (let el of data) {
        if (el.parent === item.pval) {
          item.children.push(el);
          this.getChildren(el, data);
        }
      }
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/sys/menu/delete/${id}`),
            method: "post",
            data: this.$http.adornData()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
    .mod-menu {
        padding: 20px;
        height: 100%;
    }
</style>