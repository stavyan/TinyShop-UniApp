<template>
	<view class="about">
		<uni-list>
			<uni-list-item
					v-for="item in navList"
					:key="item.title"
					:title="item.title"
					@tap="navTo(`/pages/about/detail?field=${item.url}&title=${item.title}`)"></uni-list-item>
		</uni-list>
		<view class="history-section icon">
					<view class="sec-header">
						<text class="yticon icon-share"></text>
						<text>分享商城二维码给好友</text>
					</view>
					<view class="qrcode-wrapper">
						<view class="qrcode-section">
							<image class="qrcode" :src="aboutInfo.web_qrcode" mode="aspectFill"></image>
							<text class="info">商城二维码</text>
						</view>
						<view class="qrcode-section">
							<image class="qrcode" :src="aboutInfo.web_wechat_qrcode" mode="aspectFill"></image>
							<text class="info">商城公众号二维码</text>
						</view>
					</view>
		</view>
	</view>
</template>

<script>/**
* @des 优惠券管理
*
* @author stav stavyan@qq.com
* @date 2019-12-09 10:13
* @copyright 2019
*/
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
import {configList} from "../../api/basic";
export default {
	data() {
		return {
			aboutInfo: {},
			navList: [
				{ title: '商城介绍', url: 'title,web_url,key_words,web_desc,web_logo,web_phone,web_email,web_qq,web_weixin,web_address,shouhou_date' },
				{ title: '版权信息', url: 'copyright_companyname,copyright_desc,copyright_url' },
				{ title: '证照信息', url: '' },
				{ title: '注册协议', url: 'protocol_register' },
				{ title: '隐私协议', url: 'protocol_privacy' }
			]
		}
	},
	components: {
		uniList,
		uniListItem
	},
	onLoad() {
		this.initData();
	},
	methods: {
		/**
		 *@des 初始化数据
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/19 15:16:17
		 */
		initData () {
			this.token = uni.getStorageSync('accessToken') || undefined;
			if (this.token) {
				this.getConfigList();
			}
		},
		// 'title,web_url,key_words,web_desc,web_logo,web_qrcode,' +
		// 			'web_wechat_qrcode,web_phone,web_email,web_qq,web_weixin' +
		// 			'web_address,shouhou_date,copyright_logo,copyright_companyname' +
		// 			'copyright_url,copyright_desc' +
		// 			'protocol_register,protocol_privacy'
		async getConfigList() {
			await this.$get(`${configList}`, {
				field: 'web_qrcode,web_wechat_qrcode'
			}).then(r => {
				if (r.code === 200) {
					this.aboutInfo = r.data
				} else {
					uni.showToast({title: r.message, icon: "none"});
				}
			}).catch(err => {
				console.log(err)
			});
		},
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
		.about {
			margin: 20upx 0;
		}
	}
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
			.yticon{
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
				}
				.info {
					display: block;
					margin-bottom: 40upx;
				}
			}
		}
	}
</style>
