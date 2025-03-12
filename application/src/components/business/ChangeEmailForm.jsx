"use client"
import api from "@/services/api.js"
import { Form, Formik } from "formik"
import { getSession } from "next-auth/react"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Yup from "yup"
import FormField from "../ui/FormField"
import { Button } from "../ui/button.jsx"

const ChangeEmailForm = () => {
  const { t } = useTranslation()
  const initialValues = {
    newEmail: "",
  }
  const validationSchema = Yup.object().shape({
    newEmail: Yup.string().email().label("email"),
  })
  const handleSubmit = useCallback(async ({ newEmail }) => {
    const {
      user: { email },
    } = await getSession()
    await api
      .post("/request-email-change", {
        oldEmail: email,
        newEmail,
      })
      .then((res) => {
        if (res.status === 200) {
          toast(t("changeEmailForm.send"))
        } else {
          toast(t("changeEmailForm.alert"))
        }
      })
  }, [])

  return (
    <div className="w-full max-w-md p-1.5 border-spacing-px-4">
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            name="newEmail"
            label="email"
            type="email"
            className="w-full"
          />
          <Button type="submit" className="mt-2 rounded">
            {t("changeEmailForm.send")}
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default ChangeEmailForm
