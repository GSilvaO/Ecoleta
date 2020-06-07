import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

// Importando os controladores
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

// Instanciando os controladores que foram importados
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Listando os items
routes.get('/items', itemsController.index);

// Listando todos os pontos de coleta
routes.get('/points', pointsController.index);
// Listando um único ponto de coleta
routes.get('/points/:id', pointsController.show);

// Criando o ponto de coleta
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }), 
    pointsController.create);

export default routes;