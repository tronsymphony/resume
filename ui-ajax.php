<?php

/*
 * Ajax Forms
 */

add_action('wp_ajax_nopriv_do_ajax', 'our_ajax_function');
add_action('wp_ajax_do_ajax', 'our_ajax_function');

function our_ajax_function(){

	switch($_POST['fn']){
        case 'contact':
			$output = contact($_POST);
        break;

        case 'schedule':
			$output = schedule($_POST);
				break;
				
        case 'careers':
			$output = careers($_POST);
        break;
    }

	$output = json_encode($output);

	if(is_array($output)){
		print_r($output);
	}else{
		echo $output;
	}
	wp_die();
}



// SCHEDULE FORM
function schedule($data){

	$notify = array();

	$html = '<div style="width: 600px; margin: 0 auto;">';
  	$html .= '<div style="text-align: center; padding: 15px; margin-bottom: 1em; background: #fff;">';
	$html .= '<a href="'.get_bloginfo('url').'" title="'.get_bloginfo('title').'"><img style="margin:0 auto;" src="'.get_bloginfo('url').'/wp-content/themes/ui_boisederm/img/logo@2x.png" width="200" height="auto" alt="'.get_bloginfo('name').'" title="'.get_bloginfo('name').'" /></a>';
	$html .= '</div>';
	$html .= '<table style="border: 1px solid #2b2b2b; border-collapse: collapse; width: 100%;">';

	foreach($data['data'] as $data){
		if($data['name'] == 'name'){ $name = ucwords($data['value']); }
		if($data['name'] == 'email'){ $email = $data['value']; }
		if($data['name'] == 'phone'){ $name = $data['value']; }

		$html .= '<tr style="border: 1px solid #ddd;"><td style="width: 30%; padding: 10px; border: 1px solid #ddd;">'.str_replace(array('_', '-'),' ', ucfirst($data['name'])).'</td><td style="width: 70%; padding: 10px; border: 1px solid #2b2b2b;">'.ucfirst($data['value']).'</td></tr>';
	}
	$html .= '</table>';
	$html .= '</div>';

	$email_message = $html;

	add_filter( 'wp_mail_content_type', 'set_html_content_type' );

	$emails = array( $email, 'info@boisederm.com' );
  //$emails = array( $email, 'info@xx.com' );


	$headers = array();
	$headers[] = 'From: '.get_bloginfo('name').' <noreply@boisedermatology.com>' . "\r\n";
    $headers[] = 'Bcc: '.get_bloginfo('name').' <tracking@urgeinteractive.com>' . "\r\n"; 

	$mail_send = wp_mail( $emails , 'Schedule Request for '.get_bloginfo('name').'', $email_message, $headers );

	remove_filter( 'wp_mail_content_type', 'set_html_content_type' );
  
  if($mail_send == true) {
    $message = '<p class="alert alert-success" id="contact-success">Your message was sent successfully!</p>';
  } else {
    $message = '<p class="alert alert-danger">Unable to send, please try again later.</p>';
  }

	return $message;
}



// CAREERS FORM
function careers($data){
// var_dump($data);
    // $arr_img_ext = array('image/png', 'image/jpeg', 'image/jpg', 'image/gif');
    // if (in_array($_FILES['file']['type'], $arr_img_ext)) {
    //     // wp_upload_bits($_FILES["file"]["name"], null, file_get_contents($_FILES["file"]["tmp_name"]));
    // }

	$uploadedfile       = $_FILES['file'];
	$upload_overrides   = array( 'test_form' => false );
	$movefile           = wp_handle_upload( $uploadedfile, $upload_overrides );




	$notify = array();

	$html = '<div style="width: 600px; margin: 0 auto;">';
  	$html .= '<div style="text-align: center; padding: 15px; margin-bottom: 1em; background: #fff;">';
	$html .= '<a href="'.get_bloginfo('url').'" title="'.get_bloginfo('title').'"><img style="margin:0 auto;" src="'.get_template_directory_uri().'/img/logo@2x.png" width="200" height="auto" alt="'.get_bloginfo('name').'" title="'.get_bloginfo('name').'" /></a>';
	$html .= '</div>';
	$html .= '<table style="border: 1px solid #2b2b2b; border-collapse: collapse; width: 100%;">';

	foreach($_POST as $data => $value){
		if($data == 'name'){ $name = ucwords($value); }
		if($data == 'email'){ $email = $value; }
		if($data == 'phone'){ $name = $value; }
		if($data == 'file'){ continue; }
		if($data == 'fn'){ continue; }
		if($data == 'action'){ continue; }

			$html .= '<tr style="border: 1px solid #ddd;"><td style="width: 30%; padding: 10px; border: 1px solid #ddd;">'.str_replace(array('_', '-'),' ', ucfirst($data)).'</td><td style="width: 70%; padding: 10px; border: 1px solid #2b2b2b;">'.ucfirst($value).'</td></tr>';

	}
	if(!is_null($movefile['url'])) {
		$html .= '<tr style="border: 1px solid #ddd;"><td style="width: 30%; padding: 10px; border: 1px solid #ddd;">Resume</td><td style="width: 70%; padding: 10px; border: 1px solid #2b2b2b;"><a href="'. $movefile['url'] .'">Resume File</a></td></tr>';
	}

	$html .= '</table>';
	$html .= '</div>';

	$email_message = $html;

	add_filter( 'wp_mail_content_type', 'set_html_content_type' );

	$emails = array( $email, 'nitya.hoyos@urgeinteractive.com' );
  	//$emails = array( $email, 'info@xx.com' );


	$headers = array('Content-Type: text/html; charset=UTF-8');
	$headers[] = 'From: '.get_bloginfo('name').' <nitya.hoyos@urgeinteractive.com>' . "\r\n";
  	//$headers[] = 'Bcc: '.get_bloginfo('name').' <tracking@urgeinteractive.com>' . "\r\n"; 

	$mail_send = wp_mail( $emails , 'Careers Request for '.get_bloginfo('name').'', $email_message, $headers);

	remove_filter( 'wp_mail_content_type', 'set_html_content_type' );
  
	  if($mail_send == true) {
	    echo '<p class="alert alert-success" id="contact-success">Your message was sent successfully!</p>';
	  } else {
	    // $message = '<p class="alert alert-danger">Unable to send, please try again later.</p>';
	     echo '<p class="alert alert-danger">Unable to send, please try again later.</p>';
	  }

	  die();
	// return $message;
}