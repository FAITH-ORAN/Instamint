import { createContext } from "react"

export const ProfileDataProvider = (props) => {
  const { profileId, ...otherProps } = props

  return <ProfileDataContext.Provider {...otherProps} value={{ profileId }} />
}

const ProfileDataContext = createContext()

export default ProfileDataContext
