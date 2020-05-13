var express = require('express');
var app= express()
var router = express.Router();
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

var mysql=require('mysql')

var connection=mysql.createConnection({
  host:'3.17.141.131',
  port:3306,
  user:'root',
  password:'*tmddn1010914',
  database:'Billage'
})

connection.connect()

router.get('/getQuestList',function(req,res){
  connection.query("select * from Billage.quest",function(err,rows,fields){
    if(!err){
      var questList=rows
      console.log(questList);
      res.send(questList[0]);
    }
  })
})

module.exports = router;
