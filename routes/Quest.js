var express = require('express');
var app= express()
var router = express.Router();
var mysql=require('mysql')
var bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

var connection=mysql.createConnection({
  host:'3.17.141.131',
  port:3306,
  user:'root',
  password:'*tmddn1010914',
  database:'Billage'
})

function handleDisconnect(){
  connection.connect(function(err){
    if(err){
      console.log('error when connecting to db',err);
      setTimeout(handleDisconnect,2000)
    }
  })
  connection.on('error',function(err){
    console.log('db error',err);
    if(err.code==='PROTOCOL_CONNECTION_LOST'){
      return handleDisconnect();
    }else{
      throw err;
    }
  })
}

handleDisconnect();

router.get('/getQuestList',function(req,res){
  connection.query("select * from Billage.quest",function(err,rows,fields){
    if(!err){
      var questList=rows
      console.log(questList);
      res.send(questList[0]);
    }
  })
})

//일간 퀘스트 달성여부 확인하고 주간,월간에서는 반복문으로 돌려서 확인

function checkDaily(){
  //일간 퀘스트 달성여부 확인
}

router.post('/checkQuest1',function(req,res){
  var postdata=req.body//temp

  //if(){//일간 예상소비량보다 5%이상 절약


})

router.post('/checkQuest4',function(req,res){
  //일간 계획소비
})

router.post('/checkQuest5',function(req,res){
  //주간 소비절약lv1
})

router.post('checkQuest')

module.exports = router;
