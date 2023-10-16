/**
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8040',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'http://localhost:8040',
      changeOrigin: true,
    },
  },
};
