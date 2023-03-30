import { Profile } from "./Account.js"

export class Project {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.coverImg = data.coverImg
        this.creatorId = data.creatorId
        this.projectImgs = data.projectImgs
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.creator = new Profile(data.creator)
    }
}

