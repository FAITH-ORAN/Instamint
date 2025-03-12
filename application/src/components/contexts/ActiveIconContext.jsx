import { createContext, useCallback, useState } from "react"

export const ActiveIconProvider = (props) => {
  const [activeIcon, setActiveIcon] = useState(null)
  const handleSetActiveIcon = useCallback((value) => {
    setActiveIcon(value)
  }, [])

  return (
    <ActiveIconContext.Provider
      {...props}
      value={{ activeIcon, handleSetActiveIcon }}
    />
  )
}

const ActiveIconContext = createContext()

export default ActiveIconContext
