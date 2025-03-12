import { MixerVerticalIcon } from "@radix-ui/react-icons"
import { CameraIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"

const ProfileContent = () => {
  const [sortOrder, setSortOrder] = useState("DESC")
  const [data, setData] = useState([
    { id: 1, date: "2023-05-01", name: "https://picsum.photos/id/1/200/300" },
    { id: 2, date: "2023-04-01", name: "https://picsum.photos/id/2/200/300" },
    { id: 3, date: "2023-05-03", name: "https://picsum.photos/id/3/200/300" },
    { id: 4, date: "2023-05-03", name: "https://picsum.photos/id/4/200/300" },
    { id: 5, date: "2023-05-03", name: "https://picsum.photos/id/5/200/300" },
    { id: 6, date: "2023-05-03", name: "https://picsum.photos/id/6/200/300" },
    { id: 7, date: "2027-05-03", name: "https://picsum.photos/id/7/200/300" },
    { id: 8, date: "2023-05-03", name: "https://picsum.photos/id/8/200/300" },
    { id: 9, date: "2024-05-03", name: "https://picsum.photos/id/9/200/300" },
  ])
  const sortData = useCallback(() => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      return sortOrder === "DESC" ? dateB - dateA : dateA - dateB
    })
    setData(sortedData)
  }, [data, sortOrder])
  const handleOrderContent = useCallback(() => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC")
    sortData()
  }, [sortData, sortOrder])

  return (
    <div>
      <div className="flex justify-around p-1.5 border-spacing-px-4">
        <MixerVerticalIcon
          height={32}
          width={32}
          fontWeight={900}
          onClick={handleOrderContent}
        />
        <CameraIcon height={32} width={32} fontWeight={900} />
        <VideoIcon height={32} width={32} fontWeight={900} />
      </div>
      <div className="flex flex-wrap p-1.5 border-spacing-px-4">
        {data.map((item) => (
          <Image
            key={item.id}
            src={item.name}
            width={100}
            height={100}
            alt="Picture of the author"
            className="p-1.5 border-spacing-px-4 grow border-2 border-black"
            style={{ height: "auto" }}
            priority={false}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContent
