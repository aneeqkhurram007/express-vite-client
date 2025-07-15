import http from 'http';
import fs from 'fs';
import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';

import config from '@/configs';

async function bootstrap() {
  try {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());

    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'templates'));
    app.use(express.static('client/dist'));

    app.get('/ping', (_, response: Response) => {
      response.json({ message: 'pong' });
    });

    const routesPath = './src/routes';

    if (fs.existsSync(routesPath)) {
      const routeFiles = fs.readdirSync(routesPath);

      for (const routeFile of routeFiles) {
        try {
          const routeName = path.parse(routeFile).name;
          const routeModule = await import(`./routes/${routeFile}`);
          app.use(`/api/v1/${routeName}`, routeModule.default);
        } catch (error) {
          console.error(`Failed to load route ${routeFile}:`, error);
        }
      }
    }

    app.use('/template/:name', (request: Request, response: Response) => {
      const { name } = request.params;
      response.render(name, { username: 'John Doe', isAdmin: true });
    });

    app.use('/', (_, response: Response) => {
      const indexPath = path.resolve('client/dist/index.html');
      if (fs.existsSync(indexPath)) {
        response.sendFile(indexPath);
      } else {
        response.status(404).json({ message: 'Page not found' });
      }
    });

    app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
      response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message ?? error,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.path,
        method: request.method,
        error: error.name,
        ...(app.get('env') === 'development' ? { stack: error.stack } : {}),
      });

      next();
    });

    const server = http.createServer(app);

    server.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
