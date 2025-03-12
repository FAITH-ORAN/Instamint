"use client"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import { Button } from "../ui/button"
import LoginForm from "./LoginForm"
import { handleSubmit, handleVerifyOTP } from "./LoginHandler"

const LoginFormUI = () => {
  const [error, setError] = useState(null)
  const [requires2FA, setRequires2FA] = useState(false)
  const [qrCodeDataURL, setQRCodeDataURL] = useState("")
  const [otp, setOTP] = useState("")
  const { t } = useTranslation()
  const [tempToken, setTempToken] = useState("")
  const router = useRouter()
  const initialValues = { email: "", password: "" }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("email"),
    password: Yup.string().min(5).required().label("Password"),
  })
  const onSubmit = (values) =>
    handleSubmit(values, {
      setError,
      setTempToken,
      setRequires2FA,
      setQRCodeDataURL,
      router,
      t,
      signIn,
    })

  return (
    <>
      {!requires2FA ? (
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          t={t}
        />
      ) : (
        <div className="w-full max-w-md p-1.5 border-spacing-px-4">
          <img src={qrCodeDataURL} alt="QR Code" className="mb-4" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder={t("loginForm.checkOtp")}
            className="mb-4 p-2 border rounded-none w-full"
          />
          <Button
            onClick={() =>
              handleVerifyOTP(tempToken, otp, {
                setError,
                router,
                t,
                signIn,
              })
            }
            className="w-full py-2"
          >
            {t("loginForm.otp")}
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="flex flex-col py-4 w-full">
        <Link href="/auth/signup" className="hover:underline ">
          {t("loginForm.signup")}
        </Link>
        <Link href="/resetpassword" className="hover:underline">
          {t("loginForm.forgotPassword")}
        </Link>
      </div>
    </>
  )
}

export default LoginFormUI
