import api from "@/services/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function Confirmemailchange() {
  const router = useRouter()
  const { t } = useTranslation()
  const [message, setMessage] = useState(null)
  useEffect(() => {
    async function fetchData() {
      await api
        .get(`/verify-email-change?token=${router.query.token}`)
        .then((res) => {
          if (res.status === 200) {
            setMessage(t("changeEmail.changed"))
          }
        })
    }

    if (router.isReady) {
      fetchData()
    }
  }, [router.isReady, router.query.token, t])

  return (
    <div className="flex justify-center items-center h-screen m-auto">
      {message}
    </div>
  )
}
