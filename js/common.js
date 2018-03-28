var module ;
const host = 'http://api.51child.top'; // 域名
const getList = '/scale/getList'; // 获取量表列表
const tLogin = '/account/wxLogin'; // 登陆
const getDetail = '/scale/getDetails'; // 获取量表详情
const createOrder = '/order/addOrderInfo'; // 下单
const getWeChatCode = host + '/account/mLoginThird'; // 获取code 
const pay = host + '/pay/wx/jsPay'; //支付
const getOrderList = '/order/getOrderList'; //获取订单列表
const survey = host + '/scale/scaleTest'; //量表测试
const surveyResult = host + '/scale/scaleTestResult'; //量表测试报告
const getUser = '/user/getUserInfo'; // 获取用户信息
const isBindMobile = '/user/isBindMobile'; // 用户是否绑定手机
const sendMsg = '/user/bingMobileSendMsg'; //发送短信验证码
const bindMobile = '/user/bingMobile'; // 绑定手机
const createTestInfo = '/order/addChildrenInfo'; //填写儿童信息
const checkTestInfo = '/order/getCheckChildrenInfo'; //检测儿童信息
const refUri = window.location.href; //获取当前地址
const getReport = '/scale/scaleTestResult'; //获取测试结果
const getQuestionsList = '/scale/beginToAnswer'; //开始测试
const submitTest = '/scale/scaleAnswerResult'; //提交结果

module = {
	_get:function(url,data,succ,fail){
         $.ajax({
             type: "GET",
             url: host + url,
             data,
             dataType: "json",
	         cache:false,
			 crossDomain : true,
             xhrFields: {
                 withCredentials: true
             },             
	         beforeSend : function(){
				
             }, 
			 complete : function(){

             },             
             success: function(res){
				if(res.status == 0){
		        	   if(res.errCode == 10008){
				    		module.tLogin();					 					   
		        	   }
				}
		        	try{
	            		succ && succ(res);
		        	} catch(e){
		        		console.log(e);
		        	}
             },
             error:function(res){
             	console.log(res);
             }
         });
	},
	
	_post:function(url,data,succ,fail){
         $.ajax({
             type: "post",
             url: host + url,
             data,
             dataType: "json",
	         cache:false,
			 crossDomain : true,
             xhrFields: {
                 withCredentials: true
             },             
	         beforeSend : function(){
				
             }, 
			 complete : function(){

             },             
             success: function(res){
				if(res.status == 0){
		        	   if(res.errCode == 10008){
				    		module.tLogin();				 					   
		        	   }
				}
		        	try{
	            		succ && succ(res);
		        	} catch(e){
		        		console.log(e);
		        	}
             },
             error:function(res){
             	console.log(res);
             }
         });
	},	
	
	getUrlParam : function(name,href){
		var result
		if(href){
			result = href.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
		}else{
			result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
		}
	    
	    if(result == null || result.length < 1){
	        return "";
	    }
	    return result[1];
	},
	
	tLogin:function(){
		location.href = getWeChatCode +'?backUri='+ refUri;
	},
	
	toast:function(msg){
		layer.msg(msg);
	},
	
	alert:function(msg,btnText,succ){
		layer.confirm(msg, {
		  title:'小优提示',	
		  btn: ['去支付'], //按钮
		  shadeClose:true,
		}, function(){
			layer.closeAll();
			succ && succ();
		});		
	},
	
	isBindMobile:function(fn,succ){
		module._get(isBindMobile,'',(res) => {
			
			if(res.status == 0){
				fn && fn();
			}else{
				succ && succ();
			}
		});
	},
	
	checkChildInfo:function(sn,fn,succ){
		const param = {
			sn,
		};
		module._get(checkTestInfo,param,(res) => {
			if(res.status == 0){
				fn && fn();
			}else{
				succ && succ(sn);
			}
		});
	},
	
}
	

//$(function(){
//	$('#tabbar a').click(function(){
//		console.log($(this).attr('name'));
//		const name = $(this).attr('name');
//		if(name === 'index'){
//			window.location.href = './index.html';
//		}else if(name === 'user'){
//			window.location.href = '../user/index.html';
//		}else{
//			window.location.href = '../category/category.html';
//		}
//	});
//}); 
//
