import * as express from 'express';
import * as winston from 'winston';
import * as moment from 'moment';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Routes } from "./routes/Routes";

export class App {
    private readonly port: number;
    private readonly app: any;
    private readonly logger: any;
    private readonly path: string;

    constructor(basePath: string, port?: number) {
        this.port = port || 8000;
        this.app = express();
        this.logger = App.initWinston();
        this.path = basePath;
    }

    routes() {
        this.app.use('/', Routes());
    }

    logging() {
        const logger = this.logger;
        this.app.use(function (req, res, next) {
            logger.info(`Request IP: ${req.url}`);
            logger.info(`Request date: ${new Date()}`);
            next();
        });
    }

    cookie() {
        this.app.use(cookieParser());
    }

    body() {
        this.app.use(bodyParser.json({ limit: '200mb' }));
        this.app.use(
            bodyParser.urlencoded({
                limit: '200mb',
                extended: true
            })
        );
    }

    staticFiles(staticPath: string) {
        const rendererPath = path.join(this.path, staticPath);
        this.app.use('/', express.static(rendererPath));
    }

    setViewEngine(view?: string) {
        this.app.set('view engine', view || 'pug');
        this.app.set('views', path.join(this.path + 'src/views'));
    }

    init() {
        this.app.listen(this.port, () => {
            this.logger.info(`Server initialized at port ${this.port}`);
        })
    }

    private static initWinston(): any {
        const tsFormat = (time) => moment(time).format('DD-MM-YYYY hh:mm:ss').trim();
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.printf(log => {
                    return `[${log.level}/${tsFormat(log.timestamp)}] ${log.message}`;
                })
            ),
            transports: [
                new winston.transports.File({filename: 'log/error.log', level: 'error'}),
                new winston.transports.File({filename: 'log/combined.log'}),
            ]
        });

        logger.add(new winston.transports.Console({
            format: winston.format.combine()
        }));

        return logger;
    }
}