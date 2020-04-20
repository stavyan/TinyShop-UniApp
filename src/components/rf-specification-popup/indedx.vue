<template>
	<view
			class="popup spec"
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@tap="hideSpec"
	>
		<!-- 遮罩层 -->
		<view class="mask" @tap="hideSpec"></view>
		<view class="layer attr-content" @tap.stop="stopPrevent">
			<view class="a-t">
				<image :src="showTypeImage || productDetail.picture"></image>
				<view class="right">
					<text class="title">{{ productDetail.name }}</text>
					<text class="price">¥{{ currentSkuPrice || productDetail.minSkuPrice }}</text>
					<text class="stock">库存：{{ currentStock || productDetail.stock }}件</text>
					<view class="selected" v-if="specSelected.length > 0">
						已选：
						<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
							{{sItem.title}}
						</text>
						<text v-if="specSelected.length > 0">
							* {{ cartCount }}
						</text>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in specList" :key="index" class="attr-list">
				<text>{{item.title}}</text>
				<view class="item-list">
					<view class="tit"
					      v-for="(childItem, childIndex) in specChildList"
					      v-if="childItem.base_spec_id === item.base_spec_id"
					      :key="childIndex"
					      :class="{selected: childItem.selected}"
					      :style="childItem.selected && parseInt(item.show_type) === 2 ? styleObject: ''"
					      @tap="selectSpec(childIndex, childItem.base_spec_id, item.show_type)"
					>
						<text v-if="parseInt(item.show_type) === 1">
							{{childItem.title }}
						</text>
						<text v-if="parseInt(item.show_type) === 2">
							{{childItem.title }}
						</text>
						<view v-if="parseInt(item.show_type) === 3">
							<image
									class="img"
									:src="childItem.data || productDetail.picture"
									mode="aspectFill"
							></image>
							{{childItem.title }}
						</view>
					</view>
				</view>
			</view>
			<button class="btn" @tap="toggleSpec">完成</button>
		</view>
	</view>
</template>

<script>
    export default {
        name: 'indedx'
    }
</script>

<style scoped>

</style>
