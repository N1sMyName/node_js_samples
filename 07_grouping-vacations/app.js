const json = require('./example')
const sortVacations = () => {
    const result = []

    for (let jsonKey in json) {
        const obj = json[jsonKey]
        const key = obj.user.name.toString()
            const isAlreadyExist = result.find(r => r.userId === obj.user._id)
        if (isAlreadyExist) {
            isAlreadyExist.vacations.push({
                startDate: obj.startDate,
                endDate: obj.endDate
            })
            continue
        }
        result.push({
            userId: obj.user._id,
            userName: key,
            vacations: [{
                startDate: obj.startDate,
                endDate: obj.endDate
            }]
        })

    }
    console.log(`Result:\n`)
    console.log(JSON.stringify(result, null, 2))

}

sortVacations()