<template>
  <view class="container">
    <view class="uni-padding-wrap">
			<view class="uni-comment">
				<view class="uni-comment-list" v-for="item in evaluationList" :key="item.id">
					<view class="uni-comment-face">
            <image :src="item.member_head_portrait || '/static/missing-face.png'" mode="widthFix"></image>
          </view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{ item.member_nickname }}</text>
						</view>
						<view class="uni-comment-date">
							<text>{{ item.updated_at | time }}</text>
						</view>
						<view class="uni-comment-content">{{ item.content }}</view>
            <view>
            <image
               mode="aspectFill"
               class="image"
               v-for="imgItem in item.covers"
               :key="imgItem"
               :src="imgItem"></image>
            </view>
					</view>
				</view>
			</view>
			<!-- 评论区 end -->
		  <uni-load-more :status="loadingType" />
		</view>
  </view>
</template>

<script>
import {evaluateList} from "../../api/product";
import uniLoadMore from '@/components/uni-load-more/uni-load-more';
import moment from 'moment';
export default {
  name: 'list',
	components: {
		uniLoadMore
	},
  data () {
    return {
      id: '',
      loadingType: 'more', //加载更多状态
      evaluationList: [],
      page: 1
    }
  },
  filters: {
    time(val) {
      return moment(val * 1000).format('YYYY-MM-DD HH:mm')
    }
  },
  onLoad(options) {
    this.initData(options);
  },
  onPageScroll(e){
  },
  //下拉刷新
  onPullDownRefresh(){
    this.page = 1;
    this.goodsList = [];
    this.getEvaluationList('refresh');
  },
  //加载更多
  onReachBottom(){
    this.page ++;
    this.getEvaluationList();
  },
  methods: {
    /**
     *@des 初始化数据
     *@author stav stavyan@qq.com
     *@blog https://stavtop.club
     *@date 2019/11/28 15:41:29
     */
    initData (options) {
      this.id = options.product_id;
      this.getEvaluationList();
    },
    async getEvaluationList(type) {
      uni.showLoading({title: '加载中...'});
      await this.$get(`${evaluateList}`, {
        product_id: this.id,
        page: this.page
      }).then(r => {
          if (type === 'refresh') {
              uni.stopPullDownRefresh();
          }
          if (r.code === 200) {
              this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
              this.evaluationList = [...this.evaluationList, ...r.data];
          } else {
              uni.showToast({title: r.message, icon: "none"});
          }
      }).catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.image {
  display: inline-block;
  width: 180upx;
  height: 180upx;
  margin: 0 10upx 10upx 0;
}
</style>
