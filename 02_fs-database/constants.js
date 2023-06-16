export const postQuestions = [
    {
        type: 'input',
        message: "Enter user's name.To cancel press ENTER: ",
        name: 'user',
    },
    {
        type: 'list',
        message: 'Chose your gender: ',
        name: 'gender',
        choices: ['male', 'female'],
        when: (answers) => !!answers.user
    },
    {
        type: 'input',
        message: 'Enter your age: ',
        name: 'age',
        when: (answers) => !!answers.user
    }
]
export const getQuestions = [
    {
        type: 'list',
        message: "Would you like to search values in DB: ",
        name: 'getRequest',
        choices: ['yes', 'no'],
    },
    {
        type: 'input',
        message: "Enter user's name you want find in DB: ",
        name: 'name',
        when: (answers) => answers.getRequest !== 'no'
    }
]
