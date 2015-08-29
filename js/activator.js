/**
 * Created by Md Mazedul Islam Khan on 8/29/15.
 */
jQuery(document).ready(function () {
    jQuery('#activator').on('submit', function (event) {
        event.preventDefault();

        jQuery.ajax({
            url: 'http://ec2-52-8-255-156.us-west-1.compute.amazonaws.com/licenseapi/api/License/Activate',
            data: jQuery(this).serialize(),
            method: 'PUT',

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
                if(data.Status == 'Already activated - Same Computer ID') {

                    /*
                    |--------------------------------------------------------------------------
                    | Modal show
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.activation_code').modal('show');

                    /*
                    |--------------------------------------------------------------------------
                    | Add response status to the modal header
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.modal-title').text(data.Status);

                    /*
                    |--------------------------------------------------------------------------
                    | Add response activation code to the modal body
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.modal-body').text(data.ActivatedLicenseCode);

                } else if (data.Status == 'Error : Already activated - Different Computer ID') {

                    /*
                    |--------------------------------------------------------------------------
                    | Modal show
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.activation_code').modal('show');

                    /*
                    |--------------------------------------------------------------------------
                    | Add ERROR string to the modal header
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.modal-title').text('ERROR:');

                    /*
                     |--------------------------------------------------------------------------
                     | Add response status to the modal body
                     |--------------------------------------------------------------------------
                     */
                    jQuery('.modal-body').text(data.Status);
                } else {

                    /*
                    |--------------------------------------------------------------------------
                    | Modal show
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.activation_code').modal('show');

                    /*
                    |--------------------------------------------------------------------------
                    | Add response status to the modal header
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.modal-title').text(data.Status);

                    /*
                    |--------------------------------------------------------------------------
                    | Add response activation code to the modal body
                    |--------------------------------------------------------------------------
                    */
                    jQuery('.modal-body').text(data.ActivatedLicenseCode);
                }
            }
        });
        return false;
    });
});