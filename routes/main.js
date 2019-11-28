var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/',function(req,res,next){
    res.render('principal', {title: 'Inicio'});
  });

module.exports = router;

