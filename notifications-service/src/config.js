import "dotenv/config"
import { z } from "zod"

const validationSchema = z.object({
  port: z.number().min(80).max(65535).int(),
})

let config = {
  port: Number(process.env.PORT),
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
