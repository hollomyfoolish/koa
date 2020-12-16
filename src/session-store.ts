const sessions = {};
export default {
    async get(key) {
        console.log(`get session for ${key}`);
        return sessions[key];
    },

    async set(key, value) {
        console.log(`set session for ${key}, value: ${value}`);
        sessions[key] = value;
    },

    async destroy(key) {
        console.log(`destroy session for ${key}`);
        sessions[key] = undefined;
    }
};