<template>
  <view class="integral">
    <view class="header">
      <view class="title">当前积分</view>
      <text class="num">
        {{ userInfo && userInfo.account && userInfo.account.user_integral || '0' }}
      </text>
      <view class="line" />
      <view class="nav">
        <view class="item">
          <text class="num">
            {{ userInfo && userInfo.account && userInfo.account.accumulate_integral || '0' }}
          </text>
          <text class="title">累计积分</text>
        </view>
        <view class="item">
          <text class="num">
            {{ -(userInfo && userInfo.account && userInfo.account.consume_integral) || '0' }}
          </text>
          <text class="title">累计消费</text>
        </view>
        <view class="item">
          <text class="num">
            {{ userInfo && userInfo.frozen_integral && userInfo.account.frozen_integral || '0' }}
          </text>
          <text class="title">冻结积分</text>
        </view>
      </view>
      <view class="tab">
        <view
            class="item"
            :class="current === index ? 'on' : ''"
            v-for="(item, index) in navList"
            :key="index"
            @tap="nav(index)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="wrapper">
      <view class="list1" :hidden="current !== 0">
        <view class="tip acea-row row-middle">
          <span class="iconfont icon-shuoming"></span
          >提示：积分可用来兑换指定商品
        </view>
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
      <view class="list2" :hidden="current !== 1">
        <view class="item">
          <view class="pictrue"><image src="/static/score.png" mode="aspectFill" /></view>
          <text class="name">购买商品可获得积分奖励</text>
          <view class="earn" @tap="toCategory">赚积分</view>
        </view>
      </view>
    </view>
    <!--加载动画-->
		<rf-loading v-if="loading"></rf-loading>
  </view>
</template>
<script>
/**
 * @des 积分中心
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-10 15:24
 * @copyright 2019
 */
import {creditsLogList} from "../../api/userInfo";
import rfLoadMore from '@/components/rf-load-more/rf-load-more.vue';
import empty from "@/components/empty";
import moment from '@/utils/moment';
export default {
  name: "Integral",
  components: {
    rfLoadMore,
    empty
  },
  data () {
    return {
      navList: [
          {name: "分值明细" },
          {name: "分值提升" }
      ],
      current: 0,
      integralList: [],
      loadingType: 'more',
      page: 1,
      userInfo: {},
      loading: true
    };
  },
  onLoad () {
    this.initData();
  },
  filters: {
    time(val) {
      return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    numFilter(val) {
      return val >= 0 ? `+${val.toString()}` : val;
    }
  },
  //加载更多
  onReachBottom(){
    this.page ++;
    this.getIntegralListList();
  },
  methods: {
    toCategory () {
      uni.reLaunch({
        url: `/pages/category/category`
      })
    },
    nav (index) {
      this.loading = true;
      this.current = index;
      this.page = 1;
      this.integralList.length = 0;
      this.getIntegralListList();
    },
    initData () {
      this.token = uni.getStorageSync('accessToken') || undefined;
      this.userInfo = uni.getStorageSync('userInfo') || undefined;
      if (this.token) {
        this.getIntegralListList();
      }
    },
    async getIntegralListList () {
        const params = {};
        params.page = this.page;
        await this.$get(`${creditsLogList}`, {
          ...params
        }).then(r=>{
          this.loading = false;
          this.loadingType  = r.data.length === 10 ? 'more' : 'nomore';
          this.integralList = [ ...this.integralList, ...r.data ]
        }).catch(() => {
          this.loading = false;
        });
      },
  }
};
</script>
<style scoped lang="scss">
  page {
    background-color: $page-color-bg;
  }
  .integral {
    .header {
      background-image: url('../../static/integralbg.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 420upx;
      font-size: $font-base;
      color: #fff;
      padding: 20upx 0;
      text-align: center;
      position: relative;
      .title {
        font-size: $font-sm;
        margin: 10upx 0;
      }
      .num {
        /*<!--color: $base-color;-->*/
        font-size: $font-lg + 20upx;
        font-weight: lighter;
        line-height: 1;
      }
      .line {
        width: 10%;
        height: 3upx;
        background-color: #fff;
        margin: 20upx auto 30upx;
      }
      .nav {
        width: 100%;
        display: flex;
        .item {
          flex: 1;
          .num {
            font-size: $font-lg + 4upx;
            display: block;
            line-height: 1;
          }
        }
      }
      .tab {
        position: absolute;
        bottom: -2upx;
        display: flex;
        width: 80%;
        margin: 0 10%;
        border-radius: 20upx 20upx 0 0;
        background-color: #f7f7f7;
        height: 80upx;
        line-height: 80upx;
        font-size: $font-base;
        color: #bbb;
        .item {
          flex: 1;
          text-align: center;
          line-height: 80upx;
        }
        .on {
          background-color: #fff;
          color: #e93323;
          font-weight: bold;
          border-radius: 20upx 0 0 0;
        }
        .on:last-child {
          border-radius: 0 20upx 0 0;
        }
      }
    }
  }

  .wrapper .list1 {
    background-color: #fff;
    padding: 30upx 20upx;
    .tip {
    font-size: $font-sm;
    width: 90%;
    margin: 0 5%;
    height: 64upx;
    line-height: 64upx;
    border-radius: 30upx;
    background-color: #fff5e2;
    border: 1px solid #ffeac1;
    color: #c8a86b;
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

  .wrapper .list2 {
    width: 100%;
    margin: 20upx 0;
    /*background-color: #F76260;*/
  }
  .wrapper .list2 .item {
    background-image: linear-gradient(to right, #fff7e7 0%, #fffdf9 100%);
    width: 90%;
    margin: 10upx 5%;
    height: 120upx;
    line-height: 120upx;
    position: relative;
    border-radius: 20upx;
    padding: 0 20upx;
    display: flex;
  }

  .wrapper .list2 .item .pictrue {
    width: 60upx;
    height: 100upx;
    margin: 20upx 0;
    image {
      width: 80%;
      height: 80%;
    }
  }

  .wrapper .list2 .item .name {
    flex: 1;
    font-size: $font-sm;
    font-weight: bold;
    color: #c8a86b;
    margin: 0 20upx;
  }

  .wrapper .list2 .item .earn {
    font-size: $font-sm;
    color: #c8a86b;
    border: 2upx solid #c8a86b;
    text-align: center;
    height: 48upx;
    margin: 36upx 0;
    width: 120upx;
    border-radius: 10upx;
  }
</style>
