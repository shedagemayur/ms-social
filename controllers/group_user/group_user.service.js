const dbModels = require('../../models');
const GroupUserModel = dbModels['onDemandDB'].group_user;
let excludeColumns = ['deletedAt'];

let GroupUserService = {

    findAll: async (guid, whereAddOn = {}) => {
        const whereClause = { guid: guid };

        return new Promise(function (resolve, reject) {
            GroupUserModel.findAll({ where: { ...whereClause, ...whereAddOn }, attributes: { exclude: excludeColumns }, raw: true })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });
    },

    findOne: async (guid, uid) => {

        return new Promise(function (resolve, reject) {
            GroupUserModel.findOne({ where: { guid: guid, uid: uid }, attributes: { exclude: excludeColumns }, raw: true })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });
    },

    create: async (body) => {

        return new Promise(function (resolve, reject) {
            GroupUserModel.create(body)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });
    },

    update: async (guid, uid, body) => {

        return new Promise(function (resolve, reject) {
            GroupUserModel.update(body, { where: { guid: guid, uid: uid } })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });
    },

    delete: async (guid, uid) => {

        return new Promise(function (resolve, reject) {
            GroupUserModel.destroy({ where: { guid: guid, uid: uid } })
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
        });
    }
};

module.exports = GroupUserService;