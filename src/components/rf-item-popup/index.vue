<template>
	<view class="rf-item-popup">
		<view class="c-row b-b" @tap.stop="show">
			<view class="left">
				<text class="tit">{{ title }}</text>
			</view>
			<view class="mid">
				<slot name="content" v-if="!isEmpty"></slot>
				<view class="empty" v-else>
					{{ empty }}
				</view>
			</view>
			<slot class="right" name="right"></slot>
		</view>
		<!--规格-模态层弹窗-->
		<view class="popup" :class="specClass">
			<!-- 遮罩层 -->
			<view class="mask" @tap="hide"></view>
			<!--内容层-->
			<view class="layer">
				<slot name="popup"></slot>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * @des 点击item 显示popup
 *
 * @author stav stavyan@qq.com
 * @date 2020-04-16 11:15
 */
export default {
	name: 'rfItemPopup',
	props: {
		title: {
			type: String,
			default: ''
		},
		empty: {
			type: String,
			default: ''
		},
		specClass: {
			type: String,
			default: 'none'
		},
		isEmpty: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		show() {
			this.$emit('show');
		},
		hide() {
			this.$emit('hide');
		},
		stopPrevent() {}
	}
};
</script>

<style lang="scss">
.rf-item-popup {
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
		.left {
			width: 140upx;
		}
		.mid {
			flex: 1;
		}
		.right {
		}
		.empty {
			font-size: $font-base;
		}
	}
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		&.show {
			display: block;
			.mask {
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
		}
		&.service {
			min-height: 600upx;
			.row {
				margin: 30upx;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
}
</style>
