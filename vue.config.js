module.exports = {
  pwa: {
    name: "Definario",
    description:
      "Definario jest progresywną aplikacją internetową, która pomoże ci w nauce nawet najtrudniejszych zagadnień z zakresu ponadpodstawowego i nie tylko.",
    display: "standalone",
    themeColor: "#e389f0",
    msTileColor: "#e389f0",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      mobileWebAppCapable: "yes",
      backgroundColor: "#e389f0",
      icons: [
        {
          src: "img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
};
