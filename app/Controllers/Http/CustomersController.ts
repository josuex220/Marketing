// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import Customer from "App/Models/Customer";
import  {HttpContextContract}  from '@ioc:Adonis/Core/HttpContext'

export class CustomersController {

    store(socket){
        socket.on('register', (data) => {
            var register = {
                firstname: data.nome,
                lastname:  data.sobrenome,
                email: data.email,
                password: data.password
            };
            Customer.create(register);
            socket.emit('redirectHome',{ state : true});
        });
    }
    get(socket){
        socket.on('login', async(data) => {
            var loginUser = data;
            if(loginUser.email && loginUser.password){
                try {    
                    const userConsult = await Customer.findBy('email', loginUser.email);
                    if(userConsult){
                        if(await Hash.verify(userConsult.password, loginUser.password)){
                            socket.emit('isConnect', { connectCod: Buffer.from(userConsult.email+"::::"+loginUser.password).toString('base64') });
                            socket.emit('login', {status: 1, msg: 'Login efetuado com sucesso, estamos te redirecionando'});
                        }else{
                            socket.emit('login', {status: 0, msg: 'Login ou senha invalida'});
                        }
                    }else{
                        socket.emit('login', {status: 0, msg: 'Login ou senha invalida'});
                    }
                } catch (error) {
                     console.log(error);   
                }
                
            }else{
                socket.emit('login', {status: 0, msg: 'Login ou senha invalida'});
            }

        });
    }
}
