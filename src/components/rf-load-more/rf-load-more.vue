<template>
	<view class="rf-load-more" :style="{width: width}">
		<view class="rf-load-more__img" v-if="status === 'loading' && showIcon">
			<view class="load1">
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
			</view>
			<view class="load2">
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
			</view>
			<view class="load3">
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
				<view :style="{ background: color }"></view>
			</view>
		</view>
		<view
			class="cu-load"
			:class="status === 'more' ? 'loading' : 'over'"
		></view>
		<!--<text class="rf-load-more__text" :style="{color:color}">{{status === 'more' ? contentText.contentdown : (status === 'loading' ? contentText.contentrefresh : contentText.contentnomore)}}</text>-->
	</view>
</template>

<script>
export default {
	name: 'rf-load-more',
	props: {
		status: {
			// 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
			type: String,
			default: 'more'
		},
		width: {
			// 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
			type: String,
			default: '100vw'
		},
		showIcon: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: '#777777'
		},
		contentText: {
			type: Object,
			default() {
				return {
					// contentdown: "上拉显示更多",
					// contentrefresh: "正在加载...",
					// contentnomore: "—— 全部都被您看完了 ——"
				};
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style>
.rf-load-more {
	display: flex;
	flex-direction: row;
	height: 80upx;
	align-items: center;
	justify-content: center;
	/*position: fixed;*/
	/*bottom: 5upx;*/
	/*text-align: center;*/
}

.rf-load-more__text {
	font-size: 28upx;
	color: #999;
}

.rf-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.rf-load-more__img > view {
	position: absolute;
}

.rf-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.rf-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.rf-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.rf-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.rf-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
