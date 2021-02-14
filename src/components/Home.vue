<template>
    <div>
        <!-- 头部 -->
        <div class="header-box">
            <div class="logo-box">
                <img src="../../src/assets/image/logo.png" class="logo-img"/>
                <span class="logo-text">数学建模协会</span>
            </div>
            <div class="logo-box">
                <img :src="user.avatar" class="logo-img"/>
                <span class="logo-text">{{user.nickname}}</span>
            </div>
        </div>

        <!-- 主体 -->
        <div class="main-box">
            <!-- 主体左侧的导航 -->
            <div class="main-left">
                <!-- 用户部分 -->
                <div class="user-box">
                    <img :src="user.avatar" style="width: 100px"/>
                    <el-tag type="warning" size="mini" style="margin-top: 10px">
                        {{user.role}}
                    </el-tag>
                    <span style="margin-top: 8px; font-size:20px; font-weight: bold;"> {{user.nickname}} </span>
                    <el-button type="primary" style="width: 75%; margin-top: 10px">
                        发布
                    </el-button>
                </div>

                <!-- 导航菜单部分 -->
                <div class="menu-box">
                    <!-- 菜单 -->
                    <el-row class="tac">
                        <!-- :router: 为true时开启路由模式,会自动以所点击的菜单的index值为要激活的导航 -->
                        <!-- :default-active: 其值为菜单的index,该菜单的字会高亮 -->
                        <!-- unique-opened：只允许一个一级菜单打开。我发现不能加="true"，会错 -->
                        <el-menu :router="true" :default-active="activePath" unique-opened>
                            <div v-for="item in menuList" :key="item.path">
                                <!-- 无二级菜单 -->
                                <el-menu-item :index="item.path" v-if="item.slist.length == 0">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title"> {{item.title}} </span>
                                </el-menu-item>
                                <!-- 有二级菜单 -->
                                <el-submenu :index="item.path" v-if="item.slist.length != 0">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span> {{item.title}} </span>
                                    </template>
                                    <el-menu-item-group style="margin-top: -15px;" v-for="it in item.slist"
                                                        :key="it.path">
                                        <el-menu-item :index="it.path" style="padding-left: 65px;"> {{it.title}}
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </div>
                        </el-menu>
                    </el-row>
                </div>
            </div>

            <!-- 真正的主体部分 -->
            <div class="main-right">
                <div>
                    <!--路由占位符-->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                user: '', // 所登录的用户
                activePath: "index", // 保存点了哪个菜单
                menuList: [], // 左侧菜单
            };
        },
        // 类似onload
        created() {
            this.user = JSON.parse(window.localStorage.getItem('user'));// 取出session保存的访问路径
            this.getMenuList();// 访问后台获取菜单数据
            // this.activePath = this.$route.path.slice(1) // 让当前页面对应的菜单亮
            // console.log("加载了页面" + this.$route.path.slice(1))
        },
        watch: {
            // 监听url变化。to是新地址，from是旧地址
            '$route.path': function (to, from) {
                this.activePath = to.slice(1) // 让当前页面对应的菜单亮
            },
        },
        methods: {
            // 获取所有的导航菜单
            async getMenuList() {
                const {data: res} = await this.$http.get("admin/menus");// 访问后台取菜单数据
                console.log(res.data);
                if (res.status != 200) return this.$message.error("操作失败！！！");
                this.menuList = res.data;// 数据保存到menuList上
            },
        }
    };
</script>

<style lang="less">
    // 头部最大的容器
    .header-box {
        min-height: 68px;
        min-width: 100%;
        background: #ffffff; // 背景颜色
        display: flex; // 开启弹性布局
        justify-content: space-between; // 水平：两端对齐
        align-items: center; // 垂直：中心对齐
    }

    // 头像的盒子，包括图片和名称
    .logo-box {
        display: flex; //开启弹性布局
        align-items: center; // 垂直：中心对齐
        margin-left: 15%; // 左外边距
        margin-right: 15%; // 右外边距
    }

    // 头部图片的样式
    .logo-img {
        width: 40px;
        height: 40px;
    }

    // 头部文字的样式
    .logo-text {
        margin-left: 10px;
    }

    // 主体最大的那个盒子
    .main-box {
        display: flex; // 开启弹性布局
        justify-content: space-between; // 水平：两端对齐
        align-items: flex-start; // 垂直：顶部对齐
        margin-top: 1.5%; // 上外边距
        margin-bottom: 1.5%; // 下外边距
        margin-left: 15%; // 左外边距
        margin-right: 15%; // 右外边距
    }

    // 主体左侧最大的盒子
    .main-left {
        background: #ffffff; // 背景颜色
        min-width: 18%;
        max-width: 18%;
        min-height: 2000px;
        border-radius: 5px; // 圆角
    }

    // 主体右侧最大的盒子
    .main-right {
        // background: #ffffff; // 背景颜色
        min-height: 2000px;
        min-width: 80%;
        max-width: 80%;
    }

    .user-box {
        margin: 10px;
        display: flex; // 开启弹性布局
        flex-direction: column; // 设置主轴竖直，起点在上
        align-items: center; // 垂直：中心对齐
        margin-top: 20px; // 上外边距
    }
</style>