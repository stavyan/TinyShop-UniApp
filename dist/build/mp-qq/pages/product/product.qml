<view class="container"><block wx:if="{{isShowProduct}}"><view><view class="carousel"><swiper indicator-dots circular="true" duration="400"><block wx:for="{{productDetail.covers}}" wx:for-item="item" wx:for-index="index" wx:key="index"><swiper-item class="swiper-item"><view class="image-wrapper"><image class="loaded" src="{{item}}" mode="aspectFill"></image></view></swiper-item></block></swiper></view><view class="introduce-section"><text class="title">{{productDetail.name}}</text><text class="sketch">{{productDetail.sketch}}</text><view class="price-box"><text class="price-tip">¥</text><text class="price">{{productDetail.minSkuPrice}}</text><text hidden="{{!(productDetail.price<productDetail.minSkuPrice)}}" class="m-price">{{productDetail.price}}</text></view><view class="bot-row"><text>{{"销量: "+productDetail.sales}}</text><text>{{"收藏量: "+productDetail.collect_num}}</text><text>{{"浏览量: "+productDetail.view}}</text></view><view class="bot-row"><text>{{"评分: "+(productDetail.match_point||0)}}</text><text>{{"评价量: "+productDetail.comment_num}}</text><text>{{"分享量: "+productDetail.transmit_num}}</text></view></view><view class="share-section"><view class="share-icon"><text class="yticon icon-xingxing"></text>返</view><text class="tit" open-type="contact">分享该商品给你的朋友们</text><text class="yticon icon-bangzhu1"></text><button class="share-btn" open-type="share">立即分享<text class="yticon icon-you"></text></button></view><view class="c-list"><block wx:if="{{productDetail.address_name}}"><view class="c-row b-b"><text class="tit">发货地址</text><view class="con-list">{{''+productDetail.address_name+''}}</view></view></block><view data-event-opts="{{[['tap',[['toggleSpec',['$event']]]]]}}" class="c-row b-b" bindtap="__e"><text class="tit">购买类型</text><view class="con"><block wx:for="{{specSelected}}" wx:for-item="sItem" wx:for-index="sIndex" wx:key="sIndex"><text class="selected-text">{{''+sItem.title+''}}</text></block><text hidden="{{!(specSelected.length>0)}}">{{'* '+cartCount}}</text><text hidden="{{!(productDetail.base_attribute_format&&productDetail.base_attribute_format.length===0)}}" class="selected-text">{{'基础款 * '+cartCount+''}}</text></view><text class="yticon icon-you"></text></view><view class="c-row b-b"><text class="tit">优惠券</text><text data-event-opts="{{[['tap',[['toggleMask',['show']]]]]}}" class="con t-r red" bindtap="__e">领取优惠券</text><text class="yticon icon-you"></text></view><view class="c-row b-b"><text class="tit">限购说明</text><view class="con-list"><text hidden="{{!(productDetail.point_exchange_type)}}">{{$root.f0}}</text></view></view><view class="c-row b-b"><text class="tit">积分活动</text><view class="con-list"><text hidden="{{!(productDetail.point_exchange_type)}}">{{"积分兑换类型: "+$root.f1+''}}</text><text>{{"积分赠送类型: "+$root.f2+''}}</text><text>{{"最少可获得: "+$root.f3+''}}</text><text hidden="{{!(productDetail.point_exchange!=0)}}">{{"兑换所需积分: "+productDetail.point_exchange+''}}</text><text hidden="{{!(productDetail.max_use_point!=0)}}">{{"最大可使用积分: "+productDetail.max_use_point+''}}</text><text data-event-opts="{{[['tap',[['addCart',['buy']]]]]}}" hidden="{{!(productDetail.point_exchange_type==3)}}" class="buy-now" bindtap="__e">积分兑换 >></text></view></view><view data-event-opts="{{[['tap',[['showService',['$event']]]]]}}" class="c-row b-b" bindtap="__e"><text class="tit">服务</text><block wx:if="{{productDetail.tags&&productDetail.tags.length>=1}}"><view class="con-list"><text>{{productDetail.tags[0]+'...'}}</text></view></block><block wx:else><view class="con-list">暂无服务</view></block><text class="yticon icon-you"></text></view><view data-event-opts="{{[['tap',[['showLadderPreferential',['$event']]]]]}}" class="c-row b-b" bindtap="__e"><text class="tit">阶梯优惠</text><block wx:if="{{productDetail.ladderPreferential&&productDetail.ladderPreferential.length>0}}"><view class="con-list"><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index"><text>{{'满'+item.$orig.quantity+'件'}}<block wx:if="{{item.m0===1}}"><text>{{"每件减"+item.$orig.price+"元"}}</text></block><block wx:if="{{item.m1===2}}"><text>{{"每件"+item.m2+"折"}}</text></block></text></block></view></block><block wx:else><view class="con-list">暂无服务</view></block><text class="yticon icon-you"></text></view><block wx:if="{{productDetail.attributeValue}}"><view data-event-opts="{{[['tap',[['showAttributeValue',['$event']]]]]}}" class="c-row b-b" bindtap="__e"><text class="tit">参数</text><block wx:if="{{productDetail.attributeValue&&productDetail.attributeValue.length>=1}}"><view class="con-list"><text>{{''+((productDetail.attributeValue&&productDetail.attributeValue[0].title)+': '+(productDetail.attributeValue&&productDetail.attributeValue[0].value))+' ...'}}</text></view></block><block wx:else><view class="con-list">暂无商品基本信息</view></block><text class="yticon icon-you"></text></view></block></view><view data-event-opts="{{[['tap',[['toEvaluateList',['$event']]]]]}}" class="eva-section" bindtap="__e"><view class="e-header"><text class="tit">评价</text><text>{{"("+productDetail.comment_num+")"}}</text><block wx:if="{{productDetail.match_ratio}}"><text class="tip">{{"好评率 "+productDetail.match_ratio+"%"}}</text></block><block wx:else><text class="tip">暂无评价信息</text></block><text class="yticon icon-you"></text></view><view hidden="{{!(productDetail.evaluate&&productDetail.evaluate.length>0)}}" class="eva-box"><image class="portrait" src="{{productDetail.evaluate&&productDetail.evaluate[0]&&productDetail.evaluate[0].member_head_portrait||'/static/missing-face.png'}}" mode="aspectFill"></image><view class="right"><text class="name">{{productDetail.evaluate&&productDetail.evaluate[0]&&productDetail.evaluate[0].member_nickname||'匿名用户'}}</text><text class="con in2line">{{productDetail.evaluate&&productDetail.evaluate[0]&&productDetail.evaluate[0].content||'这个人很懒，什么都没留下~'}}</text><view class="bot"><text class="attr">{{"购买类型："+(productDetail.evaluate&&productDetail.evaluate[0]&&productDetail.evaluate[0].sku_name)}}</text><text class="time">{{$root.f4}}</text></view></view></view></view><view class="detail-desc"><view class="d-header"><text>商品详情</text></view><rich-text nodes="{{$root.f5}}"></rich-text></view><view class="page-bottom"><navigator class="p-b-btn" url="/pages/index/index" open-type="switchTab"><text class="yticon icon-xiatubiao--copy"></text><text>首页</text></navigator><navigator class="p-b-btn" url="/pages/cart/cart" open-type="switchTab"><text class="yticon icon-gouwuche"></text><text>购物车</text></navigator><view data-event-opts="{{[['tap',[['toFavorite',['$event']]]]]}}" class="{{['p-b-btn',(favorite)?'active':'']}}" bindtap="__e"><text class="yticon icon-shoucang"></text><text>收藏</text></view><view class="action-btn-group"><button class=" action-btn no-border buy-now-btn" type="primary" data-event-opts="{{[['tap',[['addCart',['buy']]]]]}}" bindtap="__e">立即购买</button><button class=" action-btn no-border add-cart-btn" type="primary" disabled="{{productDetail.point_exchange_type==2||productDetail.point_exchange_type==4}}" data-event-opts="{{[['tap',[['addCart',['cart']]]]]}}" bindtap="__e">加入购物车</button></view></view><view data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="{{['popup service',serviceClass]}}" bindtap="__e"><view class="mask"></view><view class="layer layer-service"><view class="content"><block wx:for="{{productDetail.tags}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="row"><view class="title">{{item}}</view><view class="description">{{"此商品承诺"+item}}</view></view></block></view><button data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="btn" bindtap="__e">完成</button></view></view><view data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="{{['popup service',ladderPreferentialClass]}}" bindtap="__e"><view class="mask"></view><view class="layer layer-service"><view class="content"><block wx:for="{{$root.l1}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="row"><view class="title">{{"满"+item.$orig.quantity+'件'}}<block wx:if="{{item.m3===1}}"><text>{{"每件减"+item.$orig.price+"元"}}</text></block><block wx:if="{{item.m4===2}}"><text>{{"每件"+item.m5+"折"}}</text></block></view></view></block></view><button data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="btn" bindtap="__e">完成</button></view></view><view data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="{{['popup service',attributeValueClass]}}" bindtap="__e"><view class="mask"></view><view class="layer layer-service"><view class="content"><block wx:for="{{productDetail.attributeValue}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="row"><view class="title">{{''+(item.title+': '+item.value)+''}}</view></view></block></view><button data-event-opts="{{[['tap',[['hideService',['$event']]]]]}}" class="btn" bindtap="__e">完成</button></view></view><view data-event-opts="{{[['touchmove',[['stopPrevent',['$event']]]],['tap',[['toggleSpec',['$event']]]]]}}" class="{{['popup spec',specClass]}}" catchtouchmove="__e" bindtap="__e"><view data-event-opts="{{[['tap',[['hideSpec',['$event']]]]]}}" class="mask" bindtap="__e"></view><view data-event-opts="{{[['tap',[['stopPrevent',['$event']]]]]}}" class="layer attr-content" catchtap="__e"><view class="a-t"><image src="{{showTypeImage||productDetail.picture}}"></image><view class="right"><text class="title">{{productDetail.name}}</text><text class="price">{{"¥"+productDetail.minSkuPrice}}</text><text class="stock">{{"库存："+(currentStock||productDetail.stock)+"件"}}</text><block wx:if="{{specSelected.length>0}}"><view class="selected">已选：<block wx:for="{{specSelected}}" wx:for-item="sItem" wx:for-index="sIndex" wx:key="sIndex"><text class="selected-text">{{''+sItem.title+''}}</text></block><text hidden="{{!(specSelected.length>0)}}">{{'* '+cartCount+''}}</text></view></block></view></view><block wx:for="{{$root.l2}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="attr-list"><text>{{item.$orig.title}}</text><view class="item-list"><block wx:for="{{specChildList}}" wx:for-item="childItem" wx:for-index="childIndex" wx:key="childIndex"><block wx:if="{{childItem.base_spec_id===item.$orig.base_spec_id}}"><view data-event-opts="{{[['tap',[['selectSpec',[childIndex,'$0','$1'],[[['specChildList','',childIndex,'base_spec_id']],[['specList','',index,'show_type']]]]]]]}}" class="{{['tit',(childItem.selected)?'selected':'']}}" style="{{(childItem.selected&&item.m6===2?styleObject:'')}}" bindtap="__e"><text hidden="{{!(item.m7===1)}}">{{''+childItem.title+''}}</text><text hidden="{{!(item.m8===2)}}">{{''+childItem.title+''}}</text><view hidden="{{!(item.m9===3)}}"><image class="img" src="{{childItem.data||productDetail.picture}}" mode="aspectFill"></image>{{''+childItem.title+''}}</view></view></block></block></view></view></block><view class="select-count"><text>购买数量</text><uni-number-box class="step" vue-id="1" min="{{1}}" max="{{$root.m10}}" value="{{cartCount}}" data-event-opts="{{[['^eventChange',[['numberChange']]]]}}" bind:eventChange="__e" bind:__l="__l"></uni-number-box></view><button data-event-opts="{{[['tap',[['toggleSpec',['$event']]]]]}}" class="btn" bindtap="__e">完成</button></view></view><share class="vue-ref" vue-id="2" contentHeight="{{580}}" shareList="{{shareList}}" data-ref="share" bind:__l="__l"></share><view data-event-opts="{{[['tap',[['toggleMask',['$event']]]]]}}" class="{{['mask',maskState===0?'none':maskState===1?'show':'']}}" bindtap="__e"><view data-event-opts="{{[['tap',[['stopPrevent',['$event']]]]]}}" class="mask-content" catchtap="__e"><block wx:for="{{$root.l3}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['getCoupon',['$0'],[[['productDetail.canReceiveCoupon','',index]]]]]]]}}" class="coupon-item" bindtap="__e"><view class="con"><view class="left"><text class="title">{{item.$orig.title}}</text><block wx:if="{{item.m11===0}}"><text class="time">{{item.f6+" ~ "+item.f7}}</text></block><block wx:else><text class="time">{{"自领取之日 "+item.$orig.fixed_term+"天内有效"}}</text></block></view><view class="right"><block wx:if="{{item.$orig.money}}"><text class="price">{{item.$orig.money}}</text></block><block wx:else><text class="price-discount">{{item.$orig.discount+'折'}}</text></block><text>{{"满"+item.$orig.at_least+"可用"}}</text></view><view class="circle l"></view><view class="circle r"></view></view><view class="tips"><text hidden="{{!(item.$orig.range_type)}}">{{''+(item.m12===2?'部分产品使用':'全场产品使用')+''}}</text></view></view></block></view></view></view></block><block wx:else><empty vue-id="3" info="该商品不存在" bind:__l="__l"></empty></block></view>