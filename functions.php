<?php

/*
|--------------------------------------------------------------------------
| Google reCAPTCHA
|--------------------------------------------------------------------------
*/

require 'vendor/autoload.php';

// reCAPTCHA namespace
use ReCaptcha\ReCaptcha;

// reCAPTCHA key
$secret = '6Lf5EAwTAAAAAHmu137AwfsRQ7IZfZ2nfiU6M7Sy';

// Check the reCAPTCHA if is set
if ( isset( $_POST['g-recaptcha-response'] ) ) {

	// Instantiate reCAPTCHA object
	$recaptcha = new ReCaptcha( $secret );

	// Verify the reCAPTCHA response against the user and pass the user IP address
	$response = $recaptcha->verify( $_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR'] );

	// Submit the form if the reCAPTCHA response is success
	if ( $response->isSuccess() ) {

		// API path
		$url = 'http://ec2-52-8-255-156.us-west-1.compute.amazonaws.com/licenseapi/api/License/Activate';

		// Form submitted data
		$data = 'SerialKey=' . $_POST['SerialKey'] . '&' . 'ActivateMachineCode=' . $_POST['ActivateMachineCode'];

		// Call the API
		$content = file_get_contents(
			$url,
			false,
			stream_context_create(
				[
					'http' => [
						'method'  => 'PUT',
						'header'  => 'Content-Type: application/x-www-form-urlencoded',
						'content' => $data
					]
				]
			)
		);

		// Output the result
		echo $content;
	} else {
		echo '{"Status":"failed"}';
	}
}