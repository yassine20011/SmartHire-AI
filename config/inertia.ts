import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import { use } from 'react'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    flash: (ctx) => ctx.session?.flashMessages.all(),
    user: (ctx) => ctx.auth?.user,
    errors: (ctx) => ctx.inertia.always(() => ctx.session?.flashMessages.get('error')),
    path: (ctx) => ctx.request.url(),
    query: (ctx) => ctx.request.qs(),
    params: (ctx) => ctx.params,
    route: (ctx) => ctx.route?.name,
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx'
  }
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
