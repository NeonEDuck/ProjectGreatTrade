var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.memno===null || req.session.memno===undefined){
    res.render('index', {id: null});
  }
  else{
    res.render('index', {id: req.session.memno});
  }
});

module.exports = router;
