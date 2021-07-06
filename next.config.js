const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/twitter',
        destination: 'https://twitter.com/daveroverts',
        permanent: true,
      },
      {
        source: '/youtube',
        destination: 'https://youtube.com/daveroverts',
        permanent: true,
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
})