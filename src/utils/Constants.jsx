export const BASE_API_URL = 'https://nodeapi.tueducaciondigital.site/'
const BASE_URL_API_OPS = 'nodeapi.tueducaciondigital.site';
const BASE_URL_API_DEV = 'localhost';
const BACKEND_PORT = "3002"
const PROTOCOL = window.location.protocol;
export const HOST = PROTOCOL === 'https:' ? `${BASE_URL_API_OPS}` : `${BASE_URL_API_DEV}:${BACKEND_PORT}`;
//export const BASE_URL_API = `${window.location.protocol}//${HOST}/`;
export const BASE_URL_API = `https://nodeapi.tueducaciondigital.site/`;
export const URL_API_GHOST = `${BASE_URL_API}profile`;
export const URL_API_USER_TRACK = `${BASE_URL_API}usertrack`;
export const BASE_URL_FRONT_END = `https://clicspy.com/`;
export const URL_LOGIN = `${BASE_URL_FRONT_END}login`;
export const URL_DASHBOARD = `${BASE_URL_FRONT_END}dashboard`;
export const URL_FUNNELS = `${BASE_URL_FRONT_END}funnels`;
export const URL_CADEMY = `${BASE_URL_FRONT_END}ghost`;
export const NAME_HEADER_AUTH = "T-CS";