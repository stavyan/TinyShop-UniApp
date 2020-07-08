<template>
	<text
		v-if="text"
		:class="'bg-'+themeColor.name"
		:style="badgeStyle"
		class="uni-badge uni-badge--small"
		@click="onClick()"
		>{{ text }}</text
	>
</template>

<script>
/**
 * Badge 数字角标
 * @description 数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示，默认为实心灰色背景
 * @tutorial https://ext.dcloud.net.cn/plugin?id=21
 * @property {String} text 角标内容
 * @property {String} type = [default|primary|success|warning|error] 颜色类型
 * 	@value default 灰色
 * 	@value primary 蓝色
 * 	@value success 绿色
 * 	@value warning 黄色
 * 	@value error 红色
 * @property {String} size = [normal|small] Badge 大小
 * 	@value normal 一般尺寸
 * 	@value small 小尺寸
 * @property {String} inverted = [true|false] 是否无需背景颜色
 * @event {Function} click 点击 Badge 触发事件
 * @example <uni-badge text="1"></uni-badge>
 */
export default {
	name: 'UniBadge',
	props: {
		type: {
			type: String,
			default: 'default'
		},
		inverted: {
			type: Boolean,
			default: false
		},
		text: {
			type: [String, Number],
			default: ''
		},
		size: {
			type: String,
			default: 'normal'
		}
	},
	data() {
		return {
			badgeStyle: ''
		};
	},
	watch: {
		text() {
			this.setStyle();
		}
	},
	mounted() {
		this.setStyle();
	},
	methods: {
		setStyle() {
			this.badgeStyle = `width: ${String(this.text).length * 8 + 12}px`;
		},
		onClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
$bage-size: 12px;
$bage-small: scale(0.8);
$bage-height: 20px;

.uni-badge {
	/* #ifndef APP-PLUS */
	display: flex;
	/* #endif */
	justify-content: center;
	flex-direction: row;
	height: $bage-height;
	line-height: $bage-height;
	border-radius: 100px;
	text-align: center;
	background-color: #f43530;
	color: $color-white;
	font-family: 'Helvetica Neue', Helvetica, sans-serif;
	font-size: $bage-size;
	padding: 0 6px;
	opacity: 0.95;
}
.uni-badge--small {
	transform: $bage-small;
	transform-origin: center center;
}
</style>
