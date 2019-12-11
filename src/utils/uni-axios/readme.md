### uni-axios

使用axios封装request 网络请求库

**安装**

使用 HBuilderX 导入插件或者下载压缩包把文件解压到js_sdk目录下
```
npm install --save axios
```

**使用方式：**

使用方法同 axios。

**Example**

在utils文件夹下创建http.js

```javascript
import axios from '@/js_sdk/gangdiedao-uni-axios'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址：" + req.url, req.data || req.params)
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res)
	}
}

// 创建自定义接口服务实例
const http = axios.create({
	// baseURL: [baseURL],
	timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers: {
		'Content-Type': 'application/json',
		//'X-Requested-With': 'XMLHttpRequest',
	},
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// code...
	// 获取本地存储的Cookie
    // const cookie = uni.getStorageSync('cookie')
    // 设置Cookie
    // config.headers.Cookie = cookie
	_reqlog(config)
	return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	_reslog(response)
	// code...
	// 获取cookie
	// let headerStr = JSON.stringify(response.headers)
	// let cookie = (/(?:Set-Cookie).+;/.exec(headerStr)[0]).replace(/Set-Cookie|:|"/g, "")
	// if (cookie) {
		// uni.setStorage({
			// key: 'cookie',
			// data: cookie.split(';')[0]
		// })
	// }
	return response
}, error => {
	return Promise.reject(error.message)
})

export default http
```

执行GET请求

```javascript
import http from '@/utils/http.js'
// get 请求
http.get(URL, [params]).then((res) => {
	**
}).catch(error => {
	**
}).finally(() => {
	**
})

// post 请求
http.post(URL, [data]).then(res => {
	
}).catch(error => {
	
}).finally(() => {
	
})
```
