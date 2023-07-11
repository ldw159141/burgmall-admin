<template>
    <div>
   <!-- 搜索开始 -->
   <div style="margin-top: 20px; border: 0px solid red;margin-bottom: 20px;">
      标题title：<el-input type="text" v-model="searchForm.title" @input="handleSearch" class="input" clearable placeholder="请输入标题" size="small" style="width: 200px;margin-right: 20px;"></el-input>
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
      <el-table-column type="selection" > </el-table-column>

      <el-table-column fixed prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="coder" label="CODER" >
      </el-table-column>
      <el-table-column prop="title" label="title" >
      </el-table-column>
       <el-table-column prop="description" label="介绍">
      </el-table-column>
       <el-table-column prop="price" label="原价" >
      </el-table-column>
      <el-table-column prop="promoPrice" label="现价" >
      </el-table-column>
      <el-table-column prop="stock" label="数量" >
      </el-table-column>
      <el-table-column prop="typeId" label="类型" >
        <template slot-scope="scope">
          {{ map[scope.row.typeId] }}
        </template>
      </el-table-column>
      <el-table-column  prop="url" label="图片" width="130" align="center">
          <template slot-scope="scope">
          <el-image style="width: 100%; height: 100px" 
          :src="baseurl+scope.row.url" 
          :preview-src-list="[baseurl+scope.row.url]" 
          :key="scope.row.id">
            <div slot="error" class="image-slot">
               <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>              
      </el-table-column>
      <el-table-column prop="fileName" label="图片下载" width="100px">
        <template slot-scope="scope2">
         <el-button @click="download(scope2.row.url)"  style="width: 80px;text-align: center;">下载</el-button>
        </template>
      </el-table-column> 
      <el-table-column label="操作"  width="150px">
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
        :page-size="goodsQuery.pageSize"
        :total="goodsQuery.total"
        :current-page.sync="currentPage"
        @current-change="changePage"
      >
      </el-pagination>
      </div>
      <!-- 取消全选，分页结束 -->
    <!-- 抽屉开始 -->  
    <el-drawer
      :title="submitForm.title==null?'新增':'编辑'"
      :visible.sync="drawer"
      :direction="direction"
      :wrapper-closable="false"
      :before-close="handleClose"
    >
      <el-form :model="submitForm" :rules="rules" ref="submitForm">
        <el-form-item prop="coder">
          Coder
          <el-input
            type="text"
            v-model="submitForm.coder"
            placeholder="CODER"
          ></el-input>
        </el-form-item>
        <el-form-item prop="title">
          标题
          <el-input
            type="text"
            v-model="submitForm.title"
            placeholder="标题"
          ></el-input>
        </el-form-item>
           <el-form-item prop="description">
            介绍
          <el-input
            type="text"
            v-model="submitForm.description"
            placeholder="介绍"
          ></el-input>
        </el-form-item>
           <el-form-item prop="price">
            原价
          <el-input
            type="text"
            v-model="submitForm.price"
            placeholder="原价"
          ></el-input>
        </el-form-item>
           <el-form-item prop="promoPrice">
            现价
          <el-input
            type="text"
            v-model="submitForm.promoPrice"
            placeholder="现价"
          ></el-input>
        </el-form-item>
            <el-form-item prop="stock">
              数量
          <el-input
            type="text"
            v-model="submitForm.stock"
            placeholder="数量"
          ></el-input>
        </el-form-item>
        <el-form-item prop="typeId">
              类型：1热卖商品，2轮播图，3普通商品,4披萨类
          <el-input
            type="text"
            v-model="submitForm.typeId"
            placeholder="类型"
          ></el-input>
        </el-form-item>
        <el-form-item prop="addurl">
          修改图片
          <el-upload
  class="avatar-uploader"
  action="http://localhost:8282/uploads"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :headers="headers"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        
        <el-button type="primary" size="small" @click="submit">确认</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-form>
    </el-drawer>
    <!-- 抽屉结束 -->
    </div>
</template>

<script>
export default{
    data(){
      return{
      imageUrl: '',
      fileName:'',
      drawer: false,
      direction: "rtl",
      tableData: null,
      searchForm: {
      title: '',
      },
      goodsQuery: {
        pageNum: 1,
        pageSize: 5,
        total:'',
      },
      multipleSelection: [],
      ids:[],
      submitForm: {
        // coder: "",
        // title: "",
        // description: '',
        // price:'',
        // promoPrice:'',
        // stock:'',
        // url:'',
        // typeId:''

     
      },
   
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [{ required: true, message: "请输入介绍", trigger: "blur" }],
      
      },
      headers: {
        "Authorization": localStorage.getItem("token")
      },

      map: {
          1: '热卖商品',
          2: '轮播图',
          3: '普通商品',
          4: '披萨类'
      }

      }
    },
    created(){
         this.list()
        // this.formatterType
    },
    methods:{
    //分页
    list() {
      let data=Object.assign(this.searchForm,this.goodsQuery)
      this.axios.post("goods/page",data).then((res) => {
        this.tableData = res.data.list;
        this.goodsQuery.total=res.data.total
        this.baseurl = 'http://localhost:8282/image/goods/'
      });
    },
    //点击跳转页面，更改pageNum
    changePage(e) {
      this.goodsQuery.pageNum = e
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
    //搜索
      handleSearch() {
      this.list()
    },
      //提交新增商品
      submit() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          this.axios.post("goods/save", this.submitForm).then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.submitForm = {};
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.drawer = false;
              this.imageUrl=''
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
      this.imageUrl=''
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
          this.axios.post('goods/delete', this.ids).then(res => {
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




//图片上传
handleAvatarSuccess(res, file) {
    console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw)
      this.submitForm.url=res.data.realName
    },
    beforeAvatarUpload(file) {
      const typeArr = ["image/png", "image/jpeg","image/jpg"]
      if (!typeArr.includes(file.type)){
        this.$message.error("上传图片只支持jpg，png，jpeg格式")
        return false
      }

      const isLt2M=file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return  isLt2M
    },
    download(row){
      //当前窗口打开
      window.location.href ='http://localhost:8282/views?fileName='+row
      //新窗口打开
     // window.open('http://localhost:8282/views?fileName='+row)
    }
    
    }
}
</script>

<style scoped>
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>