"use client"
import { Form, Formik } from "formik"
import FormField from "../ui/FormField"
import { Button } from "../ui/button"

const LoginForm = ({ initialValues, validationSchema, onSubmit, t }) => (
  <div className="w-full max-w-md p-1.5 border-spacing-px-4">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormField
          className="w-full"
          name="email"
          label={t("loginForm.email")}
          type="text"
        />
        <FormField
          name="password"
          label={t("loginForm.password")}
          type="password"
          className="w-full"
        />
        <Button type="submit" className="w-full py-2">
          {t("loginForm.signin")}
        </Button>
      </Form>
    </Formik>
  </div>
)

export default LoginForm
