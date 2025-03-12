import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import routes from "@/routes"
import api from "@/services/api"
import { getSession, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const InformationPage = () => {
  const [user, setUser] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const { i18n } = useTranslation()
  const session = getSession()
  const { status } = useSession()
  const router = useRouter()
  const handleClickLogout = () => {
    if (status === "authenticated") {
      signOut()
    }

    router.push("/")
  }
  const handleLanguageChange = (value) => {
    setSelectedLanguage(value)
    changeLanguage(value)
  }
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })
  useEffect(() => {
    async function fetchData() {
      const userIdAuth = await session.then((res) => res?.user.id)

      if (userIdAuth) {
        const { result } = await api
          .get(`/user/${userIdAuth}`)
          .then((res) => res.data)

        setUser(result)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 divide-y">
      <div className="p-1.5 border-spacing-px-4">
        <p>Email</p>
        <p>{user?.email}</p>
      </div>
      <div className="p-1.5 border-spacing-px-4">
        <p>Username</p>
        <p>{user?.username}</p>
      </div>
      <div className="p-1.5 border-spacing-px-4">
        <p>Changer de langue</p>
        <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Langue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">🇫🇷 Français</SelectItem>
            <SelectItem value="en">🇬🇧 English</SelectItem>
            <SelectItem value="es">🇪🇸 Español</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-1.5 border-spacing-px-4">
        <Button
          variant="destructive"
          className="rounded w-full"
          onClick={handleClickLogout}
        >
          Deconnexion
        </Button>
      </div>
    </div>
  )
}

export default InformationPage
