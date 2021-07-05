import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// rutas  Routes
import auth from './routes/auth.routes';
app.use(auth);
import product  from './routes/product.routes';
app.use("/products", product);
import order from './routes/order.routes';
app.use("/orders", order);

// Middlewares
app.use(history());
app.use(express.static(path.join(__dirname,"public"))); 
app.use("/uploads", express.static(path.resolve("uploads")));

// Settings confuguraciones
app.set('port', process.env.PORT || 3000);

export default function createServer() {
    app.listen(app.get('port'), () => {
        console.log('Servidor en el puerto' + app.get('port'));
    });
}