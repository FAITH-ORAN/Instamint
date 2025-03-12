import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import hashPassword from "../../hashpassword.js"
import sendCreateMinterdData from "../../producer/createMinterProducer.js"
import { sendSignUpData } from "../../producer/signupProducer.js"
import { sanitizeUser } from "../../sanitizers.js"
import { signupSchema } from "../../validators.js"

const prisma = new PrismaClient()
const postSignup = ({ app }) => {
  app.post("/sign-up", zValidator("json", signupSchema), async (c) => {
    const { username, email, password } = await c.req.json()
    const [passwordHash, passwordSalt] = hashPassword(password)

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          passwordSalt,
        },
      })

      await sendSignUpData(user)

      return c.json({ result: sanitizeUser(user) })
    } catch (error) {
      throw new HTTPException(500, { res: error.message })
    }
  })

  app.patch("/activation-success/:userId", async (c) => {
    const userId = c.req.param("userId")

    if (!userId || userId.trim() === "") {
      throw new HTTPException(400, { res: "Missing user ID" })
    }

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId, 10),
        },
        data: {
          isActive: true,
        },
      })
      await sendCreateMinterdData(userId, "en")

      return c.json({ result: sanitizeUser(updatedUser) })
    } catch (error) {
      throw new HTTPException(500, { res: "Internal server error" })
    }
  })
}

export default postSignup
