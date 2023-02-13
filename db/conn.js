const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function main(){
    await mongoose.connect('mongodb+srv://admin:365113sbbs@cursonode.ftf8dks.mongodb.net/pets?retryWrites=true&w=majority')

    console.log('Conectado ao MongoDB')
}

main().catch((err) => console.log(err))

module.exports = mongoose