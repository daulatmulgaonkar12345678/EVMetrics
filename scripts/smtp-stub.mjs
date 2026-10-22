/**
 * Local SMTP stub for testing the contact form without a real mailbox.
 *
 * It speaks just enough SMTP to accept a message, then prints the envelope
 * (MAIL FROM / RCPT TO) and the body it received. Use it to prove that a
 * submission is delivered to exactly one recipient.
 *
 *   node scripts/smtp-stub.mjs          # listens on 2525
 *   SMTP_STUB_PORT=3025 node scripts/smtp-stub.mjs
 */
import { createServer } from 'node:net';

const port = Number(process.env.SMTP_STUB_PORT ?? 2525);
const server = createServer((socket) => {
  let buffer = '';
  let body = '';
  let inData = false;
  const envelope = { mailFrom: null, rcptTo: [] };

  socket.write('220 evmetrik-smtp-stub ready\r\n');

  socket.on('data', (chunk) => {
    buffer += chunk.toString();

    let index;
    while ((index = buffer.indexOf('\r\n')) !== -1) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 2);

      if (inData) {
        if (line === '.') {
          inData = false;
          console.log('\n=== message received ===');
          console.log('MAIL FROM:', envelope.mailFrom);
          console.log('RCPT TO  :', envelope.rcptTo.join(', '));
          console.log('recipients:', envelope.rcptTo.length);
          console.log('--- body ---');
          console.log(body.trimEnd());
          console.log('=== end ===\n');
          socket.write('250 OK: queued\r\n');
        } else {
          body += `${line}\n`;
        }
        continue;
      }

      const upper = line.toUpperCase();

      if (upper.startsWith('EHLO') || upper.startsWith('HELO')) {
        socket.write('250-evmetrik-smtp-stub\r\n250-AUTH PLAIN LOGIN\r\n250 OK\r\n');
      } else if (upper.startsWith('AUTH')) {
        socket.write('235 Authentication successful\r\n');
      } else if (upper.startsWith('MAIL FROM')) {
        envelope.mailFrom = line.slice(line.indexOf(':') + 1).trim();
        socket.write('250 OK\r\n');
      } else if (upper.startsWith('RCPT TO')) {
        envelope.rcptTo.push(line.slice(line.indexOf(':') + 1).trim());
        socket.write('250 OK\r\n');
      } else if (upper.startsWith('DATA')) {
        inData = true;
        body = '';
        socket.write('354 End data with <CR><LF>.<CR><LF>\r\n');
      } else if (upper.startsWith('RSET')) {
        socket.write('250 OK\r\n');
      } else if (upper.startsWith('QUIT')) {
        socket.write('221 Bye\r\n');
        socket.end();
      } else {
        socket.write('250 OK\r\n');
      }
    }
  });

  socket.on('error', () => {
    /* ignore */
  });
});

server.listen(port, () => {
  console.log(`SMTP stub listening on 127.0.0.1:${port}`);
  console.log('Set SMTP_HOST=127.0.0.1 and SMTP_PORT=' + port + ' to test the contact form.');
});
