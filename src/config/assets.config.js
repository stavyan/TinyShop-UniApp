import indexConfig from './index.config.js';
const PATH = indexConfig.assetsPath;
/*
 * 图片静态资源表，所有图片资源路径在这统一管理，不应该写死在页面中，该数据挂载到Vue原型中。
 * 页面使用：this.$mAssetsPath.grid_1
 * CSS背景：应尽量使用:style="" 行内样式设置背景图
 * PATH说明：本地路径或者服务器路径
 *
 * 举例：<image :src="grid_1">  需要在data中映射 grid_1: this.$mAssetsPath.grid_1
 *
 * 特别注意：经测试小程序中不支持 <image :src="$mAssetsPath.grid_1"> 该用法
 */

export default {
	// 默认头像
	headImg: PATH + '/missing-face.png',

	// 出错填充图片
	errorImage: PATH + '/errorImage.jpg',

	// 品牌logo
	logo: PATH + '/logo.png',

	// 商城新闻
	newsBg: PATH + '/news.png',

	// 商城新闻
	userBg: PATH + '/user-bg.png',

	// vip背景
	vipCardBg: PATH + '/vip-card.png',

	// vip价格
	vipPrice: PATH + '/vip-price.png',

	// 弧形背景
	arc: PATH + '/arc.png',

	// 500
	noNetWorkImg: PATH + '/noNetWork.png',

	// 404
	notFoundImg: PATH + '/notFound.png',

	// 升级图标
	upgradeTop: PATH + '/upgrade-top.png',

	// 返回顶部
	backTop: PATH + '/top.png',

	// 分享引导背景
	shareBg: PATH + '/share-bg.png',

	// 分销tag
	distribution: PATH + '/distribution.png',

	// 包邮tag
	pinkage: PATH + '/pinkage.png',

	// 预售tag
	presale: PATH + '/presale.png',

	// 开放站点
	openSiteBg: PATH + '/open-site-bg.png',

	// 虚拟tag
	virtual: PATH + '/virtual.png',

	// 登录背景
	loginBg: PATH + '/login-bg.png',

	// 登录插画
	loginPic: PATH + '/login-pic.png',

	// 砍价标签
	wholesaleTag: PATH + '/wholesale-tag.png',

	// 拼团标签
	groupTag: PATH + '/group-tag.png',

	// 砍价标签
	bargainTag: PATH + '/bargain-tag.png',

	// 砍价标签
	discountTag: PATH + '/discount-tag.png',

	// 微信授权登录
	wechat: PATH + '/wechat.png',

	// 微信授权登录
	apple: PATH + '/apple.png',

	// 微信授权登录
	money: PATH + '/money.png',

	// 微信授权登录
	moneyBg: PATH + '/money-bg.png'
};
