var express = require('express');
var router = express.Router();

var mang = [
  {taskName:"Ăn sáng", status: "1"},
  {taskName:"Đi phỏng vấn", status: "0"}
  ];
/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });
});
router.get('/getTasks', (req, res)=>{
  console.log(mang);
  res.send(mang);
});
router.post('/addTask', (req,res)=>{
  var newTask = req.body.task;
  console.log(newTask);
  mang.push(newTask);
  res.send(mang);
});
router.post('/deleteTask', (req,res)=>{
  var id = req.body.idDelete;
  mang.splice(id, 1);
  res.send(mang);
});
router.post('/updateTask', (req,res)=>{
  var id = req.body.idUpdate;
  mang[id].status = req.body.statusUpdate;
  res.send(mang);
});
module.exports = router;
