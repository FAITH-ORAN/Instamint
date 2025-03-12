import ActivationSuccess from "@/components/business/ActiveSuccess"
import { useRouter } from "next/router"

export default function activationSuccess() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { userId } = router.query

  return (
    <>
      <ActivationSuccess id={userId} />
    </>
  )
}
