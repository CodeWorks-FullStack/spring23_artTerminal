import { AppState } from "../AppState.js"
import { Project } from "../models/Project.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProjectsService {

    async getProjects() {
        const res = await api.get('api/projects')
        logger.log('[GETTING PROJECTS]', res.data)
        AppState.projects = res.data.map(p => new Project(p))
        logger.log('appstate projects', AppState.projects)
        // TODO sam what the heck is a proxy?
    }

    setActive(projectId) {
        const project = AppState.projects.find(p => p.id == projectId)
        AppState.activeProject = project
        logger.log(AppState.activeProject)
    }


    async getProjectsForProfile(query) {
        // const res = await api.get(`api/projects?creatorId=${profileId}`)
        // const res = await api.get('api/projects', { params: { creatorId: profileId } })
        const res = await api.get('api/projects', { params: query })
        logger.log('[GET PROJECTS FOR P]', res.data)
        AppState.projects = res.data.map(p => new Project(p))
    }
}

export const projectsService = new ProjectsService()