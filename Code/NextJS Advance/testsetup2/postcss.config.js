// # Các thư viện UI mạnh
// Dùng autoprefixer, cssnano, postcss

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
