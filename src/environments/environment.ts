import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl:     'https://localhost:7223',
  menuApiUrl: 'assets/menu.json',
  app: { name: 'Anfexi App', version: '0.0.1' },
  company:    'ANFEXI TECHNOLOGIES',
};
