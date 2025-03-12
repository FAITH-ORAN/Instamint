import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"

const DraftModal = ({ isOpen, onClose, authorName }) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required(t("draftContent.descriptionRequired"))
      .max(500, t("draftContent.descriptionLength"))
      .matches(/^[^@#]*$/u, t("draftContent.descriptionNoMentionsOrHashtags")),
    authorName: Yup.string()
      .required(t("draftContent.authorNameRequired")),
    hashtags: Yup.string()
      .matches(/^(\w+)(,\s*\w+){0,4}$/u, t("draftContent.maxHashtags")),
    location: Yup.string()
  })
  const handleFormSubmit = (values, { resetForm }) => {
    toast.info(`Form submitted with values: ${JSON.stringify(values)}`)
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-md">
        <DialogHeader>
          <DialogTitle>{t("draftContent.dialogTitle")}</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            description: "",
            authorName,
            hashtags: "",
            location: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form>
              <div className="grid gap-4 py-4">
                <Field
                  type="text"
                  name="description"
                  placeholder={t("draftContent.dialogDescription")}
                  className="input-field border border-gray-400"
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
                <Field
                  type="text"
                  name="authorName"
                  className="input-field border border-gray-400"
                  readOnly
                />
                <ErrorMessage name="authorName" component="div" className="text-red-500" />
                <Field
                  type="text"
                  name="hashtags"
                  placeholder={t("draftContent.hashtagsPlaceholder")}
                  className="input-field border border-gray-400"
                />
                <ErrorMessage name="hashtags" component="div" className="text-red-500" />
                <Field
                  type="text"
                  name="location"
                  placeholder={t("draftContent.locationPlaceholder")}
                  className="input-field border border-gray-400"
                />
                <ErrorMessage name="location" component="div" className="text-red-500" />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
                  Submit
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default DraftModal
