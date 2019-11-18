<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper" @touchstart="goTouchStart(item.id)" @touchmove="goTouchMove" @touchend="goTouchEnd">
				<view class="address-box">
					<text v-if="parseInt(item.is_default, 10) === 1" class="tag">默认</text>
					<text class="address">{{item.address_details}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.realname}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
		</view>
		<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			提示：长按可删除当前收货地址。最多只能存在一个默认地址。
		</text>

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	import {addressDelete, addressList} from "../../api/userInfo";

	export default {
		data() {
			return {
				timeOutEvent: 0,
				source: 0,
				addressList: []
			}
		},
		onLoad(option){
			this.source = option.source;
			this.initData()
		},
		methods: {
			goTouchStart(id){
			 clearTimeout(this.timeOutEvent);//清除定时器
			 this.timeOutEvent = 0;
			 this.timeOutEvent = setTimeout(() => {
				uni.showModal({
				    content: '确定要删除该收货地址吗',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.$del(`${addressDelete}?id=${id}`).then(r => {
									if (r.code === 200) {
										this.getAddressList();
									} else {
										uni.showToast({ title: r.message, icon: "none" });
									}
								})
				    	}
				    }
				});
			 }, 0.5 * 1000);//这里设置定时
		 },
		//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		goTouchEnd(){
				clearTimeout(this.timeOutEvent);
					if(this.timeOutEvent!=0){
				 }
		},
		//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
		goTouchMove(){
				 clearTimeout(this.timeOutEvent);//清除定时器
				 this.timeOutEvent = 0;
		},
			/**
			 *@des 初始化数据
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:57:30
			 */
			initData () {
				this.getAddressList();
			},
			/**
			 *@des 获取收货地址列表
			 *@author stav stavyan@qq.com
			 *@blog https://stavtop.club
			 *@date 2019/11/18 09:58:15
			 */
			async getAddressList () {
				uni.showLoading({title:'加载中...'});
				await this.$get(`${addressList}`).then(r=>{
					if (r.code === 200) {
						this.addressList = r.data
					} else {
						uni.showToast({ title: r.message, icon: "none" });
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);

				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
