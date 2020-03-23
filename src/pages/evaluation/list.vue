<template>
	<view class="content">
		<!--评价分类选项-->
		<view class="label">
			<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="getEvaluationList('', index, label.type)" :key="index">
				{{label.name}}
				({{label.number}})
			</view>
		</view>
		<!--评价列表-->
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
							{{ row.created_at | time }}
						</view>
					</view>
					<view class="spec">
						<text>
							购买类型: {{ row.sku_name || '基础款' }}
						</text>
						<rf-rate
							size="16"
						  disabled="true"
							:value="row.scores"
							active-color="#fa436a" />
					</view>
					<view class="first">
						<view class="rat in10line">
							{{row.content}}
						</view>
						<view class="img-video">
							<view class="box" v-for="(item, index2) in row.covers" @tap="showBigImg(item,row.covers)" :key="item">
								<image mode="aspectFill" @error="onImageError(index, index2)" :src="item || '/static/errorImage.jpg'"></image>
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
								<image mode="aspectFill" :src="item || '/static/errorImage.jpg'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-evaluation" v-else>
			暂无相关评价
		</view>
	</view>
</template>

<script>
	import {evaluateList} from "@/api/product";
	import moment from '@/utils/moment';
	import empty from "@/components/empty";
	import rfRate from "@/components/rf-rate/rf-rate";
	export default {
		components: {
			empty,
			rfRate
		},
		data() {
			return {
				evaluateStat: {},
				labelList:[],
				labelIndex: 0,
				evaluationList: [],
				page: 1
			};
		},
		filters: {
	    // 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm')
			},
	    // 计算评论与追评时间
			againDay(val) {
				const day = moment(val.again_addtime * 1000).format('DD') - moment(val.created_at * 1000).format('DD');
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
				this.evaluationList[index].covers[index2] = '/static/errorImage.jpg';
			},
			// 初始化数据
			initData (options) {
				this.evaluateStat = JSON.parse(options.evaluateStat);
				if (!this.evaluateStat) return;
				this.id =  this.evaluateStat.product_id;
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
			// 获取评论列表
			async getEvaluationList(type, index = 0, params) {
				if (params) {
					this.page = 1;
					this.evaluationList = [];
				}
				
				await this.$get(`${evaluateList}`, {
					product_id: this.id,
					page: this.page,
					...params
				}).then(r => {
					if (type === 'refresh') {
						uni.stopPullDownRefresh();
					}
					this.labelIndex = index;
					this.evaluationList = [...this.evaluationList, ...r.data];
				})
			},
			// 图片预览
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
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.first{
					width: 100%;
					flex-wrap: wrap;
					.rat{
						font-size: $font-base;
						line-height: 1.5;
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
		overflow: hidden;
		display: block;
		width: 100%;
		text-align: center;
		margin-top: 60upx;
		color: #555;
	}
}
</style>
