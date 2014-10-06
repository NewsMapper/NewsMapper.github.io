<?php

function check_email_address($email) {
if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
  return false;
}

$email_array = explode("@", $email);
$local_array = explode(".", $email_array[0]);
for ($i = 0; $i < sizeof($local_array); $i++) {
  if
(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&
↪'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$",
$local_array[$i])) {
	return false;
  }
}

if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
  $domain_array = explode(".", $email_array[1]);
  if (sizeof($domain_array) < 2) {
	  return false;
  }
  for ($i = 0; $i < sizeof($domain_array); $i++) {
	if
(!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|
↪([A-Za-z0-9]+))$",
$domain_array[$i])) {
	  return false;
	}
  }
}
return true;
}

$email_post = strip_tags($_GET["email"]);
if ($email_post !== '') {
   if (check_email_address($email_post) == true) {
			 $to = "team@news.gdyer.de";
			 $headers = "From: bot@gdyer.de\r\nReply-To: bot@gdyer.de\r\n";
			 $mail_sent = @mail( $to, "New NewsMapper sign-up", $email_post, $headers );
			if ($mail_sent) header("Location: http://newsmapper.me/?s"); else header("Location: http://newsmapper.me/?e");
		} else {
			header("Location: http://newsmapper.me?f");
	}
 } else {
    header("Location: http://newsmapper.me");
 }
?>