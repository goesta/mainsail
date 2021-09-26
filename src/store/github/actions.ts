import {ActionTree} from 'vuex'
import {RootState} from '@/store/types'
import {GithubState} from '@/store/github/types'
import {commitFile, GithubConfig} from '@/api/github'


export const actions: ActionTree<GithubState, RootState> = {

    prepareGithubCommit({ state, commit, rootState, rootGetters, dispatch }, payload: { content: string, path: string }) {
        console.log('prepareGithubCommit2')
        if (!rootState?.gui?.github?.isEnabled) {
            console.log('return',state,rootState,rootGetters)
            return
        }
        commit('setFile', { content: payload.content, path: payload.path })
        commit('showDialog')
    },

    async commitFile({ state, commit, rootState, rootGetters, dispatch }, payload: { commitMessage: string }) {
        const githubConfig: GithubConfig = {
            accessToken: rootState?.gui?.github?.authToken,
            user: rootState?.gui?.github?.user,
            repo: rootState?.gui?.github?.repo,
            branch: rootState?.gui?.github?.branch,
            owner: rootState?.gui?.github?.owner
        }
        commit('setLoading', {isLoading: true})
        const destinationPath = `${rootState?.gui?.general.printername}/${state.path}`
        await commitFile(githubConfig, destinationPath, state.content, payload.commitMessage).finally(() => {
            commit('setLoading', {isLoading: false})
            commit('hideDialog')
        })

    },
}
