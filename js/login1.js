$(function() {
	//获取焦点，实现动画
	$('.form-input').bind('focus', function() {
		$(this).prev('.item-tip').addClass('item-tip-focus');
	});
	//失去焦点，实现动画
	$('.form-input').bind('blur', function() {
		var value = $(this).val();
		if (value == '') {
			$(this).prev('.item-tip').removeClass('item-tip-focus');
		}
	});
	//点击提示，让input获取焦点，实现动画
	$('.item-tip').bind('click', function() {
		$(this).next('.form-input').focus();
	});

	//失去焦点，验证信息
	$('.form-input').bind('blur', function() {
		doCheck($(this));
	});

	$('#login-btn').click(function() {
		var inputs = $('.form-input');
		var flag = true;
		for (var index = 0; index < inputs.size(); index++) {
			var input = inputs.eq(index);
			flag&=doCheck(input);
		}
		if (flag) {
			alert('success');
		}
	});

	function doCheck(input) {
		var value = input.val();
		var regStr = input.attr('reg');
		var reg = new RegExp(regStr);
		var checkResult = false;
		var name = input.attr('name');
		var itemInfo = input.next('.item-info');
		var tipInfo = '';
		if (name == 'phone') {
			checkResult = check(reg, value);
			if (checkResult) {
				tipInfo = '手机号正确';
			} else {
				tipInfo = '手机号不正确';
			}
		} else if (name == 'email') {
			//验证邮箱
			//验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
			//第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
			//第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
			//而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
			checkResult = check(reg, value);
			if (checkResult) {
				tipInfo = '邮箱正确';
			} else {
				tipInfo = '邮箱不正确';
			}
		} else if (name == 'password') {
			checkResult = check(reg, value);
			if (checkResult) {
				tipInfo = '密码格式正确';
			} else {
				tipInfo = '密码格式不正确';
			}
		}
		itemInfo.text(tipInfo);
		itemInfo.show();
		return checkResult;
	}

	//	alert(checkReg('^\\d{6,8}$','123456'));
	//由于正则表达式模式文本中的转义字符也是“\”，如果正则表达式中要匹配原义字符“\”，在正则表达式模式文本中要以“\\”来表示，当使用显式构造函数的方式创建RegExp实例对象的时候，就需要使用“\\\\”来表示原义字符“\”。 
	//	alert(checkReg(/^\d{6,8}$/,'123456'));
	function check(reg, value) {
		return reg.test(value);
	}

});