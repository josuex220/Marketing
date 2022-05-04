// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ws from "App/Services/Ws";

export default class ApiController {
    loginCreate(request, response){
        var body = request.body();
        response.JSON({body});
        Ws.io.emit('login', { hello: 'resp' });
    }
    loginRead(request, response){
        var body = request.body();
        
    }
    loginUpdate(request, response){
        var body = request.body();
        
    }
    loginDelete(request, response){
        var body = request.body();
        
    }
}
