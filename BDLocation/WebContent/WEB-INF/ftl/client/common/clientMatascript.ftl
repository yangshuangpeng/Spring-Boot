<link rel = "Shortcut Icon" href="${rc.contextPath}/public/propaganda/favicon.ico"/>
<link type="image/x-icon" href="${rc.contextPath}/public/propaganda/favicon.ico" rel="Bookmark"/>
<link type="image/x-icon" href="${rc.contextPath}/public/propaganda/favicon.ico" rel="Shortcut Icon"/>
<link rel="stylesheet" href="${rc.contextPath}/public/css/client/reset.css"/>
<link rel="stylesheet" href="${rc.contextPath}/public/css/client/jquery.spinner.css"/>
<link rel="stylesheet" href="${rc.contextPath}/public/propaganda/css/manage.css"/>
<link type="text/css" rel="stylesheet"  href="${rc.contextPath}/public/css/client/showBo.css" />
<link type="text/css" rel="stylesheet"  href="${rc.contextPath}/public/css/client/modal.css" />
<script type="text/javascript">
	ENCYPT_PUBLIC_KEY_Exponent = "";
	ENCYPT_PUBLIC_KEY_Modulus = "";
	<#if publicKeyExponent?? && publicKeyModulus??>
	ENCYPT_PUBLIC_KEY_Exponent = "${publicKeyExponent}";
	ENCYPT_PUBLIC_KEY_Modulus = "${publicKeyModulus}"
	</#if>
</script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/security.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/QueryString.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/echarts_compress.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/macarons.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/public.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/showBo.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/modal.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/common.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/client/commJs/jquery.form.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/common.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/jquery-file-upload/jquery.ui.widget.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/jquery-file-upload/jquery.fileupload.js"></script>
<script type="text/javascript" src="${rc.contextPath}/public/js/lib/fileUploader.js"></script>