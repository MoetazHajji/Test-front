import * as http from 'http';
import * as serverhandlers from './serverHandlers';
import server from './server'

const Server : http.Server = http.createServer(server);

/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server.get('port'));


/**
 * Server Events
 */
Server.on('error',
    (error: Error) => serverhandlers.onError(error, server.get('port'))
);
Server.on('listening',
    serverhandlers.onListening.bind(Server)
);
console.log("Working fine , swagger : http://localhost:"+server.get('port')+'/api-docs/')
