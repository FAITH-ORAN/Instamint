import LoginFormUI from "@/components/business/LoginFormUI"
import { useTranslation } from "react-i18next"
const Login = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto">
      <h1 className="text-2xl font-extrabold">{t("signinPage.login")}</h1>
      <LoginFormUI />
    </div>
  )
}

export default Login
