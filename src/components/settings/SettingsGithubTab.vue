<template>
    <div>
        <v-card flat>
            <v-card-text>

                <v-divider class="my-2"></v-divider>
                <settings-row :title="$t('Settings.GithubTab.Enable')" :sub-title="$t('Settings.GithubTab.EnableDescription')" :dynamicSlotWidth="true">
                  <v-switch v-model="isEnabled" hide-details class="mt-0"></v-switch>
                </settings-row>

                <settings-row :title="$t('Settings.GithubTab.User')">
                    <v-text-field v-model="user" hide-details outlined dense ></v-text-field>
                </settings-row>
                <v-divider class="my-2"></v-divider>

                <settings-row :title="$t('Settings.GithubTab.AuthToken')">
                  <v-text-field v-model="authToken" type="password" hide-details outlined dense ></v-text-field>
                </settings-row>
                <v-divider class="my-2"></v-divider>

              <settings-row :title="$t('Settings.GithubTab.Owner')">
                <v-text-field v-model="owner" hide-details outlined dense ></v-text-field>
              </settings-row>
              <v-divider class="my-2"></v-divider>

                <settings-row :title="$t('Settings.GithubTab.Repo')">
                  <v-text-field v-model="repo" hide-details outlined dense ></v-text-field>
                </settings-row>
                <v-divider class="my-2"></v-divider>

                <settings-row :title="$t('Settings.GithubTab.Branch')">
                  <v-text-field v-model="branch" hide-details outlined dense ></v-text-field>
                </settings-row>
                <v-divider class="my-2"></v-divider>

            </v-card-text>
        </v-card>

    </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import SettingsRow from '@/components/settings/SettingsRow.vue'
@Component({
    components: {SettingsRow}
})
export default class SettingsGithubTab extends Mixins(BaseMixin) {

    get isEnabled() {
        return this.$store.state.gui.github.isEnabled
    }

    set isEnabled(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.isEnabled', value: newVal})
    }

    get user() {
        return this.$store.state.gui.github.user
    }

    set user(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.user', value: newVal})
    }

    get repo() {
        return this.$store.state.gui.github.repo
    }

    set repo(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.repo', value: newVal})
    }

    get owner() {
        return this.$store.state.gui.github.owner
    }

    set owner(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.owner', value: newVal})
    }

    get authToken() {
        return this.$store.state.gui.github.authToken
    }

    set authToken(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.authToken', value: newVal})
    }

    get branch() {
        return this.$store.state.gui.github.branch
    }

    set branch(newVal) {
        this.$store.dispatch('gui/saveSetting', {name: 'github.branch', value: newVal})
    }

}
</script>
