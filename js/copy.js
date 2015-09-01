jQuery(document).ready(function () {

    var client = new ZeroClipboard(document.getElementById("copy-button"));

    client.on("ready", function (readyEvent) {

        /*
         |--------------------------------------------------------------------------
         | Run the following function after successfully copy data to the clipboard
         |--------------------------------------------------------------------------
         */
        client.on("aftercopy", function (event) {

            /*
             |--------------------------------------------------------------------------
             | Change copy button label after copying data to the clipboard
             |--------------------------------------------------------------------------
             */
            jQuery('#copy-button').text('Copied');
        });
    });
});