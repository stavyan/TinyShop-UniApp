<template>
	<view class="content">
		<view
			class="mix-list-cell"
			:class="border"
			@tap="eventClick"
			hover-class="cell-hover"
			:hover-stay-time="50"
		>
			<i
				v-if="icon"
				class="iconfont cell-icon"
				:style="[{ color: iconColor }]"
				:class="icon"
			/>
			<text class="cell-tit clamp">{{ title }}</text>
			<text v-if="tips" class="cell-tip">{{ tips }}</text>
			<text class="cell-more iconfont" :class="typeList[navigateType]"></text>
		</view>
	</view>
</template>

<script>
/**
 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
 *  比如加入image， iconSize可控等
 */
export default {
	data() {
		return {
			typeList: {
				left: 'iconzuo',
				right: 'iconyou',
				up: 'iconshang',
				down: 'iconxia'
			}
		};
	},
	props: {
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: '标题'
		},
		tips: {
			type: String,
			default: ''
		},
		navigateType: {
			type: String,
			default: 'right'
		},
		border: {
			type: String,
			default: 'b-b'
		},
		hoverClass: {
			type: String,
			default: 'cell-hover'
		},
		iconColor: {
			type: String,
			default: '#333'
		}
	},
	methods: {
		eventClick() {
			this.$emit('eventClick');
		}
	}
};
</script>

<style lang="scss">
.icon .mix-list-cell.b-b:after {
	left: 90upx;
}
.mix-list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;

	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}

	.cell-icon {
		align-self: center;
		width: 56upx;
		max-height: 60upx;
		font-size: 38upx;
	}
	.cell-more {
		align-self: center;
		font-size: 30upx;
		color: $font-color-base;
		margin-left: $uni-spacing-row-sm;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		margin-right: 10upx;
	}
	.cell-tip {
		font-size: $font-sm + 2upx;
	}
}
</style>
