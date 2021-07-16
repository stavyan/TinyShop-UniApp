/* eslint-disable */
const files = require.context('@/utils/languages/en', true, /\.json$/)
let en = {};
files.keys().forEach(key => {
	const data = require('' + key);
	en = { ...en, ...data }
})
export default en;
