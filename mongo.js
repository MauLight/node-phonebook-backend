// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password, name and number as arguments')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://maulight:${password}@cluster0.zoll1gr.mongodb.net/phoneDB?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

// const Person = mongoose.model('Person', personSchema)

// if (process.argv.length === 3) {
//     console.log('Phonebook:')
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
//     return -1
// }

// const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4]
// })

// person.save().then(result => {
//     console.log('number saved!')
//     mongoose.connection.close()
// })