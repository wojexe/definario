module.exports = {
  pwa: {
    name: "Definario",
    description:
      "Definario jest progresywną aplikacją internetową, która pomoże ci w nauce nawet najtrudniejszych zagadnień z zakresu ponadpodstawowego i nie tylko.",
    display: "minimal-ui",
    themeColor: "#e389f0",
    msTileColor: "#e389f0",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      mobileWebAppCapable: "yes",
      backgroundColor: "#e389f0"
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
};
