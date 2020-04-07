<template>
	<view class="about">
		<view>
			<view class="shop-info" v-if="title === '商城介绍'">
				<rf-image :src="detail.cover || detail.web_logo"></rf-image>
				<view v-if="detail.title"><text>商城名称: </text><text>{{ detail.title }}</text></view>
				<view v-if="detail.address_name"><text>联系地址: </text><text>{{ detail.address_name }}</text></view>
				<view v-if="detail.address_details"><text>详细地址: </text><text>{{ detail.address_details }}</text></view>
				<view v-if="detail.mobile"><text>手机号码: </text><text>{{ detail.mobile }}</text></view>
				<view v-if="detail.qq"><text>QQ: </text><text>{{ detail.qq }}</text></view>
			</view>
			<view class="shop-info" v-if="title === '注册协议'">
				<view v-if="detail.protocol_register"><text v-html="detail.protocol_register"></text></view>
				<rf-empty :info="`暂无${title}`" v-if="!detail.protocol_register"></rf-empty>
			</view>
			<view class="shop-info" v-if="title === '隐私协议'">
				<view v-if="detail.protocol_privacy"><text v-html="detail.protocol_privacy"></text></view>
				<rf-empty :info="`暂无${title}`" v-if="!detail.protocol_privacy"></rf-empty>
			</view>
			<view class="shop-info" v-if="title === '充值协议'">
				<view v-if="detail.protocol_recharge"><text v-html="detail.protocol_recharge"></text></view>
				<rf-empty :info="`暂无${title}`" v-if="!detail.protocol_recharge"></rf-empty>
			</view>
		</view>
		<rf-empty :info="`暂无${title}`" v-if="!detail && !loading"></rf-empty>
		<!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>/**
* @des 优惠券管理
*
* @author stav stavyan@qq.com
* @date 2019-12-09 10:13
* @copyright 2019
*/
import {configList} from "@/api/basic";
import {merchantView} from "@/api/merchant";

import rfImage from "@/components/rf-image/rf-image";
export default {
		components: {
			rfImage,
		},
	data() {
		return {
			detail: {},
			title: null,
			loading: true
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		/**
		 *@des 初始化数据
		 *@author stav stavyan@qq.com
		 *@blog https://stavtop.club
		 *@date 2019/12/19 15:16:17
		 */
		initData (options) {
			this.title = options.title;
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.getConfigList(options.field);
		},
		async getConfigList(field) {
	    if (field.indexOf('protocol') !== -1) {
				await this.$get(`${configList}`, {
					field,
				}).then(r => {
			    this.loading = false;
					this.detail = r.data
				}).catch(err => {
			    this.loading = false;
					console.log(err)
				});
	    } else {
			  const userInfo = uni.getStorageSync('userInfo');
		    if (!userInfo) return;

				await this.$get(`${merchantView}`, {
					id: userInfo.merchant_id,
					field,
				}).then(r => {
			    this.loading = false;
					this.detail = r.data
				}).catch(err => {
			    this.loading = false;
					console.log(err)
				});
	    }
		}
	}
}
</script>
<style lang="scss">
	page{
		position: relative;
		background-color: #f5f5f5;
		.about {
			.shop-info {
				text-align: center;
				image {
					margin-top: 100upx;
					width: 240upx;
					height: 240upx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
