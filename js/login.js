$(function() {
	//获取焦点动画
	$('.form-input').focus(function() {
		$(this).addClass('form-input-focus');
		$(this).prev('.item-tip').addClass("item-tip-focus");
	});
	//失去焦点动画
	$('.form-input').blur(function() {
		$(this).removeClass('form-input-focus');
		var value = $(this).val();
		if (value == '') {
			$(this).prev('.item-tip').removeClass("item-tip-focus");
		}
	});
	$('.item-tip').click(function() {
		$(this).next('.form-input').focus();
	});
	//验证手机
	$('input[name=phone]').blur(function() {
		check($(this));
	});
	//验证邮箱
	//验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
	//第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
	//第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
	//而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
	$('input[name=email]').blur(function() {
		check($(this));
	});
	//验证密码
	$('input[name=password]').blur(function() {
		check($(this));
	});
	$('#login-btn').click(function() {
		var flag=true;
		$('.form-input').each(function() {
			flag&=check($(this));
		})
		if(flag){
			alert('success');
		}
	});

	function check(input) {
		var reg = input.attr('reg');
		var value = input.val();
		var errorInfo = input.next('.error-info');
		errorInfo.hide();
		var flag = checkReg(reg, value);
		if (!flag) {
			errorInfo.show();
		}
		return flag;
	}
	//	alert(checkReg('^\\d{6,8}$','123456'));
	//由于正则表达式模式文本中的转义字符也是“\”，如果正则表达式中要匹配原义字符“\”，在正则表达式模式文本中要以“\\”来表示，当使用显式构造函数的方式创建RegExp实例对象的时候，就需要使用“\\\\”来表示原义字符“\”。 
	//	alert(checkReg(/^\d{6,8}$/,'123456'));
	function checkReg(reg, value) {
		var regExp = new RegExp(reg, 'g');
		return regExp.test(value);
	}
});