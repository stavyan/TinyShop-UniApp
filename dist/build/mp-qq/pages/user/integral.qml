<view class="integral data-v-fd6b3d16"><view class="header data-v-fd6b3d16"><view class="title data-v-fd6b3d16">当前积分</view><text class="num data-v-fd6b3d16">{{''+(userInfo&&userInfo.account&&userInfo.account.user_integral||'0')+''}}</text><view class="line data-v-fd6b3d16"></view><view class="nav data-v-fd6b3d16"><view class="item data-v-fd6b3d16"><text class="num data-v-fd6b3d16">{{''+(userInfo&&userInfo.account&&userInfo.account.accumulate_integral||'0')+''}}</text><text class="title data-v-fd6b3d16">累计积分</text></view><view class="item _div data-v-fd6b3d16"><text class="num data-v-fd6b3d16">{{''+(-(userInfo&&userInfo.account&&userInfo.account.consume_integral)||'0')+''}}</text><text class="title data-v-fd6b3d16">累计消费</text></view><view class="item _div data-v-fd6b3d16"><text class="num data-v-fd6b3d16">{{''+(userInfo&&userInfo.frozen_integral&&userInfo.account.frozen_integral||'0')+''}}</text><text class="title data-v-fd6b3d16">冻结积分</text></view></view><view class="tab _div data-v-fd6b3d16"><block wx:for="{{navList}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['nav',[index]]]]]}}" class="{{['item _div data-v-fd6b3d16',current===index?'on':'']}}" bindtap="__e">{{''+item.name+''}}</view></block></view></view><view class="wrapper data-v-fd6b3d16"><view class="list1 data-v-fd6b3d16" hidden="{{current!==0}}"><view class="tip acea-row row-middle data-v-fd6b3d16"><label class="iconfont icon-shuoming _span data-v-fd6b3d16"></label>提示：积分数值的高低会直接影响您的会员等级</view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="list b-b data-v-fd6b3d16"><view class="wrapper data-v-fd6b3d16"><view class="address-box data-v-fd6b3d16">{{''+item.$orig.remark+''}}</view><view class="u-box data-v-fd6b3d16">{{''+item.f0+''}}</view></view><text class="{{['change-num data-v-fd6b3d16',item.m0>=0?'change-num-add':'change-num-reduce']}}">{{item.f1}}</text></view></block><uni-load-more class="load-more data-v-fd6b3d16" vue-id="1" status="{{loadingType}}" bind:__l="__l"></uni-load-more></view><view class="list2 data-v-fd6b3d16" hidden="{{current!==1}}"><view class="item data-v-fd6b3d16"><view class="pictrue data-v-fd6b3d16"><image src="/static/score.png" mode="aspectFill" class="data-v-fd6b3d16"></image></view><text class="name data-v-fd6b3d16">购买商品可获得积分奖励</text><view data-event-opts="{{[['tap',[['toCategory',['$event']]]]]}}" class="earn data-v-fd6b3d16" bindtap="__e">赚积分</view></view></view></view></view>