const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextTranslate = require("next-translate");

const config = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/PokeAPI/**",
            },
        ],
    },
};

module.exports = withPlugins([[withBundleAnalyzer], [nextTranslate]], config);
