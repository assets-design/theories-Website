<?php
/**
 * Theories Consulting - Careers Application SMTP Handler
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

function sendSmtpMail($toEmails, $fromEmail, $fromName, $replyToEmail, $replyToName, $subject, $htmlContent, $attachment = null) {
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
    $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundary\"";
    $headers[] = "Date: " . date('r');

    $body = implode("\r\n", $headers) . "\r\n\r\n";

    // HTML Part
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($htmlContent)) . "\r\n";

    // Attachment Part
    if ($attachment && !empty($attachment['data']) && !empty($attachment['name'])) {
        $mime = !empty($attachment['type']) ? $attachment['type'] : 'application/octet-stream';
        $safeFilename = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $attachment['name']);

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $mime; name=\"$safeFilename\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$safeFilename\"\r\n\r\n";
        $body .= chunk_split(base64_encode($attachment['data'])) . "\r\n";
    }

    $body .= "--$boundary--\r\n.";

    $res = $sendCommand($body);
    if (substr($res, 0, 3) !== '250') {
        throw new Exception("Message body rejected: " . trim($res));
    }

    $sendCommand("QUIT");
    @fclose($socket);
    return true;
}

try {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $position = trim($_POST['position'] ?? 'Junior Graphic Designer');
    $experience = trim($_POST['experience'] ?? '1–2 Years');
    $portfolio = trim($_POST['portfolio'] ?? '');
    $goodDesign = trim($_POST['good_design'] ?? '');

    if (empty($name)) {
        throw new Exception('Please enter your name.');
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Please enter a valid email address.');
    }
    if (empty($phone) || !preg_match('/^[6-9]\d{9}$/', $phone)) {
        throw new Exception('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
    }
    if (empty($portfolio)) {
        throw new Exception('Please provide your portfolio or profile link.');
    }

    $attachment = null;
    $fileField = isset($_FILES['resume']) ? 'resume' : (isset($_FILES['attachment']) ? 'attachment' : null);

    if ($fileField && !empty($_FILES[$fileField]['tmp_name']) && is_uploaded_file($_FILES[$fileField]['tmp_name'])) {
        $file = $_FILES[$fileField];
        if ($file['size'] > 12 * 1024 * 1024) {
            throw new Exception('Resume file exceeds 10MB limit.');
        }
        $data = file_get_contents($file['tmp_name']);
        if ($data === false) {
            throw new Exception('Failed to read uploaded resume file.');
        }
        $attachment = [
            'name' => $file['name'],
            'type' => $file['type'],
            'data' => $data,
        ];
    } else {
        throw new Exception('Please upload your resume (PDF/DOC).');
    }

    $htmlContent = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff; color: #111111;">
      <div style="border-bottom: 2px solid #fe4a01; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #111111; font-size: 22px;">New Job Application Received</h2>
        <p style="margin: 4px 0 0 0; color: #fe4a01; font-weight: bold; font-size: 14px;">Theories Consulting Careers</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 160px;"><strong>Candidate Name:</strong></td>
          <td style="padding: 8px 0; color: #111;">' . htmlspecialchars($name) . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Email Address:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #fe4a01; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Phone Number:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #111; text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Applied Position:</strong></td>
          <td style="padding: 8px 0; color: #111; font-weight: 600;">' . htmlspecialchars($position) . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Experience:</strong></td>
          <td style="padding: 8px 0; color: #111;">' . htmlspecialchars($experience) . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Portfolio / Links:</strong></td>
          <td style="padding: 8px 0;"><a href="' . htmlspecialchars($portfolio) . '" target="_blank" rel="noopener noreferrer" style="color: #fe4a01;">' . htmlspecialchars($portfolio) . '</a></td>
        </tr>';

    if (!empty($goodDesign)) {
        $htmlContent .= '
        <tr>
          <td style="padding: 12px 0 4px 0; color: #666; vertical-align: top;" colspan="2"><strong>What makes a good design actually GOOD?</strong></td>
        </tr>
        <tr>
          <td style="padding: 0 0 12px 0; color: #333; font-style: italic; background-color: #f9f9f9; padding: 12px; border-radius: 6px;" colspan="2">' . nl2br(htmlspecialchars($goodDesign)) . '</td>
        </tr>';
    }

    if ($attachment) {
        $fileSizeMb = number_format(strlen($attachment['data']) / (1024 * 1024), 2);
        $htmlContent .= '
        <tr>
          <td style="padding: 12px 0 8px 0; color: #666;"><strong>Attached Resume:</strong></td>
          <td style="padding: 12px 0 8px 0; color: #111;">📎 ' . htmlspecialchars($attachment['name']) . ' (' . $fileSizeMb . ' MB)</td>
        </tr>';
    }

    $htmlContent .= '
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        <p style="margin: 0;">Sent directly via Theories Consulting Careers Portal using Brevo SMTP Relay.</p>
      </div>
    </div>';

    $toEmails = ['ajay.theoriesconsulting@gmail.com', 'nithin@theories.consulting'];
    $fromEmail = 'ajay.theoriesconsulting@gmail.com';
    $fromName = 'Theories Careers';
    $subject = "Career Application: $name - $position ($experience)";

    sendSmtpMail(
        $toEmails,
        $fromEmail,
        $fromName,
        $email,
        $name,
        $subject,
        $htmlContent,
        $attachment
    );

    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully.',
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}
