<template>
  <view>
	  <!--顶部账单类型 全部/充值/消费-->
		<view class="tab" :style="{top:headerTop}">
			<view :class="{on:typeClass=='valid'}" @tap="switchType('valid', 1)">全部</view>
			<view :class="{on:typeClass=='used'}"  @tap="switchType('used', 2)">充值</view>
			<view :class="{on:typeClass=='invalid'}"  @tap="switchType('invalid', 3)">消费</view>
			<view class="border" :class="typeClass"></view>
		</view>
		<view class="place"></view>
	  <!--账单明细列表-->
    <view class="wrapper">
      <view class="list b-b" v-for="(item, index) in integralList" :key="index">
        <view class="wrapper">
          <view class="address-box">
            {{item.remark }}
          </view>
          <view class="u-box">
            {{item.created_at | time}}
          </view>
        </view>
        <text class="change-num" :class="parseFloat(item.num) >= 0 ? 'change-num-add' : 'change-num-reduce'">{{item.num | numFilter }}</text>
      </view>
      <rf-load-more class="load-more" :status="loadingType"></rf-load-more>
    </view>
		<empty :info="'暂无账单记录'" v-if="integralList.length === 0"></empty>
  </view>
</template>
<script>
/**
 * @des 账单明细
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-13 11:18
 * @copyright 2019
 */
import {creditsLogList} from "../../api/userInfo";
import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
import empty from "@/components/empty";
import moment from '@/utils/moment';
export default {
  components: {
    rfLoadMore,
    empty
  },
  data () {
    return {
      headerTop: 0,
			typeClass:'valid',
			state: 1,
      integralList: [],
      loadingType: 'more',
      page: 1,
    };
  },
  filters: {
    time(val) {
      return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    numFilter(val) {
      return val >= 0 ? `+${val.toString()}` : val;
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    this.page = 1;
    this.integralList = [];
    this.getIntegralListList('refresh');
  },
  //加载更多
  onReachBottom(){
    this.page ++;
    this.getIntegralListList();
  },
	onLoad(options) {
		this.initData(options);
		//兼容H5下排序栏位置
		// #ifdef H5
		//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
		let Timer = setInterval(()=>{
			let uniHead = document.getElementsByTagName('uni-page-head');
			if(uniHead.length>0){
				this.headerTop = uniHead[0].offsetHeight+'px';
				clearInterval(Timer);//清除定时器
			}
		},1);
		// #endif
	},
  methods: {
    // 顶部账单类型切换
		switchType(type, state){
			if(this.typeClass==type){
				return ;
			}
			uni.pageScrollTo({
				scrollTop:0,
				duration:0
			})
			this.typeClass = type;
			this.state = state;
			this.page = 1;
			this.integralList = [];
			this.getIntegralListList();
		},
	  // 数据初始化
		initData (options) {
			this.token = uni.getStorageSync('accessToken') || undefined;
			this.state = parseInt(options.state, 10);
      if (this.state === 2) {
        this.switchType('used', 2);
        return;
      } else if (this.state === 3) {
        this.switchType('invalid', 3);
        return;
      }
			if (this.token) {
				this.getIntegralListList();
			}
		},
	  // 获取积分
    async getIntegralListList (type) {
			uni.showLoading({title:'加载中...'});
			const params = {};
      params.credit_type = 1
			if (this.state === 2) {
        params.num_type = 1
      } else if (this.state === 3) {
        params.num_type = 2
      }
			params.page = this.page;
			await this.$get(`${creditsLogList}`, {
				...params
			}).then(r=>{
				if (type === 'refresh') {
					uni.stopPullDownRefresh();
				}
				this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
				this.integralList = [ ...this.integralList, ...r.data ]
			});
		},
  }
};
</script>
<style scoped lang="scss">
	view{
		display: flex;
		flex-wrap: wrap;
	}
	page{position: relative;background-color: #f5f5f5;}
	.tab{
		background-color: #fff;
		width: 100%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;
		view{
			width: 33.3%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #999;
		}
		.on{
			color: $base-color;
		}
		.border{
			height: 4upx;
			background-color: $base-color;
			transition: all .3s ease-out;
			&.used{
				transform: translate3d(100%,0,0);
			}
			&.invalid{
				transform: translate3d(200%,0,0);
			}
		}

	}
	.place{
		width: 100%;
		height: 95upx;
	}
  .wrapper {
    width: 100%;
    margin-top: 10upx;
    .load-more {
      width: 100%;
      text-align: center;
    }
	  .list{
      width: 100%;
      display: flex;
      align-items: center;
      padding: 20upx 36upx;;
      background: #fff;
      position: relative;
      .wrapper{
        display: flex;
        flex-direction: column;
        flex: 1;
        .address-box{
          display: flex;
          align-items: center;
          font-size: $font-base;
          color: $font-color-dark;
        }
        .u-box{
          color: $font-color-light;
          font-size: $font-sm;
        }
      }
      .change-num {
        font-size: $font-lg + 4upx;
        color: $font-color-base;
        font-weight: lighter;
      }
      .change-num-add {
        color: #16ac57;
      }
      .change-num-reduce {
        color: #fc4141;
      }
    }
  }
 </style>
