module.exports = {
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
  }