






// 配置区域

let api_server_url = "https://api.dnstop.cc"; // 服务器 API

// 配置区域





// 获取 cookie
function get_cookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}



// 登录请求
function DoLogin(password){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				window.localStorage.setItem('session_id',ResultJSON["session_id"]);
				window.location.href="index.html";
			}else{
				swal("超级管理员密码不正确！").then((value) => {
					setTimeout(Login,1);
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/login.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("password="+password);
}



// 从 Login.html 登录
function Login(){
	swal({
		title: "登录系统",
		text: "请输入超级管理员密码",
		icon: "warning",
		buttons: ["取消","登录"],
		closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "请输入密码",
		      value:"",
		      type: "password",
		    },
		  },
		  dangerMode: true,
	}).then((value) => {
	  if (value) {
	  	setTimeout(DoLogin,1,value);
	  }else{
	  	// 没有输入内容
	  	setTimeout(Login,1);
	  }
	});
}


let files_count = document.getElementById('files-count');
let files_today_count = document.getElementById('files-today-count');
let users_count = document.getElementById('users-count');
let users_30day_count = document.getElementById('users-30day-count');


let body_nav_search_input_input = document.getElementById('body-nav-search-input-input');
let body_nav_search_button = document.getElementById('body-nav-search-button');
if(body_nav_search_button!=undefined){
body_nav_search_button.onclick = function(){
	user_id = 0;
	Get_System_Users(session_id);
}
}


/*
// 获取系统信息
function Get_System_Info(session_id){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/system_info.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("session_id="+session_id);
}
*/
// 获取系统信息
function Get_System_Info(session_id){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				files_count.innerText = ResultJSON["files_count"];
				files_today_count.innerText = ResultJSON["files_today_count"];
				users_count.innerText = ResultJSON["users_count"];
				users_30day_count.innerText = ResultJSON["users_30day_count"];
			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/system_info.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("session_id="+session_id);
}



// 存放用户列表的 items
let users_items = document.getElementById('users-items');



// 修改用户密码
function Change_User_Password_By_User_ID(user_id,user_name){
	swal({
		title: "修改密码",
		text: "请输入新的密码(" + user_name + ")：",
		icon: "warning",
		buttons: ["取消","修改"],
		closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "请输入密码",
		      value:"",
		      type: "password",
		    },
		  },
		  dangerMode: true,
	}).then((value) => {
	  if (value) {


		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				let ResultJSON = JSON.parse(xmlhttp.responseText);
				if(ResultJSON["status"]){
					// window.location.href="/";
					swal('修改成功！');
				}else{
					if( document.getElementById('login-html')!=undefined ){
						setTimeout(Login,1);
					}else{
						window.location.href="login.html";
					}
				}
			}
		}
		xmlhttp.open("POST",api_server_url+"/php/v4/admin/change_user_password_by_user_id.php",true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.withCredentials = true;
		xmlhttp.send("user_id=" + user_id + "&password=" + value + "&session_id="+session_id);




	  }else{
	  	// 没有输入内容
	  	
	  }
	});
}


// 登入用户
function Login_User_By_User_ID(user_id){

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				window.location.href="/";
			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/login_user_by_user_id.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("user_id=" + user_id + "&session_id="+session_id);
}




// 冻结用户
function Set_Locked_User_By_User_ID(user_id,button_element,status,parent_users_item_profile){

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				button_element.status = status;
				if(status>0&&status<402){
					button_element.innerText = "冻结";
					parent_users_item_profile.style.filter = "grayscale(0%)";
				}else{
					button_element.innerText = "解冻";
					parent_users_item_profile.style.filter = "grayscale(100%)";
				}
			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/set_locked_user_by_user_id.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("status=" + status + "&user_id=" + user_id + "&session_id="+session_id);


}


// 根据大小返回单位和大小
function get_size_unit(size){
	let unit = 'B';
	if(size >= 1024){
		size /= 1024;
		unit = 'KB';
	}
	if(size >= 1024){
		size /= 1024;
		unit = 'MB';
	}
	if(size >= 1024){
		size /= 1024;
		unit = 'GB';
	}
	if(size >= 1024){
		size /= 1024;
		unit = 'TB';
	}
	if(size >= 1024){
		size /= 1024;
		unit = 'PB';
	}
	try{
		size = size.toFixed(2);
	}catch(e){};
	return size + unit;
}



// 限制用户每日上传文件数量
function Limit_User_To_Day_Upload_Number(user_id,limit_number,element){
    
    if(limit_number>999999999){
        limit_number = 999999999;
    }

    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				swal("设置成功！");
				if(limit_number>-1){
				    element.innerText = "限制(" + limit_number + ")";
				}else{
				    element.innerText = "限制";
				}
			}else{
				swal("设置失败！");
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/limit_user_to_day_upload_number.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("limit_number=" + limit_number + "&user_id=" + user_id + "&session_id="+session_id);


}



// 获取用户
let user_id = 0;
function Get_System_Users(session_id){

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
			    
			    pass_data = ResultJSON["pass"];

				if(body_nav_search_input_input.value!=''||user_id==0){
					users_items.innerHTML = '';
				}

				// 用户已登录
				for (var i = 0 ; i < ResultJSON["data"].length ;i++) {
					let item = ResultJSON["data"][i];

					let div = document.createElement('div');
					div.innerHTML = '<img class="users-item-profile" src="https://q1.qlogo.cn/g?b=qq&nk='+item["QQ"]+'&s=640"/><div class="users-item-name">'+item["Username"]+'</div><div class="users-item-buttons"><div class="users-item-button users-item-button-locked" >冻结</div><div class="users-item-button users-item-button-change-user-password-by-user-id">改密</div><div class="users-item-button users-item-button-delete">删除</div><div class="users-item-button users-item-button-login-user-by-user-id">详情</div><div class="users-item-button users-item-button-set-download">设下</div><div class="users-item-button users-item-button-set-public-link">设直</div><div class="users-item-button users-item-button-limit-user">限制</div><div class="users-item-button users-item-button-used-size">' + get_size_unit(item["UsedSize"]) + '</div>';
					div.className = "users-item";
					
					
					let download_ = undefined;
					let public_download_ = undefined;
					
					for(let ii = 0;ii < ResultJSON["pass"].length ; ii++ ){
					    if(ResultJSON["pass"][ii]["user_id"] == ("download_" + item["ID"] + ".php" ) ){
					        download_ = ResultJSON["pass"][ii]["number"];
					    }
					    
					    if(ResultJSON["pass"][ii]["user_id"] == ("public_download_" + item["ID"] + ".php" ) ){
					        public_download_ = ResultJSON["pass"][ii]["number"];
					    }
					    
					}
					
					
					
					div.users_item_button_set_download = div.getElementsByClassName('users-item-button-set-download')[0];
					div.users_item_button_set_download.user_id = item["ID"];
					div.users_item_button_set_download.user_name = item["Username"];
					div.users_item_button_set_download.onclick = function(){
					    // 设置自定义下载域名
					    New_Pass_Download_Domain_Name(this.user_name,this.user_id);
					}
					
					div.users_item_button_set_public_link = div.getElementsByClassName('users-item-button-set-public-link')[0];
					div.users_item_button_set_public_link.user_id = item["ID"];
					div.users_item_button_set_public_link.user_name = item["Username"];
					div.users_item_button_set_public_link.onclick = function(){
					    // 设置自定义直链域名
					    New_Pass_Public_Link_Domain_Name(this.user_name,this.user_id);
					}
					
					// 限制用户每日上传文件数量
					div.users_item_button_limit_user = div.getElementsByClassName('users-item-button-limit-user')[0];
					div.users_item_button_limit_user.user_id = item["ID"];
					div.users_item_button_limit_user.user_name = item["Username"];
					
					// 查询该用户是否在被限制列表
					
					for(let i2=0;i2<ResultJSON["limit"].length;i2++){
					    let item2 = ResultJSON["limit"][i2];
					    
					    if(item2["user_id"] == item["ID"]){
					        div.users_item_button_limit_user.innerText = "限制(" + item2["number"] + ")";
					        break;
					    }
					}
					
					div.users_item_button_limit_user.onclick = function(){
					    
					    swal({
                    		title: "上传限制",
                    		text: "限制该用户("+this.user_name+")每日最多可上传文件的数量。\r\n输入0-999999999表示限制最多可上传的文件数量。\r\n输入-1则表示不限制。",
                    		icon: "warning",
                    		buttons: ["取消","提交"],
                    		closeOnClickOutside: false,
                    		  content: {
                    		    element: "input",
                    		    attributes: {
                    		      placeholder: "-1/0-999999999",
                    		      value:"",
                    		      type: "number",
                    		    },
                    		  },
                    		  dangerMode: true,
                    	}).then((value) => {
                    	  if (value) {
                    	  	
                    	  	Limit_User_To_Day_Upload_Number(this.user_id,value,this);
                    	  	
                    	  }else{
                    	  	// 没有输入内容
                    	  	
                    	  }
                    	});
					    // Limit_User_To_Day_Upload_Number();
					    
					}

					// 强制登录
					div.users_item_button_login_user_by_user_id = div.getElementsByClassName('users-item-button-login-user-by-user-id')[0];
					div.users_item_button_login_user_by_user_id.user_id = item["ID"];
					div.users_item_button_login_user_by_user_id.user_name = item["Username"];
					div.users_item_button_login_user_by_user_id.password = item["Password"];
					div.users_item_button_login_user_by_user_id.VIPDatetime = item["VIPDatetime"];
					div.users_item_button_login_user_by_user_id.UsedSize = item["UsedSize"];
					div.users_item_button_login_user_by_user_id.Status = item["Status"];
					div.users_item_button_login_user_by_user_id.QQ = item["QQ"];
					div.users_item_button_login_user_by_user_id.onclick = function(){
					    swal('ID：'+this.user_id+'\r\nQQ：'+this.QQ+'\r\n账号：'+this.user_name+'\r\n密码：'+this.password+'\r\n占用：'+ get_size_unit(this.UsedSize) + '\r\n下载：' + download_ + '\r\n直链：' + public_download_);
					    return false;
						Login_User_By_User_ID(this.user_id);
					}

					// 修改密码
					div.users_item_button_change_user_password_by_user_id = div.getElementsByClassName('users-item-button-change-user-password-by-user-id')[0];
					div.users_item_button_change_user_password_by_user_id.user_id = item["ID"];
					div.users_item_button_change_user_password_by_user_id.user_name = item["Username"];
					div.users_item_button_change_user_password_by_user_id.onclick = function(){
						Change_User_Password_By_User_ID(this.user_id,this.user_name);
					}


					// 用户头像
					div.users_item_profile = div.getElementsByClassName('users-item-profile')[0];

					// 冻结用户
					div.locked_button = div.getElementsByClassName('users-item-button-locked')[0];
					div.locked_button.user_id = item["ID"];
					div.locked_button.status = item["Status"];
					if(div.locked_button.status>0&&div.locked_button.status<402){
						div.locked_button.innerText = "冻结";
						div.users_item_profile.style.filter = "grayscale(0%)";
					}else{
						div.locked_button.innerText = "解冻";
						div.users_item_profile.style.filter = "grayscale(100%)";
					}
					div.locked_button.parent_users_item_profile = div.users_item_profile;
					div.locked_button.onclick = function(){
						console.log(this.user_id);
						let status = 1;
						if(this.status>0&&this.status<402){
							status = 403;
						}
						Set_Locked_User_By_User_ID(this.user_id,this,status,this.parent_users_item_profile);
					}

					users_items.append(div);
					
				}


			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/users.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("keyword="+body_nav_search_input_input.value+"&user_id=" + user_id + "&session_id="+session_id);

}






// 获取用户信息，判断是否已经登录
function Userinfo(session_id){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录

				if( document.getElementById('login-html')!=undefined ){
					window.location.href="index.html";
				}

				// 如果在首页 获取系统信息
				if( document.getElementById('index-html')!=undefined ){
					Get_System_Info(session_id);
				}


				// 如果在用户管理页面 获取用户
				if( document.getElementById('users-html')!=undefined ){
					Get_System_Users(session_id);
				}


			}else{
				if( document.getElementById('login-html')!=undefined ){
					setTimeout(Login,1);
				}else{
					window.location.href="login.html";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/userinfo.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("session_id="+session_id);
}



let session_id = window.localStorage.getItem('session_id');

if(session_id==undefined){
	if( document.getElementById('login-html')==undefined ){
		window.location.href="login.html";
	}

}


// 退出登录
function DoLogout(session_id){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				window.location.href="login.html";
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/exit.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("session_id="+session_id);
}



// 左侧导航按钮
let nav_exit_button = document.getElementById('nav-exit-button');
let nav_users_button = document.getElementById('nav-users-button');
let nav_setting_button = document.getElementById('nav-setting-button');
let nav_home_button = document.getElementById('nav-home-button');


nav_exit_button.onclick = function(){
	DoLogout(session_id);
};


nav_users_button.onclick = function(){
	window.location.href = "users.html";
}

nav_setting_button.onclick = function(){
	window.location.href = "setting.html";
}

nav_home_button.onclick = function(){
	window.location.href = "index.html";
}


window.onload = function(){

	if( document.getElementById('login-html')!=undefined ){

		// 先尝试获取 session_id
		if(session_id==undefined){
			Login();
		}else{
			Userinfo(session_id);
		}

	}

	if( document.getElementById('index-html')!=undefined ){
		Userinfo(session_id);
	}

	if( document.getElementById('users-html')!=undefined ){
		Userinfo(session_id);
	}
	
	if( document.getElementById('setting-html')!=undefined ){
		Userinfo(session_id);
	}

}


let setting_main_input_input;
let setting_main_select_list_items;
let setting_main_select2_list_items;
let save_register_allow_button;
let save_preview_allow_button;
let new_pass_domain_name_button;
if(document.getElementById('setting-html')!=undefined){
    
    setting_main_select_list_items = document.getElementById('setting-main-select-list-items');
    setting_main_select2_list_items = document.getElementById('setting-main-select2-list-items');
    setting_main_input_input = document.getElementById('setting-main-input-input');
    save_register_allow_button = document.getElementById('save-register-allow-button');
    save_preview_allow_button = document.getElementById('save-preview-allow-button');
    new_pass_domain_name_button = document.getElementById('new-pass-domain-name-button');
}

function Save_Title(){
    if(setting_main_input_input.value.length<1){
        swal("内容不能为空！");
        return false;
    }
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录

				swal("保存成功！");


			}else{
				swal("保存失败！");
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/save_title.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("title=" + setting_main_input_input.value + "&session_id="+session_id);
}



// 保存是否允许文件被直接预览
function Save_Preview_Allow(){
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录

				swal("保存成功！");


			}else{
				swal("保存失败！");
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/save_allow_preview.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	let status = 1;
	if(document.getElementsByClassName('setting-main-select2-list-items-unlocked').length>0){
	    status = 0;
	}
	xmlhttp.send("preview_allow_locked=" + status + "&session_id="+session_id);
}



// 保存是否允许注册
function Save_Register_Allow(){
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录

				swal("保存成功！");


			}else{
				swal("保存失败！");
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/save_allow_register.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	let status = 1;
	if(document.getElementsByClassName('setting-main-select-list-items-unlocked').length>0){
	    status = 0;
	}
	xmlhttp.send("register_allow_locked=" + status + "&session_id="+session_id);
}



// 新增允许使用直链的域名
function New_Pass_Domain_Name(){
	swal({
		title: "新增域名",
		text: "新增允许使用直链的域名：",
		icon: "warning",
		buttons: ["取消","提交"],
		closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "请输入域名（例如：baidu.com、www.qq.com）",
		      value:"",
		      type: "text",
		    },
		  },
		  dangerMode: true,
	}).then((value) => {
	  if (value) {

	  	// 提交
	  	let xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange=function(){
    		if(xmlhttp.readyState==4 && xmlhttp.status==200){
    			let ResultJSON = JSON.parse(xmlhttp.responseText);
    			if(ResultJSON["status"]){
    				// 用户已登录
    				window.location.reload();
    				
    			}else{
    				swal("保存失败！");
    			}
    		}
    	}
    	xmlhttp.open("POST",api_server_url+"/php/v4/admin/new_pass_domain_name.php",true);
    	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	xmlhttp.withCredentials = true;
    	xmlhttp.send("domain_name=" + value + "&session_id="+session_id);

	  }else{
	  	// 没有输入内容

	  }
	});
}



// 新增用户自定义下载地址域名
function New_Pass_Download_Domain_Name(username,user_id){
	swal({
		title: "下载地址",
		text: "设定该用户("+username+")下载地址！\r\n输入-1表示清除自定义域名！",
		icon: "warning",
		buttons: ["取消","提交"],
		closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "请输入域名（例如：https://baidu.com 或 http://baidu.com）",
		      value:"",
		      type: "text",
		    },
		  },
		  dangerMode: true,
	}).then((value) => {
	  if (value) {
	      
	      if( value!=-1&& value.indexOf('://')==-1){
	          swal('输入有误！');
	          return false;
	      }

	  	// 提交
	  	let xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange=function(){
    		if(xmlhttp.readyState==4 && xmlhttp.status==200){
    			let ResultJSON = JSON.parse(xmlhttp.responseText);
    			if(ResultJSON["status"]){
    				// 用户已登录
    				// window.location.reload();
    				swal("设置成功！");
    			}else{
    				swal("保存失败！");
    			}
    		}
    	}
    	xmlhttp.open("POST",api_server_url+"/php/v4/admin/new_pass_download_domain_name.php",true);
    	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	xmlhttp.withCredentials = true;
    	xmlhttp.send("type=1&user_id="+user_id+"&domain_name=" + value + "&session_id="+session_id);

	  }else{
	  	// 没有输入内容

	  }
	});
}


// 新增用户自定义直链域名
function New_Pass_Public_Link_Domain_Name(username,user_id){
	swal({
		title: "直链地址",
		text: "设定该用户("+username+")直链地址！\r\n输入-1表示清除自定义域名！",
		icon: "warning",
		buttons: ["取消","提交"],
		closeOnClickOutside: false,
		  content: {
		    element: "input",
		    attributes: {
		      placeholder: "请输入域名（例如：https://baidu.com 或 http://baidu.com）",
		      value:"",
		      type: "text",
		    },
		  },
		  dangerMode: true,
	}).then((value) => {
	  if (value) {
        if( value!=-1&& value.indexOf('://')==-1){
	          swal('输入有误！');
	          return false;
	      }
	      
	  	// 提交
	  	let xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange=function(){
    		if(xmlhttp.readyState==4 && xmlhttp.status==200){
    			let ResultJSON = JSON.parse(xmlhttp.responseText);
    			if(ResultJSON["status"]){
    				// 用户已登录
    				// window.location.reload();
    				swal("设置成功！");
    			}else{
    				swal("保存失败！");
    			}
    		}
    	}
    	xmlhttp.open("POST",api_server_url+"/php/v4/admin/new_pass_download_domain_name.php",true);
    	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	xmlhttp.withCredentials = true;
    	xmlhttp.send("type=2&user_id="+user_id+"&domain_name=" + value + "&session_id="+session_id);

	  }else{
	  	// 没有输入内容

	  }
	});
}




// 删除域名文件
function Remove_Pass(domain_name,html_element){
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录
                html_element.remove();
               

			}else{
				
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/remove_pass.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("remove_pass="+domain_name+"&session_id="+session_id);
}


// 复制文本
function copy_text(text){
	let oInput = document.createElement('input');
	oInput.value = text;
	document.body.appendChild(oInput);
	oInput.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	oInput.className = 'oInput';
	oInput.style.display='none';
	oInput.remove();
}


// 域名情况
let pass_data = undefined;

// 获取设置中心信息


function Get_Setting_Info(){
    let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 用户已登录
				
				

                if(ResultJSON["web_title"].length>0){
                    setting_main_input_input.value = ResultJSON["web_title"];
                }
                // 如果注册没有被锁定 而是开放状态
                if(ResultJSON["register_allow_locked"]%2==0){
                    setting_main_select_list_items.click();
                }
                
                // 如果没有开启允许预览 1表示不可以预览文件 0表示可以
                if(ResultJSON["preview_allow_locked"]%2==0){
                    setting_main_select2_list_items.click();
                }
                
				
				for(let i=0;i<ResultJSON["pass"].length;i++){
				    let item = ResultJSON["pass"][i];
				    if(item["domain"].indexOf('download_')!=-1){
				        continue;
				    }
				    let div = document.createElement('div');
				    div.className = "setting-main-order-list-item";
				    div.innerHTML = item["domain"].split('.php')[0] + '（用户账号@'+item["username"]+'） <span class="setting-main-order-list-item-remove-button"><i class="fa fa-trash"></i>删除</span><span class="setting-main-order-list-item-copy-button"><i class="fa fa-copy"></i>复制用户账号</span>';
				    div.remove_button = div.getElementsByClassName('setting-main-order-list-item-remove-button')[0];
				    
				    div.copy_username_button = div.getElementsByClassName('setting-main-order-list-item-copy-button')[0];
				    div.copy_username_button.username = item["username"];
				    div.copy_username_button.onclick = function(){
				        copy_text(this.username);
				        swal('复制成功！\r\n您可以在用户管理搜索该用户，点击详情按钮查看该账号密码，并登录该账号。');
				    }
				    
				    div.remove_button.domain_name = item["domain"].split('.php')[0];
				    div.remove_button.html_element = div;
				    div.remove_button.onclick = function(){
				        
				        
				        swal({
                    		title: "删除域名",
                    		text: "您是否要删除域名" + this.domain_name + "？",
                    		icon: "warning",
                    		buttons: true,
                    		dangerMode: true,
                    		closeOnClickOutside: false,
                    	}).then((willDelete) => {
                    		if (willDelete) {
                    			Remove_Pass(this.domain_name,this.html_element);
                    		}
                    	});
				        
				    }
				    setting_main_order_list_items.append(div);
				}


			}else{
				
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/admin/setting_info.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("session_id="+session_id);
}



// 允许哪些网站使用直链
let setting_main_order_list_items = document.getElementById('setting-main-order-list-items');


// 允许注册
if(document.getElementById('setting-html')!=undefined){
    
    
    
    Get_Setting_Info();
    
    new_pass_domain_name_button.onclick = function(){
        New_Pass_Domain_Name();
    };
    
    
    let save_title_button = document.getElementById('save-title-button');
    
    save_title_button.onclick = function(){
        Save_Title();
    }
    
    save_register_allow_button.onclick = function(){
        Save_Register_Allow();
    }
    
     save_preview_allow_button.onclick = function(){
        Save_Preview_Allow();
    }



	

	setting_main_select_list_items.locked_status = true;

	setting_main_select_list_items.onclick = function(){

		if(this.locked_status){

			this.className = "setting-main-select-list-items setting-main-select-list-items-unlocked";
			this.getElementsByClassName('setting-main-select-list-items-h1')[0].innerText = "允许";

		}else{
			this.className = "setting-main-select-list-items setting-main-select-list-items-locked";
			this.getElementsByClassName('setting-main-select-list-items-h1')[0].innerText = "禁止";
		}

		setting_main_select_list_items.locked_status = !setting_main_select_list_items.locked_status;

	}
	
	
	setting_main_select2_list_items.locked_status = true;

	setting_main_select2_list_items.onclick = function(){

		if(this.locked_status){

			this.className = "setting-main-select2-list-items setting-main-select2-list-items-unlocked";
			this.getElementsByClassName('setting-main-select2-list-items-h1')[0].innerText = "允许";

		}else{
			this.className = "setting-main-select2-list-items setting-main-select2-list-items-locked";
			this.getElementsByClassName('setting-main-select2-list-items-h1')[0].innerText = "禁止";
		}

		setting_main_select2_list_items.locked_status = !setting_main_select2_list_items.locked_status;

	}




}