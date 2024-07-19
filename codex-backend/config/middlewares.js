module.exports = [
  'strapi::errors',
  'strapi::security',
  // Ensure 'strapi::cors' is listed only once and configured as needed
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173'], // Adjust this to match your frontend URL
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];