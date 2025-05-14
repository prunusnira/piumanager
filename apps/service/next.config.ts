import type { NextConfig } from 'next';
import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default withNextIntl(nextConfig);
