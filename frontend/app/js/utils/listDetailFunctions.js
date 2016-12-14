var menschenFahren  = menschenFahren || {};
menschenFahren.admin = menschenFahren.admin || {};
menschenFahren.admin.listDetail = menschenFahren.admin.listDetail || {};
(function ( common, $listDetailFunctions ) {
    
    $listDetailFunctions.initDetailPage = function () {
        $(document).ready(function () {
            console.log("inside initdetailpage");
            $listDetailFunctions.detailPageEventHandler();
        });
    };
    
    $listDetailFunctions.detailPageEventHandler = function () {
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
    };
    
})(menschenFahren.admin.common, menschenFahren.admin.listDetail);