import * as path from 'path';
import * as mustache from 'mustache';

try {
    const noEscape = v => v;
    let escapeDescriptor = Object.getOwnPropertyDescriptor(mustache, 'escape');
    if(mustache['default'] && mustache['default'].escape){
        console.log('override escape for default of mustache');
        mustache['default'].escape = noEscape;
    }else if(escapeDescriptor && escapeDescriptor.configurable){
        console.log('override escape for mustache');
        mustache.escape = noEscape;
    }
} catch (e) {
    console.log(e.stack || e);
}

let templ = `who is {{id}}, name is {{name}}`;
let data = {
    id: 'abcd',
    name: 'https://host:port/ctx/test'
};

console.log(mustache.render(templ, data));

export const WORK_DIR = path.join(__dirname);