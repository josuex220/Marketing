import { CustomersController } from 'App/Controllers/Http/CustomersController';
import Ws from 'App/Services/Ws'

Ws.boot()
var customerController = new CustomersController;
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', function(socket){
    var resp = "0";
    customerController.store(socket);
    customerController.get(socket);
})
