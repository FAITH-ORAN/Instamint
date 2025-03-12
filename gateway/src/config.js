import "dotenv/config"
import * as yup from "yup"

const validationSchema = yup.object().shape({
  port: yup.number().min(80).max(65535).required(),
  security: yup.object().shape({
    session: yup.object().shape({
      jwt: yup.object().shape({
        secret: yup.string().min(30).required(),
      }),
    }),
  }),
})

let config = null

try {
  config = validationSchema.validateSync(
    {
      port: process.env.PORT,
      security: {
        session: {
          jwt: {
            secret: process.env.SECURITY_SESSION_JWT_SECRET,
            expiresIn: "1 day",
          },
          password: {
            saltlen: 32,
            iterations: 123943,
            keylen: 256,
            digest: "sha512",
          },
        },
      },
      pagination: {
        limit: {
          min: 1,
          max: 100,
          default: 10,
        },
      },
    },
    { abortEarly: false },
  )
} catch (err) {
  throw new Error(`Invalid config.

- ${err.errors.join("\n- ")}

`)
}

export default config
