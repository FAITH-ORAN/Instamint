import ProfileHeader from "@/components/business/ProfileHeader"
import ProfileContent from "@/components/business/profiles/ProfileContent"
import { ProfileDataProvider } from "@/components/contexts/ProfileDataContext"
import api from "@/services/api.js"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import routes from "../../../routes.js"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      userId: Number.parseInt(params.userId, 10),
    },
  },
})

export default function Profilepage(props) {
  const [minter, setMinter] = useState(null)
  const [userIdAuthenticated, setUserIdAuthenticated] = useState(null)
  const session = getSession()
  const router = useRouter()
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routes.home())
    },
  })
  useEffect(() => {
    async function fetchData() {
      try{
        const userIdAuth = await session.then((res) => res?.user.id)
        const result = await api.get(`api/minter/${userId}`)
        setMinter(result.data.result)
        setUserIdAuthenticated(userIdAuth)
      }catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message)
      }
    }
    fetchData()
  }, [])

  const {
    params: { userId },
  } = props

  return (
    <div>
      <ProfileDataProvider profileId={router.query.minterId}>
        <ProfileHeader userId={userId} minterId={minter} />
        {minter?.isProfileVisible ||
          (userId === userIdAuthenticated && <ProfileContent />)}
      </ProfileDataProvider>
    </div>
  )
}
