<template>
	<view class="product">
		<rf-product-detail @product="getProductDetail" :userInfo="userInfo" :url="currentUrl" :product="productDetail"></rf-product-detail>
    <!--回到顶部-->
		<rf-back-top :scrollTop="scrollTop"></rf-back-top>
		<!-- 404页面 -->
		<view v-if="!productDetail.name && !loading">
			<rf-no-data :custom="true">
				<view class="no-data-title">
					{{ errorInfo || '暂无数据' }}
				</view>
				<view
					@tap="getProductDetail(productDetail.id)"
					slot="refresh"
					class="spec-color"
					>重新加载</view
				>
			</rf-no-data>
		</view>
		<!--顶部下拉菜单-->
		<rf-nav-detail
			@hide="hideNavDetail"
			:popupShow="navDetailShow"
		>
		</rf-nav-detail>
		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading></view>
</template>
<script>
/**
 * @des 商品详情
 *
 * @author stav stavyan@qq.com
 * @date 2020-03-23 15:04
 * @copyright 2019
 */
import { productDetail } from '@/api/product';
import rfProductDetail from '@/components/rf-product-detail';
import rfBackTop from '@/components/rf-back-top';
import rfNoData from '@/components/rf-no-data';
export default {
	components: {
		rfProductDetail,
		rfBackTop,
		rfNoData
	},
	data() {
		return {
			productDetail: {},
			loading: true,
			errorInfo: '',
			userInfo: {},
			scrollTop: 0,
			currentUrl: '',
			navDetailShow: false,
			appName: this.$mSettingConfig.appName
		};
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navDetailShow = true;
		}
	},
	// #endif
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	async onLoad(options) {
		this.productId = options.id;
		this.userInfo = uni.getStorageSync('userInfo') || {};
		await this.initData();
	},
	methods: {
		// 隐藏顶部导航
		hideNavDetail() {
			this.navDetailShow = false;
		},
		// 数据初始化
		async initData() {
      if (this.userInfo.promo_code) {
        this.currentUrl = `${this.$mConfig.hostUrl}/pages/product/product?id=${this.productId}&promo_code=${this.userInfo.promo_code}`;
      } else {
        this.currentUrl = `${this.$mConfig.hostUrl}/pages/product/product?id=${this.productId}`;
      }
			this.hasLogin = this.$mStore.getters.hasLogin;
			await this.getProductDetail();
		},
		// 获取产品详情
		async getProductDetail() {
			await this.$http
				.get(`${productDetail}`, {
					id: this.productId
				})
				.then(async r => {
					this.loading = false;
					this.productDetail = r.data;
					uni.setNavigationBarTitle({ title: r.data.name });
					await this.$mHelper.handleWxH5Share(this.appName, r.data.name, this.currentUrl, r.data.picture);
				})
				.catch(err => {
					this.loading = false;
					this.errorInfo = err;
				});
		}
	}
};
</script>
<style scoped lang="scss">
page {
	background: $page-color-base;
}
</style>
