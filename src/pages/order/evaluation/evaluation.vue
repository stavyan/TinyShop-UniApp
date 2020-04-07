<template>
	<view class="evaluation">
		<!--商品信息-->
		<view class="product-info">
			<image class="product-image"
						 mode="aspectFill"
						 :src="productInfo.product_picture"></image>
			<view class="product-content">
				<text class="product-name in2line">{{ productInfo.product_name }}</text>
				<text class="product-sku-name">{{ productInfo.sku_name || '基础款' }}</text>
				<text class="product-price">{{ productInfo.product_money }} * {{ productInfo.num }}</text>
			</view>
		</view>
		<!--整体评价-->
		<view class="product-rate" v-show="evaluationType !== 'add'">
			整体评价
			<view class="product-rate-wrapper"><rf-rate
				size="22"
				:value="evaluate.scores"
				 @change="handleScoreChange"
				:margin="8"
				class="rate"
				active-color="#fa436a" />
			</view>
		</view>
		<!--详细描述信息-->
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
			<view class="anonymous" v-show="evaluationType !== 'add'">
				<switch color="#fa436a" @change="handleAnonymousChange" style="transform:scale(0.7)"/>
				<text>{{ anonymousText }}</text>
			</view>
		</view>
		<!--上传图片-->
		<view class="upload-image">
			<view class="upload-image-wrapper"
					 v-for="(item, index) in imageList"
					 :key="item">
				<image
					 mode="aspectFill"
					 class="image"
					 :src="item"></image>
					<text class="iconfont image-close iconfork" @tap="handleImageDelete(index)"></text>
			</view>
			<view class="add" @tap="uploadImage">+</view>
		</view>
		<!--发表评价-->
		<button class="confirm-btn" @tap="handleEvaluate">{{ evaluationType === 'add' ? '我要追评' : '发表评价'}}</button>
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
	import rfRate from "@/components/rf-rate/rf-rate.vue";
	import {evaluateCreate, evaluateAgain, uploadImage} from "@/api/userInfo";
	export default{
		components: { rfRate },
		data(){
			return {
				productInfo: {},
				token: null,
				imageList: [],
				content: '',
				anonymousText: '不匿名',
				evaluationType: null,
				// 评论表单
				evaluate: {
					'scores' : 5,
					'content' : '',
					'is_anonymous' : '0',
					'covers' : '',
					'order_product_id' : ''
				}
			}
		},
		computed: {
	    // 限制140字
			wordLimit () {
				return 140 - this.evaluate.content.length;
			}
		},
		onLoad(options){
		    this.initData(options);
		},
		methods: {
	    // 数据初始化
	    initData(options) {
				this.productInfo = JSON.parse(options.data);
				this.evaluationType = options.type;
				this.token = uni.getStorageSync('accessToken') || undefined;
				let title = '发表评价';
				if(options.type === 'add'){
					title = '追加评价'
				}
				// 设置标题
				uni.setNavigationBarTitle({
					title
				});
	    },
			// 评价内容监听事件
			handleContentChange (e) {
				this.evaluate.content = e.detail.value;
			},
			// 评分监听事件
			handleScoreChange (e) {
				this.evaluate.scores = e.value;
			},
			// 删除定制已删除图片
			handleImageDelete (index) {
				this.imageList.splice(index, 1)
			},
			// 监听是否匿名
			handleAnonymousChange (e) {
				if (e.detail.value) {
					this.evaluate.is_anonymous = 1;
					this.anonymousText = '匿名';
				} else {
					this.evaluate.is_anonymous = 0;
					this.anonymousText = '不匿名';
				}
			},
			// 监听图片上传
			uploadImage () {
				// 从相册选择6张图
				const _this = this;
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths)
					}
				});
			},
			// 图片上传
			handleUploadFile (data) {
				const _this = this;
				data.forEach(item => {
					uni.uploadFile({
					url : uploadImage,
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
						    this.$api.msg(data.message);
						}
					}
				 });
				})
			},
			// 提交评价
			async handleEvaluate() {
				this.evaluate.order_product_id = this.productInfo.id;
				this.evaluate.covers = this.imageList;
				const params = {};
				if (this.evaluationType !== 'add') {
					const data = [];
					data.push(this.evaluate)
					params.evaluate = JSON.stringify(data);
					this.handleEvaluateCreate(params);
				} else {
					params.again_content = this.evaluate.content;
					params.again_covers = JSON.stringify(this.imageList);
					this.handleEvaluateAgain(params);
				}
			},
			// 发表评价
			async handleEvaluateCreate(params) {

				await this.$post(`${evaluateCreate}`, {
					...params
				}).then(() => {
					uni.navigateBack({
						delta: 2
					});
				})
			},
			// 追加评价
			async handleEvaluateAgain(params) {

				await this.$post(`${evaluateAgain}?order_product_id=${this.productInfo.id}`, {
					...params
				}).then(() => {
					uni.navigateBack({
						delta: 2
					});
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
