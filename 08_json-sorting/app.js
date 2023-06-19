const endpoints = require('./endpoints')
const axios = require("axios")


const processRetryCall = async (promise, retryCount) => {
    processApiCall(promise)
        .then((successMessage) => console.log(successMessage))
        .catch(error => {
            console.log(error.message)

            if (retryCount === 3) return
            retryCount++
            console.log(`Retry...${retryCount}`)

            processRetryCall(promise, retryCount)
        })
}
const processApiCall = async (promise) => {
    const response = await promise
    let isDone
    if (Object.hasOwn(response.data, 'isDone')) {
        isDone = response.data.isDone
        return `[Success] ${response.request.protocol}${response.request.path}$ ${isDone}`
    } else {
        isDone = findIsDoneRecursively(response.data)
        if (isDone === undefined) {
            await new Promise(((resolve, reject) => setTimeout(() => {
                reject(new Error(`[Fail] ${response.request.protocol}${response.request.path}$`))
            }, 2500)))
        }
        return `[Success] ${response.request.protocol}${response.request.path}$ ${isDone}`
    }
}

function findIsDoneRecursively(object) {
    for (const key in object) {
        if (key === 'isDone') return object[key]
        if (typeof object[key] === 'object') return findIsDoneRecursively(object[key])
    }
}

const start = async () => {
    const promises = endpoints.map(endpoint => axios.get(endpoint))

    for (const promise of promises) {
        let counter = 0
        processRetryCall(promise, counter).then()
    }
}

start().then()


