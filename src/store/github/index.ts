import { GithubState} from '@/store/github/types'
import { Module } from 'vuex'
import { actions } from '@/store/github/actions'
import { mutations } from '@/store/github/mutations'
import { getters } from '@/store/github/getters'

export const getDefaultState = (): GithubState => {
    return {
        isDialogVisible: false,
        path: '',
        content: '',
        isLoading: false
    }
}

// initial state
const state = getDefaultState()

export const github: Module<GithubState, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
