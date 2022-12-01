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
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동


/*
router.get('/', function(req, res){
  console.log('product.js 실행');
  var query = connection.query("select * from product", function(err, rows){
    if(err) throw err;
    else{
        console.log(rows);
    }
  })
  res.sendFile(path.join(__dirname, '../../html/eshop.html'));
})*/


router.get('/', function(req, res){ //product 조회
  var productData = req.body;      //회원가입한 user의 데이터(Object type)
 // console.log(productData);
  var userId = "'" + productData.userId + "'";
  var productName = "'" + productData.productName + "'";
  var title = "'" + productData.title + "'";
  var price = "'" + productData.price + "'";
  //var categoryId = "'" + productData.categoryId + "'";
  var volume = "'" + productData.volume + "'";
  var description = "'" + productData.description + "'";
  var postTime = "'" + productData.postTime + "'";
  var statusId = "'" + productData.statusId + "'";
  var photoLink = "'" + productData.photoLink + "'"; 
  var categoryName =productData.categoryName;
  var brandName =productData.brandName;

  
  var sql1 = `SELECT P.productId, P.userId, P.productName, P.title, P.price, C.categoryName, 
   C.brandName,P.volume, P.description, P.postTime, T.statusName, P.photoLink, U.nickname  
  FROM product as P, category as C, tradestatus as T, user as U
  WHERE P.categoryId=C.categoryId AND P.statusId=T.statusId
  AND P.userId=U.id
  ORDER BY P.postTime ASC`;   //글에 필요한 정보를 조회하는 쿼리
  

  connection.query(sql1, function(err, rows){
    if(err) throw err;
    else{
      if(rows.length){      
          console.log(rows);
          res.render('product', {title : 'EXPRESS', data : rows});
      }
      else{
        res.json({message: "400"});
      }
    }

  })
})


router.post('/test', function(req, res){ //product 조회
  var productData = req.body;      //회원가입한 user의 데이터(Object type)
 // console.log(productData);
  var userId = "'" + productData.userId + "'";
  var productName = "'" + productData.productName + "'";
  var title = "'" + productData.title + "'";
  var price = "'" + productData.price + "'";
  //var categoryId = "'" + productData.categoryId + "'";
  var volume = "'" + productData.volume + "'";
  var description = "'" + productData.description + "'";
  var postTime = "'" + productData.postTime + "'";
  var statusId = "'" + productData.statusId + "'";
  var photoLink = "'" + productData.photoLink + "'"; 
  var categoryName =productData.categoryName;
  var brandName =productData.brandName;

  
  var sql1 = 'SELECT * from product';  //글의 categoryId찾는 쿼리
  

  connection.query(sql1, function(err, rows){
    if(err) throw err;
    else{
      if(rows.length){      
          res.json(rows);
      }
      else{
        res.json({message: "400"});
      }
    }

  })
})



router.post('/create', function(req, res){ //product 조회
    var productData = req.body;      //회원가입한 user의 데이터(Object type)
    console.log(productData);
    var userId = "'" + productData.userId + "'";
    var productName = "'" + productData.productName + "'";
    var title = "'" + productData.title + "'";
    var price = "'" + productData.price + "'";
    //var categoryId = "'" + productData.categoryId + "'";
    var volume = "'" + productData.volume + "'";
    var description = "'" + productData.description + "'";
    var postTime = "'" + productData.postTime + "'";
    var statusId = "'" + productData.statusId + "'";
    var photoLink = "'" + productData.photoLink + "'"; 
    var categoryName =productData.categoryName;
    var brandName =productData.brandName;

    
    var sql1 = 'SELECT categoryId FROM category where categoryName=? AND brandName=?';  //글의 categoryId찾는 쿼리
    

    connection.query(sql1, [categoryName, brandName], function(err, rows, field){
      if(err) throw err;
      else{
        if(rows.length){      //일치하는 카테고리 id가 있을때

          var categoryId="'"+rows[0].categoryId+"'";
          console.log(categoryId);

          var sql2 = `insert into product(userId, productName, title, price,  
            categoryId, volume, description, postTime, statusId, photoLink) 
            values(${userId}, ${productName}, ${title}, 
            ${price}, ${categoryId}, ${volume}, ${description}, ${postTime}, ${statusId}, ${photoLink});` //글 작성하는 쿼리

          connection.query(sql2, function(err,rows){
            if(err) throw err;
            else{
              res.json({message: "200"});
            }
          })

      
        }
        else{
          res.json({message: "400"});
        }
      }

    })
  })


module.exports = router;