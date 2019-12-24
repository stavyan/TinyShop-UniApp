<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg2.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao"></text>
      <!--#ifdef H5-->
			<view class="portrait-box" @click="uploadImage">
				<image class="portrait" :src="profileInfo.head_portrait || '/static/missing-face.png'"></image>
				<!--<text class="pt-upload-btn yticon icon-paizhao">{{ // profileInfo.nickname || "暂无昵称" }}</text>-->
			</view>
      <!-- #endif -->
			<!--#ifndef H5-->
			<view class="portrait-box">
        <avatar
					canRotate="false"
          selWidth="200px" selHeight="400upx" @upload="handleUploadFile" :avatarSrc="profileInfo.head_portrait"
          avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;">
        </avatar>
			</view>
      <!-- #endif -->
		</view>
		<view class="input-content">
			<form @submit="toUpdateInfo">
				<view class="input-item">
					<text class="tit">手机号</text>
					<input
						type="number"
						name="mobile"
						:value="profileInfo.mobile"
						disabled
						placeholder="请输入手机号码"
					/>
				</view>
				<view class="input-item">
					<text class="tit">昵　称</text>
					<input
						type="text"
						:value="profileInfo.nickname"
						name="nickname"
						placeholder="请输入您的昵称"
					/>
				</view>
				<view class="input-item">
					<text class="tit">姓　名</text>
					<input
						type="text"
						:value="profileInfo.realname"
						name="realname"
						placeholder="请输入您的姓名"
					/>
				</view>
				<view class="input-item">
					<text class="tit">性　别</text>
					 <view>
						<radio-group name="gender" class="gender">
							<label class="gender-item" v-for="(item, index) in genders" :key="index">
								<radio class="gender-item-radio" color="#fa436a" :value="item.value" :checked="item.value === profileInfo.gender" />
								<text class="gender-item-text">{{ item.name }}</text>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="input-item">
					<text class="tit">生　日</text>
					<picker mode="date" :value="date" @change="bindDateChange">
						<view class="date" style="background: none;">{{ date }}</view>
					</picker>
				</view>
				<view class="input-item">
					<text class="tit">Q　Q</text>
					<input
						type="number"
						:value="profileInfo.qq"
						name="qq"
						placeholder="请输入您的QQ"
					/>
				</view>
				<view class="input-item">
					<text class="tit">邮　箱</text>
					<input
						type="number"
						:value="profileInfo.email"
						name="email"
						placeholder="请输入您的邮箱"
					/>
				</view>
				<button class="confirm-btn" formType="submit">修改资料</button>
			</form>
		</view>
	</view>
</template>

<script>
	import {memberInfo, memberUpdate, uploadImage} from "../../api/userInfo";
	const graceChecker = require("../../common/graceChecker.js");
	import avatar from "@/components/rf-avatar/rf-avatar.vue";
	export default {
		components: {
				avatar
		},
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				profileInfo: {},
				avatar: null,
				genders: [
					{
						value: '0',
						name: '未知'
					},
					{
						value: '1',
						name: '男'
					},
					{
						value: '2',
						name: '女'
					}],
				date: currentDate,
				token: null
			};
		},
    computed: {
    },
		onLoad () {
			this.initData()
		},
		methods: {
			myUpload(rsp) {
					this.profileInfo.head_portrait = rsp.path; //更新头像方式一
					//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			/**
			 *@des 修改头像
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/12/18 11:44:44
			 *@param graceChecker
			 */
			uploadImage () {
				// 从相册选择6张图
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths)
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
				console.log(data)
				const _this = this;
				uni.uploadFile({
					url : uploadImage,
					filePath: data.path,
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
							_this.profileInfo.head_portrait = data.data.url;
							_this.handleUpdateInfo(_this.profileInfo)
						} else {
							uni.showToast({ title: data.message, icon: "none" });
						}
					}
				 });
			},
			bindDateChange(e) {
				this.date = e.target.value
			},
			getDate(type) {
						const date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();

						if (type === 'start') {
								year = year - 60;
						} else if (type === 'end') {
								year = year + 2;
						}
						month = month > 9 ? month : '0' + month;;
						day = day > 9 ? day : '0' + day;
						return `${year}-${month}-${day}`;
				},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/16 11:07:25
			 */
			initData () {
				this.token = uni.getStorageSync('accessToken') || undefined
				if (!this.token) {
					uni.reLaunch({
						url: "/pages/public/login",
					})
				} else {
					this.getMemberInfo()
				}
			},
			async getMemberInfo () {
				await this.$get(memberInfo).then(r => {
					if (r.code === 200) {
						this.profileInfo = r.data
						this.date = this.profileInfo.birthday;
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				})
			},
			async toUpdateInfo(e){
				const formData = e.detail.value;
				let rule = [
					{name:"mobile", checkType : "phoneno", checkRule:"11,11",  errorMsg:"请输入正确的手机号"}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				this.handleUpdateInfo(formData, 'avatar');
			},
			async handleUpdateInfo (formData, type) {
				uni.showLoading({title:'资料修改中...'});
				await this.$put(`${memberUpdate}?id=${this.profileInfo.id}`, {
					...formData,
					birthday: this.date
				}).then(r=>{
					if (r.code === 200) {
						uni.showToast({ title: '恭喜您, 资料修改成功！', icon: "none" });
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.userinfo{
		background: #fff;
	}
	.user-section{
		display:flex;
		align-items:center;
		justify-content: center;
		height: 300upx;
		padding: 40upx 30upx 0;
		overflow: hidden;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.portrait-box{
			clear: both;
			z-index: 2;
		}
		.portrait{
			position: relative;
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
      border: 6upx solid #fff;
		}
		.yticon{
			position:absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0,0,0,.4);
		}
		.pt-upload-btn{
			right: 0;
			bottom: 10upx;
		}
		.bg-upload-btn{
			right: 20upx;
			bottom: 16upx;
		}
	}
	.input-content{
		padding: 40upx 60upx;
		.input-item{
			display:flex;
			padding: 0 30upx;
			background: $page-color-light;
			height: 80upx;
			line-height: 80upx;
			border-radius: 4px;
			margin-bottom: 30upx;
			&:last-child{
				margin-bottom: 0;
			}
			.tit{
				width: 90upx;
				font-size: $font-sm+2upx;
				color: $font-color-base;
			}
			input {
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}
			.date {
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}
			.gender {
				margin: 10upx 0;
				color: $font-color-dark;
				font-size: $font-base;
				.gender-item {
					margin-right: 10upx;
					.gender-item-text {
						padding: 0 5upx;
					}
					radio .wx-radio-input.wx-radio-input-checked {
						background: $uni-color-primary;
						border-color: $uni-color-primary;
					}
				}
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
