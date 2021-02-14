<template>
    <div class="index-box">
        <div class="data-box">
            <div class="data-text">
                <span class="data-text-top"> 2745 </span>
                <span> 昨日浏览量 </span>
            </div>
            <div class="data-text">
                <div class="data-text-top"> 654</div>
                <div> 昨日活跃用户</div>
            </div>
            <div class="data-text">
                <div class="data-text-top"> 32</div>
                <div> 昨日新增用户</div>
            </div>
            <div class="data-text">
                <div class="data-text-top"> 4</div>
                <div> 昨日新增内容</div>
            </div>
        </div>

        <div class="logion-box">
            <div class="logion">
                <span>那一天我二十一岁，在我一生的黄金时代，我有好多奢望。</span>
                <span>我想爱，想吃，还想在一瞬间变成天上半明半暗的云。</span>
                <!-- <span>后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。</span> -->
                <span>……</span>
                <span>可是我过二十一岁生日时没有预见到这一点。</span>
                <span>我觉得自己会永远生猛下去，什么也锤不了我。</span>
                <span>----《黄金时代》王小波</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>


<style lang="less">
    // 顶部数据的盒子
    .data-box {
        min-width: 100%;
        min-height: 120px;
        background: #ffffff; // 背景颜色
        border-radius: 5px; // 圆角
        padding-bottom: 20px;
        display: flex; // 开启弹性布局
        justify-content: space-around; // 水平：每个项目两侧的间隔相等
        align-items: flex-end; // 垂直方向，靠底部
    }

    ;
    // 顶部一个数据的盒子
    .data-text {
        display: flex; // 开启弹性布局
        flex-direction: column; // 设置主轴竖直，起点在下
        align-items: center; // 垂直：中心对齐
    }

    ;
    // 数据
    .data-text-top {
        margin-bottom: 18px; // 底外边距
        // color:blue; // 字体颜色
        font-size: 40px; // 字体大小
        font-weight: bold; // 字体加粗
    }

    ;

    .logion-box {
        min-width: 100%;
        min-height: 120px;
        margin-top: 2%;
        background: #ffffff; // 背景颜色
        border-radius: 5px; // 圆角
    }

    .logion {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex; // 开启弹性布局
        flex-direction: column; // 设置主轴竖直，起点在下
        align-items: center; // 垂直：中心对齐
        justify-content: center; // 水平居中

        font-weight: bold; // 字体加粗
        font-size: 16px; // 字体大小
    }
</style>