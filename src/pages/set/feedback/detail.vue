<template>
    <view class="page">
        <view class='feedback-title'>
            <text>问题和意见</text>
        </view>
        <view class="feedback-body">
            <textarea disabled :value="feedbackDetail.content" class="feedback-textare" />
        </view>

        <view class='feedback-title'>
            <text>图片</text>
        </view>
        <view class="uni-uploader-body">
            <view class="uni-uploader__files">
                <block v-for="(image,index) in feedbackDetail.covers" :key="index">
                    <view class="uni-uploader__file">
                        <rf-image class="uni-uploader__img" :src="image"></rf-image>
                    </view>
                </block>
            </view>
        </view>

        <view class='feedback-title'>
            <text>反馈类型</text>
        </view>
        <view class="feedback-body">
						<radio-group class="feedback-type">
							<label class="feedback-type-item" v-for="(item, index) in feedbackType" :key="index">
								<radio color="#fa436a" disabled :value="item.value" :checked="item.value == feedbackDetail.type" />
								<text>{{ item.name }}</text>
							</label>
            </radio-group>
        </view>

        <view class='feedback-title'>
            <text>QQ/邮箱/手机号</text>
        </view>
        <view class="feedback-body">
            <input class="feedback-input" disabled :value="feedbackDetail.contact_way || '暂未留下联系方式'" />
        </view>

        <view class='feedback-title'>
            <text>回复内容</text>
        </view>
        <view class="feedback-body">
            <textarea disabled :value="feedbackDetail.reply || '管理员未回复'" class="feedback-textare" />
        </view>
    </view>
</template>

<script>
    /**
     * @des 意见反馈详情
     *
     * @author stav stavyan@qq.com
     * @date 2020-03-11 10:20
     * @copyright 2019
     */
    import {opinionDetail} from "@/api/userInfo";
    import rfImage from '@/components/rf-image/rf-image';
    export default {
        components: {
            rfImage
        },
        data() {
            return {
                feedbackDetail: {},
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
					}]
            }
        },
        onLoad(options) {
            this.initData(options);
        },
        methods: {
            /**
             *@des 数据初始化
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/12/23 18:32:33
             */
            initData(options) {
                this.getFeedbackDetail(options.id)
            },
            previewImage(urls) { //预览图片
                uni.previewImage({
                    urls
                });
            },
            /**
             *@des 获取反馈详情
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/12/23 18:33:27
             */ async getFeedbackDetail(id) {
                await this.$get(`${opinionDetail}`, {
                    id
                }).then(r => {
                    this.feedbackDetail = r.data;
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
