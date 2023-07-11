<template>
  <div>
    <!-- 搜索开始 -->
    <div style="margin-top: 20px; border: 0px solid red;margin-bottom: 20px;">
      用户名：<el-input type="text" v-model="searchForm.username" @input="handleSearch" class="input" clearable placeholder="请输入用户名" size="small" style="width: 200px;margin-right: 20px;"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" class="mr10px" @click="handleSearch">搜索</el-button>
    </div>
    <!-- 搜索结束 -->
    <!-- 新增删除开始 -->
        <div>
          <el-button
            type="primary"
            @click="drawer = true"
            size="small"
            style="margin-right: 300px; margin-bottom: 30px"
            >新增</el-button
          >
          <el-button type="danger" size="small" @click="bathDelete" :disabled="ids.length>0?false:true">批量删除</el-button>
        </div>
    <!-- 新增删除结束 -->
    <!-- 用户数据表单开始 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>

      <el-table-column fixed prop="id" label="ID" >
      </el-table-column>
      <el-table-column prop="username" label="用户名" >
      </el-table-column>
      <!-- <el-table-column prop="password" label="密码" >
      </el-table-column> -->
       <el-table-column prop="name" label="姓名" >
      </el-table-column>
       <el-table-column prop="store" label="店名" >
      </el-table-column>
       <el-table-column prop="address" label="地址" >
      </el-table-column>
        <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 用户数据表单结束 -->
    <!-- 取消全选，分页开始 -->
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>

      <el-pagination
        style="margin-top: 20px; float: right"
        background
        layout="prev, pager, next"
        :page-size="userQuery.pageSize"
        :total="userQuery.total"
        :current-page.sync="currentPage"
        @current-change="changePage"
      >
      </el-pagination>
      </div>
      <!-- 取消全选，分页结束 -->
      <!-- 抽屉开始 -->  
    <el-drawer
      :title="submitForm.username==null?'新增':'编辑'"
      :visible.sync="drawer"
      :direction="direction"
      :wrapper-closable="false"
      :before-close="handleClose"
    >
      <el-form :model="submitForm" :rules="rules" ref="submitForm">
        <el-form-item prop="username" >
          用户名
          <el-input
            type="text"
            v-model="submitForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="password">
          <el-input
            type="password"
            v-model="submitForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item> -->
           <el-form-item prop="name">
            姓名
          <el-input
            type="text"
            v-model="submitForm.name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
           <el-form-item prop="store">
            店名
          <el-input
            type="text"
            v-model="submitForm.store"
            placeholder="店名"
          ></el-input>
        </el-form-item>
           <el-form-item prop="address">
            地址
          <el-input
            type="text"
            v-model="submitForm.address"
            placeholder="地址"
          ></el-input>
        </el-form-item>
            <el-form-item prop="phone">
              电话
          <el-input
            type="text"
            v-model="submitForm.phone"
            placeholder="电话"
          ></el-input>
        </el-form-item>

        <el-button type="primary" size="small" @click="submit">确认</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-form>
      <!-- <el-input v-model="username" placeholder="请输入用户名"></el-input> -->
    </el-drawer>
    <!-- 抽屉结束 -->
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      tableData: null,
      searchForm: {
        username: '',
      },
      userQuery: {
          pageNum: 1,
        pageSize: 3,
        total:'',
  
      },
    
      submitForm: {
        username: "",
        password: "",
        name: '',
        store: '',
        address: '',
        phone:''
      },
   
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      
      },
      multipleSelection: [],
   ids:[]
    };
  },
  created() {
    this.list();
  },

  methods: {
    //分页
    list() {
      let data=Object.assign(this.searchForm,this.userQuery)
      this.axios.post("user/page",data).then((res) => {
        if(res.data == null){
          console.log(111);
        }else{
          this.tableData = res.data.list;
        this.userQuery.total=res.data.total
        }
    
      });
    },
    //点击跳转页面，更改pageNum
    changePage(e) {
      this.userQuery.pageNum = e
      this.list()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
//赋值前清空
this.ids=[]
      val.forEach(item => {
        this.ids.push(item.id)
      })
    },
    //编辑，选定是创建新对象，这样不双向绑定
    handleEdit(row) {
      this.drawer = true
      this.submitForm = row
      this.submitForm=Object.assign({},row)
    },
    //删除
    bathDelete() {
        this.$confirm(`此操作将永久删除ID为[${this.ids}]的数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      //批量删除数据
          this.axios.post('user/delete', this.ids).then(res => {
            if (res.code === 200) {
              this.$message({
            type: 'success',
            message: '删除成功!'
              });
            this.list();
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });     
            this.$refs.multipleTable.clearSelection();     
        });
      
    },
    //单个删除
    handleDelete(row) {
      this.ids = [row.id]
      this.bathDelete()
    },

    //提交新增用户
    submit() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          this.axios.post("user/save", this.submitForm).then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.submitForm = {};
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.drawer = false;
              this.list();
            }
          });
        } else {
          console.log("error");
          return false;
        }
      });
    },
    //取消弹框
    handleClose() {
      this.drawer = false;
      this.submitForm = {};
    },
    //搜索
    handleSearch() {
      this.list()
    },


    
  




   
  },
};
</script>