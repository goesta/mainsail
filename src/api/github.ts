import { Octokit } from '@octokit/rest'
import { RequestError } from '@octokit/request-error'

export interface GithubConfig {
    repo: string;
    branch: string;
    user: string;
    accessToken: string;
    owner: string;
}

function isOctokitRequestError(x: unknown): x is RequestError {
    return x instanceof RequestError
}

async function getUserRepos(octo: Octokit, githubConfig: GithubConfig) {
    return await octo.search.repos({
        q: `user:${githubConfig.user}`
    })
}

async function getLatestCommitSha(octo: Octokit, githubConfig: GithubConfig): Promise<string> {
    const {data: refData} = await octo.git.getRef({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        ref: `heads/${githubConfig.branch}`,
    })
    return refData.object.sha
}

async function getParentTreeSha(octo: Octokit, githubConfig: GithubConfig, commitSha: string): Promise<string> {
    const response = await octo.git.getCommit({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        commit_sha: commitSha,
    })
    return response.data.tree.sha
}

async function createBlob(octo: Octokit, githubConfig: GithubConfig, content: string): Promise<string> {
    const response = await octo.git.createBlob({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        content,
        encoding: 'utf-8',
    })
    return response.data.sha
}

async function createTree(octo: Octokit, githubConfig: GithubConfig, filePath: string, blobSsha: string, parentTreeSha: string): Promise<string> {
    const treeResponse = await octo.git.createTree({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        tree: [{
            path: filePath,
            mode: '100644',
            type: 'blob',
            sha: blobSsha,
        }],
        base_tree: parentTreeSha,
    })
    return treeResponse.data.sha
}

async function createCommit(octo: Octokit, githubConfig: GithubConfig, commitMessage: string, treeSha: string, commitSha: string): Promise<string> {
    const response = await octo.git.createCommit({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        message: commitMessage,
        tree: treeSha,
        parents: [commitSha],
    })
    return response.data.sha
}

async function updateRef(octo: Octokit, githubConfig: GithubConfig, commitSha: string) {
    const updateRefResponse = await octo.git.updateRef({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        ref: `heads/${githubConfig.branch}`,
        sha: commitSha,
    })
}

export async function commitFile(githubConfig: GithubConfig, path: string, content: string, commitMessage: string) {
    console.log(githubConfig, content, commitMessage)
    try {
        const octo = new Octokit({
            auth: githubConfig.accessToken
        })
        // const repos = await getUserRepos(octo, githubConfig)
        const commitSha = await getLatestCommitSha(octo, githubConfig)
        const parentTreeSha = await getParentTreeSha(octo, githubConfig, commitSha)
        const blobSsha = await createBlob(octo, githubConfig, content)
        const treeSha = await createTree(octo, githubConfig, path, blobSsha, parentTreeSha)
        const commit = await createCommit(octo, githubConfig, commitMessage, treeSha, commitSha)
        await updateRef(octo, githubConfig, commit)
    } catch (e) {
        if (e instanceof RequestError) {
            console.log(e.status, e.name, e.request, e.message, e)
            if (e.status === 401) {
                throw new Error('Please check your username and auth token')
            }
            if (e.status === 404) {
                throw new Error('Please check your username and repository')
            }
        }
        throw new Error('Error creating commit')
    }
}
