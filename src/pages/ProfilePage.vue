<template>
    <div class="container-fluid">
        <!-- SECTION profile details here -->
        <section class="row justify-content-center pt-3">
            <div class="col-9  text-center">
                <div class="position-relative">
                    <img class="coverImg " :src="profile?.coverImg" :alt="profile?.name + 'cover image'">
                    <img class="profile-img position-absolute" :src="profile?.picture" :alt="profile?.name">
                </div>
                <div class="pt-5">
                    <h1>{{ profile?.name }}</h1>
                    <i class="mdi mdi-school fs-2" v-if="profile?.graduated"></i>
                    <a v-if="profile?.github" :href="profile?.github"><i class="mdi mdi-github fs-2"></i></a>
                </div>
            </div>
        </section>

        <!-- SECTION profile projects here -->
        <section class="row">
            <div class="col-12">
                <h2 class="text-end p-2">{{ profile?.name }}'s Projects: {{ projects.length }}</h2>
            </div>
            <div class="col-12 col-md-3 my-3" v-for="p in projects" :key="p.id">
                <ProjectCard :project="p" />
            </div>
        </section>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { projectsService } from '../services/ProjectsService.js';

export default {
    setup() {
        const route = useRoute()

        async function getProfileById() {
            try {
                const profileId = route.params.profileId
                // logger.log('getting the profile', profileId)
                await profilesService.getProfileById(profileId)
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        async function getProjectsForProfile() {
            try {
                const profileId = route.params.profileId
                // NOTE we are querying projects, so we must format this object with they key:value pairs that coordinate with the project model
                await projectsService.getProjectsForProfile({ creatorId: profileId })
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        onMounted(() => {
            getProfileById()
            getProjectsForProfile()
        })

        return {
            route,
            profile: computed(() => AppState.activeProfile),
            projects: computed(() => AppState.projects)
        };
    },
};
</script>
<style scoped lang="scss">
.coverImg {
    height: 25vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-img {
    height: 15vh;
    width: 15vh;
    border-radius: 50%;
    bottom: -45px;
    left: 33vw;
}
</style>