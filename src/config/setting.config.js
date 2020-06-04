import $mAssetsPath from './assets.config';
import $mConstData from './constData.config';
class Setting {
	constructor(appName, appLogo, appServiceType, appServiceQr, appCateType, appLoading, appAgreementDefaultSelect) {
		this._appName = appName;
		this._appLogo = appLogo;
		this._appServiceType = appServiceType;
		this._appServiceQr = appServiceQr;
		this._appCateType = appCateType;
		this._appLoading = appLoading;
		this._appAgreementDefaultSelect = appAgreementDefaultSelect;
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

	get appCateType() {
		return this._appCateType;
	}

	set appCateType(value) {
		this._appCateType = value;
	}

	get appLoading() {
		return this._appLoading;
	}

	set appLoading(value) {
		this._appLoading = value;
	}

	get appAgreementDefaultSelect() {
		return this._appAgreementDefaultSelect;
	}

	set appAgreementDefaultSelect(value) {
		this._appAgreementDefaultSelect = value;
	}
}
export default new Setting($mConstData.appName, $mAssetsPath.logo, '0', $mAssetsPath.logo, '1', '1', '0');
