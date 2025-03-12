import ContentTable from "@/components/business/content/ContentTable"
import routes from "@/routes.js"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ContentListPage = () => {
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
    <div className="text-center mt-6 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold  p-1.5 border-spacing-px-4">
        {t("getAndDeleteContent.title")}
      </h1>
      <div className="flex justify-center items-center  p-1.5 border-spacing-px-4">
        <ContentTable />
      </div>
    </div>
  )
}

export default ContentListPage
