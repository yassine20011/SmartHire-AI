/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')

const SignUpController = () => import('#controllers/auth/signup_controller')
router.get('/signup', [SignUpController, 'show']).as('auth.signup.show')
router.post('/signup', [SignUpController, 'handle']).as('auth.signup.handle')


const LoginController = () => import('#controllers/auth/login_controller')
router.get('/login', [LoginController, 'show']).as('auth.login.show')
router.post('/login', [LoginController, 'handle']).as('auth.login.handle')
