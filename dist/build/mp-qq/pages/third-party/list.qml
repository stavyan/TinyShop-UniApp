<view class="content b-t"><block wx:if="{{thirdPartyAuthList.length!==0}}"><view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="list b-b"><view class="wrapper"><view class="address-box"><text class="address">{{item.f0}}</text></view><view class="u-box"><text class="name">{{"授权时间: "+item.f1}}</text></view></view><text data-event-opts="{{[['tap',[['unBind',['$0'],[[['thirdPartyAuthList','',index,'id']]]]]]]}}" class="unbind" catchtap="__e">解除绑定</text></view></block><uni-load-more vue-id="1" status="{{loadingType}}" bind:__l="__l"></uni-load-more></view></block><block wx:else><empty vue-id="2" info="您暂未授权第三方平台~" bind:__l="__l"></empty></block></view>