import axios from "axios"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const useFetchContent = (session, t) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchContent = async () => {
      if (session && session.user && session.user.id) {
        try {
          const token = session.accessToken
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/upload/${session.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const formattedData = response.data.map((item) => ({
            ...item,
            uploadedAt: format(new Date(item.uploadedAt), "dd/MM/yyyy"),
          }))
          setRows(formattedData)
        } catch (error) {
          toast.error(t("getAndDeleteContent.errorGetContent"))
        }
      }
    }

    fetchContent()
  }, [session, t])

  return { rows, setRows }
}

export default useFetchContent
