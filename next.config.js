

const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    //mapbox access token
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiZGF0dHJhbjI4NiIsImEiOiJjbTYxbHNubHowcG04MmpwcjBiZDBsbmdtIn0.FaectDY8Okdg09mdTqo-5w",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
