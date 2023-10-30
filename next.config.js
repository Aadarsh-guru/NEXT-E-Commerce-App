/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'aadarshguru-public.s3.amazonaws.com']
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
