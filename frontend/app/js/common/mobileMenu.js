var perpetulist = perpetulist || {};
perpetulist.mobileMenu = perpetulist.mobileMenu || {};
(function ( mobileMenu, commonFunctions ) {
    'use strict';
    $.extend(mobileMenu, {
        MIN_WIDTH : 95,
        MAX_WIDTH : 185,
        disableScroll : false,
        init : function () {
            $(document).ready(function () {
                mobileMenu.addEventHandler();
                mobileMenu.enableSwipeMenu();
                mobileMenu.resizeSideBar(mobileMenu.MAX_WIDTH);
                if (jQuery().stickyNav && $(".mob").length) {
                    $(".mob").stickyNav({
                        "top" : 70,
                        "scrollUp" : false
                    });
                }
            });
            
            $('.filter-menu-toggle .mobile-menu').addClass('filter-menu-wrapper');
            $('.filter-menu-wrapper').wrapAll("<div class='nav-wrapper'>");
        },
        addEventHandler : function () {
            $('[data-toggle="push"]').each(function () {
                var $pushElement = $($(this).data('target') || $(this).attr('href') || '#navbar');
                var direction = $(this).data('direction') || 'right';
                var $canvas = $($(this).data('canvas') || 'body');
                
                $pushElement.addClass('navbar-push').addClass('navbar-push-' + direction);
                $canvas.addClass('push-canvas');
                $(this).on('click', function ( e ) {
                    $(this).toggleClass('active');
                    if ($(this).is('.fa-bars')) {
                        $(this).toggleClass('fa-rotate-90');
                    }
                    $canvas.toggleClass('pushed-' + direction);
                    $pushElement.toggleClass('in');
                    if ($(window).width() < 768) {
                        $("#navbar").show();
                        if ($pushElement.hasClass("in")) {
                            $(".page-overlay").show();
                            $('html, body').css("overflow-y", "hidden");
                            mobileMenu.disableScroll = true;
                            $('.navbar-toggle.visible-xs').attr('style', 'display: none !important');
                        } else {
                            if (!$(".mobile-menu").hasClass("menu-open")) {
                                $(".page-overlay").hide(1000);
                                $('html, body').removeAttr("style");
                                mobileMenu.disableScroll = false;
                            }
                            $('.navbar-toggle.visible-xs').attr('style', 'display: block !important');
                        }
                    }
                });
            });
            
            $(document).click(function ( event ) {
                var $targetElement = $(event.target);
                if ($(window).width() >= 768 && !$targetElement.parents('#navbar').length && !$targetElement.is($("#navbar")) && !$targetElement.is($("#show"))) {
                    $("#navbar").hide();
                }
            });
            
            $("#show").click(function ( e ) {
                e.preventDefault();
                e.stopPropagation();
                $("#navbar").toggle();
            });
            
            $("#show span").click(function ( e ) {
                e.stopPropagation();
                e.preventDefault();
                $("#navbar").toggle();
            });
            
            $(document).on("click", ".filter-menu-toggle", function () {
                $(this).next('ul').addClass('mobile-menu');
                $('.mobile-menu').addClass('menu-open');
                $(".page-overlay").show();
                $('html, body').css("overflow-y", "hidden");
                mobileMenu.disableScroll = true;
            });
            
            $(document).on("click", ".mobile-menu li a", function () {
                $(".mobile-menu").removeClass("menu-open");
                $(".page-overlay").hide(1000);
                $('html, body').removeAttr("style");
                mobileMenu.disableScroll = false;
            });
            $(document).on("click", ".advance-sidebar .mobile-menu h3 i", function () {
                if (!$(this).parent().hasClass("search-option")) {
                    var $subMenu = $(this).parent().siblings('ul');
                    var $plusIcon = $(this);
                    if ($subMenu.is(":visible")) {
                        $plusIcon.removeClass("fa-minus-circle").addClass("fa-plus-circle");
                    } else {
                        $plusIcon.removeClass("fa-plus-circle").addClass("fa-minus-circle");
                    }
                    if ($subMenu.is(":visible")) {
                        $subMenu.slideUp();
                    } else {
                        $subMenu.slideDown();
                    }
                }
            });
            $(document).on("mousedown", ".nav-splitter", function ( e ) {
                e.preventDefault();
                $(document).mousemove(function ( e ) {
                    e.preventDefault();
                    $("main").css("cursor", "ew-resize");
                    var posX = e.pageX;
                    mobileMenu.resizeSideBar(posX);
                });
                
                $(document).mouseup(function ( e ) {
                    $("main").css("cursor", "default");
                    $(document).unbind('mousemove');
                });
            });
            
            $(".expand-collapse").on("click", function () {
                if ($(this).width() < 85) {
                    mobileMenu.resizeSideBar(mobileMenu.MAX_WIDTH);
                } else {
                    mobileMenu.resizeSideBar(mobileMenu.MIN_WIDTH);
                }
                if ($('.garage-card-option.toggle-default-properties').hasClass('selected-view')) {
                    perpetulist.admin.garageListing.adjustCardView();
                } else if (!$('.garage-grid-option.toggle-default-properties').hasClass('selected-view')) {
                    perpetulist.markFavorite.setPinto();
                }
            });
            
            $(window).resize(function () {
                if (window.matchMedia("(max-width: 768px)").matches) {
                    mobileMenu.resizeSideBar(mobileMenu.MIN_WIDTH);
                    $(".sticky-nav").width($(window).width());
                    if ($(".mobile-menu").hasClass("menu-open") || $("#navbar").hasClass("in")) {
                        $('html, body').css("overflow-y", "hidden");
                        mobileMenu.disableScroll = true;
                        $('.navbar-toggle.visible-xs').attr('style', 'display: block !important');
                    } else if ($("#navbar").hasClass("in")) {
                        $('html, body').css("overflow-y", "hidden");
                        mobileMenu.disableScroll = true;
                        $('.navbar-toggle.visible-xs').attr('style', 'display: none !important');
                    }
                } else {
                    mobileMenu.resizeSideBar(mobileMenu.MIN_WIDTH);
                    $('html, body').removeAttr("style");
                    mobileMenu.disableScroll = false;
                    $("#show").show();
                    $('.navbar-toggle.visible-xs').attr('style', 'display: none !important');
                }
                
                if ($('.sticky-nav').length) {
                    $('.sticky-nav').css({
                        "top" : $(".main-menu .navbar").height(),
                        "left" : $('.sticky-nav').parent().offset().left - 1,
                        "width" : $('.sticky-nav').parent().width() + 18
                    });
                }
            });
            
            window.addEventListener('touchmove', function ( e ) {
                if (mobileMenu.disableScroll) {
                    e.preventDefault();
                }
            });
        },
        enableSwipeMenu : function () {
            $(document).swipe({
                swipe : function ( event, direction, distance, duration, fingerCount, fingerData ) {
                    var $targetElement = $(event.target);
                    if ($(window).width() <= 768 && ($("#full-Screen-carousel").is(":visible") || $targetElement.parents(".carousel").length)) {
                        if (typeof perpetulist.carouselFunctions != "undefined") {
                            perpetulist.carouselFunctions.swipeFullScreenSlideShow(direction, $targetElement.parents(".carousel"));
                        }
                    } else if ($(window).width() < 768) {
                        if (direction == "left" && $("#navbar").hasClass("in") && distance > 100) {
                            if (!$(".mobile-menu").hasClass("menu-open")) {
                                $(".page-overlay").hide(1000);
                                $('html, body').removeAttr("style");
                                mobileMenu.disableScroll = false;
                            }
                            $(".navbar-toggle.visible-xs").click();
                        } else if (direction == "left" && $(".mobile-menu").hasClass("menu-open") && distance > 100) {
                            $(".mobile-menu").removeClass("menu-open");
                            $(".page-overlay").hide(1000);
                            $('html, body').removeAttr("style");
                            mobileMenu.disableScroll = false;
                        } else if (direction == "right" && !$("#navbar").hasClass("in") && distance > 100) {
                            $(".page-overlay").show();
                            $('html, body').css("overflow-y", "hidden");
                            mobileMenu.disableScroll = true;
                            $(".navbar-toggle.visible-xs").click();
                        } else if ($("#navbar").hasClass("in") && distance <= 20) {
                            var $targetElement = $(event.target);
                            if (!$targetElement.parents('#navbar').length && !$targetElement.is($("#navbar"))) {
                                $(".navbar-toggle.visible-xs").click();
                                if (!$(".mobile-menu").hasClass("menu-open")) {
                                    $(".page-overlay").hide(1000);
                                    $('html, body').removeAttr("style");
                                    mobileMenu.disableScroll = false;
                                }
                            }
                        } else if ($(".mobile-menu").hasClass("menu-open") && distance <= 20) {
                            $targetElement = $(event.target);
                            if (!$targetElement.parents('.advance-sidebar').length && !$targetElement.is($(".advance-sidebar"))) {
                                $(".mobile-menu").removeClass("menu-open");
                                $(".page-overlay").hide(1000);
                                $('html, body').removeAttr("style");
                                mobileMenu.disableScroll = false;
                            }
                        }
                    } else {
                        $(".page-overlay").hide(1000);
                        $('html, body').removeAttr("style");
                        mobileMenu.disableScroll = false;
                    }
                },
                threshold : 0,
                allowPageScroll : "vertical",
                preventDefaultEvents : false
            });
        },
        resizeSideBar : function ( width ) {
            if ($(window).width() >= 768) {
                if (width >= mobileMenu.MAX_WIDTH) {
                    width = mobileMenu.MAX_WIDTH;
                    $(".unread-number").css("position", "unset");
                } else if (width < mobileMenu.MIN_WIDTH) {
                    width = mobileMenu.MIN_WIDTH;
                    $(".unread-number").css("position", "absolute").css("left", "10px").css("top", "0");
                } else if (width == mobileMenu.MIN_WIDTH) {
                    $(".unread-number").css("position", "absolute").css("left", "10px").css("top", "0");
                }
                
                $('.sidebar').css("width", width);
                $(".page-content").css("margin-left", width);
                $(".sidebar-navigation  li a").each(function () {
                    $(this).html($(this).children());
                });
                
                if (width > 100) {
                    $(".sidebar-navigation span").css("width", "35px");
                    $(".sidebar-menu-label").removeClass("hide-me");
                    $(".sidebar-navigation a").css({
                        "text-overflow" : "ellipsis",
                        "white-space" : "nowrap",
                        "text-align" : "left",
                        "overflow" : "hidden"
                    });
                    
                    $(".sidebar-navigation  li a").each(function () {
                        $(this).append($(this).attr("title"));
                    });
                    
                    $(".expand-collapse").html("&laquo;");
                } else {
                    $(".sidebar-navigation span").css("width", "100%");
                    $(".sidebar-navigation a").css({
                        "text-overflow" : "unset",
                        "white-space" : "normal",
                        "text-align" : "center",
                        "overflow" : "hidden"
                    });
                    
                    $(".expand-collapse").html("&raquo;");
                }
            } else {
                $(".page-content").css("margin", 0);
                $('.sidebar').removeAttr("width");
                $('html, body').removeAttr("style");
            }
        }
    });
    
    mobileMenu.init();
})(perpetulist.mobileMenu, perpetulist.admin.common);