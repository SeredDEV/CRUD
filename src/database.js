import mongoose from 'mongoose';

const uri = 'mongodb://localhost/Tienda';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}

export default async function conectDB() {
    await mongoose.connect(uri, options, () => {
        console.log('Base de  datos conectado');
    });
};