var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', {});
});
router.get('/add', function(req, res, next) {
  res.render('add', { title: '商品添加' });
});
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

router.get('/admin', function(req, res, next) {
	
	// 检查用户是否登录
	if(req.session && req.session.username != null) {
		res.render('index', { title: 'ECSHOP 管理中心' });
	} else {
		// 重定向
		res.redirect('/login');
	}
	
});

router.post("/api/login", function(req, res) {
	var username = req.body.username;
	var psw = md5(req.body.psw);

	var result = {
		status: 1,
		message: "登录成功"
	}
	UserModel.find({username: username, psw: psw}, function(err, docs){
		if(!err && docs.length > 0) {
			console.log("登录成功");
			res.send(result);
		} else {
			console.log("登录失败，请检查您的用户名或者密码");
			result.status = -109;
			result.message = "登录失败，请检查您的用户名或者密码"
			res.send(result);
		}
	})
})

module.exports = router;
