/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary-red': '#862532',
        'primary-bg': '#ffffff',
        'secondary-bg': '#f5f5f5',
        'primary-accent': "#E6863C",
        'primary-text': "#000000",
        'secondary-text': 'rgba(0, 0, 0, 0.25)',

    },
  },
  plugins: [],
}
}
s