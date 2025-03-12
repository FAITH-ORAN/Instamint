"use client"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

const VerifyAccount = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    setEmail(storedEmail || "")
  }, [])

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
              <h1 className="text-xl py-8 l">{t("verify.title")}</h1>
              <div className="text-gray-600">
                <p>
                  {t("verify.subtitle")} : <br />
                  <strong>{email}</strong>
                  <br />
                  {t("verify.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyAccount
