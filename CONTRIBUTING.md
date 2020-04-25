# Contributing Guide

> 贡献指南

## Project Structure

项目大概结构

├── src
│   ├── api
│   │   ├── basic.js
│   │   ├── distribution.js
│   │   ├── login.js
│   │   ├── merchant.js
│   │   ├── product.js
│   │   ├── userInfo.js
│   │   └── websocket.js
│   ├── App.vue
│   ├── common
│   │   ├── graceChecker.js
│   │   ├── jweixin.js
│   │   ├── moment.js
│   │   ├── router.js
│   │   └── utils.js
│   ├── components
│   │   ├── rf-avatar
│   │   │   └── rf-avatar.vue
│   ├── config
│   │   ├── assets.config.js
│   │   ├── constData.config.js
│   │   ├── formRule.config.js
│   │   ├── index.config.js
│   │   ├── routes.config.js
│   │   └── websocket.config.js
│   ├── Json.js
│   ├── main.js
│   ├── manifest.json
│   ├── pages
│   │   ├── cart
│   │   │   └── cart.vue
│   │   ├── category
│   │   │   └── category.vue
│   │   ├── index
│   │   │   ├── index.vue
│   │   │   ├── notice
│   │   │   │   ├── detail.vue
│   │   │   │   └── notice.vue
│   │   │   └── search
│   │   │       └── search.vue
│   │   ├── order
│   │   │   ├── create
│   │   │   │   └── order.vue
│   │   │   ├── detail.vue
│   │   │   ├── evaluation
│   │   │   │   ├── evaluation.vue
│   │   │   │   └── list.vue
│   │   │   ├── order.vue
│   │   │   ├── refund
│   │   │   │   └── refund.vue
│   │   │   ├── refund.vue
│   │   │   ├── search.vue
│   │   │   └── shipping
│   │   │       ├── return.vue
│   │   │       └── shipping.vue
│   │   ├── product
│   │   │   ├── list.vue
│   │   │   └── product.vue
│   │   ├── public
│   │   │   ├── logintype.vue
│   │   │   ├── login.vue
│   │   │   ├── password.vue
│   │   │   └── register.vue
│   │   ├── set
│   │   │   ├── about
│   │   │   │   ├── about.vue
│   │   │   │   └── detail.vue
│   │   │   ├── authorization
│   │   │   │   └── list.vue
│   │   │   ├── feedback
│   │   │   │   ├── detail.vue
│   │   │   │   ├── feedback.vue
│   │   │   │   └── list.vue
│   │   │   ├── invoice
│   │   │   │   ├── invoice.vue
│   │   │   │   ├── list.vue
│   │   │   │   └── manage.vue
│   │   │   └── set.vue
│   │   └── user
│   │       ├── account
│   │       │   ├── account.vue
│   │       │   ├── bill.vue
│   │       │   ├── integral.vue
│   │       │   └── recharge.vue
│   │       ├── address
│   │       │   ├── address.vue
│   │       │   └── manage.vue
│   │       ├── collection
│   │       │   └── collection.vue
│   │       ├── coupon
│   │       │   ├── coupon.vue
│   │       │   ├── detail.vue
│   │       │   └── list.vue
│   │       ├── footprint
│   │       │   └── footprint.vue
│   │       ├── money
│   │       │   ├── pay.vue
│   │       │   └── success.vue
│   │       ├── userinfo
│   │       │   └── userinfo.vue
│   │       └── user.vue
│   ├── pages.json
│   ├── static
│   ├── store
│   │   └── index.js
│   ├── uni.scss
│   └── utils
│       ├── graceChecker.js
│       ├── helper.js
│       ├── payment.js
│       ├── request
│       │   ├── index.js
│       │   └── request.js
│       └── router.js
