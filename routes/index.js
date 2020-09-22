/*var User = require('mongoose').model('User');*/
var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userController.js')
/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});


router.get('/', (req, res, next) => {
	//res.send('respond with a resource');
 return User.find( ( err, clients ) => {
  if( !err ) {
    res.render('detail.ejs', {
      title: 'Details',
      clients: clients

    });

          //  console.log(clients);
        } else {
          return console.log( err );
        }
      });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
 // res.json(req.body);
   var personInfo = req.body; //Get the parsed information   


   if(!personInfo.username || !personInfo.fullname || !personInfo.age){
    res.send();
  } else {

/*    User.count(function(err,c){
      //console.log('Count is ' + c);
      var e = c+1;
      //console.log("e"+e);

      var newPerson = new User({
        unique_id:e,
        username: personInfo.username,
        fullname: personInfo.fullname,
        age: personInfo.age
      });

      newPerson.save(function(err, Person){
        if(err)
          console.log(err);
        else
          console.log('Success');
      });

    });*/
    var c=1;
    User.findOne({}, (err,data) => {
     
      if (data) {
        console.log("if");
         c = data.unique_id + 1;
      }

      var newPerson = new User({
        unique_id:c,
        username: personInfo.username,
        fullname: personInfo.fullname,
        age: personInfo.age
      });

      newPerson.save( (err, Person) => {
        if(err)
          console.log(err);
        else
          console.log('Success');
      });
      
    }).sort({_id: -1}).limit(1);

  }
  res.json({Success:'1'});
});

router.get('/show', (req, res, next) => {

  User.find( (err, response) => {
    res.json(response);
  });

});

router.put('/user/:id', (req, res) => {
  var id = req.params.id;
  console.log("id"+id);
  var personInfo = req.body;
  console.log()

  User.update({unique_id:id}, {
    username: personInfo.username, 
    fullname: personInfo.fullname, 
    age: personInfo.age
  }, (err, rawResponse) => {
   console.log(rawResponse);
 });

});

router.delete('/user/:id', (req, res) => {
  var id = req.params.id;
  console.log("id"+id);

  /*User.find({unique_id:id}, (err, data) => {
    data.remove();
  });*/
  User.findOneAndRemove({'unique_id' : id}, (err,offer) => {
    console.log('asa');
  });
  res.send("Success");
});

module.exports = router;
