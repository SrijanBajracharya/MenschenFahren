/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.keyNavigation = {};
(function ( keyNavigation ) {
    $.extend(keyNavigation, {
        enterKeyCode : 13,
        tabKeyCode : 9,
        leftArrowKeyCode : 37,
        upArrowKeyCode : 38,
        rightArrowKeyCode : 39,
        downArrowKeyCode : 40,
        deleteKeyCode : 46,
        spaceKeyCode : 32,
        escKeyCode : 27,
        arrowKeyCodes : [ 37, 38, 39, 40 ],
        shiftTabIndex : 1,
        linkKeyCode : 76,
        init : function () {
            keyNavigation.enableCtrlTabNavigation();
            keyNavigation.enableShiftArrowNavigation();
            keyNavigation.enableArrowNavigation();
            keyNavigation.enableEnterFunctionality();
            keyNavigation.enableLinkNavigation();
            keyNavigation.enableMenuHotKey();
            keyNavigation.enableRemoveKeySelect();
            keyNavigation.enableSpaceKeyToSelectOption();
            keyNavigation.enableShiftEnterFunctionality();
            keyNavigation.enableShiftTabFunctionality();
        },
        enableCtrlTabNavigation : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if (keyCode === keyNavigation.tabKeyCode && event.ctrlKey) {
                    if ($(document).find(".key-selected-element[data-ctrl-tab-index]:visible").length) {
                        keyNavigation.shiftTabIndex++;
                    }
                    
                    var $keySelectElement = $(document).find("[data-ctrl-tab-index=" + keyNavigation.shiftTabIndex + "]:visible");
                    if (!$keySelectElement.length) {
                        $keySelectElement = $(document).find($(document).find("[data-ctrl-tab-index]:visible:eq(0)"));
                        keyNavigation.shiftTabIndex = $keySelectElement.data("ctrl-tab-index");
                    }
                    
                    keyNavigation.selectElement($keySelectElement);
                    return false;
                }
            });
        },
        enableShiftArrowNavigation : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if ($.inArray(keyCode, keyNavigation.arrowKeyCodes) !== -1 && event.shiftKey && !event.ctrlKey) {
                    var $activeKeySelectedElement = $(document).find(".key-selected-element:visible");
                    if (keyCode === keyNavigation.downArrowKeyCode) {
                        if ($activeKeySelectedElement.length) {
                            var selector = $activeKeySelectedElement.data("shift-down");
                        } else {
                            selector = $(':focus').parents("[data-shift-down]").data("shift-down");
                        }
                    } else if (keyCode === keyNavigation.upArrowKeyCode) {
                        if ($activeKeySelectedElement.length) {
                            selector = $activeKeySelectedElement.data("shift-up");
                        } else {
                            selector = $(':focus').parents("[data-shift-up]").data("shift-up");
                        }
                    }
                    
                    var $keySelectElement = $(document).find(selector).eq(0);
                    keyNavigation.selectElement($keySelectElement);
                    return false;
                }
            });
        },
        enableArrowNavigation : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                var $focusElement = $(":focus");
                if ($focusElement.length && $focusElement.is("input, textarea") && !$focusElement.parents("[data-arrow-down]").length && !$focusElement.parents("[data-arrow-up]").length) {
                    return true;
                }
                
                if ($.inArray(keyCode, keyNavigation.arrowKeyCodes) !== -1 && !event.shiftKey) {
                    var $activeKeySelectedElement = $(".key-selected-element:visible");
                    if (!$activeKeySelectedElement.length && $(':focus').parents("[data-col-limit]").length) {
                        $activeKeySelectedElement = $(':focus').parents("[data-col-limit]");
                    } else if (!$activeKeySelectedElement.length && keyCode === keyNavigation.downArrowKeyCode && $(':focus').parents("[data-arrow-down]").length) {
                        $activeKeySelectedElement = $(':focus').parents("[data-arrow-down]");
                    }
                    
                    if (keyCode === keyNavigation.downArrowKeyCode && typeof $activeKeySelectedElement.data("arrow-down") !== 'undefined') {
                        var $keySelectElement = $($activeKeySelectedElement.data("arrow-down"));
                    } else if (keyCode === keyNavigation.upArrowKeyCode && typeof $activeKeySelectedElement.data("arrow-up") !== 'undefined') {
                        $keySelectElement = $($activeKeySelectedElement.data("arrow-up"));
                    } else {
                        var $parentWrapper = $activeKeySelectedElement.parent();
                        var nextIndex = keyNavigation.getNextIndex(keyCode, $parentWrapper, $activeKeySelectedElement);
                        if (nextIndex < 0) {
                            $keySelectElement = $($activeKeySelectedElement.data("shift-up"));
                        } else {
                            $keySelectElement = $parentWrapper.find("[data-col-limit]:visible:eq(" + nextIndex + ")");
                        }
                    }
                    
                    if ($keySelectElement.length) {
                        keyNavigation.selectElement($keySelectElement);
                        return false;
                    }
                }
            });
        },
        enableLinkNavigation : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if ((keyCode === keyNavigation.linkKeyCode) && event.ctrlKey) {
                    if ($(document).find("a.key-selected-element:visible").length) {
                        keyNavigation.navigateLink();
                    } else {
                        var $keySelectElement = $(document).find("a:visible:eq(0)");
                        keyNavigation.selectElement($keySelectElement);
                    }
                    
                    return false;
                }
            });
        },
        enableRemoveKeySelect : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if (keyCode === keyNavigation.deleteKeyCode && $(".key-selected-element:visible").length) {
                    var $focusElement = $(":focus");
                    if ($focusElement.length && $focusElement.is("input, textarea")) {
                        return true;
                    }
                    
                    $(".key-selected-element:visible").removeClass("key-selected-element");
                    return false;
                } else if (keyCode === keyNavigation.escKeyCode && $(".key-selected-element:visible").length) {
                    $(".key-selected-element:visible").removeClass("key-selected-element");
                    return false;
                }
            });
        },
        enableSpaceKeyToSelectOption : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if ((keyCode === keyNavigation.spaceKeyCode) && ($(".key-selected-element:visible input[type=checkbox]").length || $(".key-selected-element:visible input[type=radio]").length)) {
                    if ($(".key-selected-element:visible label")) {
                        $(".key-selected-element:visible label")[0].click();
                    } else {
                        $(".key-selected-element:visible input").click();
                    }
                    $(".key-selected-element:visible input").blur();
                    return false;
                }
            });
        },
        enableMenuHotKey : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if ((keyCode === 77) && event.ctrlKey) {
                    $("#show").click();
                    var $keySelectElement = $(".menu-desktop a:eq(0)");
                    keyNavigation.selectElement($keySelectElement);
                }
            });
        },
        enableShiftEnterFunctionality : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if (keyCode === keyNavigation.enterKeyCode && event.shiftKey && $(".key-selected-element:visible").length) {
                    var $activeElement = $(".key-selected-element:visible");
                    var tabIndex = 1;
                    if (typeof $activeElement.data["shift-tab-index"] !== "undefined" && !$activeElement.is("input, textarea")) {
                        $activeElement.click();
                        tabIndex = $activeElement.data("shift-tab-index");
                    } else if (typeof $activeElement.data["shift-tab-index"] === "undefined" && typeof $activeElement.data("shift-up") !== "undefined") {
                        var $shiftUpElement = $($activeElement.data("shift-up"));
                        $shiftUpElement.click();
                        tabIndex = $shiftUpElement.data("shift-tab-index");
                    }
                    
                    keyNavigation.shiftTabIndex = tabIndex + 1;
                    var $keySelectElement = $(document).find("[data-shift-tab-index=" + keyNavigation.shiftTabIndex + "]:visible");
                    if (!$keySelectElement.length) {
                        $keySelectElement = $(document).find($(document).find("[data-shift-tab-index]:visible:eq(0)"));
                        keyNavigation.shiftTabIndex = $keySelectElement.data("shift-tab-index");
                    }
                    
                    keyNavigation.selectElement($keySelectElement);
                    return false;
                }
            });
        },
        enableEnterFunctionality : function () {
            $(document).keydown(function ( event ) {
                var keyCode = event.keyCode;
                if (keyCode === keyNavigation.enterKeyCode && !event.shiftKey && $(".key-selected-element:visible").length) {
                    if ($(".key-selected-element:visible input[type=checkbox]").length || $(".key-selected-element:visible input[type=radio]").length) {
                        if ($(".key-selected-element:visible label")) {
                            $(".key-selected-element:visible label")[0].click();
                        } else {
                            $(".key-selected-element:visible input").click();
                        }
                        $(".key-selected-element:visible input").blur();
                    } else {
                        $(".key-selected-element:visible")[0].click();
                    }
                    
                    if (typeof $(".key-selected-element:visible").data("col-limit") === "undefined") {
                        $(".key-selected-element:visible").removeClass("key-selected-element");
                    }
                    
                    return false;
                }
            });
        },
        enableShiftTabFunctionality : function () {
            $(document).keydown(function ( event ) {
                var fieldLength = $(document).find("[data-shift-tab-index]:visible").length;
                var keyCode = event.keyCode;
                if (keyCode === keyNavigation.tabKeyCode && event.shiftKey) {
                    event.preventDefault();
                    var focusedElement = $('input:focus ,textarea:focus,select:focus');
                    var indexNumber = $(focusedElement).parent().data('shift-tab-index');
                    indexNumber = indexNumber - 1;
                    if (indexNumber == 0) {
                        $("[data-shift-tab-index=" + fieldLength + "]").find("input:visible ,textarea:visible,select:visible").focus();
                    } else {
                        $("[data-shift-tab-index=" + indexNumber + "]").find("input:visible ,textarea:visible,select:visible").focus();
                    }
                }
            });
        },
        selectElement : function ( $keySelectElement ) {
            if ($keySelectElement.length) {
                $(':focus').blur();
                $(".key-selected-element").removeClass("key-selected-element");
                $keySelectElement.addClass("key-selected-element");
                if ($keySelectElement.find("input").length) {
                    $keySelectElement.find("input:eq(0):not(input[type=checkbox], input[type=radio])").focus();
                } else if ($keySelectElement.is("input, textarea")) {
                    $(".key-selected-element").removeClass("key-selected-element");
                    $keySelectElement.focus();
                }
                
                $('html, body').animate({
                    scrollTop : $keySelectElement.offset().top - 300
                }, 100);
            }
        },
        getNextIndex : function ( keyCode, $parentWrapper, $activeKeySelectedElement ) {
            var index = $parentWrapper.find("[data-col-limit]:visible").index($activeKeySelectedElement);
            var colLimit = $activeKeySelectedElement.data("col-limit");
            if (keyCode === keyNavigation.leftArrowKeyCode) {
                index--;
            } else if (keyCode === keyNavigation.upArrowKeyCode) {
                index = index - colLimit;
            } else if (keyCode === keyNavigation.rightArrowKeyCode) {
                index++;
            } else {
                index = index + colLimit;
            }
            
            return index;
        },
        navigateLink : function () {
            var totalLinks = $(document).find("a:visible").length;
            $.each($(document).find("a:visible"), function ( index ) {
                if ($(this).hasClass("key-selected-element")) {
                    if (totalLinks > index + 1) {
                        var $keySelectElement = $(document).find("a:visible:eq(" + (index + 1) + ")");
                    } else {
                        $keySelectElement = $(document).find("a:visible:eq(0)");
                    }
                    
                    keyNavigation.selectElement($keySelectElement);
                    return false;
                }
            });
        }
    });
    
    $(document).ready(function () {
        keyNavigation.init();
    });
})(perpetulist.keyNavigation);