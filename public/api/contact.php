<?php
/**
 * Theories Consulting - Contact & Strategy Call SMTP Handler
 * Authenticates directly with Brevo SMTP relay (smtp-relay.brevo.com:587)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

function sendSmtpMail($toEmails, $fromEmail, $fromName, $replyToEmail, $replyToName, $subject, $htmlContent) {
    $host = 'smtp-relay.brevo.com';
    $port = 587;
    $username = 'b9a2c4001@smtp-brevo.com';
    $password = 'xsmtpsib-8a61f53f5f6a91b804db18d32cddce1cb6f11c992b4b79c07341dabc31d49aa1-akMFvpQc9fxYPwtR';

    $socket = @stream_socket_client("tcp://$host:$port", $errno, $errstr, 20);
    if (!$socket) {
        throw new Exception("Unable to connect to SMTP server: $errstr ($errno)");
    }
    stream_set_timeout($socket, 20);

    $readResponse = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (isset($str[3]) && $str[3] === ' ') break;
        }
        return $data;
    };

    $sendCommand = function($cmd) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        return $readResponse();
    };

    $res = $readResponse();
    if (substr($res, 0, 3) !== '220') {
        throw new Exception("SMTP greeting failed: " . trim($res));
    }

    $serverName = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'theories.consulting';
    $sendCommand("EHLO $serverName");

    $res = $sendCommand("STARTTLS");
    if (substr($res, 0, 3) !== '220') {
        throw new Exception("STARTTLS failed: " . trim($res));
    }

    $crypto = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    if (!$crypto) {
        throw new Exception("TLS negotiation failed");
    }

    $sendCommand("EHLO $serverName");

    $res = $sendCommand("AUTH LOGIN");
    if (substr($res, 0, 3) !== '334') {
        throw new Exception("AUTH LOGIN init failed: " . trim($res));
    }

    $res = $sendCommand(base64_encode($username));
    if (substr($res, 0, 3) !== '334') {
        throw new Exception("Username rejected: " . trim($res));
    }

    $res = $sendCommand(base64_encode($password));
    if (substr($res, 0, 3) !== '235') {
        throw new Exception("SMTP Authentication failed: " . trim($res));
    }

    $res = $sendCommand("MAIL FROM:<$fromEmail>");
    if (substr($res, 0, 3) !== '250') {
        throw new Exception("MAIL FROM rejected: " . trim($res));
    }

    foreach ($toEmails as $recipient) {
        $res = $sendCommand("RCPT TO:<$recipient>");
        if (substr($res, 0, 3) !== '250') {
            throw new Exception("Recipient rejected ($recipient): " . trim($res));
        }
    }

    $res = $sendCommand("DATA");
    if (substr($res, 0, 3) !== '354') {
        throw new Exception("DATA rejected: " . trim($res));
    }

    $boundary = "=_NextPart_" . md5(microtime(true) . uniqid());

    $headers = [];
    $headers[] = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <$fromEmail>";
    $toHeaderParts = [];
    foreach ($toEmails as $em) {
        $toHeaderParts[] = "<$em>";
    }
    $headers[] = "To: " . implode(', ', $toHeaderParts);
    if ($replyToEmail) {
        $headers[] = "Reply-To: =?UTF-8?B?" . base64_encode($replyToName) . "?= <$replyToEmail>";
    }
    $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "Content-Transfer-Encoding: base64";
    $headers[] = "Date: " . date('r');

    $body = implode("\r\n", $headers) . "\r\n\r\n";
    $body .= chunk_split(base64_encode($htmlContent)) . "\r\n.";

    $res = $sendCommand($body);
    if (substr($res, 0, 3) !== '250') {
        throw new Exception("Message body rejected: " . trim($res));
    }

    $sendCommand("QUIT");
    @fclose($socket);
    return true;
}

try {
    // Support JSON or Form Data
    $rawInput = file_get_contents('php://input');
    $jsonData = json_decode($rawInput, true);

    $name = trim($_POST['name'] ?? ($jsonData['name'] ?? ''));
    $email = trim($_POST['email'] ?? ($jsonData['email'] ?? ''));
    $phone = trim($_POST['phone'] ?? ($jsonData['phone'] ?? ''));
    $service = trim($_POST['service'] ?? ($jsonData['service'] ?? ''));

    if (empty($name)) {
        throw new Exception('Name is required.');
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Valid email address is required.');
    }
    if (empty($phone) || !preg_match('/^[6-9]\d{9}$/', $phone)) {
        throw new Exception('Valid 10-digit mobile number starting with 6-9 is required.');
    }
    if (empty($service)) {
        throw new Exception('Please select a service.');
    }

    $htmlContent = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; color: #111111;">
      <div style="border-bottom: 2px solid #fe4a01; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #111111; font-size: 20px;">Strategy Call / Contact Request</h2>
        <p style="margin: 4px 0 0 0; color: #fe4a01; font-weight: bold; font-size: 14px;">Theories Consulting</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Client Name:</strong></td>
          <td style="padding: 8px 0; color: #111;">' . htmlspecialchars($name) . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #fe4a01; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #111; text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Service Interest:</strong></td>
          <td style="padding: 8px 0; color: #111; font-weight: 600;">' . htmlspecialchars($service) . '</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        <p style="margin: 0;">Sent directly via Theories Consulting website using Brevo SMTP Relay.</p>
      </div>
    </div>';

    $toEmails = ['ajay.theoriesconsulting@gmail.com', 'nithin@theories.consulting'];
    $fromEmail = 'ajay.theoriesconsulting@gmail.com';
    $fromName = 'Theories Consulting';
    $subject = "Strategy Call Request: $name — $service";

    sendSmtpMail(
        $toEmails,
        $fromEmail,
        $fromName,
        $email,
        $name,
        $subject,
        $htmlContent
    );

    echo json_encode([
        'success' => true,
        'message' => 'Inquiry submitted successfully.',
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}
