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
                    jQuery('.activation-code .status').text('Already activated: Copy the below activation code and activate your copy of LT Auditor+');
                    jQuery('.activation-code .activated-license-code pre').html(data.ActivatedLicenseCode);
                }

                /*
                 |--------------------------------------------------------------------------
                 | Already activated - Different Computer ID
                 |--------------------------------------------------------------------------
                 */
                else if (data.Status == 'Error : Already activated - Different Computer ID') {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('License cannot be activated!');
                    jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">Already activated using different computer ID.</h3><h3 class="different-computer-id">Please contact Blue Lance to get another serial key.</h3>');
                }

                else if(data.Status == 'Error : Invalid Serial Key') {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('License cannot be activated!');
                    jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">Invalid Serial Key.</h3>');
                }

                /*
                 |--------------------------------------------------------------------------
                 | Successful
                 |--------------------------------------------------------------------------
                 */
                else {
                    jQuery('.activation-code').show();
                    jQuery('.activation-code .status').text('Copy the below activation code and activate your copy of LT Auditor+');
                    jQuery('.activation-code .activated-license-code pre').html(data.ActivatedLicenseCode);
                }
            },

            error: function () {
                jQuery('.activation-code').show();
                jQuery('.activation-code .status').text('Internal Error Activating License');
                jQuery('.activation-code .activated-license-code pre').html('<h3 class="different-computer-id">Please contact Blue Lance to get another serial key.</h3>');
            }
        });

        return false;
    });
});