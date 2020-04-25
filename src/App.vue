<script>
    import Vue from 'vue'
    export default {
        async onLaunch() {
            this.initData();
        },
        onHide() {
        },
        methods: {
            // 数据初始化
            async initData() {
                const token = uni.getStorageSync('accessToken');
                if (token) {
                    await this.initNavCartNum();
                    // await this.initWebsocket(token);
                    await this.initSystemInfo();
                    // #ifdef H5
                    this.$mPayment.wxConfigH5();
                    // #endif
                }
            },
		        // 初始化系统信息
            initSystemInfo() {
                uni.getSystemInfo({
                    success(e) {
                        // #ifndef MP
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        if (e.platform == 'android') {
                            Vue.prototype.CustomBar = e.statusBarHeight + 50;
                        } else {
                            Vue.prototype.CustomBar = e.statusBarHeight + 45;
                        }

                        // #endif
                        // #ifdef MP-WEIXIN
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        let custom = wx.getMenuButtonBoundingClientRect();
                        Vue.prototype.Custom = custom;
                        Vue.prototype.CustomBar = custom.top - e.statusBarHeight;
                        // #endif
                        // #ifdef MP-ALIPAY
                        Vue.prototype.StatusBar = e.statusBarHeight;
                        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
                        // #endif
                    }
                });
            },
		        // 初始化购物车在tab的数字角标
            initNavCartNum() {
                const cartNum = uni.getStorageSync('cartNum');
                // 注意text只能是字符串不能是数字
                if (parseInt(cartNum, 10) > 0) {
                    uni.setTabBarBadge({
                        index: this.$mConstDataConfig.cartIndex,
                        text: cartNum.toString()
                    });
                } else {
                    uni.removeTabBarBadge({index: this.$mConstDataConfig.cartIndex});
                }
            }
        }
    }
</script>

<style lang='scss'>
	// 导入colorUI
	@import '/static/css/colorui/main.css';
	@import '/static/css/colorui/icon.css';
	@import '/static/css/colorui/animation.css';
	// 导入阿里巴巴矢量图标库
	@import './static/css/iconfont/iconfont.css';
	@import './static/css/reset.scss';
	@import './static/css/uni.scss';
</style>
