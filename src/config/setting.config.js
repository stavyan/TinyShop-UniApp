import $mAssetsPath from './assets.config';
import $mConstData from './constData.config';
class Setting {
	constructor(
		appName,
		appLogo,
		appServiceType,
		appServiceQr,
		appAgreementDefaultSelect,
		isOpenCommission,
		isOpenScan,
		isOpenLiveStreaming,
		styleLoadingIsOpen,
		styleLoadingType,
		styleUserIsOpen,
		styleType,
		isOpenRecharge,
		isOpenIndexCate,
		isOpenSite,
		productPosterTitle,
		productPosterCoverType,
		closeLogin,
		closeRegister,
		closeThirdPartyLogin,
		closeSiteDate,
		closeSiteExplain,
		styleCateType,
		styleLoginType,
		productPosterQrType,
		closeRegisterPromoCode
	) {
		this._appName = appName; // 应用名称
		this._appLogo = appLogo; // 应用Logo
		this._appServiceType = appServiceType; // 客服显示类型
		this._appServiceQr = appServiceQr; // 客服二维码
		this._appAgreementDefaultSelect = appAgreementDefaultSelect; // 协议默认选中
		this._isOpenCommission = isOpenCommission; // 开启分销
		this._isOpenScan = isOpenScan; // 开启扫一扫入口
		this._isOpenLiveStreaming = isOpenLiveStreaming; // 开启直播入口
		this._styleLoadingIsOpen = styleLoadingIsOpen; // 开启加载
		this._styleLoadingType = styleLoadingType; // 用户可否自定义风格
		this._styleUserIsOpen = styleUserIsOpen; // 加载类型
		this._styleType = styleType; // 加载类型
		this._isOpenRecharge = isOpenRecharge; // 充值入口开启
		this._isOpenIndexCate = isOpenIndexCate; // 首页分类开启
		this._isOpenSite = isOpenSite; // 开放站点
		this._productPosterTitle = productPosterTitle; // 商品海报推广语
		this._productPosterCoverType = productPosterCoverType; // 左上角头像显示类型
		this._closeLogin = closeLogin; // 关闭登录
		this._closeRegister = closeRegister; // 关闭注册
		this._closeThirdPartyLogin = closeThirdPartyLogin; // 关闭第三方授权登录
		this._closeSiteExplain = closeSiteExplain; // 关闭站点说明
		this._closeSiteDate = closeSiteDate; // 关闭站点时间
		this._styleCateType = styleCateType; // 分类风格
		this._styleLoginType = styleLoginType; // 登录注册页面风格
		this._productPosterQrType = productPosterQrType; // 海报二维码显示类型
		this._closeRegisterPromoCode = closeRegisterPromoCode; // 关闭注册激活码输入框
	}

	get productPosterQrType() {
		return this._productPosterQrType;
	}

	set productPosterQrType(value) {
		this._productPosterQrType = value;
	}

	get closeRegisterPromoCode() {
		return this._closeRegisterPromoCode;
	}

	set closeRegisterPromoCode(value) {
		this._closeRegisterPromoCode = value;
	}

	get closeSiteDate() {
		return this._closeSiteDate;
	}

	set closeSiteDate(value) {
		this._closeSiteDate = value;
	}

	get closeSiteExplain() {
		return this._closeSiteExplain;
	}

	set closeSiteExplain(value) {
		this._closeSiteExplain = value;
	}

	get styleCateType() {
		return this._styleCateType;
	}

	set styleCateType(value) {
		this._styleCateType = value;
	}

	get styleLoginType() {
		return this._styleLoginType;
	}

	set styleLoginType(value) {
		this._styleLoginType = value;
	}

	get closeLogin() {
		return this._closeLogin;
	}

	set closeLogin(value) {
		this._closeLogin = value;
	}

	get closeRegister() {
		return this._closeRegister;
	}

	set closeRegister(value) {
		this._closeRegister = value;
	}

	get productPosterTitle() {
		return this._productPosterTitle;
	}

	set productPosterTitle(value) {
		this._productPosterTitle = value;
	}

	get productPosterCoverType() {
		return this._productPosterCoverType;
	}

	set productPosterCoverType(value) {
		this._productPosterCoverType = value;
	}

	get closeThirdPartyLogin() {
		return this._closeThirdPartyLogin;
	}

	set closeThirdPartyLogin(value) {
		this._closeThirdPartyLogin = value;
	}

	get isOpenSite() {
		return this._isOpenSite;
	}

	set isOpenSite(value) {
		this._isOpenSite = value;
	}

	get styleUserIsOpen() {
		return this._styleUserIsOpen;
	}

	set styleUserIsOpen(value) {
		this._styleUserIsOpen = value;
	}

	get styleType() {
		return this._styleType;
	}

	set styleType(value) {
		this._styleType = value;
	}

	get appName() {
		return this._appName;
	}

	set appName(value) {
		this._appName = value;
	}

	get appLogo() {
		return this._appLogo;
	}

	set appLogo(value) {
		this._appLogo = value;
	}

	get appServiceType() {
		return this._appServiceType;
	}

	set appServiceType(value) {
		this._appServiceType = value;
	}

	get appServiceQr() {
		return this._appServiceQr;
	}

	set appServiceQr(value) {
		this._appServiceQr = value;
	}

	get appAgreementDefaultSelect() {
		return this._appAgreementDefaultSelect;
	}

	set appAgreementDefaultSelect(value) {
		this._appAgreementDefaultSelect = value;
	}

	get isOpenCommission() {
		return this._isOpenCommission;
	}

	set isOpenCommission(value) {
		this._isOpenCommission = value;
	}

	get isOpenScan() {
		return this._isOpenScan;
	}

	set isOpenScan(value) {
		this._isOpenScan = value;
	}

	get isOpenLiveStreaming() {
		return this._isOpenLiveStreaming;
	}

	set isOpenLiveStreaming(value) {
		this._isOpenLiveStreaming = value;
	}

	get styleLoadingIsOpen() {
		return this._styleLoadingIsOpen;
	}

	set styleLoadingIsOpen(value) {
		this._styleLoadingIsOpen = value;
	}

	get styleLoadingType() {
		return this._styleLoadingType;
	}

	set styleLoadingType(value) {
		this._styleLoadingType = value;
	}

	get isOpenRecharge() {
		return this._isOpenRecharge;
	}

	set isOpenRecharge(value) {
		this._isOpenRecharge = value;
	}

	get isOpenIndexCate() {
		return this._isOpenIndexCate;
	}

	set isOpenIndexCate(value) {
		this._isOpenIndexCate = value;
	}
}
export default new Setting(
	$mConstData.appName,	// 应用名称
	$mAssetsPath.logo,	// 应用logo
	'1',	// 客服类型
	$mAssetsPath.logo,	// 海报默认logo
	true,	// 是否默认选中协议
	true,	// 是否开启分销（无此功能）
	true,	// 是否显示首页扫一扫按钮
	true,	// 开启直播入口
	true,	// 是否开启loading 加载
	'rotatePlane', // loading 加载风格
	true,
	'rf',	// 商城主题
	false,	// 是否开启充值入口
	true, // 是否开启主页分类
	true, // 是否开放站点
	'为您挑选了一个好物',	// 海报图片（无此功能）
	'roundness',	// 海报头像显示风格（无此功能）
	false,	// 关闭登录入口
	false,	// 关闭注册入口
	false, // 关闭第三方登录
	'',	// 关闭站点时间
	'商城正在维护中...', 	// 关闭站点描述
	'one_two_three_cover', // one_two_three_cover 三级分类有图 one_two_three_text 三级分类无图
	'two',	// one 登录风格一 one 登录风格二
	'common_qr',
	true	// 关闭注册激活码输入框
);
