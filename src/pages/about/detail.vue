<template>
	<view class="about">
		<view class="shop-info" v-show="title === '商城介绍'">
			<image :src="detail.web_logo" />
			<view v-show="detail.title"><text>商城名称: </text><text>{{ detail.title }}</text></view>
			<view v-show="detail.web_url"><text>官方网址: </text><text>{{ detail.web_url }}</text></view>
<!--			<view v-show="detail.key_words"><text>商城关键字: </text><text>{{ detail.key_words }}</text></view>-->
<!--			<view v-show="detail.web_desc"><text>商城描述: </text><text>{{ detail.web_desc	 }}</text></view>-->
			<view v-show="detail.web_phone"><text>商城联系方式: </text><text>{{ detail.web_phone }}</text></view>
			<view v-show="detail.web_email"><text>商城邮箱: </text><text>{{ detail.web_email }}</text></view>
			<view v-show="detail.web_qq"><text>商城QQ号: </text><text>{{ detail.web_qq }}</text></view>
			<view v-show="detail.web_weixin"><text>商城微信号: </text><text>{{ detail.web_weixin }}</text></view>
			<view v-show="detail.web_address"><text>联系地址: </text><text>{{ detail.web_address }}</text></view>
			<view v-show="detail.shouhou_date"><text>售后设置: </text><text>{{ detail.shouhou_date }}</text></view>
		</view>
		<view class="shop-info" v-show="title === '版权信息'">
			<view v-show="detail.copyright_companyname"><text>公司名称: </text><text>{{ detail.copyright_companyname }}</text></view>
			<view v-show="detail.copyright_url"><text>版权链接: </text><text>{{ detail.copyright_url }}</text></view>
			<view v-show="detail.copyright_desc"><text>版权信息: </text><text>{{ detail.copyright_desc }}</text></view>
		</view>
		<view class="shop-info" v-show="title === '证照信息'"></view>
		<view class="shop-info" v-show="title === '注册协议'">
			<view v-show="detail.protocol_register"><text>注册协议: </text><text>{{ detail.protocol_register }}</text></view>
			<empty :info="`暂无${title}`" v-if="!detail.protocol_register"></empty>
		</view>
		<view class="shop-info" v-show="title === '隐私协议'">
			<view v-show="detail.protocol_privacy"><text>隐私协议: </text><text>{{ detail.protocol_privacy }}</text></view>
			<empty :info="`暂无${title}`" v-if="!detail.protocol_privacy"></empty>
		</view>
		<empty :info="`暂无${title}`" v-if="detail.length === 0"></empty>
	</view>
</template>

<script>/**
* @des 优惠券管理
*
* @author stav stavyan@qq.com
* @date 2019-12-09 10:13
* @copyright 2019
*/
import {configList} from "../../api/basic";
import empty from "@/components/empty";
export default {
		components: {
			empty
		},
	data() {
		return {
			detail: {},
			title: null
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
			await this.$get(`${configList}`, {
				field,
			}).then(r => {
				if (r.code === 200) {
					this.detail = r.data
				} else {
					uni.showToast({title: r.message, icon: "none"});
				}
			}).catch(err => {
				console.log(err)
			});
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
				margin: 100upx 0;
				text-align: center;
				image {
					width: 240upx;
					height: 240upx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
