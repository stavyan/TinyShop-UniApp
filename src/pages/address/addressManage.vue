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
			<view class="uni-list">
				<view class="uni-list-cell">
					<picker mode="multiSelector"
									@columnchange="bindMultiPickerColumnChange"
									:value="multiIndex"
									range-key="title"
									:range="multiArray">
						<view class="input"> {{ addressData.address_name }}
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<!--<text @click="chooseLocation" class="input">-->
				<!--{{addressData.addressName}}-->
			<!--</text>-->
			<!--<text class="yticon icon-shouhuodizhi"></text>-->
			<input class="input" type="text" v-model="addressData.address_details" placeholder="请输入详细地址" placeholder-class="placeholder" />
		</view>
		<!--<view class="row b-b">-->
			<!--<text class="tit">门牌号</text>-->
			<!--<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />-->
		<!--</view>-->
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default ? true : false" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {addressCreate, addressUpdate, addressDetail} from "../../api/userInfo";
	import {provinceList} from "../../api/basic";

	export default {
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
		}
		},
		onLoad(options){
			this.initData(options);
		},
		methods: {
			initData(options) {
				this.getProvinceList();
				let title = '新增收货地址';
				if(options.type==='edit'){
					title = '编辑收货地址'
					this.getAddressDetail(options.id)
				}
				this.manageType = options.type;
				uni.setNavigationBarTitle({
					title
				})
			},
			async getAddressDetail(id) {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${addressDetail}`, {
					id
				}).then(async r => {
					if (r.code === 200) {
						this.addressData = r.data;
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async getProvinceList() {
				await this.$get(`${provinceList}`).then(async r => {
					if (r.code === 200) {
						this.multiArray[0] = r.data
						await this.$get(`${provinceList}`, {
							pid: this.multiArray[0][0].id
						}).then(async r => {
							if (r.code === 200) {
								this.multiArray[1] = r.data
								await this.$get(`${provinceList}`, {
									pid: this.multiArray[1][0].id
								}).then(r => {
									if (r.code === 200) {
										this.multiArray[2] = r.data
										// this.multiIndex = [0, 0, 0]
										// this.addressData.province_id = this.multiArray[0][0].id
										// this.addressData.city_id = this.multiArray[1][0].id
										// this.addressData.area_id = this.multiArray[2][0].id
									} else {
										uni.showToast({title: r.message, icon: "none"});
									}
								}).catch(err => {
									console.log(err)
								})
							} else {
								uni.showToast({title: r.message, icon: "none"});
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async bindMultiPickerColumnChange(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				console.log(e.detail)
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case this.multiIndex[0]:
								this.addressData.province_id = this.multiArray[0][e.detail.value].id;
								uni.showLoading({title:'加载中...'});
								await this.$get(`${provinceList}`, {
									pid: this.multiArray[0][e.detail.value].id
								}).then(async r => {
									if (r.code === 200) {
										this.multiArray[1] = r.data
										uni.showLoading({title:'加载中...'});
										await this.$get(`${provinceList}`, {
											pid: this.multiArray[1][e.detail.column].id
										}).then(r => {
											if (r.code === 200) {
												this.multiArray[2] = r.data
											} else {
												uni.showToast({title: r.message, icon: "none"});
											}
										}).catch(err => {
											console.log(err)
										})
									} else {
										uni.showToast({title: r.message, icon: "none"});
									}
								}).catch(err => {
									console.log(err)
								})
								break
						}
						// this.multiIndex.splice(1, 1, 0)
						// this.multiIndex.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case this.multiIndex[0]:
								switch (this.multiIndex[1]) {
									case this.multiIndex[1]:
										console.log("1", this.multiArray[1][e.detail.value])
										this.addressData.city_id = this.multiArray[1][e.detail.value].id;
										await this.$get(`${provinceList}`, {
											pid: this.multiArray[1][e.detail.value].id
										}).then(r => {
											if (r.code === 200) {
												this.multiArray[2] = r.data
											} else {
												uni.showToast({title: r.message, icon: "none"});
											}
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
												console.log("2", this.multiArray[2][e.detail.value])
												this.addressData.area_id = this.multiArray[2][e.detail.value].id;
												break
										}
									break;
								}
								break
						}
						break
				}
				this.addressData.address_name = `${this.multiArray && this.multiArray[0][this.multiIndex[0]] && this.multiArray[0][this.multiIndex[0]].title},
				${this.multiArray && this.multiArray[1][this.multiIndex[1]] && this.multiArray[1][this.multiIndex[1]].title},
				${this.multiArray && this.multiArray[2][this.multiIndex[2]] && this.multiArray[2][this.multiIndex[2]].title}`
				// this.addressData.province_id = this.multiArray[0][e.detail.value].id;
				// this.addressData.area_id = this.multiArray[2] && this.multiArray[2][e.detail.value] && this.multiArray[2][e.detail.value].id;
				this.$forceUpdate()
			},
			handleRealNameChange (e) {
				this.addressData.realname = e.detail.value;
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
				uni.showLoading({title:'收货地址修改中...'});
				await this.$put(`${addressUpdate}?id=${data.id}`, {
					realname: data.realname,
					mobile: data.mobile,
					address_details: data.address_details,
					is_default: data.is_default ? 1 : 0,
					province_id: data.province_id,
					city_id: data.city_id,
					area_id: data.area_id
				}).then(r=>{
					if (r.code === 200) {
						uni.showToast({ title: '恭喜您, 收货地址修改成功！', icon: "none" });
						uni.redirectTo({
							url: '/pages/address/address'
						})
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async handleAddressCreate (data) {
				console.log(data)
				uni.showLoading({title:'创建中...'});
				await this.$post(`${addressCreate}`, {
					realname: data.realname,
					mobile: data.mobile,
					address_details: data.address_details,
					is_default: data.is_default ? 1 : 0,
					province_id: data.province_id,
					city_id: data.city_id,
					area_id: data.area_id
				}).then(r=>{
					if (r.code === 200) {
						uni.showToast({ title: '恭喜您, 收货地址创建成功！', icon: "none" });
						uni.redirectTo({
							url: '/pages/address/address'
						})
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
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
</style>
