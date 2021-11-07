import { AccessTokenType } from './TokenType';

export {};
declare global {
	namespace Express {
		interface Request {
			user?: AccessTokenType;
		}
	}
}
