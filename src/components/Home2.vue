<template>
    <div>
        <!-- 退出按钮 -->
        <!-- <el-button type="info" @click="logout">安全退出</el-button> -->
        <el-container>
            <!-- 表头 -->
            <el-header class="">
                <div class=" el-header header">
                    <div class="hrader_in">
                        <img class="logo_img" src="../assets/image/logo.png"/>
                        <span class="hrader_text">数学建模协会</span>
                    </div>
                    <el-popover class="hrader_in" placement="bottom" width="150" trigger="hover">
                        <div class="hrader_in" slot="reference">
                            <img class="logo_img" src="../assets/image/avatar.png"/>
                            <span class="hrader_text">是好人呀</span>
                            <i class="el-icon-arrow-down hrader_text"></i>
                        </div>

                        <!-- 嵌入到弹出框中 -->
                        <el-main class="hideMenu">
                            <div>
                                <el-button type="text" size="medium">退出</el-button>
                            </div>
                            <div>
                                <el-button type="text">切换</el-button>
                            </div>
                        </el-main>
                    </el-popover>
                </div>
            </el-header>


            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->


            <!-- 中间部分 -->
            <el-container>
                <!-- 左侧导航栏 -->
                <el-aside width="320px">
                    <!-- Aside -->

                    <!-- 菜单列表 -->
                    <!-- :router: 为true时开启路由模式,会自动以所点击的菜单的index值为要激活的导航 -->
                    <!-- :default-active: 其值为菜单的index,该菜单会高亮,即选中时的样式 -->
                    <el-row class="tac el-row">
                        <el-col :span="12">
                            <el-menu :default-active="activePath" :router="true" class="el-menu-vertical-demo"
                                     @open="handleOpen" @close="handleClose"
                                     background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

                                <div>
                                    <el-row class="tac" v-for="mainmenu in menuList" :key="mainmenu.id">
                                        <!-- 没有子菜单 -->
                                        <!-- <el-menu-item :index="mainmenu.path" v-if="mainmenu.slist.length==0" @click="saveNavState(mainmenu.path+'')"> -->
                                        <el-menu-item :index="mainmenu.path" v-if="mainmenu.slist.length==0">
                                            <i class="el-icon-menu"></i>
                                            <span slot="title">{{mainmenu.title}}</span>
                                        </el-menu-item>

                                        <!-- 有子菜单 -->
                                        <el-submenu :index="mainmenu.path" v-if="mainmenu.slist.length!=0">
                                            <!-- 一级菜单 -->
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>{{mainmenu.title}}</span>
                                            </template>
                                            <!-- 二级菜单 -->
                                            <!-- <el-menu-item :index="submenu.path" @click="saveNavState(submenu.path+'')" style="left:40px " -->
                                            <el-menu-item :index="submenu.path" style="left:40px "
                                                          v-for="submenu in mainmenu.slist" :key="submenu.id">
                                                {{submenu.title}}
                                            </el-menu-item>
                                        </el-submenu>
                                    </el-row>
                                </div>

                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>

                <!-- 右侧主体 -->
                <el-container>
                    <el-main>
                        <!--路由占位符-->
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>

            <!-- 底部 -->
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activePath: "index", // 保存点了哪个菜单
                menuList: [], // 左侧菜单
                visible: false, // 退出按钮的隐藏
            };
        },
        // 类似onload
        created() {
            this.getMenuList();// 访问后台获取菜单数据
            // this.activePath = window.sessionStorage.getItem('activePath');// 取出session保存的访问路径

            // this.$route.path获取当前的路由(以/起头). .slice(1)从第二个字符开始截取后面的
            this.activePath = this.$route.path.slice(1) // 让当前页面对应的菜单亮
        },
        methods: {
            // 退出登录
            logout() {
                window.sessionStorage.clear(); // 清除所有session,包括用户对象
                this.$router.push("/login"); // 跳转到登录页
                this.$notify.success({
                    title: "退出成功",
                    message: "数模因你而不同",
                });
            },
            // 开启一级导航
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            // 关闭一级导航
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // 获取所有的导航菜单
            async getMenuList() {
                const {data: res} = await this.$http.get("menus");//访问后台取菜单数据
                console.log(res.data);
                if (res.status != 200) return this.$message.error("操作失败！！！");
                this.menuList = res.data;// 数据保存到menuList上
            },
            // 保存所点击的菜单的路径
            // saveNavState(activePath){
            //   window.sessionStorage.setItem('activePath',activePath);// 存放点击的二级菜单
            //   this.activePath = activePath;// 给点击的菜单添加高亮
            //   console.log('点击了' + this.activePath);
            // },
        },
    };
</script>

<style scoped>
    .el-row {
        min-height: 100%;
    }

    /* 头部的样式 */
    .el-header {
        display: flex; /* flex布局 */
        justify-content: space-between; /* 两端对齐 */
        width: 100%; /* 宽度 */
        min-height: 80px; /* 高度 */
        background: #303133; /* 背景颜色 */
    }

    /* 头部内部元素的样式 */
    .hrader_in {
        display: flex; /* flex布局 */
        align-items: center; /*竖直方向:交叉轴的中点对齐,即单行时上下居中*/
    }

    /* 头部文字 */
    .hrader_text {
        margin-left: 20px; /*左外边距*/
        font-size: 30px; /* 字体大小 */
        color: #FFFFFF; /* 字体颜色 */
    }

    /* 头像的格式 */
    .logo_img {
        width: 50px;
        height: 50px;
    }

    /* 头像那里隐藏的菜单 */
    .hideMenu {
        font-size: 20px; /* 字体大小 */
    }

    /* 左侧菜单框的大小 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 280px; /* 菜单栏竖线的距离,即菜单栏的宽度 */
        min-height: 100%; /* 菜单栏竖线的长度 */
    }

    /* 左边菜单框的样式,最外层的框 */
    .el-row {
        overflow-x: hidden /* 二级菜单溢出时裁剪溢出部分 */
    }

    /* 左侧菜单的字体大小 */
    .menutext {
        font-size: 25px;
    }
</style>