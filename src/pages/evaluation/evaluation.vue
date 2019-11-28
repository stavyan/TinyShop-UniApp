<template>
	<view class="evaluation">
		<view class="product-info">
			<image class="product-image"
						 mode="aspectFill"
						 :src="productInfo.product_picture"></image>
			<view class="product-content">
				<text class="product-name in2line">{{ productInfo.product_name }}</text>
				<text class="product-sku-name">{{ productInfo.skuName || '基础款' }}</text>
				<text class="product-price">{{ productInfo.product_money }} * {{ productInfo.num }}</text>
			</view>
		</view>
		<view class="product-rate">
			整体评价
			<view class="product-rate-wrapper"><uni-rate
				size="24"
				:value="evaluate.scores"
				:margin="12"
				class="rate"
				active-color="#fa436a" />
			</view>
		</view>
		<view class="product-textarea">
       <textarea class="textarea" maxlength="140"
								 @input="handleContentChange"
								 :value="evaluate.content"
								 placeholder-style="color:#ccc; font-size: 24upx"
								 placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给你想买的他们吧"/>
			<view class="tips">
				<text v-show="evaluate.content.length > 0 && evaluate.content.length < 40">
					您已输入<text class="f"> {{ evaluate.content.length }} </text>字
				</text>
				<text v-show="evaluate.content.length >= 40">
						还可输入 <text class="s"> {{ wordLimit }} </text> 字
				</text>
			</view>
			<view class="anonymous">
				<switch color="#fa436a" @change="handleAnonymousChange" style="transform:scale(0.7)"/>
				<text>{{ anonymousText }}</text>
			</view>
		</view>
		<view class="upload-image">
			<view class="upload-image-wrapper"
					 v-for="(item, index) in imageList"
					 :key="item">
				<image
					 mode="aspectFill"
					 class="image"
					 :src="item"></image>
					<uni-icons
							class="image-close"
							color="#333"
							@click="handleImageDelete(index)"
							type="close"
							size="20" />
			</view>
			<view class="add" @click="uploadImage">+</view>
		</view>

		<button class="confirm-btn" @click="handleEvaluate">评价</button>
	</view>
</template>

<script>
	/**
	 * @des 发布评价
	 *
	 * @author stav stavyan@qq.com
	 * @date 2019-11-27 14:32
	 * @copyright 2019
	 */
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import {evaluateCreate} from "../../api/userInfo";
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default{
		components: { uniRate, uniIcons },
		data(){
			return {
				productInfo: {},
				token: null,
				imageList: [],
				content: '',
				anonymousText: '不匿名',
				evaluate: {
					'scores' : 3,
					'content' : '',
					'is_anonymous' : '0',
					'covers' : '',
					'order_product_id' : ''
				}
			}
		},
		computed: {
			wordLimit () {
				return 140 - this.evaluate.content.length;
			}
		},
		onLoad(options){
			this.productInfo = JSON.parse(options.data);
			this.token = uni.getStorageSync('accessToken') || undefined;
		},
		methods: {
			/**
			 *@des 评价内容监听事件
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/27 15:51:21
			 *@param arguments
			 */
			handleContentChange (e) {
				this.evaluate.content = e.detail.value;
			},
			/**
			 *@des 删除定制已删除图片
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/28 17:39:04
			 */
			handleImageDelete (index) {
				this.imageList.splice(index, 1)
			},
			/**
			 *@des 监听是否匿名
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/27 16:28:18
			 */
			handleAnonymousChange (e) {
				if (e.detail.value) {
					this.evaluate.is_anonymous = 1;
					this.anonymousText = '匿名';
				} else {
					this.evaluate.is_anonymous = 0;
					this.anonymousText = '不匿名';
				}
			},
			uploadImage () {
				// 从相册选择6张图
				const _this = this;
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths)
						// _this.$post(`${uploadFile}`, {
						// 	file: res.tempFilePaths[0]
						// }).then(r=>{
						// 	if (r.code === 200) {
						// 		console.log(r)
						// 	} else {
						// 		uni.showToast({ title: r.message, icon: "none" });
						// 	}
						// }).catch(err => {
						// 	console.log(err)
						// })
							// // 预览图片
							// uni.previewImage({
							// 		urls: res.tempFilePaths,
							// 		longPressActions: {
							// 				itemList: ['发送给朋友', '保存图片', '收藏'],
							// 				success: function(data) {
							// 						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							// 				},
							// 				fail: function(err) {
							// 						console.log(err.errMsg);
							// 				}
							// 		}
							// });
					}
				});
			},
			handleUploadFile (data) {
				const _this = this;
				data.forEach(item => {
					uni.uploadFile({
					url : 'https://www.yllook.com/api/v1/file/images',
					filePath: item,
					name: 'file',
					header: {
						"x-api-key": _this.token,
						"merchant-id": 1
					},
					formData: {
						'access-token': _this.token,
						"merchant-id": 1
					},
					success (r) {
						uni.hideLoading();
						const data = JSON.parse(r.data);
						if (data.code === 200) {
							_this.imageList.push(data.data.url)
						} else {
							uni.showToast({ title: data.message, icon: "none" });
						}
					}
				 });
				})
			},
			/**
			 *@des 提交评价
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/27 16:50:56
			 */ async handleEvaluate() {
				this.evaluate.order_product_id = this.productInfo.id;
				this.evaluate.covers = this.imageList;
				const params = {};
				const data = [];
				data.push(this.evaluate)
				params.evaluate = JSON.stringify(data);
				uni.showLoading({title: '评论中...'});
				await this.$post(`${evaluateCreate}`, {
					...params
				}).then(r => {
					if (r.code === 200) {
						uni.navigateBack({
							delta: 2
						});
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang='scss'>
	.evaluation {
		background: #fff;
		padding: 20upx;
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
					font-size: $font-lg;
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
			font-size: $font-lg;
			color: $font-color-dark;
			padding: 20upx 0;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			.product-rate-wrapper {
				display: inline-block;
			}
		}
		.product-textarea {
			margin-top: 20upx;
			height: 300upx;
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
		.confirm-btn{
			width: 630upx;
			height: 76upx;
			line-height: 76upx;
			border-radius: 50px;
			margin-top: 50upx;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			&:after{
				border-radius: 100px;
			}
		}
	}
</style>
