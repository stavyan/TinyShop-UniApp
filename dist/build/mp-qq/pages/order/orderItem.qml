<view class="collection"><view class="uni-list"><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><uni-swipe-action class="uni-list-cell" vue-id="{{'1-'+index}}" info="{{item.$orig}}" options="{{item.m0}}" hover-class="uni-list-cell-hover" data-event-opts="{{[['^click',[['bindClick']]]]}}" bind:click="__e" bind:__l="__l" vue-slots="{{['default']}}"><view class="uni-media-list"><image class="uni-media-list-logo" mode="aspectFill" src="{{item.$orig.product_picture}}"></image><uni-tag class="evaluate-tag" vue-id="{{('2-'+index)+','+('1-'+index)}}" inverted="{{true}}" mark="{{true}}" text="{{item.f0}}" type="primary" size="small" bind:__l="__l"></uni-tag><view class="uni-media-list-body"><view class="uni-media-list-text-top">{{item.$orig.product_name}}</view><view class="uni-media-list-text-second">{{(item.$orig.sku_name||'基础款')+" * "+item.$orig.num}}</view><view class="uni-media-list-text-bottom"><text class="price">{{item.$orig.price*item.$orig.num}}</text><text>{{item.f1}}</text></view></view></view></uni-swipe-action></block></view></view>