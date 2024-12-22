/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%,100%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "1",
          },
        },

        landingTrans1: {
          '0%': {
            opacity:"0",
          },
          '50%':{
            opacity:"1",
            color: '#50f',
          },
          '100%': {
            opacity:"1",
            color: '#000',
          },
        },

        landingTrans2: {
          '0%': {
            transform: 'translateY(600px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },

      },
    },
  },
  plugins: [],
};
