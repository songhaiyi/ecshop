var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 创建文档的定义
var Goods = new Schema({
    goods_name  : String,             //商品名称
    goods_num  : String,				//商品货号
    goods_class : String,				//商品分类	
    goods_extend_class : String,			//扩展分类
    goods_brand : String,					//商品品牌
    price_me       : String,					//本店价格
    price_member_zc      : String,				//注册用户价格
    price_member_dx      : String,				//代销用户价格
    price_member_vip      : String,				//vip价格
    price_dis_num			: String,			//优惠数量
    price_dis			: String,				//优惠价格
    price_bazaar			: String,			//市场价格
    virtual_sales			: String,			//虚拟销量
    
    
    
    img       : String,
    create_date : { type: Date, default: Date.now }
});

// 创建model对象，与数据库中的文档（表）映射
var GoodsModel = mongoose.model('goods', Goods);
// commonJS规范(暴露接口)
module.exports = GoodsModel;

