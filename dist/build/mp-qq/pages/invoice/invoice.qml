<view class="content b-t"><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['checkAddress',['$0'],[[['invoiceList','',index]]]]]]]}}" class="list b-b" bindtap="__e"><view data-event-opts="{{[['touchstart',[['goTouchStart',['$0'],[[['invoiceList','',index,'id']]]]]],['touchmove',[['goTouchMove',['$event']]]],['touchend',[['goTouchEnd',['$event']]]]]}}" class="wrapper" bindtouchstart="__e" bindtouchmove="__e" bindtouchend="__e"><view class="address-box"><block wx:if="{{item.m0===1}}"><text class="tag">默认</text></block><text class="address">{{item.$orig.title}}</text></view><view class="u-box"><text class="name">{{item.m1===1?'公司':'个人'}}</text><text class="mobile">{{item.$orig.duty_paragraph||'个人发票无税号'}}</text></view></view><view data-event-opts="{{[['tap',[['addInvoice',['edit','$0'],[[['invoiceList','',index]]]]]]]}}" class="iconfont iconbianji _i" catchtap="__e"></view></view></block><block wx:if="{{invoiceList.length>0}}"><text class="tips">提示：长按可删除当前发票。最多只能存在一个默认发票。</text></block><block wx:else><empty vue-id="1" info="暂无收货地址，请添加地址" bind:__l="__l"></empty></block><block wx:if="{{invoiceList.length>0}}"><rf-load-more vue-id="2" status="{{loadingType}}" bind:__l="__l"></rf-load-more></block><button data-event-opts="{{[['tap',[['addInvoice',['add']]]]]}}" class="add-btn" bindtap="__e">新增发票</button></view>