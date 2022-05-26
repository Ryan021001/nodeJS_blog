const Course = require('../models/course');
const { mongooseToObject } = require('../../until/mongoose');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class CourseController {
    // courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // GET courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // Post/courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoID}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAXPou9k_VPPy_6LDegTn9OkF23Ug`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // courses : "xem thong tin db"
    index(req, res) {
        Course.find({}).then((courses) => {
            res.json(courses);
        });
    }

    // Get courses/:id/edit
    edit(req, res, next) {
        Course.findById({ _id: req.params.id })
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // PUT courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // Delete courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Delete courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Patch courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Post courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteForce':
                Course.deleteMany({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid!' });
        }
    }
}

module.exports = new CourseController();
