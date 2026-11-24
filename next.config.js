/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/car-service-washington-dc",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/black-car-service-dc",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/hourly-chauffeur-service",
        destination: "/",
        statusCode: 301,
      },
      {
        source:
          "/premier-international-transportation-washingtons-top-limo-service",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/services/worldwide-transportation",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/meeting-events-transportation",
        destination: "/events",
        statusCode: 301,
      },
      {
        source: "/services/special-events",
        destination: "/events",
        statusCode: 301,
      },
      {
        source: "/corporate-shuttle-service-washington-dc",
        destination: "/events",
        statusCode: 301,
      },
      {
        source:
          "/mini-coach-bus-rental-group-chauffeur-services-in-washington-dc",
        destination: "/events",
        statusCode: 301,
      },
      {
        source: "/services/wedding-limousine-service",
        destination: "/events",
        statusCode: 301,
      },
      {
        source: "/corporate-transportation",
        destination: "/corporate",
        statusCode: 301,
      },
      {
        source: "/private-security-and-diplomat-transportation",
        destination: "/diplomatic",
        statusCode: 301,
      },
      {
        source: "/burtonsville-md-to-washington-dca-airport-limo-black-car-service",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/great-falls-va-to-washington-dca-airport-limo-black-car-service",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/purcellville-va-to-washington-dca-airport-limo-black-car-service",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/gainesville-va-to-washington-dca-airport-limo-black-car-service",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;