var globalSaveSuccessTip = "保存成功";
var globalDeleteTip = "确实要删除数据吗？";
var globalTabHeight = 50;

//统一  get 请求
function commonGet(url,params,callback,isEncypt){
	var data = params;
	if(params && isEncypt){
		var key = new RSAUtils.getKeyPair(ENCYPT_PUBLIC_KEY_Exponent, "", ENCYPT_PUBLIC_KEY_Modulus);   
		params = RSAUtils.encryptedString(key,JSON.stringify(params)); 
		data = {"data":params};
	}

	jQuery.get(url,data,function(data){
		 if(typeof callback === "function"){
			 callback(data);
		  }
	});
}

//统一 post 请求方式
function commonPost(url,params,callback,isEncypt){
	var data = params;
	if(params && isEncypt ){
		var key = new RSAUtils.getKeyPair(ENCYPT_PUBLIC_KEY_Exponent, "", ENCYPT_PUBLIC_KEY_Modulus);   
		params = RSAUtils.encryptedString(key,encodeURI(JSON.stringify(params))); 
		data = {"data":params};
	}
	jQuery.post(url,data,function(data){
		 if(typeof callback === "function"){
			 callback(data);
		  }
	});
}

//统一 load 请求方式
function commonLoad($dom,url,params,callback){
	var data = null;
	if(params){
		var key = new RSAUtils.getKeyPair(ENCYPT_PUBLIC_KEY_Exponent, "", ENCYPT_PUBLIC_KEY_Modulus);   
		params = RSAUtils.encryptedString(key,JSON.stringify(params)); 
		data = {"data":params};
	}
	$dom.load(url,data,function(){
		if(typeof callback === "function"){
			callback(this);
		}
	});
}

function myAlert(message,callback){
	dialog({
		title: "提示",
		content: message,
		width: 300,
		cancel: callback,
		cancelDisplay: false
	}).showModal();
}

function myConfirm(message,callback){
	dialog({
		title: "提示",
		content: message,
		width: 300,
		okValue: '确定',
	    ok: callback,
	    cancelValue: '取消',
	    cancel: function () {}
	}).showModal();
}

function removeDialog(){
	dialog.getCurrent().remove();
}

function refreshPage(formId, divId, pageIndex) {
	if (pageIndex) {
		$("#" + formId + "_pageIndex").val(pageIndex);
	}
	var url = $("#" + formId).attr("action");
	var params = $("#" + formId).serialize();
	jQuery.post(url, params, function(data) {
		$("#" + divId).html(data);
	});
}

function showSpinner(){
	$("<div id='spinnerDiv'></div>").appendTo("body");
	var spinner = new Spinner();
	spinner.spin(document.getElementById("spinnerDiv"));
}

function hideSpinner(){
	$("#spinnerDiv").remove();
}

function selectEntity(sender){
	$(sender).parent().find(".active").removeClass("active");
	$(sender).addClass("active");
	//$(sender).siblings().find("input[type='checkbox']").prop("checked",false);
	var $checkbox = $(sender).find("input[type='checkbox']").first();
	
	if($checkbox.prop("checked")){
		$checkbox.prop("checked",false);
	} else {
		$checkbox.prop("checked",true);
	}
}

function getSelectedEntityId(tableId){
	return $("#"+tableId).find(".active").attr("entityId");
}

function getSelectedEntityIdByAttach(_self){
	return _self.find(".active").attr("entityId");
}

function getSelectedEntity(tableId){
	return $("#"+tableId).find(".active");
}

function getSelectedEntityIdForOne(tableId){
	var checkbox = $("input[type='checkbox']:checked",$("#"+tableId));
	if(checkbox && checkbox.length != 1 ) {
		myAlert("请选择一条记录进行操作");
		return;
	}
	return $(checkbox[0]).closest('tr').attr('entityId');
}

function checkAll(sender){
	if($(sender).is(':checked')){
		$(sender).closest("table").find(":checkbox").prop("checked",true);
	}else{
		$(sender).closest("table").find(":checkbox").removeAttr("checked");
	}
}

function getCheckedEntityIds(tableId){
	var result = "";
	$("#"+tableId+" :checked").each(function(i){
		var entityId = $(this).closest("tr").attr("entityId");
		if(entityId){
			if(result){
				result += "," + entityId;
			}else{
				result += entityId;
			}
		}
	});
	return result;
}

function openTab(tabCode, tabName, url){
	var parentCode = window.frameElement.getAttribute("code");
	var curWindow = window;
	while(curWindow.parent != window.top){
		curWindow = curWindow.parent;
		parentCode += "|" + curWindow.frameElement.getAttribute("code");
	}
	window.top.openMenu(tabCode, tabName, url, parentCode);
}

/**
 * 检测是否登录
 */
function detecteIsLogin(){
	jQuery.get(CONTEXT_PATH+"/detecteLogin?timeStamp=" + new Date().getTime(),null,function(data){
		if(data.success && data.message.role && data.message.role.roleId == '402881ea5856f039015856f630fc0006'){
			$("#userCenter").show();
			$("#user_code").text(data.message.userCode);
		}else{
			$("#loginEntrance").show();
		}
	});
	// 客户中心
	  var navLi=$(".ct_user");
	  navLi.mouseover(function () {
	    $(this).find(".ct_link").slideDown(200);
	  });
	  navLi.mouseleave(function(){
	    $(this).find(".ct_link").slideUp(200);
	  });
}

$(function(){
	detecteIsLogin();
});

function stopPropagation(){
	e = event || window.event;
	e.stopPropagation();
}

/** 上传文件
 * 	数据格式：params = [{divId:'testAttachments',isQuery:'',entityName:'',fieldName:'',entityId:}];
 */
function uploadFile(params){
	for(var i=0,l=params.length; i<l; i++){
		var item = params[i];
		$("#"+item.divId).myFileUpload({
			isQuery : item.isQuery,
			entityName : item.entityName,
			fieldName : item.fieldName,
			entityId : item.entityId
		});
	}
}

/**
 *  js 日期格式化
 * @param fmt
 * @returns
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/******************************************************* 表单校验 start **************************************************/

var CheckRules = {
	'email-validate':{
		rule : '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$',
		tip : '邮箱格式不正确'
	},
	'phone-validate':{
		rule : '^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$',
		tip : '手机号码输入不正确'
	},
	'tel-validate':{
		rule : '([0-9]{3,4}-)?[0-9]{7,8}',
		tip : '座机号码输入不正确'
	},
	'validateExp':{
	}
};

/**
 * 功能描述：正则校验字段值 的格式
 * targetValue: 校验的目标值
 * tipId：提示展示区域id
 */
function validateFieldWithReg(self,targetValue,tipId){
	var result = true;
	for(o in CheckRules){
		var _ruleExp = $(self).attr(o),
			_id = $(self).attr('id'),
			labelText = $("#" + _id + "Label").text();
		if(_ruleExp !== undefined){
			var rule = "",
				ruleTip = "";
			if(o == 'validateExp') {  //自定义正则校验
				rule = _ruleExp.split(":")[0];
				ruleTip = _ruleExp.split(":")[1];
				if(!ruleTip) ruleTip = labelText + "输入格式有误";
			} else {  //通用正则校验
				rule = CheckRules[o].rule;
				ruleTip = _ruleExp;
			}
			
			var reg=new RegExp(rule,'g');
			if(!reg.test(targetValue)){
				if(_ruleExp){
					$("#"+tipId).text(ruleTip);
				}else{
					$("#"+tipId).text(CheckRules[o].tip);
				}
				result = false;
			}else {
				$("#"+tipId).text("*");
				result = true;
			}
		}	
	}
	return result;
} 

/**
 * 功能描述：校验字段的长度(最大长度、最小长度)
 * valiType: minlength(最小长度)、maxslength(最大长度)
 * targetValue: 校验的目标值
 * tipId：提示展示区域id
 */
function validateFieldLength(self,valiType,targetValue,targetLabel,tipId){
	var result = true,
		_valiType = $(self).attr(valiType),
		defaultTip = "";
	if(_valiType){
			var ruleArr = _valiType.split(":"),
				ruleLength = ruleArr[0]-0,
				ruleTip = ruleArr[1];
				
		if( (valiType == "minlength" && targetValue.length<ruleLength)
			|| (valiType == "maxslength" && targetValue.length >ruleLength)){ //最小长度验证
			if(ruleTip && ruleTip.length>0){
					$("#"+tipId).text(ruleTip);
				} else {
					defaultTip = targetLabel+"输入长度不能小于" + ruleLength + "个字符";
					if(valiType == 'maxslength')
						defaultTip = targetLabel+"输入长度不能大于" + ruleLength + "个字符";
					$("#"+tipId).text(defaultTip);
				}
				result = false;
		}else{
			$("#"+tipId).text("*");
			result = true;
		}
	}
	return result;
}

/**
 * 功能描述: 两次输入的值是否相同
 *
 */
function fieldInputTwiceIdentified(self,targetValue,lableText,tipId){
	 var result = true, 
		equal2Rule = $(self).attr('equalField');
	 if(equal2Rule){
		 var ruleArr = equal2Rule.split(":"),
			originFieldValue = $("#" + ruleArr[0]).val(),
			originFieldLabel = $("#" + ruleArr[0] + "Label").text(),
			equalTip =  ruleArr[1];
		 if(targetValue != originFieldValue){
			 if(equalTip){
				$("#"+tipId).text(equalTip);
				return result = false;
			 } 
			$("#"+tipId).text(lableText + "的值与" + originFieldLabel + "的值不一致");
			return result = false;
		 }
	 }
	 return result;
}

/**
 * 功能描述:字段值 唯一校验
 * 配置格式：unique="/companyTemp/verifyCompanyCode"
 * 服务返回格式：
 * 	if(company != null){
 *		return SuccessOrFailure.FAILURE("该企业编码已经存在!");
 *	}else{
 *		return SuccessOrFailure.SUCCESS("该企业编码可以使用!");
 *	}
 */
function validateFieldValueUnique(self,targetValue,tipId){
	var result = true,
		fieldCode = $(self).attr('name'),
		uniqueUri = $(self).attr("unique");
	if(uniqueUri){
		var url = CONTEXT_PATH + uniqueUri;
		var params = {};
			params[fieldCode] = targetValue;
		$.post(url,params,function(data){
			if(data.success){
				$("#" + tipId).css("color","green")
							  .html(data.message)
							  .attr("isenable",true);
				result = true;
			}else{
				$("#" + tipId).html(data.message)
							  .attr("isenable",false);
				result = false;
			}
		});
	}
	return result;
}

/**
 * 功能描述:具体处理核心
 *
 */
function validateCore(self){
	var result = true,
		value = $(self).val(),
		tipId = $(self).attr("id")+"Tip",
		lableText = $("#" + $(self).attr("id")+"Label").text();
	if(!value){
		$(self).addClass("isNotNull");
		return false;
	}
	//正则校验字段值 的格式
	if(!validateFieldWithReg(self,value,tipId)){
		return false;
	}

	//最小长度校验
	if(!validateFieldLength(self,'minlength',value,lableText,tipId)){
		return false;
	}

	//最大长度校验
	if(!validateFieldLength(self,'maxslength',value,lableText,tipId)){
		return false;
	}
	 
	 //2次输入值一致校验
	if(!fieldInputTwiceIdentified(self,value,lableText,tipId)) {
		return false;
	}
	 
	 //字段值唯一校验
	 if(!validateFieldValueUnique(self,value,tipId)) {
			return false;
		}
	return result;
}

 /**
 * 功能描述:实时进行校验提示
 * formId  验证的表单范围
 * valiType 验证的方式（realTime,submit）实时验证 、提交验证
 * email-validate="提示信息"(提示信息可以省略，只配置：email-validate，使用默认提示)
 * phone-validate="提示信息"(提示信息可以省略，只配置：phone-validate，使用默认提示)     --> 验证手机
 * tel-validate="提示信息"(提示信息可以省略，只配置：tel-validate，使用默认提示) 		  --> 验证座机
 * validateExp="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$:由数字字母组成(6-15位)"   -->自定义正则表达式以及提示,省略提示，采用默认提示
 * minlength="15:输入最小长度不能超过15个字符"
 * maxslength="25:输入最大长度不能超过25个字符"
 * unique="/companyTemp/verifyUserCode"  唯一校验，访问地址，提示
 * equalField：2次输入值是否相同,例：equalField="password(起一个对比字段Id):'两次输入的密码不一样!'"
 */
function validation(formId,valiType){
	var result = true;
	if(valiType == 'realTime') {
		$('[isNotNull],[validateExp][email-validate][phone-validate][tel-validate]',$("#"+formId)).each(function(){
			$(this).blur(function(){  //绑定失去焦点事件
				result = validateCore(this);	
			});
			
			$(this).focus(function(){  //绑定获取焦点事件
				$(this).removeClass("isNotNull");
				var tipId = $(this).attr("id")+"Tip";
				$("#"+tipId).css("color","red")
					        .text("*");
			});
		});
	}else{
		$('[isNotNull],[validateExp][email-validate][phone-validate][tel-validate]',$("#"+formId)).each(function(){
			result = validateCore(this);	
			if(!result)return false;
		});
	}
	return result;
}

/**
 * 表单提交验证
 * @param formId
 */
function validateForm(formId){
	return validation(formId,'submit');
}
/**
 * 输入实时校验
 * @param formId
 */
function validateRealTime(formId){
	return validation(formId,'realTime');
}
/******************************************************* 表单校验 end *************************************************************/
