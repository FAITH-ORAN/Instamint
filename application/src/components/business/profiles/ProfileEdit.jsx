"use client"

import apiRoutes from "@/apiRoutes.js"
import routes from "@/routes.js"
import api from "@/services/api.js"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import FormField from "../../ui/FormField.jsx"
import { Button } from "../../ui/button.jsx"

const ProfileEdit = (props) => {
  const { userId } = props
  const [error, setError] = useState(null)
  const fileInputRef = useRef()
  const { t } = useTranslation()
  const initialValues = {
    username: "",
    file: null,
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(8, "tooShort").max(30, "tooLong").optional(),
    file: Yup.mixed()
      .test(
        "fileSize",
        t("uploadContent.fileSize"),
        (value) => value && value.size <= 1073741824,
      )
      .test(
        "fileType",
        t("uploadContent.fileType"),
        (value) =>
          value &&
          [
            "image/png",
            "image/webp",
            "audio/ogg",
            "audio/flac",
            "video/mp4",
          ].includes(value.type),
      )
      .optional(),
  })
  const router = useRouter()
  const handleSubmit = useCallback(
    async ({ username, file }) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("username", username)
      formData.append("userId", userId)

      await api
        .post(apiRoutes.profile.update(), formData)
        .then(() => {
          router.push(routes.profile.read(userId))
        })
        .catch(() => {
          setError(t("profile.edit.error"))
        })
    },
    [router, t, userId],
  )

  return (
    <div className="w-full max-w-md p-1.5 border-spacing-px-4">
      <div className="flex flex-col text-red-500">
        {error && <p>{error}</p>}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0])
              }}
              className="mb-2 border-none"
            />

            <FormField
              className="w-full"
              name="username"
              label={t("profile.edit.username")}
              type="text"
            />
            <Button type="submit" className="mt-2 w-full">
              {t("profile.edit.save")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileEdit
