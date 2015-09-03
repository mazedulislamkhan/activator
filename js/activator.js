/**
 * Created by Md Mazedul Islam Khan on 8/29/15.
 */

/*
 |--------------------------------------------------------------------------
 | Run the following function when the DOM is ready
 |--------------------------------------------------------------------------
 */
jQuery(document).ready(function () {

    /*
     |--------------------------------------------------------------------------
     | Run the following function when the activator form is submit
     |--------------------------------------------------------------------------
     */
    jQuery('#activator').on('submit', function (event) {

        /*
         |--------------------------------------------------------------------------
         | Disable default submit button behaviour
         |--------------------------------------------------------------------------
         */
        event.preventDefault();

        /*
         |--------------------------------------------------------------------------
         | Start Ajax connection
         |--------------------------------------------------------------------------
         */
        jQuery.ajax({

            /*
             |--------------------------------------------------------------------------
             | Send the ajax request to functions.php file
             |--------------------------------------------------------------------------
             */
            url: '/wp-content/plugins/activator/functions.php',

            /*
             |--------------------------------------------------------------------------
             | Data sending method to the API: "body {x-www-form-urlencoded}"
             |--------------------------------------------------------------------------
             */
            data: jQuery(this).serialize(),

            /*
             |--------------------------------------------------------------------------
             | API request method
             |--------------------------------------------------------------------------
             */
            method: 'POST',

            /*
             |--------------------------------------------------------------------------
             | Response data type
             |--------------------------------------------------------------------------
             */
            dataType: 'json',

            /*
             |--------------------------------------------------------------------------
             | Show pre-loader
             |--------------------------------------------------------------------------
             */
            beforeSend: function () {
                jQuery('#pre-loader').show();
            },

            /*
             |--------------------------------------------------------------------------
             | Hide pre-loader
             |--------------------------------------------------------------------------
             */
            complete: function () {
                jQuery('#pre-loader').hide();
            },

            success: function (data) {

                /*
                 |--------------------------------------------------------------------------
                 | reCAPTCHA failure
                 |--------------------------------------------------------------------------
                 */
                if (data.Status == 'failed') {
                    jQuery('.Google-reCAPTCHA .verify-recaptcha').show();
                }

                /*
                 |--------------------------------------------------------------------------
                 | Already activated - Same computer ID
                 |--------------------------------------------------------------------------
                 */
                else if (data.Status == 'Already activated - Same Computer ID') {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('Already activated: Copy activation code to the LT Auditor+ license window and apply to activate.').removeClass('red');
                    jQuery('.activation-code .activated-license-code pre').html(data.ActivatedLicenseCode);

                    /*
                     |--------------------------------------------------------------------------
                     | Show copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').show();

                    /*
                     |--------------------------------------------------------------------------
                     | Change copy button label to copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('#copy-button').text('Copy to Clipboard');

                    /*
                     |--------------------------------------------------------------------------
                     | Copy to the clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').attr('data-clipboard-text', data.ActivatedLicenseCode);

                    /*
                     |--------------------------------------------------------------------------
                     | Refresh reCAPTCHA
                     |--------------------------------------------------------------------------
                     */
                    grecaptcha.reset();

                    /*
                     |--------------------------------------------------------------------------
                     | Hide reCAPTCHA warning
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.Google-reCAPTCHA .verify-recaptcha').hide();
                }

                /*
                 |--------------------------------------------------------------------------
                 | Already activated - Different Computer ID
                 |--------------------------------------------------------------------------
                 */
                else if (data.Status == 'Error : Already activated - Different Computer ID') {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('License cannot be activated !!!').addClass('red');
                    jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">This key has already been activated.</h3><h3 class="different-computer-id">Please contact Blue Lance to request a new license key.</h3>');

                    /*
                     |--------------------------------------------------------------------------
                     | Hide copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').hide();

                    /*
                     |--------------------------------------------------------------------------
                     | Refresh reCAPTCHA
                     |--------------------------------------------------------------------------
                     */
                    grecaptcha.reset();

                    /*
                     |--------------------------------------------------------------------------
                     | Hide reCAPTCHA warning
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.Google-reCAPTCHA .verify-recaptcha').hide();
                }

                /*
                 |--------------------------------------------------------------------------
                 | Error: Invalid Serial Key
                 |--------------------------------------------------------------------------
                 */
                else if (data.Status == 'Error : Invalid Serial Key') {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('License cannot be activated').addClass('red');
                    jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">Please contact Blue Lance to request a new license Key.</h3>');

                    /*
                     |--------------------------------------------------------------------------
                     | Hide copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').hide();

                    /*
                     |--------------------------------------------------------------------------
                     | Refresh reCAPTCHA
                     |--------------------------------------------------------------------------
                     */
                    grecaptcha.reset();

                    /*
                     |--------------------------------------------------------------------------
                     | Hide reCAPTCHA warning
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.Google-reCAPTCHA .verify-recaptcha').hide();
                }

                /*
                 |--------------------------------------------------------------------------
                 | Successful
                 |--------------------------------------------------------------------------
                 */
                else {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('Copy activation code to the LT Auditor+ license window and apply to activate.').removeClass('red');
                    jQuery('.activation-code .activated-license-code pre').html(data.ActivatedLicenseCode);

                    /*
                     |--------------------------------------------------------------------------
                     | Show copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').show();

                    /*
                     |--------------------------------------------------------------------------
                     | Change copy button label to copy to clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('#copy-button').text('Copy to Clipboard');

                    /*
                     |--------------------------------------------------------------------------
                     | Copy to the clipboard
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.activation-code #copy-button').attr('data-clipboard-text', data.ActivatedLicenseCode);

                    /*
                     |--------------------------------------------------------------------------
                     | Refresh reCAPTCHA
                     |--------------------------------------------------------------------------
                     */
                    grecaptcha.reset();

                    /*
                     |--------------------------------------------------------------------------
                     | Hide reCAPTCHA warning
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.Google-reCAPTCHA .verify-recaptcha').hide();
                }
            },

            error: function () {
                jQuery('.activation-code').show();
                jQuery('.activation-code .status').text('Internal Error Activating License').addClass('red');
                jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">Please contact Blue Lance to request a new license key.</h3>');

                /*
                 |--------------------------------------------------------------------------
                 | Hide copy to clipboard
                 |--------------------------------------------------------------------------
                 */
                jQuery('.activation-code #copy-button').hide();
            }
        });

        return false;
    });
});