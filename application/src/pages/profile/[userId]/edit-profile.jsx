import ProfileEdit from "@/components/business/profiles/ProfileEdit"
import ProfileVisibility from "@/components/business/profiles/ProfileVisibility"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import routes from "@/routes.js"
import api from "@/services/api"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      userId: Number.parseInt(params.userId, 10),
    },
  },
})

export default function ProfileEditPage(props) {
  const { t } = useTranslation()
  const [minter, setMinter] = useState(null)
  const router = useRouter()
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(`api/minter/${userId}`)
      setMinter(result.data.result)
    }
    fetchData()
  }, [])

  const {
    params: { userId },
  } = props

  return (
    <div>
      <div className="flex justify-start items-center p-1.5 border-spacing-px-4">
        <Pencil1Icon height={32} width={32} fontWeight={900} />
        <h1 className="text-2xl font-extrabold p-1.5 border-spacing-px-4">
          {t("editProfilePage.title")}
        </h1>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("editProfilePage.change")}</AccordionTrigger>
          <AccordionContent>
            <ProfileEdit userId={userId} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("editProfilePage.visiblity")}</AccordionTrigger>
          <AccordionContent>
            <ProfileVisibility idMinter={minter} userId={userId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
