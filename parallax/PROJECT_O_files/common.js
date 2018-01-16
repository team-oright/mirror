function fnSnsCounting(target, service, id) {
    // TODO : 공유 Count Api 호출 작성.
    // @params : totalId, service

    var API_INFO = {
        news: '/article/{id}/share',
        issue: '/issue/{id}/share',
        digitalspecial: '/digitalspecial/{id}/share'
    },
        api = API_INFO[target];

    if (!api) {
        utils.error('not defined ' + target + ' > API_INFO', true);
        return;
    }

    api = api.replace('{id}', id);
    utils.ajaxPost({
        url: utils.config('apiPath') + api,
        data: { SharedType: service },
        success: function (res) {
            if (res && res.IsSuccess == true && typeof utils.shareCountCallback == 'function') {
                utils.shareCountCallback && utils.shareCountCallback(target);
            }
        }
    });
}

function sendSns(sns, url, txt) {
    var o;
    var _url = encodeURIComponent(url);
    var _txt = encodeURIComponent(txt);
    var _br = encodeURIComponent('\r\n');

    switch (sns) {
        case 'facebook':
            o = {
                method: 'popup',
                url: 'http://www.facebook.com/sharer/sharer.php?u=' + _url
            };
            break;

        case 'twitter':
            o = {
                method: 'popup',
                url: 'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
            };
            break;

        case 'me2day':
            o = {
                method: 'popup',
                url: 'http://me2day.net/posts/new?new_post[body]=' + _txt + _br + _url + '&new_post[tags]=epiloum'
            };
            break;

        case 'kakaotalk':
            o = {
                method: 'web2app',
                param: 'sendurl?msg=' + _txt + '&url=' + _url + '&type=link&apiver=2.0.1&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('�߾��Ϻ�'),
                a_store: 'itms-apps://itunes.apple.com/app/id362057947?mt=8',
                g_store: 'market://details?id=com.kakao.talk',
                a_proto: 'kakaolink://',
                g_proto: 'scheme=kakaolink;package=com.kakao.talk'
            };
            break;

        case 'kakaostory':
            o = {
                //method:'web2app',
                // method:'popup',
                // param:'posting?post=' + _txt + _br + _url + '&apiver=1.0&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('�߾��Ϻ�'),
                // a_store:'itms-apps://itunes.apple.com/app/id486244601?mt=8',
                // g_store:'market://details?id=com.kakao.story',
                // a_proto:'storylink://',
                // g_proto:'scheme=kakaolink;package=com.kakao.story'
            };

            // Kakao.Link.sendTalkLink({
            //              label: txt,
            //              webLink: {
            //                  text: txt,
            //                  url: url
            //              }
            //          });
            Kakao.Story.share({
                url: url,
                text: txt
            });
            break;

        case 'band':
            o = {
                method: 'web2app',
                param: 'create/post?text=' + _txt + _br + _url,
                a_store: 'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                g_store: 'market://details?id=com.nhn.android.band',
                a_proto: 'bandapp://',
                g_proto: 'scheme=bandapp;package=com.nhn.android.band'
            };
            break;

        default:
            alert('�������� �ʴ� SNS�Դϴ�.');
            return false;
    }

    switch (o.method) {
        case 'popup':
            window.open(o.url, o.sns + '�۰���', 'scrollbars=yes,toolbar=yes,resizable=yes,width=1000,height=640');
            break;

        case 'web2app':
            if (navigator.userAgent.match(/android/i)) {
                // Android
                setTimeout(function () {
                    location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'
                }, 100);
            }
            else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
                // Apple
                setTimeout(function () {
                    location.href = o.a_store;
                }, 200);
                setTimeout(function () {
                    location.href = o.a_proto + o.param
                }, 100);
            }
            else {
                alert('�� ����� ����Ͽ����� ����� �� �ֽ��ϴ�.');
            }
            break;
    }
}


function setVerticalMiddle(target) {

    var $target = target,
        windowHeight = $target.parent().outerHeight(),
        overlayHeight = $target.outerHeight(),
        targetTopVal = 0;

    if (windowHeight == 0) {
        windowHeight = $(window).outerHeight();
    }

    targetTopVal = (windowHeight - overlayHeight) / 2;
    $target.css('top', targetTopVal);


};

