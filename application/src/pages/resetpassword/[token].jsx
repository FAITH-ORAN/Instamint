import ResetpasswordForm from "@/components/business/ResetpasswordForm"
import { useRouter } from "next/router"

export default function Resetpasswordpage() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-screen m-auto">
      <ResetpasswordForm token={router.query.token} />
    </div>
  )
}
