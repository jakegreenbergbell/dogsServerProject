// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()     // define our app using express
app.use(express.static(__dirname + '/public'))

//mongo Beginssss....
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://jakegb:password1@ds227853.mlab.com:27853/jake',
{useNewUrlParser:true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('jake') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')})
  })

// configure app to use bodyParser() and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')

// get an instance of the express Router
var router = express.Router();

//a “get” at the root of our web app: http://localhost:3000/api
router.get('/', function(req, res) {
  db.collection('jake').find().toArray(function(err, results) {
    res.render('index.ejs', {jake: results})
    //console.log(results)
  })
})

//delete an entry from the db
router.get('/delete/:name', function(req,res) {
  var dogName = req.params.name
  console.log(dogName);
  db.collection('jake').deleteOne({name:dogName})
  res.redirect('/api')
})

//update an entry from the db
router.get('/update', function(req,res){
  var dogName = req.query.newName
  var dogBreed = req.query.newBreed
  var oldName = req.query.oldName
  console.log(dogName + dogBreed)
  db.collection('jake').updateOne(
    {"name":oldName},
    {$set: {
      "name": dogName,
      "breed": dogBreed
    }
  })
})

//create
router.post('/addDog', function(req, res) {
  db.collection('jake').insertOne(req.body)
  res.redirect('/api')
})

// all of our routes will be prefixed with /api
app.use('/api', router)
