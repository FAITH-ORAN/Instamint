import { Label } from "../ui/label"
import { ErrorMessage } from "formik"
import FormField from "../ui/FormField"
import { useTranslation } from "next-i18next"

export default function PasswordFormFields() {
  const { t } = useTranslation()

  return (
    <>
      <div>
        <Label htmlFor="currentPassword">{t("settings.currentPassword")}</Label>
        <FormField name="currentPassword" type="password" />
        <ErrorMessage
          name="currentPassword"
          component="div"
          className="text-red-600"
        />
      </div>
      <div>
        <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
        <FormField name="newPassword" type="password" />
        <ErrorMessage
          name="newPassword"
          component="div"
          className="text-red-600"
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
        <FormField name="confirmPassword" type="password" />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-600"
        />
      </div>
    </>
  )
}
