<view class="about"><view hidden="{{!(title==='商城介绍')}}" class="shop-info"><image src="{{detail.web_logo}}"></image><view hidden="{{!(detail.title)}}"><text>商城名称:</text><text>{{detail.title}}</text></view><view hidden="{{!(detail.web_url)}}"><text>官方网址:</text><text>{{detail.web_url}}</text></view><view hidden="{{!(detail.web_phone)}}"><text>商城联系方式:</text><text>{{detail.web_phone}}</text></view><view hidden="{{!(detail.web_email)}}"><text>商城邮箱:</text><text>{{detail.web_email}}</text></view><view hidden="{{!(detail.web_qq)}}"><text>商城QQ号:</text><text>{{detail.web_qq}}</text></view><view hidden="{{!(detail.web_weixin)}}"><text>商城微信号:</text><text>{{detail.web_weixin}}</text></view><view hidden="{{!(detail.web_address)}}"><text>联系地址:</text><text>{{detail.web_address}}</text></view><view hidden="{{!(detail.shouhou_date)}}"><text>售后设置:</text><text>{{detail.shouhou_date}}</text></view></view><view hidden="{{!(title==='版权信息')}}" class="shop-info"><view hidden="{{!(detail.copyright_companyname)}}"><text>公司名称:</text><text>{{detail.copyright_companyname}}</text></view><view hidden="{{!(detail.copyright_url)}}"><text>版权链接:</text><text>{{detail.copyright_url}}</text></view><view hidden="{{!(detail.copyright_desc)}}"><text>版权信息:</text><text>{{detail.copyright_desc}}</text></view></view><view hidden="{{!(title==='证照信息')}}" class="shop-info"></view><view hidden="{{!(title==='注册协议')}}" class="shop-info"><view hidden="{{!(detail.protocol_register)}}"><text>注册协议:</text><text><rich-text nodes="{{detail.protocol_register}}"></rich-text></text></view><block wx:if="{{!detail.protocol_register}}"><empty vue-id="1" info="{{'暂无'+title}}" bind:__l="__l"></empty></block></view><view hidden="{{!(title==='隐私协议')}}" class="shop-info"><view hidden="{{!(detail.protocol_privacy)}}"><text>隐私协议:</text><text><rich-text nodes="{{detail.protocol_privacy}}"></rich-text></text></view><block wx:if="{{!detail.protocol_privacy}}"><empty vue-id="2" info="{{'暂无'+title}}" bind:__l="__l"></empty></block></view><view hidden="{{!(title==='充值协议')}}" class="shop-info"><view hidden="{{!(detail.protocol_recharge)}}"><text>充值协议:</text><text><rich-text nodes="{{detail.protocol_recharge}}"></rich-text></text></view><block wx:if="{{!detail.protocol_recharge}}"><empty vue-id="3" info="{{'暂无'+title}}" bind:__l="__l"></empty></block></view><block wx:if="{{detail.length===0}}"><empty vue-id="4" info="{{'暂无'+title}}" bind:__l="__l"></empty></block></view>