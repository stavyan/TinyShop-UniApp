<template>
	<view class="feedback-detail">
		<view class="feedback-title">
			<text>问题和意见</text>
		</view>
		<view class="feedback-body">
			<textarea
				disabled
				:value="feedbackDetail.content"
				class="feedback-textare"
			/>
		</view>
		<view
			class="feedback-title"
			v-if="feedbackDetail.covers && feedbackDetail.covers.length > 0"
		>
			<text>图片</text>
		</view>
		<view class="uni-uploader-body">
			<view class="uni-uploader__files">
				<block v-for="(image, index) in feedbackDetail.covers" :key="index">
					<view class="uni-uploader__file">
						<rf-image class="uni-uploader__img" :src="image"></rf-image>
					</view>
				</block>
			</view>
		</view>
		<view class="feedback-title">
			<text>反馈类型</text>
		</view>
		<view class="feedback-body">
			<radio-group>
				<label
					class="gender-item"
					v-for="(item, index) in feedbackType"
					:key="index"
				>
					<radio
						class="gender-item-radio"
						:color="themeColor.color"
						:value="item.value"
						:checked="item.value == feedbackDetail.type"
					/>
					<text class="gender-item-text">{{ item.name }}</text>
				</label>
			</radio-group>
		</view>
		<view class="feedback-title">
			<text>QQ/邮箱/手机号</text>
		</view>
		<view class="feedback-body">
			<input
				class="feedback-input"
				disabled
				:value="feedbackDetail.contact_way || '暂未留下联系方式'"
			/>
		</view>
		<view class="feedback-title">
			<text>回复内容</text>
		</view>
		<view class="feedback-body">
			<textarea
				disabled
				:value="feedbackDetail.reply || '管理员未回复'"
				class="feedback-textare"
			/>
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
import { opinionDetail } from '@/api/userInfo';
export default {
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
				}
			]
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		// 数据初始化
		initData(options) {
			this.getFeedbackDetail(options.id);
		},
		// 获取反馈详情
		async getFeedbackDetail(id) {
			await this.$http
				.get(`${opinionDetail}`, {
					id
				})
				.then(r => {
					this.feedbackDetail = r.data;
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $page-color-base;
}

/* 上传 */
.uni-uploader {
	flex: 1;
	flex-direction: column;
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

.feedback-body {
	background: $color-white;
	padding: $spacing-sm $spacing-base;
	.gender-item {
		margin-right: 20upx;

		.gender-item-text {
			padding-left: 10upx;
		}

		radio .wx-radio-input.wx-radio-input-checked {
			background: $uni-color-primary;
			border-color: $uni-color-primary;
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
</style>
