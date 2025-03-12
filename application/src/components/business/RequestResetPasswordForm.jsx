"use client"
import routes from "@/routes.js"
import api from "@/services/api.js"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import * as Yup from "yup"
import FormField from "../ui/FormField"
import { Button } from "../ui/button.jsx"

const RequestResetPasswordForm = () => {
  const initialValues = {
    email: "",
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().label("email"),
  })
  const router = useRouter()
  const handleSubmit = useCallback(
    async ({ email }) => {
      await api.post("/reset-password", { email })
      router.push(routes.home())
    },
    [router],
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
            name="email"
            label="email"
            type="email"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Envoyer la demande
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default RequestResetPasswordForm
