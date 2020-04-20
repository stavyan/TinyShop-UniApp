<template>
	<view class="page">
		<view class='feedback-title'>
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入 <text class="iconfont iconxia"></text></text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请详细描述你的问题和意见..." v-model="sendDate.content" class="feedback-textare"/>
		</view>
		<view class='feedback-title'>
			<text>图片(选填,提供问题截图,总大小10M以下)</text>
		</view>
		<view class="feedback-body feedback-uploader rf-uploader">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击预览图片</view>
					<view class="uni-uploader-info">{{imageList.length}}/9</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<rf-image class="uni-uploader__img" :src="image"></rf-image>
								<view class="close-view" @tap="close(index)">x</view>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="imageList.length < 8">
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
    import {opinionCreate, uploadImage} from '@/api/userInfo';
    export default {
        data() {
            return {
                msgContents: ['界面显示错乱', '启动缓慢，卡出翔了', 'UI无法直视，丑哭了', '偶发性崩溃'],
                stars: [1, 2, 3, 4, 5],
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
                    covers: '',
                    content: '',
                    contact_way: ''
                }
            }
        },
        methods: {
          //   监听反馈类型事件
            handleFeedbackTypeChange(e) {
                this.sendDate.type = e.detail.value
            },
            // 打开相册选图
            uploadImage() {
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
            // 依次上传图片
            handleUploadFile(data) {
                const _this = this;
                data.forEach(item => {
                    _this.$http.upload(uploadImage, {filePath: item, name: 'file'}).then(r => {
                        _this.imageList.push(r.data.url)
                    });
                })
            },
            // 删除已选中图片
            close(e) {
                this.imageList.splice(e, 1);
            },
            // 快速输入
            chooseMsg() { //快速输入
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.content = this.msgContents[res.tapIndex];
                    }
                })
            },
           // 发送反馈
            async send() {
                this.sendDate.covers = JSON.stringify(this.imageList);
                await this.$http.post(`${opinionCreate}`, {
                    ...this.sendDate
                }).then(() => {
                    this.$mRouter.back();
                })
            }
        }
    }
</script>

<style lang='scss'>
	page {
		background-color: $page-color-base;
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
    .iconfont {
      font-size: $font-sm;
    }
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
	
	.feedback-submit {
		background: $base-color;
		color: #FFFFFF;
		margin: 20upx;
	}
</style>
