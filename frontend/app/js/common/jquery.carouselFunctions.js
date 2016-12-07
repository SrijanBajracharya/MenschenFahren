/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.carouselFunctions = {};
(function ( carouselFunctions ) {
    var slideSpeed = 500;
    var windowWidth = $(window).width();
    var thumbnailWidth = 120;
    $.extend(carouselFunctions, {
        init : function ( slider ) {
            $(window).load(function () {
                $(".image-placeholder").remove();
                if (slider) {
                    $(".item img.resized-image").removeClass("hide-me");
                    carouselFunctions.initialiseSlideshow(slider);
                }
                carouselFunctions.addEventHandler();
            });
            $(window).on("resize", function(){
                windowWidth = $(this).width();
                if($(".fullscreen-carousel").is(":visible")){
                    carouselFunctions.exitFullScreenSlideShow();

                    var carouselId = $(".carousel-control").data("carousel-id");
                    var slickIndex = $(".item[aria-hidden=false]").data("slick-index");
                    var $container = $(carouselId + " .slideshow-container");
                    var slideshowId = $container.attr("id");
                    if ($container.hasClass("slick-initialized")) {
                        $container.slick("unslick");
                    }
                    carouselFunctions.fullScreenSlideShow(carouselId, slickIndex, slideshowId);

                }
            });
        },
        initialiseSlideshow : function ( slider, slickIndex ) {
            slider.children(".image-placeholder").remove();
            slider.hasClass("slick-initialized") ? slider.slick("unslick") : '';
            slider.on('beforeChange', function ( event, slick, currentSlide, nextSlide ) {
                carouselFunctions.bindBeforeChangeEvent(event, slick, currentSlide, nextSlide);
            });
            slider.on('lazyLoadError', function ( event, slick, image, imageSource ) {
                carouselFunctions.handleLazyLoadError(event, slick, image, imageSource);
            });
            slider.slick({
                initialSlide : slickIndex || 0,
                autoplay : true,
                speed : slideSpeed,
                slidesToShow : 1,
                slidesToScroll : 1,
                lazyload : "progressive",
                centerMode : true,
                slide : '.item',
                infinite : true,
                pauseOnFocus : true,
                pauseOnHover : true,
                useCSS : true,
                fade : true,
                dots : false,
                arrows : false
            });
        },
        addEventHandler : function () {
            $(document).on("click", ".fs-carousel .item", function ( event ) {
                event.preventDefault();
                event.stopPropagation();
                if ($(this).parent().hasClass("recent-vehicle-list") || $(".garage-card-view").is(":visible")) {
                    return;
                }
                if (!$("#full-Screen-carousel").is(":visible")) {
                    var carouselId = "#" + $(this).parents(".slider-container").attr("id");
                    var $container = $(carouselId + " .slideshow-container");
                    var slickIndex = $(".item[aria-hidden=false]").data("slick-index");
                    var slideshowId = $container.attr("id");
                    if ($container.hasClass("slick-initialized")) {
                        $container.slick("unslick");
                    }
                    carouselFunctions.fullScreenSlideShow(carouselId, slickIndex, slideshowId);
                }
            });
            $(document).on("click", ".carousel-control", function ( event ) {
                event.preventDefault();
                event.stopPropagation();
                var carouselId = $(this).data("carousel-id");
                if (!$("#full-Screen-carousel").is(":visible")) {
                    var slickIndex = $(".item[aria-hidden=false]").data("slick-index");
                    var $container = $(carouselId + " .slideshow-container");
                    var slideshowId = $container.attr("id");
                    if ($container.hasClass("slick-initialized")) {
                        $container.slick("unslick");
                    }
                    carouselFunctions.fullScreenSlideShow(carouselId, slickIndex, slideshowId);
                }
                if ($(this).hasClass("left")) {
                    if ($("#full-Screen-carousel").is(":visible")) {
                        $("#full-Screen-carousel .slideshow-container").slick("slickPrev");
                    } else {
                        $(" .slideshow-container").slick("slickPrev");
                    }
                } else if ($(this).hasClass("right")) {
                    if ($("#full-Screen-carousel").is(":visible")) {
                        $("#full-Screen-carousel .slideshow-container").slick("slickNext");
                    } else {
                        $(".slideshow-container").slick("slickNext");
                    }
                }
            });
            $(document).on('keyup', function ( event ) {
                var carouselId = $(this).data("carousel-id");
                if (event.which === 39) {
                    if ($("#full-Screen-carousel").is(":visible")) {
                        $("#full-Screen-carousel .slideshow-container").slick("slickNext");
                    } else {
                        $(".slideshow-container").slick("slickNext");
                    }
                } else if (event.which === 37) {
                    if ($("#full-Screen-carousel").is(":visible")) {
                        $("#full-Screen-carousel .slideshow-container").slick("slickPrev");
                    } else {
                        $(" .slideshow-container").slick("slickPrev");
                    }
                } else if (event.which === 27 && $("#full-Screen-carousel").is(":visible")) {
                    carouselFunctions.exitFullScreenSlideShow();
                }
            });
            $(window).scroll(function () {
                if (windowWidth > 768 && $("#full-Screen-carousel").is(":visible")) {
                    carouselFunctions.exitFullScreenSlideShow();
                }
            });
            $(document).on("click", ".close.close-fullscreen", function ( event ) {
                event.preventDefault();
                event.stopPropagation();
                if ($("#full-Screen-carousel").is(":visible")) {
                    carouselFunctions.exitFullScreenSlideShow();
                }
            });
            $(document).on("click", ".fill, .expand-slideshow", function ( event ) {
                event.preventDefault();
                event.stopPropagation();
                var $targetElement = $(event.target);
                var carouselId = $(this).data("carousel-id");
                if (!$targetElement.parents('#full-Screen-carousel').length) {
                    var slickIndex = $(".item[aria-hidden=false]").data("slick-index");
                    var $container = $(carouselId + " .slideshow-container");
                    var slideshowId = $container.attr("id");
                    if ($container.hasClass("slick-initialized")) {
                        $container.slick("unslick");
                    }
                    carouselFunctions.fullScreenSlideShow(carouselId, slickIndex, slideshowId);
                }
            });
        },
        fullScreenSlideShow : function ( carousalId, currentSlickSlideIndex, slideshowId ) {
            $("#full-Screen-carousel").attr("data-carousel-id", slideshowId);
            $(".vehicle-status-ribbon").css("zIndex", -1);
            var fullScreenCarousal = $(carousalId + " .carousel").clone();
            fullScreenCarousal.find(".carousel-control").attr("data-carousel-id", "#full-Screen-carousel");
            fullScreenCarousal.find(".close.close-fullscreen").removeClass("hide");
            $("#full-Screen-carousel").removeClass("hide");
            $(".close-fullscreen").removeClass("hide");
            $("#full-Screen-carousel").html(fullScreenCarousal);
            $("header").addClass("hide");
            $("#return-to-top").addClass("hide");
            $(".car-info").addClass("hide");
            if (windowWidth <= 768)
                $('html, body').css("overflow-y", "hidden");
            carouselFunctions.initialiseFullScreenSlick(currentSlickSlideIndex);
        },
        swapStudioPhotoAndWearAndTear : function ( currentSlickSlideIndex, $container, isFullScreenSlideshow ) {
            var wearAndTearSlides = $("section .carousel .resized-image-container img.resized-image.slideshow-images[data-wear-and-tear='true']").parent().clone();
            var studioPhotoSlides = $("section .carousel .resized-image-container img.resized-image.slideshow-images[data-wear-and-tear='false']").parent().clone();
            $container.find(".item.resized-image-container").remove();
            if (isFullScreenSlideshow) {
                if ($("#full-Screen-carousel .option.wear-and-tear").hasClass("selected")) {
                    $container.append(wearAndTearSlides).append(studioPhotoSlides);
                } else {
                    $container.append(studioPhotoSlides).append(wearAndTearSlides);
                }
                carouselFunctions.initialiseFullScreenSlick(currentSlickSlideIndex);
            } else {
                if ($(".option.wear-and-tear").hasClass("selected")) {
                    $container.append(wearAndTearSlides).append(studioPhotoSlides);
                } else {
                    $container.append(studioPhotoSlides).append(wearAndTearSlides);
                }
                carouselFunctions.initialiseSlideshow($container, currentSlickSlideIndex);
            }
        },
        initialiseFullScreenSlick : function ( currentSlickSlideIndex ) {
            var noOfSlides = $(".resized-image").length/2;
            var indexContainer = $(".fullscreen-carousel .left.carousel-control.expand").clone().removeClass("left").addClass("thumbnail-carousel-index");
            indexContainer.children("span").removeClass("icon-chevron_left").addClass("carousel-index-value");
            $.each($("#full-Screen-carousel .slideshow-container img.resized-image"), function () {
                $(this).parent().addClass("item").css("display", "").removeClass("hide-me");
                $(this).attr("src", $(this).data("okimage-fullscreen"));
                $(this).height("auto");
            });
            if ($(".thumb-container")) {
                var thumbnailCarouselContainer = $("<div class='thumb-container'></div>");
                var thumbnailCarousel = $("<div class='thumb-preview-carousel'><div>").append($("#full-Screen-carousel .item").clone());
                $(thumbnailCarouselContainer).append(thumbnailCarousel);
                $(thumbnailCarouselContainer).insertAfter($("#full-Screen-carousel .slideshow-container"));
            }
            $.each($("#full-Screen-carousel .thumb-container img.resized-image"), function ( index ) {
                var $element = $(this);
                var cloneContainer = indexContainer.clone();
                $element.attr("src", $(this).data("thumbnail-preview"));
                cloneContainer.children("span.carousel-index-value").text(index + 1);
                cloneContainer.insertAfter($element);
            });

            var slider = $("#full-Screen-carousel .slideshow-container");
            var heightOfThumbnails = $(window).height() - ($("#full-Screen-carousel .thumb-container").height() || 0);
            $("#full-Screen-carousel .slideshow-container").height(heightOfThumbnails);
            slider.on('beforeChange', function ( event, slick, currentSlide, nextSlide ) {
                carouselFunctions.bindBeforeChangeEvent(event, slick, currentSlide, nextSlide);
            });
            slider.on('lazyLoadError', function ( event, slick, image, imageSource ) {
                carouselFunctions.handleLazyLoadError(event, slick, image, imageSource);
            });
            $(".thumb-container").on('lazyLoadError', function ( event, slick, image, imageSource ) {
                carouselFunctions.handleLazyLoadError(event, slick, image, imageSource);
            });

            slider.slick({
                initialSlide : currentSlickSlideIndex,
                autoplay : true,
                accessibility : true,
                infinite : true,
                lazyLoad : 'progressive',
                slidesToShow : 1,
                speed : slideSpeed,
                arrows : false,
                asNavFor : '.thumb-preview-carousel',
                slide : '.item'
            });
            var isCenterMode = false;
            if (windowWidth <= (thumbnailWidth + 10) * noOfSlides) {
                isCenterMode = true;
            }
            $(".thumb-preview-carousel").slick({
                initialSlide : 0,
                slidesToShow : 1,
                slidesToScroll : 1,
                lazyLoad : 'progressive',
                variableWidth : true,
                speed : slideSpeed,
                dots : false,
                asNavFor : "#full-Screen-carousel .slideshow-container",
                slide : '.item',
                arrows : false,
                focusOnSelect : true,
                mobileFirst : true,
                swipe : true,
                responsive : [{
                    breakpoint : 300,
                    settings : {
                        slidesToShow : 2,
                        infinite : true,
                        centerMode : isCenterMode,
                        lazyLoad : 'progressive'
                    }
                }, {
                    breakpoint : 400,
                    settings : {
                        slidesToShow : 3,
                        infinite : true,
                        centerMode : isCenterMode
                    }
                }, {
                    breakpoint : 700,
                    settings : {
                        slidesToShow : 5,
                        infinite : true,
                        centerMode : isCenterMode
                    }
                }, {
                    breakpoint : 800,
                    settings : {
                        slidesToShow : 6,
                        infinite : true,
                        centerMode : isCenterMode
                    }
                }, {
                    breakpoint : 900,
                    settings : {
                        slidesToShow : 7,
                        infinite : true,
                        centerMode : isCenterMode
                    }
                }, {
                    breakpoint : 1040,
                    settings : {
                        slidesToShow : 8,
                        infinite : true,
                        centerMode : isCenterMode
                    }
                }]
            });

            if (!isCenterMode) {
                var leftMargin = (windowWidth - (thumbnailWidth+10) * noOfSlides) / 2;
                $(".thumb-container .slick-track").css({transform : 'translate3d(' + leftMargin + 'px,0px,0px)'});
            }

            $(".thumb-preview-carousel img").width("120px");
            $(".thumb-preview-carousel").slick('slickGoTo', currentSlickSlideIndex, false);
            $(".thumb-preview-carousel .item").removeClass("slick-current");
            $(".thumb-preview-carousel .item[data-slick-index=" + currentSlickSlideIndex + "]").addClass("slick-current");
            var lastSlideIndex = noOfSlides - 1;
            var $lastItem = $(".thumb-preview-carousel .slick-list .slick-track .item[data-slick-index='-1'],.thumb-preview-carousel .slick-list .slick-track .item[data-slick-index= "+ lastSlideIndex + "]");
            var delineator = $("<div class='slick-slide delineator'></div>");
            if(isCenterMode) {
                $(delineator).insertAfter($lastItem);
            }

        },
        exitFullScreenSlideShow : function () {
            var fullScreenCarouselId = $("#full-Screen-carousel").attr("data-carousel-id");
            var slickIndex = $("#full-Screen-carousel .slideshow-container .item[aria-hidden=false]").data("slick-index");
            var slider = $("#full-Screen-carousel .slideshow-container");
            if ($("#full-Screen-carousel .slideshow-container.slick-initialized")) {
                $("#full-Screen-carousel .slideshow-container").slick('unslick');
                $(".thumb-preview-carousel").slick('unslick');
            }
            $(".vehicle-status-ribbon").css("zIndex", 2);
            var cloneFullScreenSlides = $("#full-Screen-carousel .slideshow-container .item").clone();
            $("#full-Screen-carousel").html('').addClass("hide");
            $(".close-fullscreen").addClass("hide");
            $("header").removeClass("hide");
            $("#return-to-top").removeClass("hide");
            $(".car-info").removeClass("hide");
            $(".extend-image-fullscreen, .fit-image-fullscreen").addClass("hide");
            $('html, body').removeAttr("style");
            sliderSelector = ".slideshow-container#" + fullScreenCarouselId;
            $(sliderSelector + " .item").remove();
            slider = $(sliderSelector);
            slider.append(cloneFullScreenSlides);
            $.each($("img.resized-image"), function () {
                $(this).attr("src", $(this).data("okimage-normal"));
            });
            carouselFunctions.initialiseSlideshow(slider, slickIndex);
        },
        bindBeforeChangeEvent : function ( event, slick, currentSlide, nextSlide ) {
            if ($(".resized-image-container[data-slick-index='" + nextSlide + "'] > img").data("wear-and-tear")) {
                $(".option.studio-photos").removeClass("selected");
                $(".option.wear-and-tear").addClass("selected");
            } else {
                $(".option.wear-and-tear").removeClass("selected");
                $(".option.studio-photos").addClass("selected");
            }
        },
        swipeFullScreenSlideShow : function ( direction, $carousel ) {
            if (direction === "left") {
                $carousel.carousel('next');
            } else if (direction === "right") {
                $carousel.carousel('prev');
            } else if ((direction === "down" || direction === "up") && $(".fullscreen-carousel").is(":visible")) {
                carouselFunctions.exitFullScreenSlideShow();
            }
        },
        handleLazyLoadError : function ( event, slick, image, imageSource ) {
            var imageToBeDownloaded = new Image();
            imageToBeDownloaded.onload = function () {
                image.src = this.src;
            };
            imageToBeDownloaded.src = imageSource;
        }
    });
})(perpetulist.carouselFunctions);
