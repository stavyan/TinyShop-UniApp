<view class="content" style="{{'padding-top:'+(contentTop)+';'}}"><view hidden="{{!(isShowNavBar)}}" class="navbar" style="{{'position:'+(headerPosition)+';'+('top:'+('88upx')+';')}}"><view data-event-opts="{{[['tap',[['tabClick',[0]]]]]}}" class="{{['nav-item',(filterIndex===0)?'current':'']}}" bindtap="__e">综合排序</view><view data-event-opts="{{[['tap',[['tabClick',[1]]]]]}}" class="{{['nav-item',(filterIndex===1)?'current':'']}}" bindtap="__e"><text>销量</text><view class="p-box"><text class="{{['yticon icon-shang',(salesOrder===1&&filterIndex===1)?'active':'']}}"></text><text class="{{['yticon icon-shang xia',(salesOrder===2&&filterIndex===1)?'active':'']}}"></text></view></view><view data-event-opts="{{[['tap',[['tabClick',[2]]]]]}}" class="{{['nav-item',(filterIndex===2)?'current':'']}}" bindtap="__e">浏览量</view><view data-event-opts="{{[['tap',[['tabClick',[3]]]]]}}" class="{{['nav-item',(filterIndex===3)?'current':'']}}" bindtap="__e">收藏</view><view data-event-opts="{{[['tap',[['tabClick',[4]]]]]}}" class="{{['nav-item',(filterIndex===4)?'current':'']}}" bindtap="__e"><text>价格</text><view class="p-box"><text class="{{['yticon icon-shang',(priceOrder===1&&filterIndex===4)?'active':'']}}"></text><text class="{{['yticon icon-shang xia',(priceOrder===2&&filterIndex===4)?'active':'']}}"></text></view></view><text data-event-opts="{{[['tap',[['toggleCateMask',['show']]]]]}}" class="cate-item yticon icon-fenlei1" bindtap="__e"></text></view><view class="goods-list"><block wx:for="{{goodsList}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]}}" class="goods-item" bindtap="__e"><view class="image-wrapper"><image src="{{item.picture}}" mode="aspectFill"></image></view><text class="title clamp in2line">{{item.name}}</text><view class="price-box"><text class="price">{{item.price+''}}<block wx:if="{{item.market_price>item.price}}"><text class="m-price">{{"¥ "+item.market_price}}</text></block></text><text>{{item.sales+"人付款"}}</text></view></view></block></view><uni-load-more vue-id="1" status="{{loadingType}}" bind:__l="__l"></uni-load-more><block wx:if="{{goodsList.length===0}}"><empty vue-id="2" info="赶紧通知老板进货" bind:__l="__l"></empty></block><view data-event-opts="{{[['tap',[['toggleCateMask',['$event']]]]]}}" class="{{['cate-mask',cateMaskState===0?'none':cateMaskState===1?'show':'']}}" bindtap="__e"><view data-event-opts="{{[['tap',[['stopPrevent',['$event']]]],['touchmove',[['stopPrevent',['$event']]]]]}}" class="cate-content" catchtap="__e" catchtouchmove="__e"><scroll-view class="cate-list" scroll-y><block wx:for="{{cateList}}" wx:for-item="item" wx:for-index="__i0__" wx:key="id"><view><view data-event-opts="{{[['tap',[['changeCate',['$0'],[[['cateList','id',item.id,'id']]]]]]]}}" class="cate-item one" catchtap="__e">{{item.title}}</view><block wx:for="{{item.child}}" wx:for-item="sItem" wx:for-index="__i1__" wx:key="id"><view data-event-opts="{{[['tap',[['changeCate',['$0'],[[['cateList','id',item.id],['child','id',sItem.id,'id']]]]]]]}}" class="{{['cate-item two',(sItem.id==cateId)?'active':'']}}" catchtap="__e">{{''+sItem.title+''}}<block wx:for="{{sItem.child}}" wx:for-item="tItem" wx:for-index="__i2__" wx:key="id"><view data-event-opts="{{[['tap',[['changeCate',['$0'],[[['cateList','id',item.id],['child','id',sItem.id],['child','id',tItem.id,'id']]]]]]]}}" class="{{['cate-item three',(tItem.id==cateId)?'active':'']}}" catchtap="__e">{{''+tItem.title+''}}</view></block></view></block></view></block></scroll-view></view></view></view>