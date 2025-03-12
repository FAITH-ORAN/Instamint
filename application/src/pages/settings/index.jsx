import routes from "@/routes.js"
import { EyeOpenIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const SettingPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 divide-y">
      <div className="flex items-center">
        <EyeOpenIcon
          height={40}
          width={40}
          fontWeight={900}
          className="p-1.5 border-spacing-px-4"
        />
        <Link
          href={routes.settings.accountSecurity(session.user.id)}
          className="p-1.5 border-spacing-px-4"
        >
          {t("settings.title")}
        </Link>
      </div>
      <div className="flex items-center">
        <InfoCircledIcon
          height={40}
          width={40}
          fontWeight={900}
          className="p-1.5 border-spacing-px-4"
        />
        <Link
          href={routes.settings.information(session.user.id)}
          className="p-1.5 border-spacing-px-4"
        >
          {t("setting.information")}
        </Link>
      </div>
    </div>
  )
}

export default SettingPage
