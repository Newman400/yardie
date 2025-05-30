const nextConfig = {
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig