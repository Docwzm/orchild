module.exports = {
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            // 设置全局sass样式
            sass: {
                data: `
                  @import "@/scss/main.scss";
                `
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                    remUnit: 75 // 1rem=75px，这里是设计稿的尺寸是750px
                })]
            }
        }
    },
    publicPath: './',
    devServer: {
        // 设置主机地址
        // host: 'localhost',
        // 设置默认端口
        port: 8088,
        // 设置代理
        proxy: {
            '/': {
                // 目标 API 地址
                target: 'https://customer-dev.guanggujinxin.com',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true
            }
        }
    }
    // externals:{
    //     'wx':'wx',
    // },
}
