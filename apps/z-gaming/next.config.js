//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daisport-storage.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'zbox-dev.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'clipground.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'clipart-library.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'icon-library.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'zgbox-production.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'apibot.zgbox.click',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'apibot.zgamingbox.com',
        pathname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
