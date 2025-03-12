"use client"
import ChangeEmailForm from "@/components/business/ChangeEmailForm"
import ChangePasswordForm from "@/components/business/ChangePasswordForm"
import SettingHeader from "@/components/business/settings/SettingHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import routes from "@/routes"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

const AccountSecurity = () => {
  const router = useRouter()
  const { userId } = router.query
  const { t } = useTranslation()
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/check-2fa/${userId}`,
        )
        setIs2FAEnabled(response.data.is2FAEnabled)
      } catch (error) {
        toast.error(`Error fetching 2FA status: ${error.message}`)
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  const toggle2FA = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/toggle-2fa/${userId}`,
        { is2FAEnabled: !is2FAEnabled },
      )
      setIs2FAEnabled(response.data.is2FAEnabled)
    } catch (error) {
      toast.error(`Error toggling 2FA: ${error.message}`)
    }
  }

  return (
    <>
      <SettingHeader />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("settings.changeTwoFa")}</AccordionTrigger>
          <AccordionContent>
            <Button
              onClick={toggle2FA}
              className={`py-2 px-4 ${is2FAEnabled ? "bg-red-500" : null}`}
            >
              {is2FAEnabled ? t("settings.disable") : t("settings.enable")}
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("settings.changeEmail")}</AccordionTrigger>
          <AccordionContent>
            <ChangeEmailForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t("settings.changePassword")}</AccordionTrigger>
          <AccordionContent>
            <ChangePasswordForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default AccountSecurity
