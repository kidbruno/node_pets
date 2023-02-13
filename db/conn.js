const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function main(){
    await mongoose.connect('mongodb://localhost:27017/canil')

    console.log('Conectado ao MongoDB')
}

main().catch((err) => console.log(err))

module.exports = mongoose