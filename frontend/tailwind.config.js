/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");


export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}

