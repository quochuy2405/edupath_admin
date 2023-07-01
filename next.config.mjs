/** @type {import('next').NextConfig} */
export const nextConfig = {
    reactStrictMode: true,
    env: {
        // BACKEND: "http://localhost:4000/",
        BACKEND: "https://node.edupath.ftisu.vn/",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};


