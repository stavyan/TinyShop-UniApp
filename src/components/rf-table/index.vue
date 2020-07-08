<template>
	<view class="content" v-if="list.length > 0">
		<view class="title">分销商级别列表</view>
		<view class="advance-area">
			<view class="flex-box tc thead">
				<view class="item-4">级别名称</view>
				<view class="item-4">销售金额(元)</view>
				<view class="item-4">说明</view>
				<view class="item-4">分销占比(%)</view>
			</view>
			<view
				class="flex-box table tc"
				v-for="(item, index) in list"
				:key="index"
			>
				<view class="item-4" :class="level === item.name ? 'text-' + themeColor.name : ''">
					{{ item.name }}
				</view>
				<view class="item-4" :class="level === item.name ? 'text-' + themeColor.name : ''">
					{{ item.money }}
				</view>
				<view class="item-4" :class="level === item.name ? 'text-' + themeColor.name : ''">
					<view class="table-flex">
						<view class="item">分销商</view>
						<view class="item">上级分销商</view>
						<view class="item">上上级分销商</view>
					</view>
				</view>
				<view class="item-4" :class="level === item.name ? 'text-' + themeColor.name : ''">
					<view class="table-flex">
						<view class="item">{{ item.level_zero }}</view>
						<view class="item">{{ item.level_one }}</view>
						<view class="item">{{ item.level_two }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		level: {
			type: String,
			default: null
		}
	}
};
</script>

<style lang="scss">
$color: #e0e0e0;
.content {
	padding: 30upx;
	display: flex;
	flex: 1;
	flex-direction: column;
	/*background-color: #fbf9fe;*/
}

.flex-box {
	display: flex;
	flex-wrap: wrap;
}

.flex-box > .item-2 {
	flex: 0 0 50%;
}

.flex-box > .item-3 {
	flex: 0 0 33.3333%;
}

.flex-box > .item-4 {
	flex: 0 0 25%;
}

.title {
	margin: 30upx 0;
	font-size: $font-lg;
	font-weight: 600;
	color: #333;
}

//普通表格
.genaral-area {
	.item-2 {
		font-size: 26upx;
		border: 1upx solid $color;
		border-width: 1upx 1upx 0 0;
		padding: 16upx 0;
		box-sizing: border-box;
		text-align: center;

		&:first-child {
			border-left-width: 1upx;
		}

		&:last-child {
			border-right-width: 1upx;
		}
	}

	.thead {
		.item-2 {
			font-weight: bold;

			box-sizing: border-box;
		}
	}

	.table {
		&:last-child {
			border-bottom: 1upx solid $color;
		}

		.item-2 {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}
	}
}

// 多行合并表格
.advance-area {
	.item-3,
	.item-4 {
		font-size: 26upx;
		border: 1upx solid $color;
		border-width: 1upx 1upx 0 0;
		box-sizing: border-box;
		text-align: center;
		&:first-child {
			border-left-width: 1upx;
		}

		&:last-child {
			border-right-width: 1upx;
		}
	}

	.thead {
		.item-3,
		.item-4 {
			font-weight: bold;
			padding: 16upx 0;
			box-sizing: border-box;
		}
	}

	.table {
		&:last-child {
			border-bottom: 1upx solid $color;
		}

		.item-3,
		.item-4 {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}
	}

	.table-flex {
		flex: 1;

		.item {
			border-bottom: 1upx solid $color;
			padding: 10upx 0;
			box-sizing: border-box;

			&:last-child {
				border-width: 0;
			}
		}
	}
}
</style>
