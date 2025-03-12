import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"
import { InvalidCredentialError } from "../error.js"
const verifyToken = async (token, c) => {
  try {
    const decodedPayload = await verify(
      token,
      process.env.SECURITY_SESSION_JWT_SECRET,
    )
    c.req.session = decodedPayload

    return true
  } catch (error) {
    throw new HTTPException(401, { res: InvalidCredentialError })
  }
}

export default verifyToken
