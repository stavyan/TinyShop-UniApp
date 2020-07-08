<template>
	<view class="rf-search">
		<view class="search-box">
			<mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="hotSearchDefault || '请输入关键字'"
				@search="doSearch(false)"
				@confirm="doSearch(false)"
				v-model="keyword"
			></mSearch>
		</view>
		<view class="search-keyword" @tap="blur">
			<scroll-view class="keyword-list-box" v-if="isShowKeywordList" scroll-y>
				<view
					class="keyword-entry"
					hover-class="keyword-entry-tap"
					v-for="row in keywordList"
					:key="row.keyword"
				>
					<view class="keyword-text" @tap="doSearch(row.keyword)">
						<rf-parser lazy-load :html="row.htmlStr"></rf-parser>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<!--<image src="/static/HM-search/back.png"></image>-->
					</view>
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" v-if="!isShowKeywordList" scroll-y>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<text
								class="iconfont iconiconfontshanchu1"
								@tap="oldDelete"
							></text>
						</view>
					</view>
					<view class="keyword">
						<view
							v-for="(keyword, index) in oldKeywordList"
							@tap="doSearch(keyword)"
							:key="index"
							>{{ keyword }}</view
						>
					</view>
					<view class="hide-hot-tis" v-if="oldKeywordList.length === 0">
						<view>暂无记录</view>
					</view>
				</view>
				<view class="keyword-block" v-if="hotKeywordList">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<text class="iconfont" :class="forbid" @tap="hotToggle"></text>
						</view>
					</view>
					<view class="keyword" v-if="forbid == 'iconai47'">
						<view
							v-for="(keyword, index) in hotKeywordList"
							@tap.stop="doSearch(keyword)"
							:key="index"
							>{{ keyword }}</view
						>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
import mSearch from '@/components/rf-search/rf-search';
export default {
	data() {
		return {
			keyword: '',
			oldKeywordList: [],
			hotKeywordList: [],
			keywordList: [],
			forbid: 'iconai47',
			isShowKeywordList: false,
			hotSearchDefault: '',
			type: null // 搜索类型
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	components: {
		mSearch
	},
	methods: {
		async initData(options) {
			this.type = options.type;
			const search = JSON.parse(options.data || '{}');
			this.hotSearchDefault = search.hot_search_default || options.keyword;
			this.hotKeywordList = search.hot_search_list;
			this.loadOldKeyword();
		},
		blur() {
			uni.hideKeyboard();
		},
		// 加载历史搜索,自动读取本地Storage
		loadOldKeyword() {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					let OldKeys = JSON.parse(res.data);
					this.oldKeywordList = OldKeys;
				}
			});
		},
		// 顶置关键字
		setkeyword(data) {
			this.keyword = data.keyword;
		},
		// 清除历史搜索
		oldDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						this.oldKeywordList = [];
						uni.removeStorage({ key: 'OldKeys' });
					}
				}
			});
		},
		// 热门搜索开关
		hotToggle() {
			this.forbid = this.forbid === 'iconai47' ? 'iconyanjing' : 'iconai47';
		},
		// 执行搜索
		doSearch(key) {
			key = key || this.keyword || this.defaultKeyword;
			this.keyword = key;
			this.saveKeyword(key); // 保存为历史
			if (this.type === 'order') {
				this.$mRouter.push({ route: `/pages/order/search?keyword=${key}` });
			} else {
				this.$mRouter.push({ route: `/pages/product/list?keyword=${key}` });
			}
		},
		// 保存关键字到历史记录
		saveKeyword(keyword) {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					let OldKeys = JSON.parse(res.data);
					let findIndex = OldKeys.indexOf(keyword);
					if (findIndex === -1) {
						OldKeys.unshift(keyword);
					} else {
						OldKeys.splice(findIndex, 1);
						OldKeys.unshift(keyword);
					}
					// 最多10个纪录
					OldKeys.length > 10 && OldKeys.pop();
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; // 更新历史搜索
				},
				fail: () => {
					let OldKeys = [keyword];
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(OldKeys)
					});
					this.oldKeywordList = OldKeys; // 更新历史搜索
				}
			});
		}
	}
};
</script>
<style lang="scss">
.rf-search {
	.search-box {
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;

		.mSearch-input-box {
			width: 100%;
		}

		.input-box > input {
			width: 100%;
			height: 60upx;
			font-size: 32upx;
			border: 0;
			border-radius: 60upx;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			padding: 0 3%;
			margin: 0;
			background-color: #ffffff;
		}
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);

		.keyword-list-box {
			height: calc(100vh - 110upx);
			padding-top: 10upx;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
		}

		.keyword-entry {
			width: 94%;
			height: 80upx;
			margin: 0 3%;
			font-size: 30upx;
			color: #333;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: solid 1upx #e7e7e7;

			image {
				width: 60upx;
				height: 60upx;
			}

			.keyword-text {
				width: 90%;
			}

			.keyword-img {
				width: 10%;
				justify-content: center;
			}
		}

		.keyword-box {
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;

			.keyword-block {
				padding: 10upx 0;

				.keyword-list-header {
					width: 100vw;
					padding: 10upx 3%;
					font-size: 27upx;
					color: #333;
					display: flex;
					justify-content: space-between;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.keyword {
					width: 100vw;
					padding: 3px 3%;
					display: flex;
					flex-flow: wrap;
					justify-content: flex-start;
				}

				.hide-hot-tis {
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #6b6b6b;
				}

				.keyword > view {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 60upx;
					padding: 0 20upx;
					margin: 10upx 20upx 10upx 0;
					height: 60upx;
					font-size: 28upx;
					background-color: rgb(242, 242, 242);
					color: #6b6b6b;
				}
			}
		}
	}

	.iconfont {
		font-size: $font-lg + 12upx;
	}
}
</style>
