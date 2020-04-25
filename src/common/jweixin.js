!function (e, n) {
    'object' === typeof exports && 'object' === typeof module ? module.exports = n(e) : 'function' === typeof define && (define.amd || define.cmd) ? define(function () {
        return n(e)
    }) : n(e, !0)
}(window, function (o, e) {
    function c(n, e, i) {
        o.WeixinJSBridge ? WeixinJSBridge.invoke(n, r(e), function (e) {
            a(n, e, i)
        }) : d(n, i)
    }

    function i(n, i, t) {
        o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {
            t && t.trigger && t.trigger(e), a(n, e, i)
        }) : d(n, t || i)
    }

    function r(e) {
        return (e = e || {}).appId = M.appId, e.verifyAppId = M.appId, e.verifySignType = 'sha1', e.verifyTimestamp = M.timestamp + '', e.verifyNonceStr = M.nonceStr, e.verifySignature = M.signature, e
    }

    function n(e) {
        return {
            timeStamp: e.timestamp + '',
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || 'SHA1'
        }
    }

    function a(e, n, i) {
        'openEnterpriseChat' == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;
        let t = n.errMsg;
        t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {
            let i = e, t = f[i];
            t && (i = t);
            let o = 'ok';
            if (n) {
                let r = n.indexOf(':');
                'confirm' == (o = n.substring(r + 1)) && (o = 'ok'), 'failed' == o && (o = 'fail'), -1 != o.indexOf('failed_') && (o = o.substring(7)), -1 != o.indexOf('fail_') && (o = o.substring(5)), 'access denied' != (o = (o = o.replace(/_/g, ' ')).toLowerCase()) && 'no permission to execute' != o || (o = 'permission denied'), 'config' == i && 'function not exist' == o && (o = 'ok'), '' == o && (o = 'fail')
            }
            return n = i + ':' + o
        }(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || '', M.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
        let o = t.indexOf(':');
        switch (t.substring(o + 1)) {
            case'ok':
                i.success && i.success(n);
                break;
            case'cancel':
                i.cancel && i.cancel(n);
                break;
            default:
                i.fail && i.fail(n)
        }
        i.complete && i.complete(n)
    }

    function s(e) {
        if (e) {
            for (let n = 0, i = e.length; n < i; ++n) {
                let t = e[n], o = p[t];
                o && (e[n] = o)
            }
            return e
        }
    }

    function d(e, n) {
        if (!(!M.debug || n && n.isInnerInvoke)) {
            let i = f[e];
            i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || '')
        }
    }

    function l() {
        return (new Date).getTime()
    }

    function u(e) {
        I && (o.WeixinJSBridge ? e() : t.addEventListener && t.addEventListener('WeixinJSBridgeReady', e, !1))
    }

    if (!o.jWeixin) {
        var p = {
                config: 'preVerifyJSAPI',
                onMenuShareTimeline: 'menu:share:timeline',
                onMenuShareAppMessage: 'menu:share:appmessage',
                onMenuShareQQ: 'menu:share:qq',
                onMenuShareWeibo: 'menu:share:weiboApp',
                onMenuShareQZone: 'menu:share:QZone',
                previewImage: 'imagePreview',
                getLocation: 'geoLocation',
                openProductSpecificView: 'openProductViewWithPid',
                addCard: 'batchAddCard',
                openCard: 'batchViewCard',
                chooseWXPay: 'getBrandWCPayRequest',
                openEnterpriseRedPacket: 'getRecevieBizHongBaoRequest',
                startSearchBeacons: 'startMonitoringBeacons',
                stopSearchBeacons: 'stopMonitoringBeacons',
                onSearchBeacons: 'onBeaconsInRange',
                consumeAndShareCard: 'consumedShareCard',
                openAddress: 'editAddress'
            }, f = function () {
                let e = {};
                for (let n in p) e[p[n]] = n;
                return e
            }(), t = o.document, m = t.title, g = navigator.userAgent.toLowerCase(), h = navigator.platform.toLowerCase(),
            v = !(!h.match('mac') && !h.match('win')), S = -1 != g.indexOf('wxdebugger'),
            I = -1 != g.indexOf('micromessenger'), y = -1 != g.indexOf('android'),
            _ = -1 != g.indexOf('iphone') || -1 != g.indexOf('ipad'),
            w = (O = g.match(/micromessenger\/(\d+\.\d+\.\d+)/) || g.match(/micromessenger\/(\d+\.\d+)/)) ? O[1] : '',
            k = {initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0}, T = {
                version: 1,
                appId: '',
                initTime: 0,
                preVerifyTime: 0,
                networkType: '',
                isPreVerifyOk: 1,
                systemType: _ ? 1 : y ? 2 : -1,
                clientVersion: w,
                url: encodeURIComponent(location.href)
            }, M = {}, P = {_completes: []}, x = {state: 0, data: {}};
        u(function () {
            k.initEndTime = l()
        });
        var A = !1, V = [], C = {
            config: function (e) {
                d('config', M = e);
                let t = !1 !== M.check;
                u(function () {
                    if (t) c(p.config, {verifyJsApiList: s(M.jsApiList)}, function () {
                        P._complete = function (e) {
                            k.preVerifyEndTime = l(), x.state = 1, x.data = e
                        }, P.success = function (e) {
                            T.isPreVerifyOk = 0
                        }, P.fail = function (e) {
                            P._fail ? P._fail(e) : x.state = -1
                        };
                        let t = P._completes;
                        return t.push(function () {
                            !function (e) {
                                if (!(v || S || M.debug || w < '6.0.2' || T.systemType < 0)) {
                                    let i = new Image;
                                    T.appId = M.appId, T.initTime = k.initEndTime - k.initStartTime, T.preVerifyTime = k.preVerifyEndTime - k.preVerifyStartTime, C.getNetworkType({
                                        isInnerInvoke: !0,
                                        success: function (e) {
                                            T.networkType = e.networkType;
                                            let n = 'https://open.weixin.qq.com/sdk/report?v=' + T.version + '&o=' + T.isPreVerifyOk + '&s=' + T.systemType + '&c=' + T.clientVersion + '&a=' + T.appId + '&n=' + T.networkType + '&i=' + T.initTime + '&p=' + T.preVerifyTime + '&u=' + T.url;
                                            i.src = n
                                        }
                                    })
                                }
                            }()
                        }), P.complete = function (e) {
                            for (let n = 0, i = t.length; n < i; ++n) t[n]();
                            P._completes = []
                        }, P
                    }()), k.preVerifyStartTime = l(); else {
                        x.state = 1;
                        for (let e = P._completes, n = 0, i = e.length; n < i; ++n) e[n]();
                        P._completes = []
                    }
                }), C.invoke || (C.invoke = function (e, n, i) {
                    o.WeixinJSBridge && WeixinJSBridge.invoke(e, r(n), i)
                }, C.on = function (e, n) {
                    o.WeixinJSBridge && WeixinJSBridge.on(e, n)
                })
            }, ready: function (e) {
                0 != x.state ? e() : (P._completes.push(e), !I && M.debug && e())
            }, error: function (e) {
                w < '6.0.2' || (-1 == x.state ? e(x.data) : P._fail = e)
            }, checkJsApi: function (e) {
                c('checkJsApi', {jsApiList: s(e.jsApiList)}, (e._complete = function (e) {
                    if (y) {
                        let n = e.checkResult;
                        n && (e.checkResult = JSON.parse(n))
                    }
                    e = function (e) {
                        let n = e.checkResult;
                        for (let i in n) {
                            let t = f[i];
                            t && (n[t] = n[i], delete n[i])
                        }
                        return e
                    }(e)
                }, e))
            }, onMenuShareTimeline: function (e) {
                i(p.onMenuShareTimeline, {
                    complete: function () {
                        c('shareTimeline', {
                            title: e.title || m,
                            desc: e.title || m,
                            img_url: e.imgUrl || '',
                            link: e.link || location.href,
                            type: e.type || 'link',
                            data_url: e.dataUrl || ''
                        }, e)
                    }
                }, e)
            }, onMenuShareAppMessage: function (n) {
                i(p.onMenuShareAppMessage, {
                    complete: function (e) {
                        'favorite' === e.scene ? c('sendAppMessage', {
                            title: n.title || m,
                            desc: n.desc || '',
                            link: n.link || location.href,
                            img_url: n.imgUrl || '',
                            type: n.type || 'link',
                            data_url: n.dataUrl || ''
                        }) : c('sendAppMessage', {
                            title: n.title || m,
                            desc: n.desc || '',
                            link: n.link || location.href,
                            img_url: n.imgUrl || '',
                            type: n.type || 'link',
                            data_url: n.dataUrl || ''
                        }, n)
                    }
                }, n)
            }, onMenuShareQQ: function (e) {
                i(p.onMenuShareQQ, {
                    complete: function () {
                        c('shareQQ', {
                            title: e.title || m,
                            desc: e.desc || '',
                            img_url: e.imgUrl || '',
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareWeibo: function (e) {
                i(p.onMenuShareWeibo, {
                    complete: function () {
                        c('shareWeiboApp', {
                            title: e.title || m,
                            desc: e.desc || '',
                            img_url: e.imgUrl || '',
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, onMenuShareQZone: function (e) {
                i(p.onMenuShareQZone, {
                    complete: function () {
                        c('shareQZone', {
                            title: e.title || m,
                            desc: e.desc || '',
                            img_url: e.imgUrl || '',
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            }, updateTimelineShareData: function (e) {
                c('updateTimelineShareData', {title: e.title, link: e.link, imgUrl: e.imgUrl}, e)
            }, updateAppMessageShareData: function (e) {
                c('updateAppMessageShareData', {title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl}, e)
            }, startRecord: function (e) {
                c('startRecord', {}, e)
            }, stopRecord: function (e) {
                c('stopRecord', {}, e)
            }, onVoiceRecordEnd: function (e) {
                i('onVoiceRecordEnd', e)
            }, playVoice: function (e) {
                c('playVoice', {localId: e.localId}, e)
            }, pauseVoice: function (e) {
                c('pauseVoice', {localId: e.localId}, e)
            }, stopVoice: function (e) {
                c('stopVoice', {localId: e.localId}, e)
            }, onVoicePlayEnd: function (e) {
                i('onVoicePlayEnd', e)
            }, uploadVoice: function (e) {
                c('uploadVoice', {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadVoice: function (e) {
                c('downloadVoice', {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, translateVoice: function (e) {
                c('translateVoice', {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, chooseImage: function (e) {
                c('chooseImage', {
                    scene: '1|2',
                    count: e.count || 9,
                    sizeType: e.sizeType || ['original', 'compressed'],
                    sourceType: e.sourceType || ['album', 'camera']
                }, (e._complete = function (e) {
                    if (y) {
                        let n = e.localIds;
                        try {
                            n && (e.localIds = JSON.parse(n))
                        } catch (e) {
                        }
                    }
                }, e))
            }, getLocation: function (e) {
            }, previewImage: function (e) {
                c(p.previewImage, {current: e.current, urls: e.urls}, e)
            }, uploadImage: function (e) {
                c('uploadImage', {localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, downloadImage: function (e) {
                c('downloadImage', {serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1}, e)
            }, getLocalImgData: function (e) {
                !1 === A ? (A = !0, c('getLocalImgData', {localId: e.localId}, (e._complete = function (e) {
                    if (A = !1, 0 < V.length) {
                        let n = V.shift();
                        wx.getLocalImgData(n)
                    }
                }, e))) : V.push(e)
            }, getNetworkType: function (e) {
                c('getNetworkType', {}, (e._complete = function (e) {
                    e = function (e) {
                        let n = e.errMsg;
                        e.errMsg = 'getNetworkType:ok';
                        let i = e.subtype;
                        if (delete e.subtype, i) e.networkType = i; else {
                            let t = n.indexOf(':'), o = n.substring(t + 1);
                            switch (o) {
                                case'wifi':
                                case'edge':
                                case'wwan':
                                    e.networkType = o;
                                    break;
                                default:
                                    e.errMsg = 'getNetworkType:fail'
                            }
                        }
                        return e
                    }(e)
                }, e))
            }, openLocation: function (e) {
                c('openLocation', {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || '',
                    address: e.address || '',
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ''
                }, e)
            }, getLocation: function (e) {
                c(p.getLocation, {type: (e = e || {}).type || 'wgs84'}, (e._complete = function (e) {
                    delete e.type
                }, e))
            }, hideOptionMenu: function (e) {
                c('hideOptionMenu', {}, e)
            }, showOptionMenu: function (e) {
                c('showOptionMenu', {}, e)
            }, closeWindow: function (e) {
                c('closeWindow', {}, e = e || {})
            }, hideMenuItems: function (e) {
                c('hideMenuItems', {menuList: e.menuList}, e)
            }, showMenuItems: function (e) {
                c('showMenuItems', {menuList: e.menuList}, e)
            }, hideAllNonBaseMenuItem: function (e) {
                c('hideAllNonBaseMenuItem', {}, e)
            }, showAllNonBaseMenuItem: function (e) {
                c('showAllNonBaseMenuItem', {}, e)
            }, scanQRCode: function (e) {
                c('scanQRCode', {
                    needResult: (e = e || {}).needResult || 0,
                    scanType: e.scanType || ['qrCode', 'barCode']
                }, (e._complete = function (e) {
                    if (_) {
                        let n = e.resultStr;
                        if (n) {
                            let i = JSON.parse(n);
                            e.resultStr = i && i.scan_code && i.scan_code.scan_result
                        }
                    }
                }, e))
            }, openAddress: function (e) {
                c(p.openAddress, {}, (e._complete = function (e) {
                    let n;
                    (n = e).postalCode = n.addressPostalCode, delete n.addressPostalCode, n.provinceName = n.proviceFirstStageName, delete n.proviceFirstStageName, n.cityName = n.addressCitySecondStageName, delete n.addressCitySecondStageName, n.countryName = n.addressCountiesThirdStageName, delete n.addressCountiesThirdStageName, n.detailInfo = n.addressDetailInfo, delete n.addressDetailInfo, e = n
                }, e))
            }, openProductSpecificView: function (e) {
                c(p.openProductSpecificView, {pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo}, e)
            }, addCard: function (e) {
                for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
                    let r = n[t], a = {card_id: r.cardId, card_ext: r.cardExt};
                    i.push(a)
                }
                c(p.addCard, {card_list: i}, (e._complete = function (e) {
                    let n = e.card_list;
                    if (n) {
                        for (let i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                            let o = n[i];
                            o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ
                        }
                        e.cardList = n, delete e.card_list
                    }
                }, e))
            }, chooseCard: function (e) {
                c('chooseCard', {
                    app_id: M.appId,
                    location_id: e.shopId || '',
                    sign_type: e.signType || 'SHA1',
                    card_id: e.cardId || '',
                    card_type: e.cardType || '',
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + '',
                    nonce_str: e.nonceStr
                }, (e._complete = function (e) {
                    e.cardList = e.choose_card_info, delete e.choose_card_info
                }, e))
            }, openCard: function (e) {
                for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
                    let r = n[t], a = {card_id: r.cardId, code: r.code};
                    i.push(a)
                }
                c(p.openCard, {card_list: i}, e)
            }, consumeAndShareCard: function (e) {
                c(p.consumeAndShareCard, {consumedCardId: e.cardId, consumedCode: e.code}, e)
            }, chooseWXPay: function (e) {
                c(p.chooseWXPay, n(e), e)
            }, openEnterpriseRedPacket: function (e) {
                c(p.openEnterpriseRedPacket, n(e), e)
            }, startSearchBeacons: function (e) {
                c(p.startSearchBeacons, {ticket: e.ticket}, e)
            }, stopSearchBeacons: function (e) {
                c(p.stopSearchBeacons, {}, e)
            }, onSearchBeacons: function (e) {
                i(p.onSearchBeacons, e)
            }, openEnterpriseChat: function (e) {
                c('openEnterpriseChat', {useridlist: e.userIds, chatname: e.groupName}, e)
            }, launchMiniProgram: function (e) {
                c('launchMiniProgram', {
                    targetAppId: e.targetAppId, path: function (e) {
                        if ('string' === typeof e && 0 < e.length) {
                            let n = e.split('?')[0], i = e.split('?')[1];
                            return n += '.html', void 0 !== i ? n + '?' + i : n
                        }
                    }(e.path), envVersion: e.envVersion
                }, e)
            }, miniProgram: {
                navigateBack: function (e) {
                    e = e || {}, u(function () {
                        c('invokeMiniProgramAPI', {name: 'navigateBack', arg: {delta: e.delta || 1}}, e)
                    })
                }, navigateTo: function (e) {
                    u(function () {
                        c('invokeMiniProgramAPI', {name: 'navigateTo', arg: {url: e.url}}, e)
                    })
                }, redirectTo: function (e) {
                    u(function () {
                        c('invokeMiniProgramAPI', {name: 'redirectTo', arg: {url: e.url}}, e)
                    })
                }, switchTab: function (e) {
                    u(function () {
                        c('invokeMiniProgramAPI', {name: 'switchTab', arg: {url: e.url}}, e)
                    })
                }, reLaunch: function (e) {
                    u(function () {
                        c('invokeMiniProgramAPI', {name: 'reLaunch', arg: {url: e.url}}, e)
                    })
                }, postMessage: function (e) {
                    u(function () {
                        c('invokeMiniProgramAPI', {name: 'postMessage', arg: e.data || {}}, e)
                    })
                }, getEnv: function (e) {
                    u(function () {
                        e({miniprogram: 'miniprogram' === o.__wxjs_environment})
                    })
                }
            }
        }, L = 1, B = {};
        return t.addEventListener('error', function (e) {
            if (!y) {
                let n = e.target, i = n.tagName, t = n.src;
                if (('IMG' == i || 'VIDEO' == i || 'AUDIO' == i || 'SOURCE' == i) && -1 != t.indexOf('wxlocalresource://')) {
                    e.preventDefault(), e.stopPropagation();
                    let o = n['wx-id'];
                    if (o || (o = L++, n['wx-id'] = o), B[o]) return;
                    B[o] = !0, wx.ready(function () {
                        wx.getLocalImgData({
                            localId: t, success: function (e) {
                                n.src = e.localData
                            }
                        })
                    })
                }
            }
        }, !0), t.addEventListener('load', function (e) {
            if (!y) {
                let n = e.target, i = n.tagName;
                if (n.src, 'IMG' == i || 'VIDEO' == i || 'AUDIO' == i || 'SOURCE' == i) {
                    let t = n['wx-id'];
                    t && (B[t] = !1)
                }
            }
        }, !0), e && (o.wx = o.jWeixin = C), C
    }
    let O
});
