class NewsController {
    //GET /new
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('hi');
    }
}

module.exports = new NewsController();
