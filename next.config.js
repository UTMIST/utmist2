import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
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

export default config;
