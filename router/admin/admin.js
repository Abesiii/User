var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');

/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'kksshh1735',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동

router.get('/', function(req, res){
  console.log('admin.js 실행');
 
  res.sendFile(path.join('../../html/admin.html'));

  // console.log('유저닉네임 : ' + userNickname);
  
})

module.exports = router;