import deleteUpload from "./deleteUpload.js"
import getUpload from "./getUpload.js"
import getUploadContentById from "./getUploadContentById.js"
import postUpload from "./postUpload.js"

const makeRoutesUpload = (app) => {
  postUpload(app)
  getUpload(app)
  deleteUpload(app)
  getUploadContentById(app)
}

export default makeRoutesUpload
