<?php

/*
Plugin Name: Activator
Plugin URI: https://github.com/mazedulislamkhan/activator
Description: A simple WordPress plugin which generate activation key through Bluelance API. Some of this plugin style based on specific to Avada theme.
Version: 1.1
Author: Md Mazedul Islam Khan
Author URI: https://github.com/mazedulislamkhan
License: GPL2
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// reCAPTCHA
$siteKey = '6Lf5EAwTAAAAAOb1bLUPAfi5Mp7hqlg3AF7kr9Wy';
$lang    = 'en';

/*
|--------------------------------------------------------------------------
| Activator Shortcode
|--------------------------------------------------------------------------
*/
function activator_shortcode() {
	global $siteKey;
	global $lang;

	$form = <<<FORM
<form method="POST" id="activator">
	<fieldset>
		<div class="SerialKey-Group">
			<label for="SerialKey">Serial Key</label>
			<input type="text" id="SerialKey" name="SerialKey" placeholder="Enter Serial Key" required>
		</div>

		<div class="ActivateMachineCode-Group">
			<label for="ActivateMachineCode">Computer ID</label>
			<input type="text" id="ActivateMachineCode" name="ActivateMachineCode" placeholder="Enter Computer ID" required>
		</div>

		<div class="Google-reCAPTCHA">
			<div class="g-recaptcha" data-sitekey="$siteKey"></div>
			<script src="https://www.google.com/recaptcha/api.js?hl=$lang"></script>
			<div class="verify-recaptcha alert alert-warning">Please, verify the captcha.</div>
		</div>

		<div class="submit">
			<button type="submit">Activate</button>
		</div>

		<div id="pre-loader">
			<div class="indeterminate"></div>
		</div>
	</fieldset>
</form>
<div class="activation-code">
	<h2 class="status"></h2>
	<div class="activated-license-code">
		<pre></pre>
	</div>
</div>
FORM;

	return $form;
}

add_shortcode( 'activator', 'activator_shortcode' );

/*
|--------------------------------------------------------------------------
| Activator Javascript
|--------------------------------------------------------------------------
*/
function activator_javascript() {
	wp_enqueue_script( 'activator', plugins_url( 'js/activator.js', __FILE__ ), '1.0', true );
}

add_action( 'wp_enqueue_scripts', 'activator_javascript' );

/*
|--------------------------------------------------------------------------
| Activator Style
|--------------------------------------------------------------------------
*/
function activator_style() {
	wp_enqueue_style( 'activator', plugins_url( 'css/activator.css', __FILE__ ), 1.0 );
}

add_action( 'wp_enqueue_scripts', 'activator_style' );