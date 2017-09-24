//设置节点字体样式
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#FF0000", "font-weight":"bold"} : {background:"#FFFFFF",color:"#333", "font-weight":"normal"};
}

//var companyTree;
//var params = {};
//var companyNodes;
//var companySetting = {
//		view: {
//			dblClickExpand: false,
//			showLine: true,
//			selectedMulti: false
//		},
//		callback: {
//			onCheck: cTreeOnCheck,
//			onClick: cTreeOnClick
//		},
//		check: {
//			chkStyle: "radio",
//			enable: true.
//			radioType = "all"
//		},
//		data: {
//			key:{
//				title: "companyName",
//				name: "companyName"
//			},
//			simpleData: {
//				enable:true,
//				idKey: "companyId",
//				pIdKey: "pId",
//				rootPId: ""
//			}
//		}
//		
//};
var orgTree;
var orgNodes;
var initCheckedNodes = null; //菜单树初始选择的节点
var initCheckedMenus = null;
var nodeList = [];
var orgSetting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false,
			fontCss: getFontCss
		},
		callback: {
			onClick: pTreeOnClick,
			onCheck: pTreeOnClick
		},
		check: {
			enable:true,
			chkboxType:{ "Y": "", "N": "" }
		},
		data: {
			key:{
				title: "orgName",
				name: "orgName"
			},
			simpleData: {
				enable:true,
				idKey: "companyOrgId",
				pIdKey: "parentOrgId",
				nodeLevel:"orgLevel",
				rootPId: ""
			}
		}	
};


var menuCheckedNow;//用于保存筛选前选中的结点
$(document).ready(function(){
//	 $.ajax({  
//	        async : false,  
//	        cache:false,  
//	        type: 'POST',  
//	        dataType : "json",  
//	        url: CONTEXT_PATH+"/companyOrg/getAdminCors",  
//	        error: function () {//请求失败处理函数  
//	        	myAlert('获取管理员数据失败');  
//	        },  
//	        success:function(data){	 //请求成功后处理函数。
//	        	companyNodes = [{id: 1, pId: 0,companyName:"管理员账号", iconOpen:CONTEXT_PATH+"/public/js/lib/zTree_v3/css/zTreeStyle/img/diy/1_open.png", iconClose:CONTEXT_PATH+"/public/js/lib/zTree_v3/css/zTreeStyle/img/diy/1_close.png",nocheck:true,open: true,children:data}];
//	        }  
//	    });  
	 
//	 companyTree = $.fn.zTree.init($("#companyTree"), companySetting, companyNodes);
	 $.ajax({  
	        async : false,  
	        cache:false,  
	        type: 'POST',  
	        dataType : "json",  
	        url: CONTEXT_PATH+"/companyOrg/getCompanyOrgs",//请求的action路径  
	        error: function () {//请求失败处理函数  
	        	myAlert('获得机构数据失败');  
	        },  
	        success:function(data){ //请求成功后处理函数。	
	        	orgNodes = data;
	        }  
	    });
	 orgTree = $.fn.zTree.init($("#companyOrgTree"), orgSetting, orgNodes);
	 orgTree.expandAll(true);

//	 //监听菜单筛选框的内容变化
//	 $('#menuTreeName').bind('input propertychange', function() {
//	 		updateNodes(false);
//		 	menuCheckedNow = unionList(menuCheckedNow,orgTree.getCheckedNodes());
//		    var value = $('#menuTreeName').val();
//		    nodeList = orgTree.getNodesByParamFuzzy('menuName', value);
//		    nodes = orgTree.getNodes();
//		    
//		    var tempList = [];
//		    for(var i=0; i<menuCheckedNow.length; i++) {
//		    	var node = menuCheckedNow[i];
//		    	if(!isExisted(nodeList, node)) {
//		    		tempList.push(node);
//		    	}
//		    }
//		    menuCheckedNow = tempList; //暂存筛选前选中的点 
//		    if(value === "") {
//		    	return;
//		    }   
//		    updateNodes(true);
//	 });
//	 
//	 //监听企业筛选框的内容变化
//	 $('#companyTreeName').bind('input propertychange', function() {
//		    var value = $('#companyTreeName').val();
//		    nodeList = companyTree.getNodesByParamFuzzy('companyName', value);
//		    nodes = companyTree.getNodes();
//		    companyTree.hideNodes(nodes[0].children);
//		    companyTree.showNodes(nodeList);
//	 });
	 
	 $('#corsAccountMutil').multiselect2side({
			moveOptions: false,
			selectedPosition: 'right',  
			labelsx: '待分配账号',
			labeldx: '已持有账号'		
		});
});



////更新节点
//function updateNodes(highlight) {
//	for( var i=0, l=nodeList.length; i<l; i++) {
//		nodeList[i].highlight = highlight;
//		orgTree.updateNode(nodeList[i]);
//	}
//}

//var expandcompany = true;
//var showAuthorizeOnly = false;
///**
// * 选中一个企业显示该企业下的所有菜单
// * @param event
// * @param treeId
// * @param treeNode
// */
//function cTreeOnCheck(event, treeId, treeNode) {
//	$("#menuTreeName").val("");
//	var value = $('#menuTreeName').val();
//	menuCheckedNow = undefined;
//	nodeList = orgTree.getNodesByParamFuzzy('menuName', value);
//	updateNodes(false);
//	nodes = orgTree.getNodes();
//    orgTree.showNodes(nodes[0].children);
//	if(treeNode.level === 0) {
//		initCheckedNodes = null;
//		companyTree.expandAll(!expandcompany);
//		expandcompany = !expandcompany;
//		return;
//	}
//	orgTree.checkAllNodes(false);
//	
//	if(!treeNode.checked) {
//		return;
//	}
//	var companyId = treeNode.companyId;
//	$.ajax({  
//        async : false,  
//        cache : false,
//        type: 'POST',  
//        dataType : "json",
//        data: {"companyId":companyId},
//        url: CONTEXT_PATH+"/companyMenu/queryCompanyMenus",//请求的action路径  
//        error: function () {//请求失败处理函数  
//        	myAlert('获得企业菜单数据失败');  
//        },  
//        success:function(data){ //请求成功后处理函数。
//        	for(var i=0; i<data.length; i++) {
//        		var nodes = orgTree.getNodeByParam("menuId",data[i].menu.menuId,null);
//        		if(nodes != null) {
//        			orgTree.checkNode(nodes,true,false);
//        		}
//        	}
//        	initCheckedNodes = orgTree.getCheckedNodes();//获取企业当前菜单数据 	
//        }  
//    });
//	
//	if(showAuthorizeOnly) {
//		orgTree.hideNodes(nodes[0].children);
//	    orgTree.showNodes(initCheckedNodes);
//	}
//}

///**
// * 单击企业树节点时，勾选相应节点
// * @param event
// * @param treeId
// * @param treeNode
// */
//function cTreeOnClick(event, treeId, treeNode) {
//	companyTree.checkNode(treeNode, true, true);
//	cTreeOnCheck(event, treeId, treeNode);
//}

//---------------------------------------------------------------有用的部分----------------------------------------------------------------------------

/**
 * 单击菜单树节点，反选相应节点
 * @param event
 * @param treeId
 * @param treeNode
 */
function pTreeOnClick(event, treeId, treeNode) {
	debugger;
	orgTree.cancelSelectedNode();
	orgTree.checkAllNodes(false);  		//取消以前的选中状态
	orgTree.checkNode(treeNode, !treeNode.checked, true);
	var modelId = $("div#rightContent").attr("modelId");
	if(modelId && modelId == treeNode.companyOrgId)
		return false;
	dealNodeClick(treeNode);

}
var currOrgOldCors = [];
function dealNodeClick(treeNode){
	$("div#rightContent").empty().attr("modelId", treeNode.companyOrgId);
	var url = CONTEXT_PATH + "/companyOrg/orgCorsAndBlankCors",
		params = {'companyOrgId':treeNode.companyOrgId};
	commonPost(url,params,function(data){
		console.log("------data------:" + JSON.stringify(data));
		var select = $("<select name='corsAccountMutil' id='corsAccountMutil' multiple='multiple' size='6' style='display: none;'></select>");
		var blankCorsList = data.blankCorsList,
			currOrgCorsList = data.currOrgCorsList;
		if(blankCorsList.length>0){
			for(var i=0,blen = blankCorsList.length; i<blen; i++){
				select.append("<option value='"+blankCorsList[i].corsAccountId+"'><font>"+blankCorsList[i].corsAccountCode+"</font></option>");
			}
		}
		
		if(currOrgCorsList.length>0){
			for(var k=0,clen = currOrgCorsList.length; k<clen; k++){
				select.append("<option value='"+currOrgCorsList[k].corsAccountId+"' selected='selected'><font>"+currOrgCorsList[k].corsAccountCode+"</font></option>");
				currOrgOldCors.push(currOrgCorsList[k].corsAccountId);
			}
		}
		$("div#rightContent").append(select);
		 $('#corsAccountMutil').multiselect2side({
				moveOptions: false,
				selectedPosition: 'right',  
				labelsx: '待分配账号',
				labeldx: '已持有账号'		
			});
	});
	
}

function saveCompanyOrg(){
	var companyOrgId = $("div#rightContent").attr("modelId");
	if(!companyOrgId){
		myAlert("请选择机构");
	}
	
	var currOrgNewCors = [];
	
	$("select#corsAccountMutilms2side__dx option").each(function() {
	    currOrgNewCors.push($(this).attr("value"));
	});
	
	/*if(currOrgNewCors.length==0){
		myAlert("请选择账号");
		return false;
	}*/
	
	if(currOrgOldCors.join(",") == currOrgNewCors.join(",")){
		myAlert("未改变持有账号，无需保存");
		return false;
	}
	dealOldOrNewData(currOrgOldCors,currOrgNewCors);
	
	var url = CONTEXT_PATH + "/companyOrg/saveNewSelectOrgCors",
		params = {
			'oldCors':currOrgOldCors.join(","),
			'newCors':currOrgNewCors.join(","),
			'companyOrgId':companyOrgId
		};
	commonPost(url, params, function(data){
		alert("--操作结果：" + data.success);
	});
}

/**
 * 去掉两个的交集，oldCors 里边存放的是需要释放的账号
 * 		newCors 里边存放的是 新添加账号
 * @param oldCors
 * @param newCors
 */
function dealOldOrNewData(oldCors, newCors){
	if(oldCors.length >0){
		debugger;
		for(var i=0,olen = oldCors.length; i<olen; i++){
			for(var j=0,nlen = newCors.length; j<nlen; j++){
				if(oldCors[i] == newCors[j]){
					delete oldCors[i];
					delete newCors[j];
				}
			}
		}
	}
	
	ClearNullArr(oldCors);
	ClearNullArr(newCors);
}

function ClearNullArr(arr){ 
	for(var i=0,len=arr.length;i<len;i++){ 
		if(!arr[i]||arr[i]==''||arr[i] === undefined){ 
			arr.splice(i,1); 
			len--; 
			i--; 
		} 
	} 
	return arr; 
} 
