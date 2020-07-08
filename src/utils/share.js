/* eslint-disable */
// #ifdef APP-PLUS
let alphaBg, shareMenu;
// 关闭弹窗
export const closeShare = function() {
	alphaBg && alphaBg.close();
	alphaBg && shareMenu.close();
};
// 复制
function onCopy(item, shareInfo, callback) {
	let copyInfo =
		shareInfo.shareUrl || shareInfo.shareContent || shareInfo.shareImg;
	if (copyInfo) {
		uni.setClipboardData({
			data: copyInfo,
			success: () => {
				uni.showToast({
					title: '已复制到剪贴板',
					icon: 'none'
				});
				callback && callback(item);
			}
		});
	}
}
// 更多
function onMore(item, shareInfo, callback) {
	plus.share.sendWithSystem(
		{
			type: 'text',
			title: shareInfo.shareTitle || '',
			href: shareInfo.shareUrl || '',
			content: shareInfo.shareContent || ''
		},
		function(res) {
			callback && callback(item);
		},
		function(err) {
			console.log(err);
		}
	);
}
// 分享
function onShare(item, shareInfo, callback) {
	if (shareInfo.type == undefined) {
		shareInfo.type = item.type;
	}
	let shareObj = {
		provider: item.provider,
		type: shareInfo.type,
		success: res => {
			callback && callback(item);
			console.log('success:' + JSON.stringify(res));
		},
		fail: err => {
			console.log('分享失败，参数缺失 fail:' + JSON.stringify(err));
		}
	};
	if (shareInfo.shareTitle) {
		shareObj.title = shareInfo.shareTitle;
	} else if (item.provider == 'qq') {
		uni.showToast({
			title: '缺失分享的标题',
			icon: 'none'
		});
		return;
	}
	if (shareInfo.type == 0 || item.provider == 'qq') {
		if (shareInfo.shareUrl) {
			shareObj.href = shareInfo.shareUrl;
		} else {
			uni.showToast({
				title: '缺失分享的地址',
				icon: 'none'
			});
			return;
		}
	}
	if ([0, 1, 3, 4].includes(shareInfo.type)) {
		if (shareInfo.shareContent) {
			shareObj.summary = shareInfo.shareContent;
		} else {
			uni.showToast({
				title: '缺失分享的描述',
				icon: 'none'
			});
			return;
		}
	}
	if ([0, 2, 5].includes(shareInfo.type)) {
		if (shareInfo.shareImg) {
			shareObj.imageUrl = shareInfo.shareImg;
		} else {
			uni.showToast({
				title: '缺失分享的图片',
				icon: 'none'
			});
			return;
		}
	}
	if ([3, 4].includes(shareInfo.type)) {
		if (shareInfo.mediaUrl) {
			shareObj.mediaUrl = shareInfo.mediaUrl;
		} else {
			uni.showToast({
				title: '缺失分享的音视频地址',
				icon: 'none'
			});
			return;
		}
	}
	if (shareInfo.type == 5) {
		if (shareInfo.appId && shareInfo.appPath && shareInfo.appWebUrl) {
			shareObj.miniProgram = {
				id: shareInfo.appId,
				path: shareInfo.appPath,
				webUrl: shareInfo.appWebUrl
			};
			if (shareInfo.appType) {
				shareObj.miniProgram.type = shareInfo.appType;
			}
		} else {
			uni.showToast({
				title: '缺失分享小程序的参数',
				icon: 'none'
			});
			return;
		}
	}

	if (item.scene) {
		shareObj.scene = item.scene;
	}
	uni.share(shareObj);
}
let otherShareList = [
	{
		icon: '/static/share/icon_copy.png',
		text: '复制',
		provider: 'copy',
		onClick: onCopy
	},
	{
		icon: '/static/share/icon_more.png',
		text: '更多',
		provider: 'more',
		onClick: onMore
	}
];
let platformShareList = [];
// 获取服务商支持的分享
uni.getProvider({
	service: 'share',
	success: function(res) {
		if (res.provider.includes('sinaweibo')) {
			platformShareList = [
				{
					icon: '/static/share/icon_weibo.png',
					text: '新浪微博',
					onClick: onShare,
					provider: 'sinaweibo',
					type: 0
				}
			].concat(platformShareList);
		}
		if (res.provider.includes('qq')) {
			platformShareList = [
				{
					icon: '/static/share/icon_qq.png',
					text: 'QQ',
					onClick: onShare,
					provider: 'qq',
					type: 1
				}
			].concat(platformShareList);
		}
		if (res.provider.includes('weixin')) {
			platformShareList = [
				{
					icon: '/static/share/icon_weixin.png',
					text: '微信好友',
					onClick: onShare,
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 0
				},
				{
					icon: '/static/share/icon_pengyouquan.png',
					text: '朋友圈',
					onClick: onShare,
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0
				},
				{
					icon: '/static/share/ic_xiaochengxu.png',
					text: '小程序',
					onClick: onShare,
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5
				}
			].concat(platformShareList);
		}
	}
});
// 根据type类型过滤掉不支持的平台
function platformFilter(data) {
	console.log(data);
	let platformList = [];
	let supportList = [
		['weixin', 'sinaweibo'],
		['weixin', 'sinaweibo', 'qq'],
		['weixin', 'sinaweibo', 'qq'],
		['weixin', 'qq'],
		['weixin', 'sinaweibo'],
		['weixin']
	];
	let currentSupport = [];
	if (data.type >= 0 && data.type <= 5) {
		currentSupport = supportList[data.type];
	}
	console.log('platformShareList', platformShareList);
	platformShareList.forEach(item => {
		if (data.type >= 0 && data.type <= 5) {
			if (currentSupport.includes(item.provider)) {
				if (item.provider == 'weixin') {
					if (item.text == '小程序') {
						if (data.type == 5) {
							platformList.push(item);
						}
					} else if (data.type !== 5) {
						platformList.push(item);
					}
				} else {
					platformList.push(item);
				}
			}
		} else {
			if (item.provider == 'weixin') {
				if (item.text == '小程序') {
					if (data.appId && data.appPath) {
						platformList.push(item);
					}
				} else {
					platformList.push(item);
				}
			} else {
				platformList.push(item);
			}
		}
	});
	return platformList.concat(otherShareList);
}
// 数据处理
function dataFactory(shareInfo = {}) {
	let config = {
		...shareInfo
	};
	config.shareUrl = shareInfo.shareUrl || '';
	config.shareContent = shareInfo.shareContent || '分享的描述';
	config.shareImg = shareInfo.shareImg || '分享的图片';
	return config;
}
export default function(shareInfo, callback) {
	shareInfo = dataFactory(shareInfo);
	// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	let screenWidth = plus.screen.resolutionWidth;
	//以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
	//图标下的按钮文字距离图标5像素，文字大小12像素
	//底部取消按钮高度固定为44px
	//TODO 未处理横屏和pad，这些情况6个图标应该一排即可
	let marginTop = 25, //上间距
		marginLeft = 25, //左间距
		iconWidth = 55, //图标宽宽
		iconHeight = 55, //图标高度
		icontextSpace = 10, //图标与文字间距
		textHeight = 12; //文字大小
	let left1 = (marginLeft / 360) * screenWidth;
	let colNumber = Math.floor(screenWidth / (iconWidth + marginLeft));
	let i =
		(screenWidth - (iconWidth + marginLeft) * colNumber - marginLeft) /
		(colNumber + 1);
	let initMargin = marginLeft + i;
	let itemWidth = iconWidth + initMargin;
	let itemHeight = iconHeight + icontextSpace + textHeight + marginTop;
	let textTop = iconHeight + icontextSpace;
	alphaBg = new plus.nativeObj.View('alphaBg', {
		//先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});
	alphaBg.addEventListener('click', function() {
		//处理遮罩层点击
		alphaBg.close();
		shareMenu.close();
	});
	let shareList = platformFilter(shareInfo);
	shareMenu = new plus.nativeObj.View('shareMenu', {
		//创建底部图标菜单
		bottom: '0px',
		left: '0px',
		height:
			Math.ceil(shareList.length / colNumber) * itemHeight +
			marginTop +
			44 +
			1 +
			'px',
		width: '100%',
		backgroundColor: 'rgb(255,255,255)'
	});
	//绘制底部图标菜单的内容
	shareMenu.draw([
		{
			tag: 'rect', //菜单顶部的分割灰线
			color: '#e7e7e7',
			position: {
				top: '0px',
				height: '1px'
			}
		},
		{
			tag: 'font',
			id: 'sharecancel', //底部取消按钮的文字
			text: '取消分享',
			textStyles: {
				size: '14px'
			},
			position: {
				bottom: '0px',
				height: '44px'
			}
		},
		{
			tag: 'rect', //底部取消按钮的顶部边线
			color: '#e7e7e7',
			position: {
				bottom: '45px',
				height: '1px'
			}
		}
	]);
	shareList.map((v, k) => {
		let time = new Date().getTime();
		let row = Math.floor(k / colNumber);
		let col = k % colNumber;
		let item = [
			{
				src: v.icon,
				id: Math.random() * 1000 + time,
				tag: 'img',
				position: {
					top: row * itemHeight + marginTop,
					left: col * itemWidth + initMargin,
					width: iconWidth,
					height: iconWidth
				}
			},
			{
				text: v.text,
				id: Math.random() * 1000 + time,
				tag: 'font',
				textStyles: {
					size: textHeight
				},
				position: {
					top: row * itemHeight + textTop,
					left: col * itemWidth + initMargin,
					width: iconWidth,
					height: iconWidth
				}
			}
		];
		shareMenu.draw(item);
	});
	shareMenu.addEventListener('click', function(e) {
		//处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
		if (e.screenY > plus.screen.resolutionHeight - 44) {
			//点击了底部取消按钮
			alphaBg.close();
			shareMenu.close();
		} else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
			//屏幕左右边缘5像素及菜单顶部5像素不处理点击
		} else {
			//点击了图标按钮
			let x = e.clientX;
			let y = e.clientY;
			let colIdx = Math.floor(x / itemWidth);
			let rowIdx = Math.floor(y / itemHeight);
			let tapIndex = colIdx + rowIdx * colNumber;
			shareList[tapIndex].onClick(shareList[tapIndex], shareInfo, callback);
		}
	});
	alphaBg.show();
	shareMenu.show();
	return {
		close: function() {
			alphaBg && alphaBg.close();
			alphaBg && shareMenu.close();
		}
	};
}
// #endif
