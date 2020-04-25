/*
 * websocket 请求路由说明
 * 连接成功后会发送一个 fd 回来，为自己的客户端id，注意保存，后续以这个判断消息是自己发的还是别人发的
 *
 * 公共状态码说明
 * 1006: 意外断开
 * 2000: OK。一切正常
 * 2001: 连接成功
 * 2002: 心跳成功
 * 2003: 排队中
 * 2004: 排队成功
 * 2005: xxx客服为您服务
 * 2006: xxx用户来了
 * 4000: 客户端未响应连接关闭数据，无效的操作参数，等等
 * 4001: 用户验证失败
 * 4002: 正常报错提示
 * 4004: 所请求的资源不存在
 * 4101: 已在别处登录
 * 4102: 用户已离线
 * 4103: 当前接待人数过多
 * 4104: 客服不在线
 * 5000: 内部服务器错误。 这可能是由于内部程序错误引起的。
 *
 */

export default {
	// 登录
	login: 'site.login',

	// 客服列表
	serviceIndex: 'service.index',

	// 连接客服
	queueUpMatching: 'queueUp.matching',

	// 排队查询
	queueUpIndex: 'queueUp.index',

	// 发送消息
	serviceMessage: 'service.message',

	// 主动结束会话
	memberClose: 'member.close',

	// 客服转接[只接收]
	bubbleTransferring: 'bubble.transferring',

	// 被客服结束会话[只接收]
	bubbleClose: 'bubble.close',

	// 当前会话历史消息
	memberConversation: 'member.conversation',

	// 自动回复 发送消息
	ruleMessage: 'rule.message',

	// 心跳
	ping: 'site.ping'
}

