module.exports = {
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                    remUnit: 75 // 1rem=75px，这里是设计稿的尺寸是750px
                })]
            }
        }
    },
    publicPath: './'
}
