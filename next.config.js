const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Add an alias for the public directory
    config.resolve.alias['public'] = path.join(__dirname, 'public');

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'lh3.googleusercontent.com',
      'i.pravatar.cc',
      'utmist-local.firebasestorage.app',
      'placeholder.pics',
    ],
  },
};
