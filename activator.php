<?php

/*
Plugin Name: Activator
Plugin URI: https://github.com/mazedulislamkhan
Description: A simple WordPress plugin which generate activation key through Bluelance API. Some of this plugin style based on specific to Avada theme.
Version: 1.0
Author: Md Mazedul Islam Khan
Author URI: https://github.com/mazedulislamkhan
License: GPL2
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/*
|--------------------------------------------------------------------------
| Activator Shortcode
|--------------------------------------------------------------------------
*/
function activator_shortcode() {
	return "<form method='PUT' id='activator'><div id='comment-input'><input type='text' name='SerialKey' id='SerialKey' placeholder='Serial Key' required><input type='text' name='ActivateMachineCode' id='ActivateMachineCode' placeholder='Computer ID' required></div><button type='submit' class='fusion-button fusion-button-default fusion-button-large fusion-button-round fusion-button-flat'>Activate</button><div id='pre-loader'><div class='indeterminate'></div></div></form>";
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