const apiRoutes = {
  profile: {
    update: () => `${process.env.NEXT_PUBLIC_API_BASEURL}/update-user`,
  },
}

export default apiRoutes