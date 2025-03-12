export const InvalidCredentialError = new Response("Unauthorized", {
  status: 401,
  headers: {
    Authenticate: 'error="invalid_token"',
  },
})

export const NotFoundError = new Response("Not Found", {
  status: 404,
  headers: {
    Authenticate: 'error="user_not_found"',
  },
})

export const AlreadyExist = new Response("Already Exist", {
  status: 400,
  headers: {
    Authenticate: 'error="already_exist"',
  },
})

export const ForbiddenError = new Response("Forbidden", {
  status: 403,
  headers: {
    Authenticate: 'error="forbidden"',
  },
})

export const InvalidPasswordError = {
  message: "Invalid current password",
  code: "INVALID_PASSWORD",
}
