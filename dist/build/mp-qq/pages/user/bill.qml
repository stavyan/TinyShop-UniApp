<view class="data-v-209045f5"><view class="tab data-v-209045f5" style="{{'top:'+(headerTop)+';'}}"><view data-event-opts="{{[['tap',[['switchType',['valid',1]]]]]}}" class="{{['data-v-209045f5',(typeClass=='valid')?'on':'']}}" bindtap="__e">全部</view><view data-event-opts="{{[['tap',[['switchType',['used',2]]]]]}}" class="{{['data-v-209045f5',(typeClass=='used')?'on':'']}}" bindtap="__e">充值</view><view data-event-opts="{{[['tap',[['switchType',['invalid',3]]]]]}}" class="{{['data-v-209045f5',(typeClass=='invalid')?'on':'']}}" bindtap="__e">消费</view><view class="{{['border data-v-209045f5',typeClass]}}"></view></view><view class="place data-v-209045f5"></view><view class="wrapper data-v-209045f5"><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['checkAddress',['$0'],[[['integralList','',index]]]]]]]}}" class="list b-b data-v-209045f5" bindtap="__e"><view class="wrapper data-v-209045f5"><view class="address-box data-v-209045f5">{{''+item.$orig.remark+''}}</view><view class="u-box data-v-209045f5">{{''+item.f0+''}}</view></view><text class="{{['change-num data-v-209045f5',item.m0>=0?'change-num-add':'change-num-reduce']}}">{{item.f1}}</text></view></block><uni-load-more class="load-more data-v-209045f5" vue-id="1" status="{{loadingType}}" bind:__l="__l"></uni-load-more></view><block wx:if="{{integralList.length===0}}"><empty vue-id="2" info="暂无账单记录" class="data-v-209045f5" bind:__l="__l"></empty></block></view>