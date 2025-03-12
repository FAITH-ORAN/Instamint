"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import api from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ProfileVisibility = (props) => {
  const { idMinter, userId } = props
  const { t } = useTranslation()
  const [visibility, setVisibility] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(`api/minter/profile/${userId}`)
      setVisibility(result.data.result.isProfileVisible)
    }
    fetchData()
  }, [])

  const handleOnChangeVisiblity = useCallback(async () => {
    if (visibility) {
      setVisibility(false)
      await api.patch(
        "/api/minter/visibility",

        {
          idMinter,
          visibility: false,
        },
      )
    } else {
      setVisibility(true)
      await api.patch(
        "/api/minter/visibility",

        {
          idMinter,
          visibility: true,
        },
      )
      toast(t("profileVisibility.warning"))
    }
  }, [visibility, idMinter])

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between p-1.5 border-spacing-px-4">
        <Label htmlFor="visibility-mode">
          {t("profileVisibility.visibility")}
        </Label>

        <Switch
          id="visibility-mode"
          checked={visibility}
          onCheckedChange={handleOnChangeVisiblity}
        />
      </div>
    </>
  )
}

export default ProfileVisibility
