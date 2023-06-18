const endpoints = require('./endpoints')
const axios = require("axios")
const getData = async () => {
    const promises = endpoints.map((endpoint) => axios.get(endpoint))
    for await (let promise of promises) {
        let isDone
        if (Object.hasOwn(promise.data, 'isDone')) {
            isDone = promise.data.isDone
            console.log(`[Success] ${promise.request.protocol}${promise.request.path}$ ${isDone}`)

        } else {
            isDone = findRecursively(promise.data)
            if (isDone === undefined) {
                continue
            }
            console.log(`[Success] ${promise.request.protocol}${promise.request.path}$ ${isDone}`)
        }

    }
}

getData().then()
// getData().then((data) => {

// data.forEach((res) => {
//         let isDone
//         if (Object.hasOwn(res.data, 'isDone')) {
//             isDone = res.data.isDone
//             console.log(`[Success] ${res.request.protocol}${res.request.path}$ ${isDone}`)
//
//         } else {
//             isDone = findRecursively(res.data)
//             if (isDone === undefined) {
//                 return
//             }
//             console.log(`[Success] ${res.request.protocol}${res.request.path}$ ${isDone}`)
//         }
//     }
// )
//     }
// )


function findRecursively(object) {
    for (const key in object) {
        if (key === 'isDone') {
            return object[key]
        }
        if (typeof object[key] === 'object') {
            return findRecursively(object[key])
        }
    }
}