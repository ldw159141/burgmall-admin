<template>
    <el-container class="home_container">
        <el-header class="home_header">
            <div class="home_title">BURGER管理系统-系统管理员</div>
            <div class="home_userinfoContainer">
                <p  class="el-icon-user-solid" v-if="admin==null" >
                <router-link to="/login" style="color: #fff;">请登录</router-link>  
                  </p> 
                <el-dropdown>
                    <span class="el-dropdown-link home_userinfo" v-if="admin!=null">
                   {{ admin.username }}
                   <i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    
                </el-dropdown>
                
            </div>
        </el-header>
        <el-container>

            <el-aside class="home_aside" width="200px" style="background-color: rgb(238, 241, 246)">

                <el-menu router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-user-solid"></i>用户模块</template>
                        <el-menu-item index="/user" :class="$route.path=='/user'?'is-active':''">
                            <i class="el-icon-user-solid"></i>商家用户管理
                        </el-menu-item>
                        <el-menu-item index="/home" :class="$route.path=='/home'?'is-active':''">
                            <i class="el-icon-document-copy"></i>普通用户管理
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-user-solid"></i>地址模块</template>
                        <el-menu-item index="/address" :class="$route.path=='/'?'is-active':''">
                            <i class="el-icon-folder-add"></i>用户地址
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-user-solid"></i>权限模块</template>
                        <el-menu-item index="/role" :class="$route.path=='/'?'is-active':''">
                            <i class="el-icon-folder-add"></i>权限类别
                        </el-menu-item>
                      
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-user-solid"></i>商品模块</template>
                        <el-menu-item index="/goods" :class="$route.path=='/'?'is-active':''">
                            <i class="el-icon-folder-add"></i>商品管理
                        </el-menu-item>
                        <el-menu-item index="/home">
                            <i class="el-icon-document-copy"></i>商品图片
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-user-solid"></i>商品类别</template>
                        <el-menu-item index="/type" :class="$route.path=='/'?'is-active':''">
                            <i class="el-icon-folder-add"></i>商品类别
                        </el-menu-item>
                        
                    </el-submenu>


                
                </el-menu>

            </el-aside>

            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
                <el-footer class="home_footer">LDW © BURGER管理系统</el-footer>
            </el-container>

        </el-container>

    </el-container>
</template>
<script>
import ElementUI from 'element-ui';
    export default{
        methods: {
            logout(){
                let _this = this;
                this.$confirm('注销登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    
                    localStorage.removeItem('userInfo')
                    window.localStorage.clear()
                    _this.admin=null
                    _this.$router.replace({path: '/'})
                }).catch(()=>{})
            }
        },
        data(){
            return {
              admin: ''
            }
        },
        created() {
            let admin = JSON.parse(window.localStorage.getItem('userInfo'))
          this.admin = admin
             // 设置一小时的有效期
             const expire = 1000 *60*60;
             setTimeout(() => {
             this.admin=null
             this.$router.push({ path:"/" })
            ElementUI.Message.error("登录失效，请重新登录")
            }, expire)
        }
    }
</script>
<style scoped>


  .home {
    color: #333;
  }
    .home_container {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }

    .home_header {
        background-color: #2B2B2B;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .home_title {
        color: #C2C2C2;
        font-size: 22px;
        display: inline;
    }

    .home_userinfo {
        color: #fff;
        cursor: pointer;
    }

    .home_userinfoContainer {
        display: inline;
        margin-right: 20px;
    }

    .home_aside {
        background-color: #FFFFFF;
    }

    .home_footer {
        background-color: #FFFFFF;
        color: #000000;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
    }
</style>

  


