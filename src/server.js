import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import path from 'path';

import auth from './routes/auth.routes';

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(history());
app.use(express.static(path.join(__dirname,"public"))); 

// rutas
app.use(auth);


// Settings confuguraciones
app.set('port', process.env.PORT || 3000);

export default function createServer() {
    app.listen(app.get('port'), () => {
        console.log('Servidor en el puerto' + app.get('port'));
    });
}