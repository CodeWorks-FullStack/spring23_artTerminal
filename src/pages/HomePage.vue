<template>
<div class="container-fluid">
  <section class="row p-4">
    <div class="col-12 col-md-3 my-4" v-for="p in projects" :key="p.id">
      <ProjectCard :project="p"/>
    </div>
  </section>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { projectsService} from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getProjects() {
  try {
    logger.log('getting projects')
    await projectsService.getProjects()
  } catch (error) {
    Pop.error(error.message)
    logger.log(error.message)
  }
    }

    onMounted(() => {
      getProjects()
    })

    return {
      projects: computed(()=> AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
