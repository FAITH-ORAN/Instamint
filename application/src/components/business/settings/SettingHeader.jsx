"use client"
import routes from "@/routes.js"
import { LockClosedIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import "react-toastify/dist/ReactToastify.css"

const SettingHeader = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="space-y-1">
      <Link href={routes.settings.accountSecurity(router.query.userId)}>
        <div
          className={`flex items-center space-x-2 p-1.5 text-2xl ${
            router.pathname ===
            routes.settings.accountSecurity(router.query.userId)
              ? "bg-gray-100"
              : ""
          }`}
        >
          <LockClosedIcon height={32} width={32} fontWeight={900} />
          {t("settings.title")}
        </div>
      </Link>
    </div>
  )
}

export default SettingHeader
