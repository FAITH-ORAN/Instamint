const routes = {
  home: () => "/",
  dashboard: () => "/dashboard",
  verifyMail: () => "/auth/verify",
  signin: () => "/auth/signin",
  profile: {
    read: (userId) => `/profile/${userId}/read-profile`,
    edit: (userId) => `/profile/${userId}/edit-profile`,
  },
  settings: {
    accountSecurity: (userId) => `/settings/${userId}/account-security`,
    information: (userId) => `/settings/${userId}/information`,
    index: () => `/settings/`,
  },
}

export default routes
