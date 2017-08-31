import net from 'net';
import minimist from 'minimist';
import HassNet from './HassNet';
import Logger from './Logger';

const argv = minimist(process.argv.slice(2));

if (argv.h || argv.help || !argv.s || !argv.p || !argv.l || !argv.k) {
  console.log(`
hass-server

    -l <server_port>
    -s <upstream_host>
    -p <upstream_port>
    -k <password>

    --help/-h         Show this help
`);
  process.exit(0);
}

const hassNet = new HassNet(argv.s, argv.p, argv.k, false);

const server = net.createServer((socket) => {
  hassNet.handleConnection(socket);
});

server.listen(argv.l, '0.0.0.0', () => {
  Logger.info(`Listening on port ${argv.l}`);
});
