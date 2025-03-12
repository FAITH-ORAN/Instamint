import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const NFTDetail = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [nft, setNft] = useState(null)
  const [seller, setSeller] = useState("")

  useEffect(() => {
    if (id) {
      const fetchNft = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/nft-market/${id}`,
          )
          setNft(response.data)

          const userResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/user/${response.data.sellerId}`,
          )
          setSeller(userResponse.data.result.username)
        } catch (error) {
          console.error("Failed to fetch NFT details:", error) // eslint-disable-line no-console
        }
      }

      fetchNft()
    }
  }, [id])

  if (!nft) {
    return <div>Loading...</div>
  }

  return (
    <div className="nft-detail">
      <h1 className="font-bold">{`NFT #${nft.nftId}`}</h1>
      <img src={nft.contentUrl} alt={`NFT #${nft.nftId}`} />
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faComment}
            className="text-gray-800"
            size="2x"
          />
          <span>{t("marketPlace.report")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="text-gray-800"
            size="2x"
          />
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="text-gray-400"
            size="2x"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold">
          {`${t("marketPlace.seller")}: `}
          <span className="font-normal">{seller}</span>
        </p>
        <p className="font-bold">
          {`${t("marketPlace.marketplace")}: `}
          <span className="font-normal">{nft.marketplaceName}</span>
        </p>
        <p className="font-bold">
          {`${t("marketPlace.status")}: `}
          <span className="font-normal">
            {nft.status === "listed"
              ? t("marketPlace.notAvailableStatus")
              : nft.status}
          </span>
        </p>
        {nft.price && (
          <p className="font-bold">
            {`${t("marketPlace.price")}: `}
            <span className="font-normal">{nft.price}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default NFTDetail
