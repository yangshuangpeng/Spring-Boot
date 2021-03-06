<!doctype html>
<html>
<head>
<#include "/head.ftl"/>
<script type="text/javascript" src="${rc.contextPath}/public/js/baseStation/customer/showProjects.js"></script>
</head>
<body>
<form id="projectsForm" action="${rc.contextPath}/baseStation/customer/queryProjects">
	<input type="hidden" name="baseCustomer.baseCustomerId" id="baseCustomerId" value="${baseCustomerId!}" />
	<div class="form-inline grid-page-condition">
		<div class="form-group">
    		<label>项目编号</label>
    		<input type="text" class="form-control" id="projectNo" name="projectNo" />
  		</div>
  		<div class="form-group">
    		<label>项目名称</label>
    		<input type="text" class="form-control" id="projectName" name="projectName" />
  		</div>
	</div>
	<div class="grid-page-command">
		<a class="btn btn-primary" onclick="refreshPage('projectsForm','projectsDiv',1);">
			<i class="glyphicon glyphicon-search"></i>
    		<span>查询</span>
		</a>
		<a  class="btn btn-success" onclick="addProject()">
			<i class="glyphicon glyphicon-plus"></i>
    		<span>新增项目</span>
		</a>
		<a  class="btn btn-warning" onclick="editProject();">
			<i class="glyphicon glyphicon-edit"></i>
    		<span>信息修改</span>
		</a>
	</div>
	<div id="projectsDiv"></div>
</form>
</body>
</html>
