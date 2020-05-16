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

router.get('/getQuestList',function(req,res){
  connection.query("select * from Billage.quest",function(err,rows,fields){
    if(!err){
      var questList=rows
      console.log(questList);
      res.send(questList[0]);
    }
  })
})

router.post('/checkQuest',function(req,res){
  var questList;
  var str=JSON.stringify(req.body)
  var postdata=JSON.parse(Object.keys(JSON.parse(str)));
  console.log(postdata);
  var tmp=String(parseInt(postdata.today.replace(/-/gi,""))-1)
  var yesterday=tmp.substr(0,4)+"-"+tmp.substr(4,2)+"-"+tmp.substr(6,2)
  console.log(yesterday);

  connection.query("select * from Billage.quest",function(err,rows,fields){
    if(!err){
      questList=rows
      console.log(questList);
    }
  })

  if(checkDailySave(yesterday,postdata.daily,expectation)==1){
    //connection.query(`insert into`)
  }

})

//일간 퀘스트 달성여부 확인하고 주간,월간에서는 반복문으로 돌려서 확인

function checkDailySave(targetDay,Data,expectation){
  //특정 날짜의 일간 절약 퀘스트 달성여부 확인
  for(int i=0;i<Data.length;i++){
    if(Data[i].date==targetDay){
      if(IsDailySaveLv1(parseFloat(Data[i].cost),expectation)){
        return 1
      }else if(IsDailySaveLv2(parseFloat(Data[i].cost),expectation)){
        return 2
      }else if(IsDailySaveLv3(parseFloat(Data[i].cost),expectation)){
        return 3
      }else return 0
    }
  }
}

function IsDailySaveLv1(cost,expectation){
  if(cost>expectation*0.9&&cost<=expectation*0.95) return true;
  else false;
}

function IsDailySaveLv2(cost,expectation){
  if(cost>expectation*0.8&&cost<=expectation*0.9) return true;
  else false;
}

function IsDailySaveLv3(cost,expectation){
  if(cost<=expectation*0.8) return true;
  else false;
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
