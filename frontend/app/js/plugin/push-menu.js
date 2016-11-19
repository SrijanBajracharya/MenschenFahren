(function ( $ ) {
    $(function () {
        $('[data-toggle="push"]').each(function () {
            var $this = $(this);

            var $target = $($this.data('target') || $this.attr('href') || '#navbar');
            var direction = $this.data('direction') || 'right';

            $target.addClass('navbar-push').addClass('navbar-push-' + direction);

            var $canvas = $($this.data('canvas') || 'body');
            $canvas.addClass('push-canvas');

            $this.on('click', function ( e ) {
                $this.toggleClass('active');
                if ($this.is('.fa-bars')) {
                    $this.toggleClass('fa-rotate-90');
                }
                $canvas.toggleClass('pushed-' + direction);
                $target.toggleClass('in');
                if ($(window).width() < 768) {
                    if ($target.hasClass("in")) {
                        $('.navbar-toggle.visible-xs').attr('style', 'display: none !important');
                    } else {
                        $('.navbar-toggle.visible-xs').attr('style', 'display: block !important');
                    }
                }
            });
        });

        $(document).swipe({
            swipe : function ( event, direction, distance, duration, fingerCount, fingerData ) {
                if ($(window).width() < 768) {
                    if (direction == "left" && $("#navbar").hasClass("in") && distance > 50) {
                        if (!$(".mobimenu").hasClass("mnuopn")) {
                            $(".page-overlay").hide();
                        }
                        $(".navbar-toggle.visible-xs").click();
                    } else if (direction == "left" && $(".mobimenu").hasClass("mnuopn") && distance > 50) {
                        $(".mnuclose").click();
                        $(".page-overlay").hide();
                    } else if (direction == "right" && !$("#navbar").hasClass("in") && distance > 50) {
                        $(".page-overlay").show();
                        $(".navbar-toggle.visible-xs").click();
                        $(".smobitrigger").click();
                    } else if ($("#navbar").hasClass("in") && distance <= 20) {
                        $(".navbar-toggle.visible-xs").click();
                        if (!$(".mobimenu").hasClass("mnuopn")) {
                            $(".page-overlay").hide();
                        }
                    } else if ($(".mobimenu").hasClass("mnuopn") && distance <= 20) {
                        $(".mnuclose").click();
                        $(".page-overlay").hide();
                    }
                } else {
                    $(".page-overlay").hide();
                }
            },
            threshold : 0,
            allowPageScroll : "vertical",
            preventDefaultEvents : false
        });

        $(document).on("click", ".mobimenu li a", function () {
            $(".mnuclose").click();
            $(".page-overlay").hide();
        });

        $(document).on("click", ".advance-sidebar .mobimenu h3", function () {
            var subMenu = $(this).siblings('ul');
            var plusIcon = $(this).find(".fa");
            if (subMenu.is(":visible")) {
                subMenu.slideUp();
                plusIcon.removeClass("fa-minus-circle").addClass("fa-plus-circle");
            } else {
                subMenu.slideDown();
                plusIcon.removeClass("fa-plus-circle").addClass("fa-minus-circle");
            }
        });

        $(document).ready(function () {
            $(document).on("mousedown", ".nav-splitter", function ( e ) {
                e.preventDefault();
                $(document).mousemove(function ( e ) {
                    $("main").css("cursor", "ew-resize");
                    e.preventDefault();
                    var posX = e.pageX;
                    resizeSideBar(posX);
                });

                $(document).mouseup(function ( e ) {
                    $("main").css("cursor", "default");
                    $(document).unbind('mousemove');
                });
            });

            $(".expand-collapse").on("click", function () {
                if ($(this).width() < 150) {
                    resizeSideBar(260);
                } else {
                    resizeSideBar(95);
                }
            });
        });
    })

    function resizeSideBar( width ) {
        var minWidth = 95;
        var maxWidth = 260;
        if (width >= maxWidth) {
            width = maxWidth;
        } else if (width < minWidth) {
            width = minWidth;
        }

        $('.sidebar').css("width", width);
        $(".page-content").css("margin-left", width);

        if (width > 150) {
            $(".sidebar-navigation span").css("width", "50px");
            $(".sidebar-navigation a").css({
                "text-overflow" : "ellipsis",
                "white-space" : "nowrap",
                "text-align" : "left",
                "overflow" : "hidden"
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
    }
})(jQuery);
