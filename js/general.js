var WM = {
    init: initViewport,
    isMobile: false,
    isTablet: false,
    window: null,
    isIE: 0,
    setStickyNav: function (top) {
        setStickyNav(top)
    },
    onResize: onGeneralResize,
    isCompetible: true,
    isHome: false,
    onTopMenuLoaded: function () {
    },
    onSideMenuLoaded: function () {
    },
    topMenuMode: 1,
    footerPrefix: "",
    topNavPrefix: "",
    sideNavPrefix: "",
    playVideo: function(){
        var interval = setInterval(function(){
            var video = document.getElementById('videoSeq');
            $(video).show();
            if (video.currentTime > 0) {
                video.currentTime = 0;
                video.play();
            }
            else
                video.play();
            clearInterval(interval);
        },1000);
    }
    //isAndroid: false
}

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

$(function () {
    WM.init();
    checkCompetability();
    if (WM.isCompetible)
        setScrollListeners();
    loadNav();

    $(window).scroll(function () {
        setStickyNav($(window).scrollTop());
    })

    window.scrollTo(0, 0);
    setStickyNav($(window).scrollTop());
});

function initViewport() {
    WM.window = $(window);
    $(window).unbind('resize').resize(WM.onResize).trigger('resize')
}

function setScrollListeners() {
    document.addEventListener("touchstart", function (e) {
        onStart(e);
    }, false);
    $(window).scroll(function () {
        setStickyNav($(window).scrollTop());
    })

    function onStart(touchEvent) {
        if (navigator.userAgent.match(/Android/i)) {
            //WM.isAndroid = true;
            //_this.onTouchMove();
            //touchEvent.preventDefault();
        }
    }

    //document.addEventListener("touchmove", onTouchMove, false);

}

function checkCompetability() {
    // check ie version & mobile devices
    // detect mobile
    WM.isMobile = $("#wm-mobile-indicator").is(":visible");

    if (navigator.userAgent.indexOf('Trident') != -1) {
        if (navigator.userAgent.indexOf('MSIE 9.0') != -1)
            WM.isIE = 9;

        if (navigator.userAgent.indexOf('MSIE 8.0') != -1)
            WM.isIE = 8;

        $("body").addClass("ie ie" + WM.isIE);
    }


    if (/webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        WM.isMobile = true;
    }

    if (/Android/.test(navigator.userAgent) && $("#wm-tablet-indicator").is(":visible")) {
        WM.isTablet = true;
        // alert('tablet')
        $("body").addClass("wm-android-tablet")
    }
    else
        $("body").removeClass("wm-android-tablet")


    // add competible flag to body
    if (WM.isMobile) {
        $("body").removeClass("wm-competible").addClass("wm-incompetible").addClass("wm-mobile");
    }
    else
        $("body").removeClass("wm-incompetible").removeClass("wm-mobile").addClass("wm-competible");

    if (WM.isIE >= 8) {
        $("body").removeClass("wm-competible").addClass("wm-incompetible");
    }

    // add ie viewport hack
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(
            document.createTextNode(
                "@-ms-viewport{width:auto!important}"
            )
        );
        document.getElementsByTagName("head")[0].
            appendChild(msViewportStyle);
    }

    WM.isCompetible = (!WM.isMobile && WM.isIE <= 0)
}

//function loadNav() {
//  $("<div/>").load("/WorldMate-NewWebSite/ajax/" + WM.footerPrefix + "footer.html", function (data) {
//      $(".footer").prepend(data);
//  });
//  $("<div/>").load("/WorldMate-NewWebSite/ajax/" + WM.topNavPrefix + "topnav.html", function (data) {
//      $("#topnav").prepend(data);
//      $("#topnav a.menu").on('click touchend', function (e) {
//          e.stopPropagation();
//          e.preventDefault();
//          $(".wm-side-menu").toggleClass("open");
//      })
//      $("#topnav").addClass("mode" + WM.topMenuMode)
//
//      if (WM.onTopMenuLoaded) WM.onTopMenuLoaded();
//
//      $("<div/>").load("/WorldMate-NewWebSite/ajax/" + WM.sideNavPrefix + "sidenav.html", function (data) {
//          $("body").prepend(data);
//          if (WM.onSideMenuLoaded) WM.onSideMenuLoaded();
//
//          $(document).on('click touchend', function (e) {
//              $(".wm-side-menu").removeClass("open");
//          })
//
//          $(".wm-side-menu").on('click touchend', function (e) {
//              e.stopPropagation();
//          });
//
//          if (WM.isHome && WM.isCompetible) {
//              $(".wm-side-menu a:first, .navbar-brand").on('click touchend', function (e) {
//                  e.stopPropagation();
//                  e.preventDefault();
//                  SectionManager.scroll.release();
//                  SectionManager.scroll.dir = 'up';
//                  SectionManager.items.get(0).activate();
//              });
//          }
//          fixSideNavHeight();
//
//      });
//
//      if ((QueryString.loginFaild && QueryString.loginFaild == 'true') || (QueryString.login && QueryString.login == 'true')) {
//          $('#loginLink').click();
//      }
//  });
//}

function onGeneralResize(e) {
    var h = $(window).height();
    fixSideNavHeight(h);
    checkCompetability();
}

function onTouchMove() {
    if (!$(".wm-navbar").hasClass("sticky"))
        $(".wm-navbar").addClass("sticky")
    //start of scroll event for iOS
    setStickyNav($(window).scrollTop());
};

function setStickyNav(top) {

    var navMain = $(".navbar-collapse");
    if (navMain.hasClass("in") || navMain.hasClass("collapsing"))
        navMain.collapse('hide');


    if (WM.isHome && WM.isCompetible && SectionManager && SectionManager.items.active()) {
        var dir = SectionManager.scroll.dir;
        var active = SectionManager.items.active();
        var leaveSection = $(".section-leave");
        var enterSection = $(".section-enter");

        if (active.index == 0 && dir == 'down')
            $(".wm-navbar").addClass("sticky");
        else if (active.index == 0 && dir == 'up')
            $(".wm-navbar").removeClass("sticky");

        return;

        //if (active.index > 0 && leaveSection.length > 0 && leaveSection.index() == 0)
        //    $(".wm-navbar").addClass("sticky")
        //else
        //    $(".wm-navbar").removeClass("sticky")
        //return;
    }
    var topLimit = 1;
    // sticky nav
    if (top > topLimit)
        $(".wm-navbar").addClass("sticky")
    else
        $(".wm-navbar").removeClass("sticky")
};

function fixSideNavHeight(h) {
    var sideMenuContentHeight = 687;
    var ratio = h / sideMenuContentHeight;
    if (h < sideMenuContentHeight) {
        $(".wm-side-menu").css({ 'padding-top': 10 });
        $(".wm-side-menu .sub").css({ 'margin-top': 10 });
        $(".wm-side-menu .social").css({ 'margin-top': 10, 'margin-bottom': 10 });
    }
    else {
        $(".wm-side-menu").css({ 'padding-top': 40 });
        $(".wm-side-menu .sub").css({ 'margin-top': 52 });
        $(".wm-side-menu .social").css({ 'margin-top': 40, 'margin-bottom': 40 });
    }
}

function showPopUpAjax(url, local) {
    if (WM.isMobile) {
        location.replace(url);
        return;
    }
    var numOfPopups = $('.popUpWrapper').length + 1;
    var title = "", content = "";
    var loaderInstance = "";
    var popUpWrapperStyle = {
        'zIndex': (20001 * numOfPopups),
        'backgroundColor': '#fffeff',
        'borderRadius': '7px',
        'padding': '10px 10px 10px 40px'
    }
    var popUpBodyStyle = {
        'zIndex': (20001 * numOfPopups),
        'backgroundColor': '#fffeff',
        'maxWidth': '700px',
        'maxHeight': '750px',
        'overflow': 'auto'
    };
    var popUpInnerLoaderStyle = {
        'background': 'url(https://cdn.worldmate.com/wm-website/images/bigAjaxLoader.gif) no-repeat center center #000000',
        'opacity': 0.6,
        'position': 'fixed',
        'width': '100%',
        'height': '100%',
        'left': 0,
        'top': 0,
        'zIndex': (20000 * numOfPopups),
        'display': 'none'
    };
    var bgStyle = {
        'background': 'url(https://cdn.worldmate.com/wm-website/images/bigAjaxLoader.gif) no-repeat center center #000000',
        'opacity': 0.6,
        'position': 'fixed',
        'width': '100%',
        'height': '100%',
        'left': 0,
        'top': 0,
        'zIndex': (20000 * numOfPopups)
    };
    var titleStyle = {
        'fontSize': '47px',
        'color': '#2d93d1',
        'marginBottom': '20px',
        'fontFamily': 'freightsans_prolight, Helvetica, Arial, sans-serif'
    };
    var contentStyle = {
        'fontSize': '22px',
        'color': '#5c6578',
        'marginBottom': '20px',
        'fontFamily': 'freightsans_prolight, Helvetica, Arial, sans-serif',
        'padding': '0px 10px 0px 0px'
    };
    var popUpWrapper = $('<div />').addClass('popUpWrapper popUpWrapper' + numOfPopups).css(popUpWrapperStyle);
    var popUpBody = $('<div />').addClass('popUpBody').css(popUpBodyStyle).appendTo(popUpWrapper);
    var popUpInnerLoader = $('<div />').addClass('popUpInnerLoader').css(popUpInnerLoaderStyle).appendTo(popUpWrapper);
    var bg = $('<div />').css(bgStyle).appendTo('body');
    $.ajax({
        url: url,
        success: function (data) {
            if (local) {
                var dataAsDiv = $('<div />').html(data)
                content = dataAsDiv.find('.ajaxContent').html();
                //content = dataAsDiv;
            }
            else {
                var dataAsDiv = $('<div />').html(data)
                title = dataAsDiv.find('.mainheader').html();
                content = dataAsDiv.find('.mainparagraph').html();
                if ($.trim(content) == "")
                    content = $(dataAsDiv.find('table')[0]).html();
            }
        },
        error: function () {
            title = "Error";
            content = "Could not show pop up";
        },
        complete: function () {
            $('<h2 />').addClass('popUpTitle').css(titleStyle).html(title).appendTo(popUpBody);
            $('<div />').addClass('popUpContent').css(contentStyle).html(content).appendTo(popUpBody);
            popUpWrapper.appendTo('body');
            popUpWrapper.css("position", "absolute");
            popUpWrapper.css("top", Math.max(0, (($(window).height() - $(popUpWrapper).outerHeight()) / 2) + $(window).scrollTop()) + "px");
            popUpWrapper.css("left", Math.max(0, (($(window).width() - $(popUpWrapper).outerWidth()) / 2) + $(window).scrollLeft()) + "px");

            $(window).scroll(function () {
                if (popUpWrapper.length > 0) {
                    popUpWrapper.css("top", Math.max(0, (($(window).height() - $(popUpWrapper).outerHeight()) / 2) + $(window).scrollTop()) + "px");
                    popUpWrapper.css("left", Math.max(0, (($(window).width() - $(popUpWrapper).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
                }
            });
            bg.on('click', function () {
                $(this).remove();
                if (popUpWrapper && popUpWrapper.remove)
                    popUpWrapper.remove();
                if (loaderInstance && loaderInstance.remove)
                    loaderInstance.remove();
            })
        }
    });
}

var acTimeOut, arrCities = [], selectedCity, oldValue;
//$('.acCities').on('keyup', function (e) {
$(document).delegate('.acCities', 'keyup', function (e) {
    var _this = $(this);
    var value = _this.val();
    if (oldValue != value) {
        if (selectedCity != null) {
            selectedCity = null;
            _this.val(String.fromCharCode(e.keyCode));
        }
        clearTimeout(acTimeOut);
        if (oldValue != value && value && value.length > 2) {
            oldValue = value;
            $('.indicator').show();
            acTimeOut = setTimeout(function () {
                $.ajax({
                    type: 'GET',
                    url: '/autocomplete-service/service/autocomplete/location.json?q=' + value + '&limit=8',
                    success: function (data) {
                        arrCities = data.cities;
                        buildAutoComplete($('.acCitiesList'), _this);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        alert('itay');
                    },
                    complete: function () {
                        $('.indicator').hide();
                    }
                });
            }, 500);
        }
    }
});

function buildAutoComplete(ulElement, input) {
    ulElement.empty();
    for (var i = 0; i < arrCities.length; i++) {
        var currCity = arrCities[i];
        console.log(JSON.stringify(currCity));
        var $li = $("<li class='acItem" + ((i % 2 == 0) ? "" : " acItemAlter") + "'></li>");
        $li.attr('city-index', i);
        var boldLetters = "<span class='bold'>" + currCity.cityName.substring(0, ($.trim(input.val()).length)) + "</span>";
        var normalLetters = currCity.cityName.substring($.trim(input.val()).length);
        var stateCode = (currCity.stateCode ? (", " + currCity.stateCode) : "");
        var countryName = (currCity.countryName ? (", " + currCity.countryName) : "");
        $li.html(boldLetters + normalLetters + stateCode + countryName);
        $li.appendTo(ulElement);
    }
    if (arrCities.length == 1) {
        setSelectedCity(0, input, ulElement, $('#userName'));
    }
    $('.acItem').on('click', function () {
        setSelectedCity(parseInt($(this).attr('city-index')), input, ulElement);
    });

    bindKeys(ulElement);
}

function bindKeys(ulElement) {
    var $liSelected;
    var $ulSelected = ulElement;
    $(window).keydown(function (e) {
        // Make sure we have a ul selected
        if ($ulSelected) {

            if (e.which === 40) {
                if ($liSelected) {
                    $liSelected.removeClass('selected');
                    var $next = $liSelected.next();
                    if ($next.length) {
                        $liSelected = $next.addClass('selected');
                    }
                    else {
                        $liSelected = $ulSelected.children('li').first().addClass('selected');
                    }
                }
                else {
                    $liSelected = $ulSelected.children('li').first().addClass('selected');
                }
            } else if (e.which === 38) {
                if ($liSelected) {
                    $liSelected.removeClass('selected');
                    var $prev = $liSelected.prev();
                    if ($prev.length) {
                        $liSelected = $prev.addClass('selected');
                    }
                    else {
                        $liSelected = $ulSelected.children('li').last().addClass('selected');
                    }
                }
                else {
                    $liSelected = $ulSelected.children('li').last().addClass('selected');
                }
            }
            else if (e.which === 13 || e.which === 9) {
                if ($liSelected) {
                    $liSelected.click();
                }
                else {
                    $ulSelected.children('li').first().click();
                }

                if (e.which === 13)
                    $('#userName').focus();
            }
        }
    });
}

function setSelectedCity(index, input, ulElement, nextFocus) {
    selectedCity = arrCities[index];
    input.val(selectedCity.cityName);
    input.blur();
    oldValue = input.val();
    $('#homeLocation_cityId1').val(selectedCity.cityId);
    $('#homeLocation_long1').val(selectedCity.longitude);
    $('#homeLocation_lat1').val(selectedCity.latitude);
    $('#homeLocation_state1').val(selectedCity.stateCode);
    $('#homeLocation_country1').val(selectedCity.countryCode);

    ulElement.empty();

    if (nextFocus)
        nextFocus.focus();
}

function validateRegistrationFrom() {
    var isValid = true;
    var firstName = $.trim($('#firstName').val());
    var lastName = $.trim($('#lastName').val());
    var city = $.trim($('#homeLocation_city1').val());
    var email = $.trim($('#userName').val());
    var password = $.trim($('#login_password').val());

    if (firstName == "") {
        $('.errFirstName').fadeIn();
        isValid = false;
    }
    else {
        $('.errFirstName').fadeOut();
    }

    if (lastName == "") {
        $('.errLastName').fadeIn();
        isValid = false;
    }
    else {
        $('.errLastName').fadeOut();
    }

    if (city == "") {
        $('.errCity').fadeIn();
        isValid = false;
    }
    else {
        $('.errCity').fadeOut();
    }

    if (!validateEmail(email)) {
        $('.errEmail').fadeIn();
        isValid = false;
    }
    else {
        $('.errEmail').fadeOut();
    }

    if (password.length < 6) {
        $('.errPassword').fadeIn();
        isValid = false;
    }
    else {
        $('.errPassword').fadeOut();
    }

    return isValid;

}

function validateLoginFrom() {
    var isValid = true;
    var email = $.trim($('#login_username').val());
    var password = $.trim($('#login_password').val());

    if (!validateEmail(email)) {
        $('.errEmail').fadeIn();
        isValid = false;
    }
    else {
        $('.errEmail').fadeOut();
    }

    if (password.length < 6) {
        $('.errPassword').fadeIn();
        isValid = false;
    }
    else {
        $('.errPassword').fadeOut();
    }

    return isValid;

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).delegate('#btnLogin', 'click', function () {
    $('.error').hide();
    var isValid = validateLoginFrom();
    if (!isValid) {
        return false;
    }
    $('#loginForm').submit();
});

$(document).delegate('#btnSendPassword', 'click', function () {
    $('.popUpInnerLoader').show();
    $('.error').hide();
    var isValid = true;
    var email = $.trim($('#login_username').val());
    if (!validateEmail(email)) {
        $('.errEmail').fadeIn();
        isValid = false;
    }
    else {
        $('.errEmail').fadeOut();
    }
    if (!isValid) {
        $('.popUpInnerLoader').hide();
        return false;
    }

    var data = { email_address : email };
    $.ajax({
        type: 'POST',
        url: '/trips/common/lostPassword.json',
        data: data,
        success: function (data, textStatus) {
            $('.errorsList').empty();
            if (data.generalResult.success) {
                $('<span class="error success"></span>').html(data.generalResult.message).appendTo('.errorsList');
                //$('.forgotPassword').click();
            }
            else {
                if (data.globalerrors.length > 0) {
                    for (var i = 0; i < data.globalerrors.length; i++) {
                        $('<span class="error"></span>').html(data.globalerrors[i]).appendTo('.errorsList');
                    }
                }
            }
            $('.popUpInnerLoader').hide();
        }
    });

});

$(document).delegate('.forgotPassword', 'click', function () {
    $('.error').hide();
    if ($(this).html() != 'Login') {
        $(this).html('Login');
        $('#login_password').attr('disabled','disabled');
        $('#btnLogin').hide();
        $('#btnSendPassword').css('display','block');
    }
    else {
        $(this).html('Forget Password?');
        $('#login_password')[0].removeAttribute('disabled');
        $('#btnLogin').css('display','block');
        $('#btnSendPassword').hide();
    }
});

$(document).delegate('#btnRegister', 'click', function () {
    $('.error').hide();
    var isValid = validateRegistrationFrom();

    if (!isValid) {
        return false;
    }
    $('.popUpInnerLoader').show();
    var data = $('#registrationForm').serialize();
    $.ajax({
        type: 'POST',
        url: '/trips/common/register.json',
        data: data,
        success: function (data, textStatus) {
            var json = null;
            try {
                json = JSON.parse(data);
            } catch (ex) {
                json = data;
            }

            if (json && json.redirectURL && json.redirectURL.url) {
                window.location = json.redirectURL.url;
            }
            else {
                if (json) {
                    var handleFormData = true;
                    if (json.generalResult && json.generalResult.windowCommand) {
                        var windowCommand = json.generalResult.windowCommand;
                        if (windowCommand.command) {
                            if (windowCommand.command == "refresh") {
                                if (windowCommand.showMessage && windowCommand.message) {
                                    var task = setTimeout(function () {
                                        window.location.reload();
                                    }, 2800);
                                    alert(windowCommand.message);
                                } else {
                                    window.location.reload();
                                }
                                handleFormData = false;
                            }
                        }
                    } else if (json.failure && (json.failure == 'true') && json.unrecoverableFailure && (json.unrecoverableFailure == 'true')) {
                        handleFormData = false;
                    }

                    if (handleFormData) {
                        $('.errorsList').empty();
                        buildErrorList(json.fielderrors);
                    }
                }
            }
            $('.popUpInnerLoader').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            //@TODO
            $('.popUpInnerLoader').hide();
        }
    });
});

function buildErrorList(errorsList) {
    for (var obj in errorsList) {
        $('<span class="error"></span>').html(errorsList[obj]).appendTo('.errorsList');
    }
}