import { pluralize, camelize } from 'inflection';
import * as handlebars from 'handlebars';

handlebars.registerHelper({
    pluralize(str, options) {
        return pluralize(options.fn ? options.fn(str) : str);
    },
    camelize(str, options) {
        return camelize(options.fn ? options.fn(str) : str);
    },
    littleCamelize(str, options) {
        return camelize(options.fn ? options.fn(str) : str, true);
    },
    jsonStringify(obj) {
        return JSON.stringify(obj);
    }
});
export default handlebars;
