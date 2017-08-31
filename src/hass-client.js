import net from 'net';
import minimist from 'minimist';
import HassNet from './HassNet';
import Logger from './Logger';

const argv = minimist(process.argv.slice(2));

if (argv.h || argv.help || !argv.s || !argv.p || !argv.l || !argv.k) {
  console.log(`
hass-client

    -s <server_host>
    -p <server_port>
    -l <local_port>
    -k <password>

    --help/-h         Show this help
`);
  process.exit(0);
}

const hassNet = new HassNet(argv.s, argv.p, argv.k, true);

const server = net.createServer((socket) => {
  hassNet.handleConnection(socket);
});

server.listen(argv.l, () => {
  Logger.info(`Listening on port ${argv.l}`);
});
