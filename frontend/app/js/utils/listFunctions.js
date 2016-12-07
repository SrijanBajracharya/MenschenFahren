var menschenFahren = menschenFahren || {};
menschenFahren.admin = menschenFahren.admin || {};
menschenFahren.admin.list = menschenFahren.admin.list || {};
(function ( common, $listFunctions ) {
    $listFunctions.init = function () {
        $(document).ready(function () {
            console.log("inside document ready");
            $listFunctions.renderBlogList();
        });
    };
    
    $listFunctions.renderBlogList = function () {
        console.log("render Blog list");
        /*var templateData = {

        };
        $handlebarHelpers.renderTemplate("#_blogListBlock", templateData, "#blog-list");*/
        $listFunctions.loadJS();
    };
    
    $listFunctions.loadJS = function () {
        $(window).on("click", function ( e ) {
            var container = $("#navbar");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeAttr("style");
                container.addClass("hideme");
            } else {
                container.removeAttr("style");
                container.removeClass("hideme");
            }
        });
        $("#show").click(function ( e ) {
            $("#navbar").show();
            e.stopPropagation();
        });
        $(document).ready(function () {
            fixPosition();
            $(window).resize(function () {
                fixPosition();
            });
        });
        var resizeTimer;
        function fixPosition () {
            resizeTimer = setTimeout(function () {
                var body_size = $('section').width();
                if (window.matchMedia("(max-width: 767px)").matches) {
                    $(".garage").insertBefore(".company");
                    $(".lang").insertAfter(".company");
                } else {
                    $(".garage").insertBefore(".profile");
                    $(".lang").insertAfter(".profile");
                }
            });
        }
        // new UISearch(document.getElementById('sb-search'));
        
        new GridScrollFx(document.getElementById('grid'), {
            viewportFactor : 0.4
        });
    };

    $listFunctions.init();
    
})(menschenFahren.admin.common, menschenFahren.admin.list);