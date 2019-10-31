const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        // The base URL for our REST api to be appended for queries
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }
}

module.exports = LaunchAPI;