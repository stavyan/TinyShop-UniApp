<template>
	<view class="rf-search-bar">
		<!-- 状态栏 -->
		<view v-if="headerShow" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部搜索栏 -->
		<view v-if="headerShow" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 跳转分类模块 -->
			<view class="addr" @tap.stop="link">
				<view class="icon yticon" :class="icon" ></view>
				{{ title }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
				 @tap="toSearch"
				 disabled
				 :value="placeholder"
					placeholder-style="color:#ccc;"
				/>
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="headerShow" class="place"></view>
	</view>
</template>

<script>
export default {
		props: {
			headerShow: {
				type: Boolean,
				default: true
			},
			placeholder: {
				type: String,
				default: '输入关键字搜索'
			},
			icon: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: null
			},
		},
		data() {
	    return {
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				statusTop:null,
				nVueTitle:null
	    }
		},
		methods: {
			link() {
				this.$emit('link')
			},
			toSearch() {
				this.$emit('search')
			}
		}
	}
</script>

<style scoped lang="scss">
.rf-search-bar {
	background-color: #fff;
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
	.header {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon {
				height: 60upx;
				margin-right: 6upx;
				margin-left: 15upx;
				display: flex;
				align-items: center;
				font-size: 35upx;
				color: $base-color;
			}
		}
		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input {
				width: 100%;
				padding-left: 28upx;
				height: 28upx;
				color:#888;
				font-size: 28upx;
			}
		}
	}
	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
}
</style>
