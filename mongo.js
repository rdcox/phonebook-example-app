const mongoose = require('mongoose')

// debugging prints
console.log('Length of argv: ', process.argv.length)
console.log(process.argv)

// check if input meets minimum arg requirement
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// establish connection to the mongo database
const password = process.argv[2]
const url =
  `mongodb+srv://rdcox:${password}@fullstack-open.bwmti.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// define a new schema for our person objects
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// if a name and number are provided, add them to the database
if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

if (process.argv.length === 3)
{
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}