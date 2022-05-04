/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { CustomersController } from 'App/Controllers/Http/CustomersController';

Route.get('/', async ({auth, view , request, response}) => {
  return view.render('login', {
    title: 'Ferramentas Marketing'
  })
})
Route.get('/register', async ({auth, view , request, response}) => {
  await auth.use('web').authenticate();
  if(auth.use('web').user){
    response.redirect('/dashboard');
  }
  return view.render('register', {
    title: 'Ferramentas Marketing - Criar Conta'
  })
});
Route.get('/login/:idUser', "LoginController.isConnect");

Route.get('/dashboard', async ({ auth, view, request, response }) => {
  await auth.use('web').authenticate();
  if(!auth.use('web').user){
    response.redirect('/');
  }
  return view.render('dashboard', {
    title: 'Ferramentas Marketing - Dashboard'
  })

});
Route.get('/logout', async ({ auth, view, request, response }) => {
  await auth.use('web').logout()
  response.redirect('/')
});