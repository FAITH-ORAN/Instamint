import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"
import { Button } from "../../ui/button"

const ContentTableBody = ({
  rows,
  handleImageClick,
  openDraftModal,
  handleDelete,
  openNFTModal,
}) => {
  const { t } = useTranslation()
  const getStatusLabel = (status) => {
    switch (status) {
      case "uploaded":
        return t("draftContent.statusUploded")

      case "draft":
        return t("draftContent.statusDraft")

      case "nft":
        return t("draftContent.statusMint")

      default:
        return "Unknown status"
    }
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell
            className="text-center"
            onClick={() => handleImageClick(row.contentUrl)}
          >
            <img
              src={row.contentUrl}
              alt="Miniature"
              className="w-12 h-12 cursor-pointer mx-auto"
            />
          </TableCell>
          <TableCell className="hidden sm:table-cell text-center">
            {row.fileType}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-center">
            {row.uploadedAt}
          </TableCell>
          <TableCell className="sm:table-cell text-center">
            {getStatusLabel(row.status)}
          </TableCell>
          <TableCell className="space-x-2">
            {row.status === "nft" ? (
              <span>NFT</span>
            ) : (
              <>
                {row.status === "draft" ? (
                  <>
                    <Button
                      className="px-4"
                      onClick={() => openNFTModal(row.id)}
                    >
                      {t("getAndDeleteContent.btnMint")}
                    </Button>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => openDraftModal(row.id, row.status)}
                    />
                  </>
                ) : (
                  <Button
                    onClick={() => openDraftModal(row.id, row.status)}
                    className="bg-blue-500 hover:bg-blue-200 px-4"
                  >
                    {t("getAndDeleteContent.btnDraft")}
                  </Button>
                )}
              </>
            )}
            {row.status !== "nft" && (
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(row.id)}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default ContentTableBody
