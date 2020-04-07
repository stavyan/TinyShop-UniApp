<template>
	<view class="content" >
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.realname" @blur="handleRealNameChange" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" @blur="handleMobileChange" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">选择地址</text>
				<view>
<!--					<picker mode="multiSelector"-->
<!--									@columnchange="bindMultiPickerColumnChange"-->
<!--									:value="multiIndex"-->
<!--									range-key="title"-->
<!--									:range="multiArray">-->
<!--							<view class="input"> {{ addressData.address_name }}-->
<!--						</view>-->
<!--					</picker>-->
					<rf-pick-regions
							:addressData="addressData"
			        @getRegions="handleGetRegions">
	        </rf-pick-regions>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.address_details" @blur="bindAddressDetailsChange" placeholder="请输入详细地址" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default ? true : false" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @tap="confirm">提交</button>

		<!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>

<script>
	/**
	 * @des 收货地址列表
	 *
	 * @author stav stavyan@qq.com
	 * @date 2020-03-10 18:00
	 * @copyright 2019
	 */
	import {addressCreate, addressUpdate, addressDetail} from "@/api/userInfo";
	import {provinceList} from "@/api/basic";
  import rfPickRegions from '@/components/rf-pick-regions';
	export default {
        components: {
            rfPickRegions
        },
		data() {
			return {
				addressData: {
					realname: '',
					mobile: '',
					address_details: '',
					address_name: '请选择地址',
					address: '',
					is_default: false,
					province_id: '',
					city_id: '',
					area_id: ''
				},
				multiArray: [[], [], []],
				multiIndex: [0, 0, 0],
				loading: true
			}
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
      // 获取选择的地区
      handleGetRegions(e){
        this.addressData.province_id = e.province_id;
        this.addressData.city_id = e.city_id;
        this.addressData.area_id = e.area_id;
      },
	    // 数据初始化
			async initData(options) {
				let title = '新增收货地址';
				if(options.type==='edit'){
					title = '编辑收货地址'
					await this.getAddressDetail(options.id)
				}
				this.manageType = options.type;
				uni.setNavigationBarTitle({
					title
				});
				await this.getProvinceList();
			},
	    // 获取收货地址
			async getAddressDetail(id) {
				await this.$get(`${addressDetail}`, {
					id
				}).then(async r => {
					this.addressData = r.data;
			    this.loading = false;
				}).catch(() => {
			    this.loading = false;
				})
			},
			async getProvinceList() {
				let provinceIndex = 0;
				let cityIndex = 0;
				let areaIndex = 0;
				let province_id = null;
				let city_id = null;
				let area_id = null;
				let province_name = null;
				let city_name = null;
				let area_name = null;
				await this.$get(`${provinceList}`).then(async r => {
						this.multiArray[0] = r.data;
						if (this.addressData.province_id) {
							r.data.forEach((item, index) => {
								if (parseInt(item.id, 10) == parseInt(this.addressData.province_id, 10)) {
									provinceIndex = index;
									province_id = item.id;
									province_name = item.title;
								}
							});
						} else {
							province_id = this.multiArray[0][0].id
							province_name = this.multiArray[0][0].title
						}
						await this.$get(`${provinceList}`, {
							pid: province_id
						}).then(async r => {
								this.multiArray[1] = r.data;
								if (this.addressData.city_id) {
									r.data.forEach((item, index) => {
										if (parseInt(item.id, 10) == parseInt(this.addressData.city_id, 10)) {
											cityIndex = index;
											city_id = item.id;
											city_name = item.title;
										}
									});
								} else {
									city_id = this.multiArray[1][0].id;
									city_name = this.multiArray[1][0].title;
								}
								await this.$get(`${provinceList}`, {
									pid: city_id
								}).then(r => {
										this.multiArray[2] = r.data;
										if (this.addressData.area_id) {
											r.data.forEach((item, index) => {
												if (parseInt(item.id, 10) == parseInt(this.addressData.area_id, 10)) {
													areaIndex = index;
													area_id = item.id;
													area_name = item.title;
												}
											});
										} else {
											area_id = this.multiArray[2][0].id;
											area_name = this.multiArray[2][0].title;
										}
										this.multiIndex = [provinceIndex, cityIndex, areaIndex]
										this.addressData.province_id = province_id
										this.addressData.city_id = city_id
										this.addressData.area_id = area_id
										this.addressData.address_name = `${province_name}, ${city_name}, ${area_name}`;
			              this.loading = false;
								}).catch(err => {
									this.loading = false;
									console.log(err)
								})
						}).catch(err => {
							console.log(err)
						})
				}).catch(err => {
					console.log(err)
				})
			},
			async bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value;
				let provinceIndex = 0;
				let cityIndex = 0;
				let areaIndex = 0;
				let province_id = null;
				let city_id = null;
				let area_id = null;
				let province_name = null;
				let city_name = null;
				let area_name = null;
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case this.multiIndex[0]:
								province_id = this.multiArray[0][e.detail.value].id;
								province_name = this.multiArray[0][e.detail.value].title;

								await this.$get(`${provinceList}`, {
									pid: this.multiArray[0][e.detail.value].id
								}).then(async r => {
										this.multiArray[1] = r.data;
										city_id = this.multiArray[1][0].id;
										city_name = this.multiArray[1][0].title;
										provinceIndex = e.detail.value;
										this.multiIndex = [provinceIndex, 0, 0];

										await this.$get(`${provinceList}`, {
											pid: this.multiArray[1][e.detail.column].id
										}).then(r => {
												this.multiArray[2] = r.data
												area_id = this.multiArray[2][0].id;
												area_name = this.multiArray[2][0].title;
										}).catch(err => {
											console.log(err)
										})
								}).catch(err => {
									console.log(err)
								});
								break
						}
						break;
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case this.multiIndex[0]:
								switch (this.multiIndex[1]) {
									case this.multiIndex[1]:
										province_id = this.multiArray[0][this.multiIndex[0]].id;
										province_name = this.multiArray[0][this.multiIndex[0]].title;
										city_id = this.multiArray[1][e.detail.value].id;
										city_name = this.multiArray[1][e.detail.value].title;
										cityIndex = e.detail.value;
										this.multiIndex = [this.multiIndex[0], cityIndex, 0];

										await this.$get(`${provinceList}`, {
											pid: this.multiArray[1][e.detail.value].id
										}).then(r => {
												this.multiArray[2] = r.data
										}).catch(err => {
											console.log(err)
										})
										break
								}
								break
						}
						break
					case 2: //拖动第3列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case this.multiIndex[0]:
								switch (this.multiIndex[1]) {
									case this.multiIndex[1]:
										switch (this.multiIndex[2]) {
											case this.multiIndex[2]:
												province_id = this.multiArray[0][this.multiIndex[0]].id;
												province_name = this.multiArray[0][this.multiIndex[0]].title;
												city_id = this.multiArray[1][this.multiIndex[1]].id;
												city_name = this.multiArray[1][this.multiIndex[1]].title;
												area_id = this.multiArray[2][e.detail.value].id;
												area_name = this.multiArray[2][e.detail.value].title;
												areaIndex = e.detail.value;
												this.multiIndex = [this.multiIndex[0], this.multiIndex[1], areaIndex];
												break
										}
									break;
								}
								break
						}
						break
				}
				this.addressData.address_name = `${province_name}, ${city_name}, ${area_name}`;
				this.addressData.province_id = province_id;
				this.addressData.city_id = city_id;
				this.addressData.area_id = area_id;
				this.$forceUpdate()
			},
			handleRealNameChange (e) {
				this.addressData.realname = e.detail.value;
			},
			bindAddressDetailsChange (e) {
				this.addressData.address_details = e.detail.value;
			},
			handleMobileChange (e) {
				this.addressData.mobile = e.detail.value;
			},
			switchChange(e){
				this.addressData.is_default = e.detail.value;
			},
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.realname){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				// if(!data.address){
				// 	this.$api.msg('请在地图选择所在位置');
				// 	return;
				// }
				if (this.manageType === 'edit') {
					this.handleAddressUpdate(data)
				} else {
					this.handleAddressCreate(data)
				}
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
			},
			async handleAddressUpdate (data) {
				await this.$put(`${addressUpdate}?id=${data.id}`, {
					realname: data.realname,
					mobile: data.mobile,
					address_details: data.address_details,
					is_default: data.is_default ? 1 : 0,
					province_id: data.province_id,
					city_id: data.city_id,
					area_id: data.area_id
				}).then(r=>{
						this.$api.msg('恭喜您, 收货地址修改成功！');
						uni.navigateBack();
				}).catch(err => {
					console.log(err)
				})
			},
			async handleAddressCreate (data) {
				await this.$post(`${addressCreate}`, {
					realname: data.realname,
					mobile: data.mobile,
					address_details: data.address_details,
					is_default: data.is_default ? 1 : 0,
					province_id: data.province_id,
					city_id: data.city_id,
					area_id: data.area_id
				}).then(r=>{
						this.$api.msg('恭喜您, 收货地址修改成功！');
						uni.navigateBack();
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
		.iconfont {
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
</style>
