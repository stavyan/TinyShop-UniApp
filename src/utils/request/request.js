/**
 * Request 1.0.6
 * @Class Request
 * @description luch-request 1.0.6 http请求插件
 * @Author lu-ch
 * @Date 2020-03-17
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 */
export default class Request {
	config = {
		baseUrl: '',
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		// #ifndef MP-ALIPAY || APP-PLUS
		responseType: 'text',
		// #endif
		custom: {},
		// #ifdef MP-ALIPAY
		timeout: 30000,
		// #endif
		// #ifdef APP-PLUS
		sslVerify: true
		// #endif
	};

	static posUrl(url) {
		/* 判断url是否为绝对路径 */
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
	}

	static mergeUrl(url, baseUrl, params) {
		let mergeUrl = Request.posUrl(url) ? url : `${baseUrl}${url}`;
		if (Object.keys(params).length !== 0) {
			const paramsH = Request.addQueryString(params);
			mergeUrl += mergeUrl.includes('?') ? `&${paramsH}` : `?${paramsH}`;
		}
		return mergeUrl;
	}

	static addQueryString(params) {
		let paramsData = '';
		Object.keys(params).forEach(function(key) {
			paramsData += key + '=' + encodeURIComponent(params[key]) + '&';
		});
		return paramsData.substring(0, paramsData.length - 1);
	}

	/**
	 * @property {Function} request 请求拦截器
	 * @property {Function} response 响应拦截器
	 * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
	 */
	interceptor = {
		/**
		 * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
		 */
		request: cb => {
			if (cb) {
				this.requestBeforeFun = cb;
			}
		},
		/**
		 * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
		 * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
		 */
		response: (cb, ecb) => {
			if (cb) {
				this.requestComFun = cb;
			}
			if (ecb) {
				this.requestComFail = ecb;
			}
		}
	};

	requestBeforeFun(config) {
		return config;
	}

	requestComFun(response) {
		return response;
	}

	requestComFail(response) {
		return response;
	}

	/**
	 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
	 * @param { Number } statusCode - 请求响应体statusCode（只读）
	 * @return { Boolean } 如果为true,则 resolve, 否则 reject
	 */
	validateStatus(statusCode) {
		return statusCode === 200;
	}

	/**
	 * @Function
	 * @param {Request~setConfigCallback} f - 设置全局默认配置
	 */
	setConfig(f) {
		this.config = f(this.config);
	}

	/**
	 * @Function
	 * @param {Object} options - 请求配置项
	 * @prop {String} options.url - 请求路径
	 * @prop {Object} options.data - 请求参数
	 * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
	 * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	 * @prop {Object} [options.header = config.header] - 请求header
	 * @prop {Object} [options.method = config.method] - 请求方法
	 * @returns {Promise<unknown>}
	 */
	async request(options = {}) {
		options.baseUrl = this.config.baseUrl;
		options.dataType = options.dataType || this.config.dataType;
		// #ifndef MP-ALIPAY || APP-PLUS
		options.responseType = options.responseType || this.config.responseType;
		// #endif
		// #ifdef MP-ALIPAY
		options.timeout = options.timeout || this.config.timeout;
		// #endif
		options.url = options.url || '';
		options.data = options.data || {};
		options.params = options.params || {};
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.custom = { ...this.config.custom, ...(options.custom || {}) };
		// #ifdef APP-PLUS
		options.sslVerify =
			options.sslVerify === undefined
				? this.config.sslVerify
				: options.sslVerify;
		// #endif
		options.getTask = options.getTask || this.config.getTask;
		return new Promise((resolve, reject) => {
			let next = true;
			const cancel = (t = 'handle cancel', config = options) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(options, cancel) };
			const _config = { ...handleRe };
			if (!next) return;
			const requestTask = uni.request({
				url: Request.mergeUrl(_config.url, _config.baseUrl, _config.params),
				data: _config.data,
				header: _config.header,
				method: _config.method,
				// #ifdef MP-ALIPAY
				timeout: _config.timeout,
				// #endif
				dataType: _config.dataType,
				// #ifndef MP-ALIPAY || APP-PLUS
				responseType: _config.responseType,
				// #endif
				// #ifdef APP-PLUS
				sslVerify: _config.sslVerify,
				// #endif
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}

	get(url, params = {}) {
		const options = {};
		options.params = params;
		return this.request({
			url,
			method: 'GET',
			...options
		});
	}

	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});
	}

	// #ifndef MP-ALIPAY
	put(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'PUT',
			...options
		});
	}

	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
	delete(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'DELETE',
			...options
		});
	}

	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN
	connect(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'CONNECT',
			...options
		});
	}

	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
	head(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'HEAD',
			...options
		});
	}

	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
	options(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'OPTIONS',
			...options
		});
	}

	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN
	trace(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'TRACE',
			...options
		});
	}

	// #endif

	upload(
		url,
		{
			// #ifdef APP-PLUS
			files,
			// #endif
			// #ifdef MP-ALIPAY
			fileType,
			// #endif
			filePath,
			name,
			header,
			formData = {},
			custom = {},
			params = {},
			getTask
		}
	) {
		return new Promise((resolve, reject) => {
			let next = true;
			const globalHeader = { ...this.config.header };
			delete globalHeader['content-type'];
			delete globalHeader['Content-Type'];
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				// #ifdef MP-ALIPAY
				fileType,
				// #endif
				filePath,
				method: 'UPLOAD',
				name,
				header: header || globalHeader,
				formData,
				params,
				custom: { ...this.config.custom, ...custom },
				getTask: getTask || this.config.getTask
			};
			// #ifdef APP-PLUS
			if (files) {
				pubConfig.files = files;
			}
			// #endif
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			const _config = {
				url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				// #ifdef MP-ALIPAY
				fileType: handleRe.fileType,
				// #endif
				filePath: handleRe.filePath,
				name: handleRe.name,
				header: handleRe.header,
				formData: handleRe.formData,
				complete: response => {
					response.config = handleRe;
					if (typeof response.data === 'string') {
						response.data = JSON.parse(response.data);
					}
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			};
			// #ifdef APP-PLUS
			if (handleRe.files) {
				_config.files = handleRe.files;
			}
			// #endif
			if (!next) return;
			const requestTask = uni.uploadFile(_config);
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}

	download(url, options = {}) {
		return new Promise((resolve, reject) => {
			let next = true;
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				method: 'DOWNLOAD',
				header: options.header || this.config.header,
				params: options.params || {},
				custom: { ...this.config.custom, ...(options.custom || {}) },
				getTask: options.getTask || this.config.getTask
			};
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};

			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			if (!next) return;
			const requestTask = uni.downloadFile({
				url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				header: handleRe.header,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}
}
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
/**
 * 请求拦截器回调
 * @return {Object} - 返回操作后的config
 * @callback Request~requestCallback
 * @param {Object} config - 全局config
 * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
 */
/**
 * 响应拦截器回调
 * @return {Object} - 返回操作后的response
 * @callback Request~responseCallback
 * @param {Object} response - 请求结果 response
 */
/**
 * 响应错误拦截器回调
 * @return {Object} - 返回操作后的response
 * @callback Request~responseErrCallback
 * @param {Object} response - 请求结果 response
 */
