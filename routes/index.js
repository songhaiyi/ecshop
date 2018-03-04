var express = require('express');
var router = express.Router();
var UserModel = require( "../model/UserModel" );
var GoodsModel = require( "../model/GoodsModel" );
var multiparty = require( "multiparty" );

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', {});
});
router.get('/add', function(req, res, next) {
  res.render('add', { title: '商品添加' });
});
/*商品列表页*/
router.get('/list', function(req, res, next) {
	GoodsModel.find({}, function(err, docs) {
		res.render('list', {list: docs});
	})
});
router.get('/', function(req, res, next) {
	res.render('login', { title: '登陆' });
  // 检查用户是否登录
if(req.session && req.session.username != null) {
	res.render('login', { title: '登陆' });
} else {
	// 重定向
	res.redirect('/index/login');
}
});


	
/*后台主页面内容区*/
router.get('/content', function(req, res, next) {
  res.render('content', {});
});

/*登陆*/
router.post('/api/login', function(req, res){
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		status: 1,
		message: "登录成功"
	}
	UserModel.find({username: username, psw: psw}, function(err, docs){
		if(!err && docs.length > 0) {
//			console.log("登录成功");
			res.send(result);
		} else {
//			console.log("登录失败，请检查您的用户名或者密码");
			result.status = -109;
			result.message = "登录失败，请检查您的用户名或者密码";
			res.send(result);
		}
	})
});

/* 添加商品 */
router.post("/add_goods", function(req, res){
	var Form = new multiparty.Form({
		uploadDir: "./public/goods_img"
	})
	Form.parse(req, function(err, body, files){
		var goods_name = body.goods_name[0];
		var goods_id = body.goods_id[0];
		var goods_price = body.goods_price[0];
		var count = body.count[0];
		var goods_num = body.goods_num[0];
		var picName = files.pic[0].path;
		picName = picName.substr(picName.lastIndexOf("\\") + 1);
//		console.log(goods_name,goods_id,goods_price,count,goods_num,picName);

		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.goods_id = goods_id;
		gm.goods_price = goods_price;
		gm.count = count;
		gm.goods_num = goods_num;
		gm.pic = picName;
		gm.save(function(err){
			if(!err) {
				res.send("商品保存成功");
			} else {
				res.send("商品保存失败");
			}
		})
	})
});

/* 删除商品行 */
router.get('/api/goods_del', function(req, res, next) {
  GoodsModel.findByIdAndRemove({_id: req.query.gid}, function(err) {
	var result = {
		status: 1,
		message: "商品删除成功"
	};
	if(err) {
		result.status = -119;
		result.message = "删除失败";
	}
	res.send(result);
  })
});
	

/* 搜索--按商品名称进行模糊查询 */
router.post('/search_goods', function(req, res, next){
	var form = new multiparty.Form();
	form.parse(req, function(err, body, files) {
	  var goods_keywords = body.goods_keywords[0];
	  GoodsModel.find({ goods_name: { $regex: goods_keywords } }, function(err, docs) {
	  	res.render('list', {list: docs});
	  })
	});
})



module.exports = router;
