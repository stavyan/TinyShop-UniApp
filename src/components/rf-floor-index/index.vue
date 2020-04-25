<template>
	<view class="rf-floor-index">
		<!--广告图-->
		<view class="banner" v-if="bannerShow" @tap="toBanner(banner.jump_type, banner.jump_link)">
			<image :src="banner.cover" mode="aspectFill"/>
		</view>
		<!--列表-->
		<view class="f-header" @tap="toList">
			<i class="iconfont icontuijian"/>
			<view class="tit-box">
				<text class="tit">{{ header.title }}</text>
				<text class="tit2">{{ header.desc }}</text>
			</view>
			<i class="iconfont iconyou"></i>
		</view>
		<view class="rf-product-list">
			<!--骨架屏显示 默认显示两项-->
			<view
					v-for="(item, index) in list.length > 0 ? list : [0, 0]" :key="index"
					class="product-item"
					@tap.stop="detail(item === 0 ? '' : item.id)"
			>
				<view class="image-wrapper">
					<image :src="item.picture" mode="aspectFill"></image>
					<text class="sketch in1line">{{ item.sketch }}</text>
				</view>
				<text class="title clamp in2line" v-if="item.name">{{item.name}}</text>
        <view class="last-line" v-if="item.name">
          <text class="price in1line">{{item.price}}
            <text class="m-price" v-if="item.market_price > item.price">¥ {{ item.market_price }}</text>
          </text>
          <text class="sales in1line">
            <text class="red">{{ item.sales }}</text>付款
          </text>
        </view>
			</view>
		</view>
	</view>
</template>

<script>
    /**
     *@des 首页楼层组件
     *@author stav stavyan@qq.com
     *@blog https://stavtop.club
     *@date 2020/01/08 11:28:39
     */
    export default {
        name: 'rfFloorIndex',
        props: {
            // 列表
            list: {
                type: Array,
                default() {
                    return []
                }
            },
            // 广告图
            banner: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 标题 例: 新品上市
            header: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 是否显示banner图
            bannerShow: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {}
        },
        methods: {
            // 跳转详情页
            detail(id) {
            	if (!id) return;
                this.$emit('detail', {
                    id
                });
            },
            // banner 跳转页
            toBanner(type, id) {
                this.$emit('toBanner', {
                    type,
                    id
                });
            },
            // 列表 跳转页
            toList() {
                this.$emit('toList');
            }
        }
    }
</script>

<style scoped lang="scss">
	.rf-floor-index {
		.banner {
			width: 92%;
			margin: 20upx 4% 0;

			image {
				width: 100%;
				height: 25vw;
				border-radius: 20upx;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
			}
		}

		.f-header {
			display: flex;
			align-items: center;
			height: 120upx;
			padding: 6upx 20upx;
			margin: 0 0 20upx;
			background: #fff;
			border-bottom: 1upx solid rgba(0, 0, 0, 0.05);

			.iconfont {
				color: $base-color;
				font-size: $font-lg + 30upx;
				margin-right: 20upx;
			}

			.tit-box {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			.tit {
				font-size: $font-lg +2upx;
				color: #font-color-dark;
				line-height: 1.3;
			}

			.tit2 {
				font-size: $font-sm;
				color: $font-color-light;
			}

			.iconyou {
				font-size: $font-lg +4upx;
				color: $font-color-light;
			}
		}
	}
</style>
