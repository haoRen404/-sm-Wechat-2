<template>
    <div>
        这里是博客列表 第一篇 第二篇 第三篇
        <!-- 退出按钮 -->
        <el-button type="info" @click="logout">安全退出</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activePath: "blog", // 保存点了那个菜单
            };
        },
        methods: {
            // 退出登录
            // 获取所有的导航菜单
            async logout() {
                const {data: res} = await this.$http.get("menus");
                console.log(res.data);
                if (res.status != 200) return this.$message.error("操作失败！！！");
                //   this.menuList = res.data;
            },
        },
    };
</script>

<style>
</style>