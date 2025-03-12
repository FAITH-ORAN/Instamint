import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import routes from "@/routes.js"

export default function Profilepage() {
  const router = useRouter()
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })

  return <h1>ddd</h1>
}
