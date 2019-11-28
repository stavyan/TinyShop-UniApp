<template>
  <view class="container">
    <view class="uni-padding-wrap">
			<view class="uni-comment">
				<view class="uni-comment-list" v-for="(item, index) in evaluationList" :key="item.id">
					<view class="uni-comment-face">
            <image
               :src="item.member_head_portrait || '/static/missing-face.png'"
              mode="widthFix"></image>
          </view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{ item.member_nickname }}</text>
						</view>
						<view class="uni-comment-date">
							<text>{{ item.updated_at | time }}</text>
              <text> {{ item.sku_name || '基础款' }}</text>
              <!--<text>{{ item.product_name }} {{ item.sku_name }}</text>-->
						</view>
						<view class="uni-comment-content">{{ item.content }}</view>
						<view class="comment-image">
							<view
							 class="image-wrapper-fill"
               v-for="(imgItem, index2) in item.covers"
               :key="index2">
								<image
									 mode="aspectFill"
									 class="image"
									 :src="imgItem"
									 @error="onImageError(index, index2)"
								/>
            </view>
						</view>
					</view>
				</view>
			</view>
		  <empty :info="'该商品暂无评价'" v-if="evaluationList.length === 0"></empty>
			<!-- 评论区 end -->
		  <uni-load-more :status="loadingType" />
		</view>

  </view>
</template>

<script>
import {evaluateList} from "../../api/product";
import uniLoadMore from '@/components/uni-load-more/uni-load-more';
import moment from 'moment';
import empty from "@/components/empty";
import errorImg from './../../static/errorImage.jpg';
export default {
  name: 'list',
	components: {
		uniLoadMore,
    empty
	},
  data () {
    return {
      id: '',
      errorImg: errorImg,
      loadingType: 'more', //加载更多状态
      evaluationList: [],
      page: 1,
			img: '11'
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
    this.evaluationList = [];
    this.page = 1;
    this.getEvaluationList('refresh');
  },
  //加载更多
  onReachBottom(){
    this.page ++;
    this.getEvaluationList();
  },
  methods: {
		onImageError(index, index2) {
			this.evaluationList[index].covers[index2] = this.errorImg;
			console.log(this.evaluationList)
		},
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

<style scoped lang="scss">
.comment-image {
	display: flex;
	.image-wrapper-fill {
		display: inline-block;
		margin: 0 10upx 0 0;
		.image {
			width: 180upx;
			height: 180upx;
		}
	}
}
</style>
