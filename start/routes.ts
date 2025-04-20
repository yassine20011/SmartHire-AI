import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/home').renderInertia('home').use(middleware.guest())

const SignUpController = () => import('#controllers/auth/signup_controller')
router.get('/signup', [SignUpController, 'show']).as('auth.signup.show').use(middleware.guest())
router
  .post('/signup', [SignUpController, 'handle'])
  .as('auth.signup.handle')
  .use(middleware.guest())

const LoginController = () => import('#controllers/auth/login_controller')
router.get('/login', [LoginController, 'show']).as('auth.login.show').use(middleware.guest())
router.post('/login', [LoginController, 'handle']).as('auth.login.handle').use(middleware.guest())

// candidate dashboard
const DashboardCandidatesController = () => import('#controllers/dashboard/candidates_controller')
router
  .get('/dashboard/candidate', [DashboardCandidatesController, 'show'])
  .as('dashboard.candidates.show')
  .use(middleware.auth())
  .use(middleware.roleRestriction(['candidate']))

// recruiter dashboard
const DashboardRecruitersController = () => import('#controllers/dashboard/recruiters_controller')
router
  .get('/dashboard/recruiter', [DashboardRecruitersController, 'show'])
  .as('dashboard.recruiters.show')
  .use(middleware.auth())
  .use(middleware.roleRestriction(['recruiter']))

// settings
const SettingsController = () => import('#controllers/settings_controller')
router.get('/settings', [SettingsController, 'show']).as('settings.show').use(middleware.auth())

// jobs
const JobsController = () => import('#controllers/jobs_controller')
router
  .get('/jobs/new', [JobsController, 'show'])
  .as('jobs.show')
  .use(middleware.auth())
  .use(middleware.roleRestriction(['recruiter']))
