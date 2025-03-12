import { TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { useTranslation } from "react-i18next"

const ContentTableHeader = () => {
  const { t } = useTranslation()

  return (
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
        <TableHead className="sm:table-cell text-center">
          {t("getAndDeleteContent.tableHeadUStatus")}
        </TableHead>
        <TableHead className="text-center">
          {t("getAndDeleteContent.tableHeadAction")}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default ContentTableHeader
