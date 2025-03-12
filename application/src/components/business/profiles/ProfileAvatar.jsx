"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "react-i18next"

const ProfileAvatar = (props) => {
  const { picture } = props
  const { t } = useTranslation()

  return (
    <div className="p-1.5 border-spacing-px-4">
      <Avatar>
        <AvatarImage src={picture || "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{t("profileAvatar.username")}</p>
    </div>
  )
}

export default ProfileAvatar
