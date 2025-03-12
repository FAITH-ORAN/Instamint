"use client"
import SigupForm from "@/components/business/SigupForm"
import { useTranslation } from "react-i18next"

export default function Signup() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto">
      <h1 className="text-2xl font-extrabold">{t("signupPage.signup")}</h1>
      <SigupForm />
    </div>
  )
}
