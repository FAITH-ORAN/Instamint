import React, { useState } from "react"
import NFTModal from "./NFTModal"
import MintHandler from "./MintHandler"

const NFTModalComponent = ({
  isOpen,
  onClose,
  contentId,
  userId,
  contentUrl,
  selectedMarketplace,
  session,
  closeNFTModal,
  handleMintClick,
}) => {
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <NFTModal
        isOpen={isOpen}
        onClose={onClose}
        onSelectMarketplace={handleMintClick}
        isLoading={isLoading}
      />
      {selectedMarketplace && (
        <MintHandler
          contentId={contentId}
          userId={userId}
          contentUrl={contentUrl}
          marketplace={selectedMarketplace}
          session={session}
          closeNFTModal={closeNFTModal}
          setLoading={setLoading}
        />
      )}
    </>
  )
}

export default NFTModalComponent
