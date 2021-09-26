import { getDefaultState } from './index'
import {MutationTree} from 'vuex'
import Vue from 'vue'
import {GithubState} from '@/store/github/types'

export const mutations: MutationTree<GithubState> = {
    reset(state) {
        Object.assign(state, getDefaultState())
    },

    showDialog(state) {
        Vue.set(state, 'isDialogVisible', true)
    },

    setFilename(state, filename) {
        Vue.set(state, 'filename', filename)
    },

    setFile(state, {path, content}) {
        Vue.set(state, 'path', path)
        Vue.set(state, 'content', content)
    },

    hideDialog(state) {
        Vue.set(state, 'isDialogVisible', false)
    },

    setLoading(state, {isLoading}) {
        Vue.set(state, 'isLoading', isLoading)
    },

    updateSourcecode(state, payload) {
        Vue.set(state, 'sourcecode', payload)
    }
}
