<view data-event-opts="{{[['touchmove',[['clean',['$event']]]]]}}" class="uni-calendar data-v-38872053" catchtouchmove="__e"><block wx:if="{{!insert&&show}}"><view data-event-opts="{{[['tap',[['clean',['$event']]]]]}}" class="{{['uni-calendar__mask data-v-38872053',(aniMaskShow)?'uni-calendar--mask-show':'']}}" bindtap="__e"></view></block><block wx:if="{{insert||show}}"><view class="{{['uni-calendar__content data-v-38872053',(!insert)?'uni-calendar--fixed':'',(aniMaskShow)?'uni-calendar--ani-show':'']}}"><block wx:if="{{!insert}}"><view class="uni-calendar__header uni-calendar--fixed-top data-v-38872053"><view data-event-opts="{{[['tap',[['close',['$event']]]]]}}" class="uni-calendar__header-btn-box data-v-38872053" bindtap="__e"><text class="uni-calendar__header-text uni-calendar--fixed-width data-v-38872053">取消</text></view><view data-event-opts="{{[['tap',[['confirm',['$event']]]]]}}" class="uni-calendar__header-btn-box data-v-38872053" bindtap="__e"><text class="uni-calendar__header-text uni-calendar--fixed-width data-v-38872053">确定</text></view></view></block><view class="uni-calendar__header data-v-38872053"><view data-event-opts="{{[['tap',[['pre',['$event']]]]]}}" class="uni-calendar__header-btn-box data-v-38872053" bindtap="__e"><view class="uni-calendar__header-btn uni-calendar--left data-v-38872053"></view></view><text class="uni-calendar__header-text data-v-38872053">{{(nowDate.year||'')+'年'+(nowDate.month||'')+'月'}}</text><view data-event-opts="{{[['tap',[['next',['$event']]]]]}}" class="uni-calendar__header-btn-box data-v-38872053" bindtap="__e"><view class="uni-calendar__header-btn uni-calendar--right data-v-38872053"></view></view><text data-event-opts="{{[['tap',[['backtoday',['$event']]]]]}}" class="uni-calendar__backtoday data-v-38872053" bindtap="__e">回到今天</text></view><view class="uni-calendar__box data-v-38872053"><view class="uni-calendar__box-bg data-v-38872053"><text class="uni-calendar__box-bg-text data-v-38872053">{{nowDate.month}}</text></view><block wx:for="{{weeks}}" wx:for-item="item" wx:for-index="weekIndex" wx:key="weekIndex"><view class="uni-calendar__weeks data-v-38872053"><block wx:for="{{item}}" wx:for-item="weeks" wx:for-index="weeksIndex" wx:key="weeksIndex"><view class="uni-calendar__weeks-item data-v-38872053"><uni-calendar-item vue-id="{{'1-'+weekIndex+'-'+weeksIndex}}" weeks="{{weeks}}" calendar="{{calendar}}" selected="{{selected}}" lunar="{{lunar}}" data-event-opts="{{[['^change',[['choiceDate']]]]}}" bind:change="__e" class="data-v-38872053" bind:__l="__l"></uni-calendar-item></view></block></view></block></view></view></block></view>