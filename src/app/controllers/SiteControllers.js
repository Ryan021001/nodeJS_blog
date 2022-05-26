const Course = require('../models/course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class SiteController {
    //GET /new
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            // truoc catch khong duoc dung dau ';'
            .catch(next);
    }
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
