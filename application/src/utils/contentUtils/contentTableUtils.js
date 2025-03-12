import axios from "axios"
import { toast } from "react-toastify"

export const fetchDraftDetails = async (
  contentId,
  setInitialDraftValues,
  t,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/draft/${contentId}`,
    )
    setInitialDraftValues({
      description: response.data.description || "",
      authorName: response.data.authorName || "",
      hashtag: response.data.hashtag.join(", ") || "",
      location: response.data.location || "",
    })
  } catch (error) {
    toast.error(t("draftContent.loadFailed"))
  }
}

export const openDraftModalForExistingDraft = async ({
  contentId,
  fetchDraftDetailsFn,
  setIsEditing,
  setDraftModalOpen,
  setInitialDraftValues,
  t,
}) => {
  await fetchDraftDetailsFn(contentId, setInitialDraftValues, t)
  setIsEditing(true)
  setDraftModalOpen(true)
}

export const openDraftModalForNewDraft = ({
  session,
  setInitialDraftValues,
  setIsEditing,
  setDraftModalOpen,
}) => {
  setInitialDraftValues({
    description: "",
    authorName: session?.user?.username || "",
    hashtag: "",
    location: "",
  })
  setIsEditing(false)
  setDraftModalOpen(true)
}
