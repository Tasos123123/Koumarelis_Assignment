import WeatherRepository from './WeatherRepository';

const repositories = {
    'weather': WeatherRepository,
}
export default {
    get: name => repositories[name]
};