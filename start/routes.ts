import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home page
const HomeController = () => import('#controllers/home_controller')
router.get('/', [HomeController, 'index']).as('home.index').use(middleware.guest())

const SignOutController = () => import('#controllers/auth/sign_outs_controller')
router.post('/sign_out', [SignOutController, 'handle'])

// Authentication routes
router
  .group(() => {
    const SignUpController = () => import('#controllers/auth/signup_controller')
    router.get('/signup', [SignUpController, 'show']).as('auth.signup.show')
    router.post('/signup', [SignUpController, 'handle']).as('auth.signup.handle')

    const LoginController = () => import('#controllers/auth/login_controller')
    router.get('/login', [LoginController, 'show']).as('auth.login.show')
    router.post('/login', [LoginController, 'handle']).as('auth.login.handle')
  }).use(middleware.guest())
// Dashboard routes
router
  .group(() => {
    // Candidate dashboard
    router.group(() => {
      const DashboardCandidatesController = () =>
        import('#controllers/dashboard/candidates_controller')
      router
        .get('/candidate', [DashboardCandidatesController, 'show'])
        .as('dashboard.candidates.show')
        .use(middleware.roleRestriction(['candidate']))
    })

    // Recruiter dashboard
    router.group(() => {
      const DashboardRecruitersController = () =>
        import('#controllers/dashboard/recruiters_controller')
      router
        .get('/recruiter', [DashboardRecruitersController, 'show'])
        .as('dashboard.recruiters.show')
        .use(middleware.roleRestriction(['recruiter']))
    })
  })
  .prefix('/dashboard')
  .use(middleware.auth())

// Features
router
  .group(() => {
    // Settings
    const SettingsController = () => import('#controllers/settings_controller')
    router.get('/settings', [SettingsController, 'show']).as('settings.show')
    router.patch('/settings', [SettingsController, 'patch']).as('settings.patch')
    router.post('/settings', [SettingsController, 'uploadResume']).as('settings.uploadResume')

    // Jobs management (recruiter only)
    const JobsController = () => import('#controllers/offers_controller')
    router
      .post('/offers/new', [JobsController, 'handle'])
      .as('offers.handle')
      .use(middleware.roleRestriction(['recruiter']))
    router
      .get('/offers', [JobsController, 'show'])
      .as('offers.show')
      .use(middleware.roleRestriction(['candidate']))
  })
  .use(middleware.auth())
