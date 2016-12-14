/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.paymentFunctions = perpetulist.paymentFunctions || {};
(function ( paymentFunctions, commonFunctions ) {
    $.extend(paymentFunctions, {
        init : function () {
            if (typeof Stripe != 'undefined') {
                Stripe.setPublishableKey('pk_test_SHuGMIg0YnUQPLixSqeuydDo');
            }
        },
        validateRequiredParameters : function ( requiredParameters ) {
            $.each(requiredParameters, function ( key, value ) {
                if (typeof value === "undefined" || value === null) {
                    throw new ReferenceError("Missing required parameters: " + Object.keys(requiredParameters).join(", "));
                }
            });
        },
        createStripeToken : function ( carNumber, cvc, expMonth, expYear, name, city, state, country, zipCode ) {
            paymentFunctions.validateRequiredParameters({"carNumber" : carNumber, "cvc" : cvc, "expMonth" : expMonth, "expYear" : expYear});
            Stripe.card.createToken({
                name : name,
                number : carNumber,
                cvc : cvc,
                exp_month : expMonth,
                exp_year : expYear,
                address_city : city,
                address_state : state,
                address_country : country,
                address_zip : zipCode

            }, paymentFunctions.stripeResponseHandler);
        },
        stripeResponseHandler : function ( status, response ) {
            if (response.error) {
                //Todo error handler
            } else {
                var token = response.id;
                console.log(token);
                //Todo success handler
            }
        }
    });

    $(document).ready(function () {
        paymentFunctions.init()
    });
})(perpetulist.paymentFunctions, perpetulist.admin.common);