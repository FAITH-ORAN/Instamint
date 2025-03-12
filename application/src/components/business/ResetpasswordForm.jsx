"use client"
import api from "@/services/api.js"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import routes from "../../routes.js"
import FormField from "../ui/FormField"
import { Button } from "../ui/button.jsx"

const ResetpasswordForm = (props) => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const { token } = props
  const initialValues = {
    newPassword: "",
    password: "",
  }
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().min(8).required().label("Password"),
    password: Yup.string().min(8).required().label("Password"),
  })
  const router = useRouter()
  const handleSubmit = useCallback(
    async ({ newPassword, password }) => {
      setError(null)
      await api
        .post(
          "/reset",
          { newPassword, password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          router.push(routes.home())
        })
        .catch(() => {
          setError(t("resetPasswordForm.errorMessage"))
        })
    },
    [router, token, t],
  )

  return (
    <div className="lg:w-1/2 sm:w-full bg-medium px-5 py-5 rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            name="newPassword"
            label={t("resetPasswordForm.newPassword")}
            type="password"
            className="w-full"
          />
          <FormField
            name="password"
            label={t("resetPasswordForm.password")}
            type="password"
            className="w-full"
          />
          <Button type="submit" className="mt-2">
            {t("resetPasswordForm.reset")}
          </Button>
        </Form>
      </Formik>
      <div className="flex flex-col">{error && <p>{error}</p>}</div>
    </div>
  )
}

export default ResetpasswordForm
