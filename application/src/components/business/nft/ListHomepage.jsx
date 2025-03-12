import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

const ListHomepage = ({ id,name, img, author, likes }) => (
  <div className="flex flex-col my-10">
    <a className="font-bold text-xl">{name}</a>
    <Link href={`/nft/${id}`}>
      <Image
        width={300}
        height={300}
        src={img}
        alt={name}
        style={{ height: "auto" }}
        priority={true}
      />
    </Link>
    <a className="text-gray-400">{author}</a>
    <div className="flex justify-end">
      <FontAwesomeIcon icon={faHeart} className="text-red-600 pt-1" size="1x" />
      <a>{likes}</a>
    </div>
  </div>
)

export default ListHomepage
