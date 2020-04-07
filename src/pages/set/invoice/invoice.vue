<template>
  <view class="content b-t">
    <view class="list b-b" v-for="(item, index) in invoiceList" :key="index" @tap="checkAddress(item)">
      <view class="wrapper" @touchstart="goTouchStart(item.id)" @touchmove="goTouchMove" @touchend="goTouchEnd">
        <view class="address-box">
          <text v-if="parseInt(item.is_default, 10) === 1" class="tag">默认</text>
          <text class="address">{{item.title}}</text>
        </view>
        <view class="u-box">
          <text class="name">{{ parseInt(item.type, 10) === 1 ? '公司' : '个人' }}</text>
          <text class="mobile">{{ item.duty_paragraph || '个人发票无税号' }}</text>
        </view>
      </view>
      <i class="iconfont iconbianji" @tap.stop="addInvoice('edit', item)"></i>
    </view>
    <text class="tips" v-if="invoiceList.length > 0">
      提示：长按可删除当前发票。最多只能存在一个默认发票。
    </text>
    <rf-empty :info="`暂无收货地址，请添加地址`" v-if="invoiceList.length === 0 && !loading"></rf-empty>
    <rf-load-more v-if="invoiceList.length > 0" :status="loadingType"/>
    <button class="add-btn" @tap="addInvoice('add')">新增发票</button>
    <!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
  </view>
</template>

<script>
    import {invoiceList, invoiceDel} from "@/api/userInfo";

    import rfLoadMore from '@/components/rf-load-more/rf-load-more';
    export default {
        components: {
            rfLoadMore
        },
        data() {
            return {
                timeOutEvent: 0,
                source: 0,
                invoiceList: [],
                page: 1,
                loadingType: 'more',
                loading: true,
            }
        },
        onShow() {
            this.initData()
        },
        onLoad(option) {
            this.source = option.source;
        },
        //下拉刷新
        onPullDownRefresh() {
            this.page = 1;
            this.invoiceList.length = 0;
            this.getInvoiceList('refresh');
        },
        //加载更多
        onReachBottom() {
            this.page++;
            this.getInvoiceList();
        },
        methods: {
            goTouchStart(id) {
                clearTimeout(this.timeOutEvent);//清除定时器
                this.timeOutEvent = 0;
                this.timeOutEvent = setTimeout(() => {
                    uni.showModal({
                        content: '确定要删除该收货地址吗',
                        success: (e) => {
                            if (e.confirm) {
                                this.$del(`${invoiceDel}?id=${id}`).then(r => {
                                    this.page = 1;
                                    this.invoiceList.length = 0;
                                    this.getInvoiceList();
                                })
                            }
                        }
                    });
                }, 0.5 * 1000);//这里设置定时
            },
            //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
            goTouchEnd() {
                clearTimeout(this.timeOutEvent);
                if (this.timeOutEvent != 0) {
                }
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
            goTouchMove() {
                clearTimeout(this.timeOutEvent);//清除定时器
                this.timeOutEvent = 0;
            },
            // 初始化数据
            initData() {
                this.page = 1;
                this.invoiceList.length = 0;
                this.getInvoiceList();
            },
            // 获取收货地址列表
            async getInvoiceList() {
                await this.$get(`${invoiceList}`, {page: this.page}).then(r => {
                  this.loading = false;
                  this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
                  this.invoiceList = [...this.invoiceList, ...r.data];
                }).catch(() => {
                  this.loading = false;
                })
            },
            //选择地址
            checkAddress(item) {
                if (this.source == 1) {
                    //this.$api.prePage()获取上一页实例，在App.vue定义
                    this.$api.prePage().invoiceItem = item;
                    uni.navigateBack()
                }
            },
            addInvoice(type, item) {
                uni.navigateTo({
                    url: `/pages/set/invoice/invoiceManage?type=${type}&id=${item && item.id || undefined}`
                })
            },
            //添加或修改成功之后回调
            refreshList(data, type) {
                //添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
                this.invoiceList.unshift(data);
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
		.iconfont{
	display: flex;
	align-items: center;
	height: 80upx;
	font-size: 40upx;
	color: $font-color-light;
	padding-left: 30upx;
}
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
	.tips {
		display:block;
		padding: 16upx 30upx 10upx;
		color: #fa436a;
		font-size: 24upx;
	}
</style>
