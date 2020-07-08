/* eslint-disable */
// #ifdef H5
import { wechatConfig } from '@/api/basic';
import $mConfig from '@/config/index.config';
import jweixin from '@/common/jweixin';
// #endif
import { isBindingCheck } from '@/api/login';
import { payCreate } from '@/api/basic';
import { http } from '@/utils/request';
import mHelper from '@/utils/helper';
import mRouter from '@/utils/router';
import { orderPay } from '@/api/product';
export default {
	// 判断是否公众号（微信H5）
	isWechat() {
		// #ifdef H5
		const ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
		// #endif
	},

	// wxjssdk
	async wxConfigH5(url) {
		if (this.isWechat()) {
			const jsApiList = JSON.stringify([
				'chooseWXPay',
				'scanQRCode',
				'updateAppMessageShareData',
				'updateTimelineShareData'
			]);
			await http
				.post(`${wechatConfig}`, {
					url: url,
					jsApiList, // 需要调用微信的原生方法
					debug: false // 是否打开调试
				})
				.then(r => {
					jweixin.config({
						...r.data
					});
				});
		}
	},

	/*
	 *@des 微信支付
	 *
	 *@param order_group 订单:order;充值:recharge;
	 *@param data 订单 {“order_id”:199} 充值 {“money”:100};
	 */
	async weixinPay(order_group, data, route = '/pages/user/money/success', code) {
		// #ifdef H5
		if (!this.isWechat()) {
			mHelper.toast('仅支持微信H5、微信小程序、APP支付');
			return;
		}
		// #endif
		// #ifdef MP-QQ
		mHelper.toast('QQ小程序暂不支持充值');
		return;
		// #endif
		// #ifdef APP-PLUS
		await http
			.post(`${payCreate}`, {
				order_group,
				pay_type: 1,
				trade_type: 'app',
				data
			})
			.then(r => {
				uni.requestPayment({
					provider: 'wxpay', // 微信支付
					orderInfo: JSON.stringify(r.data.config), //微信订单数据 r.data.config
					success: function() {
						mHelper.toast('支付成功');
						mRouter.redirectTo({ route });
					},
					fail: function(err) {
						console.log('err', err);
						mHelper.toast('支付已取消');
					}
				});
			});
		// #endif
		// #ifndef APP-PLUS
		await http
			.post(`${isBindingCheck}`, {
				// #ifdef H5
				oauth_client: 'wechat',
				// #endif
				// #ifdef MP-WEIXIN
				oauth_client: 'wechatMp'
				// #endif
			})
			.then(async res => {
				if (res.data.openid) {
					await http
						.post(`${payCreate}`, {
							order_group,
							pay_type: 1,
							// #ifdef H5
							trade_type: 'js',
							// #endif
							// #ifdef MP-WEIXIN
							trade_type: 'mini_program',
							// #endif
							data,
							openid: res.data.openid
						})
						.then(r => {
							// #ifdef H5
							jweixin.ready(() => {
								jweixin.chooseWXPay({
									...r.data.config,
									success() {
										mHelper.toast('支付成功');
										mRouter.redirectTo({ route });
									},
									fail(res) {
										// 支付成功后的回调函数
										mHelper.toast('支付已取消');
									}
								});
							});
							// #endif
							// #ifdef MP-WEIXIN
							uni.requestPayment({
								...r.data.config,
								timeStamp: r.data.config.timestamp,
								success: () => {
									mHelper.toast('支付成功');
									mRouter.redirectTo({ route });
								},
								fail: res => {
									mHelper.toast('支付已取消');
								},
								complete: () => {}
							});
							// #endif
						});
				} else {
					// #ifdef MP-WEIXIN
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							http
								.post(`${payCreate}?code=${loginRes.code}`, {
									order_group,
									pay_type: 1,
									trade_type: 'mini_program',
									data
								})
								.then(r => {
									uni.requestPayment({
										...r.data.config,
										timeStamp: r.data.config.timestamp,
										success: () => {
											mHelper.toast('支付成功');
											mRouter.redirectTo({ route });
										},
										fail: res => {
											mHelper.toast('支付已取消');
										},
										complete: () => {}
									});
								});
						},
						fail: function(err) {
							mHelper.log(err);
						}
					});
					// #endif
					// #ifdef H5
					await http
						.post(`${payCreate}?code=${code}`, {
							order_group,
							pay_type: 1,
							trade_type: 'js',
							data
						})
						.then(r => {
							jweixin.ready(() => {
								jweixin.chooseWXPay({
									...r.data.config,
									success() {
										mHelper.toast('支付成功');
										mRouter.redirectTo({ route });
									},
									fail(res) {
										// 支付成功后的回调函数
										mHelper.toast('支付已取消');
									}
								});
							});
						});
					// #endif
				}
			});
		// #endif
	},

	/*
	 *@des 支付宝支付
	 *
	 *@param order_group 订单:order;充值:recharge;
	 *@param data 订单 {“order_id”:199} 充值 {“money”:100};
	 */
	async aliPay(order_group, data, route = '/pages/user/money/success') {
		// #ifdef MP-QQ
		mHelper.toast('QQ小程序不支持支付宝充值');
		return;
		// #endif
		// #ifdef MP-WEIXIN
		mHelper.toast('微信小程序不支持支付宝充值');
		return;
		// #endif
		await http
			.post(`${payCreate}`, {
				order_group,
				pay_type: 2,
				// #ifdef H5
				trade_type: 'wap',
				// #endif
				// #ifdef APP-PLUS
				trade_type: 'app',
				// #endif
				data
			})
			.then(r => {
				// #ifdef H5
				window.location.href = r.data.config.config;
				// #endif
				// #ifdef APP-PLUS
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: r.data.config.config, //微信、支付宝订单数据
					success: function() {
						mHelper.toast('支付成功');
						mRouter.redirectTo({ route });
					},
					fail: function(err) {
						mHelper.toast('支付已取消');
					}
				});
				// #endif
			});
	},

	/*
	 *@des 余额支付
	 *
	 *@param data 支付参数
	 */
	async balancePay(data, route = '/pages/user/money/success') {
		await http
			.post(`${orderPay}`, {
				order_group: 'order',
				trade_type: 'js',
				pay_type: 5,
				data
			})
			.then(() => {
				mRouter.redirectTo({ route });
			});
	}
};
