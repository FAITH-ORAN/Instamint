import "dotenv/config"
import { z } from "zod"

const validationSchema = z.object({
  port: z.number().min(80).max(65535).int(),
  azure: z.object({
    accountContainer: z.string(),
    connectionString: z.string(),
  }),
})

let config = {
  port: Number(process.env.PORT),
  azure: {
    accountContainer: process.env.AZURE_ACCOUNT_CONTAINER,
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  },
}

try {
  config = validationSchema.parse(config)
} catch (err) {
  if (err instanceof z.ZodError) {
    throw new Error(
      `Invalid config:\n- ${err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n- ")}`,
    )
  }

  throw err
}

export default config
