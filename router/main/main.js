var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체


/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get('/', function(req, res){
  console.log('main.js 실행');
  res.sendFile(path.join(__dirname, '../../html/main.html'));
})

module.exports = router;