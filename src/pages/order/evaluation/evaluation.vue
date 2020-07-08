<template>
	<view class="evaluation" v-if="!loading">
		<view
			class="evaluation-item"
			v-for="(item, index) in productList"
			:key="index"
		>
			<!--商品信息-->
			<view class="product-info">
				<image
					class="product-image"
					mode="aspectFill"
					:src="item.product_picture"
				></image>
				<view class="product-content">
					<text class="product-name in2line">{{ item.product_name }}</text>
					<text class="product-sku-name">{{ item.sku_name || singleSkuText }}</text>
					<text class="product-price" :class="'text-' + themeColor.name"
						>{{ moneySymbol }}{{ item.product_money }}</text
					>
					* {{ item.num }}
				</view>
			</view>
			<!--整体评价-->
			<view class="product-rate" v-if="evaluationType !== 'add'">
				整体评价
				<view class="product-rate-wrapper">
					<rf-rate
						size="22"
						:value="item.scores || 5"
						:index="index"
						@change="handleScoreChange"
						:margin="8"
						class="rate"
						:active-color="themeColor.color"
					></rf-rate>
				</view>
			</view>
			<!--详细描述信息-->
			<view class="product-textarea">
				<textarea
					class="textarea"
					maxlength="140"
					v-model="item.content"
					placeholder-style="color:#ccc; font-size: 24upx"
					placeholder="宝贝满足您的期待吗？说说您的使用心得，分享给您想买的他们吧"
				/>
				<!--<view class="tips">-->
				<!--{{ item.content }}-->
				<!--<text v-if="item.content && item.content.length > 0 && item.content.length < 40">-->
				<!--您已输入<text class="f"> {{ item.content.length }} </text>字-->
				<!--</text>-->
				<!--<text v-if="item.content.length >= 40">-->
				<!--还可输入 <text class="s"> {{ wordLimit(index) }} </text> 字-->
				<!--</text>-->
				<!--</view>-->
				<view class="anonymous" v-if="evaluationType !== 'add'">
					<switch
						:color="themeColor.color"
						:checked="is_anonymous == 1"
						@change="handleAnonymousChange"
						style="transform:scale(0.7)"
					/>
					<text class="spec-color">{{
						parseInt(is_anonymous, 10) === 1 ? '匿名' : '不匿名'
					}}</text>
				</view>
			</view>
			<!--上传图片-->
			<view class="rf-uploader">
				<view class="uni-uploader">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view v-for="(image, i) in imageList[index]" :key="i">
								<view class="uni-uploader__file" style="position: relative;">
									<image class="uni-uploader__img" :src="image"></image>
									<view class="close-view" @tap="close(i, index)">x</view>
								</view>
							</view>
							<view
								class="uni-uploader__input-box"
								v-if="imageList[index].length < 8"
							>
								<view
									class="uni-uploader__input"
									@tap="uploadImage(index)"
								></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--发表评价-->
			<button class="confirm-btn" :class="'bg-' + themeColor.name" @tap="handleEvaluate(item, index)">
				{{ evaluationType === 'add' ? '我要追评' : '发表评价' }}
			</button>
		</view>
		<rf-empty info="暂无待评价商品" v-if="productList.length === 0"></rf-empty>
	</view>
</template>

<script>
/**
 * @des 发表评价
 *
 * @author stav stavyan@qq.com
 * @date 2019-11-27 14:32
 * @copyright 2019
 */
import rfRate from '@/components/rf-rate/rf-rate';
import { evaluateCreate, evaluateAgain, uploadImage, orderProductIndex } from '@/api/userInfo';
export default {
	components: { rfRate },
	data() {
		return {
			loading: true,
			productList: [],
			token: null,
			content: '',
			evaluationType: null,
			imageList: [],
			// 评论表单
			is_anonymous: '1',
			moneySymbol: this.moneySymbol,
			orderId: '',
			singleSkuText: this.singleSkuText
		};
	},
	computed: {
		// 限制140字
		wordLimit() {
			return index => {
				return 140 - this.productList[index].content.length;
			};
		}
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		// 数据初始化
		async initData(options) {
			this.productList.length = 0;
			this.evaluationType = options.type;
			if (options.data) {
				this.productList.push(JSON.parse(options.data));
				this.productList.forEach(item => {
					this.imageList.push([]);
					item.content = '';
					item.scores = 5;
				});
				this.loading = false;
			} else if (options.order_id) {
				this.orderId = options.order_id;
				this.getOrderProductList();
			}
			let title = '发表评价';
			if (options.type === 'add') {
				title = '追加评价';
			}
			// 设置标题
			uni.setNavigationBarTitle({
				title
			});
		},
		async getOrderProductList() {
			await this.$http
				.get(orderProductIndex, { order_id: this.orderId, is_evaluate: 0 })
				.then(async r => {
					this.loading = false;
					this.productList = r.data;
					this.productList.forEach(item => {
						this.imageList.push([]);
						item.content = '';
						item.scores = 5;
					});
				});
				this.loading = false;
		},
		// 评分监听事件
		handleScoreChange(e) {
			this.productList[e.index].scores = e.value;
		},
		// 监听是否匿名
		handleAnonymousChange(e) {
			if (e.detail.value) {
				this.is_anonymous = 1;
			} else {
				this.is_anonymous = 0;
			}
		},
		// 删除已选中图片
		close(e, index) {
			this.imageList[index].splice(e, 1);
		},
		// 监听图片上传
		uploadImage(index) {
			// 从相册选择6张图
			const _this = this;
			uni.chooseImage({
				count: 6,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: async function(res) {
					await _this.handleUploadFile(res.tempFilePaths, index);
				}
			});
		},
		// 依次上传图片
		async handleUploadFile(data, index) {
			data.forEach(item => {
				this.$http
					.upload(uploadImage, { filePath: item, name: 'file' })
					.then(async r => {
						this.imageList[index].push(r.data.url);
					});
			});
		},
		// 提交评价
		async handleEvaluate(item, index) {
			const params = {};
			if (this.evaluationType !== 'add') {
				let data = [];
				data.push({
					order_product_id: item.id,
					is_anonymous: this.is_anonymous,
					covers: this.imageList[index],
					scores: item.scores,
					content: item.content
				});
				params.evaluate = JSON.stringify(data);
				this.handleEvaluateCreate(params);
			} else {
				params.order_product_id = item.id;
				params.again_content = item.content;
				params.again_covers = JSON.stringify(this.imageList[index]);
				this.handleEvaluateAgain(params);
			}
		},
		// 发表评价
		async handleEvaluateCreate(params) {
			await this.$http.post(`${evaluateCreate}`, params).then(() => {
				if (this.productList.length === 1) {
					this.$mRouter.back();
				} else {
					this.getOrderProductList();
				}
			});
		},
		// 追加评价
		async handleEvaluateAgain(params) {
			await this.$http
				.post(
					`${evaluateAgain}?order_product_id=${params.order_product_id}`,
					params
				)
				.then(() => {
					this.$mRouter.back();
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}
.evaluation {
	margin-bottom: $spacing-lg;
	.evaluation-item {
		margin: $spacing-base;
		padding: $spacing-lg;
		background-color: $color-white;
		border-radius: 12upx;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
	}
	.product-info {
		display: flex;
		.product-image {
			width: 200upx;
			height: 150upx;
		}
		.product-content {
			flex: 1;
			margin-left: 20upx;
			.product-name {
				font-size: $font-base;
				color: $font-color-dark;
				line-height: 32upx;
				min-height: 60upx;
			}
			.product-sku-name {
				display: block;
				font-size: $font-base;
				color: $font-color-dark;
			}
		}
	}
	.product-rate {
		display: flex;
		align-items: center;
		font-size: $font-lg;
		color: $font-color-dark;
		padding: 20upx 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.product-rate-wrapper {
			margin-top: $spacing-sm;
			display: inline-block;
		}
	}
	.product-textarea {
		margin-top: 20upx;
		height: 360upx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		position: relative;
		.textarea {
			width: 100%;
		}
		.tips {
			position: absolute;
			bottom: 10upx;
			right: 0;
			font-size: $font-sm;
			color: $font-color-light;
			.f {
				color: $uni-color-success;
			}
			.s {
				color: $uni-color-primary;
			}
		}
		.anonymous {
			color: $font-color-light;
			font-size: $font-sm;
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}
	.upload-image {
		overflow: hidden;
		margin: 40upx 0;
		.upload-image-wrapper {
			display: inline-block;
			position: relative;
			width: 200upx;
			height: 200upx;
			padding: 10upx;
			margin: 10upx;
			.image {
				display: inline-block;
				width: 180upx;
				height: 180upx;
			}
			.image-close {
				position: absolute;
				top: -10upx;
				right: -10upx;
			}
		}
		.add {
			display: inline-block;
			overflow: hidden;
			width: 180upx;
			height: 180upx;
			text-align: center;
			border: 1px solid rgba(0, 0, 0, 0.05);
			font-size: 88upx;
			color: $font-color-base;
			font-weight: 100;
		}
	}
	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 50upx;
		font-size: $font-lg;
		&:after {
			border-radius: 100px;
		}
	}
	.uni-uploader__file {
		width: 190upx;
		height: 190upx;
	}
	.uni-uploader__input-box {
		width: 188upx;
		height: 188upx;
	}
}
</style>
