/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`,
  generateRobotsTxt: true, // (optional)
  // ...other options
};
