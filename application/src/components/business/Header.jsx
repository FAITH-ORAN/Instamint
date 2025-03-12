"use client"
import { getSession, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import Logo from "../../../public/logo.svg"
import { Button } from "../ui/button"

import routes from "@/routes.js"
import { PersonIcon } from "@radix-ui/react-icons"
import ActiveIconContext from "../contexts/ActiveIconContext"

const Header = () => {
  const { status } = useSession()
  const router = useRouter()
  const { activeIcon, handleSetActiveIcon } = useContext(ActiveIconContext)
  const handleClickLogin = () => {
    router.push(routes.signin())
  }
  const handleClickProfile = async () => {
    const { user } = await getSession()
    handleSetActiveIcon("profile")
    router.push(`/profile/${user.id}/read-profile`)
  }

  return (
    <header className="flex bg-primary justify-between items-center py-2 px-2">
      <div className="flex items-center">
        <Image
          width={40}
          height={40}
          alt="Instamint Logo"
          src={Logo}
          priority={false}
          style={{ height: "auto" }}
          loading="lazy"
        />
        <h1 className="text-white">Instamint</h1>
      </div>
      <div className="flex justify-arround">
        {status === "authenticated" ? (
          <PersonIcon
            color={activeIcon === "profile" ? "black" : "white"}
            height={32}
            width={32}
            fontWeight={900}
            onClick={handleClickProfile}
          />
        ) : (
          <Button
            className="rounded-none"
            variant="outline"
            onClick={handleClickLogin}
          >
            Connexion
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
