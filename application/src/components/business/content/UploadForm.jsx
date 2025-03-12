import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { Form, Formik } from "formik"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Yup from "yup"

const MAX_SIZE = 1073741824
// eslint-disable-next-line max-lines-per-function
const UploadForm = () => {
  const [currentFileChoice, setCurrentFileChoice] = useState(null)
  const { t } = useTranslation()
  const { data: session } = useSession()
  const fileInputRef = useRef()
  const fileValidationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required(t("uploadContent.fileRequired"))
      .test(
        "fileSize",
        t("uploadContent.fileSize"),
        (value) => value && value.size <= MAX_SIZE,
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
      ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      t("uploadContent.termsMustAccept"),
    ),
  })
  const handleUpload = async ({
    file,
    acceptTerms,
    setSubmitting,
    resetForm,
  }) => {
    if (!acceptTerms) {
      toast.error(t("uploadContent.termsNotAccepted"))
      setSubmitting(false)

      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            UserId: session.user.id,
          },
        },
      )
      toast.success(t("uploadContent.uploadSuccess"))
      resetForm()
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            toast.error(t("uploadContent.fileExist"))

            break

          default:
            toast.error(t("uploadContent.uploadFailed"))

            break
        }
      } else {
        toast.error(t("uploadContent.uploadFailed"))
      }
    } finally {
      setSubmitting(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="p-4 border p-1.5 border-spacing-px-4">
      <ToastContainer />
      {currentFileChoice && (
        <Image
          src={currentFileChoice}
          alt="Preview"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
          style={{ height: "auto" }}
          priority={true}
        />
      )}

      <Formik
        initialValues={{ file: null, acceptTerms: false }}
        validationSchema={fileValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleUpload({
            file: values.file,
            acceptTerms: values.acceptTerms,
            setSubmitting,
            resetForm,
          })
        }}
      >
        {({ setFieldValue, values, isSubmitting, errors, touched }) => (
          <Form>
            <input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0])
                const [file] = event.target.files
                const reader = new FileReader()

                reader.onload = (e) => {
                  setCurrentFileChoice(e.target.result)
                }

                reader.readAsDataURL(file)
              }}
              className="mb-2 border-none"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                name="acceptTerms"
                className="bg-white"
                label={t("uploadContent.acceptTermsLabel")}
                onCheckedChange={(checked) => {
                  setFieldValue("acceptTerms", checked)
                }}
                checked={values.acceptTerms}
              />
              <small>{t("uploadContent.acceptTermsLabel")}</small>
            </div>
            {errors.acceptTerms && touched.acceptTerms && (
              <div className="text-red-500 text-sm mt-1">
                {errors.acceptTerms}
              </div>
              // eslint-disable-next-line max-lines
            )}
            <Button type="submit" disabled={isSubmitting}>
              {t("uploadContent.btnUpload")}
            </Button>
            {errors.file && touched.file && (
              <div className="text-red-500 text-sm mt-1">{errors.file}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UploadForm
