(function($) {

    jQuery(function() {

        if (jQuery('html').hasClass('touch')) {

            /* cache dom referencess */ 
            var $body = jQuery('body'); 

            /* bind events */
            jQuery(document)
            .on('input:focus', 'input', function(e) {
                console.log('focus on input');
                $body.addClass('fixfixed');
            })
            .on('blur', 'input', function(e) {
                console.log('blur out of input');
                $body.removeClass('fixfixed');
            });

        }

    });

})(jQuery);