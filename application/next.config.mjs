import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  dest: "public",
})

export default withPWA({
  transpilePackages: ["next-auth"],
  images: {
    domains: ["example.com", "picsum.photos","instamint.blob.core.windows.net","res.cloudinary.com"],
  },
  reactStrictMode: true,
})
