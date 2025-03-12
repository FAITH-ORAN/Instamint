import { Table } from "@/components/ui/table"
import useFetchContent from "@/services/contentService/useFetchContent"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  fetchDraftDetails,
  openDraftModalForExistingDraft,
  openDraftModalForNewDraft,
} from "../../../utils/contentUtils/contentTableUtils"
import { Button } from "../../ui/button"
import NFTModalComponent from "../nft/NFTModalComponent"
import ContentTableBody from "./ContentTableBody"
import { handleDelete, handleImageClick } from "./ContentTableHandlers"
import ContentTableHeader from "./ContentTableHeader"
import DraftModalComponent from "./DraftModalComponent"

// eslint-disable-next-line max-lines-per-function
const ContentTable = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const router = useRouter()
  const [selectedContentId, setSelectedContentId] = useState(null)
  const [selectedContentUrl, setSelectedContentUrl] = useState(null)
  const [selectedMarketplace, setSelectedMarketplace] = useState("")
  const [initialDraftValues, setInitialDraftValues] = useState({
    description: "",
    authorName: "",
    hashtag: "",
    location: "",
  })
  const [isDraftModalOpen, setDraftModalOpen] = useState(false)
  const [isNFTModalOpen, setNFTModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { rows, setRows } = useFetchContent(session, t)
  const handleOpenDraftModal = async (contentId, status) => {
    setSelectedContentId(contentId)
    const draftModalParams = {
      contentId,
      fetchDraftDetailsFn: fetchDraftDetails,
      setIsEditing,
      setDraftModalOpen,
      setInitialDraftValues,
      t,
    }

    if (status === "draft") {
      await openDraftModalForExistingDraft(draftModalParams)
    } else {
      openDraftModalForNewDraft({
        session,
        setInitialDraftValues,
        setIsEditing,
        setDraftModalOpen,
      })
    }
  }
  const closeDraftModal = () => {
    setDraftModalOpen(false)
    setSelectedContentId(null)
    setSelectedMarketplace("")
  }
  const openNFTModal = (contentId) => {
    setSelectedContentId(contentId)
    setSelectedContentUrl(rows.find((row) => row.id === contentId)?.contentUrl)
    setNFTModalOpen(true)
  }
  const closeNFTModal = () => {
    setNFTModalOpen(false)
    setSelectedContentId(null)
    setSelectedMarketplace("")
  }
  const handleMintClick = (marketplace) => {
    setSelectedMarketplace(marketplace)
  }

  return (
    <div className="w-full px-2 md:px-10 lg:px-20 xl:max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <Button
          className="shadow-md hover:bg-gray-200"
          onClick={() => router.push("/contentManagement")}
        >
          {t("uploadContent.btnNewUpload")}
        </Button>
      </div>
      <Table>
        <ContentTableHeader />
        <ContentTableBody
          rows={rows}
          handleImageClick={handleImageClick}
          openDraftModal={handleOpenDraftModal}
          handleDelete={(contentId) =>
            handleDelete({ contentId, session, setRows, translate: t })
          }
          openNFTModal={openNFTModal}
        />
      </Table>
      <DraftModalComponent
        isOpen={isDraftModalOpen}
        onClose={closeDraftModal}
        authorName={session?.user?.username}
        initialValues={initialDraftValues}
        contentId={selectedContentId}
        session={session}
        setRows={setRows}
        isEditing={isEditing}
        t={t}
      />
      <NFTModalComponent
        isOpen={isNFTModalOpen}
        onClose={closeNFTModal}
        contentId={selectedContentId}
        userId={session.user.id}
        contentUrl={selectedContentUrl}
        selectedMarketplace={selectedMarketplace}
        session={session}
        setSelectedMarketplace={setSelectedMarketplace}
        closeNFTModal={closeNFTModal}
        handleMintClick={handleMintClick}
        t={t}
      />
    </div>
  )
}

export default ContentTable
