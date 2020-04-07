<template>
  <view class="page">
    <view class='feedback-title'>
      <text>问题和意见</text>
      <text class="feedback-quick" @tap="chooseMsg">快速键入</text>
    </view>
    <view class="feedback-body">
      <textarea placeholder="请详细描述你的问题和意见..." v-model="sendDate.content" class="feedback-textare"/>
    </view>
    <view class='feedback-title'>
      <text>图片(选填,提供问题截图,总大小10M以下)</text>
    </view>
    <view class="feedback-body feedback-uploader">
      <view class="uni-uploader">
        <view class="uni-uploader-head">
          <view class="uni-uploader-title">点击预览图片</view>
          <view class="uni-uploader-info">{{imageList.length}}/9</view>
        </view>
        <view class="uni-uploader-body">
          <view class="uni-uploader__files">
            <block v-for="(image,index) in imageList" :key="index">
              <view class="uni-uploader__file" style="position: relative;">
                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                <view class="close-view" @tap="close(index)">x</view>
              </view>
            </block>
            <view class="uni-uploader__input-box" v-show="imageList.length < 8">
              <view class="uni-uploader__input" @tap="uploadImage"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class='feedback-title'>
      <text>反馈类型</text>
    </view>
    <view class="feedback-body">
      <radio-group class="feedback-type" @change="handleFeedbackTypeChange">
        <label class="feedback-type-item" v-for="(item, index) in feedbackType" :key="index">
          <radio color="#fa436a" :value="item.value" :checked="item.value === sendDate.type"/>
          <text>{{ item.name }}</text>
        </label>
      </radio-group>
    </view>
    <view class='feedback-title'>
      <text>QQ/邮箱/手机号</text>
    </view>
    <view class="feedback-body">
      <input class="feedback-input" v-model="sendDate.contact_way" placeholder="(选填,方便我们联系你 )"/>
    </view>
    <button class="feedback-submit" @tap="send">提交</button>
    <view class='feedback-title'>
      <text>反馈结果可在设置 -> 意见反馈 -> 点击列表后查看！</text>
    </view>
  </view>
</template>

<script>
    import {opinionCreate, uploadImage} from "@/api/userInfo";
   export default {
        data() {
            return {
                msgContents: ["界面显示错乱", "启动缓慢，卡出翔了", "UI无法直视，丑哭了", "偶发性崩溃"],
                stars: [1, 2, 3, 4, 5],
                token: null,
                imageList: [],
                feedbackType: [
                    {
                        value: '1',
                        name: '功能建议'
                    },
                    {
                        value: '2',
                        name: 'BUG反馈'
                    },
                    {
                        value: '3',
                        name: '业务咨询'
                    }],
                sendDate: {
                    type: '1',
                    covers: "",
                    content: "",
                    contact_way: ""
                }
            }
        },
        onLoad() {
            this.token = uni.getStorageSync('accessToken') || undefined;
        },
        methods: {
            handleFeedbackTypeChange(e) {
                this.sendDate.type = e.detail.value
            },
            uploadImage() {
                // 从相册选择6张图
                const _this = this;
                uni.chooseImage({
                    count: 6,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album'],
                    success: function (res) {
                        _this.handleUploadFile(res.tempFilePaths)
                    }
                });
            },
            handleUploadFile(data) {
                const _this = this;
                data.forEach(item => {
                    uni.uploadFile({
                        url: uploadImage,
                        filePath: item,
                        name: 'file',
                        header: {
                            "x-api-key": _this.token,
                        },
                        formData: {
                            'access-token': _this.token,
                        },
                        success(r) {
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
            close(e) {
                this.imageList.splice(e, 1);
            },
            chooseMsg() { //快速输入
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.content = this.msgContents[res.tapIndex];
                    }
                })
            },
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            async send() { //发送反馈
                this.sendDate.covers = JSON.stringify(this.imageList);
                await this.$post(`${opinionCreate}`, {
                    ...this.sendDate
                }).then(() => {
                    uni.navigateBack({
                        delta: 1
                    });
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang='scss'>
    @font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
    }
    page {
        background-color: $page-color-light;
    }
    view{
        font-size: 28upx;
    }
    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
    }
    /* 上传 */
    .uni-uploader {
    	flex: 1;
    	flex-direction: column;
    }
    .uni-uploader-head {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    }
    .uni-uploader-info {
    	color: #B2B2B2;
    }
    .uni-uploader-body {
    	margin-top: 16upx;
    }
    .uni-uploader__files {
    	display: flex;
    	flex-direction: row;
    	flex-wrap: wrap;
    }
    .uni-uploader__file {
    	margin: 10upx;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__img {
    	display: block;
    	width: 210upx;
    	height: 210upx;
    }
    .uni-uploader__input-box {
    	position: relative;
    	margin:10upx;
    	width: 208upx;
    	height: 208upx;
    	border: 2upx solid #D9D9D9;
    }
    .uni-uploader__input-box:before,
    .uni-uploader__input-box:after {
    	content: " ";
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    	background-color: #D9D9D9;
    }
    .uni-uploader__input-box:before {
    	width: 4upx;
    	height: 79upx;
    }
    .uni-uploader__input-box:after {
    	width: 79upx;
    	height: 4upx;
    }
    .uni-uploader__input-box:active {
    	border-color: #999999;
    }
    .uni-uploader__input-box:active:before,
    .uni-uploader__input-box:active:after {
    	background-color: #999999;
    }
    .uni-uploader__input {
    	position: absolute;
    	z-index: 1;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	opacity: 0;
    }

    /*问题反馈*/
    .feedback-title {
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	padding: 20upx;
    	color: #8f8f94;
    	font-size: 28upx;
    }
    .feedback-star-view.feedback-title {
    	justify-content: flex-start;
    	margin: 0;
    }
    .feedback-quick {
    	position: relative;
    	padding-right: 40upx;
    }
    .feedback-quick:after {
    	font-family: uniicons;
    	font-size: 40upx;
    	content: '\e581';
    	position: absolute;
    	right: 0;
    	top: 50%;
    	color: #bbb;
    	-webkit-transform: translateY(-50%);
    	transform: translateY(-50%);
    }
    .feedback-body {
    	background: #fff;
     .feedback-type {
        padding: 20upx;
         .feedback-type-item {
             margin-right: 20upx;
         }
      }
    }
    .feedback-textare {
    	height: 200upx;
    	font-size: 34upx;
    	line-height: 50upx;
    	width: 100%;
    	box-sizing: border-box;
    	padding: 20upx 30upx 0;
    }
    .feedback-input {
    	font-size: 28upx;
    	height: 72upx;
    	min-height: 50upx;
    	padding: 15upx 20upx;
    	line-height: 72upx;
    }
    .feedback-uploader {
    	padding: 22upx 20upx;
    }
    .feedback-star {
    	font-family: uniicons;
    	font-size: 40upx;
    	margin-left: 6upx;
    }
    .feedback-star-view {
    	margin-left: 20upx;
    }
    .feedback-star:after {
    	content: '\e408';
    }
    .feedback-star.active {
    	color: #FFB400;
    }
    .feedback-star.active:after {
    	content: '\e438';
    }
    .feedback-submit {
    	background: $base-color;
    	color: #FFFFFF;
    	margin: 20upx;
    }
</style>
