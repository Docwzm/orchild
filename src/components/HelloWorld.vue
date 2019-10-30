<template>
    <div class="hello">
        <div class="chart-wrapper">
            <canvas id="mountNode"></canvas>
        </div>

        <!-- <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,
            <br />check out the
            <a
                href="https://cli.vuejs.org"
                target="_blank"
                rel="noopener"
            >vue-cli documentation</a>.
        </p>
        <h3>Installed CLI Plugins</h3>
        <ul>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
                    target="_blank"
                    rel="noopener"
                >babel</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
                    target="_blank"
                    rel="noopener"
                >typescript</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
                    target="_blank"
                    rel="noopener"
                >eslint</a>
            </li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
            </li>
            <li>
                <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
            </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li>
                <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
            </li>
            <li>
                <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-devtools#vue-devtools"
                    target="_blank"
                    rel="noopener"
                >vue-devtools</a>
            </li>
            <li>
                <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/awesome-vue"
                    target="_blank"
                    rel="noopener"
                >awesome-vue</a>
            </li>
        </ul> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
const F2 = require('@antv/f2')

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
    private mounted () {
        console.log('mounted')
        console.log('created')
        // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 }
        ]

        // Step 1: 创建 Chart 对象
        const chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio // 指定分辨率
        })

        // Step 2: 载入数据源
        chart.source(data)

        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart
            .interval()
            .position('genre*sold')
            .color('genre')

        // Step 4: 渲染图表
        chart.render()
    }

    private created () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
