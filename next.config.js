// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline",
  "@fullcalendar/resource-timeline",
  "@fullcalendar/core",
]);

module.exports = withTM({
  // any other general next.js settings
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    SERVER_URI: process.env.SERVER_URI, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    SERVER_URI: process.env.SERVER_URI,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
    ATHLETES_URL: process.env.ATHLETES_URL,
    ATHLETES_API: process.env.ATHLETES_API,
  },
});
