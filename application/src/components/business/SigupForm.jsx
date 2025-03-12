"use client"
import routes from "@/routes.js"
import api from "@/services/api.js"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import FormField from "../ui/FormField.jsx"
import { Button } from "../ui/button.jsx"

const SigupForm = () => {
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const initialValues = {
    email: "",
    password: "",
    username: "",
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().label("email"),
    password: Yup.string().min(8).required().label("Password"),
    username: Yup.string()
      .min(8, "tooShort")
      .max(30, "tooLong")
      .required("required"),
  })
  const router = useRouter()
  const handleSubmit = useCallback(
    async ({ email, password, username }) => {
      setError(null)
      localStorage.setItem("email", email)
      await api
        .post(`${process.env.NEXT_PUBLIC_API_BASEURL}/sign-up`, {
          username,
          email,
          password,
        })

        .then(() => {
          router.push(routes.verifyMail())
        })
        .catch(() => {
          setError(t("registerForm.errorMessage"))
        })
    },
    [router, t],
  )

  return (
    <div className="w-full max-w-md p-1.5 border-spacing-px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            className="w-full"
            name="username"
            label={t("registerForm.username")}
            type="text"
          />
          <FormField
            className="w-full"
            name="email"
            label={t("registerForm.email")}
            type="text"
          />
          <FormField
            name="password"
            label={t("registerForm.password")}
            type="password"
            className="w-full"
          />
          <Button type="submit" className="w-full py-2 mt-2">
            {t("registerForm.signup")}
          </Button>
        </Form>
      </Formik>
      <div className="flex flex-col">{error && <p>{error}</p>}</div>
    </div>
  )
}

export default SigupForm
