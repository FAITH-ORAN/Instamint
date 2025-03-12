import UploadForm from "@/components/business/content/UploadForm"
import routes from "@/routes.js"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Button } from "../../components/ui/button"

const ContentManagementPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.signin())
    },
  })

  if (status === "loading") {
    return <p>{t("uploadContent.loading")}</p>
  }

  return (
    <div className="flex flex-col items-center justify-center p-1.5 border-spacing-px-4">
      <p className="text-lg mb-4">{t("uploadContent.titleUploadPage")}</p>
      <UploadForm />

      <Button
        className="m-1 p-1.5 w-full border-spacing-px-4"
        onClick={() => router.push("/contentManagement/contentList")}
      >
        {t("getAndDeleteContent.btnSeeAll")}
      </Button>
    </div>
  )
}

export default ContentManagementPage
