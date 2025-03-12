import { badgeVariants } from "@/components/ui/badge"
import routes from "@/routes.js"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const ProfileBadges = (props) => {
  const { userId } = props
  const { t } = useTranslation()

  return (
    <div className="flex justify-around p-1.5 border-spacing-px-4">
      <Link
        className={badgeVariants({ variant: "outline" })}
        href={routes.profile.edit(userId)}
      >
        {t("ProfileBadges.edit")}
      </Link>
      <Link className={badgeVariants({ variant: "outline" })} href="/">
        {t("ProfileBadges.shareProfile")}
      </Link>
      <Link
        className={badgeVariants({ variant: "outline" })}
        href="/contentManagement/contentList"
      >
        {t("ProfileBadges.Add")}
      </Link>
    </div>
  )
}

export default ProfileBadges
