module.exports = {
  // # Các thư viện UI mạnh / Dùng autoprefixer, cssnano, postcss
  plugins: {
    tailwindcss: {},
    // autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
