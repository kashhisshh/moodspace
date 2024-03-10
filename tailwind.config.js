export default  {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui:{
    themes: ["light", "dark", "cupcake"]
  }
};