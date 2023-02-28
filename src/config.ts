// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Radio Volketa Interestelar";
export const SITE_DESCRIPTION =
  "Orbitando frecuencias";
export const TWITTER_HANDLE = "@noisk8";
export const MY_NAME = "Radio Volketa Interestelar";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
