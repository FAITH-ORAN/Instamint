import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { AlreadyExist, NotFoundError } from "../../errors.js"
import { sanitizeUser } from "../../sanitizers.js"
const prisma = new PrismaClient()
const updateUser = ({ app }) => {
  app.post("/update-user", async (c) => {
    const formData = await c.req.formData()
    const username = formData.get("username")
    const userId = formData.get("userId")
    const file = formData.get("file")

    try {
      const minterId = await getMinterId(userId)

      if (file !== "undefined") {
        const contentId = await uploadPicture(file, userId)
        const contentUrl = await getUplodedContent(contentId)
        await updateMinterProfile(minterId, null, contentUrl)
      }

      if (username !== "undefined") {
        const existingUser = await prisma.user.findFirst({
          where: {
            username,
          },
        })

        if (existingUser) {
          throw new HTTPException(400, { res: AlreadyExist })
        }

        const user = await prisma.user.update({
          where: {
            id: Number.parseInt(userId, 10),
          },
          data: {
            ...(username && { username }),
          },
        })

        return c.json({ result: sanitizeUser(user) })
      }

      return c.json({ result: "Nothing to change" })
    } catch (error) {
      throw new HTTPException(404, { res: NotFoundError })
    }
  })
}
const uploadPicture = async (file, userId) => {
  const formUpload = new FormData()
  formUpload.append("file", file)
  const requestOptions = {
    method: "POST",
    body: formUpload,
    redirect: "follow",
  }
  const { contentId } = await fetch(
    `${process.env.URL_APPLICATION_CONTENT}/upload?userId=${userId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)

  return contentId
}
const getMinterId = async (userId) => {
  const { result } = await fetch(
    `${process.env.MINTER_SERVICE_URL}/minter/${userId}`,
  )
    .then((response) => response.json())
    .then((data) => data)

  return result
}
const updateMinterProfile = async (minterId, bio = null, picture = null) => {
  const raw = JSON.stringify({
    idMinter: minterId,
    picture,
    bio,
  })
  const requestOptions = {
    method: "PATCH",
    body: raw,
    redirect: "follow",
  }

  await fetch(`${process.env.MINTER_SERVICE_URL}/minter`, requestOptions)
    .then((response) => response.text())
    .then((result) => result)
}
const getUplodedContent = async (id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  }
  const { contentUrl } = await fetch(
    `${process.env.URL_APPLICATION_CONTENT}/uploaded-content/${id}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)

  return contentUrl
}

export default updateUser
