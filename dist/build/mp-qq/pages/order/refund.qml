<view class="content"><scroll-view class="list-scroll-content" scroll-y data-event-opts="{{[['scrolltolower',[['getMoreOrderList',['$event']]]]]}}" bindscrolltolower="__e"><block wx:if="{{orderList.length===0}}"><empty vue-id="1" info="快去商城逛逛吧" bind:__l="__l"></empty></block><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="order-item"><view class="i-top b-b"><text class="time">{{"订单号："+item.$orig.order_sn}}</text><block wx:if="{{item.m0!==0}}"><text class="state">{{item.f0}}</text></block><block wx:else><view class="example-body"><rf-count-down vue-id="{{'2-'+index}}" show-day="{{false}}" second="{{item.m1}}" color="#FFFFFF" background-color="#fa436a" border-color="#fa436a" data-event-opts="{{[['^timeup',[['timeUp',['$0'],[[['orderList','',index]]]]]]]}}" bind:timeup="__e" bind:__l="__l"></rf-count-down></view></block></view><block wx:if="{{item.$orig&&item.$orig.product&&item.$orig.product.length>1}}"><scroll-view class="goods-box" scroll-x data-event-opts="{{[['tap',[['toOrderDetail',['$0'],[[['orderList','',index,'id']]]]]]]}}" bindtap="__e"><block wx:for="{{item.$orig.product}}" wx:for-item="goodsItem" wx:for-index="goodsIndex" wx:key="goodsIndex"><view class="goods-item"><image class="goods-img" src="{{goodsItem.product_picture}}" mode="aspectFill"></image><text class="goods-title in2line">{{goodsItem.product_name}}</text></view></block></scroll-view></block><block wx:for="{{item.$orig.product}}" wx:for-item="goodsItem" wx:for-index="goodsIndex" wx:key="goodsIndex"><block wx:if="{{item.$orig.product&&item.$orig.product.length===1}}"><view data-event-opts="{{[['tap',[['toOrderDetail',['$0'],[[['orderList','',index,'id']]]]]]]}}" class="goods-box-single" bindtap="__e"><image class="goods-img" src="{{goodsItem.product_picture}}" mode="aspectFill"></image><view class="right"><text class="title in2line">{{goodsItem.product_name}}</text><text class="attr-box">{{goodsItem.sku_name||'基础版'}}</text><text class="price">{{goodsItem.price+"  x "+goodsItem.num}}</text></view></view></block></block><view class="price-box">共<text class="num">{{item.$orig.product_count}}</text>件商品 实付款<text class="price">{{item.$orig.pay_money}}</text></view><view class="action-box b-t"><button data-event-opts="{{[['tap',[['handleOrderOperation',['$0','detail'],[[['orderList','',index]]]]]]]}}" class="action-btn" bindtap="__e">订单详情</button><button data-event-opts="{{[['tap',[['handleOrderOperation',['$0','refund',1],[[['orderList','',index]]]]]]]}}" hidden="{{!(item.$orig.order_status==1)}}" class="action-btn recom" bindtap="__e">申请退款</button><button data-event-opts="{{[['tap',[['handleOrderOperation',['$0','shipping'],[[['orderList','',index]]]]]]]}}" hidden="{{!(item.$orig.order_status==4||item.$orig.order_status==2)}}" class="action-btn" bindtap="__e">查看物流</button><button data-event-opts="{{[['tap',[['handleOrderOperation',['$0','refund',2],[[['orderList','',index]]]]]]]}}" hidden="{{!(item.$orig.order_status==2)}}" class="action-btn recom" bindtap="__e">申请退货</button><button data-event-opts="{{[['tap',[['handleOrderOperation',['$0','evaluation'],[[['orderList','',index]]]]]]]}}" hidden="{{!(item.$orig.order_status==4)}}" class="action-btn recom" bindtap="__e">我要评价</button></view></view></block><rf-load-more vue-id="3" status="{{loadingType}}" bind:__l="__l"></rf-load-more></scroll-view></view>