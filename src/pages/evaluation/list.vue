<template>
	<view class="content">
			<view class="label">
				<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="getEvaluationList('', index, label.type)" :key="index">
					{{label.name}}
					({{label.number}})
				</view>
			</view>
			<view class="list" v-if="evaluationList.length > 0">
				<view class="row" v-for="(row, index) in evaluationList" :key="index">
					<view class="left">
						<view class="face">
							<image class="avatar" :src="row.member_head_portrait || '/static/missing-face.png'" mode="aspectFill"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{row.member_nickname || '匿名用户'}}
							</view>
							<view class="date">
								{{ row.updated_at | time }}
							</view>
						</view>
						<view class="spec">
							规格: {{ row.sku_name || '基础款' }}
						</view>
						<view class="first">
							<view class="rat">
								{{row.content}}
							</view>
							<view class="img-video">
								<view class="box" v-for="item in row.covers" @tap="showBigImg(item,row.covers)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view>
						</view>
						<view class="append" v-if="parseInt(row.has_again, 10) === 1">
							<view class="date">
								{{ row | againDay }}
							</view>
							<view class="rat">
								{{row.again_content}}
							</view>
							<view class="img-video">
								<view class="box" v-for="item in row.again_covers" @tap="showBigImg(item,row.covers)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<uni-load-more class="load-more" :status="loadingType" />
			</view>
			<div v-else class="no-evaluation">
				暂无相关评价
			</div>
		</view>
</template>

<script>
	import {evaluateList} from "../../api/product";
	import moment from 'moment';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more';
	import empty from "@/components/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				evaluateStat: {},
				loadingType: 'more',
				labelList:[
					// {name:'全部',number:25,type: {}},
					// {name:'好评',number: this.evaluateStat.good_num, type: { explain_type: 3 }},
					// {name:'中评',number:1,type: { explain_type: 2 }},
					// {name:'差评',number:1,type: { explain_type: 1 }},
					// {name:'文字',number:12,type: { has_content: 1 }},
					// {name:'有图',number:12,type: { has_cover: 1 }},
					// {name:'视频',number:2,type: { has_video: 1 }},
					// {name:'追加',number:2,type: { has_again: 1 }}
				],
				labelIndex: 0,
				evaluationList: [],
				page: 1
			};
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			},
			againDay(val) {
				const day = moment(val.updated_at * 1000).format('DD') - moment(val.again_addtime * 1000).format('DD');
				return day ? `${day}天后追加` : '当天追加'
			}
		},
		onLoad(options) {
			this.initData(options);
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
				this.evaluateStat = JSON.parse(options.evaluateStat);
				this.id = this.evaluateStat.product_id;
				this.labelList = [
					{name:'全部',number: options.comment_num,type: {}},
					{name:'好评',number: this.evaluateStat.good_num || 0, type: { explain_type: 3 }},
					{name:'中评',number: this.evaluateStat.ordinary_num || 0, type: { explain_type: 2 }},
					{name:'差评',number: this.evaluateStat.negative_num || 0, type: { explain_type: 1 }},
					// {name:'文字',number: this.evaluateStat.good_num || 0, type: { has_content: 1 }},
					{name:'有图',number: this.evaluateStat.cover_num || 0, type: { has_cover: 1 }},
					// {name:'视频',number: this.evaluateStat.good_num || 0, type: { has_video: 1 }},
					{name:'追加',number: this.evaluateStat.again_num || 0, type: { has_again: 1 }}
				]
				this.getEvaluationList();
			},
			async getEvaluationList(type, index = 0, params) {
				if (params) {
					this.page = 1;
					this.evaluationList = [];
				}
				uni.showLoading({title: '加载中...'});
				await this.$get(`${evaluateList}`, {
					product_id: this.id,
					page: this.page,
					...params
				}).then(r => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					if (r.code === 200) {
						this.labelIndex = index;
						this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
						this.evaluationList = [...this.evaluationList, ...r.data];
					} else {
						uni.showToast({title: r.message, icon: "none"});
					}
				}).catch(err => {
						console.log(err)
				})
			},
			showBigImg(src, srclist){
				uni.previewImage({
					current:src,
					urls: srclist
				});
			}
		},
	}
</script>

<style lang="scss">
page{
		background-color: #fff;
	}
.myVideo{
	position: fixed;
	top: 50%;
	right: 100%;
}
.content{
	view{
		display: flex;
	}
	width: 100%;
	.label{
		padding: 0 2%;
		flex-wrap:wrap;
		view{
			padding: 0 20upx;
			height: 50upx;
			border-radius: 40upx;
			border:solid 1upx #ddd;
			align-items: center;
			color: #555;
			font-size: 26upx;
			background-color: #f9f9f9;
			margin: 10upx 20upx 10upx 0;
			&.on{
				border:solid 1upx #f06c7a;
				color: #f06c7a;
			}
		}
	}
	.list{
		flex-wrap: wrap;
		padding: 20upx 4%;
		.load-more {
			width: 100%;
		}
		.row{
			width: 100%;
			margin-top: 30upx;
			.left{
				width: 10vw;
				flex-shrink: 0;
				margin-right: 10upx;
				.face{
					width: 100%;
					image{
						width: 10vw;
						height: 10vw;
						border-radius: 100%;
					}

				}
			}
			.right{
				width: 100%;
				flex-wrap: wrap;
				.name-date{
					width: 100%;
					justify-content: space-between;
					align-items: baseline;
					.username{
						font-size: 32upx;
						color: #555;
					}
					.date{
						font-size:28upx;
						color: #aaa;
					}
				}
				.spec{
					width: 100%;
					color: #aaa;
					font-size: 26upx;
				}
				.first{
					width: 100%;
					flex-wrap: wrap;
					.rat{
						font-size: 30upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 50upx)/4);
							height: calc((84.6vw - 50upx)/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9)
								}
							}
						}
					}
				}

				.append{
					width: 100%;
					flex-wrap: wrap;
					.date{
						width: 100%;
						height: 40upx;
						border-left: 10upx solid #f06c7a;
						padding-left: 10upx;
						align-items: center;
						font-size: 32upx;
						margin: 20upx 0;
					}
					.rat{
						font-size: 30upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 10upx - (10upx * 4))/4);
							height: calc((84.6vw - 10upx - (10upx * 4))/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9);
								}
							}
						}
					}
				}
			}
		}
	}
	.no-evaluation {
		text-align: center;
		margin-top: 40upx;
		color: #555;
	}
}
</style>
