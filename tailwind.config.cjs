/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
      
    extend: {},
      
    backgroundImage: {
      'hero': "url('/bg.jpg')",
     
    }
  },
  
  

  plugins: [],
};

module.exports = config;
