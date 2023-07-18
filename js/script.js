

// 2023/3/7 14:33 1
let js_script_js_update_version = 202303071433000001;




/*
window.history.pushState(null,null,"/");
//地址变动不刷新
文件按照大小排序
let files_items = files_items_files_items.getElementsByClassName('files-item');
for(let i=0;i<files_items.length;i++){
let file_item = files_items[i];
//alert(i + ' --');
for(let i2=0;i2<i;i2++){
let file_item_i2 = files_items[i2];
//alert(i2 + ' ---');
//alert(file_item.size + '---' + file_item_i2.size);
//alert(file_item.size<file_item_i2.size);
if(parseInt(file_item.size)<parseInt(file_item_i2.size)){
//alert('小于');
// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
file_item_i2.parentNode.insertBefore(file_item,file_item_i2);
//alert(i + ' -' + i2);
i2--;
i--;
}
}
}
*/


// 排序代码来自 https://www.cnblogs.com/sanrenblog/p/16623040.html 我十分致敬作者的水平！
/**
 * 比较字符串
 * @param str1
 * @param str2
 */
function strCompare(str1, str2) {
    // 处理数据为null的情况
    if (str1 == undefined && str2 == undefined) {
        return 0;
    }
    if (str1 == undefined) {
        return -1;
    }
    if (str2 == undefined) {
        return 1;
    }

    // 比较字符串中的每个字符
    let c1;
    let c2;

    let regexArr = ['-', '_', '—', '~', '·'], canRegex = /[^0-9\.]/g;
    // 如果都不是数字格式（含有其它内容）
    if (canRegex.test(str1) && canRegex.test(str2)) {
        for (let i = 0; i < regexArr.length; i++) {
            let regex = eval('(/[^0-9\\' + regexArr[i] + '\\.]/g)');
            // 去除后缀
            let tps1 = str1.replace(/\.[0-9a-zA-Z]+$/, '');
            let tps2 = str2.replace(/\.[0-9a-zA-Z]+$/, '');
            // 如果在名字正则要求范围内（没有正则以外的值）
            if (!regex.test(tps1) && !regex.test(tps2)) {
                // 转换为字符串数组
                let numberArray1 = tps1.split(regexArr[i]);
                let numberArray2 = tps2.split(regexArr[i]);
                return compareNumberArray(numberArray1, numberArray2);
            }
        }
    }

    // 逐字比较返回结果
    for (let i = 0; i < str1.length; i++) {
        c1 = str1[i];
        if (i > str2.length - 1) { // 如果在该字符前，两个串都一样，str2更短，则str1较大
            return 1;
        }
        c2 = str2[i];
        // 如果都是数字的话，则需要考虑多位数的情况，取出完整的数字字符串，转化为数字再进行比较
        if (isNumber(c1) && isNumber(c2)) {
            let numStr1 = "";
            let numStr2 = "";
            // 获取数字部分字符串
            for (let j = i; j < str1.length; j++) {
                c1 = str1[j];
                if (!isNumber(c1) && c1 !== '.') { // 不是数字则直接退出循环
                    break;
                }
                numStr1 += c1;
            }
            for (let j = i; j < str2.length; j++) {
                c2 = str2[j];
                if (!isNumber(c2) && c2 !== '.') {
                    break;
                }
                numStr2 += c2;
            }
            // 将带小数点的数字转换为数字字符串数组
            let numberArray1 = numStr1.split('.');
            let numberArray2 = numStr2.split('.');
            return compareNumberArray(numberArray1, numberArray2);
        }

        // 不是数字的比较方式
        if (c1 != c2) {
            return c1 - c2;
        }
    }
    return 0;
}

/**
 * 判断是否为数字
 * @param obj
 * @returns
 */
function isNumber(obj) {
    if (parseFloat(obj).toString() == "NaN") {
        return false;
    }
    return true;
}

/**
 * 比较两个数字数组
 *
 * @param numberArray1
 * @param numberArray2
 */
function compareNumberArray(numberArray1, numberArray2) {
    for (let i = 0; i < numberArray1.length; i++) {
        if (numberArray2.length < i + 1) { // 此时数字数组2比1短，直接返回
            return 1;
        }
        let compareResult = parseInt(numberArray1[i]) - parseInt(numberArray2[i]);
        if (compareResult != 0) {
            return compareResult;
        }
    }
    // 说明数组1比数组2短，返回小于
    return -1;
}

/*
let arr = ["5栋", "7栋", "4栋", "4.5栋", "4.1栋", "4栋", "15栋", "24栋"];
arr.sort(function(str1, str2) {
    return strCompare(str1, str2)
});
*/

// 是否从文件名排序，可能对非英语文字文本无效
let files_order_by_name_function_order_is_123 = true; // 是否正序
function files_order_by_name_function(){
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	let files_items_json_info_array = new Array();
	for(let i=0;i<files_items.length;i++){
		let item = files_items[i];
		files_items_json_info_array.push({
			"name":item.name,
			"size":item.size,
			"id":item.item_id
		});
	}
	// alert(JSON.stringify(files_items_json_info_array));
	//[{"name":"01.mp4","size":"313207866","id":"176132"},{"name":"13.mp4","size":"203651797","id":"176120"},{"name":"08.mp4","size":"304623668","id":"176127"},{"name":"04.mp4","size":"280701895","id":"176126"},{"name":"10.mp4","size":"262996367","id":"176129"},{"name":"02.mp4","size":"238375914","id":"176128"},{"name":"03.mp4","size":"274166392","id":"176131"},{"name":"11.mp4","size":"215385843","id":"176121"},{"name":"06.mp4","size":"254527332","id":"176130"},{"name":"07.mp4","size":"219882772","id":"176125"},{"name":"12.mp4","size":"197584877","id":"176122"},{"name":"05.mp4","size":"231547172","id":"176124"},{"name":"09.mp4","size":"210474913","id":"176123"},{"name":"17.mp4","size":"187836470","id":"176119"},{"name":"15.mp4","size":"99511843","id":"176118"},{"name":"16.mp4","size":"52202176","id":"176117"},{"name":"18.mp4","size":"41405850","id":"176116"}]
	let files_items_json_info_array_for_name = new Array();
	for(let i=0;i<files_items_json_info_array.length;i++){
		let item = files_items_json_info_array[i];
		files_items_json_info_array_for_name.push(item["name"]);
	}
	let name_order_result = files_items_json_info_array_for_name.sort(function(str1, str2) {
		if(files_order_by_name_function_order_is_123){
			return strCompare(str1, str2)
		}else{
			return strCompare(str2, str1)
		}
	});
	for(let i=0;i<name_order_result.length;i++){
		let item = name_order_result[i];
		// 开始查看哪些文件名称是这个，是的话，放到第一位
		for(let i2=0;i2<files_items.length;i2++){
			let item2 = files_items[i2];
			if(item2.name == item){
				files_items[0].parentNode.insertBefore(item2,files_items[0]);
			}
		}
	}
	files_order_by_name_function_order_is_123 = !files_order_by_name_function_order_is_123;
}
let files_order_name_button = document.getElementById('files-order-name-button');
if(files_order_name_button!=undefined){
	files_order_name_button.onclick = files_order_by_name_function;
}



// 是否从大到小排序？
let files_order_by_size_by_max = true;
function files_order_by_size_function(){
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	for(let i=0;i<files_items.length;i++){
		let file_item = files_items[i];
		//alert(i + ' --');
		for(let i2=0;i2<i;i2++){
			let file_item_i2 = files_items[i2];
			//alert(i2 + ' ---');
			//alert(file_item.size + '---' + file_item_i2.size);
			//alert(file_item.size<file_item_i2.size);
			// 判断排序方法
			if(files_order_by_size_by_max){
				if(parseInt(file_item.size)>parseInt(file_item_i2.size)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					file_item_i2.parentNode.insertBefore(file_item,file_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}else{
				if(parseInt(file_item.size)<parseInt(file_item_i2.size)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					file_item_i2.parentNode.insertBefore(file_item,file_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}

		}
	}
}
let files_order_size_button = document.getElementById('files-order-size-button');
files_order_size_button.onclick = function(){
	files_order_by_size_function();
	files_order_by_size_by_max=!files_order_by_size_by_max;
}

let login_content_logo = document.getElementById('login-content-logo');
login_content_logo.onclick = function(){

}

// 是否从新到旧排序？
let files_order_by_date_by_int_max = true;
function files_order_by_date_int_function(){
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	for(let i=0;i<files_items.length;i++){
		let file_item = files_items[i];
		//alert(i + ' --');
		for(let i2=0;i2<i;i2++){
			let file_item_i2 = files_items[i2];
			//alert(i2 + ' ---');
			//alert(file_item.size + '---' + file_item_i2.size);
			//alert(file_item.size<file_item_i2.size);
			// 判断排序方法
			if(files_order_by_date_by_int_max){
				if(parseInt(file_item.date_int)>parseInt(file_item_i2.date_int)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					file_item_i2.parentNode.insertBefore(file_item,file_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}else{
				if(parseInt(file_item.date_int)<parseInt(file_item_i2.date_int)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					file_item_i2.parentNode.insertBefore(file_item,file_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}

		}
	}

	// 文件夹
	let folders_items = files_items_folders_items.getElementsByClassName('files-item');
	for(let i=0;i<folders_items.length;i++){
		let folder_item = folders_items[i];
		//alert(i + ' --');
		for(let i2=0;i2<i;i2++){
			let folder_item_i2 = folders_items[i2];
			//alert(i2 + ' ---');
			//alert(file_item.size + '---' + file_item_i2.size);
			//alert(file_item.size<file_item_i2.size);
			// 判断排序方法
			if(files_order_by_date_by_int_max){
				if(parseInt(folder_item.date_int)>parseInt(folder_item_i2.date_int)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					folder_item_i2.parentNode.insertBefore(folder_item,folder_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}else{
				if(parseInt(folder_item.date_int)<parseInt(folder_item_i2.date_int)){
					//alert('小于');
					// let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
					// insert_before_element.parentNode.insertBefore(file_item,insert_before_element);
					folder_item_i2.parentNode.insertBefore(folder_item,folder_item_i2);
					//alert(i + ' -' + i2);
					i2--;
					i--;
				}
			}

		}
	}

}
let files_order_date_button = document.getElementById('files-order-date-button');
files_order_date_button.onclick = function(){
	files_order_by_date_int_function();
	files_order_by_date_by_int_max=!files_order_by_date_by_int_max;
}




let free_or_mini_or_big_vip = document.getElementById('free-or-mini-or-big-vip');

let ad_items = document.getElementsByClassName('sharefile-ad-only-one');
if(navigator.language.toLowerCase().indexOf('cn')==-1){
	
	for(let i=0;i<ad_items.length;i++){let item = ad_items[i];item.remove();i--;}
	
	free_or_mini_or_big_vip.remove();
}

let download_media_locked = false;
if(window.location.href.indexOf('/download/media/')!=-1){
	download_media_locked = true;
	let download_media_url = window.location.href.split('#')[0];
	let download_media_uri = download_media_url.split('123.com')[1];
	let download_media_uri_array = download_media_uri.split('/');
	if(
		download_media_uri_array.length==5
		&&
		download_media_uri_array[0]==""
		&&
		download_media_uri_array[1]=="download"
		&&
		download_media_uri_array[2]=="media"
		&&
		download_media_uri_array[3].length==38
		&&
		download_media_uri_array[4]!=""
	){
		// let file_name = download_media_uri_array[4].split('#')[0];
		// file_name = file_name.split('?')[0];
		swal({
			title: "下载文件？",
			text: "下载（" + decodeURIComponent(download_media_uri_array[4]) + "）文件？",
			icon: "warning",
			buttons: true,
			dangerMode: true,
			closeOnClickOutside: false,
		}).then((willDelete) => {
			if(willDelete){
				// download_media_url = download_media_url.split('#')[0];
				// download_media_url = download_media_url.split('?')[0];
				window.open(download_media_url);
			}
			setTimeout(function(){
				window.location.href="/";
			},100);
		});

	}

}
if(window.location.href.split('#').length<2){
	window.location.href="#login";
}
document.domain="dnstop.cc";
let upload_window_iframe_element = document.getElementById('upload-window-iframe-element');
// 是否已经开始进行文件上传了
let upload_window_iframe_element_src_locked = false;
let show_upload_full_screen_mask = false;
// 获取 cookie
function get_cookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
// 保存用户信息的数组
let userinfo = {};
let session_id = get_cookie("PHPSESSID");
if( session_id != undefined && session_id != null && session_id != "" ){
	userinfo["session_id"] = session_id;
}
// 首页顶部应用列表
let top_apps = [

	{
		"name":"12345",
		"link":"http://yunzhongzhuan.com",
		"description":"12345-567",
		"icon":"//global.yunzhongzhuan.com/img/logo.png",
		// "icon":"//tva1.sinaimg.cn/mw2000/005CbWF8gy1h16lkvt5ubj30go0goq4h.jpg",
		"new_open":false
	}
	
];
// 首页顶部应用列表
let top_applications_items = document.getElementById('top-applications-items');
// 循环把首页顶部应用列表输出
for(let i=0;i<top_apps.length;i++){
	let item = top_apps[i];
	let div = document.createElement('div');
	div.className = "top-applications-item";
	div.style.backgroundImage = "url('" + item["icon"] + "')";
	div.title = item["description"];
	div.new_open = item["new_open"];
	div.onclick = function(){
		if(this.new_open){
			window.open(item["link"]);
		}else{
			window.location.href=item["link"];
		}
		
		return false;
		/*
		swal({
			title: "访问应用",
			text: "准备访问" + item["name"] + "！",
			icon: "success",
			buttons: true,
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				window.open(item["link"]);
			}
		});
		*/
	}
	top_applications_items.append(div);
}
// 搜索输入框
let files_search_input = document.getElementById('files-search-input');
files_search_input.placeholder = "搜索文件";
// 导航栏元素
let nav = document.getElementById('nav');
nav.show = false;
// 隐藏导航栏元素
let hide_nav_button = document.getElementById('hide-nav-button');
hide_nav_button.onclick = nav_hide();
function nav_hide(){
	nav.show = false;
	// nav.style.left = "-" + nav.offsetWidth + "px";
	nav.style.left = "";
}
let show_nav_button = document.getElementById('show-nav-button');
show_nav_button.onclick = function(){
	nav.show = true;
	nav.style.left = "-0px";	
}
// 是否按下 CTRL 键
let keyon_ctrl = false;
// 监听 visibility change 事件 
document.addEventListener('visibilitychange',function(){
  var isHidden = document.hidden;
   if(isHidden){
	keyon_ctrl = false;
   }
  }
);
// 搜索内容老的输入内容
let files_search_input_value_old = "";
// 键盘按下
document.onkeydown = function (e) {
	e = e || window.event;
	if ((e.ctrlKey && e.keyCode == 82) || // ctrl+R
		e.keyCode == 116) {
		// F5刷新，禁止
		// return false;
	}
	if (e.keyCode == 27){ // esc
		// console.log('esc');
		wechat_verify_clear_timeout();
	}
	if (e.ctrlKey && e.keyCode == 17) {// CTRL 按下
		keyon_ctrl = true;
		return false;
	}
	// 如果按下回车键
	if (e.keyCode == 13){
		if(document.activeElement.id=="files-search-input"){
			if(document.activeElement.value==files_search_input_value_old){
				return false;
			}
			// console.log('搜索');
			try{clearTimeout(files_search_function_timeout);}catch(e){};
			files_search_function_timeout = setTimeout(function(){
				folders_items_selected_array = [];
				files_items_selected_array = [];
				get_files_folders_index = 0;
				files_reload();
			},2);
		}
	}
}
// 放开键盘
document.onkeyup = function (e){
	e = e || window.event;
	let keycode = e.keyCode;
	if (keycode == 17)
	{
		keyon_ctrl = false;
		return false;
	}
}
// 保存文件夹的列表
let files_items_folders_items = document.getElementById('files-items-folders-items');
// 保存文件的列表
let files_items_files_items = document.getElementById('files-items-files-items');
// 已经选中的文件和文件夹数组
let folders_items_selected_array = [];
let files_items_selected_array = [];
// 取消选中文件或文件夹
function unselected_files(){
	let folders = files_items_folders_items.getElementsByClassName('files-item');
	folders_items_selected_array = [];
	for(let i=0;i<folders.length;i++){
		let item = folders[i];
		if(item.selected){
			item.name_element.click();
		}
	}
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	files_items_selected_array = [];
	for(let i=0;i<files_items.length;i++){
		let item = files_items[i];
		if(item.selected){
			item.name_element.click();
		}
	}
}
// 关闭所有展开的文件或文件夹右侧菜单操作
function unshowmenu_files(){
	let folders = files_items_folders_items.getElementsByClassName('files-item');
	for(let i=0;i<folders.length;i++){
		let item = folders[i];
		if(item.menu!=undefined&&item.menu.show!=undefined&&item.menu.items!=undefined&&item.menu.show){
			// console.log(item);
			item.menu.show = false;
			item.menu.items.className = "files-item-menu-items files-item-menu-items-hide";
		}
	}
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	for(let i=0;i<files_items.length;i++){
		let item = files_items[i];
		if(item.menu!=undefined&&item.menu.show!=undefined&&item.menu.items!=undefined&&item.menu.show){
			// console.log(item);
			item.menu.show = false;
			item.menu.items.className = "files-item-menu-items files-item-menu-items-hide";
		}
	}
}
// 清空文件列表
let remove_files_items_running = false;
function remove_files_items(){
	remove_files_items_running = true;
	page_scroll_height_function_locked = true;
	// 如果位于第一层 隐藏返回上一级按钮
	if(get_files_folders_index==0){
		back_parent_folder_button.className = "files-item files-item-hide";
	}else{
		back_parent_folder_button.className = "files-item";
	}
	// 文件和文件夹总数
	let folders = files_items_folders_items.getElementsByClassName('files-item');
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	let files_num = files_items.length + folders.length;
	// 先移除当前目录的文件夹和文件
	for(let i=0;i<folders.length;i++){
		let item = folders[i];
		setTimeout(function(){
			item.className = "files-item files-item-hide";
			setTimeout(function(){
				item.remove();
			},310);
		},(i+1)*20);
	}
	// 先移除当前目录的文件夹和文件
	for(let i=0;i<files_items.length;i++){
		let item = files_items[i];
		setTimeout(function(){
			item.className = "files-item files-item-hide";
			setTimeout(function(){
				item.remove();
			},310);
		},(i+1)*20);
	}
	setTimeout(function(){
		remove_files_items_running = false;
	},((files_num*20)+60) );
	return files_num;
}
// 返回上一级按钮
let back_parent_folder_button = document.getElementById('back-parent-folder-button');
back_parent_folder_button.ondblclick = function(){
	folders_items_selected_array = [];
	files_items_selected_array = [];
	get_files_folders_index--;
	if(get_files_folders_index<0){get_files_folders_index=0};
	// get_files_folders_array.pop();
	let files_num = remove_files_items();
	setTimeout(function(){
		get_files_page = 0;
		get_folders_page = 0;
		get_folders_loadover = false;
		get_files_loadover = false;
		page_scroll_height_function_locked = false;
		get_files();
	},( ( files_num + 3) * 10 / 2 ) + 30 );
}
back_parent_folder_button.getElementsByClassName('files-item-name')[0].getElementsByTagName('span')[0].onclick = back_parent_folder_button.ondblclick;
// 加载文件夹到列表中
function push_folders_to_files_page(folders_items,isPrepend){
	// 文件夹数据
	/*
	let folders_items = [
		{
			"name":"古天乐电影全集",
			"date":"2021-11-06 13:29:05",
			"id":"31",
			"parent":"0"
		},
		{
			"name":"成龙电影系列",
			"date":"2021-11-09 22:00:31",
			"id":"65",
			"parent":"0"
		},
		{
			"name":"古天乐电影全集",
			"date":"2021-11-06 13:29:05",
			"id":"31",
			"parent":"0"
		},
		{
			"name":"成龙电影系列",
			"date":"2021-11-09 22:00:31",
			"id":"65",
			"parent":"0"
		},
		{
			"name":"古天乐电影全集",
			"date":"2021-11-06 13:29:05",
			"id":"31",
			"parent":"0"
		},
		{
			"name":"成龙电影系列",
			"date":"2021-11-09 22:00:31",
			"id":"65",
			"parent":"0"
		}
	];
	*/
	// 输出文件夹
	for(let i=0;i<folders_items.length;i++){
		let item = folders_items[i];
		let div = document.createElement('div');
		div.className = "files-item files-item-hide";
		div.name = item["name"];
		div.date = item["date"];
		div.date_int = item["date_int"];
		div.item_id = item["id"];
		div.parent = item["parent"];
		div.userid = item["userid"];
		div.innerHTML = '<div class="files-item-icon"><i class="fa fa-folder"></i></div><div class="files-item-name"><span>' + div.name + '</span></div><div class="files-item-date"><span>' + div.date + '</span></div><div class="files-item-size"><span>文件夹</span></div><div class="files-item-menu" title="菜单"><i class="fa fa-bars"></i><div class="files-item-menu-items files-item-menu-items-hide"><div class="files-item-menu-item files-item-menu-item-rename-button"><i class="fa fa-pencil"></i>命名</div><div class="files-item-menu-item files-item-menu-item-delete-button"><i class="fa fa-trash"></i>删除</div></div></div>';
		
		if( div.userid != userinfo["id"] ){
		    let div2 = document.createElement('div');
		    div2.className = "files-item-warning";
		    div2.innerHTML = '<i class="fa fa-user-plus"></i>';
		    div2.title = "该文件夹由用户（ID：" + div.userid.split('.')[0] + "）创建，操作该文件夹前请注意！";
		    div2.style.cursor = "pointer";
		    div2.onclick = function(){
		        swal("该文件夹由用户（ID：" + div.userid.split('.')[0] + "）创建，操作该文件夹前请注意！");
		    }
		    div.append(div2);
		}
		
		div.selected = false;
		div.name_element = div.getElementsByClassName('files-item-name')[0];
		div.name_element.title = div.name;
		div.name_element.parent = div;
		div.name_element.onclick = function(){
			if(!this.parent.selected){
				// 如果未按下 CTRL 先清空其他的选中文件或文件夹
				if(!keyon_ctrl){
					unselected_files();
				}
				if(this.parent.offline_id!=undefined){
					this.parent.className = "files-item files-item-offline-item files-item-selected";
				}else{
					this.parent.className = "files-item files-item-selected";
				}
			}else{
				if(this.parent.offline_id!=undefined){
					this.parent.className = "files-item files-item-offline-item";
				}else{
					this.parent.className = "files-item";
				}
				
				this.parent.selected = false;
				if(!keyon_ctrl){
					unselected_files();
				}
				return false;
			}
			this.parent.selected = !this.parent.selected;
			folders_items_selected_array.push(this.parent);
		}
		div.date_element = div.getElementsByClassName('files-item-date')[0];
		div.date_element.parent = div;
		div.date_element.onclick = div.name_element.onclick;
		div.size_element = div.getElementsByClassName('files-item-size')[0];
		div.size_element.parent = div;
		div.size_element.onclick = div.name_element.onclick;
		div.icon_element = div.getElementsByClassName('files-item-icon')[0];
		div.icon_element.parent = div;
		div.icon_element.onclick = div.name_element.onclick;
		div.menu = div.getElementsByClassName('files-item-menu')[0];
		div.menu.items = div.menu.getElementsByClassName('files-item-menu-items')[0];
		div.menu.show = false;
		div.menu.onclick = function(){
			if(files_options_items.show){
				files_options.click();
			}
			if(!this.show){
				unshowmenu_files();
				this.show = !this.show;
				this.items.className = "files-item-menu-items";
				return false;
			}else{
				this.items.className = "files-item-menu-items files-item-menu-items-hide";
			}
			this.show = !this.show;
		}
		div.ondblclick = function(){
			while( get_files_folders_index < get_files_folders_array.length-1 ){
				get_files_folders_array.pop();
			}
			get_files_folders_index++;
			get_files_folders_array.push(this.item_id);
			let files_num = remove_files_items();
			setTimeout(function(){
				folders_items_selected_array = [];
				files_items_selected_array = [];
				get_files_page = 0;
				get_folders_page = 0;
				get_folders_loadover = false;
				get_files_loadover = false;
				page_scroll_height_function_locked = false;
				files_search_input.value="";
				get_files();
			},( ( files_num + 3) * 10 / 2 ) + 30 );
		}
		div.name_span_element = div.name_element.getElementsByTagName('span')[0];
		div.name_span_element.item_id = div.item_id;
		div.name_span_element.onclick = div.ondblclick;
		div.menu_rename_element = div.getElementsByClassName('files-item-menu-item-rename-button')[0];
		div.menu_rename_element.parent = div;
		div.menu_rename_element.onclick = function(){
			folders_items_selected_array = [];
			files_items_selected_array = [];
			unselected_files();
			folders_items_selected_array[0] = this.parent;
			if(this.parent.offline_id!=undefined){
				this.parent.className = "files-item files-item-offline-item files-item-selected";
			}else{
				this.parent.className = "files-item files-item-selected";
			}
			
			this.parent.selected = true;
			files_rename_button.onclick();
		}
		div.menu_delete_element = div.getElementsByClassName('files-item-menu-item-delete-button')[0];
		div.menu_delete_element.parent = div;
		if(div.userid != userinfo["id"]){
		    div.menu_delete_element.style.cursor = "no-drop";
		}
		div.menu_delete_element.onclick = function(){
		    if(this.parent.userid != userinfo["id"]){
		        swal('由于系统结构比较复杂，涉及每个用户账号容量计算等问题，不允许超级管理员直接对用户文件夹进行删除操作！如需操作该文件夹，请您从系统后台查询该用户ID（'+this.parent.userid+'），登陆该用户账号进行操作！');
		        return false;
		    }
			folders_items_selected_array = [];
			files_items_selected_array = [];
			unselected_files();
			folders_items_selected_array[0] = this.parent;
			if(this.parent.offline_id!=undefined){
				this.parent.className = "files-item files-item-offline-item files-item-selected";
			}else{
				this.parent.className = "files-item files-item-selected";
			}
			this.parent.selected = true;
			files_delete_items();
		}
		if(isPrepend!=undefined&&isPrepend){
			files_items_folders_items.prepend(div);
		}else{
			files_items_folders_items.append(div);
		}
		setTimeout(function(){
			div.className = "files-item";
		},(i+1)*50);
	}
}
// 网站首页添加文件等任务操作
let files_options_items = document.getElementById('files-options-items');
/*let files_options_item_client_download_button = document.getElementById('files-options-item-client-download-button');
files_options_item_client_download_button.onclick = function(){
	setTimeout(function(){
		files_options_items.show=false;
		files_options_items.className="files-options-items files-options-items-hide";
	},10);
	window.open('//client.123.com/');
}
*/
let files_client_download_button = document.getElementById('files-client-download-button');
files_client_download_button.onclick = function(){
	window.open('//client.123.com/');
}
files_options_items.style.height = ( ( 45 * files_options_items.getElementsByClassName('files-options-item').length ) + 0 ) + "px";
files_options_items.className = "files-options-items files-options-items-hide";
files_options_items.show = false;
let files_options = document.getElementById('files-options');
files_options.onclick = function(){
	unshowmenu_files();
	files_options_items.show = !files_options_items.show;
	if(files_options_items.show){
		files_options_items.className = "files-options-items";
	}else{
		files_options_items.className = "files-options-items files-options-items-hide";
	}
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
// 删除文件或文件夹
function files_delete_items(){
    // 可能存在非本人持有的文件，若有不支持删除！
    let have_file_or_folder_is_not_my_id = false;
	let folders_id = [];
	let folders_will_delete_element = [];
	for(let i=0;i<folders_items_selected_array.length;i++){
	    if(have_file_or_folder_is_not_my_id){
	        break;
	    }
	    if(folders_items_selected_array[i].userid != userinfo["id"]){
	        have_file_or_folder_is_not_my_id = true;
	        break;
	    }
		folders_id.push(folders_items_selected_array[i].item_id);
		folders_will_delete_element.push(folders_items_selected_array[i]);
	}
	folders_id = folders_id.toString();
	// console.log(folders_id);
	let files_id = [];
	let files_will_delete_element = [];
	for(let i=0;i<files_items_selected_array.length;i++){
	    if(have_file_or_folder_is_not_my_id){
	        break;
	    }
	    if(files_items_selected_array[i].userid_hashid.split('.')[0] != userinfo["id"]){
	        have_file_or_folder_is_not_my_id = true;
	        break;
	    }
		files_id.push(files_items_selected_array[i].item_id);
		files_will_delete_element.push(files_items_selected_array[i]);
	}
	files_id = files_id.toString();
	// console.log(files_id);
	let parent_folder_id = get_files_folders_array[get_files_folders_index];
	// console.log(parent_folder_id);
	if(have_file_or_folder_is_not_my_id){
	    swal('您选中的文件或文件夹，其中包括不属于您的文件或文件夹，不支持超级管理员直接对文件或文件夹进行操作，请寻找相应用户ID，通过后台查询账号，并点击详情，进行单独登陆删除！');
	    return false;
	}
	swal({
		title: "危险操作",
		text: "是否删除文件？",
		icon: "warning",
		buttons: true,
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			
			swal({
				title: "正在删除",
				text: '正在删除。',
				icon: "warning",
				dangerMode: true,
				closeOnClickOutside: false,
			});
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					let ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){
						files_unpaste_button.click();
						swal({
							title: "删除成功",
							text: '删除成功！',
							icon: "success",
							dangerMode: true,
							closeOnClickOutside: false,
						});
						for(let i=0;i<folders_will_delete_element.length;i++){
							let item = folders_will_delete_element[i];
							setTimeout(function(item){
								item.className = "files-item files-item-hide";
								setTimeout(function(item){
									item.remove();
								},300,item);
							},(i+1)*50,item);
						}
						for(let i=0;i<files_will_delete_element.length;i++){
							let item = files_will_delete_element[i];
							setTimeout(function(item){
								item.className = "files-item files-item-hide";
								setTimeout(function(item){
									item.remove();
								},300,item);
							},(i+1)*50,item);
						}
					}else{
						swal({
							title: "删除失败",
							text: ResultJSON["message"],
							icon: "error",
							// buttons: true,
							// dangerMode: true,
							closeOnClickOutside: false,
						});
					}
					get_usedsize_function();
				}
			}
			xmlhttp.open("POST",api_server_url+"/php/v4/files_delete.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.withCredentials = true;
			xmlhttp.send("folders_id="+folders_id+"&files_id="+files_id+"&parent_folder_id="+parent_folder_id+"&session_id="+userinfo["session_id"]);
			
			
		}
	});
	
	
	
}
function push_files_to_files_page(files_items,isPrepend){
	// 文件数据
	/*
	let files_items = [
		{
			"name":"闹钟.mp4",
			"date":"2021-06-11 12:02:45",
			"size":"1024",
			"id":"330",
			"parent":"0"
		},
		{
			"name":"东京女孩.mp4",
			"date":"2021-07-29 11:40:43",
			"size":"96409600",
			"id":"6501",
			"parent":"0"
		},
		{
			"name":"东京女孩.mp4",
			"date":"2021-07-29 11:40:43",
			"size":"96409600",
			"id":"6501",
			"parent":"0"
		},
		{
			"name":"东京女孩.mp4",
			"date":"2021-07-29 11:40:43",
			"size":"96409600",
			"id":"6501",
			"parent":"0"
		},
		{
			"name":"东京女孩.mp4",
			"date":"2021-07-29 11:40:43",
			"size":"96409600",
			"id":"6501",
			"parent":"0"
		}
	];
	*/
	// 输出文件
	for(let i=0;i<files_items.length;i++){
		let item = files_items[i];
		let div = document.createElement('div');
		div.name = item["name"];
		div.date = item["date"];
		div.date_int = item["date_int"];
		div.size = item["size"];
		div.offline = item["offline"];
		div.offline_id = item["offline_id"];
		if(div.offline_id!=undefined){
			
			div.className = "files-item files-item-offline-item files-item-hide";
		}else{
			div.className = "files-item files-item-hide";
		}
		div.userid_hashid = item["userid_hashid"];
		if(div.userid_hashid==undefined){
		    div.userid_hashid = userinfo["id"]+".123456789";
		}
		console.log(div.userid_hashid);
		div.share_password = item["share_password"];
		div.offline_size = item["offline_size"];
		div.offline_status = item["offline_status"];
		div.size_unit = get_size_unit(div.size);
		div.item_id = item["id"];
		div.url = item["url"];
		div.url_localhost = item["url_localhost"];
		div.url_public_link = public_link_hostname + item["public_link"];
		div.url_private_link = private_link_hostname + item["url"];
		div.media = item["media"];
		div.media_localhost = item["media_localhost"];
		div.share = item["share"];
		div.parent = item["parent"];
		div.origin = item["origin"];
		div.mirror = item["mirror"];
		let type_icon = get_files_item_type_icon(div.name);
		div.innerHTML = '<div class="files-item-icon"><i class="' + type_icon + '"></i></div><div class="files-item-name"><span>' + div.name + '</span></div><div class="files-item-date"><span>' + div.date + '</span></div><div class="files-item-size"><span>' + div.size_unit + '</span></div><div class="files-item-menu" title="菜单"><i class="fa fa-bars"></i><div class="files-item-menu-items files-item-menu-items-hide"><div class="files-item-menu-item files-item-menu-item-rename-button"><i class="fa fa-pencil"></i>命名</div><div class="files-item-menu-item files-item-menu-item-preview-button"><i class="fa fa fa-play-circle"></i>预览</div><div class="files-item-menu-item files-item-menu-item-share-button"><i class="fa fa-share-alt"></i>分享</div><div class="files-item-menu-item files-item-menu-item-set-password-button"><i class="fa fa-unlock-alt"></i>密码</div><div style="display:none;" class="files-item-menu-item files-item-menu-item-link-button"><i class="fa fa-link"></i>内链</div><div class="files-item-menu-item files-item-menu-item-public-link-button"><i class="fa fa-link"></i>外链</div><div class="files-item-menu-item files-item-menu-item-delete-button"><i class="fa fa-trash"></i>删除</div><div class="files-item-menu-item files-item-menu-item-download-button"><i class="fa fa-download"></i>下载</div></div></div>';
		div.files_item_menu_item_set_password_button = div.getElementsByClassName('files-item-menu-item-set-password-button')[0];
		div.files_item_menu_item_set_password_button.share = div.share;
		div.files_item_menu_item_set_password_button.share_password = div.share_password;
		div.files_item_menu_item_set_password_button.onclick = function(){
		    //swal('设置[分享密码]功能，正在开发中！');
		    let swal_title = "设置密码";
		    if(this.share_password!=undefined){
		        swal_title = "设置密码（当前密码：" + this.share_password + "）";
		    }
		    let sharekey_id = this.share.split('_')[1];
            let sharekey_string = this.share.split('=')[1].split('_')[0];
		    swal(swal_title, {
        		content: {
        			element: "input",
        			attributes: {
        				placeholder: "设置文件分享密码\r\n填写-1表示不设置密码",
        				// value: '目录名称',
        				type: "text",
        			},
        		},
        		closeOnClickOutside: false,
        		buttons:["取消","设置"],
        	}).then((value) => {
        		if(value) {
        			set_sharefile_password(value,sharekey_id,sharekey_string);
        		}
        	});
		}
		if( ("replace"+div.userid_hashid).split('replace')[1].split('.')[0] != userinfo["id"] ){
		    let div2 = document.createElement('div');
		    div2.className = "files-item-warning";
		    div2.innerHTML = '<i class="fa fa-user-plus"></i>';
		    div2.title = "该文件由用户（ID：" + div.userid_hashid.split('.')[0] + "）上传，操作该文件前请注意！";
		    div2.style.cursor = "pointer";
		    div2.onclick = function(){
		        swal("该文件由用户（ID：" + div.userid_hashid.split('.')[0] + "）上传，操作该文件前请注意！");
		    }
		    div.append(div2);
		}
		div.selected = false;
		div.name_element = div.getElementsByClassName('files-item-name')[0];
		div.name_element.title = div.name;
		div.name_element.parent = div;
		div.name_element.onclick = function(){
			if(!this.parent.selected){
				// 如果未按下 CTRL 先清空其他的选中文件或文件夹
				if(!keyon_ctrl){
					unselected_files();
				}
				if(this.parent.offline_id!=undefined){
					this.parent.className = "files-item files-item-offline-item files-item-selected";
				}else{
					this.parent.className = "files-item files-item-selected";
				}
			}else{
				if(this.parent.offline_id!=undefined){
					this.parent.className = "files-item files-item-offline-item";
				}else{
					this.parent.className = "files-item";
				}
				
				this.parent.selected = false;
				if(!keyon_ctrl){
					unselected_files();
				}
				return false;
			}
			this.parent.selected = !this.parent.selected;
			files_items_selected_array.push(this.parent);
			if(!keyon_ctrl){
			    if(
    				this.title.indexOf('.mp4')!=-1&&this.title.split('.mp4').length==2&&this.title.split('.mp4')[1]==''
    				||
    				this.title.indexOf('.mp3')!=-1&&this.title.split('.mp3').length==2&&this.title.split('.mp3')[1]==''
    				||
    				this.title.indexOf('.wav')!=-1&&this.title.split('.wav').length==2&&this.title.split('.wav')[1]==''
    				||
    				this.title.indexOf('.jpg')!=-1&&this.title.split('.jpg').length==2&&this.title.split('.jpg')[1]==''
    				||
    				this.title.indexOf('.png')!=-1&&this.title.split('.png').length==2&&this.title.split('.png')[1]==''
    				||
    				this.title.indexOf('.jpeg')!=-1&&this.title.split('.jpeg').length==2&&this.title.split('.jpeg')[1]==''
    				||
    				this.title.indexOf('.gif')!=-1&&this.title.split('.gif').length==2&&this.title.split('.gif')[1]==''
    			){
			        preview_media();
    			}
			}
		}
		div.date_element = div.getElementsByClassName('files-item-date')[0];
		div.date_element.parent = div;
		div.date_element.onclick = div.name_element.onclick;
		div.size_element = div.getElementsByClassName('files-item-size')[0];
		div.size_element.parent = div;
		div.size_element.onclick = div.name_element.onclick;
		div.icon_element = div.getElementsByClassName('files-item-icon')[0];
		div.icon_element.parent = div;
		div.icon_element.onclick = div.name_element.onclick;
		div.menu = div.getElementsByClassName('files-item-menu')[0];
		div.menu.items = div.menu.getElementsByClassName('files-item-menu-items')[0];
		div.menu.show = false;
		div.menu.onclick = function(){
			if(files_options_items.show){
				files_options.click();
			}
			if(!this.show){
				unshowmenu_files();
				this.show = !this.show;
				this.items.className = "files-item-menu-items";
				return false;
			}else{
				this.items.className = "files-item-menu-items files-item-menu-items-hide";
			}
			this.show = !this.show;
		}
		div.menu_rename_element = div.getElementsByClassName('files-item-menu-item-rename-button')[0];
		div.menu_rename_element.parent = div;
		div.menu_rename_element.onclick = function(){
			folders_items_selected_array = [];
			files_items_selected_array = [];
			unselected_files();
			files_items_selected_array[0] = this.parent;
			if(this.parent.offline_id!=undefined){
				this.parent.className = "files-item files-item-offline-item files-item-selected";
			}else{
				this.parent.className = "files-item files-item-selected";
			}
			
			this.parent.selected = true;
			files_rename_button.onclick();
		}
		div.preview_button = div.getElementsByClassName('files-item-menu-item-preview-button')[0];
		if(
			div.media!=undefined
			&&
			(
				div.name.indexOf('.mp4')!=-1&&div.name.split('.mp4').length==2&&div.name.split('.mp4')[1]==''
				||
				div.name.indexOf('.mp3')!=-1&&div.name.split('.mp3').length==2&&div.name.split('.mp3')[1]==''
				||
				div.name.indexOf('.wav')!=-1&&div.name.split('.wav').length==2&&div.name.split('.wav')[1]==''
				||
				div.name.indexOf('.jpg')!=-1&&div.name.split('.jpg').length==2&&div.name.split('.jpg')[1]==''
				||
				div.name.indexOf('.png')!=-1&&div.name.split('.png').length==2&&div.name.split('.png')[1]==''
				||
				div.name.indexOf('.jpeg')!=-1&&div.name.split('.jpeg').length==2&&div.name.split('.jpeg')[1]==''
				||
				div.name.indexOf('.gif')!=-1&&div.name.split('.gif').length==2&&div.name.split('.gif')[1]==''
			)
		  ){
			div.preview_button.parent = div;
			div.preview_button.onclick = function(){
				files_items_selected_array[0] = this.parent;
				preview_media();
			};
		}else{
			div.preview_button.remove();
			
		}
		div.menu_share_element = div.getElementsByClassName('files-item-menu-item-share-button')[0];
		div.menu_share_element.parent = div;
		div.menu_share_element.onclick = function(){
			show_share(this.parent.share);
		}
		div.menu_download_element = div.getElementsByClassName('files-item-menu-item-download-button')[0];
		div.menu_download_element.parent = div;
		div.menu_download_element.onclick = function(){
			let html_element = document.createElement('div');
			html_element.innerHTML = "<p style=\"display:none;\"><a href='" + download_web_url + this.parent.url + "' target='_blank'>电信下载（稳定）</a></p><p><a style=\"color:#0051c3;border-bottom:2px dashed #0051c3;font-weight:bold;\" href='" + download_web_url + this.parent.url + "' target='_blank'>点击下载</a></p>";

			if(false&&cdn_cgi_trace_download_hkg==true){ // eu.org from https get to https post method
				let html_element_p_items = html_element.getElementsByTagName('p');
				for(let i=0;i<html_element_p_items.length;i++){
					let item = html_element_p_items[i];
					if(item.style.display.indexOf('none')==-1){
						let item_a = item.getElementsByTagName('a');
						if(
							item_a!=undefined
							&&
							item_a.length==1
						  ){
							
							if(item_a[0].href.indexOf('https://download')!=-1 && item_a[0].href.indexOf('.eu.org/download/')!=-1){
								let new_url = item_a[0].href; // .replace(/https:\/\/download/g,'http://http.download');
								item_a[0].form_action_href = new_url;
								item_a[0].removeAttribute('href');
								item_a[0].onclick = function(){
									let new_form = document.createElement('form');
									new_form.action=this.form_action_href;
									new_form.method="post";
									new_form.target="_blank";
									document.body.append(new_form);
									new_form.submit();
									new_form.remove();
								}
								continue;
							}

						}
					}
					
				}
			}
			
			// 如果是移动或联通，隐藏EU.ORG地址，移动因未知原因无法访问EU.ORG，联通访问EU.ORG速度普通，故只适合电信访问EU.ORG。
			if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
				let html_element_p_items = html_element.getElementsByTagName('p');
				for(let i=0;i<html_element_p_items.length;i++){
					let item = html_element_p_items[i];
					if(item.style.display.indexOf('none')==-1){
						let item_a = item.getElementsByTagName('a');
						if(
							item_a!=undefined
							&&
							item_a.length==1
						  ){
							if(item_a[0].href.indexOf('https://download')!=-1 && item_a[0].href.indexOf('.eu.org/download/')!=-1){
								item.remove();
								i--;
								continue;
							}

						}
					}
					
				}
			}else{
				// CT PASS
			}
			
			
			if(this.parent.url_localhost!=undefined){
				let p = document.createElement('p');
				let a = document.createElement('a');
				a.href = this.parent.url_localhost;
				a.target = "_blank";
				a.innerText = "点击下载";
				p.append(a);
				html_element.prepend(p);
			}
			

			// if(navigator.language.toLowerCase().indexOf('cn')!=-1&&cdn_cgi_trace_download_hkg==false){
			if(navigator.language.toLowerCase().indexOf('cn')!=-1){
				if(
					hkg_cdn_test_domain_text!=undefined
					&&
					hkg_cdn_test_domain_text!=""
					&&
					hkg_cdn_test_domain_text.length>10
				){
					let p = document.createElement('p');
					let a = document.createElement('a');
					a.href = "http://http-redirects-www-http.yzzpan.com/http-redirects.html?url=" + window.btoa("http://" + hkg_cdn_test_domain_text + this.parent.url);
					a.target = "_blank";
					a.innerText = "点击下载";
					p.append(a);
					html_element.prepend(p);
				}
			}
			
			
			
			
			if(this.parent.offline!=undefined){
				let p = document.createElement('p');
				let a = document.createElement('a');
				a.href = this.parent.offline;
				a.target = "_blank";
				a.innerText = "点击下载";
				p.append(a);
				html_element.prepend(p);
			}
			
			
			
			
			swal({
				title: "选择下载",
				content: html_element,
				icon: "success",
				buttons: true,
				closeOnClickOutside: false,
			});
			// window.open(download_web_url + this.parent.url);
		}
		// 外链
		div.menu_public_link_element = div.getElementsByClassName('files-item-menu-item-public-link-button')[0];
		div.menu_public_link_element.parent = div;
		div.menu_public_link_element.onclick = function(){
			if( public_link_hostname.length < 10 || public_link_hostname == ""){
				
				
				
				if( private_link_status && private_link_hostname.length > 10 ){
					show_link(this.parent.url_private_link);
					return false;
				}
				
				/*if(
					this.parent.mirror != undefined && this.parent.mirror == true
					&&
					this.parent.origin != undefined && this.parent.origin != "" && this.parent.origin.length > 10
				  ){
					show_link(this.parent.origin);
					return false;
				}*/
				
				swal({
					title: "不可使用",
					text: "您的账号不支持外链。",
					icon: "warning",
					buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				}).then((willDelete) => {
					if(willDelete){
						//free_or_mini_or_big_vip.className = "";
						//window.location.href="/#setting";
					}
				});
				
				// free_or_mini_or_big_vip.className = "";
				// window.location.href="/#setting";
				
				return false;
			}
			if( this.parent.url_public_link.length < 30 || this.parent.url_public_link.indexOf('undefined')!=-1 ){
				swal({
					title: "稍等片刻",
					text: "正在同步该文件，请您稍等片刻。",
					icon: "warning",
					buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				});
				return false;
			}
			show_link(this.parent.url_public_link);
		}
		if(navigator.language.toLowerCase().indexOf('cn')==-1){
			div.menu_public_link_element.style.display = "none";
		}
		// 内链
		div.menu_link_element = div.getElementsByClassName('files-item-menu-item-link-button')[0];
		div.menu_link_element.parent = div;
		div.menu_link_element.onclick = function(){
			return false;
			show_link(download_web_url + this.parent.url);
		}
		div.menu_delete_element = div.getElementsByClassName('files-item-menu-item-delete-button')[0];
		div.menu_delete_element.parent = div;
		div.menu_delete_element.onclick = function(){
		    if(this.parent.userid_hashid.split('.')[0]!=userinfo["id"]){
		        swal('由于系统结构比较复杂，涉及每个用户账号容量计算等问题，不允许超级管理员直接对用户文件进行删除操作！如需操作该文件，请您从系统后台查询该用户ID（'+this.parent.userid_hashid.split('.')[0]+'），登陆该用户账号进行操作！');
		        return false;
		    }
			folders_items_selected_array = [];
			files_items_selected_array = [];
			unselected_files();
			// files_items_selected_array[0] = this.parent;
			keyon_ctrl = false;
			this.parent.getElementsByClassName('files-item-icon')[0].click();
			if(this.parent.offline_id!=undefined){
				this.parent.className = "files-item files-item-offline-item files-item-selected";
			}else{
				this.parent.className = "files-item files-item-selected";
			}
			
			this.parent.selected = true;
			files_delete_items();
		}
		if(div.userid_hashid.split('.')[0]!=userinfo["id"]){
		    div.menu_delete_element.style.cursor = "no-drop";
		}
		if(div.offline_id!=undefined){
			let div_2 = document.createElement('div');
			let offline_title = "离线";
			if(div.offline_size!=undefined&&div.offline_size>0&&div.offline_size==div.size){
				offline_title = "同步";
			}
			if(div.offline_size!=undefined&&div.offline_size==0&&div.offline_status!=undefined&&div.offline_status==0){
				offline_title = "排队";
			}
			div_2.className = 'files-item-offline';
			div_2.innerHTML = '<div class="files-item-offline-status" style="width:'+div.offline_status+'%;"></div><span>正在'+offline_title+' '+div.offline_status+'% '+get_size_unit(div.offline_size)+'/'+div.size_unit+'</span>';
			div.prepend(div_2);
		}
		if(isPrepend!=undefined&&isPrepend){
			// 前方
			files_items_files_items.prepend(div);
		}else{
			// 后方
			files_items_files_items.append(div);
		}
		setTimeout(function(){
			if(div.offline_id!=undefined){
				
				div.className = "files-item files-item-offline-item";
			}else{
				div.className = "files-item";
			}
			
		},(i+1)*50);
	}
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
// 当前网站官方网站地址
let web_url = window.location.protocol + "//" + window.location.href.split('://')[1].split('/')[0];
let download_web_url = window.location.protocol + "//download.dnstop.cc";
let upload_web_url = window.location.protocol + "//upload.dnstop.cc";

// 官方固定下载地址


let api_upload_web_url;
// 初始化上传地址的 iframe
function api_upload_web_url_load(){
	api_upload_web_url = upload_web_url + "/v6/upload";
}
api_upload_web_url_load();
// 显示分享文件
function show_share(share){
	let sharelink = web_url + share;
	swal({
		title: "分享成功",
		text: sharelink,
		icon: "success",
		buttons: ["取消","复制"],
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			copy_text(sharelink);
		}
	});
}
// 显示链接文件
function show_link(link){
	// let link = web_url + share;
	swal({
		title: "分享成功",
		text: link,
		icon: "success",
		buttons: ["取消","复制"],
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			copy_text(link);
			swal({
			    title: "复制成功",
			    text: "复制成功！\r\n您可通过 Internet Download Manager 下载文件！\r\n云中转支持网站外链功能，如有需要，联系我们！",
			    icon: "success",
			    buttons: "确定",
			    closeOnClickOutside: false,
			});
		}
	});
}
// 创建文件夹
function create_folder(name,parent_folder_id){
	let folder_name = encodeURIComponent( name );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				let folder_item = {
					"name":name,
					"id":ResultJSON["id"],
					"date":get_datetime(),
					"parent":parent_folder_id
				}
				push_folders_to_files_page([folder_item],true);
			}else{
				swal({
					title: "创建失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/create_folder.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("folder_name=" + folder_name + "&parent_folder_id=" + parent_folder_id + "&session_id=" + userinfo["session_id"] );
}

// 右键区域
let files_main = document.getElementById('files-main');
let files_main_menu = document.getElementById('files-main-menu');
// 右键按钮
let files_download_button = document.getElementById('files-download-button');
let files_link_button = document.getElementById('files-link-button');
let files_public_link_button = document.getElementById('files-public-link-button');

let files_share_button = document.getElementById('files-share-button');
let files_set_password_button = document.getElementById('files-set-password-button');
let files_cat_button = document.getElementById('files-cat-button');
let files_paste_button = document.getElementById('files-paste-button');
let files_preview_button = document.getElementById('files-preview-button');
let files_unpaste_button = document.getElementById('files-unpaste-button');
let files_rename_button = document.getElementById('files-rename-button');
let files_upload_button = document.getElementById('files-upload-button');


// 批量复制
let files_public_all_link_button = document.getElementById('files-public-all-link-button');

if(files_public_all_link_button!=undefined){
	files_public_all_link_button.onclick = function(){
		if( public_link_hostname.length < 10 || public_link_hostname == ""){
			files_public_all_link_button.style.display = "none";
			return false;
		}
		let files_items = files_items_files_items.getElementsByClassName('files-item');
		let array_url_public_link = new Array();
		for(let i=0;i<files_items.length;i++){
			let item = files_items[i];
			if(item.url_public_link != undefined && item.url_public_link.length > 30 && item.url_public_link.indexOf('undefined')==-1  ){
				if(
					false
					&&
					item["mirror"] != undefined && item["mirror"] == true
					&&
					item["origin"] != undefined && item["origin"] != "" && item["origin"].length > 10
				  ){
					array_url_public_link.push(item.name + "\r\n" + item.origin);
				}else{
					array_url_public_link.push(item.name + "\r\n" + item.url_public_link);
				}
			}else{
				array_url_public_link.push(item.name + "\r\n正在同步该文件，请您稍等片刻。");
			}
		}
		let link = array_url_public_link.join('\r\n\r\n');
		swal({
			title: "分享成功",
			text: link,
			icon: "success",
			buttons: ["取消","复制"],
			closeOnClickOutside: false,
		}).then((willDelete) => {
			if (willDelete) {
				// 复制文本 复制文字 JS自动选中文字
				// copy_text(link);
				var selection = window.getSelection();
				selection.removeAllRanges();
				var range = document.createRange();
				range.selectNodeContents(document.getElementsByClassName('swal-text')[0]);
				selection.addRange(range);
				document.execCommand("Copy");
				swal({
				    title: "复制成功",
				    text: "复制成功！",
				    icon: "success",
				    buttons: "确定",
				    closeOnClickOutside: false,
				});
			}
		});
	}
}

let files_public_all_link_origin_button = document.getElementById('files-public-all-link-origin-button');


if(files_public_all_link_origin_button!=undefined){
	files_public_all_link_origin_button.onclick = function(){
		if( public_link_hostname.length < 10 || public_link_hostname == ""){
			files_public_all_link_origin_button.style.display = "none";
			return false;
		}
		let files_items = files_items_files_items.getElementsByClassName('files-item');
		let array_url_public_link = new Array();
		for(let i=0;i<files_items.length;i++){
			let item = files_items[i];
			if(item.url_public_link != undefined && item.url_public_link.length > 30 && item.url_public_link.indexOf('undefined')==-1  ){
				if(
					item["mirror"] != undefined && item["mirror"] == true
					&&
					item["origin"] != undefined && item["origin"] != "" && item["origin"].length > 10
				  ){
					array_url_public_link.push(item.name + "\r\n" + item.origin);
				}else{
					// array_url_public_link.push(item.name + "\r\n" + item.url_public_link);
					array_url_public_link.push(item.name + "\r\n正在同步该文件，请您稍等片刻。");
				}
			}else{
				array_url_public_link.push(item.name + "\r\n正在同步该文件，请您稍等片刻。");
			}
		}
		let link = array_url_public_link.join('\r\n\r\n');
		swal({
			title: "分享成功",
			text: link,
			icon: "success",
			buttons: ["取消","复制"],
			closeOnClickOutside: false,
		}).then((willDelete) => {
			if (willDelete) {
				// 复制文本 复制文字 JS自动选中文字
				// copy_text(link);
				var selection = window.getSelection();
				selection.removeAllRanges();
				var range = document.createRange();
				range.selectNodeContents(document.getElementsByClassName('swal-text')[0]);
				selection.addRange(range);
				document.execCommand("Copy");
				swal({
				    title: "复制成功",
				    text: "复制成功！",
				    icon: "success",
				    buttons: "确定",
				    closeOnClickOutside: false,
				});
			}
		});
	}
}




files_upload_button.onclick = function(){
	// 如果未登录
	if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
		if(!show_upload_full_screen_mask){

			set_upload_cdn_cloudflare();
			
			
		}
	}else{
		window.location.href = "#login";
		return false;
	}
	files_options_items.show=false;
	files_options_items.className="files-options-items files-options-items-hide";
	files_options_item_upload_files_input.click();
};
/*
let files_options_items_item_offline_button = document.getElementById('files-options-items-item-offline-button');
files_options_items_item_offline_button.onclick = function(){
	new_offline_https();
}
*/
let files_create_button = document.getElementById('files-create-button');
files_create_button.onclick = function(){
	swal("创建目录", {
		content: {
			element: "input",
			attributes: {
				placeholder: "目录名称",
				// value: '目录名称',
				type: "text",
			},
		},
		closeOnClickOutside: false,
		buttons:["取消","创建"],
	}).then((value) => {
		if(value) {
			let parent_folder_id = get_files_folders_array[get_files_folders_index];
			create_folder(value,parent_folder_id);
		}
	});
}
// 设置分享密码
function set_sharefile_password(password,sharekey_id,sharekey_string){
    console.log(password,sharekey_id,sharekey_string);
    
    let folder_name = encodeURIComponent( name );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				swal({
					title: "设置成功",
					text: "设置成功",
					icon: "success",
					// buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				});
			}else{
				swal({
					title: "创建失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/set_sharefile_password.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("password=" + password + "&sharekey_id=" + sharekey_id + "&sharekey_string=" + sharekey_string + "&session_id=" + userinfo["session_id"] );
    
}
// 离线下载
function new_offline_https(){
	return false;
	let html_element = document.createElement('div');
	html_element.innerHTML = '<input placeholder="URL" class="swal-content__input new-offline-url"><input placeholder="Referer" class="swal-content__input new-offline-referer"><input placeholder="User-Agent" class="swal-content__input new-offline-ua"><input placeholder="Cookie" class="swal-content__input new-offline-cookie"><input disabled placeholder="Get" class="swal-content__input">';
	swal("离线下载", {
		//icon: "success",
		title:"离线下载",
		text: "URL必填其余可空仅允许HTTPS443端口最大8G不可30X",
		content: html_element,
		closeOnClickOutside: false,
		buttons:["取消","确定"],
	}).then((willDelete) => {
		if (!willDelete) {
			return false;
		}
		let offline_url = document.getElementsByClassName('new-offline-url')[0].value;
		let offline_referer = document.getElementsByClassName('new-offline-referer')[0].value;
		let offline_ua = document.getElementsByClassName('new-offline-ua')[0].value;
		let offline_cookie = document.getElementsByClassName('new-offline-cookie')[0].value;
		if(offline_url!=undefined&&offline_url!=null&&offline_url!="") {
			let url_array = offline_url.split('?')[0].split('/');
			url_array[0] = url_array[0].replace(/https:/g,'');
			url_array[0] = url_array[0].replace(/http:/g,'');
			let offline_name = url_array[url_array.length-1];
			if(
				false
				/*url_array[0].indexOf('http:')!=-1
				||
				url_array[0].indexOf('https:')==-1*/
				
				/*||value.split('?').length>1*/
			  ){
				swal({
					title: "地址无效",
					text: "请提交HTTPS协议文件地址",
					icon: "error",
					buttons: ["取消","继续"],
					dangerMode: true,
					closeOnClickOutside: false,
				}).then((willDelete) => {
				  if (willDelete) {
				   setTimeout(new_offline_https,10);
				  }
				});
			}else{
				offline_cookie = encodeURIComponent(offline_cookie);
				offline_ua = encodeURIComponent(offline_ua);
				offline_referer = encodeURIComponent(offline_referer);
				offline_url = encodeURIComponent(offline_url);
				let parent_folder_id = get_files_folders_array[get_files_folders_index];
				let url = offline_url.replace(/https:/g,'');
				url = url.replace(/http:/g,'');
				// url = url.split('?')[0];
				let xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						let ResultJSON = JSON.parse(xmlhttp.responseText);
						if(ResultJSON["status"]){
							let item = ResultJSON;
							let file_item = {
								"name":item["name"],
								"id":item["id"],
								"date":item["date"],
								"size":item["size"],
								"share":item["share"],
								"url":item["url"],
								"media":item["media"],
								"parent":parent_folder_id,
								"offline":item["offline"],
								"offline_id":item["offline_id"],
								"offline_size":item["offline_size"],
								"offline_status":item["offline_status"],
								"userid_hashid":item["userid_hashid"],
								"share_password":item["share_password"],
							}
							push_files_to_files_page([file_item],true);
						}else{
							swal({
								title: "提交失败",
								text: ResultJSON["message"],
								icon: "error",
								buttons: ["取消","继续"],
								dangerMode: true,
								closeOnClickOutside: false,
							}).then((willDelete) => {
							  if (willDelete) {
							   setTimeout(new_offline_https,10);
							  }
							});

						}
					}
				}
				xmlhttp.open("POST",api_server_url+"/php/v4/new_offline",true);
				xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xmlhttp.withCredentials = true;
				xmlhttp.send("offline_ua="+offline_ua+"&offline_cookie="+offline_cookie+"&offline_referer="+offline_referer+"&url=" + url + "&parent_folder_id=" + parent_folder_id + "&session_id=" + userinfo["session_id"] );
				
			}
			
			
		}
	});
}
let files_options_item_create_folder_button = document.getElementById('files-options-item-create-folder-button');
files_options_item_create_folder_button.onclick = files_create_button.onclick;
let files_offline_button = document.getElementById('files-offline-button');
files_offline_button.onclick = function(){
	new_offline_https();
}
let files_selection_all_button = document.getElementById('files-selection-all-button');
//文件和文件夹全选
function files_items_selected_all_function(){
	keyon_ctrl = true;
	let folders = files_items_folders_items.getElementsByClassName('files-item');
	for(let i=0;i<folders.length;i++){
		if(!folders[i].selected){
			folders[i].name_element.click();
		}
	}
	let files_items = files_items_files_items.getElementsByClassName('files-item');
	for(let i=0;i<files_items.length;i++){
		if(!files_items[i].selected){
			files_items[i].name_element.click();
		}
	}
	keyon_ctrl = false;
}
// 不全选 unselected_files();
files_selection_all_button.onclick = files_items_selected_all_function;
let files_back_parent_folder_button = document.getElementById('files-back-parent-folder-button');
files_back_parent_folder_button.onclick = back_parent_folder_button.ondblclick;
let files_go_folder_button = document.getElementById('files-go-folder-button');
files_go_folder_button.onclick = function(){
	folders_items_selected_array = [];
	files_items_selected_array = [];
	get_files_folders_index++;
	let files_num = remove_files_items();
	setTimeout(function(){
		get_files_page = 0;
		get_folders_page = 0;
		get_folders_loadover = false;
		get_files_loadover = false;
		page_scroll_height_function_locked = false;
		// get_files();
	},( ( files_num + 3) * 10 / 2) + 30 );
}
let files_unselection_all_button = document.getElementById('files-unselection-all-button');
files_unselection_all_button.onclick = unselected_files;
let files_delete_button = document.getElementById('files-delete-button');
files_delete_button.onclick = files_delete_items;
let files_top_button = document.getElementById('files-top-button');
let files_bottom_button = document.getElementById('files-bottom-button');
let files_reload_button = document.getElementById('files-reload-button');
files_reload_button.onclick = files_reload;
let files_reload_button_items = document.getElementById('files-reload-button-items');
files_reload_button_items.onclick = files_reload;
let files_hide_menu_button = document.getElementById('files-hide-menu-button');
// 剪切文件和文件夹的数组
let files_cat_array = [];
let folders_cat_array = [];
files_main.oncontextmenu=function(e){
	// 先隐藏右键菜单所有可点击的按钮
	menu_buttons_hide();
	files_order_size_button.style.display = "block";
	files_order_name_button.style.display = "block";
	files_order_date_button.style.display = "block";
	files_upload_button.style.display = "block";
	files_create_button.style.display = "block";
	files_offline_button.style.display = "none";
	// files_offline_button.style.display = "block";
	files_selection_all_button.style.display = "block";
	files_unselection_all_button.style.display = "block";
	files_top_button.style.display = "block";
	files_bottom_button.style.display = "block";
	files_reload_button.style.display = "block";
	files_hide_menu_button.style.display = "block";
	files_client_download_button.style.display = "block";
	// 是否显示下载分享按钮
	if( folders_items_selected_array.length == 0 && files_items_selected_array.length == 1 ){
		files_download_button.style.display = "block";
		// files_link_button.style.display = "block"; // 展示内链
		if(navigator.language.toLowerCase().indexOf('cn')!=-1){
			files_public_link_button.style.display = "block";
		}
		files_download_button.onclick = function(){
			let html_element = document.createElement('div');
			html_element.innerHTML = "<p style=\"display:none;\"><a href='" + download_web_url + files_items_selected_array[0].url + "' target='_blank'>电信下载（稳定）</a></p><p><a style=\"color:#0051c3;border-bottom:2px dashed #0051c3;font-weight:bold;\" href='" + download_web_url + files_items_selected_array[0].url + "' target='_blank'>点击下载</a></p>";

			if(false&&cdn_cgi_trace_download_hkg==true){ // eu.org from https get to https post method
				let html_element_p_items = html_element.getElementsByTagName('p');
				for(let i=0;i<html_element_p_items.length;i++){
					let item = html_element_p_items[i];
					if(item.style.display.indexOf('none')==-1){
						let item_a = item.getElementsByTagName('a');
						if(
							item_a!=undefined
							&&
							item_a.length==1
						  ){
							
							if(item_a[0].href.indexOf('https://download')!=-1 && item_a[0].href.indexOf('.eu.org/download/')!=-1){
								let new_url = item_a[0].href; // .replace(/https:\/\/download/g,'http://http.download');
								item_a[0].form_action_href = new_url;
								item_a[0].removeAttribute('href');
								item_a[0].onclick = function(){
									let new_form = document.createElement('form');
									new_form.action=this.form_action_href;
									new_form.method="post";
									new_form.target="_blank";
									document.body.append(new_form);
									new_form.submit();
									new_form.remove();
								}
								continue;
							}

						}
					}
					
				}
			}
			
			// 如果是移动或联通，隐藏EU.ORG地址，移动因未知原因无法访问EU.ORG，联通访问EU.ORG速度普通，故只适合电信访问EU.ORG。
			if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
				let html_element_p_items = html_element.getElementsByTagName('p');
				for(let i=0;i<html_element_p_items.length;i++){
					let item = html_element_p_items[i];
					if(item.style.display.indexOf('none')==-1){
						let item_a = item.getElementsByTagName('a');
						if(
							item_a!=undefined
							&&
							item_a.length==1
						  ){
							if(item_a[0].href.indexOf('https://download')!=-1 && item_a[0].href.indexOf('.eu.org/download/')!=-1){
								item.remove();
								i--;
								continue;
							}

						}
					}
					
				}
			}else{
				// CT PASS
			}
			
			if(files_items_selected_array[0].url_localhost!=undefined){
				let p = document.createElement('p');
				let a = document.createElement('a');
				a.href = files_items_selected_array[0].url_localhost;
				a.target = "_blank";
				a.innerText = "点击下载";
				p.append(a);
				html_element.prepend(p);
			}
			
			
			
			// if(navigator.language.toLowerCase().indexOf('cn')!=-1&&cdn_cgi_trace_download_hkg==false){
			if(navigator.language.toLowerCase().indexOf('cn')!=-1){
				if(
					hkg_cdn_test_domain_text!=undefined
					&&
					hkg_cdn_test_domain_text!=""
					&&
					hkg_cdn_test_domain_text.length>10
				){
					let p = document.createElement('p');
					let a = document.createElement('a');
					a.href = "http://http-redirects-www-http.yzzpan.com/http-redirects.html?url=" + window.btoa("http://" + hkg_cdn_test_domain_text + files_items_selected_array[0].url);
					a.target = "_blank";
					a.innerText = "点击下载";
					p.append(a);
					html_element.prepend(p);
				}
			}
			
			
			
			
			
			if(files_items_selected_array[0].offline!=undefined){
				let p = document.createElement('p');
				let a = document.createElement('a');
				a.href = files_items_selected_array[0].offline;
				a.target = "_blank";
				a.innerText = "点击下载";
				p.append(a);
				html_element.prepend(p);
			}
			
			
			

			
			
			swal({
				title: "选择下载",
				content: html_element,
				icon: "success",
				buttons: true,
				closeOnClickOutside: false,
			});
			// window.open(download_web_url + files_items_selected_array[0].url);
		};
		
		
		files_share_button.style.display = "block";
		files_share_button.onclick = function(){
			show_share(files_items_selected_array[0].share);
		};
		files_set_password_button.style.display = "block";
		files_set_password_button.onclick = function(){
		    // swal('设置[分享密码]功能，正在开发中！');
		        let swal_title = "设置密码";
		        if(files_items_selected_array[0].share_password!=undefined){
		            swal_title = "设置密码（当前密码：" + files_items_selected_array[0].share_password + "）";
		        }
		    	swal("设置密码", {
            		content: {
            			element: "input",
            			attributes: {
            				placeholder: "设置文件分享密码\r\n填写-1表示不设置密码",
            				// value: '目录名称',
            				type: "text",
            			},
            		},
            		closeOnClickOutside: false,
            		buttons:["取消","设置"],
            	}).then((value) => {
            		if(value) {
            		    let sharekey_id = files_items_selected_array[0].share.split('_')[1];
            		    let sharekey_string = files_items_selected_array[0].share.split('=')[1].split('_')[0];
            			set_sharefile_password(value,sharekey_id,sharekey_string);
            		}
            	});
		}
		
		
		// 显示内链
		files_link_button.onclick = function(){
			return false;
			if(files_items_selected_array[0].media!=undefined&&files_items_selected_array[0].media.length===38){
				show_link(download_web_url+"/download/media/"+files_items_selected_array[0].media+"/"+encodeURIComponent(files_items_selected_array[0].name)); // encodeURIComponent
				return false;
			}
			let url_array = files_items_selected_array[0].url.split('/');
			// let name = encodeURIComponent(url_array[4]);
			let name = url_array[4];
			let link = download_web_url + '/download/' + url_array[2] + '/' + url_array[3] + '/' + name;
			show_link(link);
		}
		// 显示外链
		files_public_link_button.onclick = function(){
			if( public_link_hostname.length < 10 || public_link_hostname == ""){
				
				
				
				if( private_link_status && private_link_hostname.length > 10 ){
					show_link(files_items_selected_array[0].url_private_link);
					return false;
				}
				
				/*if(
					files_items_selected_array[0].mirror != undefined && files_items_selected_array[0].mirror == true
					&&
					files_items_selected_array[0].origin != undefined && files_items_selected_array[0].origin != "" && files_items_selected_array[0].origin.length > 10
				){
					show_link(files_items_selected_array[0].origin);
					return false;
				}*/
				
				swal({
					title: "不可使用",
					text: "您的账号不支持外链。",
					icon: "warning",
					buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				}).then((willDelete) => {
					if(willDelete){
						//free_or_mini_or_big_vip.className = "";
						//window.location.href="/#setting";
					}
				});
				

				
				return false;
			}
			if( files_items_selected_array[0].url_public_link.length < 30 || files_items_selected_array[0].url_public_link.indexOf('undefined')!=-1 ){
				swal({
					title: "稍等片刻",
					text: "正在同步该文件，请您稍等片刻。",
					icon: "warning",
					buttons: true,
					dangerMode: true,
					closeOnClickOutside: false,
				});
				return false;
			}
			show_link(files_items_selected_array[0].url_public_link);
		}
		
		
		// 是否显示预览
		// if(files_items_selected_array[0].url.split('/download/media/').length==2&&files_items_selected_array[0].url.split('/download/media/')[1].split('/').length==2){
		if(
			(
			    files_items_selected_array[0].media!=undefined
			    ||
			    files_items_selected_array[0].url_public_link!=undefined
			)
			&&
			(
				files_items_selected_array[0].name.indexOf('.mp4')!=-1&&files_items_selected_array[0].name.split('.mp4').length==2&&files_items_selected_array[0].name.split('.mp4')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.mp3')!=-1&&files_items_selected_array[0].name.split('.mp3').length==2&&files_items_selected_array[0].name.split('.mp3')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.wav')!=-1&&files_items_selected_array[0].name.split('.wav').length==2&&files_items_selected_array[0].name.split('.wav')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.jpg')!=-1&&files_items_selected_array[0].name.split('.jpg').length==2&&files_items_selected_array[0].name.split('.jpg')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.png')!=-1&&files_items_selected_array[0].name.split('.png').length==2&&files_items_selected_array[0].name.split('.png')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.jpeg')!=-1&&files_items_selected_array[0].name.split('.jpeg').length==2&&files_items_selected_array[0].name.split('.jpeg')[1]==''
				||
				files_items_selected_array[0].name.indexOf('.gif')!=-1&&files_items_selected_array[0].name.split('.gif').length==2&&files_items_selected_array[0].name.split('.gif')[1]==''
			)
		  ){
			files_preview_button.style.display = "block";
			files_preview_button.onclick = preview_media;
		}
	}
	// 是否显示批量复制外链
	if( public_link_hostname.length < 10 || public_link_hostname == ""){}else{
		files_public_all_link_button.style.display = "block";
		files_public_all_link_origin_button.style.display = "block";
	}
	// 是否显示剪切按钮
	if( ( folders_items_selected_array.length + files_items_selected_array.length ) > 0 ){
		files_cat_button.style.display = "block";
		files_delete_button.style.display = "block";
		files_cat_button.style.display = "block";
	}
	// 是否显示命名按钮
	if( ( folders_items_selected_array.length + files_items_selected_array.length ) == 1 ){
		files_rename_button.style.display = "block";
	}
	// 是否显示粘贴按钮
	if( ( files_cat_array.length + folders_cat_array.length ) > 0 ){
		files_paste_button.style.display = "block";
		files_unpaste_button.style.display = "block";
	}
	// 是否显示返回
	if(get_files_folders_index>0){
		files_back_parent_folder_button.style.display = "block";
	}
	// 是否显示前进
	if(get_files_folders_array.length-1>get_files_folders_index){
		files_go_folder_button.style.display = "block";
	}
	// 获取坐标
	var e = e || window.event;
	//鼠标点的坐标
	let oX = e.clientX;
	let oY = e.clientY;
	//菜单出现后的位置
	files_main_menu.style.left = oX + "px";
	files_main_menu.style.top = oY + "px";
	files_main_menu.style.display = "block";
	// 拦截默认右键的浏览器菜单
	return false;
}
// 文件夹命名
function files_file_rename(item_id,new_name,element){
	// console.log(item_id);
	// console.log(new_name);
	// console.log('文件重命名');
	let parent_folder_id = encodeURIComponent( get_files_folders_array[get_files_folders_index] );
	item_id = encodeURIComponent( item_id );
	new_name = encodeURIComponent( new_name );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				new_name = decodeURIComponent( new_name );
				let icon_type_name = get_files_item_type_icon(new_name);
				element.icon_element.getElementsByTagName('i')[0].className = icon_type_name;
				element.name = new_name;
				element.name_element.getElementsByTagName('span')[0].innerText = new_name;
				element.date_element.getElementsByTagName('span')[0].innerText = ResultJSON["date"];
				let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
				insert_before_element.parentNode.insertBefore(element,insert_before_element);
			}else{
				swal({
					title: "命名失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/file_rename.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("file_id=" + item_id + "&parent_folder_id=" + parent_folder_id + "&new_name=" + new_name + "&session_id=" + userinfo["session_id"] );
}
// 文件夹重命名
function files_folder_rename(item_id,new_name,element){
	// console.log(item_id);
	// console.log(new_name);
	// console.log('文件夹重命名');
	let parent_folder_id = encodeURIComponent( get_files_folders_array[get_files_folders_index] );
	item_id = encodeURIComponent( item_id );
	new_name = encodeURIComponent( new_name );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				new_name = decodeURIComponent( new_name );
				element.name = new_name;
				element.name_element.getElementsByTagName('span')[0].innerText = new_name;
				element.date_element.getElementsByTagName('span')[0].innerText = ResultJSON["date"];
				let insert_before_element = files_items_folders_items.getElementsByClassName('files-item')[0];
				insert_before_element.parentNode.insertBefore(element,insert_before_element);
			}else{
				swal({
					title: "命名失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/folder_rename.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("folder_id=" + item_id + "&parent_folder_id=" + parent_folder_id + "&new_name=" + new_name +"&session_id=" + userinfo["session_id"] );
}
// 文件重命名
function files_rename_functions(){
	// 查看选中的是文件还是文件夹
	let is_files = files_items_selected_array[0]?true:false;
	let id = is_files?files_items_selected_array[0].item_id:folders_items_selected_array[0].item_id;
	let element = is_files?files_items_selected_array[0]:folders_items_selected_array[0];
	swal("新的名称", {
		content: {
			element: "input",
			attributes: {
				placeholder: "新的名称",
				value: is_files?files_items_selected_array[0].name:folders_items_selected_array[0].name,
				type: "text",
			},
		},
		closeOnClickOutside: false,
		buttons:true,
	}).then((value) => {
		if(value) {
			// 查看是文件夹还是文件
			if(is_files){
				files_file_rename(id,value,element);
			}else{
				files_folder_rename(id,value,element);
			}
		}
	});
}
files_rename_button.onclick = files_rename_functions;
// 获取当前 Datetime 本地时间
function get_datetime(){
	let dt = new Date();
	return (dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
}
// 粘贴文件操作
function files_paste_functions(){
	// console.log(files_cat_array);
	// console.log(folders_cat_array);
	let parent_folder_id = get_files_folders_array[get_files_folders_index];
	let folders_id_array = [0];
	let folders_cat_array_in_function = folders_cat_array;
	for(let i=0;i<folders_cat_array_in_function.length;i++){
		folders_id_array.push(folders_cat_array_in_function[i].item_id);
	}
	// console.log(folders_id_array);
	folders_id_array_string = folders_id_array.toString();
	let files_id_array = [0];
	let files_cat_array_in_function = files_cat_array;
	for(let i=0;i<files_cat_array_in_function.length;i++){
		files_id_array.push(files_cat_array_in_function[i].item_id);
	}
	files_id_array_string = files_id_array.toString();
	// console.log(files_id_array);
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			// 清空剪切
			files_unpaste_button.click();
		}
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 如果就在当前目录
				// console.log( parent_folder_id );
				// console.log( folders_cat_array_in_function );
				// console.log( files_cat_array_in_function );
				let insert_before_element_folders = files_items_folders_items.getElementsByClassName('files-item')[0];
				let insert_before_element_files = files_items_files_items.getElementsByClassName('files-item')[0];
				let folders_items = files_items_folders_items.getElementsByClassName('files-item');
				for(let i=0;i<folders_cat_array_in_function.length;i++){
					let item = folders_cat_array_in_function[i];
					let insert_before_success = false;
					for(let i2=0;i2<folders_items.length;i2++){
						let item2 = folders_items[i2];
						if(item === item2){
							item.date_element.getElementsByTagName('span')[0].innerText = get_datetime();
							insert_before_element_folders.parentNode.insertBefore(item,insert_before_element_folders);
							insert_before_success = true;
							break;
						}
					}
					if(insert_before_success){
						continue;
					}else{
						// 先查看是否已经存在
						let is_flag = false;
						for(let i=0;i<folders_items.length;i++){
							let item2 = folders_items[i];
							if(item2.item_id == item.item_id){
								item2.date_element.getElementsByTagName('span')[0].innerText = get_datetime();
								is_flag = true;
								break;
							}
						}
						if(is_flag){
							continue;
						}
						let folder_item = {
							"name":item.name,
							"id":item.item_id,
							"date":get_datetime(),
							"parent":get_files_folders_array[get_files_folders_index],
							"userid":item.userid,
						}
						push_folders_to_files_page([folder_item],true);
					}
				}
				let files_items = files_items_files_items.getElementsByClassName('files-item');
				for(let i=0;i<files_cat_array_in_function.length;i++){
					let item = files_cat_array_in_function[i];
					let insert_before_success = false;
					for(let i2=0;i2<files_items.length;i2++){
						let item2 = files_items[i2];
						if(item === item2){
							item.date_element.getElementsByTagName('span')[0].innerText = get_datetime();
							insert_before_element_files.parentNode.insertBefore(item,insert_before_element_files);
							insert_before_success = true;
							break;
						}
					}
					if(insert_before_success){
						continue;
					}else{
						// 先查看是否已经存在
						let is_flag = false;
						for(let i=0;i<files_items.length;i++){
							let item2 = files_items[i];
							if(item2.item_id == item.item_id){
								item2.date_element.getElementsByTagName('span')[0].innerText = get_datetime();
								is_flag = true;
								break;
							}
						}
						if(is_flag){
							continue;
						}
						let file_item = {
							"name":item.name,
							"id":item.item_id,
							"date":get_datetime(),
							"size":item.size,
							"share":item.share,
							"url":item.url,
							"media":item.media,
							"parent":get_files_folders_array[get_files_folders_index],
							"offline":item.offline,
							"offline_id":item.offline_id,
							"offline_size":item.offline_size,
							"offline_status":item.offline_status,
							"public_link":item.url_public_link,
							"userid_hashid":item.userid_hashid,
							"share_password":item.share_password,
						}
						push_files_to_files_page([file_item],true);
					}
				}
				
				/*
				for(let i=0;i<folders.length;i++){
					let item = folders[i];
					let insert_before_success = false;
					let insert_before_element = files_items_folders_items.getElementsByClassName('files-item')[0];
					for(let i=0;i<folders_cat_array_in_function.length;i++){
						let item2 = folders_cat_array_in_function[i];
						if(item === item2){
							insert_before_element.parentNode.insertBefore(item,insert_before_element);
							insert_before_success = true;
							break;
						}
					}
					if(insert_before_success){
						break;
					}else{
						// 查看是否已经
						for(let i=0;i<folders_cat_array_in_function.length;i++){
							let item2 = folders_cat_array_in_function[i];
							console.log('插入新的文件夹');
							let folder_item = {
								"name":item2.name,
								"date":item2.date,
								"date_int":0,
								"id":item2.item_id,
								"parent":get_files_folders_array[get_files_folders_index],
							}
							push_folders_to_files_page([folder_item]);
							break;
						}
					}
					*/
				files_items = files_items_files_items.getElementsByClassName('files-item');
				for(let i=0;i<files_items.length;i++){
					let item = files_items[i];
					let insert_before_success = false;
					for(let i=0;i<files_cat_array_in_function.length;i++){
						let item2 = files_cat_array_in_function[i];
						if(item === item2){
							let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
							insert_before_element.parentNode.insertBefore(item,insert_before_element);
							insert_before_success = true;
							break;
						}
					}
					if(insert_before_success){
						break;
					}
				}
			}else{
				swal({
					title: "粘贴失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/files_paste.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("new_parent_folder_id=" + parent_folder_id + "&folders_id=" + folders_id_array_string + "&files_id=" + files_id_array_string + "&session_id=" + userinfo["session_id"] );
	// 清空剪切
	// files_unpaste_button.click();
}
files_paste_button.onclick = files_paste_functions;
// 剪切文件操作
function files_cat_functions(){
	files_cat_array = files_items_selected_array;
	folders_cat_array = folders_items_selected_array;
}
files_cat_button.onclick = files_cat_functions;
// 不粘贴按钮
function files_unpaste_functions(){
	files_cat_array = [];
	folders_cat_array = [];
}
files_unpaste_button.onclick = files_unpaste_functions;
// 返回顶部
function scroll_top(){
	window.scrollTo({
		top:0,
		behavior:'smooth',
	});
}
files_top_button.onclick = scroll_top;
let nav_top_button = document.getElementById('nav-top-button');
nav_top_button.onclick = scroll_top;
// 到达底部
function scroll_bottom(){
	window.scrollTo({
		top:1070892573,
		behavior:'smooth',
	});
}
files_bottom_button.onclick = scroll_bottom;
// 整个网页		区域左键点击		关闭菜单
document.onclick = function(e) {
	var e = e || window.event;
	// console.log(e);
	files_main_menu.style.display = "none";
}
// 上传窗口
let uploads_window = document.getElementById('uploads-window');
uploads_window.show = false;
// 上传窗口标题
let uploads_window_title = document.getElementById('uploads-window-title');
let uploads_window_title_span_items = uploads_window_title.getElementsByTagName('span');
// 显示和隐藏上传列表的按钮
let uploads_window_show_or_hide_button = document.getElementById('uploads-window-show-or-hide-button');
uploads_window_show_or_hide_button_i = uploads_window_show_or_hide_button.getElementsByTagName('i')[0];
// 收起上传列表区域
function hide_uploads_window(){
	uploads_window.show = false;
	uploads_window.style.bottom = "-" + ( ( uploads_window.offsetHeight - uploads_window_title.offsetHeight ) ) + "px";
	uploads_window_show_or_hide_button_i.className = "fa fa-window-maximize";
}
hide_uploads_window();
// 显示上传区域
// 收起上传列表区域
function show_uploads_window(){
	uploads_window.show = true;
	uploads_window.style.bottom = "-50px";
	uploads_window_show_or_hide_button_i.className = "fa fa-minus";
}
// 上传窗口标题点击事件
uploads_window_title.onclick = function(){
	uploads_window.show = !uploads_window.show;
	if(uploads_window.show){
		show_uploads_window();
	}else{
		hide_uploads_window();
	}
}
uploads_window_show_or_hide_button.onclick = uploads_window_title.onclick;
// 关闭上传列表的按钮
let uploads_window_close_button = document.getElementById('uploads-window-close-button');
uploads_window_close_button.onclick = hide_uploads_window;
// 文件夹列表主载体
let files = document.getElementById('files');
// 隐藏文件和文件夹
let files_hide_timeout;
function files_hide(){
	try{clearTimeout(files_hide_timeout);}catch(e){};
	try{clearTimeout(files_show_timeout);}catch(e){};
	files.className = "files files-hide";
	files_hide_timeout = setTimeout(function(){
		files.style.display = "none";
	},300);
}
// 设置窗口
let setting = document.getElementById('setting');
let setting_show_timeout;
// 显示设置页面
function setting_show(){
	// 如果未登录
	if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){

	}else{
		window.location.href = "#login";
		return false;
	}
	try{clearTimeout(setting_show_timeout);}catch(e){};
	try{clearTimeout(setting_hide_timeout);}catch(e){};
	setting.style.display = "block";
	setting_show_timeout = setTimeout(function(){
		setting.className = "setting";
	},1);
	window.location.href = "#setting";

}
// 隐藏设置窗口
let setting_hide_timeout;
function setting_hide(){
	try{clearTimeout(setting_show_timeout);}catch(e){};
	try{clearTimeout(setting_hide_timeout);}catch(e){};
	setting.className = "setting setting-hide";
	setting_hide_timeout = setTimeout(function(){
		setting.style.display = "none";
	},300);
};
// 显示文件和文件夹
let files_show_timeout;
function files_show(){
	// 如果未登录
	
	if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
		/*if(upload_window_iframe_element.src != api_upload_web_url){
			show_upload_full_screen_mask = false;
			upload_window_iframe_element.src = api_upload_web_url;
		}*/
		if(!show_upload_full_screen_mask){
			// set_upload_cdn_cloudflare();
		}
	}else{
		window.location.href = "#login";
		return false;
	}
	try{clearTimeout(files_show_timeout);}catch(e){};
	try{clearTimeout(files_hide_timeout);}catch(e){};
	files.style.display = "block";
	files_show_timeout = setTimeout(function(){
		files.className = "files";
	},1);
	window.location.href = "#files";
	if(
		(!get_folders_loadover&&get_folders_page==0)
		||
		(!get_files_loadover&&get_files_page==0)
	){
		// files_bottom_button.click();
		// files_reload();
		get_files();
	}
	
}
// 默认先隐藏全部选项
let menu_buttons_items = files_main_menu.getElementsByClassName('files-main-menu-item');
function menu_buttons_hide(){
	for(let i=0;i<menu_buttons_items.length;i++){
		let item = menu_buttons_items[i];
		item.style.display = "none";
	}
}
// 登录窗口
let login = document.getElementById('login');
// 隐藏登录窗口
let login_hide_timeout;
function login_hide(){
	try{clearTimeout(login_hide_timeout);}catch(e){};
	try{clearTimeout(login_show_timeout);}catch(e){};
	login.className = "login login-hide";
	login_hide_timeout = setTimeout(function(){
		login.style.display = "none";
	},300);
};
// 显示登录窗口
let login_show_timeout;
function login_show(){
	try{clearTimeout(login_hide_timeout);}catch(e){};
	try{clearTimeout(login_show_timeout);}catch(e){};
	login.style.display = "block";
	login_show_timeout = setTimeout(function(){
		login.className = "login";
	},1);
	window.location.href = "#login";
}
// 注册窗口
let register = document.getElementById('register');
// 隐藏注册窗口
let register_hide_timeout;
function register_hide(){
	try{clearTimeout(register_hide_timeout);}catch(e){};
	try{clearTimeout(register_show_timeout);}catch(e){};
	register.className = "register register-hide";
	register_hide_timeout = setTimeout(function(){
		register.style.display = "none";
	},300);
};

// 显示文件分享
let sharefile_show_timeout;
function sharefile_show(){
	try{clearTimeout(sharefile_show_timeout);}catch(e){};
	try{clearTimeout(sharefile_hide_timeout);}catch(e){};
	sharefile.style.display = "block";
	sharefile_show_timeout = setTimeout(function(){
		sharefile.className = "sharefile";
	},3);
	// window.location.href = "#sharefile";
}
// 隐藏用户协议
let sharefile_hide_timeout;
function sharefile_hide(){
	try{clearTimeout(sharefile_hide_timeout);}catch(e){};
	try{clearTimeout(sharefile_show_timeout);}catch(e){};
	sharefile.className = "sharefile sharefile-hide";
	sharefile_hide_timeout = setTimeout(function(){
		sharefile.style.display = "none";
	},300);
}
// 显示用户协议
let terms_of_services_show_timeout;
function terms_of_services_show(){
	try{clearTimeout(terms_of_services_show_timeout);}catch(e){};
	try{clearTimeout(terms_of_services_hide_timeout);}catch(e){};
	terms_of_services.style.display = "block";
	terms_of_services_show_timeout = setTimeout(function(){
		terms_of_services.className = "terms-of-services";
	},3);
	window.location.href = "#terms-of-services";
}
// 隐藏用户协议
let terms_of_services_hide_timeout;
function terms_of_services_hide(){
	try{clearTimeout(terms_of_services_show_timeout);}catch(e){};
	try{clearTimeout(terms_of_services_hide_timeout);}catch(e){};
	terms_of_services.className = "terms-of-services terms-of-services-hide";
	terms_of_services_hide_timeout = setTimeout(function(){
		terms_of_services.style.display = "none";
	},300);
}
// 显示注册窗口
let register_show_timeout;
function register_show(){
	try{clearTimeout(register_hide_timeout);}catch(e){};
	try{clearTimeout(register_show_timeout);}catch(e){};
	register.style.display = "block";
	register_show_timeout = setTimeout(function(){
		register.className = "register";
	},3);
	window.location.href = "#register";
}
// 找回密码窗口
let forget_password = document.getElementById('forget-password');
// 隐藏找回密码窗口
let forget_password_hide_timeout;
function forget_password_hide(){
	try{clearTimeout(forget_password_hide_timeout);}catch(e){};
	try{clearTimeout(forget_password_show_timeout);}catch(e){};
	forget_password.className = "forget-password forget-password-hide";
	forget_password_hide_timeout = setTimeout(function(){
		forget_password.style.display = "none";
	},300);
};
// 显示找回密码窗口
let forget_password_show_timeout;
function forget_password_show(){
	try{clearTimeout(forget_password_hide_timeout);}catch(e){};
	try{clearTimeout(forget_password_show_timeout);}catch(e){};
	forget_password.style.display = "block";
	forget_password_show_timeout = setTimeout(function(){
		forget_password.className = "forget-password";
	},3);
	window.location.href = "#forget-password";
}
// 隐藏所有页面
function pages_hide(){
	files_hide();
	login_hide();
	register_hide();
	terms_of_services_hide();
	forget_password_hide();
	sharefile_hide();
	setting_hide();
}
// 隐藏各个页面
// pages_hide();
// 导航栏全部按钮
let nav_items_item_items = nav.getElementsByClassName('nav-item');
// 去除导航栏按钮底色选中底色
function nav_buttons_unset_selected(){
	for(let i=0;i<nav_items_item_items.length;i++){
		let item = nav_items_item_items[i];
		item.className = "nav-item";
	}
}

// 捐助我们
function showpay(){
	let content_element = document.createElement('div');
	content_element.innerHTML = '<img src="/img/pay_wx_zfb_qq_2.png" />';
	swal({
		text:"真诚感谢你的支持，我们承诺永久免费。",
		content: content_element,
		// buttons: true,
		// dangerMode: true,
		buttons: ["取消","确定"],
		closeOnClickOutside: false,
	});
}



// 获取容量
let usedsize;
let usedsize_unit;
function get_usedsize_function(){
	
	if(navigator.language.toLowerCase().indexOf('cn')==-1){return false;}

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			usedsize = xmlhttp.responseText;
			usedsize_unit = get_size_unit(usedsize);
			files_search_input.placeholder = "搜索文件（" + usedsize_unit + "）";
			files_search_input.title = "搜索文件（" + usedsize_unit + "）";
			if(usedsize >= 300 * 1024 * 1024 * 1024){
				if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")==-1){
					show_love_pay();
				}
				nav_love_me_button.onclick = show_love_pay;
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/get_usedsize.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("post=1&session_id="+userinfo["session_id"]);
	
}


// 是否支持外链
let public_link_status = false;
let private_link_status = false;


let show_love_pay_locked = false;

// 显示捐助
function show_love_pay(){
	
	return false;

	if(public_link_status||private_link_status){
		return false;
	}
	
	if(show_love_pay_locked){
		return false;
	}
	

	// 成立时间 2020-12-10 00:00:00
	let y = 2020;
	let m = 12;
	let d = 10;
	let t = 1607529600;
	
	let y_n = Math.floor((t_system_online-1607529600)/60/60/24/365);
	let m_n = Math.floor(((t_system_online-1607529600)/60/60/24/(365/12))%12);

	swal({
		title: "支持我们",
		text: "亲爱的用户，您好！\r\n云中转自"+y+"年"+m+"月"+d+"日创立以来，已经陪伴全体用户走过"+y_n+"年"+m_n+"个月之久，每周7x24小时在线服务永远为您准备。\r\n目前，您的账号下总共保存了"+get_size_unit(usedsize)+"的文件数据，假设有50%的文件是重复的（即其他用户也保存着一份与您同样的文件），云中转系统中也仍然为您保存着至少"+get_size_unit((usedsize/2))+"-"+get_size_unit((usedsize))+"的文件数据，按照Backblaze B2官方0.005美元/GB/月（5.12美元/TB/月）的超低存储价格计算，云中转每月约至少为您保存的文件数据支付着"+(((usedsize/2)/1024/1024/1024)*0.005).toFixed(2)+"-"+(((usedsize)/1024/1024/1024)*0.005).toFixed(2)+"美元（约"+(((usedsize/2)/1024/1024/1024)*0.0336).toFixed(2)+"-"+(((usedsize)/1024/1024/1024)*0.0336).toFixed(2)+"元人民币）的数据存储经济成本，这并未包括上传/下载所使用到的网络宽带/流量、服务器资源、运维等其他方面投入的经济成本。\r\n如果您对我们的服务感到满意，希望您能够捐助以支持我们！",
		icon: "warning",
		buttons: ["关我屁事","支持一下"],
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			showpay();
		}else{
			show_love_pay_locked = true;
		}
	});


}


// 是否 qq 扫码登录
let is_qq_qr_code_login = false;

function showlove(){
	
	

	if(
		is_qq_qr_code_login
	){
		nav_reset_password_button.click();
		return false;
	}
	
	try{
		if(navigator.language.toLowerCase().indexOf('cn')==-1){
			return false;
		}
	}catch(e){
		
	};
	
	
	
	return false;

	swal({
		// title: "系统通知",
		text: "云中转自2020年12月10日成立以来，始终免费为用户服务。\r\n我们始终坚持初心，一心要做一个简单好用的云盘。\r\n用户可以免登录直接点击就能下载你所分享的文件。\r\n这里没有广告，也没有限速，也不限容量，文件永久有效。\r\n如果你认为我们产品服务做得很好，希望你能够支持我们。\r\n我们将尽最大的努力去优化和维护，带来更好的用户体验。",
		// icon: "warning",
		buttons: ["朕不支持","支持一下"],
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			showpay();
		}
	});
}

// 退出登录
function logout(){
	if(window.location.href.indexOf('#login')!=-1||window.location.href.indexOf('#register')!=-1||window.location.href.indexOf('#forget-password')!=-1||window.location.href.indexOf('#reset-password')!=-1){
		return false;
	}
	swal({
		title: "退出登录",
		text: "您是否要退出登录？",
		icon: "warning",
		buttons: true,
		dangerMode: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		if (willDelete) {
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					let ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){
						let session_id = userinfo["session_id"];
						userinfo = {};
						userinfo["session_id"] = session_id;
						uploads_window_close_button.click();
						nav_buttons_unset_selected();
						if(login.className.indexOf('login-hide')!=-1){
							pages_hide();
						}
						login_show();
						nav_hide();
						remove_files_items();
						get_files_folders_array = ["0"];
						get_files_folders_index = 0;
						get_userinfo();
					}else{
					}
				}
			}
			xmlhttp.open("POST",api_server_url+"/php/v4/exit.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.withCredentials = true;
			xmlhttp.send("session_id="+userinfo["session_id"]);
		}
	});
};
// 文件列表按钮
let nav_files_button = document.getElementById('nav-files-button');
let nav_home_button = document.getElementById('nav-home-button');
let nav_admin_button = document.getElementById('nav-admin-button');
nav_home_button.onclick = function(){
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		return false;
	}
	window.open('/welcome/index.html');
	// window.open('/admin/index.html');
}
nav_admin_button.onclick = function(){
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		return false;
	}
	// window.open('/welcome/index.html');
	window.open('/admin/index.html');
}
// 如果正在验证微信，窗口还没关闭
let wechat_bind_auto_click_login_button_timeout;
function wechat_bind_auto_click_login_button(){
	let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
	if(swal_element.length>0){
		login_input_button_login.click();
	};
}






// cdn-download 加速下载的域名
let cdn_cgi_trace_cdn_download_locked = false;
let cdn_cgi_trace_cdn_download_status = false;
let sharefile_content_link_items_cdn_download = document.getElementById('sharefile-content-link-items-cdn-download');
let cdn_cgi_trace_cdn_download_error_times = 0;
function cdn_cgi_trace_cdn_download(){
    
	return false;
	return false;
	if(cdn_cgi_trace_cdn_download_locked){
		return false;
	}
	if(cdn_cgi_trace_cdn_download_error_times>5){
		return false;
	}
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		return false;
	}
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// console.log(xmlhttp.responseText);
			cdn_cgi_trace_cdn_download_locked = true;
			cdn_cgi_trace_cdn_download_status = true;
			
			if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
				sharefile_content_link_items_cdn_download.style.display = "none";
			}else{
				sharefile_content_link_items_cdn_download.style.display = "block";
			}
			
		}
		if(xmlhttp.readyState==4){
			setTimeout(cdn_cgi_trace_cdn_download,100);
		}
	}
	xmlhttp.onerror = function(){
		cdn_cgi_trace_cdn_download_error_times++;
		setTimeout(cdn_cgi_trace_cdn_download,100);
	}
	xmlhttp.open("GET","https://cdn-download.123.com/cdn-cgi/trace",true);
	xmlhttp.send();
}




// 试一下能不能使用非 Cloudflare 节点
let cdn_upload_web_url = window.location.protocol + "//cdn-upload.123.com";
let cdn_cgi_trace_cdn_upload_locked = false;
let cdn_cgi_trace_cdn_upload_xmlhttp_error_times = 0;
function cdn_cgi_trace_cdn_upload(){
    
	return false;
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		return false;
	}
	if(cdn_cgi_trace_cdn_upload_locked){
		return false;
	}
	if(upload_window_iframe_element_src_locked){
		return false;
	}
	if(cdn_cgi_trace_cdn_upload_xmlhttp_error_times>3){
		return false;
	}
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){
		cdn_cgi_trace_cdn_upload_xmlhttp_error_times+=1;
		setTimeout(cdn_cgi_trace_cdn_upload,100);
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// console.log(xmlhttp.responseText);
			cdn_cgi_trace_cdn_upload_locked = true;
			if(xmlhttp.responseText.indexOf('colo=ICN')!=-1||xmlhttp.responseText.indexOf('colo=NRT')!=-1||xmlhttp.responseText.indexOf('colo=HKG')!=-1||xmlhttp.responseText.indexOf('colo=SIN')!=-1||xmlhttp.responseText.indexOf('colo=KUL')!=-1||xmlhttp.responseText.indexOf('colo=TPE')!=-1||xmlhttp.responseText.indexOf('colo=MFM')!=-1){ // 确定是香港日本节点

				if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
					if(upload_window_iframe_element_src_locked){
						return false;
					}
					// 可以使用非 Cloudflare 节点
					upload_web_url = cdn_upload_web_url;
					api_upload_web_url_load(); // api_upload_web_url = upload_web_url + "/v6/upload";
					setTimeout(set_upload_cdn_cloudflare,200);
				}
				
			}
			
			setTimeout(cdn_cgi_trace_cdn_upload,100);


		}
		if(xmlhttp.readyState==4){
			setTimeout(cdn_cgi_trace_cdn_upload,100);
		}
	}
	xmlhttp.open("GET",cdn_upload_web_url + "/cdn-cgi/trace",true);
	xmlhttp.send();
}



// 加载上传域名，提前获取IP
let cdn_cgi_trace_upload_locked = false;
let cdn_cgi_trace_upload_error_times = 0;
function cdn_cgi_trace_upload(){
    
	if(cdn_cgi_trace_upload_locked){
		return false;
	}
	if(cdn_cgi_trace_upload_error_times>5){
		setTimeout(cdn_cgi_trace_cdn_upload,500);
		return false;
	}
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// console.log(xmlhttp.responseText);
			cdn_cgi_trace_upload_locked = true;
			if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
				setTimeout(set_upload_cdn_cloudflare,200);
				// 如果不是 HKG 一般移动可能连接 HKG 如果没连上，再考虑寻找亚洲节点
				if(userinfo["money"]<-50){
					// -1 -100
				}else{
					if(xmlhttp.responseText.indexOf('colo=HKG')==-1&&xmlhttp.responseText.indexOf('colo=FRA---')==-1){ // 如果不是移动香港并且也不是联通法兰克福
						// 再看一下，能不能使用非 Cloudflare 节点
						setTimeout(cdn_cgi_trace_cdn_upload,500);
					}
				}
			}
		}
		if(xmlhttp.readyState==4){
			setTimeout(cdn_cgi_trace_upload,100);
		}
	}
	xmlhttp.onerror = function(){
		cdn_cgi_trace_upload_error_times++;
		setTimeout(cdn_cgi_trace_upload,100);
	}
	xmlhttp.open("GET",upload_web_url + "/cdn-cgi/trace",true);
	xmlhttp.send();
}




// 探测下载线路，是否中国移动香港
let cdn_cgi_trace_download_locked = false;
let cdn_cgi_trace_download_error_times = 0;
let cdn_cgi_trace_download_hkg = false;
let cdn_cgi_trace_download_fra = false;
function cdn_cgi_trace_download(){
    return false;
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		return false;
	}
	if(cdn_cgi_trace_download_locked){
		return false;
	}
	if(cdn_cgi_trace_download_error_times>3){
		return false;
	}
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onerror = function(){
		cdn_cgi_trace_download_error_times+=1;
		setTimeout(cdn_cgi_trace_download,100);
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// console.log(xmlhttp.responseText);
			

			
			cdn_cgi_trace_download_locked = true;
			if(xmlhttp.responseText.indexOf('colo=HKG')!=-1 || xmlhttp.responseText.indexOf('colo=SEA')!=-1){
				cdn_cgi_trace_download_hkg = true;
			}
			if(xmlhttp.responseText.indexOf('colo=FRA')!=-1 ){
				cdn_cgi_trace_download_fra = true;
			}
			
			if(cdn_cgi_trace_download_hkg||cdn_cgi_trace_download_fra){
				sharefile_content_link_item_download_button_9.style.display = "none";
				sharefile_content_link_item_download_button_10.style.display = "none";
				sharefile_content_link_item_download_button_11.style.display = "none";
				sharefile_content_link_item_download_button_16.style.display = "none";
				sharefile_content_link_item_download_button_17.style.display = "none";
				sharefile_content_link_item_download_button_18.style.display = "none";
				sharefile_content_link_item_download_button_30.style.display = "none";
				sharefile_content_link_item_download_button_19.style.display = "none";
			}
			
			
			
			

		}
		if(xmlhttp.readyState==4){
			setTimeout(cdn_cgi_trace_download,100);
		}
	}
	xmlhttp.open("GET",download_web_url + "/cdn-cgi/trace",true);
	xmlhttp.send();
}






// 登录按钮
let login_input_button_login = document.getElementById('login-input-button-login');
login_input_button_login.onclick = function(){
	let username = encodeURIComponent( login_input_username.value );
	let password = encodeURIComponent( login_input_password.value );
	if(username.length<1||password.length<1){
		swal({
			title: "请先输入",
			text: "请输入账号和密码进行登录。",
			icon: "warning",
			// buttons: true,
			// dangerMode: true,
			closeOnClickOutside: false,
		});
		return false;
	}
	upload_lock = true;
	upload_lock_title = "加载组件";
	upload_lock_text = "上传组件正在加载，请您稍等。";
	upload_lock_icon = "error";
	upload_lock_buttons = undefined;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 清空所有输入框的内容
				let inputs = document.getElementsByTagName('input');
				for(let i=0;i<inputs.length;i++){
					inputs[i].value = "";
				}
				// 登录成功
				// 尝试关闭提示框
				let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
				if(swal_element.length>0){
					document.getElementsByClassName('swal-button--cancel')[0].click();
					document.getElementsByClassName('swal-button--cancel')[1].click();
				}
				userinfo["session_id"] = ResultJSON["session_id"];
				get_userinfo();
				// pages_hide();
				// nav_files_button.click();
				setTimeout(showlove,500);
				setTimeout(cdn_cgi_trace_upload,100);
			}else{
				// 如果是账号密码不正确
				if(ResultJSON["status_code"]==403){
					let content_element = document.createElement('div');
					content_element.innerHTML = '<img src="/img/wechat_bind_1.png" />';
					// 要求绑定微信
					swal({
						title: "微信验证",
						text: ResultJSON["message"],
						icon: "warning",
						content: content_element,
						// buttons: true,
						// dangerMode: true,
						buttons: true,
						closeOnClickOutside: false,
					});
					// 如果窗口还没关闭
					wechat_bind_auto_click_login_button_timeout = setTimeout(wechat_bind_auto_click_login_button,3000);
				}else{
					swal({
						title: "登录失败",
						text: ResultJSON["message"],
						icon: "error",
						// buttons: true,
						// dangerMode: true,
						closeOnClickOutside: false,
					});
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/login.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("username="+username+"&password="+password+"&session_id="+userinfo["session_id"]);
	return false;
	/*
	swal({
		title: "登录成功",
		text: "欢迎光临！",
		icon: "success",
		buttons: true,
		dangerMode: true,
		closeOnClickOutside: false,
	});
	pages_hide();
	nav_files_button.click();
	*/
};
function set_nav_selected_index(that){
	nav_buttons_unset_selected();
	that.className = "nav-item nav-item-selected";
}
// 给导航栏上点击事件
for(let i=0;i<nav_items_item_items.length;i++){
	let item = nav_items_item_items[i];
	item.onclick = function(){
	    
	    // 如果是管理按钮
		if(this.id == "nav-admin-button"){
			// window.open('/welcome/index.html');
			window.open('/admin/index.html');
			return false;
		}

		// 如果是主页按钮
		if(this.id == "nav-home-button"){
			// window.open('/welcome/index.html');
			window.open('/welcome/index.html');
			return false;
		}
		// 如果是切换语言
		if(this.id == "language-setting-button"){
			// console.log('切换语言');
			return false;
		}
		if(this.id == "nav-top-button"){
			scroll_top();
			return false;
		}
		if(this.id == "nav-exit-button"){
			logout();
			return false;
		}
		if(this.id == "hide-nav-button"){
			nav_hide();
			return false;
		}
		// 如果未登录 不做处理
		if(userinfo["id"]==undefined||isNaN(userinfo["id"])||userinfo["id"]==''||userinfo["id"]==null||userinfo["qq"]==undefined||isNaN(userinfo["qq"])||userinfo["qq"]==''||userinfo["qq"]==null||userinfo["username"]==undefined||userinfo["username"]==''||userinfo["username"]==null){
			swal({
				title: "请先登录",
				text: "请先登录。",
				icon: "info",
				// buttons: true,
				// dangerMode: true,
				button: "继续",
				closeOnClickOutside: false,
			}).then((willDelete) => {
				if (willDelete) {
					if(login.className.indexOf('login-hide')!=-1){
						pages_hide();
					}
					login_show();
				}
			});
			return false;
		}
		if(this.id == "nav-files-button"){
			setTimeout(set_nav_selected_index,10,this);
			if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")==-1){
				return false;
			}
			
			if(files.className.indexOf('files-hide')!=-1){
				pages_hide();
			}
			files_show();
		}else if(this.id == "nav-setting-button"){ // 如果是设置按钮
			setTimeout(set_nav_selected_index,10,this);
			if(setting.className.indexOf("setting-hide")!=-1){
				// return false;
				if(setting.className.indexOf('setting-hide')!=-1){
					pages_hide();
				}
				setting_show();
			}
		}else if(this.id == "nav-files-reload-button"){ // 如果是刷新按钮
			files_reload();
			return false;
		}else{
			pages_hide();
		}
		
		// 如果 id 是文件 那就显示文件
		/*if(this.id == "nav-files-button"){
			files_show();
		}*/
	}
}
// 跳转至注册页面
let login_input_register_page_button = document.getElementById('login-input-register-page-button');
// let show_register_page_timeout;
login_input_register_page_button.onclick = function(){
	if(register.className.indexOf('register-hide')!=-1){
		pages_hide();
	}
	register_show();
	// return false;
	// try{clearTimeout(show_register_page_timeout);}catch(e){};
	// show_register_page_timeout = setTimeout(register_show,3);
}
// 从注册页面返回登录页面
let register_page_show_login_button = document.getElementById('register-page-show-login-button');
register_page_show_login_button.onclick = function(){
	if(login.className.indexOf('login-hide')!=-1){
		pages_hide();
	}
	login_show();
}
// 跳转至找回密码页面
let login_input_forget_password_page_button = document.getElementById('login-input-forget-password-page-button');
let login_input_forget_password_page_button_2 = document.getElementById('login-input-forget-password-page-button-2');
// let show_forget_password_page_timeout;
login_input_forget_password_page_button.onclick = function(){
    swal("找回密码，请联系管理员，或者请程序员二次开发接口，实现对应功能。");
    return false;
	if(forget_password.className.indexOf('forget-password-hide')!=-1){
		pages_hide();
	}
	forget_password_show();
}
login_input_forget_password_page_button_2.onclick = login_input_forget_password_page_button.onclick;
// 从找回密码页面返回登录页面
let forget_password_page_show_login_button = document.getElementById('forget-password-page-show-login-button');
forget_password_page_show_login_button.onclick = function(){
	if(login.className.indexOf('login-hide')!=-1){
		pages_hide();
	}
	login_show();
}
// 登录输入密码框
let login_input_password = document.getElementById('login-input-password');
// 显示登录密码
let login_input_show_password_button = document.getElementById('login-input-show-password-button');
login_input_show_password_button.onclick = function(){
	if(login_input_password.type=="password"){
		login_input_password.type = "text";
		this.className = "fa fa-eye";
	}else{
		login_input_password.type = "password";
		this.className = "fa fa-eye-slash";
	}
}
// 登录窗口 输入账号 输入框
let login_input_username = document.getElementById('login-input-username');
// 接口服务器地址

let api_server_url = window.location.protocol + "//api.dnstop.cc";

if(navigator.language.toLowerCase().indexOf('cn')==-1){

	api_server_url = window.location.protocol + "//api.123.com";

}

let not_vip_upload_file_size = 1000 * 1024 * 1024; // 非会员用户上传文件最大允许1GB
// 如果用户试图修改JS绕过限制，在上传文件后，系统将匹配文件大小，异常则永久封号

// 余额
let setting_user_span_money = document.getElementById('setting-user-span-money');
let setting_user_span_vipdatetime = document.getElementById('setting-user-span-vipdatetime');
let setting_user_div_vipdatetime_warning_01 = document.getElementById('setting-user-div-vipdatetime-warning-01');
let setting_user_div_vipdatetime_warning_02 = document.getElementById('setting-user-div-vipdatetime-warning-02');
setting_user_div_vipdatetime_warning_02.onclick = function(){
	let option_text = "开通";
	let pricing = "0.5";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "0.5";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=50){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=50){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "1天会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "1天会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(1);
	  }
	});
}


function update_vip_function(day_int){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				get_userinfo();
				swal({
					title: "系统提示",
					text: ResultJSON["message"],
					icon: "success",
					button: true,
					closeOnClickOutside: false,
					dangerMode: true,
				});
			}else{
				swal({
					title: "系统提示",
					text: ResultJSON["message"],
					icon: "error",
					buttons: ["取消","充值"],
					closeOnClickOutside: false,
					dangerMode: true,
				}).then((willDelete) => {
				  if (willDelete) {
				    show_qqpay();
				  }
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/update_vip",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("day="+day_int+"&session_id="+userinfo["session_id"]);
}

let setting_user_div_vipdatetime_warning_03 = document.getElementById('setting-user-div-vipdatetime-warning-03');
setting_user_div_vipdatetime_warning_03.onclick = function(){
	let option_text = "开通";
	let pricing = "3";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "3";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=300){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=300){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "1周会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "1周会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(7);
	  }
	});
}


let setting_user_div_vipdatetime_warning_04 = document.getElementById('setting-user-div-vipdatetime-warning-04');
setting_user_div_vipdatetime_warning_04.onclick = function(){
	let option_text = "开通";
	let pricing = "10";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "10";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=1000){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=1000){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "1月会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "1月会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(31);
	  }
	});
}


let setting_user_div_vipdatetime_warning_05 = document.getElementById('setting-user-div-vipdatetime-warning-05');
setting_user_div_vipdatetime_warning_05.onclick = function(){
	let option_text = "开通";
	let pricing = "28";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "28";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=2800){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=2800){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "1季会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "1季会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(93);
	  }
	});
}

let setting_user_div_vipdatetime_warning_06 = document.getElementById('setting-user-div-vipdatetime-warning-06');
setting_user_div_vipdatetime_warning_06.onclick = function(){
	let option_text = "开通";
	let pricing = "88";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "88";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=8800){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=8800){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "1年会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "1年会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(365);
	  }
	});
}

let setting_user_div_vipdatetime_warning_07 = document.getElementById('setting-user-div-vipdatetime-warning-07');
setting_user_div_vipdatetime_warning_07.onclick = function(){
	let option_text = "开通";
	let pricing = "388";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "388";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=38800){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=38800){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "5年会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "5年会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(1825);
	  }
	});
}


let setting_user_div_vipdatetime_warning_08 = document.getElementById('setting-user-div-vipdatetime-warning-08');
setting_user_div_vipdatetime_warning_08.onclick = function(){
	let option_text = "开通";
	let pricing = "688";
	if(userinfo["vipstatus"]){
		option_text = "续费";
		pricing = "688";
	}
	if(userinfo["vipstatus"]&&userinfo["money"]>=68800){

	}else if(!userinfo["vipstatus"]&&userinfo["money"]>=68800){

	}else{
		swal({
			title: "余额不足",
			text: option_text + "10年会员需要" + pricing + "元，您的余额不足！",
			icon: "error",
			buttons: ["取消","充值"],
			closeOnClickOutside: false,
			dangerMode: true,
		}).then((willDelete) => {
		  if (willDelete) {
		    show_qqpay();
		  }
		});
		return false;
	}
	swal({
		title: option_text + "确认",
		text: "是否" + option_text + "10年会员？\r\n仅需" + pricing + "元！",
		icon: "warning",
		buttons: ["取消",option_text],
		closeOnClickOutside: false,
		dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
	    update_vip_function(3650);
	  }
	});
}




let use_qq_qr_code_login = false;
let need_show_qq_qr_code_login_swal = false;
function show_verify_code(){
	let html_element = document.createElement('div');
	html_element.innerHTML = '<img class="verify-pass-img" src="'+api_server_url+'/php/v4/verify_code.php?session_id=' + userinfo["session_id"] + '&t=' + new Date().getTime() + '"/><br/><br/><input placeholder="请输入图片中12位验证文字！" autocomplete="off" class="swal-content__input verify-pass-input">';
	if(navigator.language.toLowerCase().indexOf('cn')==-1){
		let new_src = html_element.getElementsByClassName('verify-pass-img')[0].src.replace(/verify_code.php/g,'verify_code');
		new_src = new_src.replace(api_server_url,window.location.protocol+'//api.123.com');
		html_element.getElementsByClassName('verify-pass-img')[0].src = new_src;
	}
	swal({
		title: "请先验证！",
		icon: "warning",
		text: "请输入图片中12位验证文字！\r\n直接点击图片即可刷新。",
		content: html_element,
		closeOnClickOutside: false,
		buttons:["放弃","提交"],
		dangerMode: true,
	}).then((willDelete) => {
		if(willDelete){
			let verify_pass_input_items = document.getElementsByClassName('verify-pass-input');
			if(verify_pass_input_items.length>0){
				let verify_pass_input = verify_pass_input_items[0];
				let verify_pass_input_value = verify_pass_input.value;
				if(verify_pass_input_value.length>0&&verify_pass_input_value.length==12){
					swal({
						title: "正在验证",
						text: "正在验证",
						icon: "info",
						dangerMode: true,
						closeOnClickOutside: false,
					}).then((willDelete) => {
						// pass
					});
					let xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							let ResultJSON = JSON.parse(xmlhttp.responseText);
							if(ResultJSON["status"]){
								if(
									ResultJSON["verify_pass"] != undefined
									&&
									ResultJSON["verify_pass"] == true
								){
									need_show_qq_qr_code_login_swal = true;
								}
								get_userinfo();
							}else{
								swal({
									title: "输入错误！",
									text: "重新输入！",
									icon: "error",
									dangerMode: true,
									closeOnClickOutside: false,
								}).then((willDelete) => {
									show_verify_code();
								});
							}
						}
					}
					if(navigator.language.toLowerCase().indexOf('cn')==-1){
						xmlhttp.open("GET",window.location.protocol+"//api.123.com/php/v4/verify_code?session_id="+userinfo["session_id"]+"&submit_verify_code="+verify_pass_input_value+"&t="+new Date().getTime(),true);
					}else{
						xmlhttp.open("GET",api_server_url+"/php/v4/verify_code.php?session_id="+userinfo["session_id"]+"&submit_verify_code="+verify_pass_input_value+"&t="+new Date().getTime(),true);
					}
					xmlhttp.withCredentials = true;
					xmlhttp.send();
					
				}else{
					show_verify_code();
				}
			}
		}
	});
	
	let verify_pass_img_items = document.getElementsByClassName('verify-pass-img');
	if(verify_pass_img_items.length>0){
		let verify_pass_img = verify_pass_img_items[0];
		verify_pass_img.onclick = function(){
			if(navigator.language.toLowerCase().indexOf('cn')==-1){
				this.src = window.location.protocol+'//api.123.com/php/v4/verify_code?session_id=' + userinfo["session_id"] + '&t=' + new Date().getTime();
			}else{
				this.src = api_server_url+'/php/v4/verify_code.php?session_id=' + userinfo["session_id"] + '&t=' + new Date().getTime();
			}
		}
	}

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
	xmlhttp.open("POST",api_server_url+"/php/v4/remove_pass.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("remove_pass="+domain_name+"&session_id="+session_id);
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
    				userinfo = {};
    				get_userinfo();
    				
    			}else{
    				swal("保存失败！" + ResultJSON["message"]);
    			}
    		}
    	}
    	xmlhttp.open("POST",api_server_url+"/php/v4/new_pass_domain_name.php",true);
    	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	xmlhttp.withCredentials = true;
    	xmlhttp.send("domain_name=" + value + "&session_id="+session_id);

	  }else{
	  	// 没有输入内容

	  }
	});
}


// 系统时间戳
let t_system_online = 1657535600;
// 允许哪些网站使用直链
let setting_main_order_list_items = document.getElementById('setting-main-order-list-items');
let new_pass_domain_name_button = document.getElementById('new-pass-domain-name-button');
new_pass_domain_name_button.onclick = function(){
    New_Pass_Domain_Name();
};
let nav_setting_button = document.getElementById('nav-setting-button');
let setting_user_span_wechat_name = document.getElementById('setting-user-span-wechat-name');
let setting_user_span_username = document.getElementById('setting-user-span-username');
let setting_user_span_qq = document.getElementById('setting-user-span-qq');
let setting_user_div_wechat_profile_picture = document.getElementById('setting-user-div-wechat-profile-picture');
let setting_user_div_qq_profile_picture = document.getElementById('setting-user-div-qq-profile-picture');
let get_userinfo_locked = false;
// 获取用户信息
function get_userinfo(){
	if( download_media_locked || ( userinfo["id"]!=undefined && userinfo["id"]!=null && userinfo["id"]!='' && userinfo["qq"]!=undefined && userinfo["qq"]!=null && userinfo["qq"]!='' && userinfo["username"]!=undefined && userinfo["username"]!=null && userinfo["username"]!='' )  ){
		return false;
	}
	if(get_userinfo_locked){
		return false;
	}
	get_userinfo_locked = true;
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		
		if(xmlhttp.readyState==4){
			setTimeout(function(){
				get_userinfo_locked = false;
			},200);
			
		}
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			
			document.title = ResultJSON["web_title"];
			
			// 系统时间戳
			try{
				t_system_online = ResultJSON["t"];
			}catch(e){};
			
			
			if(ResultJSON["session_id"] != undefined && ResultJSON["session_id"] != null && ResultJSON["session_id"] != "" ){
				userinfo["session_id"] = ResultJSON["session_id"];
				let cookie_date = new Date(2100,10,01);
				document.cookie = "PHPSESSID=" + userinfo["session_id"] + ";path=/;expires="+cookie_date.toUTCString();
			}
			if(ResultJSON["status"]){
			    
			    if(ResultJSON["auto_download"]!=undefined){
			        download_web_url = ResultJSON["auto_download"];
			    }
			    
			    
			    setting_main_order_list_items.innerHTML = "";
			    for(let i=0;(ResultJSON["pass"]!=undefined&&ResultJSON["pass"].length>0&&i<ResultJSON["pass"].length);i++){
			        
			        let item = ResultJSON["pass"][i];
				    let div = document.createElement('div');
				    div.className = "setting-main-order-list-item";
				    div.innerHTML = item["domain"].split('.php')[0] + ' <span class="setting-main-order-list-item-remove-button"><i class="fa fa-trash"></i>删除</span>';
				    div.remove_button = div.getElementsByClassName('setting-main-order-list-item-remove-button')[0];
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
				
				nav_love_me_button.style.display = "block";
				
				get_usedsize_function();
				
				// 如果支持外链
				if(ResultJSON["public_link"]!=undefined&&ResultJSON["public_link"]==true){
					public_link_status = true;
				}
				
				// 如果专属定制外链地址
				if(ResultJSON["private_link"]!=undefined&&ResultJSON["private_link"]==true){
					private_link_status = true;
				}
				
				// 如果信用不好
				if(ResultJSON["money"] < 0){
					upload_file_max_size = not_vip_upload_file_size = 100 * 1024 * 1024;
					free_or_mini_or_big_vip.className="";
				}else{
					upload_file_max_size = not_vip_upload_file_size = 1000 * 1024 * 1024;
				}
				
				// 限制上传
				let upload_window_limit_upload_number = "";
				if( ResultJSON["limit_upload_number_max"] != undefined && ResultJSON["limit_upload_number_max"] > -1 ){
				    upload_window_limit_upload_number = "，今日限制上传"+ResultJSON["limit_upload_number"]+"/"+ ResultJSON["limit_upload_number_max"]+"个文件。";
				}
				
				if( ResultJSON["upload_file_max_size"] != undefined ){
					upload_file_max_size = not_vip_upload_file_size = ResultJSON["upload_file_max_size"];
					uploads_window_title_span_items[0].innerHTML = "（单个文件最大" + get_size_unit(ResultJSON["upload_file_max_size"]) + upload_window_limit_upload_number + "）";
					uploads_window_title_span_items[0].title = "（单个文件最大" + get_size_unit(ResultJSON["upload_file_max_size"]) + upload_window_limit_upload_number + "）";
				}
				
				
				
				if(ResultJSON["money"] < -100){
					upload_file_max_size = 0;
				}
				
				setTimeout(cdn_cgi_trace_upload,100);
				
				
				
				// qq 扫码登录 确认
				if(
					ResultJSON["low_password"] != undefined
					&&
					ResultJSON["low_password"] == true
				){
					is_qq_qr_code_login = true;
				}
				
				
				use_qq_qr_code_login = false;
				setTimeout(query_all_files_sum_size,100);
				// 关闭提示框
				let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
				if(swal_element.length>0 && window.location.href.indexOf("#setting")==-1){
					document.getElementsByClassName('swal-button--cancel')[0].click();
					document.getElementsByClassName('swal-button--cancel')[1].click();
				}
				userinfo["wechat_login_id"] = undefined;
				// 加载上传页面
				/*upload_window_iframe_element.src = api_upload_web_url;
				function fun_1(){
					if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")==-1){
						if(upload_window_iframe_element.src != api_upload_web_url){
							upload_window_iframe_element.src = api_upload_web_url;
						}
					}
				}
				setTimeout(fun_1,10);*/
				userinfo["id"] = ResultJSON["id"];
				userinfo["qq"] = ResultJSON["qq"];
				setting_user_span_qq.innerText = userinfo["qq"];
				setting_user_div_qq_profile_picture.style.backgroundImage = "url('https://q1.qlogo.cn/g?b=qq&nk=" + userinfo["qq"] + "&s=640')";
				userinfo["wechat_name"] = ResultJSON["wechat_name"];
				setting_user_span_wechat_name.innerText = userinfo["wechat_name"];
				userinfo["wechat_profile_picture"] = ResultJSON["wechat_profile_picture"];
				setting_user_div_wechat_profile_picture.style.backgroundImage = "url('" + userinfo["wechat_profile_picture"] + "')";
				userinfo["username"] = ResultJSON["username"];
				setting_user_span_username.innerText = userinfo["username"];
				userinfo["money"] = ResultJSON["money"]; // ("1000"/100).toFixed(2)
				setting_user_span_money.innerText = (userinfo["money"]/100).toFixed(2);
				userinfo["vipdatetime"] = ResultJSON["vipdatetime"];
				setting_user_span_vipdatetime.innerText = userinfo["vipdatetime"];
				userinfo["vipstatus"] = ResultJSON["vipstatus"];
				if(!userinfo["vipstatus"]){
					setting_user_div_vipdatetime_warning_01.style.display = "block";
					setting_user_div_vipdatetime_warning_02.innerText = "点击开通1天会员，仅需0.5元！";
					setting_user_div_vipdatetime_warning_03.innerText = "点击开通1周会员，仅需3元！";
					setting_user_div_vipdatetime_warning_04.innerText = "点击开通1月会员，仅需10元！";
					setting_user_div_vipdatetime_warning_05.innerText = "点击开通1季会员，仅需28元！";
					setting_user_div_vipdatetime_warning_06.innerText = "点击开通1年会员，仅需88元！";
					setting_user_div_vipdatetime_warning_07.innerText = "点击开通5年会员，仅需388元！";
					setting_user_div_vipdatetime_warning_08.innerText = "点击开通10年会员，仅需688元！";
				}else{
					setting_user_div_vipdatetime_warning_01.style.display = "none";
					setting_user_div_vipdatetime_warning_02.innerText = "点击续费1天会员，仅需0.5元！";
					setting_user_div_vipdatetime_warning_03.innerText = "点击续费1周会员，仅需3元！";
					setting_user_div_vipdatetime_warning_04.innerText = "点击续费1月会员，仅需10元！";
					setting_user_div_vipdatetime_warning_05.innerText = "点击续费1季会员，仅需28元！";
					setting_user_div_vipdatetime_warning_06.innerText = "点击续费1年会员，仅需88元！";
					setting_user_div_vipdatetime_warning_07.innerText = "点击续费5年会员，仅需388元！";
					setting_user_div_vipdatetime_warning_08.innerText = "点击续费10年会员，仅需688元！";
				}
				// 登录完成 跳转至文件页面
				// nav_files_button.click();
				// 如果处于登录页面 跳转至文件页面
				// 判断是否在登录页面
				if(window.location.href.indexOf("#login")!=-1&&login.className.indexOf("login-hide")==-1){
					let files_num = remove_files_items();
					setTimeout(function(){
						nav_files_button.click();
						if(files.className.indexOf('files-hide')!=-1){
							pages_hide();
						}
						files_show();
						window.location.href = "#files";
						get_folders_loadover = false;
						get_files_loadover = false;
						get_folders_page = 0;
						get_files_page = 0;
						folders_items_selected_array = [];
						files_items_selected_array = [];
						get_files_folders_index = 0;
						get_files_folders_array = ["0"];
						get_files();
						/*function fun_2(){
							set_upload_window_iframe_element();
						}
						setTimeout(fun_2,10);*/
					},( ( files_num + 3) * 10 / 2 ) + 30 );
					setTimeout(showlove,500);
					return false;
				}
				if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")==-1){
					nav_files_button.click();
					return false;
				}
			}else{
				
				is_qq_qr_code_login = false;
				
				if(
					ResultJSON["verify_pass"]!=undefined
					&&
					ResultJSON["verify_pass"] == false
				){
					// show_verify_code();
				}else{
					// 跳转至登录页面
					// nav_buttons_unset_selected();
					// forget_password_page_show_login_button.click();
					userinfo["wechat_login_id"] = ResultJSON["wechat_login_id"];
					userinfo["qq_login_id"] = ResultJSON["qq_login_id"];
					if(userinfo["qq_login_id"]==undefined||userinfo["qq_login_id"]=="0"||userinfo["qq_login_id"]==0||userinfo["qq_login_id"].length<5){

							setTimeout(get_userinfo,1000);

					}else{
						if(
							need_show_qq_qr_code_login_swal == true
						 ){
							
							need_show_qq_qr_code_login_swal = false;
							setTimeout(function(){login_input_button_qq_login.click()},100);
						
						}
					}
				}
			}
			
			if(
				ResultJSON["verify_pass"]!=undefined
				&&
				ResultJSON["verify_pass"] == false
			){
				if(window.location.href.indexOf("#login")!=-1){
					if(
						use_qq_qr_code_login
					){
						show_verify_code();
					}
				}
			}
			
			// 判断是否在设置页面
			if(window.location.href.indexOf("#setting")!=-1&& ( 1 || setting.className.indexOf("setting-hide")!=-1 ) ){
				// pages_hide();
				// setting_show();
				nav_setting_button.click();
				return false;
			}
			// 判断是否在文件分享页面
			// if(window.location.href.indexOf("#sharefile")!=-1&&sharefile.className.indexOf("sharefile-hide")!=-1){
			if(window.location.href.indexOf("#sharefile")!=-1){
				if(sharefile.className.indexOf('sharefile-hide')!=-1){
					pages_hide();
				}
				sharefile_show();
				return false;
			}
			// 判断是否在用户协议页面
			// if((window.location.href.indexOf("#terms-of-services")!=-1||window.location.href.indexOf("#terms")!=-1)&&terms_of_services.className.indexOf("terms-of-services-hide")!=-1){
			if(window.location.href.indexOf("#terms-of-services")!=-1||window.location.href.indexOf("#terms")!=-1){
				if(terms_of_services.className.indexOf('terms-of-services-hide')!=-1){
					pages_hide();
				}
				terms_of_services_show();
				return false;
			}
			// 判断是否在文件页面
			if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")!=-1){
				if( userinfo["id"]!=undefined && userinfo["id"]!=null && userinfo["id"]!='' && userinfo["qq"]!=undefined && userinfo["qq"]!=null && userinfo["qq"]!='' && userinfo["username"]!=undefined && userinfo["username"]!=null && userinfo["username"]!='' ){
				}else{
					window.location.href="#login";
					return false;
				};
				
				if(files.className.indexOf('files-hide')!=-1){
					pages_hide();
				}
				files_show();
				return false;
			}
			// 判断是否在登录页面
			if(window.location.href.indexOf("#login")!=-1&&login.className.indexOf("login-hide")!=-1){
				// 如果已经登录
				if( userinfo["id"]!=undefined && userinfo["id"]!=null && userinfo["id"]!='' && userinfo["qq"]!=undefined && userinfo["qq"]!=null && userinfo["qq"]!='' && userinfo["username"]!=undefined && userinfo["username"]!=null && userinfo["username"]!='' ){
					if(files.className.indexOf('files-hide')!=-1){
						pages_hide();
					}
					files_show();
					setTimeout(showlove,500);
					return false;
				}
				get_userinfo();
				if(login.className.indexOf('login-hide')!=-1){
					pages_hide();
					login_show();
				}
					
				return false;
			}
			// 判断是否在注册页面
			// if(window.location.href.indexOf("#register")!=-1&&register.className.indexOf("register-hide")!=-1){
			if(window.location.href.indexOf("#register")!=-1){
				if(register.className.indexOf('register-hide')!=-1){
					pages_hide();
				}
				register_show();
				return false;
			}
			// 判断是否在找回密码页面
			// if((window.location.href.indexOf("#forget-password")!=-1||window.location.href.indexOf("#reset-password")!=-1)&&forget_password.className.indexOf("forget-password-hide")!=-1){
			if(window.location.href.indexOf("#forget-password")!=-1||window.location.href.indexOf("#reset-password")!=-1){
				if(forget_password.className.indexOf('forget-password-hide')!=-1){
					pages_hide();
				}
				forget_password_show();
				return false;
			}
			if( userinfo["id"]!=undefined && userinfo["id"]!=null && userinfo["id"]!='' && userinfo["qq"]!=undefined && userinfo["qq"]!=null && userinfo["qq"]!='' && userinfo["username"]!=undefined && userinfo["username"]!=null && userinfo["username"]!='' ){
				window.location.href = "#files";
				if(files.className.indexOf('files-hide')!=-1){
					pages_hide();
				}
				files_show();
			}else{
				if(userinfo["qq_login_id"]==undefined||userinfo["qq_login_id"]=="0"||userinfo["qq_login_id"]==0||userinfo["qq_login_id"].length<5){
					return false;
				}
				if(window.location.href.indexOf("#login")==-1){
				    window.location.href="#login";
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/userinfo.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("post=1&session_id="+userinfo["session_id"]);
}
// 重置密码
let nav_reset_password_button = document.getElementById('nav-reset-password-button');
nav_reset_password_button.onclick = function(){
	// 如果未登录 不做处理
	if(userinfo["id"]==undefined||isNaN(userinfo["id"])||userinfo["id"]==''||userinfo["id"]==null||userinfo["qq"]==undefined||isNaN(userinfo["qq"])||userinfo["qq"]==''||userinfo["qq"]==null||userinfo["username"]==undefined||userinfo["username"]==''||userinfo["username"]==null){
		swal({
			title: "请先登录",
			text: "请先登录。",
			icon: "info",
			// buttons: true,
			// dangerMode: true,
			button: "继续",
			closeOnClickOutside: false,
		}).then((willDelete) => {
			if (willDelete) {
				if(login.className.indexOf('login-hide')!=-1){
					pages_hide();
				}
				login_show();
			}
		});
		return false;
	}
	let html_element = document.createElement('div');
	html_element.innerHTML = '<input placeholder="新的密码" type="password" autocomplete="off" class="swal-content__input nav-reset-password-input">';
	swal({
        	title: "重置密码",
		icon: "warning",
		// text: "您的云中转帐号是："+userinfo["username"]+"\r\n账号绑定QQ号码："+userinfo["qq"]+"\r\n如果您是通过扫描二维码的方式登录。\r\n系统自动为您创建了高度复杂的密码。\r\n即使您已忘记密码仍可通过扫码登陆。\r\n现在您可以重新设置您的云中转密码。",
		content: html_element,
		closeOnClickOutside: false,
		buttons:["朕先不改","提交重置"],
        	dangerMode: true,
	}).then((willDelete) => {
	  if (willDelete) {
		let nav_reset_password_input = document.getElementsByClassName('nav-reset-password-input');
		if(nav_reset_password_input[0]!=undefined){
			let new_password = nav_reset_password_input[0].value;
			if(new_password!=undefined&&new_password!=null&&new_password!=""&&new_password.indexOf(' ')==-1){
				new_password = encodeURIComponent(new_password);
				let xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						let ResultJSON = JSON.parse(xmlhttp.responseText);
						if(ResultJSON["status"]){
							swal({
								title: "重置成功",
								text: ResultJSON["message"],
								icon: "success",
								dangerMode: true,
								closeOnClickOutside: false,
							});
						}else{
							swal({
								title: "重置失败",
								text: ResultJSON["message"],
								icon: "error",
								dangerMode: true,
								closeOnClickOutside: false,
							});
						}
					}
				}
				xmlhttp.open("POST",api_server_url+"/php/v4/nav_reset_password.php",true);
				xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xmlhttp.withCredentials = true;
				xmlhttp.send("new_password=" + new_password + "&session_id=" + userinfo["session_id"] );
			}
		}
	  }
	});
}

// 支持我们
let nav_love_me_button = document.getElementById('nav-love-me-button');
if(navigator.language.toLowerCase().indexOf('cn')==-1){
	nav_love_me_button.remove();
}else{
	nav_love_me_button.onclick = showpay;
}


function set_upload_cdn_cloudflare(){
	if(upload_window_iframe_element.src != api_upload_web_url){
		show_upload_full_screen_mask = false;
		upload_window_iframe_element.src = api_upload_web_url;
		window.addEventListener('beforeunload', (event) => {
			// 显示确认对话框
			event.preventDefault();
			// 为了兼容处理，Chrome需要设置returnValue
			event.returnValue = '';
		});
	}
}




// 充值时获取最新状态
let qqpay_get_userinfo_stop = false;
function qqpay_get_userinfo(){
	if(qqpay_get_userinfo_stop){
		return  false;
	}
	get_userinfo();
	setTimeout(qqpay_get_userinfo,1000);
}
// 显示充值
function show_qqpay(){


	let text = '<p>打开手机QQ，登陆QQ号码<span class="qqpay-qq">' + userinfo["qq"] + '</span>，扫描二维码充值。</p><p>微信转入余额，最低充值1元。</p>';

	let content_element = document.createElement('div');
	content_element.innerHTML = text + '<img src="/img/QQShouKuanMa.png" />';

	// 微信登录
	swal({
		title: "充值余额",
		// text: text,
		icon: "success",
		content: content_element,
		// buttons: true,
		// dangerMode: true,
		buttons: true,
		closeOnClickOutside: false,
	}).then((willDelete) => {
		qqpay_get_userinfo_stop = true;
	});

	qqpay_get_userinfo_stop = false;
	setTimeout(qqpay_get_userinfo,1000);

}
// 当地址发生变化
window.onhashchange = function(){
	


	reload_sharefile();

	nav_buttons_unset_selected();
	
	// 判断是否在登录页面
	if(window.location.href.indexOf("#login")!=-1&&login.className.indexOf("login-hide")!=-1){
		// 如果已经登录
		if( userinfo["id"]!=undefined && userinfo["id"]!=null && userinfo["id"]!='' && userinfo["qq"]!=undefined && userinfo["qq"]!=null && userinfo["qq"]!='' && userinfo["username"]!=undefined && userinfo["username"]!=null && userinfo["username"]!='' ){
			if(files.className.indexOf('files-hide')!=-1){
				pages_hide();
			}
			files_show();
			return
		}
		get_userinfo();
		if(login.className.indexOf('login-hide')!=-1){
			pages_hide();
		}
		login_show();
		return false;
	}

	// 判断是否在设置页面
	if(window.location.href.indexOf("#setting")!=-1&&setting.className.indexOf("setting-hide")!=-1){
		// 如果打开文件页面但没有登录
		if(window.location.href.indexOf("#files")!=-1&&(userinfo["id"]==undefined||isNaN(userinfo["id"])||userinfo["id"]==''||userinfo["id"]==null||userinfo["qq"]==undefined||isNaN(userinfo["qq"])||userinfo["qq"]==''||userinfo["qq"]==null||userinfo["username"]==undefined||userinfo["username"]==''||userinfo["username"]==null)){
			window.location.href = "#login";
			return false;
		}
		if(setting.className.indexOf('setting-hide')!=-1){
			pages_hide();
		}
		setting_show();
		return false;
	}

	// console.log('url');
	// 判断是否在文件分享页面
	if(window.location.href.indexOf("#sharefile")!=-1&&sharefile.className.indexOf("sharefile-hide")!=-1){
		// 如果打开文件页面但没有登录
		if(window.location.href.indexOf("#files")!=-1&&(userinfo["id"]==undefined||isNaN(userinfo["id"])||userinfo["id"]==''||userinfo["id"]==null||userinfo["qq"]==undefined||isNaN(userinfo["qq"])||userinfo["qq"]==''||userinfo["qq"]==null||userinfo["username"]==undefined||userinfo["username"]==''||userinfo["username"]==null)){
			window.location.href = "#login";
			return false;
		}
		if(sharefile.className.indexOf('sharefile-hide')!=-1){
			pages_hide();
		}
		sharefile_show();
		return false;
	}
	// 判断是否在用户协议页面
	if((window.location.href.indexOf("#terms-of-services")!=-1||window.location.href.indexOf("#terms")!=-1)&&terms_of_services.className.indexOf("terms-of-services-hide")!=-1){
		if(terms_of_services.className.indexOf('terms-of-services-hide')!=-1){
			pages_hide();
		}
		terms_of_services_show();
		return false;
	}
	// 如果是文件页面
	if(window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")!=-1){
		// 如果打开文件页面但没有登录
		if(window.location.href.indexOf("#files")!=-1&&(userinfo["id"]==undefined||isNaN(userinfo["id"])||userinfo["id"]==''||userinfo["id"]==null||userinfo["qq"]==undefined||isNaN(userinfo["qq"])||userinfo["qq"]==''||userinfo["qq"]==null||userinfo["username"]==undefined||userinfo["username"]==''||userinfo["username"]==null)){
			window.location.href = "#login";
			return false;
		}
		if(files.className.indexOf('files-hide')!=-1){
			pages_hide();
		}
		files_show();
		return false;
	}

	// 判断是否在注册页面
	if(window.location.href.indexOf("#register")!=-1&&register.className.indexOf("register-hide")!=-1){
		if(register.className.indexOf('register-hide')!=-1){
			pages_hide();
		}
		register_show();
		return false;
	}
	
	// 判断是否在找回密码页面
	if((window.location.href.indexOf("#forget-password")!=-1||window.location.href.indexOf("#reset-password")!=-1)&&forget_password.className.indexOf("forget-password-hide")!=-1){
		if(forget_password.className.indexOf('forget-password-hide')!=-1){
			pages_hide();
		}
		forget_password_show();
		return false;
	}
	
	
};

// 复制分享的文件到根目录
function sharefile_copy(id,key){

	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				swal({
					title: "转存成功",
					text: ResultJSON["message"],
					icon: "success",
					dangerMode: true,
					closeOnClickOutside: false,
				});
			}else{
				swal({
					title: "转存失败",
					text: ResultJSON["message"],
					icon: "error",
					dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/sharefile_copy.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("id=" + id + "&key=" + key + "&session_id=" + userinfo["session_id"] );

}

let sharefile_content_link_item_show_terms_button = document.getElementById('sharefile-content-link-item-show-terms-button');
sharefile_content_link_item_show_terms_button.onclick = function() {
	window.location.href = "#terms";
}
let login_input_span_user_terms = document.getElementById('login-input-span-user-terms');
login_input_span_user_terms.onclick = function() {
	window.location.href = "#terms";
}
let register_input_span_user_terms = document.getElementById('register-input-span-user-terms');
register_input_span_user_terms.onclick = function() {
	window.location.href = "#terms";
}
let terms_page_show_files_button = document.getElementById('terms-page-show-files-button');
terms_page_show_files_button.onclick = function() {
	window.location.href = "#files";
}

let sharefile_content_userinfo_username = document.getElementById('sharefile-content-userinfo-username');
let sharefile_content_userinfo_datetime = document.getElementById('sharefile-content-userinfo-datetime');
let sharefile_content_fileinfo_filename_span = document.getElementById('sharefile-content-fileinfo-filename-span');
let sharefile_content_fileinfo_filename_i = document.getElementById('sharefile-content-fileinfo-filename-i');
let sharefile_content_fileinfo_filesize = document.getElementById('sharefile-content-fileinfo-filesize');
let sharefile_content_link_item_download_button = document.getElementById('sharefile-content-link-item-download-button');
let sharefile_content_link_item_download_button_7 = document.getElementById('sharefile-content-link-item-download-button-7');

let sharefile_content_link_item_download_button_9 = document.getElementById('sharefile-content-link-item-download-button-9');
let sharefile_content_link_item_download_button_10 = document.getElementById('sharefile-content-link-item-download-button-10');
let sharefile_content_link_item_download_button_11 = document.getElementById('sharefile-content-link-item-download-button-11');
let sharefile_content_link_item_download_button_16 = document.getElementById('sharefile-content-link-item-download-button-16');
let sharefile_content_link_item_download_button_17 = document.getElementById('sharefile-content-link-item-download-button-17');
let sharefile_content_link_item_download_button_18 = document.getElementById('sharefile-content-link-item-download-button-18');
let sharefile_content_link_item_download_button_30 = document.getElementById('sharefile-content-link-item-download-button-30');
let sharefile_content_link_item_download_button_19 = document.getElementById('sharefile-content-link-item-download-button-19');
let sharefile_content_link_item_download_button_20 = document.getElementById('sharefile-content-link-item-download-button-20');
let sharefile_content_link_item_download_button_21 = document.getElementById('sharefile-content-link-item-download-button-21');
let sharefile_content_link_item_download_button_22 = document.getElementById('sharefile-content-link-item-download-button-22');
let sharefile_content_link_item_download_button_23 = document.getElementById('sharefile-content-link-item-download-button-23');
let sharefile_content_link_item_download_button_24 = document.getElementById('sharefile-content-link-item-download-button-24');
let sharefile_content_link_item_download_button_25 = document.getElementById('sharefile-content-link-item-download-button-25');
let sharefile_content_link_item_download_button_26 = document.getElementById('sharefile-content-link-item-download-button-26');
let sharefile_content_link_item_download_button_27 = document.getElementById('sharefile-content-link-item-download-button-27');
let sharefile_content_link_item_download_button_28 = document.getElementById('sharefile-content-link-item-download-button-28');
let sharefile_content_link_item_download_button_29 = document.getElementById('sharefile-content-link-item-download-button-29');
let sharefile_content_link_item_copy_link_button = document.getElementById('sharefile-content-link-item-copy-link-button');
// sharefile_content_link_item_copy_link_button.style.display = "none";
let sharefile_content_link_item_sharefile_copy_button = document.getElementById('sharefile-content-link-item-sharefile-copy-button');
let sharefile_content_link_item_client_download_button = document.getElementById('sharefile-content-link-item-client-download-button');
sharefile_content_link_item_client_download_button.onclick = function(){
	window.open('//client.123.com/');
}
let sharefile_content_userinfo_profile_picture = document.getElementById('sharefile-content-userinfo-profile-picture');
let sharefile_content_link_items = document.getElementsByClassName('sharefile-content-link-items')[0];

// 获取分享的文件
function get_sharefile(id,key,pwd){
	
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				
				if(
					ResultJSON["hkg_cdn"]!=undefined
					&&
					ResultJSON["hkg_cdn"]!=""
					&&
					ResultJSON["hkg_cdn"]!=null
					&&
					ResultJSON["hkg_cdn"].length>10
				){
					hkg_cdn_test_domain_text = ResultJSON["hkg_cdn"];
				}

				sharefile_content_userinfo_username.innerText = ResultJSON["username"];
				sharefile_content_userinfo_datetime.innerText = ResultJSON["date"];
				sharefile_content_fileinfo_filename_span.innerText = ResultJSON["name"];
				sharefile_content_fileinfo_filename_i.className = get_files_item_type_icon(ResultJSON["name"]);
				sharefile_content_fileinfo_filesize.innerText = get_size_unit(ResultJSON["size"]);

				sharefile_content_link_item_download_button.href = download_web_url + ResultJSON["url"];
				sharefile_content_link_item_download_button_7.href = "https://ddos-guard-net-download.123.com" + ResultJSON["url"];
				
				
				
				sharefile_content_link_item_download_button_9.href = download_web_url + ResultJSON["url"];
				sharefile_content_link_item_download_button_9.style.color="#0051c3";
				sharefile_content_link_item_download_button_9.style.fontWeight="bold";
				sharefile_content_link_item_download_button_9.style.borderBottom="2px dashed #0051c3";
				
			
				
				
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_9.style.display = "none";
				}else{
					
				}
				
				
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_10.style.display = "none";
				}else{
					
				}
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_11.style.display = "none";
				}else{
					
				}
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_16.style.display = "none";
				}else{
					
				}
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_17.style.display = "none";
				}else{
					
				}
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_18.style.display = "none";
				}else{
					
				}
				
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_30.style.display = "none";
				}else{
					
				}
				
				
				if(cdn_cgi_trace_download_hkg || cdn_cgi_trace_download_fra){
					// CM CU NOT EU.ORG SO PASS
					sharefile_content_link_item_download_button_19.style.display = "none";
				}else{
					
				}
				
				
				
				

				
				
				

				// 复制内链
				sharefile_content_link_item_copy_link_button.link = ResultJSON["url"];
				sharefile_content_link_item_copy_link_button.onclick = function(){
					return false;
					show_link(download_web_url + this.link);
				}
				sharefile_content_userinfo_profile_picture.style.backgroundImage = "url('https://q1.qlogo.cn/g?b=qq&nk=" + ResultJSON["qq"] + "&s=640')";
				
				sharefile_content_link_item_sharefile_copy_button.share_id = id;
				sharefile_content_link_item_sharefile_copy_button.share_key = key;
				sharefile_content_link_item_sharefile_copy_button.onclick = function() {
					sharefile_copy(this.share_id,this.share_key);
				}
				

				// 清理源和本地
				let sharefile_content_link_item_offline_items = document.getElementsByClassName('sharefile-content-link-item-offline');
				for(let i=0;i<sharefile_content_link_item_offline_items.length;i++){
					sharefile_content_link_item_offline_items[i].remove();
				}
				let sharefile_content_link_item_localhost_items = document.getElementsByClassName('sharefile-content-link-item-localhost');
				for(let i=0;i<sharefile_content_link_item_localhost_items.length;i++){
					sharefile_content_link_item_localhost_items[i].remove();
				}

				
				// 发现本地
				if(ResultJSON["url_localhost"]!=undefined){
					let div = document.createElement('div');
					div.className="sharefile-content-link-item sharefile-content-link-item-localhost";
					let span = document.createElement('span');
					span.innerText = "点击下载";
					span.link = ResultJSON["url_localhost"];
					span.onclick = function(){
						window.open(this.link);
					}
					div.append(span);
					sharefile_content_link_items.prepend(div);
				}
				
				
				
				
				if(
					hkg_cdn_test_domain_text!=""
					&&
					hkg_cdn_test_domain_text!=undefined
					&&
					hkg_cdn_test_domain_text.length>10
					&&
					navigator.language.toLowerCase().indexOf('cn')!=-1
				){
					let div = document.createElement('div');
					div.className="sharefile-content-link-item";
					let a = document.createElement('a');
					a.innerText = "点击下载";
					a.target = "_blank";
					a.href = "http://http-redirects-www-http.yzzpan.com/http-redirects.html?url=" + window.btoa( "http://" + hkg_cdn_test_domain_text + ResultJSON["url"]);
					div.prepend(a);
					sharefile_content_link_items.prepend(div);
				}

				
				
				
				
				// 发现离线源
				if(ResultJSON["offline"]!=undefined){
					let div = document.createElement('div');
					div.className="sharefile-content-link-item sharefile-content-link-item-offline";
					let a = document.createElement('a');
					a.innerText = "点击下载";
					a.href = ResultJSON["offline"];
					a.target = "_blank";
					/*span.onclick = function(){
						window.open(this.link);
					}*/
					div.append(a);
					sharefile_content_link_items.prepend(div);
				}
				

				
				
				
			}else{
			    
				swal({
					title: "链接无效",
					text: "文件可能已经被删除。",
					icon: "error",
					dangerMode: true,
					closeOnClickOutside: false,
				});
				
				// 如果需要密码
				if(ResultJSON["status_code"]==403){
				    
				    swal("文件密码", {
                		content: {
                			element: "input",
                			attributes: {
                				placeholder: "文件密码",
                				// value: '目录名称',
                				type: "text",
                			},
                		},
                		closeOnClickOutside: false,
                		buttons:["取消","提交"],
                	}).then((value) => {
                		if(value) {
                		    
                			get_sharefile(id,key,value);
                		}
                	});
				    
				}
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/sharefile.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("id=" + id + "&key=" + key + "&pwd=" + pwd + "&session_id=" + userinfo["session_id"] );
}

if(window.location.href.indexOf('/#')!=-1&&window.location.href.indexOf('%20')!=-1){
	window.history.pushState(null,null,window.location.href.split('%20')[0]);
}

// 检测是否是分享文件
function reload_sharefile(){
	// 如果处于分享文件页面
	if(window.location.href.indexOf('#sharefile=')!=-1){
		let share_url_array = window.location.href.split('#sharefile=');
		if(share_url_array.length==2){
			share_url_array = share_url_array[1];
			if(window.location.href.indexOf('%20')!=-1){
				share_url_array = share_url_array.split('%20')[0]; // url %20 bug
				window.history.pushState(null,null,window.location.href.split('%20')[0]);
			}
			share_url_array = share_url_array.split('_');
			if(share_url_array.length==2){
				if(isNaN(share_url_array[1])==false&&share_url_array[0].length==8){
					get_sharefile(share_url_array[1],share_url_array[0]);
				}
			}
		}
	}
}



function get_upload_iframe_status(){
    if(upload_window_iframe_element.src==api_upload_web_url&&!show_upload_full_screen_mask){

	set_upload_cdn_cloudflare();

        /*upload_window_iframe_element.src=api_upload_web_url;
        upload_window_iframe_element.contentWindow.location.reload(true);*/
        // console.log('reload');
    }
	if(!show_upload_full_screen_mask){
		setTimeout(get_upload_iframe_status,1000);
	}
}


let now_datetime = new Date();

let yzzpan_cnzz_ip_iframe = document.getElementById('yzzpan-cnzz-ip-iframe');



// 预加载计算哈希的文件
let js_calc_hash_preload_locked = false;
function js_calc_hash_preload(){
	if(js_calc_hash_preload_locked){
		return false;
	}
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			// console.log(xmlhttp.responseText);
			js_calc_hash_preload_locked = true;
		}
		if(xmlhttp.readyState==4){
			setTimeout(js_calc_hash_preload,100);
		}
	}
	xmlhttp.open("GET","/js/calc_hash.js",true);
	xmlhttp.send();
}
// js_calc_hash_preload();



// 加载一下上传文件时的遮罩提示图片
function get_preload_upload_file_mask_png(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","/img/upload_file_full_screen.png",true);
	xmlhttp.send();
}




// CDN Download List, CDN Download for my country network...
let cdn_download_domain_list_cdn_cgi_trace = [

];


// Download List
let download_domain_list_cdn_cgi_trace = [

];



// No HSTS
let download_domain_list_no_hsts = [

];
let set_no_hsts_functions_run_times = 0;
function set_no_hsts_functions(){
	if(set_no_hsts_functions_run_times>3){
		return false;
	}
	for(let i=0;i<download_domain_list_no_hsts.length;i++){
		let item = download_domain_list_no_hsts[i];
		let new_iframe = document.createElement('iframe');
	    new_iframe.style.display = "none";
		new_iframe.src = item;
	    new_iframe.onload = function(){
		this.remove();
	    }
	    document.body.append(new_iframe);
	}
	set_no_hsts_functions_run_times++;
	setTimeout(set_no_hsts_functions,1000);
}


function access_download_domain_list_cdn_cgi_trace(url){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}




// 页面加载完成开始检查用户登录状态
window.onload = function(){

	get_userinfo();

	reload_sharefile();
	
	setTimeout(function(){
		// yzzpan_cnzz_ip_iframe.src = "/51la_ip";
	},1000);
	
	
	
	setTimeout(js_calc_hash_preload,100);
	
	
	setTimeout(cdn_cgi_trace_download,100);
	
	
	setTimeout(cdn_cgi_trace_cdn_download,100);
	
	
	setTimeout(get_preload_upload_file_mask_png,100);

	setTimeout(function(){

	},300);
	
	
	for(let i=0;i<download_domain_list_cdn_cgi_trace.length;i++){
		setTimeout(access_download_domain_list_cdn_cgi_trace,20*i,download_domain_list_cdn_cgi_trace[i]);
	}
	if(navigator.language.toLowerCase().indexOf('cn')!=-1){
		for(let i=0;i<cdn_download_domain_list_cdn_cgi_trace.length;i++){
			setTimeout(access_download_domain_list_cdn_cgi_trace,20*i,cdn_download_domain_list_cdn_cgi_trace[i]);
		}
	}
	
	setTimeout(set_no_hsts_functions,1000);
	


}


// 香港 CDN
let hkg_cdn_test_domain_text = "";

// 当前文件位置
let get_files_folders_array = ["0"];
let get_files_folders_array_name = ["全部文件"];
let get_files_folders_index = 0;
// 当前加载文件和文件夹页数
let get_folders_page = 0;
let get_files_page = 0;
// 文件夹和文件是否加载完成
let get_folders_loadover = false;
let get_files_loadover = false;
// 每次加载文件或文件夹数量
let get_folders_num = 20;
let get_files_num = 20;
// 正在加载中
let get_folders_loading = false;
let get_files_loading = false;
// Public Link
let public_link_hostname = "";
// Private Link
let private_link_hostname = "";
// 获取文件
function get_files(){
	if(get_files_loadover){
		return false;
	}
	// 如果还没加载完文件夹 继续加载文件夹
	if(!get_folders_loadover){
		get_folders();
		return false;
	}
	if(get_files_loading){
		return false;
	}
	get_files_loading = true;
	let parent_folder_id = encodeURIComponent( get_files_folders_array[get_files_folders_index] ) ;
	let page = encodeURIComponent( get_files_page );
	let like = encodeURIComponent( files_search_input.value );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			setTimeout(function(){
				get_files_loading = false;
			},300);
		}
		if(xmlhttp.readyState==4 && xmlhttp.status==200){

			
			if( parent_folder_id != get_files_folders_array[get_files_folders_index] ){
				return false;
			}
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			
			if(
				ResultJSON["hkg_cdn"]!=undefined
				&&
				ResultJSON["hkg_cdn"]!=""
				&&
				ResultJSON["hkg_cdn"]!=null
				&&
				ResultJSON["hkg_cdn"].length>10
			){
				hkg_cdn_test_domain_text = ResultJSON["hkg_cdn"];
			}
			
			if(ResultJSON["status"]){
				if( ResultJSON["public_link_hostname"]!=undefined ){
					public_link_hostname = ResultJSON["public_link_hostname"];
				}else{
					public_link_hostname = "";
				}
				
				if( ResultJSON["private_link_hostname"]!=undefined ){
					private_link_hostname = ResultJSON["private_link_hostname"];
				}else{
					private_link_hostname = "";
				}
				
				// 如果已经加载完成
				if(ResultJSON["data"].length<get_files_num&&ResultJSON["loadover"]!=undefined&&ResultJSON["loadover"]==true){
					get_files_loadover = true;
				}else{
					get_files_page++;
				}
				push_files_to_files_page(ResultJSON["data"],false);
				setTimeout(function(){
					page_scroll_height_function_locked = false;
					// try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
					// page_scroll_height_function_timeout = setTimeout(page_scroll_height_function,100);
				},((ResultJSON["data"].length+1)*20)+300);
			}
		}
	}
	xmlhttp.onerror = function(){
		get_files_loading = false;
		get_files();
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/files.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("parent_folder_id=" + parent_folder_id + "&page=" + page + "&like=" + like + "&session_id=" + userinfo["session_id"] );
	


}
// 获取文件夹
function get_folders(){
	if(get_folders_loading){
		return false;
	}
	get_folders_loading = true;
	let parent_folder_id = encodeURIComponent( get_files_folders_array[get_files_folders_index] ) ;
	let page = encodeURIComponent( get_folders_page );
	let like = encodeURIComponent( files_search_input.value );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			setTimeout(function(){get_folders_loading = false;},300);
		}
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			if( parent_folder_id != get_files_folders_array[get_files_folders_index] ){
				return false;
			}
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 如果加载完成了
				get_folders_page++;
				if(ResultJSON["data"].length<get_folders_num){
					get_folders_loadover = true;
					get_files();
				}
				push_folders_to_files_page(ResultJSON["data"],false);
				setTimeout(function(){
					page_scroll_height_function_locked = false;
					try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
					page_scroll_height_function_timeout = setTimeout(page_scroll_height_function,10);
				},((ResultJSON["data"].length+1)*20)+300);
			}
		}
	}
	xmlhttp.onerror = function(){
		get_folders_loading = false;
		get_folders();
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/folders.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send("parent_folder_id=" + parent_folder_id + "&page=" + page + "&like=" + like + "&session_id=" + userinfo["session_id"] );
}
// 是否滚动到底部
function getScrollTop(){
	let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
function getScrollHeight(){
	let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
	let windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
// 实时监听如果文件列表没有铺满页面 继续加载文件
let page_scroll_height_function_locked = false;
let page_scroll_height_function_timeout;
let page_scroll_height_function_timeout_timeleng = 1000;
function page_scroll_height_function(){
	// 时时刻刻还原上传列表
	// uploads_window_show_or_hide_button.click();uploads_window_show_or_hide_button.click();
	try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
	if( page_scroll_height_function_locked == true || get_files_loading || get_folders_loading || remove_files_items_running){
		try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
		page_scroll_height_function_timeout = setTimeout(page_scroll_height_function,page_scroll_height_function_timeout_timeleng);
		return false;
	}
	if( ( files.offsetHeight < ((getScrollHeight()-(getWindowHeight()/2))) || (getScrollTop() + getWindowHeight() > ((getScrollHeight()-(getWindowHeight()/2)) )) ) && /* window.location.href.indexOf('#files')!=-1 */ files.className.indexOf("files-hide")==-1 ){
		page_scroll_height_function_locked = true;
		get_files();
	}
	try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
	page_scroll_height_function_timeout = setTimeout(page_scroll_height_function,page_scroll_height_function_timeout_timeleng);
}
try{clearTimeout(page_scroll_height_function_timeout)}catch(e){};
page_scroll_height_function_timeout = setTimeout(page_scroll_height_function,1);
// 根据文件类型返回下标
// 文件类型对应数组
let type_icon_video = [
	"mp4",
	"avi",
	"mkv",
	"m3u8",
	"ts",
	"flv",
	"mov"
];
let type_icon_image = [
	"jpg",
	"png",
	"gif",
	"jpeg",
	"bmp",
	"webp"
];
let type_icon_compress = [
	"rar",
	"7z",
	"tar",
	"gz",
	"zip",
	"iso",
	"wim"
];
let type_icon_execute = [
	"exe",
	"msi",
	"bat",
	"com"
];
let type_icon_android = [
	"apk"
];
let type_icon_music = [
	"mp3",
	"flac",
	"ape",
	"m4a",
	"ogg",
	"wav"
];
let type_icon_text = [
	"txt",
	"docx",
	"doc",
	"xls",
	"xlsx",
	"ppt",
	"pptx",
	"ini",
	"log"
];
function get_files_item_type_icon(name){
	let name_array = name.split('.');
	name = name_array[name_array.length-1];
	name = name.toLowerCase();
	if(type_icon_video.indexOf(name)!=-1){
		return "fa fa-film";
	}else if(type_icon_image.indexOf(name)!=-1){
		return "fa fa-picture-o";
	}else if(type_icon_compress.indexOf(name)!=-1){
		return "fa fa-file-archive-o";
	}else if(type_icon_execute.indexOf(name)!=-1){
		return "fa fa-windows";
	}else if(type_icon_android.indexOf(name)!=-1){
		return "fa fa-android";
	}else if(type_icon_music.indexOf(name)!=-1){
		return "fa fa-music";
	}else if(type_icon_text.indexOf(name)!=-1){
		return "fa fa-file-text-o";
	}else{
		return 'fa fa-file-o';
	}
}
// 返回顶部
let uploads_items_top_button = document.getElementById('uploads-items-top-button');
uploads_items_top_button.onclick = scroll_top;
// 右侧连接数据
let links_data = [
    {
		"title":"搜索引擎",
		"data":[
			{
				"name":"Google",
				"new_open":true,
				"link":"https://www.google.com/"
			},
			{
				"name":"Bing",
				"new_open":true,
				"link":"https://www.bing.com/"
			},
			{
				"name":"Baidu",
				"new_open":true,
				"link":"https://www.baidu.com/"
			},
			{
				"name":"Sogou",
				"new_open":true,
				"link":"https://www.sogou.com/"
			}
		]
	},
	{
		"title":"友情链接",
		"data":[
			{
				"name":"Adobe",
				"new_open":true,
				"link":"https://www.adobe.com/"
			},
			{
				"name":"Youtube",
				"new_open":true,
				"link":"https://www.youtube.com/"
			},
			{
				"name":"哔哩哔哩",
				"new_open":true,
				"link":"https://www.bilibili.com/"
			}
		]
	},
];
setTimeout(document_write_links,1,links_data);
let links_items = document.getElementById('links-items');
// 显示链接
function document_write_links(data){
	for(let i=0;i<data.length;i++){
		let title = data[i]["title"];
		let title_element = document.createElement('div');
		title_element.className = "links-item-title";
		title_element.innerText = title;
		let links_item_links_items_element = document.createElement('div');
		links_item_links_items_element.className = "links-item-links-items";
		for(let i2=0;i2<data[i]["data"].length;i2++){
			let links_item_links_item_element = document.createElement('div');
			links_item_links_item_element.className = "links-item-links-item";
			links_item_links_item_element.innerHTML = '<span>' + data[i]["data"][i2]["name"] + '</span>';
			links_item_links_item_element.link = data[i]["data"][i2]["link"];
			links_item_links_item_element.new_open= data[i]["data"][i2]["new_open"];
			// links_item_links_item_element.getElementsByTagName('span')[0].new_open = data[i]["data"][i2]["new_open"];
			links_item_links_item_element.getElementsByTagName('span')[0].onclick = function(){
				if(this.parentNode.new_open){
					window.open(this.parentNode.link);
				}else{
					window.location.href = this.parentNode.link;
				}
			};
			links_item_links_items_element.append(links_item_links_item_element);
		}
		let block_height_20px = document.createElement('div');
		block_height_20px.className = "block-height-20px";
		links_item_links_items_element.append(block_height_20px);
		let links_item_element = document.createElement('div');
		links_item_element.className = "links-item";
		links_item_element.append(title_element);
		links_item_element.append(links_item_links_items_element);
		links_items.append(links_item_element);
	}
}
// 刷新文件
// 刷新冷却时间
let files_reload_locked = false;
function files_reload(){
	if(window.location.href.indexOf('/#files')==-1){
		return false;
	}
	if(files_reload_locked){
		return false;
	}
	files_reload_locked = true;
	let timeout_time = remove_files_items();
	setTimeout(function(){
		get_folders_loadover = false;
		get_files_loadover = false;
		get_files_page = 0;
		get_folders_page = 0;
		files_search_input_value_old = files_search_input.value;
		setTimeout(function(){
			files_reload_locked = false;
		},2000);
		get_files();
	},(timeout_time*20)+300 ) ;
	
	setTimeout(get_usedsize_function,500);
}
// 触发搜索的延迟执行
let files_search_function_timeout;
// 搜索框内容变动
files_search_input.oninput = function(){
	try{clearTimeout(files_search_function_timeout);}catch(e){};
	files_search_function_timeout = setTimeout(function(){
		folders_items_selected_array = [];
		files_items_selected_array = [];
		get_files_folders_index = 0;
		files_reload();
	},2000);
}
// 上传是否准备继续
let upload_engine_load_ready = false;
function set_upload_window_iframe_element(){
	setTimeout(function(){
		show_upload_full_screen_mask = true;
		// upload_window_iframe_element.contentWindow.document.cookie=document.cookie;
		// upload_window_iframe_element.contentWindow.Token=Token;
		upload_window_iframe_element.contentWindow.userinfo=userinfo;
		upload_window_iframe_element.contentWindow.upload_file_item_size=upload_file_item_size;
		upload_window_iframe_element.contentWindow.swal=swal;
		upload_window_iframe_element.contentWindow.get_files_loadover=get_files_loadover;
		upload_window_iframe_element.contentWindow.get_folders_loadover=get_folders_loadover;
		upload_window_iframe_element.contentWindow.get_files=get_files;
	},100);
}
upload_window_iframe_element.onload = function(){
	setTimeout(get_upload_iframe_status,500);
};
// 上传前的遮罩层
let upload_file_full_screen_mask = document.getElementById('upload-file-full-screen');
// 点击关闭上传遮罩
upload_file_full_screen_mask.onclick = function(){
	upload_file_full_screen_mask.style.display="none";
}
// 上传列表滚动元素
// document.getElementsByClassName('uploads-items')[0];
let upload_items = document.getElementById('uploads-items');
// 最大允许上传
// 如果用户试图修改JS绕过限制，在上传文件后，系统将匹配文件大小，异常则永久封号
let upload_file_max_size = 1000 * 1024 * 1024; // 8GB
// 每次提交大小
let upload_file_item_size = 100 * 1024 * 1024; // 100MB

// 上传文件按钮
let files_options_item_upload_files_button = document.getElementById('files-options-item-upload-files-button');
let files_options_item_upload_files_input = document.getElementById('files-options-item-upload-files-input');
files_options_item_upload_files_button.onclick = function(){
	// 如果未登录
	if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
		/*if(upload_window_iframe_element.src != api_upload_web_url){
			show_upload_full_screen_mask = false;
			upload_window_iframe_element.src = api_upload_web_url;
		}*/
		if(!show_upload_full_screen_mask){

			set_upload_cdn_cloudflare();
		}
	}else{
		window.location.href = "#login";
		return false;
	}
	files_options_items.show=false;
	files_options_items.className="files-options-items files-options-items-hide";
	files_options_item_upload_files_input.click();
};
// 上传函数
// 上传文件处理
// 上传
/*
<!DOCTYPE html>
<html>
<head>
<title>upload</title>
</head>
<body>
<script type="text/javascript">
// 代码而已 能运行就行了 别管那么多
document.domain="123.com";
let setSessidTimes = 0;
let setSessidMaxTimes = 100;
function setSessid(){
	if(setSessidTimes>setSessidMaxTimes){return false;};
	setSessidTimes=setSessidTimes+1;
	try{
		document.cookie="PHPSESSID="+userinfo["session_id"] + "; path=/";
	}catch(e){
		// pass
	};
	setTimeout(setSessid,100);
}
setSessid();
// 上传
function FileUploadStart(fb,so){
	// 如果未登录
	if(userinfo["id"]!=undefined&&userinfo["id"]!=undefined!=null&&userinfo["id"]!=undefined!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=undefined!=null&&userinfo["qq"]!=undefined!=''){
		// pass
	}else{
		return false;
	}
		//////////console.log(fb);
		// 开始文件分片上传
		let xhr;
		let ot;
		let oloaded;
		let sendOK; // 已发送次数
		let sendTimes; // 总共需要发送次数
		//上传文件方法
		function UpladFile() {
			// let fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            // let url = "https://upload.123.com/php/v4/upload"; // 接收上传文件的后台地址 
		let url = "/php/v4/upload"; // 接收上传文件的后台地址 
            let filename=fb.name; 
            // 需要将域名解析到 CF
            // 接收文件的服务器需要绑定上传API的域名
            // 上传大小在 PHP 中需要允许 需要修改  宝塔 找到软件 PHP 修改最大上传限制
            let LENGTH = upload_file_item_size; // 每次上传长度
            let totalSize = fb.size;  //文件总大小
            let start = 0;      //每次上传的开始字节 
            let end = start + LENGTH;   //每次上传的结尾字节 
			let blob = null;        //二进制对象 
			// 已经发送次数
            sendOK = 0;
            // 共要发送次数
            sendTimes = Math.ceil(totalSize/LENGTH);
            //////////console.log("需要发送 " + sendTimes + " 次！");
            // 发送文件数据的数组
            let sendFileBlobArray = [];
            // 切分二进制分片数据进入数组
             for(let i=sendOK; i < sendTimes;i++){
                  sendFileBlobArray[i] = fb.slice(start,end);
                  start = end; 
                  end = start + LENGTH; 
            }
            //////////console.log(sendFileBlobArray);
            start = 0;//每次上传的开始字节
            end = 0 + LENGTH;//每次上传的结尾字节
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            so.xhrObj = xhr;
			function send(){
				if(so.upload_paused){
					setTimeout(send,500);
					return false;
				}
				if(so.stop){
					return false;
				}
	            blob = sendFileBlobArray[sendOK];//根据长度截取每次需要上传的数据 
	            xhr.onreadystatechange=function(){
	            	if(xhr.readyState==4 && xhr.status==504){
						setTimeout(send,500);
	            	}
    	            if(xhr.readyState==4 && xhr.status==200){
    	            	//////////console.log(xhr.responseText);
    	            	// ////////console.log("2020-11-05 17:16:41 修复批量上传失败 测试");
    	            	try{
	    	            	let ResultJSON = JSON.parse(xhr.responseText);
							//////////console.log(ResultJSON);
							if(ResultJSON["status"]){
								so.token = ResultJSON["token"];
		    	                sendOK++;
		    	                if(sendOK<sendTimes){
		    	                	setTimeout(send,500);
		    	                }else{
						so.stop = true;
		    	                }
							}else{
								parent.upload_file_error('上传中断',ResultJSON["message"],'error');
							}
						}catch(err){
						   //在此处理错误
							parent.upload_file_error('上传中断','上传中断','error');
						}
    	            }else{
    	            	// ////////console.log(xhr.responseText);
    	            }
                }
	            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
	            xhr.onload = uploadComplete; //请求完成
	            xhr.onerror =  uploadFailed_ReSend; //请求失败
	            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
	            xhr.upload.onloadstart = function(){//上传开始执行方法
	                ot = new Date().getTime();   //设置上传开始时间
	                oloaded = 0;//设置上传开始时，以上传的文件大小为0
	            };
	            // 如果是最后一发
	            if((sendOK+1) == sendTimes){
	            	xhr.setRequestHeader("HASH", so.hash  ) ;
					// xhr.setRequestHeader("SSEESSIIOONN", PHPSESSID);
					xhr.setRequestHeader("FileSize",  encodeURIComponent (fb.size) );
					xhr.setRequestHeader("FileName", encodeURIComponent (fb.name) );
					xhr.setRequestHeader("folderOf", so.parent_folder_id);

	            	//xhr.setRequestHeader("Content-Range", "bytes " + (""+(sendOK*LENGTH)) +"-"+ fb.size + "/" +  fb.size  ) ;
	            	xhr.setRequestHeader("Content-Range",  (""+(sendOK*LENGTH)) +"-"+ fb.size   ) ;
	            }else{
	            	//xhr.setRequestHeader("Content-Range", "bytes " + (""+(sendOK*LENGTH)) +"-"+ (""+((sendOK+1)*LENGTH)) + "/" +  fb.size  ) ;
	            	xhr.setRequestHeader("Content-Range",  (""+(sendOK*LENGTH)) +"-"+ (((sendOK+1)*LENGTH)-1)  ) ;
	            }
	            // 如果不是第一次上传
	            if(so.token != undefined){
	            	xhr.setRequestHeader("token", so.token);
	            }
	            //xhr.setRequestHeader("sendOK", sendOK);
				xhr.withCredentials = true;
				// 如果是最后一次
				if((sendOK+1) == sendTimes){
					// 要判断 hash 完成才允许提交
					function send_post(xhr,so,blob){
						if(so.hash != undefined && so.hash !='' && so.hash != null && so.hash.length === 64){
							xhr.send(blob);
						}else{
							setTimeout( send_post , 1000 , xhr , so , blob );
						}
					}
					setTimeout( send_post , 1000 , xhr , so , blob );
				}else{
					xhr.send(blob); //开始上传，发送form数据
				}
	        }
			function uploadFailed_ReSend(){
				send();
			}
	        send();
	    }
	    UpladFile();
		//上传失败
		function uploadFailed(evt) {
			// ////////console.log(evt);
		}
 		//上传成功响应
        function uploadComplete(evt) {
         //服务断接收完文件返回的结果
         //    alert(evt.target.responseText);
         //////////console.log(sendOK);
         //////////console.log(sendTimes);
         	if(sendOK==sendTimes){
	            //////////console.log(evt.target.responseText);
	            //////////console.log("上传成功！");
	            let ResultJSON = JSON.parse(evt.target.responseText);
	            if(ResultJSON["status"]){
	            	so.upload_status_element.style.width = "0%"; // 上传完成 进度归零
	            	so.upload_speed_element.innerText = "上传完成"; // 上传完成 进度归零
	            	so.upload_status_element_text.innerText =  '100%';
			so.pause_element.title = "完成";
			so.pause_element_i.className = "fa fa-check-circle";
			so.pause_element.onclick = function(){return false;};
	            	// 加载0个文件夹 加载1个文件 加载到前面
			// get_files_loadover = false;
			// get_folders_loadover = false;
			// get_files();
			// 把文件添加到列表
			let file_item = {
				"name":ResultJSON["name"],
				"id":ResultJSON["id"],
				// "date":ResultJSON["date"],
				"date":parent.get_datetime(),
				// "size":ResultJSON["size"],
				"size":fb.size,
				"share":ResultJSON["share"],
				"url":ResultJSON["url"],
				"media":ResultJSON["media"],
				// "parent":ResultJSON["parent_folder_id"],
				"parent":so.parent_folder_id,
				"offline":ResultJSON["offline"],
				"offline_id":ResultJSON["offline_id"],
				"offline_size":ResultJSON["offline_size"],
				"offline_status":ResultJSON["offline_status"],
			}
			parent.push_files_to_files_page([file_item],true);
	            }else{
			so.upload_status_element.style.width = "0%"; // 上传完成 进度归零
	            	so.upload_speed_element.innerText = "上传失败"; // 上传完成 进度归零
	            	so.upload_status_element_text.innerText =  '未知错误';
	            	parent.upload_file_error('上传中断','上传中断','error');
	            }
				if(so.stop == false){
					so.stop = true;
					if(so.xhrObj!=undefined){
						so.xhrObj.abort();
					}
				}
			}
        }
        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt) {
             let progressBar = document.getElementById("progressBar");
             let percentageDiv = document.getElementById("percentage");
             // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
             if (evt.lengthComputable) {//
                 // progressBar.max = evt.total;
                 // progressBar.value = evt.loaded;
                 // percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
		so.upload_status_element.style.width =  Math.round(((evt.loaded / evt.total * 100)/sendTimes) + ((sendOK/sendTimes)*100))     + "%";
                 //////////console.log((sendOK + " - " + sendTimes));
            }
            let time = document.getElementById("time");
            let nt = new Date().getTime();//获取当前时间
            let pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            
            let perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b       
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        
            //上传速度计算
            let speed = perload/pertime;//单位b/s
            let bspeed = speed;
            let units = 'b/s';//单位名称
            if(speed/1024>1){
                speed = speed/1024;
                units = 'k/s';
            }
            if(speed/1024>1){
                speed = speed/1024;
                units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            let resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            // statusObj.getElementsByClassName('uploadsList-li-uploading-status')[0].getElementsByTagName('span')[0].innerText = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
            // so.getElementsByClassName('upload-file-list-li-status')[0].innerText =  Math.round(((evt.loaded / evt.total * 100)/sendTimes) + ((sendOK/sendTimes)*100))     + "%";
	    so.upload_status_element_text.innerText =  Math.round(((evt.loaded / evt.total * 100)/sendTimes) + ((sendOK/sendTimes)*100))     + "%";
		so.upload_speed_element.innerText = speed + units;
		if(bspeed==0){
                	so.upload_status_element_text.innerText = '任务终止';
        	}
        }
}
</script>
</body>
</html>
*/
// 上传出错 调用提示框
function upload_file_error(title,text,icon){
	swal({
		title: title,
		text: text,
		icon: icon,
		dangerMode: true,
		closeOnClickOutside: false,
	});
}
// 上传函数
// 上传文件操作
let ElementIsUploadingNumberMaxStatus = false; // 是否应该等待
let ElementIsUploadingNumberMax = 5; // 最大同时上传五个
function file_upload(Blobs,Element){
	// 如果未登录
	if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''){
		// pass
	}else{
		return false;
	}
	// 如果上传组件没加载完
	if(!show_upload_full_screen_mask){
		return false;
	}
	// 传到文件夹
	let folder_id = Element.parent_folder_id;
	// 文件大小
	let file_size = Blobs.size;
	// 如果点击取消上传
	Element.delete.onclick = function(){
		Element.stop = true;
		if(Element.xhrObj!=undefined){
			Element.xhrObj.abort();
		}
		function remove_element(Element){
			Element.className = "uploads-item uploads-item-hide";
			setTimeout(function(){
				Element.remove();
			},300);
		}
		remove_element(this.parent);
	}
	// 上传
	upload_window_iframe_element_src_locked = true;

	
	// 任务队列 上传排队
	// 查看有多少个文件正在上传，如果太多，就排队！
	let upload_items_uploading_items = upload_items.getElementsByClassName('uploads-item');
	let upload_items_uploading_items_running_number = 0; // 正在上传多少个
	for(let i=0;i<upload_items_uploading_items.length;i++){
		let item = upload_items_uploading_items[i];
		if( item.stop != undefined && item.stop == false ){
			if(item.isUploading != undefined && item.isUploading == true){
				upload_items_uploading_items_running_number = upload_items_uploading_items_running_number + 1;
			}
		}
		if(upload_items_uploading_items_running_number >= ElementIsUploadingNumberMax){
			break;
		}
	}
	
	if(upload_items_uploading_items_running_number >= ElementIsUploadingNumberMax){
		// 等待之后，重新上传。
		ElementIsUploadingNumberMaxStatus = true;
		Element.upload_speed_element.innerText = "正在排队";
		setTimeout(file_upload,1000,Blobs,Element);
		return false;
	}
	ElementIsUploadingNumberMaxStatus = false;
	Element.isUploading = true;
	Element.upload_speed_element.innerText = "正在上传";
	upload_window_iframe_element.contentWindow.FileUploadStart(Blobs,Element);
}
// 计算等待 排队
let need_calc_hash_push_number = 0; // 已加入计算的数量是多少
// 计算 hash 的数组
let workers;
// 上传文件的程序
	// 新上传
  (function () {
    "use strict";
    /*
     * (c) 2011,2015 by md5file.com. All rights reserved.
     */
    /*jslint browser: true, indent: 4*/
    /*global FileReader, File, Worker, alert*/
    let file_id = 1, drop_zone, is_crypto = false;
    if ((typeof File !== 'undefined') && !File.prototype.slice) {
      if(File.prototype.webkitSlice) {
        File.prototype.slice = File.prototype.webkitSlice;
      }
      if(File.prototype.mozSlice) {
        File.prototype.slice = File.prototype.mozSlice;
      }
    }
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !File.prototype.slice) {
      alert('File APIs are not fully supported in this browser. Please use latest Mozilla Firefox or Google Chrome.');
    }
    is_crypto = window.crypto && window.crypto.subtle && window.crypto.subtle.digest;
    is_crypto = false; // 启用优质算法
    function hash_file(file, workers, status_element) {
      let i, buffer_size, block, threads, reader, blob, handle_hash_block, handle_load_block;
      handle_load_block = function (event) {
        for( i = 0; i < workers.length; i += 1) {
        	if(status_element.stop == true){
        		return false;
        	}
          threads += 1;
          workers[i].postMessage({
            'message' : event.target.result,
            'block' : block
          });
        }
      };
      handle_hash_block = function (event) {
        threads -= 1;
        if(threads === 0) {
          if(block.end !== file.size) {
        	if(status_element.stop == true){
        		return false;
        	}
            block.start += buffer_size;
            block.end += buffer_size;
            if(block.end > file.size) {
              block.end = file.size;
            }
            reader = new FileReader();
            reader.onload = handle_load_block;
            blob = file.slice(block.start, block.end);
            reader.readAsArrayBuffer(blob);
          }
        }
      };
      buffer_size = 2 * 1024 * 1024;
      block = {
        'file_size' : file.size,
        'start' : 0
      };
      block.end = buffer_size > file.size ? file.size : buffer_size;
      threads = 0;
      for (i = 0; i < workers.length; i += 1) {
        workers[i].addEventListener('message', handle_hash_block);
      }
      reader = new FileReader();
      reader.onload = handle_load_block;
      blob = file.slice(block.start, block.end);
      reader.readAsArrayBuffer(blob);
    }
    function handle_worker_event(id,so,type,fb) {// 1 md5 2 hash
      return function (event) {
		if(so.stop!=undefined && so.stop==true){
			if(so.xhrObj!=undefined){
    			so.xhrObj.abort();
    		}
			need_calc_hash_push_number = need_calc_hash_push_number - 1;
			return false;
		}
        if (event.data.result) {
          if(type==1){ // 计算 MD5 已废
          	so.md5 = event.data.result;// 得到 MD5
          }
          if(type==2){
		need_calc_hash_push_number = need_calc_hash_push_number - 1;
          	so.upload_speed_element.innerText = '0MB/s';
          	so.hash = event.data.result; // 得到 hash
          	let session_id = encodeURIComponent(userinfo["session_id"]);
          	// 查询数据库是否有这个大小的文件
          	// 查找是否可以秒传
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					let ResultJSON = JSON.parse(xmlhttp.responseText);
					if(ResultJSON["status"]){
						so.stop = true;
						so.upload_speed_element.innerText = "上传完成"; // 文件秒传
						// so.upload_success_size_element.innerText = get_size_unit( so.size );
						so.upload_status_element.style.width = "0%";
						// so.upload_status_element_text.innerText = "100%";
						so.upload_status_element_text.innerText = "100%"; // 文件秒传
						so.pause_element.title = "完成";
						so.delete.title = "删除";
						so.pause_element_i.className = "fa fa-check-circle";
						// so.delete_i.className = "fa fa-check-circle";
						so.pause_element.onclick = function(){return false;};
						so.delete.parent = so;
						so.delete.onclick = function(){
							this.parent.className = "uploads-item uploads-item-hide";
							function remove_element(div){
								setTimeout(function(){
									div.remove();
								},300);
							}
							remove_element(this.parent);
						}
						// 看看是否要输出
						let files_items = files_items_files_items.getElementsByClassName('files-item');
						let is_flag = false;
						for(let i=0;i<files_items.length;i++){
							let item = files_items[i];
							if(item.item_id==ResultJSON["id"]){
								// 文件就在列表中
								is_flag = true;
								// 更新一下文件的信息
								let new_name = fb.name;
								let icon_type_name = get_files_item_type_icon(new_name);
								item.icon_element.getElementsByTagName('i')[0].className = icon_type_name;
								item.name = new_name;
								item.name_element.getElementsByTagName('span')[0].innerText = new_name;
								item.date_element.getElementsByTagName('span')[0].innerText = ResultJSON["date"];
								// 把文件移动到顶部
								let insert_before_element = files_items_files_items.getElementsByClassName('files-item')[0];
								insert_before_element.parentNode.insertBefore(item,insert_before_element);
								return false;
								break;
							}else{
								// 文件不在列表中
							}
						}
						if(!is_flag){
							// 文件不在列表中
							let file_item = {
								"name":fb.name,
								"id":ResultJSON["id"],
								"date":ResultJSON["date"],
								"size":fb.size,
								"share":ResultJSON["share"],
								"url":ResultJSON["url"],
								"media":ResultJSON["media"],
								"parent":so.parent_folder_id,
								"offline":ResultJSON["offline"],
								"offline_id":ResultJSON["offline_id"],
								"offline_size":ResultJSON["offline_size"],
								"offline_status":ResultJSON["offline_status"],
								"public_link":ResultJSON["public_link"],
								"origin":ResultJSON["origin"],
								"userid_hashid":ResultJSON["userid_hashid"],
								"share_password":ResultJSON["share_password"],
							}
							push_files_to_files_page([file_item],true);
						}
						// 加载文件夹数量0个，加载文件数量0个，从前面插入，加载文件页面0
		            	// FoldersOver=false;
		            	// getFolders(undefined,1,true,0);
		            	// 秒传完成 加载文件
		            	// get_files(1);
					}else{
						// 如果未登录
						if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''){
							// pass
						}else{
							return false;
						};
						// 如果没有错误码，才可以跳转。
						if(ResultJSON["error_status_code"]==undefined){
							// 没有重复文件，这是新的。
							// file_upload(Blobs,Element);
							if(so.need_calc_hash==true){

								file_upload(fb,so);
							}
						}else{
							// 看看是哪种错误
							if(ResultJSON["error_status_code"]==1){
								swal({title:ResultJSON["error_title"],text:ResultJSON["error_message"],icon:ResultJSON["error_icon"],closeOnClickOutside:false,buttons:ResultJSON["error_buttons"]}).then((willDelete) => {
									if (willDelete) {
										// window.location.href = ResultJSON["error_link"];
										alert(ResultJSON["error_link"]);
									}
								});
							}
						}
					}
				}
			}
			xmlhttp.open("POST",api_server_url+"/php/v4/hash_copy.php",true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			// xmlhttp.withCredentials = true;
			// xmlhttp.onerror = get_user_info_error;
		  	let file_name = fb.name;
			file_name = file_name.replace(/\\/g,'');
			file_name = file_name.replace(/\//g,'');
			file_name = file_name.replace(/:/g,'');
			file_name = file_name.replace(/\*/g,'');
			file_name = file_name.replace(/\?/g,'');
			file_name = file_name.replace(/"/g,'');
			file_name = file_name.replace(/</g,'');
			file_name = file_name.replace(/>/g,'');
			file_name = file_name.replace(/|/g,'');
			file_name = file_name.replace(/%/g,'');
			file_name = file_name.replace(/'/g,'');
			xmlhttp.send("name="+encodeURIComponent(file_name)+"&key=&parent_folder_id="+so.parent_folder_id+"&size="+fb.size+"&hash="+so.hash+ "&session_id=" + session_id );
          }
        } else {
        	if(type==2 ){
        		if(so.need_calc_hash == true){
        			// console.log('需要计算');
        		    // so.getElementsByClassName('upload-file-list-li-speed')[0].innerText = (event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%';
        		    // console.log((event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%');
        		    so.upload_speed_element.innerText = (event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%';
        		}
        	}else{
			need_calc_hash_push_number = need_calc_hash_push_number - 1;
        		return false;
        	}
        	// ////////console.log((event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%');
          // ////////console.log(event.data.block.end * 100 / event.data.block.file_size + '%')
        }
      };
    }
    function handle_crypto_progress(id, total, loaded) {
      // ////////console.log(loaded * 100 / total + '%');
    }
	// 上传处理代码
	function handle_file_select(event) {
		// 如果未登录
		if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''){
			// pass
		}else{
			return false;
		}
		let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
		if(swal_element.length>0){
			return false;
		}
		// 如果上传组件没加载完
		if(!show_upload_full_screen_mask){
			return false;
		}
		let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
		if(!userinfo["vipstatus"]){
			for(let i=0;i<files.length;i++){
				if(files[i].size>not_vip_upload_file_size){
					
					function fun_1(){
						upload_file_full_screen_mask.style.display="none";
					}
					setTimeout(fun_1,10);
					
					if(upload_file_max_size == 0){
						
						alert('系统公共服务器网络节点出现故障，工程师团队正在进行维护。');
						
						window.location.href="/#setting";
						
					}else{


						swal({
							title: "系统信息",
							// text: "免费用户单个文件上传最大允许" + get_size_unit( not_vip_upload_file_size ) + "。\r\n会员用户单个文件上传最大允许" + get_size_unit( upload_file_max_size ) + "。\r\n联系我们，支持上传文件大小不限。",
							text: "您的账号上传单个文件最大允许" + get_size_unit( not_vip_upload_file_size ) + "。\r\n联系我们上传单个文件最大支持" + get_size_unit(1000*1024*1024) + "。\r\n注意：最大允许保存单个文件大小范围由系统定期调整，并非固定，请关注云中转官方哔哩哔哩账号/微信公众号/官方QQ群及时了解最新消息。",
							icon: "warning",
							buttons: ["取消","详情"],
							closeOnClickOutside: false,
							dangerMode: true,
						}).then((willDelete) => {
						  if (willDelete) {
							window.open('/welcome/index.html#mail-talk-position');
						  }
						});
						
					}


					return false;
				}
			}
		}
		
		if(upload_lock){
			swal({
				title: upload_lock_title,
				text: upload_lock_text,
				icon: upload_lock_icon,
				buttons: upload_lock_buttons,
				// dangerMode: true,
				closeOnClickOutside: false,
			}).then((willDelete) => {
				if (willDelete) {
					upload_lock_functions();
				}
			});
			return false;
		}
		// 关闭 上传遮罩
		// document.getElementsByClassName('upload-file-full-screen')[0].style.display="none";
		function hide_full_screen_mask(){
			upload_items.scrollTop=0;
			upload_file_full_screen_mask.style.display="none";
			// not_mobile_remove();
		}
		hide_full_screen_mask();
		// console.log('关闭遮罩');
		setTimeout(hide_full_screen_mask,10);
		let hash = "";
		let md5 = "";
		event.stopPropagation();
		event.preventDefault();
		let i, file, worker, reader, crypto_files, crypto_algos, max_crypto_file_size = 500 * 1024 * 1024;
		
		crypto_files = [];
		// 统计上传文件大小超出的文件数量
		let over_size_num = 0;
		// let uploadsList = document.getElementsByClassName('upload-file-list-content')[0];
		// let uploadsLi = uploadsList.getElementsByClassName('upload-file-list-li');
		for (let i = 0; i < files.length; i += 1) {
			let file = files[i];
			// console.log(file);
			// 判断是否在上传列表中
			let upload_items_list = upload_items.getElementsByClassName('uploads-item');
			// 判断是否存在上传列表中
			let upload_item_is_flag = false;
			for(let i=0;i<upload_items_list.length;i++){
				let item = upload_items_list[i];
				if( file.name == item.name && file.size == item.size ){
					upload_item_is_flag = true;
					break;
				}
			}
			if(upload_item_is_flag){
				continue;
			}
			if(file.size>upload_file_max_size){
				over_size_num++;
			}else{
				// 继续上传
				// 如果文件名不符合
				// 文件名不能包含特殊符号
				// \/:*?"<>|
				let file_name = file.name;
				file_name = file_name.replace(/\\/g,'');
				file_name = file_name.replace(/\//g,'');
				file_name = file_name.replace(/:/g,'');
				file_name = file_name.replace(/\*/g,'');
				file_name = file_name.replace(/\?/g,'');
				file_name = file_name.replace(/"/g,'');
				file_name = file_name.replace(/</g,'');
				file_name = file_name.replace(/>/g,'');
				file_name = file_name.replace(/|/g,'');
				file_name = file_name.replace(/%/g,'');
				file_name = file_name.replace(/'/g,'');
				if(
					file_name.indexOf("downloading") == -1
					&&
					file_name.indexOf("baiduyun") == -1
					&&
					file_name.indexOf("crdownload") == -1
				){
					// console.log(file.name);
			        workers = [];
			        crypto_algos = [];
			    	// 创建上传元素
			    	// ////////console.log(event);
			    	let div = document.createElement('div');
			    	div.name = file_name;
			    	div.size = file.size;
			    	div.className = "uploads-item uploads-item-hide";
			    	// div.innerHTML = '<div class="transfer-item-filename"><div class="transfer-item-filename-name">'+div.name+'</div><div class="transfer-item-filename-size"><span class="upload-success-size-element">0</span>/'+get_size_unit(div.size)+'</div></div><div class="transfer-item-buttons"><div class="transfer-item-button">暂停</div><div class="transfer-item-button transfer-item-delete">删除</div></div><div class="transfer-item-uploading-status"><div class="transfer-item-transfering-background-color"><div class="transfer-item-transfering-background-color-full"></div></div><div class="transfer-item-transfering-speed upload-speed-element">0MB/s</div></div>';
			    	div.innerHTML = '<div class="uploads-item-status-background-color" style="width: 0%;"></div><div class="uploads-item-icon"><i class="' + get_files_item_type_icon(div.name) + '"></i></div><div class="uploads-item-name">' + div.name + '</div><div class="uploads-item-size">' + get_size_unit(div.size) + '</div><div class="uploads-item-status">0%</div><div class="uploads-item-speed">正在排队</div><div class="uploads-item-icon uploads-item-pause-button"><i class="fa fa-pause-circle"></i></div><div class="uploads-item-icon uploads-item-stop-button"><i class="fa fa-trash"></i></div>';
			    	div.stop = false;
			    	div.upload_paused = false;
			    	div.md5 = "";
			    	div.hash = "";
			    	// 文件名元素
			    	div.name_element = div.getElementsByClassName('uploads-item-name')[0];
			    	div.name_element.title = div.name;
			    	// 暂停上传
			    	div.pause_element = div.getElementsByClassName('uploads-item-pause-button')[0];
			    	div.pause_element.parent = div;
			    	div.pause_element_i = div.pause_element.getElementsByTagName('i')[0];
			    	div.pause_element.title = "暂停";
			    	div.pause_element.onclick = function(){
			    		this.parent.upload_paused = !this.parent.upload_paused;
			    		if(this.parent.upload_paused){
			    			div.pause_element_i.className = "fa fa-play-circle";
			    			div.pause_element.title = "继续";
			    		}else{
			    			div.pause_element_i.className = "fa fa-pause-circle";
			    			div.pause_element.title = "暂停";
			    		}
			    	}
			    	// 正在计算  HASH  取消上传
			    	div.delete = div.getElementsByClassName('uploads-item-stop-button')[0];
			    	div.delete_i = div.delete.getElementsByTagName('i')[0];
			    	div.delete.title = "取消";
			    	div.delete.parent = div;
			    	div.delete.onclick = function(){
			    		if(this.parent.xhrObj!=undefined){
			    			this.parent.xhrObj.abort();
			    		}
			    		// 表示终止上传
			    		this.parent.stop = true;
			    		this.parent.className = "uploads-item uploads-item-hide";
			    		// 移除文件
			    		function delete_element(div){
			    			setTimeout(function(){
			    				div.remove();
			    			},300);
			    		}
			    		delete_element(this.parent);
			    	}
			    	// 文件上传速度显示元素
			    	div.upload_speed_element = div.getElementsByClassName('uploads-item-speed')[0];
			    	// 文件已经上传大小内容
			    	// div.upload_success_size_element = div.getElementsByClassName('upload-success-size-element')[0];
			    	// 上传进度条
			    	div.upload_status_element = div.getElementsByClassName('uploads-item-status-background-color')[0];
			    	// 上传百分比
			    	div.upload_status_element_text = div.getElementsByClassName('uploads-item-status')[0];
			    	// 上传状态 DIV Element
					let status_element = div;
					// 是否需要计算计算
					status_element.need_calc_hash = true;
					// 当前文件夹 ID
					status_element.parent_folder_id = get_files_folders_array[get_files_folders_index];
					// 打开上传窗口
					show_uploads_window();
					// 加入到上传列表
					upload_items.prepend(div);
					// 倒计时 打开
					function upload_list_file_show(div,i){
						setTimeout(function(){
							div.className = "uploads-item";
						},(i*20)+20);
					}
					upload_list_file_show(div,i);
					// 开始上传
					function start_upload(status_element,file,workers,crypto_algos){
						
						// 如果要等待，那就等待
						if(
							ElementIsUploadingNumberMaxStatus!=undefined
							&&
							ElementIsUploadingNumberMaxStatus==true
						  ){
							if(need_calc_hash_push_number!=undefined){
								if(
									need_calc_hash_push_number < ElementIsUploadingNumberMax
								){
									ElementIsUploadingNumberMaxStatus = false;
								}
								if(need_calc_hash_push_number<0){
									need_calc_hash_push_number = 0;
								}
							}
							setTimeout(start_upload,1000,status_element,file,workers,crypto_algos);
							return false;
							
						}else{
							// pass
						}
						
						if(
							need_calc_hash_push_number != undefined
							&&
							need_calc_hash_push_number >= ElementIsUploadingNumberMax
						){
							ElementIsUploadingNumberMaxStatus = true;
							setTimeout(start_upload,1000,status_element,file,workers,crypto_algos);
							return false;
						}
						
						if(status_element.need_calc_hash){
							// 如果需要计算
						}else{
							// 只有大于100的文件才允许先上传
							if(file.size > upload_file_item_size ){
								// 大于 100 M 无需计算 直接上传
							    setTimeout(file_upload,100,file,status_element);
							}else{
								// 需要计算
								status_element.need_calc_hash = true;
							}
						}
						
						need_calc_hash_push_number = need_calc_hash_push_number + 1;
						
						if (true || document.getElementById('hash_hash').checked) {
						  if (is_crypto && file.size < max_crypto_file_size) {
							crypto_algos.push({id: "#hash_file_hash_" + file_id, name: "Hash"});
						  } else {
							worker = new Worker('/js/calc_hash.js');
							worker.addEventListener('message', handle_worker_event('hash_file_hash_' + file_id,status_element,2,file));
							workers.push(worker);
						  }
						}
						if (is_crypto && crypto_algos.length > 0) {
						  crypto_files.push({file: file, algos: crypto_algos});
						}
						hash_file(file, workers, status_element);
						file_id += 1;
					}
					// 判断文件是否可以边计算边上传
					function need_calc_hash_(status_element,file,workers,crypto_algos){
						
						// 如果要等待
						if(
							ElementIsUploadingNumberMaxStatus!=undefined
							&&
							ElementIsUploadingNumberMaxStatus==true
						  ){
							if(need_calc_hash_push_number!=undefined){
								if(
									need_calc_hash_push_number < ElementIsUploadingNumberMax
								){
									ElementIsUploadingNumberMaxStatus = false;
								}
								if(need_calc_hash_push_number<0){
									need_calc_hash_push_number = 0;
								}
							}
							setTimeout(need_calc_hash_,1000,status_element,file,workers,crypto_algos);
							return false;
							
						}else{
							// pass
						}
						
						if(
							need_calc_hash_push_number != undefined
							&&
							need_calc_hash_push_number >= ElementIsUploadingNumberMax
						){
							setTimeout(need_calc_hash_,1000,status_element,file,workers,crypto_algos);
							return false;
						}
						
						
						let xmlhttp_need_calc_hash = new XMLHttpRequest();
						let session_id = encodeURIComponent(userinfo["session_id"]);
						xmlhttp_need_calc_hash.onreadystatechange=function(){
							if(xmlhttp_need_calc_hash.readyState==4 && xmlhttp_need_calc_hash.status==200){
								let ResultJSON = JSON.parse(xmlhttp_need_calc_hash.responseText);
								if(ResultJSON["status"]){
									// need calc
									status_element.need_calc_hash = true;
								}else{
									status_element.need_calc_hash = false;
									// calc and upload
								}
								// 得到结果 开始上传
								start_upload(status_element,file,workers,crypto_algos);
							}
						}
						xmlhttp_need_calc_hash.open("POST",api_server_url+"/php/v4/need_calc_hash.php",true);
						xmlhttp_need_calc_hash.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
						// xmlhttp_need_calc_hash.withCredentials = true;
						xmlhttp_need_calc_hash.send("size=" + file.size + "&name=" + file.name + "&session_id=" + session_id );
					}
					need_calc_hash_(status_element,file,workers,crypto_algos);
				}else{
					over_size_num++;
				}
			}
		}
      if(over_size_num>0){
	      
	      if(upload_file_max_size == 0){
						
		alert('系统公共服务器网络节点出现故障，工程师团队正在进行维护。');
		      
		      window.location.href="/#setting";
						
		}else{
			swal({
			  title: "温馨提示",
			  text: "共有" + over_size_num + "个文件不能加入上传列队，因其大小异常、数据不完整或超出" + get_size_unit( upload_file_max_size ) + "单个文件上传最大大小允许（注意：最大允许保存单个文件大小范围由系统定期调整，并非固定，请关注云中转官方哔哩哔哩账号/微信公众号/官方QQ群及时了解最新消息）。\r\n联系我们，支持上传文件大小不限。",
			  icon: "warning",
			  buttons:["取消","详情"],
			  closeOnClickOutside: false,
			}).then((willDelete) => {
			if (willDelete) {
				// window.location.href = "#terms";
				// window.location.href = "#terms";
				window.open('/welcome/index.html#mail-talk-position');
				}
			});
		}
      }
      if (is_crypto) {
        handle_crypto_files(crypto_files);
      }
	}
    function handle_crypto_files(crypto_files) {
      let crypto_file, handle_crypto_file, handle_crypto_block, reader;
      crypto_file = crypto_files.pop();
      handle_crypto_block = function(data, algos) {
        let algo = algos.pop();
        if (algo) {
          window.crypto.subtle.digest({name: algo.name}, data)
          .then(function(hash) {
            let hexString = '', hashResult = new Uint8Array(hash);
            for (let i = 0; i < hashResult.length; i++) {
            	// console.log('计算');
              hexString += ("00" + hashResult[i].toString(16)).slice(-2);
            }
            // ////////console.log(hexString);
            handle_crypto_block(data, algos);
          })
          .catch(function(error) {
            console.error(error);
          });
        } else {
          handle_crypto_files(crypto_files);
        }
      };
      handle_crypto_file = function(file, crypto_algos) {
        reader = new FileReader();
        reader.onprogress = (function(crypto_algos) {
          let algos = crypto_algos;
          return function(event) {
            let i;
            for (i = 0; i < algos.length; i++) {
            	// console.log('计算');
              handle_crypto_progress(algos[i].id, event.total, event.loaded);
            }
          }
        })(crypto_algos);
        reader.onload = (function(crypto_algos) {
          let algos = crypto_algos;
          return function(event) {
            handle_crypto_block(event.target.result, algos);
          }
        })(crypto_algos);
        reader.readAsArrayBuffer(file);
      };
      if (crypto_file) {
        handle_crypto_file(crypto_file.file, crypto_file.algos);
      }
    }
    function handle_drag_over(event) {
      event.stopPropagation();
      event.preventDefault();
    }
    drop_zone = document.getElementById('drop_zone');
    //drop_zone.addEventListener('dragover', handle_drag_over, false);
    // drop_zone.addEventListener('drop', handle_file_select, false);
	// 绑定文件按钮
	// document.getElementsByClassName('upload-file-input')[0].addEventListener('change', handle_file_select, false);
	// 上传按钮点击后触发
	files_options_item_upload_files_input.addEventListener('change', handle_file_select, false);
	// 邦定上传元素
	document.addEventListener('drop', handle_file_select, false);
 }());
// 拖动文件上传
// 处理拖动文件进来 拖放文件
/*
DragDrop：拖放完成，也就是鼠标拖入对象并在拖放区域释放。
DragEnter：拖放进入，也就是鼠标拖放对象进入拖放区域。
DragLeave：离开拖放区域。
DragOver：拖放对象悬浮于拖放区域，在拖放区域内移动时多次触发。
*/
document.addEventListener("drop",preventDe_On);
upload_file_full_screen_mask.addEventListener("dragleave",preventDe_Out);
document.addEventListener("dragover",preventDe_On);// 
// document.addEventListener("dragenter",preventDe_On);
// 首次拖进
function preventDe_On(e){
	// 如果未登录
	if( userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&window.location.href.indexOf("#files")!=-1&&files.className.indexOf("files-hide")==-1){
		// pass
	}else{
		return false;
	}
	e.preventDefault();
	// 打开元素
	if(upload_lock){
		if(document.getElementsByClassName('swal-overlay--show-modal')[0]==undefined){
			swal({
				title: upload_lock_title,
				text: upload_lock_text,
				icon: upload_lock_icon,
				buttons: upload_lock_buttons,
				// dangerMode: true,
				closeOnClickOutside: false,
			}).then((willDelete) => {
				if (willDelete) {
					upload_lock_functions();
				}
			});
		}
	}else{
		// 如果弹窗还在
		let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
		if(swal_element.length>0){
			return false;
		}
		// 如果未登录
		if(userinfo["id"]!=undefined&&userinfo["id"]!=null&&userinfo["id"]!=''&&userinfo["qq"]!=undefined&&userinfo["qq"]!=null&&userinfo["qq"]!=''&&userinfo["username"]!=undefined&&userinfo["username"]!=null&&userinfo["username"]!=''){
			/*if(upload_window_iframe_element.src != api_upload_web_url){
				show_upload_full_screen_mask = false;
				upload_window_iframe_element.src = api_upload_web_url;
			}*/
			if(!show_upload_full_screen_mask){

				set_upload_cdn_cloudflare();
				return false;
			}
		}else{
			window.location.href = "#login";
			return false;
		}
		if(show_upload_full_screen_mask){
			upload_file_full_screen_mask.style.display="block";
		}		
	}
}
// 文件拖进来了
/*
document.addEventListener("drop",function(e){
	e.preventDefault();
	FilesUpload(e.dataTransfer.files);
	document.getElementsByClassName('upload-file-full-screen')[0].style.display="none";
});
*/
/*
function preventDe_OnUp(e){
document.getElementsByClassName('uploadFileMasker')[0].style.display="block";
}
*/
function preventDe_Out(e){
	e.preventDefault();
	upload_file_full_screen_mask.style.display="none";
}
// 点击关闭上传遮罩
/*
upload_file_full_screen_mask.onclick = function(){
	upload_file_full_screen_mask.style.display="none";
}
// 开始上传
function FilesUpload(files){
	////////console.log(files);
	uploadListOpen();
}
*/

// 如果还在验证 继续获取用户信息
let wechat_login_id_set_timeout_function_timeout;
function wechat_login_id_set_timeout_function(){
	let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
	if(swal_element.length>0){
		get_userinfo();
		login_input_button_wechat_login.click();
	};
}

 function wechat_verify_clear_timeout(){
	try{
		clearTimeout(wechat_login_id_set_timeout_function_timeout);
	}catch(e){
		// pass
	}
	try{
		clearTimeout(wechat_bind_auto_click_login_button_timeout);
	}catch(e){
		// pass
	}
	try{
		clearTimeout(register_verify_timeout);
	}catch(e){
		// pass
	}
	
	swal_button__cancel_button_element = document.getElementsByClassName('swal-button--cancel');
}

// 微信登录按钮
let login_input_button_wechat_login = document.getElementById('login-input-button-wechat-login');
login_input_button_wechat_login.onclick = async function(){
	
	swal({
		title: "指令登录",
		text: "该功能已临时停用。",
		icon: "error",
		// buttons: true,
		dangerMode: true,
		closeOnClickOutside: false,
	});
	return false;

	if(userinfo["wechat_login_id"] == undefined){
		return false;
	}

	let text = '打开手机微信，扫描云中转官方订阅号二维码并关注。\r\n回复：“登录' + userinfo["wechat_login_id"] + '”即可快速登录。';
	let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
	if(swal_element.length>0){
		// pass
		swal_element[0].getElementsByClassName('swal-text')[0].innerText = text;
	}else{

		let content_element = document.createElement('div');
		content_element.innerHTML = '<img src="/img/wechat_qrcode_1.png" />';

		// 微信登录
		swal({
			title: "微信登录",
			text: text,
			icon: "success",
			content: content_element,
			// buttons: true,
			// dangerMode: true,
			buttons: true,
			closeOnClickOutside: false,
		});
	}

	wechat_login_id_set_timeout_function_timeout = setTimeout(wechat_login_id_set_timeout_function,3600);

	setTimeout(function(){
		// swal 取消按钮 点击事件
		let swal_button__cancel_button_element = document.getElementsByClassName('swal-button--cancel');
		swal_button__cancel_button_element[swal_button__cancel_button_element.length-1].onclick = wechat_verify_clear_timeout;
	},500);




}




// 如果还在验证 继续获取用户信息
let qq_login_id_set_timeout_function_timeout;
function qq_login_id_set_timeout_function(){
	let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
	if(swal_element.length>0){
		get_userinfo();
		login_input_button_qq_login.click();
	};
}

 function qq_verify_clear_timeout(){
	try{
		clearTimeout(qq_login_id_set_timeout_function_timeout);
	}catch(e){
		// pass
	}
	try{
		clearTimeout(qq_bind_auto_click_login_button_timeout);
	}catch(e){
		// pass
	}
	try{
		clearTimeout(register_verify_timeout);
	}catch(e){
		// pass
	}
	
	swal_button__cancel_button_element = document.getElementsByClassName('swal-button--cancel');
}

// QQ登录按钮
let login_input_button_qq_login = document.getElementById('login-input-button-qq-login');
login_input_button_qq_login.onclick = async function(){
	use_qq_qr_code_login = true;
	if(userinfo["qq_login_id"]==undefined||userinfo["qq_login_id"]=="0"||userinfo["qq_login_id"].length<5){
		get_userinfo();
		return false;
	}

	let text = '手机QQ扫描二维码安全登录。\r\n5秒钟后系统自动更新二维码。';
	// let qr_code = 'https://applicationprogramminginterface.yzzpan.com' + '/php/temp/imgs/' + userinfo["qq_login_id"] + ".png?t=0&";;
	// let qr_code = api_server_url + '/php/temp/imgs/' + userinfo["qq_login_id"] + ".png?t=0&";;
	let qr_code = 'https://c34a02aaeb0d6.cname.frontwize.com/php/temp/imgs/' + userinfo["qq_login_id"] + ".png?t=0&";;
	let swal_element = document.getElementsByClassName('swal-overlay--show-modal');
	let qq_login_id_qr_code_element = document.getElementsByClassName('qq_login_id_qr_code');
	if(swal_element.length>0 && qq_login_id_qr_code_element.length>0){
		// pass
		swal_element[0].getElementsByClassName('swal-text')[0].innerText = text;
		let qq_code_element = document.getElementsByClassName('qq_login_id_qr_code');
		if(qq_code_element[0]!=undefined){
			qq_code_element[0].src=qr_code;
		}
	}else{

		let content_element = document.createElement('div');
		content_element.innerHTML = '<img class="qq_login_id_qr_code" src="' + qr_code + '" />';
		// QQ登录
		swal({
			title: "QQ登录",
			text: text,
			icon: "success",
			content: content_element,
			// buttons: true,
			// dangerMode: true,
			buttons: true,
			closeOnClickOutside: false,
		});
	}
	

	
	qq_login_id_set_timeout_function_timeout = setTimeout(qq_login_id_set_timeout_function,3600);
	setTimeout(function(){
		// swal 取消按钮 点击事件
		let swal_button__cancel_button_element = document.getElementsByClassName('swal-button--cancel');
		swal_button__cancel_button_element[swal_button__cancel_button_element.length-1].onclick = qq_verify_clear_timeout;
	},500);
}





// 找回密码
let forget_password_input_username = document.getElementById('forget-password-input-username');
let forget_password_input_password = document.getElementById('forget-password-input-password');
let forget_password_input_password_2 = document.getElementById('forget-password-input-password-2');
let forget_password_input_qq = document.getElementById('forget-password-input-qq');
function forget_password_functions(){
	let username = encodeURIComponent( forget_password_input_username.value );
	let password = encodeURIComponent( forget_password_input_password.value );
	let qq = encodeURIComponent( forget_password_input_qq.value );
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// 验证失败
				register_verify_timeout = setTimeout(register_verify,3600,ResultJSON["id"],ResultJSON["verify"]);
				// 显示正在验证
				swal({
					title: "等待验证",
					// text: "第一步，登录QQ号码（" + qq + "）。\r\n第二步、设置QQ昵称（" + ResultJSON["verify"] + "）。\r\n请勿关闭当前提示框！修改QQ昵称进行验证。\r\n验证通过之后，可修改回原来的昵称，不影响。\r\n注意：复制括号中的内容，不用复制括号。",
					text: "等待系统安全验证...",
					icon: "info",
					// buttons: true,
					// dangerMode: true,
					buttons: true,
					closeOnClickOutside: false,
				}).then((willDelete) => {
					try{
						clearTimeout(register_verify_timeout);
					}catch(e){
						// pass
					}
				});
			}else{
				swal({
					title: "找回失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/forget_password",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send( "username=" + username + "&password=" + password + "&qq=" + qq );
}
let forget_password_input_button_forget_password = document.getElementById('forget-password-input-button-forget-password');
forget_password_input_button_forget_password.onclick = function(){
	// 如果账号密码为空
	if( forget_password_input_username.value.length == 0 || forget_password_input_password.value.length == 0 || ( forget_password_input_password.value != forget_password_input_password_2.value ) || forget_password_input_qq.value.length < 5 || forget_password_input_qq.value.length > 10 || isNaN(forget_password_input_qq.value) || forget_password_input_qq.value.indexOf('.') != -1 ){
		swal({
			title: "找回提示",
			text: "请正确填写完整的找回信息。",
			icon: "error",
			// buttons: true,
			// dangerMode: true,
			// buttons: true,
			closeOnClickOutside: false,
		});
		return false;
	}
	forget_password_functions();
}
// 实时验证QQ用户名是否匹配验证字符串
let register_verify_timeout;
let register_verify_xmlhttp_error_times = 0;
function register_verify(id,verify){
	let xmlhttp = new XMLHttpRequest();

	xmlhttp.onerror = function(){
		register_verify_xmlhttp_error_times++;
		if(register_verify_xmlhttp_error_times>10){
			return false;
		}
		setTimeout(register_verify,3000,id,verify);
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				swal({
					title: "验证成功",
					text: ResultJSON["message"],
					icon: "success",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}else{
				// 验证失败
				register_verify_timeout = setTimeout(register_verify,3000,id,verify);
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/register_verify.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send( "id=" + id + "&verify=" + verify );
	register_verify_xmlhttp_error_times = 0;
}
// 注册页面输入框
let register_input_username = document.getElementById('register-input-username');
let register_input_password = document.getElementById('register-input-password');
let register_input_password_2 = document.getElementById('register-input-password-2');
let register_input_qq = document.getElementById('register-input-qq');
let register_input_button_register = document.getElementById('register-input-button-register');
// 提交注册信息
function register_functions(){
	let username = encodeURIComponent(register_input_username.value);
	let password = encodeURIComponent(register_input_password.value);
	let qq = encodeURIComponent(register_input_qq.value);
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["status"]){
				// register_verify(ResultJSON["id"],ResultJSON["verify"]);
				register_verify_timeout = setTimeout(register_verify,3000,ResultJSON["id"],ResultJSON["verify"]);
				// 显示正在验证
				swal({
					title: "等待验证",
					// text: "第一步，登录QQ号码（" + qq + "）。\r\n第二步、设置QQ昵称（" + ResultJSON["verify"] + "）。\r\n请勿关闭当前提示框！修改QQ昵称进行验证。\r\n验证通过之后，可修改回原来的昵称，不影响。\r\n注意：复制括号中的内容，不用复制括号。",
					text: "等待系统安全验证...",
					icon: "info",
					// buttons: true,
					// dangerMode: true,
					buttons: true,
					closeOnClickOutside: false,
				}).then((willDelete) => {
					try{
						clearTimeout(register_verify_timeout);
					}catch(e){
						// pass
					}
				});
			}else{
				swal({
					title: "注册失败",
					text: ResultJSON["message"],
					icon: "error",
					// buttons: true,
					// dangerMode: true,
					closeOnClickOutside: false,
				});
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/register.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.withCredentials = true;
	xmlhttp.send( "username=" + username + "&qq=" + qq + "&password=" + password );
}
register_input_button_register.onclick = function() {
	// 如果账号密码为空
	if( register_input_username.value.length == 0 || register_input_password.value.length == 0 || ( register_input_password.value != register_input_password_2.value ) || register_input_qq.value.length < 5 || register_input_qq.value.length > 10 || isNaN(register_input_qq.value) || register_input_qq.value.indexOf('.') != -1 ){
		swal({
			title: "注册提示",
			text: "请正确填写完整的注册信息。",
			icon: "error",
			// buttons: true,
			// dangerMode: true,
			// buttons: true,
			closeOnClickOutside: false,
		});
		return false;
	}
	register_functions();
}
// 用户协议
let terms_of_services = document.getElementById('terms-of-services');
let terms_of_services_content = terms_of_services.getElementsByClassName('terms-of-services-content')[0];
// 分享文件
let sharefile = document.getElementById('sharefile');
let sharefile_page_show_files_button = document.getElementById('sharefile-page-show-files-button');
sharefile_page_show_files_button.onclick = function(){
	window.location.href = "#files";
}

let upload_lock = true;
let upload_lock_title = "加载组件";
let upload_lock_text = "上传组件正在加载，请您稍等。";
let upload_lock_icon = "error";
let upload_lock_buttons = undefined;
function upload_lock_functions(){

}
function query_all_files_sum_size(){
	upload_lock = false;
	return false;
	let xmlhttp = new XMLHttpRequest();
	let session_id = encodeURIComponent(userinfo["session_id"]);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			let ResultJSON = JSON.parse(xmlhttp.responseText);
			if(ResultJSON["upload_lock"]){
				// lock upload
				upload_lock = true;
				upload_lock_text = "您的存储容量已达到2TB上限，请联系我们升级帐户。\r\n可升级至8TB/无限制存储容量。";
				upload_lock_title = "配额用完";
				upload_lock_buttons = ["取消","查看"];
				upload_lock_functions = function(){
					
				}
			}else{
				upload_lock = false;
			}
		}
	}
	xmlhttp.open("POST",api_server_url+"/php/v4/query_all_files_sum_size",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// xmlhttp_need_calc_hash.withCredentials = true;
	xmlhttp.send("t=1&session_id=" + session_id );
}

function preview_media(){
	// return false;
	// let cache_id = files_items_selected_array[0].url.split('/download/media/')[1].split('/')[0];
	let cache_id = files_items_selected_array[0].media||files_items_selected_array[0].url_public_link;
	if(cache_id.indexOf('undefined')==-1){
	    
	}else{
	    return false;
	}
	let cache_url = cache_id; // "https://cache.123.com/"+cache_id + "/" + files_items_selected_array[0].name;
	// let cache_url = "https://download.cloudfiles.host/"+cache_id.substr(0,6)+"-"+cache_id.substr(6,8)+"-"+cache_id.substr(14,4)+"-"+cache_id.substr(18,4)+"-"+cache_id.substr(22,4)+"-"+cache_id.substr(26,12);
	let html_element = document.createElement('div');
	html_element.className = "cache-media-preview";
	if(files_items_selected_array[0].name.split('.mp4').length==2&&files_items_selected_array[0].name.split('.mp4')[1]==''){
	html_element.innerHTML = "<video controls title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"'><source src='"+cache_url+"' type='video/mp4'></video>";
	}else if(files_items_selected_array[0].name.split('.mp3').length==2&&files_items_selected_array[0].name.split('.mp3')[1]==''){
	html_element.innerHTML = "<audio controls title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"' type='audio/mp3'></audio>";
	}else if(files_items_selected_array[0].name.split('.wav').length==2&&files_items_selected_array[0].name.split('.wav')[1]==''){
	html_element.innerHTML = "<audio controls title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"' type='audio/wav'></audio>";
	}else if(files_items_selected_array[0].name.split('.png').length==2&&files_items_selected_array[0].name.split('.png')[1]==''){
	html_element.innerHTML = "<img title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"'/>";
	}else if(files_items_selected_array[0].name.split('.jpg').length==2&&files_items_selected_array[0].name.split('.jpg')[1]==''){
	html_element.innerHTML = "<img title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"'/>";
	}else if(files_items_selected_array[0].name.split('.gif').length==2&&files_items_selected_array[0].name.split('.gif')[1]==''){
	html_element.innerHTML = "<img title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"'/>";
	}else if(files_items_selected_array[0].name.split('.jpeg').length==2&&files_items_selected_array[0].name.split('.jpeg')[1]==''){
	html_element.innerHTML = "<img title='"+files_items_selected_array[0].name+"' alt='"+files_items_selected_array[0].name+"' src='"+cache_url+"'/>";
	}
	if(files_items_selected_array[0].offline!=undefined){
	    /*
	    let p = document.createElement('p');
	    let a = document.createElement('a');
	    a.href = files_items_selected_array[0].offline;
	    a.target = "_blank";
	    a.innerText = "点击下载（源站）";
	    p.append(a);
	    html_element.prepend(p);
	    */
	}
	console.log(html_element);
	swal({
	    title: "预览文件",
	    text: "名称："+files_items_selected_array[0].name+"\r\n大小："+get_size_unit(files_items_selected_array[0].size),
	    content: html_element,
	    // icon: "success",
	    buttons: ["取消","确认"],
	    closeOnClickOutside: false,
	    // dangerMode: true,
	}).then((willDelete) => {
	    console.log('hide');
	    let cache_media_preview = document.getElementsByClassName('cache-media-preview');
	    for(let i=0;i<cache_media_preview.length;i++){
		setTimeout(function(){cache_media_preview[i].remove();},300);
	    }
		if(willDelete){
			
		}
	});

}
if((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))){
// document.write("手机访问.");
}else{
//document.write("电脑访问.");
	let input_items = document.getElementsByTagName('input');
	for(let i=0;i<input_items.length;i++){
		input_items[i].onfocus = function(){
			this.removeAttribute('readonly');
		}
		input_items[i].onblur = function(){
			this.setAttribute('readonly',true);
		}
		input_items[i].setAttribute('readonly',true);
	}
}




let sharefile_ad_only_one = document.getElementsByClassName('sharefile-ad-only-one');

if(navigator.language.toLowerCase().indexOf('cn')!=-1){
	for(let i=0;i<sharefile_ad_only_one.length;i++){
		let item = sharefile_ad_only_one[i];
		item.style.display="";
	}
}

let ad_hidden_block_height_items = document.getElementsByClassName('ad-hidden-block-height');

if(navigator.language.toLowerCase().indexOf('cn')!=-1){
	for(let i=0;i<ad_hidden_block_height_items.length;i++){
		let item = ad_hidden_block_height_items[i];
		item.style.display="";
	}
}

