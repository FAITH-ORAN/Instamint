import RequestResetPasswordForm from "@/components/business/RequestResetPasswordForm"
import { useTranslation } from "react-i18next"

export default function Resetpasswordpage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto">
      <h1 className="text-2xl font-extrabold">{t("resetPassword.title")}</h1>
      <RequestResetPasswordForm />
    </div>
  )
}
