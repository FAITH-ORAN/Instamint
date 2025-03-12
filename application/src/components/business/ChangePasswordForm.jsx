"use client"
import { useTranslation } from "next-i18next"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup"
import { useCallback } from "react"
import { getSession } from "next-auth/react"
import api from "@/services/api"
import { Formik, Form } from "formik"
import PasswordFormFields from "./PasswordFormField"
import { Button } from "../ui/button.jsx"

export default function ChangePasswordForm() {
  const { t } = useTranslation()
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  })
  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      const session = await getSession()
      const { newPassword, confirmPassword } = values

      if (!session) {
        toast.error(t("error.notAuthenticated"))

        return
      }

      try {
        const response = await api.post("/request-password-change", {
          id: parseInt(session.user.id, 10),
          currentPassword: values.currentPassword,
          newPassword,
          confirmPassword,
        })

        if (response.status === 200) {
          toast.success(t("changePasswordForm.send"))
          resetForm()
        } else {
          toast.error(t("changePasswordForm.alert"))
        }
      } catch (error) {
        toast.error(t("changePasswordForm.alert"))
      }
    },
    [t],
  )

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <ToastContainer />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <PasswordFormFields />
              <div className="mt-8">
                <Button type="submit" className="mt-2 rounded">
                  {t("settings.changePasswordButton")}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
