import {environment} from '../../environments/environment';

// Validation

export const VALIDATION_PATTERN_AMOUNT: any = /^\d{1,}$/;

// Common http root api
export const BACKEND_BASE_URL = environment.apiUrl;

export const BACKEND_API_AUTH: string = BACKEND_BASE_URL + '/fab/authenticate';
export const BACKEND_API_USERS: string = BACKEND_BASE_URL + '/fab/users';
export const BACKEND_API_BALANCE: string = BACKEND_BASE_URL + '/fab/balance/';
export const BACKEND_API_TRANSACTIONS: string = BACKEND_BASE_URL + '/fab/transactions/';
export const BACKEND_API_PURCHASE: string = BACKEND_BASE_URL + '/fab/purchase';

// statues
export const BE_STATUS_SUCCESS = '200';

export const ROLE_ADMIN = 'ADMIN';
export const ROLE_NON_ADMIN = 'NON_ADMIN';

// local Storage constants
export const LS_USER_STATUS = 'LS_USER_STATUS';
export const LS_LOGGED_IN_STATUS = 'LS_LOGGED_IN_STATUS';
export const LS_USER_ROLE = 'LS_USER_ROLE';
export const LS_USER_NAME = 'LS_USER_NAME';
export const LS_USER_ID = 'LS_USER_ID';
