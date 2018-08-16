'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

// Auth routes
Route.post('/auth/:action', 'AuthController.index')


Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route
  .group(() => {})

Route
  .resource('user', 'UserController')
  .apiOnly()
  .middleware('auth')

Route
  .resource('product', 'ProductController')
  .apiOnly()
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))

Route
  .resource('cart', 'CartController')
  .apiOnly()
  .middleware('auth')

Route.post('/media', 'MediaController.store').middleware('auth')