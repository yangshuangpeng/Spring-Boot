<!doctype html>
<html>
<head>
<#include "/head.ftl"/>
<script type="text/javascript" src="${rc.contextPath}/public/js/system/users.js"></script>
</head>
<body>
<form id="usersForm" action="${rc.contextPath}/user/queryUsers" >
	<div class="form-inline">
		<div class="form-group">
    		<label>姓名</label>
    		<input type="text" class="form-control" id="userName" name="userName">
  		</div>
  		<#if common.isSystemUser || common.isCntenUser>
		<div class="form-group has-feedback">
    		<label>所属企业</label>
    		<input id="company" type="text" name="company" class="form-control" style="cursor:pointer" onclick="selectCompany();" />
    		<span class="glyphicon glyphicon-menu-hamburger form-control-feedback"></span>
    		<input type="hidden" id="companyId" name="companyId" />
  		</div>
		</#if>
	</div>
	<div class="command-div">
		
		<a  class="btn btn-primary" onclick="refreshPage('usersForm','usersDiv',1);">
			<i class="glyphicon glyphicon-search"></i>
    		<span>查询</span>
		</a>
		<a  class="btn btn-info" onclick="viewUser();">
			<i class="glyphicon glyphicon-zoom-in"></i>
    		<span>查看</span>
		</a>
		<#if !RequestParameters["isQuery"]?? || RequestParameters["isQuery"]=="">
		<a  class="btn btn-success" onclick="showUser(null,null<#if company??>,company.value, companyId.value</#if>);">
			<i class="glyphicon glyphicon-plus"></i>
    		<span>新增</span>
		</a>
		<a  class="btn btn-warning" onclick="editUser();">
			<i class="glyphicon glyphicon-edit"></i>
    		<span>编辑</span>
		</a>
		<a  class="btn btn-danger" onclick="updatePassword();">
			<i class="glyphicon glyphicon-wrench"></i>
    		<span>重置密码</span>
		</a>
		<#if common.isSystemUser || common.isCntenAdministrator>
		<a  class="btn btn-danger" onclick="deleteUser();">
			<i class="glyphicon glyphicon-trash"></i>
    		<span>删除</span>
		</a>
		</#if>
		</#if>
	</div>
	<div id="usersDiv"></div>
</form>
</body>
</html>
