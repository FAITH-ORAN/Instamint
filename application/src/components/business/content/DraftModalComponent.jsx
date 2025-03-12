import DraftModal from "./DraftModal"
import { handleDraftSave } from "./ContentTableHandlers"

const DraftModalComponent = ({
  isOpen,
  onClose,
  authorName,
  initialValues,
  contentId,
  session,
  setRows,
  isEditing,
  t,
}) => (
  <DraftModal
    isOpen={isOpen}
    onClose={onClose}
    authorName={authorName}
    onDraftSave={(draftData) =>
      handleDraftSave({
        draftData,
        selectedContentId: contentId,
        session,
        setRows,
        closeDraftModal: onClose,
        translate: t,
        isEditing,
      })
    }
    initialValues={initialValues}
    contentId={contentId}
    isEditing={isEditing}
  />
)

export default DraftModalComponent
