import {
	isObject,
	isString
} from 'axios/lib/utils'

import createError from 'axios/lib/core/createError'
import buildUrl from 'axios/lib/helpers/buildURL'
import settle from 'axios/lib/core/settle'
import Timeout from './await-timeout'

const timer = new Timeout()

export const adapter = config => {
	return new Promise((resolve, reject) => {
		const requestMethod = (isString(config.method) ? config.method : 'GET').toUpperCase()
		const requestUrl = buildUrl(config.url, config.params, config.paramsSerializer)
		const requestHeaders = isObject(config.headers) ? config.headers : {}

		// 请求数据
		let requestData = config.data

		const request = uni.request({
			method: requestMethod,
			url: requestUrl,
			header: requestHeaders,
			data: requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH' ? requestData : '',
			responseType: config.responseType === 'arraybuffer' ? 'arraybuffer' : 'text',
			dataType: config.responseType === 'json' ? 'json' : config.responseType,
			success: (res) => {
				settle(resolve, reject, {
					data: res.data,
					status: res.statusCode,
					statusText: '',
					headers: res.header,
					config: config,
					request: request
				})
			},
			fail: () => {
				const error = createError('网络错误', config, undefined, request)
				reject(error)
			},
			complete: () => {
				timer.clear()
			}
		})

		// 支持超时处理
		if (config.timeout) {
			timer.set(config.timeout).then(() => {
				reject(new Error('请求超时'))
				request.abort()
			})
		}
	})
}
