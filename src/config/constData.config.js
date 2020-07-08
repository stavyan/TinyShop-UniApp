export default {
	// app应用名称
	appName: 'RF商城',

	// 购物车在tab的位置
	cartIndex: 3,

	// 消息在tab的位置
	notifyIndex: 2,

	// 验证码发送间隔
	sendCodeTime: 60,

	// 金额符号
	moneySymbol: '￥',

	// 单商品替代词
	singleSkuText: '基础款',

  // 顶部导航菜单
  menuTop: [
				{
					icon: 'iconxiaoxi1',
					text: '消息',
          urlType: 'tab',
          url: '/pages/notify/notify'
				},
				{
					icon: 'iconzhuyedefuben',
					text: '首页',
          urlType: 'tab',
          url: '/pages/index/index'
				},
				{
					icon: 'iconwode-',
					text: '我的',
          urlType: 'tab',
          url: '/pages/profile/profile'
				},
				{
					icon: 'icongouwuche2',
					text: '购物车',
          urlType: 'tab',
          url: '/pages/cart/cart'
				},
				{
					icon: 'iconbianji',
					text: '我要反馈',
					url: '/pages/set/feedback/feedback'
				},
				{
					icon: 'iconquanbudingdan',
					text: '我的订单',
					url: '/pages/order/order?state=-1'
				}
			],

	// 个人中心-设置中心菜单 e07472 ff4757 ff6b81
	settingList: [
		{ icon: 'icongonggao', url: '/pages/index/notice/notice', title: '商城公告', color: '#ff6b81' },
		{ icon: 'iconyouhuiquan-copy', url: '/pages/user/coupon/list', title: '领券中心', color: '#ff6b81' },
		{ icon: 'icondizhi1', url: '/pages/user/address/address', title: '地址管理', color: '#ff6b81' },
		{ icon: 'iconshoucang3', url: '/pages/user/collection/collection', title: '我的收藏', color: '#ff6b81' },
		{ icon: 'iconfenxiang', url: '', title: '分享', color: '#ff6b81' },
		{ icon: 'iconzhibo', url: '/pages/marketing/live/list', title: '直播', color: '#ff6b81' },
		{ icon: 'iconshezhi3', url: '/pages/set/set', title: '设置', color: '#ff6b81' }
	],

	// 设置-设置中心
	setList: [
		{
			title: '个人资料',
			url: '/pages/user/userinfo/userinfo',
			content: ''
		},
		{
			title: '修改密码',
			url: '/pages/public/password?type=1',
			content: ''
		},
		{
			title: '授权管理',
			url: '/pages/set/authorization/list',
			content: ''
		},
		{
			title: '发票管理',
			url: '/pages/set/invoice/invoice',
			content: '',
			class: 'mT'
		},
		{ title: '开票历史', url: '/pages/set/invoice/list', content: '' },
		{ title: '清除缓存', url: 'clearCache', content: '' },
		{
			title: '关于商城',
			url: '/pages/set/about/about',
			content: '',
			class: 'mT'
		},
		{
			title: '站点帮助',
			url: '/pages/set/helper/index',
			content: ''
		},
		/*  #ifdef APP-PLUS  */
		{ title: '检查更新', url: 'versionUpgrade', content: '' },
		/*  #endif  */
		{ title: '意见反馈', url: '/pages/set/feedback/list', content: '' }
	],

	// 个人中心-我的订单
	orderSectionList: [
		{
			title: '待付款',
			icon: 'iconfont icondaifukuan',
			url: '/pages/order/order?state=0',
			num: null
		},
		{
			title: '待发货',
			icon: 'iconfont iconshouye',
			url: '/pages/order/order?state=1',
			num: null
		},
		{
			title: '待收货',
			icon: 'iconfont iconyishouhuo',
			url: '/pages/order/order?state=2',
			num: null
		},
		{
			title: '评价',
			icon: 'iconfont iconpingjia',
			url: '/pages/order/order?state=3',
			num: null
		},
		{
			title: '退款/售后',
			icon: 'iconfont iconshouhoutuikuan',
			url: '/pages/order/refund',
			num: null
		}
	],

	// 个人中心-积分余额
	amountList: [
		{ title: '余额', value: 0, url: '/pages/user/account/account' },
		{ title: '优惠券', value: 0, url: '/pages/user/coupon/coupon?type=1' },
		{ title: '积分', value: 0, url: '/pages/user/account/integral' }
	],

	// 订单状态
	orderStatus: [
		{ key: 0, value: '待付款' },
		{ key: 1, value: '待发货' },
		{ key: 2, value: '已发货' },
		{ key: 3, value: '已收货' },
		{ key: 4, value: '已完成' },
		{ key: -1, value: '退货申请' },
		{ key: -2, value: '退款中' },
		{ key: -3, value: '退款完成' },
		{ key: -4, value: '已关闭' },
		{ key: -5, value: '撤销申请' },
		{ key: 101, value: '待成团' },
		{ key: 201, value: '备货中' },
		{ key: 202, value: '待付尾款' }
	],

	// 订单退货状态
	refundStatus: [
		{ key: 1, value: '退款申请' },
		{ key: 2, value: '等待退货' },
		{ key: 3, value: '等待确认收货' },
		{ key: 4, value: '等待确认退款' },
		{ key: 5, value: '已退款' },
		{ key: -1, value: '退款已拒绝' },
		{ key: -2, value: '退款已关闭' },
		{ key: -3, value: '退款不通过' }
	],

	// 订单评价状态
	evaluateStatus: [
		{ key: 0, value: '未评价' },
		{ key: 1, value: '已评价' },
		{ key: 2, value: '已追评' }
	],

	// 订单状态导航
	orderNavList: [
		{ state: undefined, text: '全部' },
		{ state: 0, text: '待付款' },
		{ state: 1, text: '待发货' },
		{ state: 2, text: '待收货' },
		{ state: 3, text: '评价' }
	],

	// 直播记录列表
	liveTypeList: [
		{
			state: 101,
			text: '进行中'
		},
		{
			state: 102,
			text: '未开始'
		},
		{
			state: 103,
			text: '已结束'
		}
	],

	// 收货地址/自提点
	addressTypeList: [
		{
			state: 1,
			text: '选择物流配送'
		},
		{
			state: 2,
			text: '选择自提配送'
		}
	],

	// 热门推荐
	hotRecommendList: [
		{
			url: '/pages/marketing/bargain/list',
			icon: '/static/kj.png',
			title: '我要砍价',
			desc: '淘到理想好物'
		},
		{
			url: '/pages/marketing/group/list',
			icon: '/static/tg.png',
			title: '团购专区',
			desc: '发现品质好物'
		},
		{
			url: '/pages/marketing/discount/list',
			icon: '/static/zk.png',
			title: '限时折扣',
			desc: '抢到就是赚到'
		}
	],

  // 消息类型 1:公告;2:提醒;3:私信
  notifyTypeList: [
    { type: 0, content: '' },
    { type: 1, content: '公告' },
    { type: 2, content: '提醒' },
    { type: 3, content: '私信' }
  ],

	// 主题列表
	themeList: [
				{
					title: '官方',
					name: 'rf',
					color: '#fa436a',
					tabList: [
						'/static/tab-home-rf.png',
						'/static/tab-cate-rf.png',
						'/static/tab-notify-rf.png',
						'/static/tab-cart-rf.png',
						'/static/tab-my-rf.png'
					]
				},
				{
					title: '嫣红',
					name: 'red',
					color: '#e54d42',
					tabList: [
						'/static/tab-home-red.png',
						'/static/tab-cate-red.png',
						'/static/tab-notify-red.png',
						'/static/tab-cart-red.png',
						'/static/tab-my-red.png'
					]
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d',
					tabList: [
						'/static/tab-home-orange.png',
						'/static/tab-cate-orange.png',
						'/static/tab-notify-orange.png',
						'/static/tab-cart-orange.png',
						'/static/tab-my-orange.png'
					]
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08',
					tabList: [
						'/static/tab-home-yellow.png',
						'/static/tab-cate-yellow.png',
						'/static/tab-notify-yellow.png',
						'/static/tab-cart-yellow.png',
						'/static/tab-my-yellow.png'
					]
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f',
					tabList: [
						'/static/tab-home-olive.png',
						'/static/tab-cate-olive.png',
						'/static/tab-notify-olive.png',
						'/static/tab-cart-olive.png',
						'/static/tab-my-olive.png'
					]
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a',
					tabList: [
						'/static/tab-home-green.png',
						'/static/tab-cate-green.png',
						'/static/tab-notify-green.png',
						'/static/tab-cart-green.png',
						'/static/tab-my-green.png'
					]
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4',
					tabList: [
						'/static/tab-home-cyan.png',
						'/static/tab-cate-cyan.png',
						'/static/tab-notify-cyan.png',
						'/static/tab-cart-cyan.png',
						'/static/tab-my-cyan.png'
					]
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff',
					tabList: [
						'/static/tab-home-blue.png',
						'/static/tab-cate-blue.png',
						'/static/tab-notify-blue.png',
						'/static/tab-cart-blue.png',
						'/static/tab-my-blue.png'
					]
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6',
					tabList: [
						'/static/tab-home-purple.png',
						'/static/tab-cate-purple.png',
						'/static/tab-notify-purple.png',
						'/static/tab-cart-purple.png',
						'/static/tab-my-purple.png'
					]
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0',
					tabList: [
						'/static/tab-home-mauve.png',
						'/static/tab-cate-mauve.png',
						'/static/tab-notify-mauve.png',
						'/static/tab-cart-mauve.png',
						'/static/tab-my-mauve.png'
					]
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997',
					tabList: [
						'/static/tab-home-pink.png',
						'/static/tab-cate-pink.png',
						'/static/tab-notify-pink.png',
						'/static/tab-cart-pink.png',
						'/static/tab-my-pink.png'
					]
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f',
					tabList: [
						'/static/tab-home-brown.png',
						'/static/tab-cate-brown.png',
						'/static/tab-notify-brown.png',
						'/static/tab-cart-brown.png',
						'/static/tab-my-brown.png'
					]
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3',
					tabList: [
						'/static/tab-home-grey.png',
						'/static/tab-cate-grey.png',
						'/static/tab-notify-grey.png',
						'/static/tab-cart-grey.png',
						'/static/tab-my-grey.png'
					]
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa',
					tabList: [
						'/static/tab-home-gray.png',
						'/static/tab-cate-gray.png',
						'/static/tab-notify-gray.png',
						'/static/tab-cart-gray.png',
						'/static/tab-my-gray.png'
					]
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333',
					tabList: [
						'/static/tab-home-black.png',
						'/static/tab-cate-black.png',
						'/static/tab-notify-black.png',
						'/static/tab-cart-black.png',
						'/static/tab-my-black.png'
					]
				}
			]
};
