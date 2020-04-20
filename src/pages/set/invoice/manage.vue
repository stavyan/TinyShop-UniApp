<template>
	<view class="invoice-manage rf-row-wrapper">
		<view class="row b-b">
			<text class="tit">发票类型</text>
			<radio-group class="invoice-type" @change="handleInvoiceTypeChange">
				<label class="invoice-type-item" v-for="(item, index) in invoiceType" :key="index">
					<radio
							class="gender-item-radio"
							color="#fa436a"
							:value="'' + item.value"
							:checked="item.value === invoiceData.type"/>
					<text class="gender-item-text">{{ item.name }}</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b">
			<text class="tit">发票抬头</text>
			<input class="input" type="text" v-model="invoiceData.title" placeholder="请输入发票抬头"
			       placeholder-class="placeholder"/>
		</view>
		<view class="row b-b" v-if="parseInt(invoiceData.type, 10) === 1">
			<text class="tit">发票税号</text>
			<input class="input" type="text" v-model="invoiceData.duty_paragraph" placeholder="请输入发票税号"
			       placeholder-class="placeholder"/>
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="invoiceData.is_default ? true : false" color="#fa436a" @change="switchChange"/>
		</view>
		<button class="add-btn" @tap="confirm">提交</button>
	</view>
</template>

<script>
    import {
        invoiceCreate,
        invoiceUpdate,
        invoiceDetail
    } from '@/api/userInfo';

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
                    {name: '公司', value: 1},
                    {name: '个人', value: 2}
                ],
                reqBody: {}
            }
        },
        onLoad(options) {
            this.initData(options);
        },
        methods: {
            async initData(options) {
                let title = '新增发票';
                if (options.type === 'edit') {
                    title = '编辑发票'
                    await this.getInvoiceDetail(options.id)
                }
                this.manageType = options.type;
                uni.setNavigationBarTitle({
                    title
                })
            },
            // 获取发票详情
            async getInvoiceDetail(id) {
                await this.$http.get(`${invoiceDetail}`, {
                    id
                }).then(async r => {
                    this.invoiceData = r.data;
                })
            },
            handleInvoiceTypeChange(e) {
                this.invoiceData.type = e.detail.value;
            },
            switchChange(e) {
                this.invoiceData.is_default = e.detail.value ? '1' : '0';
            },
            //提交
            confirm() {
                this.reqBody['title'] = this.invoiceData['title'];
                let checkSendCode;
                if (parseInt(this.invoiceData['type'], 10) === 1) {
                    this.reqBody['duty_paragraph'] = this.invoiceData['duty_paragraph'];
                    checkSendCode = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.cInvoiceRule);
                } else if (parseInt(this.invoiceData['type'], 10) === 2) {
                    checkSendCode = this.$mGraceChecker.check(this.reqBody, this.$mFormRule.pInvoiceRule);
                }
                if (!checkSendCode) {
                    this.$mHelper.toast(this.$mGraceChecker.error);
                    return;
                }
                if (this.manageType === 'edit') {
                    this.handleInvoiceUpdate(this.invoiceData)
                } else {
                    this.handleInvoiceCreate(this.invoiceData)
                }
            },
            // 编辑发票
            async handleInvoiceUpdate(params) {
                await this.$http.put(`${invoiceUpdate}?id=${params.id}`, params).then(() => {
                    this.$mHelper.toast('恭喜您, 发票修改成功！');
										this.$mRouter.push({route: '/pages/set/invoice/invoice'});
                }).catch(err => {
                    console.log(err)
                })
            },
            // 新增发票
            async handleInvoiceCreate(params) {
                await this.$http.post(`${invoiceCreate}`, params).then(() => {
                    this.$mHelper.toast('恭喜您, 发票添加成功！');
										this.$mRouter.push({route: '/pages/set/invoice/invoice'});
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss">

	page {
		background: $page-color-base;
	}

	.invoice-manage {
		padding-top: 16upx;

		.invoice-type-item {
			margin-right: 20upx;
		}
	}
</style>
