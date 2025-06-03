/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 確保掃描所有 React 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
