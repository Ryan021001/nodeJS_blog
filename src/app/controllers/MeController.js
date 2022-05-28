const Course = require('../models/course');
const { mongooseToObject } = require('../../until/mongoose');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class MeController {
    //GET me//stored/courses

    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCourses]) => {
                res.render('me/stored-course', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCourses,
                });
            })
            .catch(next);
    }

    //GET me//trash/courses

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/trash-course', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
