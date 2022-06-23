import { AppDataSource } from "./data-source"
import "reflect-metadata";
import * as formData from 'express-form-data';
import * as bodyParser from "body-parser";
import * as express from 'express';
import { initRoutes } from "./routes";
// import { accessLog, errorRequestHandler } from "./middleware";
// import { config } from "./entity";
import * as config from 'config';
import * as fileUpload from 'express-fileupload';
const port = config.get("port")
const cors = require('cors');
var path = require('path');
let corsOptions = {
    origin : ['http://localhost:8080'],
}

AppDataSource.initialize().then(async () => {

    const app = express();
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors(corsOptions))
    app.use('/img',express.static(path.join(__dirname, '/images')));

    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload())
    // const options = {
    //     uploadDir: os.tmpdir(),
    //     autoClean: true
    //   };
    // app.use(formData.parse(options));
    // // delete from the request all empty files (size == 0)
    // app.use(formData.format());
    // // change the file objects to fs.ReadStream 
    // app.use(formData.stream());
    // // union the body and the files
    // app.use(formData.union());
    // app.use(accessLog)
    // register all application routes
    initRoutes(app)

    // app.use(errorRequestHandler);
    
    // run app
    app.listen(port);

    console.log(`Express application is up and running on port ${port}`);


}).catch(error => console.log(error))
