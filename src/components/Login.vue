<template>
    <div class="Login_container">
        <!-- 登录块 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/image/logo.png"/>
            </div>
            <!-- 表单 -->
            <el-form
                    ref="loginFormRef"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login_form"
                    label-width="0px"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input
                            v-model="loginForm.username"
                            prefix-icon="iconfont icondenglu"
                    ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                            v-model="loginForm.password"
                            prefix-icon="iconfont iconmima"
                            type="password"
                    ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                // 表单数据对象
                loginForm: {
                    username: "admin",
                    password: "123456",
                },
                // 验证对象
                loginRules: {
                    // 校验用户名
                    username: [
                        {required: true, message: "用户名称为必填项", trigger: "blur"}, // 校验必填
                        {
                            min: 5,
                            max: 16,
                            message: "长度在5至16个字符之间",
                            trigger: "blur",
                        }, // 校验长度
                    ],
                    // 校验密码
                    password: [
                        {required: true, message: "密码为必填项", trigger: "blur"}, // 校验必填
                        {
                            min: 5,
                            max: 16,
                            message: "长度在5至16个字符之间",
                            trigger: "blur",
                        }, // 校验长度
                    ],
                },
                user: "",
            };
        },
        methods: {
            // 重置表单内容
            resetLoginForm() {
                // loginFormRef是表单的ref属性,使用this.$refs.属性值来获取
                // resetFields()是重置表单的方法
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                // validate方法做表单验证,验证通过valid的值为true,不通过则为false
                // 添加async和await是用来对返回的数据做解析,返回data数据
                // const {data:res}:解析数据中的res.(可以"const data="",然后打印data,就知道是什么了)
                this.$refs.loginFormRef.validate(async (valid) => {
                    if (!valid) return;
                    // 访问后台获取数据,传递loginForm(即用户名和密码)
                    const {data: res} = await this.$http.post("admin/login", this.loginForm);
                    console.log("登录的res = " + JSON.stringify(res));
                    if (res.status == "200") {
                        // 信息提示.element-ui:弹出一个提示成功的框
                        this.$notify.success({
                            title: "登录成功",
                            message: "数模因你而不同",
                        });
                        // 存储user对象(先保存,再跳转)(sessionStorage只能存字符串，所以需要将对象转换为json字符串)
                        window.localStorage.setItem("user", JSON.stringify(res.data.user));// 存储用户信息
                        window.localStorage.setItem("token", JSON.stringify(res.data.token));// 存储token
                        window.localStorage.setItem("id", JSON.stringify(res.data.user.id));// 存储用户id

                        // console.log("login: window.localStorage.getItem('token') = " + window.localStorage.getItem('token'));
                        // 页面跳转
                        this.$router.push({path: '/index'})
                    } else {
                        // element-ui:弹出一个提示失败的框
                        // this.$message.error("操作失败!");
                        this.$notify.warning({
                            title: "登录失败",
                            message: "请检查登录信息是否输入正确",
                        });
                    }
                });
            },
        },
    };
</script>

<style lang="less" scoped>
    .Login_container {
        height: 100%;
        width: 100%;
        // background-color: rgb(234, 234, 234);
        // background: url(https://hbimg.huabanimg.com/bc64e814165b5965fb1a31da8cadb08d3a02ced6a873-RQDlY0_fw658/format/webp) no-repeat center 0px;
        // background-size:100% 100% ;
        // background-attachment: fixed;
    }

    .login_box {
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12), 0 0 30px rgba(0, 0, 0, 0.04);
        height: 500px;
        width: 300px;
        background-color: #fff;
        // 圆角
        border-radius: 8px;
        // 绝对定位
        position: absolute;
        // 以左上角进行定位
        left: 50%;
        top: 50%;
        // 以自身大小进行移动,向左上移动50%,结合上面的绝对定位达到居中效果
        transform: translate(-50%, -50%);
        // 设置头像logo
        .avatar_box {
            width: 120px;
            height: 120px;
            // 轮廓
            border: 5px solid #eee;
            // 圆角设置50%变成圆
            border-radius: 50%;
            // 阴影
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            // 以左上角进行定位
            left: 50%;
            top: 20%;
            // 以自身大小进行移动,向左上移动50%,结合上面的绝对定位达到居中效果
            transform: translate(-50%, -50%);

            img {
                width: 100%;
                height: 100%;
                // 圆角设置50%变成圆
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login_form {
        // 绝对定位
        position: absolute;
        top: 40%;
        left: 15%;
        width: 70%;
        // 居中对齐
        justify-content: center;
    }

    .btns {
        // 弹性布局
        display: flex;
        // 居中对齐
        justify-content: center;
        // 绝对定位
    }
</style>