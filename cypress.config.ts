import { defineConfig } from 'cypress'
import pluginSetup from './cypress/plugins/index'

const baseUrl = 'http://localhost:3000'

export default defineConfig({
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  experimentalInteractiveRunEvents: true,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    setupNodeEvents(on) {
      return pluginSetup(on)
    },
    baseUrl,
  },
})
