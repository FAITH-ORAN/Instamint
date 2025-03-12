import axios from "axios"
import { toast } from "react-toastify"

export const handleImageClick = (url) => {
  window.open(url, "_blank")
}

export const handleDelete = async ({
  contentId,
  session,
  setRows,
  translate,
}) => {
  if (!contentId) {
    toast.error(translate("getAndDeleteContent.noId"))

    return
  }

  try {
    const token = session.accessToken
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/upload/${contentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setRows((prevRows) => prevRows.filter((row) => row.id !== contentId))
    toast.success(translate("getAndDeleteContent.deletingSuccess"))
  } catch (error) {
    toast.error(translate("getAndDeleteContent.deletingFailed"))
  }
}

export const handleDraftSave = async ({
  draftData,
  selectedContentId,
  session,
  setRows,
  closeDraftModal,
  translate,
  isEditing,
}) => {
  try {
    const token = session.accessToken
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_BASEURL}/draft/${selectedContentId}`
      : `${process.env.NEXT_PUBLIC_API_BASEURL}/draft`
    const method = isEditing ? "put" : "post"

    await axios({
      method,
      url,
      data: {
        contentId: selectedContentId,
        ...draftData,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedContentId ? { ...row, status: "draft" } : row,
      ),
    )

    toast.success(translate("draftContent.draftSaveSuccess"))
    closeDraftModal()
  } catch (error) {
    toast.error(translate("draftContent.draftSaveError"))
  }
}
