<view class="userinfo"><view class="user-section"><image class="bg" src="/static/user-bg2.jpg"></image><text class="bg-upload-btn yticon icon-paizhao"></text><view class="portrait-box"><avatar vue-id="1" canRotate="false" selWidth="200px" selHeight="400upx" avatarSrc="{{profileInfo.head_portrait}}" avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;" data-event-opts="{{[['^upload',[['handleUploadFile']]]]}}" bind:upload="__e" bind:__l="__l"></avatar></view></view><view class="input-content"><form data-event-opts="{{[['submit',[['toUpdateInfo',['$event']]]]]}}" bindsubmit="__e"><view class="input-item"><text class="tit">手机号</text><input type="number" name="mobile" disabled placeholder="请输入手机号码" value="{{profileInfo.mobile}}"/></view><view class="input-item"><text class="tit">昵　称</text><input type="text" name="nickname" placeholder="请输入您的昵称" value="{{profileInfo.nickname}}"/></view><view class="input-item"><text class="tit">姓　名</text><input type="text" name="realname" placeholder="请输入您的姓名" value="{{profileInfo.realname}}"/></view><view class="input-item"><text class="tit">性　别</text><view><radio-group class="gender" name="gender"><block wx:for="{{genders}}" wx:for-item="item" wx:for-index="index" wx:key="index"><label class="gender-item"><radio class="gender-item-radio" color="#fa436a" value="{{item.value}}" checked="{{item.value===profileInfo.gender}}"></radio><text class="gender-item-text">{{item.name}}</text></label></block></radio-group></view></view><view class="input-item"><text class="tit">生　日</text><picker mode="date" value="{{date}}" data-event-opts="{{[['change',[['bindDateChange',['$event']]]]]}}" bindchange="__e"><view class="date" style="background:none;">{{date}}</view></picker></view><view class="input-item"><text class="tit">Q　Q</text><input type="number" name="qq" placeholder="请输入您的QQ" value="{{profileInfo.qq}}"/></view><view class="input-item"><text class="tit">邮　箱</text><input name="email" placeholder="请输入您的邮箱" value="{{profileInfo.email}}"/></view><button class="confirm-btn" formType="submit">修改资料</button></form></view></view>