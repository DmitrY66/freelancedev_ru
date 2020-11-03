<?
if( $_POST ) {
  require 'PHPMailer.php';
  require 'SMTP.php';

  $message = "E-mail: {$_POST['mail']}<br>";
  $message .= "Имя: {$_POST['name']}<br>";
  $message .= "Сообщение: <br>";
  $message .= nl2br("{$_POST['message']}");

  $mail = new PHPMailer;

  $mail->isSMTP();

  $mail->Host = 'smtp.____.___';
  $mail->SMTPAuth = true;
  $mail->Username = '________';
  $mail->Password = '**********';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = '465';

  $mail->CharSet = 'UTF-8';
  $mail->From = '_______@___.___';
  $mail->FromName = 'Сайт Frilancer';
  $mail->addAddress('_________@____.___', 'Имя');

  $mail->isHTML(true);

  $mail->Subject = 'Письмо с сайта Frilancer';
  $mail->Body = $message;

  if( $mail->send() ){
    $answer = '1';
  }else{
    $answer = '0';
  }
  die( $answer );
}