<template>
	<view class="content" >
		<view class="row b-b">
			<text class="tit">发票类型</text>
			<radio-group class="invoice-type" @change="handleInvoiceTypeChange">
				<label class="invoice-type-item" v-for="(item, index) in invoiceType" :key="index">
					<radio
							class="gender-item-radio"
							color="#fa436a"
							:value="'' + item.value"
							:checked="item.value === invoiceData.type" />
					<text class="gender-item-text">{{ item.name }}</text>
				</label>
			</radio-group>
		</view>
		<view class="row b-b">
			<text class="tit">发票抬头</text>
			<input class="input" type="text" v-model="invoiceData.title" @blur="handleTitleChange" placeholder="请输入发票抬头" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-show="parseInt(invoiceData.type, 10) === 1">
			<text class="tit">发票税号</text>
			<input class="input" type="text" v-model="invoiceData.duty_paragraph" @blur="handleDutyParagraphChange" placeholder="请输入发票税号" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="invoiceData.is_default ? true : false" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @tap="confirm">提交</button>
	</view>
</template>

<script>
	import {
		addressCreate,
		addressUpdate,
		addressDetail,
		invoiceCreate,
		invoiceUpdate,
		invoiceDetail
	} from "@/api/userInfo";
	import {provinceList} from "@/api/basic";
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
				]
		}
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
			async initData(options) {
				let title = '新增发票';
				if(options.type==='edit'){
					title = '编辑发票'
					await this.getInvoiceDetail(options.id)
				}
				this.manageType = options.type;
				uni.setNavigationBarTitle({
					title
				})
			},
			async getInvoiceDetail(id) {
				
				await this.$get(`${invoiceDetail}`, {
					id
				}).then(async r => {
					this.invoiceData = r.data;
				}).catch(err => {
					console.log(err)
				})
			},
			handleTitleChange (e) {
				this.invoiceData.title = e.detail.value;
			},
			handleInvoiceTypeChange (e) {
				this.invoiceData.type = e.detail.value;
			},
			handleDutyParagraphChange (e) {
				this.invoiceData.duty_paragraph = e.detail.value;
			},
			switchChange(e){
				this.invoiceData.is_default = e.detail.value ? '1' : '0';
			},
			//提交
			confirm(){
				let data = this.invoiceData;
				if(!data.title){
					this.$api.msg('请填写发票抬头');
					return;
				}
				if(data.type === 1){
					if (!data.duty_paragraph) {
						this.$api.msg('请填写发票税号');
						return;
					}
				}
				if (this.manageType === 'edit') {
					this.handleInvoiceUpdate(data)
				} else {
					this.handleInvoiceCreate(data)
				}
			},
			async handleInvoiceUpdate (data) {
				await this.$put(`${invoiceUpdate}?id=${data.id}`, {
					type: data.type,
					title: data.title,
					duty_paragraph: data.duty_paragraph,
					is_default: data.is_default
				}).then(r=>{
					this.$api.msg('恭喜您, 发票修改成功！');
					uni.navigateBack({
						url: '/pages/set/invoice/invoice'
					})
				}).catch(err => {
					console.log(err)
				})
			},
			async handleInvoiceCreate (data) {
				await this.$post(`${invoiceCreate}`, {
					...data
				}).then(r=>{
			    this.$api.msg('恭喜您, 发票添加成功！');
					uni.navigateBack({
						url: '/pages/set/invoice/invoice'
					})
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss">

	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;

		.tit{
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.invoice-type-item {
		margin-right: 20upx;
	}
</style>
