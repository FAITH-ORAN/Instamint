import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DraftModal from "./DraftModal"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { Button } from "../ui/button"

const ContentTable = () => {
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const { t } = useTranslation()
  const [isDraftModalOpen, setDraftModalOpen] = useState(false)
  const openDraftModal = () => setDraftModalOpen(true)
  const closeDraftModal = () => setDraftModalOpen(false)

  useEffect(() => {
    if (session && session.user && session.user.id) {
      const fetchContent = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/upload/${session.user.id}`,
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

      fetchContent()
    }
  }, [session])

  const handleImageClick = (url) => {
    window.open(url, "_blank")
  }
  const handleDelete = async (contentId) => {
    if (!contentId) {
      toast.error(t("getAndDeleteContent.noId"))
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/upload/${contentId}`,
      )
      setRows((prevRows) => prevRows.filter((row) => row.id !== contentId))
      toast.success(t("getAndDeleteContent.deletingSuccess"))
    } catch (error) {
      toast.error(t("getAndDeleteContent.delatingFailed"))
    }
  }

  return (
    <div className="w-full px-2 md:px-10 lg:px-20 xl:max-w-6xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              {t("getAndDeleteContent.tableHeadMiniature")}
            </TableHead>
            <TableHead className="hidden sm:table-cell text-center">
              {t("getAndDeleteContent.tableHeadType")}
            </TableHead>
            <TableHead className="hidden sm:table-cell text-center">
              {t("getAndDeleteContent.tableHeadUploadDate")}
            </TableHead>
            <TableHead className="text-center">
              {t("getAndDeleteContent.tableHeadAction")}
            </TableHead>
          </TableRow>
        </TableHeader>
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
              <TableCell className="space-x-2">
                <Button  onClick={openDraftModal} className="bg-blue-500 hover:bg-blue-200 px-4">
                  {t("getAndDeleteContent.btnDraft")}
                </Button>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DraftModal
        isOpen={isDraftModalOpen}
        onClose={closeDraftModal}
        authorName={session?.user?.username}
      />
    </div>
  )
}

export default ContentTable
