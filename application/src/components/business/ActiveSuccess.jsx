"use client"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import api from "@/services/api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ActivationSuccess = () => {
  const { t } = useTranslation()
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      const { id } = router.query

      if (id) {
        try {
          await api.patch(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/activation-success/${id}`,
          )
        } catch (error) {
          if (error.response) {
            // eslint-disable-next-line max-depth
            switch (error.response.status) {
              case 404:
                toast.error(t("activationSuccess.ressourceNotFound"))

                break

              case 500:
                toast.error(t("activationSuccess.internalError"))

                break

              default:
                toast.error(t("activationSuccess.activationError"))

                break
            }
          } else {
            toast.error(t("activationSuccess.activationError"))
          }
        }
      }
    }
    fetchData()
  }, [router.query, t])

  return (
    <>
      <div className="relative min-h-screen flex items-center flex-col overflow-hidden sm:py-12">
        <div className="relative shadow-xl  bg-white px-6 pb-8 pt-10 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-center flex-col">
              <img
                src="https://instamint.blob.core.windows.net/instamintcontainer/verify.png"
                height={40}
                width={40}
                alt="Email Picture"
                className="w-12 h-12 cursor-pointer mx-auto"
              />
              <h1 className="text-xl py-8 l">{t("activationSuccess.title")}</h1>
              <div className="text-gray-600">
                <p>{t("activationSuccess.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivationSuccess
