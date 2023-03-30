<template>
    <div class="elevation-5 rounded selectable" @click="setActive(project.id)">
        <img class="rounded-top project-img" :src="project.coverImg" :alt="project.title" data-bs-toggle="modal"
            data-bs-target="#projectModal">
        <div class="d-flex justify-content-between p-2">
            <p>{{ project.title }}</p>
            <router-link :to="{ name: 'Profile', params: { profileId: project.creatorId } }">
                <img class="creator-img" :src="project.creator.picture" :alt="project.creator.name"
                    :title="project.creator.name">
            </router-link>
        </div>
    </div>
</template>


<script>
import { Project } from '../models/Project.js';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props:
    {
        project: { type: Project, required: true }
    },

    setup() {

        return {
            setActive(projectId) {
                try {
                    // logger.log('setting active', projectId)
                    projectsService.setActive(projectId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        };

    },
};
</script>
<style lang="scss" scoped>
.creator-img {
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
}

.project-img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>


