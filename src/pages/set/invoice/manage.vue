<template>
	<view class="invoice-manage rf-row-wrapper">
		<view class="row b-b">
			<text class="tit">发票类型</text>
			<radio-group class="invoice-type" @change="handleInvoiceTypeChange">
				<label
					class="invoice-type-item"
					v-for="(item, index) in invoiceType"
					:key="index"
				>
					<radio
						class="gender-item-radio"
						size="small"
						:color="themeColor.name"
						:value="'' + item.value"
						:checked="item.value === invoiceData.type"
					/>
					<text class="gender-item-text">{{ item.name }}</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b">
			<text class="tit">发票抬头</text>
			<input
				class="input"
				type="text"
				v-model="invoiceData.title"
				placeholder="请输入发票抬头"
				placeholder-class="placeholder"
			/>
		</view>
		<view class="row b-b" v-if="parseInt(invoiceData.type, 10) === 1">
			<text class="tit">发票税号</text>
			<input
				class="input"
				type="text"
				v-model="invoiceData.duty_paragraph"
				placeholder="请输入发票税号"
				placeholder-class="placeholder"
			/>
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch
				:checked="invoiceData.is_default ? true : false"
				:color="themeColor.name"
				@change="switchChange"
			/>
		</view>
		<button
			class="add-btn"
      :class="'bg-' + themeColor.name"
			:disabled="btnLoading"
			:loading="btnLoading"
			@tap="confirm"
		>
			提交
		</button>
	</view>
</template>

<script>
import { invoiceCreate, invoiceUpdate, invoiceDetail } from '@/api/userInfo';

export default {
	data() {
		return {
			invoiceData: {
				type: 2,
				title: '',
				duty_paragraph: '',
				is_default: ''
			},
			invoiceType: [
				{ name: '公司', value: 1 },
				{ name: '个人', value: 2 }
			],
			reqBody: {},
			btnLoading: false
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	methods: {
		async initData(options) {
			let title = '新增发票';
			if (options.type === 'edit') {
				title = '编辑发票';
				await this.getInvoiceDetail(options.id);
			}
			this.manageType = options.type;
			uni.setNavigationBarTitle({
				title
			});
		},
		// 获取发票详情
		async getInvoiceDetail(id) {
			await this.$http
				.get(`${invoiceDetail}`, {
					id
				})
				.then(async r => {
					this.invoiceData = r.data;
				});
		},
		handleInvoiceTypeChange(e) {
			this.invoiceData.type = e.detail.value;
		},
		switchChange(e) {
			this.invoiceData.is_default = e.detail.value ? '1' : '0';
		},
		// 提交
		confirm() {
			this.reqBody['title'] = this.invoiceData['title'];
			let checkSendCode;
			if (parseInt(this.invoiceData['type'], 10) === 1) {
				this.reqBody['duty_paragraph'] = this.invoiceData['duty_paragraph'];
				checkSendCode = this.$mGraceChecker.check(
					this.reqBody,
					this.$mFormRule.cInvoiceRule
				);
			} else if (parseInt(this.invoiceData['type'], 10) === 2) {
				checkSendCode = this.$mGraceChecker.check(
					this.reqBody,
					this.$mFormRule.pInvoiceRule
				);
			}
			if (!checkSendCode) {
				this.$mHelper.toast(this.$mGraceChecker.error);
				return;
			}
			this.btnLoading = true;
			if (this.manageType === 'edit') {
				this.handleInvoiceUpdate(this.invoiceData);
			} else {
				this.handleInvoiceCreate(this.invoiceData);
			}
		},
		// 编辑发票
		async handleInvoiceUpdate(params) {
			await this.$http
				.put(`${invoiceUpdate}?id=${params.id}`, params)
				.then(() => {
					this.btnLoading = false;
					this.$mHelper.toast('恭喜您, 发票修改成功！');
					this.$mRouter.back();
				})
				.catch(() => {
					this.btnLoading = false;
				});
		},
		// 新增发票
		async handleInvoiceCreate(params) {
			await this.$http
				.post(`${invoiceCreate}`, params)
				.then(() => {
					this.btnLoading = false;
					this.$mHelper.toast('恭喜您, 发票添加成功！');
					this.$mRouter.back();
				})
				.catch(() => {
					this.btnLoading = false;
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.invoice-manage {
	padding-top: $spacing-base;
	.invoice-type-item {
		margin-right: $spacing-base;
		.gender-item-text {
			margin-left: $spacing-sm;
		}
	}
}
</style>
