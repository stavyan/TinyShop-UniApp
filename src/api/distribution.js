/**
 *@des 分销商相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2020/02/20 17:20:21
 */

// 个人信息
const distributionMemberIndex = '/tiny-distribution/v1/member/index';

// 提现账号
// 提现账号列表
const bankAccountIndex = '/tiny-distribution/v1/bank-account/index';
// 删除提现账号
const bankAccountDelete = '/tiny-distribution/v1/bank-account/delete';
// 更新提现账号
const bankAccountUpdate = '/tiny-distribution/v1/bank-account/update';
// 新增提现账号
const bankAccountCreate = '/tiny-distribution/v1/bank-account/create';
// 提现账号详情
const bankAccountView = '/tiny-distribution/v1/bank-account/view';
// 提现配置
const withdrawConfig = '/tiny-distribution/v1/promoter-commission-withdraw/config';
// 提现申请
const withdrawCreate = '/tiny-distribution/v1/promoter-commission-withdraw/create';
// 提现申请列表
const withdrawList = '/tiny-distribution/v1/promoter-commission-withdraw/index';

// 分销商
// 申请进度
const promoterApplySchedule = '/tiny-distribution/v1/promoter-apply/schedule';
// 申请记录
const promoterApplyIndex= '/tiny-distribution/v1/promoter-apply/index';
// 申请配置
const promoterLevelConfig = '/tiny-distribution/v1/promoter-level/config';
// 申请
const promoterApplyCreate = '/tiny-distribution/v1/promoter-apply/create';

// 区域代理
// 申请进度
const regionalAgentApplySchedule = '/tiny-distribution/v1/regional-agent-apply/index';
// 申请配置
const regionalLevelConfig = '/tiny-distribution/v1/regional-agent/config';
// 申请
const regionalApplyCreate = '/tiny-distribution/v1/regional-agent-apply/create';

// 级别列表
const promoterLevelIndex = '/tiny-distribution/v1/promoter-level/index';

// 推广二维码
const memberQr = '/tiny-distribution/v1/member/qr';

// 上级分销商
const distributionMemberParent = '/tiny-distribution/v1/member/parent';
// 下级分销商
const distributionMemberChild = '/tiny-distribution/v1/member/child';

// 自推订单
const promoterRecordIndex = '/tiny-distribution/v1/promoter-record/index';
// 自推订单
const promoterRecordSelf = '/tiny-distribution/v1/promoter-record/self';
// 自推订单统计
const promoterRecordSelfStat = '/tiny-distribution/v1/promoter-record/self-stat';
// 团队订单
const promoterRecordTeam = '/tiny-distribution/v1/promoter-record/team';
// 团队订单统计
const promoterRecordTeamStat = '/tiny-distribution/v1/promoter-record/team-stat';

export {
    distributionMemberIndex,
    bankAccountIndex,
    bankAccountDelete,
    bankAccountUpdate,
    bankAccountCreate,
    bankAccountView,
    withdrawConfig,
    withdrawCreate,
    withdrawList,
    promoterApplyIndex,
    promoterLevelConfig,
    promoterApplyCreate,
    promoterLevelIndex,
    promoterApplySchedule,
    memberQr,
    distributionMemberParent,
    distributionMemberChild,
    promoterRecordIndex,
    promoterRecordSelf,
    promoterRecordSelfStat,
    promoterRecordTeam,
    promoterRecordTeamStat,
    regionalAgentApplySchedule,
    regionalLevelConfig,
    regionalApplyCreate
};
