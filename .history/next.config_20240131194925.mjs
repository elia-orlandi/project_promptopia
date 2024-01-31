/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                hostname: "*.googleusercontent.com",
            }
        ],
    }
};

export default nextConfig;
