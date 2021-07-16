/* eslint-disable */
//递归获取 views 文件夹下的所有.vue文件
const files = require.context('@/utils/languages/zh', true, /\.json$/)
let zh = {};
files.keys().forEach(key => {
	const data = require('' + key);
	zh = { ...zh, ...data }
})
export default zh;
