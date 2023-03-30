<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <form @submit.prevent="editAccount()" class="p-3">
    <div class="form-floating mb-3">
      <input type="text" v-model="accountEdit.name" class="form-control" id="name" placeholder="name">
      <label for="name">name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="accountEdit.picture" class="form-control" id="picture" placeholder="picture">
      <label for="picture">picture</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="accountEdit.coverImg" class="form-control" id="coverImg" placeholder="coverImg">
      <label for="coverImg">coverImg</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="accountEdit.github" class="form-control" id="github" placeholder="github">
      <label for="github">github</label>
    </div>
    <div class=" mb-3">
      <input type="checkbox" v-model="accountEdit.graduated" id="graduated">
      <label for="graduated">Graduated?</label>
    </div>
    <button type="submit">Edit Account</button>
  </form>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState.js'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
export default {
  setup() {
    const accountEdit = ref({})

    // NOTE watchEffect is a fancy 'appstate.on' and can handle re-rendering of the component based upon what is inside the watchEffect
    // NOTE this was to fix the form values on refresh.... when the appstate account changes, reference the appstate.account for my ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        logger.log('watching the account')
        accountEdit.value = { ...AppState.account }
      }
    })

    return {
      accountEdit,
      // NOTE computed gives me an 'up-to-date' version of what is in the appstate
      account: computed(() => AppState.account),

      async editAccount() {
        try {
          const edits = accountEdit.value
          await accountService.editAccount(edits)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
