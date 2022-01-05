import * as ServerlessHttp from 'serverless-http';
import 'source-map-support/register';

import app from './src/app';
export const handler = ServerlessHttp(app);
