<style scoped>

</style>

<template>
  <v-dialog v-model="showDialog" persistent :width="400" open-delay="100">
    <v-card dark>
      <v-toolbar flat dense color="primary">
        <v-toolbar-title>
                    <span class="subheading">
                        <v-icon class="mdi mdi-github" left></v-icon>
                        Commit changes to Github?
                    </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-5" >
        <v-textarea
            outlined
            name="input-7-4"
            label="Commit message"
            rows="3"
            v-model="commitMessage"
        ></v-textarea>
        <div class="text-right " >
          <v-btn @click="cancel" color="secondary"
                 :disabled="loading">{{ $t("GithubDialog.cancel") }}</v-btn>
          <v-btn @click="commit" style="margin-left: 10px" color="primary" :loading="loading"
                 :disabled="loading">{{ $t("GithubDialog.commit") }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">

import Component from 'vue-class-component'
import {Mixins} from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'

@Component({})
export default class TheGithubCommitDialog extends Mixins(BaseMixin) {
  commitMessage = '';

  get show() {
      return this.$store.state.github.isDialogVisible
  }

  get showDialog() {
      return this.$store.state.github.isDialogVisible
  }

  get loading() {
      return this.$store.state.github.isLoading
  }

  cancel() {
      this.$store.commit('github/hideDialog')
  }

  commit() {
      this.$store.dispatch('github/commitFile', {commitMessage: this.commitMessage})
  }
}
</script>


