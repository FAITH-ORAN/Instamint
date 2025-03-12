"use client"

import api from "@/services/api"
import { useEffect, useState } from "react"
import ProfileAvatar from "./profiles/ProfileAvatar"
import ProfileBadges from "./profiles/ProfileBadges"
import ProfileStatistic from "./profiles/ProfileStatistic"
const ProfileHeader = (props) => {
  const { userId } = props
  const [pictureUrl, setPictureUrl] = useState(null)
  const [bioMinter, setBioMinter] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try{
        const { picture, bio } = await api
        .get(`/api/minter/profile/${userId}`)
        .then((res) => res.data.result)
      setPictureUrl(picture)
      setBioMinter(bio)
      }catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-1.5 border-spacing-px-4">
      <div className="flex justify-around items-center p-1.5 border-spacing-px-4">
        <ProfileAvatar picture={pictureUrl} />
        <ProfileStatistic unit="followers" number="12" />
        <ProfileStatistic unit="following" number="12" />
        <ProfileStatistic unit="tea bags" number="12" />
      </div>
      <div>
        <p>{bioMinter}</p>
      </div>
      <div className="p-1.5 border-spacing-px-4">
        <ProfileBadges userId={userId} />
      </div>
    </div>
  )
}

export default ProfileHeader
