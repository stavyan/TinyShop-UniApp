<template>
	<view class="about">
		<uni-list>
			<uni-list-item
					v-for="item in navList"
					:key="item.title"
					:title="item.title"
					@tap="navTo(`/pages/set/about/detail?field=${item.url}&title=${item.title}`)"></uni-list-item>
		</uni-list>
		<view class="history-section icon">
			<view class="sec-header">
				<i class="iconfont iconshare"></i>
				<text>分享商城二维码给好友</text>
			</view>
			<view class="qrcode-wrapper">
				<view class="qrcode-section">
					<rf-image class="qrcode" :src="aboutInfo.qrcode"></rf-image>
					<text class="info">商城二维码</text>
				</view>
				<!--<view class="qrcode-section">-->
					<!--<rf-image class="qrcode" :src="aboutInfo.web_qrcode"></rf-image>-->
					<!--<text class="info">商城公众号二维码</text>-->
				<!--</view>-->
			</view>
		</view>
	</view>
</template>

<script>/**
* @des 关于商城
*
* @author stav stavyan@qq.com
* @date 2019-12-09 10:13
* @copyright 2019
*/
import uniList from "@/components/uni-list/uni-list"
import rfImage from "@/components/rf-image/rf-image"
import uniListItem from "@/components/uni-list-item/uni-list-item"
import {merchantView} from "@/api/merchant";
export default {
	data() {
		return {
			aboutInfo: {},
			navList: [
				{ title: '商城介绍', url: '' },
				// { title: '版权信息', url: 'copyright_companyname,copyright_desc,copyright_url' },
				// { title: '证照信息', url: '' },
				{ title: '注册协议', url: 'protocol_register' },
				{ title: '充值协议', url: 'protocol_recharge' },
				{ title: '隐私协议', url: 'protocol_privacy' }
			]
		}
	},
	components: {
		uniList,
		uniListItem,
		rfImage
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData () {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.getConfigList();
			}
		},
		// 获取商城信息
		async getConfigList() {
	    const userInfo = uni.getStorageSync('userInfo');
	    if (!userInfo) return;

			await this.$get(`${merchantView}`, {
				id: userInfo.merchant_id,
				field: 'web_qrcode'
			}).then(r => {
				this.aboutInfo = r.data
			}).catch(err => {
				console.log(err)
			});
		},
		// 统一跳转接口
		navTo(url){
			uni.navigateTo({
				url
			})
		},
	}
}
</script>
<style lang="scss">
	page{
		position: relative;
		background-color: #f5f5f5;
	}
	/*关于商城*/
	.about {
		padding: 20upx 0;
		.history-section{
			padding: 30upx 0 0;
			margin-top: 20upx;
			background: #fff;
			border-radius:10upx;
			.sec-header{
				display:flex;
				align-items: center;
				font-size: $font-base;
				color: $font-color-dark;
				line-height: 40upx;
				margin-left: 30upx;
				.iconfont{
					font-size: 44upx;
					color: #5eba8f;
					margin-right: 16upx;
					line-height: 40upx;
				}
			}
			.qrcode-wrapper {
				margin: 40upx auto;
				display: flex;
				.qrcode-section {
					flex: 1;
					overflow: hidden;
					text-align: center;
					.qrcode {
						width: 280upx;
						height: 280upx;
						image {
							width: 280upx;
							height: 280upx;
						}
					}
					.info {
						display: block;
						margin-bottom: 40upx;
					}
				}
			}
		}
	}
</style>
