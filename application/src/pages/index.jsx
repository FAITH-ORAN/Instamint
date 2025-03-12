import ListHomepage from "@/components/business/nft/ListHomepage"
import axios from "axios"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [data, setData] = useState([])
  const [usernames, setUsernames] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL}/nft-market`)
        setData(response.data)

        const usernamesMap = await Promise.all(
          response.data.map(async (item) => {
            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL}/user/${item.sellerId}`)

            
return { sellerId: item.sellerId, username: userResponse.data.result.username }
          })
        )
        const updatedUsernames = usernamesMap.reduce((acc, curr) => {
          acc[curr.sellerId] = curr.username

          
return acc
        }, {})

        setUsernames(updatedUsernames)
      } catch (error) {
        console.error("Failed to fetch data:", error) // eslint-disable-line no-console
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col items-center">
      {data.map((item) => (
        <ListHomepage
          key={item.id}
          id={item.nftId}
          name={`NFT #${item.nftId}`}
          img={item.contentUrl}
          author={`Seller: ${usernames[item.sellerId] || "Username not found"}`}
          likes={0}
        />
      ))}
    </div>
  )
}

export default HomePage
