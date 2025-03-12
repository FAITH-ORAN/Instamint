import getDraft from "./getDraft.js"
import postDraft from "./postDraft.js"
import updateStatus from "./postUpdateStatus.js"
import putDraft from "./putDraft.js"

const makeRoutesDraft = (app) =>{
  postDraft(app)
  getDraft(app)
  putDraft(app)
  updateStatus(app)
}

export default makeRoutesDraft