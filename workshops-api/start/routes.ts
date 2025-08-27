/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const WorkshopsController = () => import('#controllers/workshops_controller')

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.get('me', [AuthController, 'me']).use(middleware.auth())
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

router.get('/workshops', [WorkshopsController, 'index'])
