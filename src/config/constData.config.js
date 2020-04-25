export default {
    // 购物车在tab的位置
    cartIndex: 2,

    // 验证码发送间隔
    sendCodeTime: 60,

    // 个人中心-设置中心菜单
    settingList: [
        {icon: 'iconiconfontweixin', url: '/pages/user/coupon/list', title: '去领券中心', color: '#e07472'},
        {icon: 'icondizhi', url: '/pages/user/address/address', title: '地址管理', color: '#5fcda2'},
        {
            icon: 'iconshoucang_xuanzhongzhuangtai',
            url: '/pages/user/collection/collection',
            title: '我的收藏',
            color: '#5fcda2'
        },
        {icon: 'iconshare', url: '', title: '分享', color: '#9789f7'},
        {icon: 'iconshezhi1', url: '/pages/set/set', title: '设置', color: '#e07472'}
    ],

    // 个人中心-我的订单
    orderSectionList: [
        {title: '待付款', icon: 'iconfont icondaifukuan', url: '/pages/order/order?state=0', num: null},
        {title: '待发货', icon: 'iconfont iconshouye', url: '/pages/order/order?state=1', num: null},
        {title: '待收货', icon: 'iconfont iconyishouhuo', url: '/pages/order/order?state=2', num: null},
        {title: '评价', icon: 'iconfont iconpingjia', url: '/pages/order/order?state=3', num: null},
        {title: '退款/售后', icon: 'iconfont iconshouhoutuikuan', url: '/pages/order/refund', num: null}
    ],

    // 个人中心-积分余额
    amountList: [
        {title: '余额', value: 0, url: '/pages/user/account/account'},
        {title: '优惠券', value: 0, url: '/pages/user/coupon/coupon?type=1'},
        {title: '积分', value: 0, url: '/pages/user/account/integral'}
    ],

    // 个人中心-推广中心
    promotionList: [
        {title: '累计佣金', value: 0, url: '/pages/distribution/brokerage/detail'},
        {title: '当前佣金', value: 0, url: '/pages/distribution/brokerage/brokerage'},
        {title: '已提现佣金', value: 0, url: '/pages/distribution/cash/list'}
    ],

    // 订单状态
    orderStatus: [
        {key: 0, value: '待付款'},
        {key: 1, value: '待发货'},
        {key: 2, value: '已发货'},
        {key: 3, value: '已收货'},
        {key: 4, value: '已完成'},
        {key: -1, value: '退货申请'},
        {key: -2, value: '退款中'},
        {key: -3, value: '退款完成'},
        {key: -4, value: '已关闭'},
        {key: -5, value: '撤销申请'}
    ],

    // 订单退货状态
    refundStatus: [
        {key: 1, value: '退款申请'},
        {key: 2, value: '等待退货'},
        {key: 3, value: '等待确认收货'},
        {key: 4, value: '等待确认退款'},
        {key: 5, value: '已退款'},
        {key: -1, value: '退款已拒绝'},
        {key: -2, value: '退款已关闭'},
        {key: -3, value: '退款不通过'}
    ],

    // 订单评价状态
    evaluateStatus: [
        {key: 0, value: '未评价'},
        {key: 1, value: '已评价'},
        {key: 2, value: '已追评'}
    ],

    // 订单状态导航
    orderNavList: [
        {state: undefined, text: '全部'},
        {state: 0, text: '待付款'},
        {state: 1, text: '待发货'},
        {state: 2, text: '待收货'},
        {state: 3, text: '评价'}
    ]
}
