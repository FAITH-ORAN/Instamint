import axios from "axios"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

const MintHandler = ({
  contentId,
  userId,
  contentUrl,
  marketplace,
  session,
  closeNFTModal,
  setLoading,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    const handleMint = async () => {
      setLoading(true)

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/nft`,
          { contentId, contentUrl, marketplace },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              UserId: userId,
            },
          },
        )
        const { nft } = response.data

        if (nft) {
          toast.success(
            `${t("nft.nftMintSuccess")} Transaction hash: ${nft.transactionHash}`,
          )
        } else {
          toast.error(t("nft.nftMintError"))
        }

        closeNFTModal()
      } catch (err) {
         // eslint-disable-next-line no-console
         console.error(err)
      } finally {
        setLoading(false)
      }
    }

    handleMint()
  }, [
    contentId,
    userId,
    contentUrl,
    marketplace,
    session,
    t,
    closeNFTModal,
    setLoading,
  ])

  return null
}

export default MintHandler
