<template>
    <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ project?.title }}</h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-around">
                        <h6>Created By: {{ project?.creator?.name }}</h6>
                        <h6>Created At:{{ project?.createdAt }}</h6>
                    </div>
                    <img class="project-img my-3" v-for="p in project?.projectImgs" :key="p" :src="p" alt="">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
export default {
    setup() {
        return {
            project: computed(() => AppState.activeProject)
        };
    },
};
</script>

<style lang="scss" scoped>
.project-img {
    height: auto;
    width: 100%;
    object-fit: cover;
    object-position: center;

}
</style>
