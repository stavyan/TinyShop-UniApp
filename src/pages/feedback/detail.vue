<template>
    <view class="page">
        <view>
            内容: {{feedbackDetail.content}}
        </view>
        <view>
        回复: {{feedbackDetail.content || '管理员未回复'}}
        </view>
        <view>
        联系方式: {{feedbackDetail.contact_way || '暂未留下联系方式'}}
        </view>
        <view v-for="item in JSON.parse(feedbackDetail || feedbackDetail.covers)" :key="item">
            <image :src="item"></image>
        </view>
    </view>
</template>

<script>
    import {opinionDetail} from "../../api/userInfo";

    export default {
        data() {
            return {
                feedbackDetail: {}
            }
        },
        onLoad(options) {
            this.initData(options);
        },
        methods: {
            /**
             *@des 数据初始化
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/12/23 18:32:33
             */
            initData(options) {
                this.getFeedbackDetail(options.id)
            },
            /**
             *@des 获取反馈详情
             *@author stav stavyan@qq.com
             *@blog https://stavtop.club
             *@date 2019/12/23 18:33:27
             */ async getFeedbackDetail(id) {
                uni.showLoading({title: '反馈中...'});
                await this.$get(`${opinionDetail}`, {
                    id
                }).then(r => {
                    if (r.code === 200) {
                        this.feedbackDetail = r.data;
                    } else {
                        uni.showToast({title: r.message, icon: "none"});
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang='scss'>
    .page {
        text-align: center;
        margin-top: 40upx;
    }

</style>
