"use client"
import routes from "@/routes"
import {
  GearIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useCallback, useContext } from "react"
import ActiveIconContext from "../contexts/ActiveIconContext"

const Footer = () => {
  const router = useRouter()
  const { activeIcon, handleSetActiveIcon } = useContext(ActiveIconContext)
  const handleSetting = useCallback(() => {
    handleSetActiveIcon("settings")
    router.push(routes.settings.index())
  }, [handleSetActiveIcon, router])
  const handleHome = useCallback(() => {
    handleSetActiveIcon("home")
    router.push("/")
  }, [handleSetActiveIcon, router])

  return (
    <footer className="bg-primary py-4 fixed bottom-0 w-full">
      <div className="flex justify-around items-center">
        <HomeIcon
          color={activeIcon === "home" ? "black" : "white"}
          height={32}
          width={32}
          fontWeight={900}
          onClick={handleHome}
        />
        <MagnifyingGlassIcon
          color={activeIcon === "search" ? "black" : "white"}
          height={32}
          width={32}
          fontWeight={900}
          onClick={() => handleSetActiveIcon("search")}
        />
        <HeartIcon
          color={activeIcon === "heart" ? "black" : "white"}
          height={32}
          width={32}
          fontWeight={900}
          onClick={() => handleSetActiveIcon("heart")}
        />
        <GearIcon
          color={activeIcon === "settings" ? "black" : "white"}
          height={32}
          width={32}
          fontWeight={900}
          onClick={handleSetting}
        />
      </div>
    </footer>
  )
}

export default Footer
