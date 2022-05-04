// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    
   async isConnect({session, auth, request, response}){
        var base64User = request.param('idUser');
        var decoded = Buffer.from(base64User, 'base64').toString('ascii');
        var [ email, password ] = decoded.split('::::');
        if(email && password){
            try {
                await auth.use('web').attempt(email, password);    
                response.redirect('/dashboard')    
            } catch (error) {    
                return response.badRequest('Invalid credentials');
            }
        }else{
            response.redirect('/');
        }
    }
}
