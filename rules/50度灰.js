
const csdown = {
	d: [],
	author: '流苏',
	version: '20251029',
	rely: (data) => {
		return data.match(/\{([\s\S]*)\}/)[0].replace(/\{([\s\S]*)\}/, '$1')
	},
	home: () => {
		var d = csdown.d;
		if (MY_PAGE == 1) {
			d.push({
				title: "搜索 ",
				url: $.toString(() => {
					putMyVar('keyword', input)
					return "hiker://empty?page=fypage&kw=" + input +
						'@rule=js:$.require("csdown").search()'
				}),
				desc: "请输入搜索关键词",
				col_type: "input",
				extra: {
					defaultValue: getMyVar('keyword', ''),
				}
			})
		};
		var pg = getParam('page');
		var c1 = [{
			title: '首页&圈子&黑料&分类',
			id: '1&2&3&4',
			img:  'https://ghfast.top/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/47.png&https://ghfast.top/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/175.png&https://ghfast.top/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/78.png&https://ghfast.top/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/48.png&https://ghfast.top/https://raw.githubusercontent.com/ls125781003/tubiao/main/more/109.png'
		}];
		if (MY_PAGE == 1) {
			eval(csdown.rely(csdown.aes))
			Cate(c1, 'c1', d, 'icon_4');
			d.push({
				col_type: 'line',
			}, {
				col_type: 'big_blank_block',
			}, {
				col_type: 'big_blank_block',
			});
		}
		var 分类 = getMyVar('c1', '1');
		if (MY_RULE.author == csdown.author || MY_NAME == '嗅觉浏览器') {
			if (分类 == 1) {
				csdown.video()
			} else if (分类 == 2) {
				csdown.news()
			} else if (分类 == 3) {
				csdown.heiliao()
			} else if (分类 == 4) {
				csdown.vodlei()
			}
		} else {
			d.push({
				title: '请勿修改作者名称',
				url: 'hiker://empty',
				col_type: 'text_center_1',
			})
		}
		setResult(d)
	},
	aes: $.toString(() => {
		//加载CryptoJS库
		eval(getCryptoJS());
		var t = Math.floor(Date.now() / 1000);
		//生成时间戳
		function getCurrentTimestamp() {
			return new Date().getTime();
		}
		//md5加密
		function md5(str) {
			return CryptoJS.MD5(str).toString();
		}
		//sha256加密
		function sha256(str) {
			return CryptoJS.SHA256(str).toString();
		}

		function strong(d, c) {
			return '‘‘’’<strong><font color=#' + (c || '000000') + '>' + d + '</font></strong>';
		}

		function color(txt) {
			return '<b><font color=' + '#FF6699' + '>' + txt + '</font></b>'
		}

		function Cate(list, n, d, col, longclick) {
			if (!col) {
				col = 'scroll_button';
			}
			if (!longclick) {
				longclick = [];
			}
			var index_n = list[0].id.split('&')[0] + '';
			list.forEach(data => {
				var title = data.title.split('&');
				var id = data.id.split('&');
				if (data.img != null) {
					var img = data.img.split('&');
				} else {
					var img = [];
				}
				title.forEach((title, index) => {
					d.push({
						title: (getMyVar(n, index_n) == id[index] ? strong(title,
							'FF6699') : title),
						img: img[index],
						url: $('#noLoading#').lazyRule((n, title, id) => {
							putMyVar(n, id);
							refreshPage(false);
							return 'hiker://empty';
						}, n, title, id[index] + ''),
						col_type: col,
						extra: {
							longClick: longclick,
						}
					})
				})
				d.push({
					col_type: 'blank_block',
				});
			})
			return d;
		}
		// 解密函数
		function Decrypt(word) {
			const key = CryptoJS.enc.Utf8.parse("7205a6c3883caf95b52db5b534e12ec3");
			const iv = CryptoJS.enc.Utf8.parse("81d7beac44a86f43");
			let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
			let decrypt = CryptoJS.AES.decrypt({
				ciphertext: encryptedHexStr
			}, key, {
				iv: iv,
				mode: CryptoJS.mode.CFB,
				padding: CryptoJS.pad.NoPadding
			});
			let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
			return decryptedStr;
		}
		// 加密函数
		function Encrypt(plaintext) {
			const key = CryptoJS.enc.Utf8.parse("7205a6c3883caf95b52db5b534e12ec3");
			const iv = CryptoJS.enc.Utf8.parse("81d7beac44a86f43");
			var encrypted = CryptoJS.AES.encrypt(plaintext, key, {
				iv: iv,
				mode: CryptoJS.mode.CFB,
				padding: CryptoJS.pad.NoPadding
			});
			var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
			return ciphertext.toUpperCase();
		}
		//图片解密
		var image = $('').image(() => {
			const CryptoUtil = $.require("hiker://assets/crypto-java.js");
			let key = CryptoUtil.Data.parseUTF8("f5d965df75336270");
			let iv = CryptoUtil.Data.parseUTF8("97b60394abc2fbe1");
			let textData = CryptoUtil.Data.parseInputStream(input);
			let encrypted = CryptoUtil.AES.decrypt(textData, key, {
				mode: "AES/CBC/PKCS7Padding",
				iv: iv
			});
			return encrypted.toInputStream();
		})
		//免嗅播放视频
		var lazy = $('').lazyRule(() => {
			eval($.require("csdown").rely($.require("csdown").aes))
			var data0 = '{"id":"' + input +
				'","system_oauth_type":"pwa","system_oauth_id":"cwurLEOExkopZKbeO9F_1761007929992","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":""}';
			var url = getItem('host') + '/pwa.php/api/MvDetail/detail';
			let html = post(url, data0)
			var url1 = JSON.parse(html).data.detail.preview_video.replace(/\/\/.*play\./, '//long.')
				.replace('&seconds=30', '');
			return url1

		})
		//post提交函数
		function post(url, data0) {
			var t = Math.floor(Date.now() / 1000);
			var data = Encrypt(data0); //log(data)
			var sign = md5(sha256('client=pwa&data=' + data + '&timestamp=' + t +
				'7205a6c3883caf95b52db5b534e12ec3'));
			var body = 'client=pwa&timestamp=' + t + '&data=' + data + '&sign=' + sign;
			var html = fetch(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: body,
				method: 'POST'
			});
			let html1 = JSON.parse(html).data;
			let html2 = Decrypt(html1);
			var html3 = html2.replace(/\\/g, '')
			var html4 = html3.substring(1, html3.length - 1);
			return html4;
		}

		function post0(url, data0) {
			var t = Math.floor(Date.now() / 1000);
			var data = Encrypt(data0); //log(data)
			var sign = md5(sha256('client=pwa&data=' + data + '&timestamp=' + t +
				'7205a6c3883caf95b52db5b534e12ec3'));
			var body = 'client=pwa&timestamp=' + t + '&data=' + data + '&sign=' + sign;
			var html = fetch(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: body,
				method: 'POST'
			});
			let html1 = JSON.parse(html).data;
			let html2 = Decrypt(html1);
			var html3 = html2.replace(/\\\\/g, '\\')
			var html4 = html3.replace(/\\/g, '')
			var html5 = html4.substring(1, html4.length - 1);
			return html5;
		}

		function escape4Html(json) {
			var temp = json.split(''); // 变成可写的字符数组
			var n = temp.length;

			for (var i = 0; i < n; i++) {
				// 匹配到 :"
				if (temp[i] === ':' && temp[i + 1] === '"') {
					// 从 i+2 开始找下一个未转义的双引号
					for (var j = i + 2; j < n; j++) {
						if (temp[j] === '"' && temp[j - 1] !== '\\') {
							// 判断这个双引号是不是字符串值的结尾
							if (temp[j + 1] === ',' || temp[j + 1] === '}') {
								// 是结尾，结束本次搜索
								break;
							}
							// 不是结尾，把它换成单引号
							temp[j] = "'";
						}
					}
				}
			}
			return temp.join('');
		}
	}),
	//搜索模块
	search: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let pg = getParam('page');
		try {
			if (MY_PAGE == 1) {
				d.push({
					title: "搜索 ",
					url: $.toString(() => {
						putMyVar('keyword', input)
						refreshPage(false)
						return "hiker://empty"
					}),
					desc: "请输入搜索关键词",
					col_type: "input",
					extra: {
						defaultValue: getMyVar('keyword', ''),
						pageTitle: '搜索结果'
					}
				})
				let 搜索 = [{
					title: '视频&黑料&圈子&微帖',
					id: 'long&heiliao&news&wei',
				}]
				Cate(搜索, '搜索', d)
			}
			if ((getMyVar('搜索', 'long') == 'long')) {
				var data0 =
					'{"system_version":"6.2.1","system_token":"","system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"R3O2lxhWUaSamr8m3ih_1743502699655","system_app_type":"","system_build":"","system_build_id":"","page":' +
					pg + ',"size":10,"limit":10,"keyword":"' + getMyVar('keyword') + '","type":"' + getMyVar(
						'搜索', 'long') + '"}';
				var url = getItem('host') + '/pwa.php/api/MvSearch/video';
				var html = post(url, data0);
				var list = JSON.parse(html).data.list;
				list.forEach(data => {
					var url = data.preview_video;
					d.push({
						title: data.title,
						desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data
							.duration_str + '\t\t\t' + data.tags,
						img: data.thumb_cover_str + image,
						url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', ''),
						col_type: getMyVar('搜索', 'long') == 'long' ? "movie_1_left_pic" :
							"movie_3",
						extraextra: {
							lineVisible: false
						}
					})
				})
			} else if (getMyVar('搜索', 'long') == 'heiliao') {
				var data0 =
					'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"sVGcMzkHADQjj8EZt1J_1761009442702","system_app_type":"","system_build":"","system_build_id":"","page":' +
					pg + ',"word":"' + getMyVar('keyword') + '"}';
				var url = getItem('host') + '/pwa.php/api/contents/search';
				var html = post(url, data0);
				var list = JSON.parse(html).data.list;
				log(list)
				list.forEach(data => {
					var url = data.preview_video;
					d.push({
						title: data.title,
						desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data
							.duration_str + '\t\t\t' + data.tags,
						img: data.thumb_cover_str + image,
						url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', ''),
						col_type: getMyVar('搜索', 'long') == 'long' ? "movie_1_left_pic" :
							"movie_3",
						extraextra: {
							lineVisible: false
						}
					})
				})
			} else if (getMyVar('搜索', 'long') == 'news') {
				var data0 =
					'{"system_version":"6.2.1","system_token":"","system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"R3O2lxhWUaSamr8m3ih_1743502699655","system_app_type":"","system_build":"","system_build_id":"","page":' +
					pg + ',"size":10,"limit":10,"word":"' + getMyVar('keyword') + '"}';
				var url = getItem('host') + '/pwa.php/api/community/search';
				var html = post(url, data0);
				var list = JSON.parse(html).data;
				list.forEach(data => {
					//图片
					let imgs = data.imgs;
					//视频
					let videos = data.videos;
					//up
					let up = data.user;
					//圈子
					let topic = data.topic_ary;
					d.push({
						title: up.nickname,
						desc: data.refresh_at,
						img: up.thumb_url + image,
						url: 'hiker://empty',
						col_type: "avatar",
						extra: {
							id: data.uid,
						}
					}, {
						title: data.title,
						desc: data.content,
						url: 'hiker://empty@rule=js:$.require("csdown").news_erji()',
						col_type: 'text_1',
						extra: {
							id: data.id,
							videos: videos,
							lineVisible: false,
						}
					})
					imgs.forEach(data => {
						d.push({
							img: data.media_url + image,
							col_type: "pic_card_3",
							url: data.media_url + image,
						})
					})
					videos.forEach(data => {
						d.push({
							title: '视频▶️',
							img: data.cover + image,
							col_type: "movie_3",
							url: data.media_url.replace(/\/\/.*play\./, '//long.')
								.replace('&seconds=30', ''),
						})
					})
					try {
						topic.forEach(data => {
							d.push({
								title: data.name,
								url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").topic()',
								col_type: 'flex_button',
								extra: {
									id: data.id,
								}
							})
						})
					} catch {}
				})
			}
		} catch (e) {
			toast('你干嘛，哎呦喂')
			log(e.messsage)
		}
		setResult(d)
	},
	//视频模块
	video: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		var pg = getParam('page');
		try {
			if (MY_PAGE == 1) {
				let c2 = [{
					title: '推荐&关注&精品&原创&猎奇&制片厂&SM&人兽&少女&恋物&最新&偷窥&人妖&今日头条',
					id: '111&222&333&444&555&666&12&13&14&15&16&17&18&19'
				}];
				Cate(c2, 'c2', d);
				let cate_video = [{
					title: '合集&粉丝团&每日',
					id: 'heji&fans&everyday',
				}]
				var cate_video_title = cate_video[0].title.split('&');
				var cate_video_id = cate_video[0].id.split('&');
				cate_video_title.forEach((title, index) => {
					d.push({
						title: title,
						url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").' +
							cate_video_id[index] + '()',
						col_type: 'text_3',
					})
				})
			}
			if ((getMyVar('c2', '111') == 111)) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/recommend'; //推荐
			} else if (getMyVar('c2', '111') == 222) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/follow'; //关注
			} else if (getMyVar('c2', '111') == 333) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/list_feature'; //精品
			} else if (getMyVar('c2', '111') == 444) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/list_original'; //原创
			} else if (getMyVar('c2', '111') == 555) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/element/list_element'; //猎奇
				var html = post(url, data0);
				var lista = JSON.parse(html).data.list
				lista.forEach(data => {
					if (data.values[0] != null) {
						d.push({
							title: color(data.title),
							img: 'hiker://images/icon_right5',
							col_type: "text_icon",
							url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji4()',
							extra: {
								id: data.id,
							}
						})
						let listb = data.values;
						listb.forEach((data) => {
							d.push({
								title: data.title,
								desc: ((data.created_at) || (data.refresh_at)) +
									'\t\t\t' + data.duration_str + '\t\t\t' + data.tags,
								img: data.thumb_cover_str + image,
								url: data.id + lazy,
								col_type: "movie_2",
							})
						})
					}
				})
			} else if (getMyVar('c2', '111') == 666) {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/featuredzpc'; //制片厂
			} else {
				var data0 =
					 '{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":"","page":"' +
					pg + '","_ver":"v1","tabId":"' + getMyVar('c2', '111') + '"}' ;
				var url = getItem('host') + '/pwa.php/api/MvList/featured';
			}
			var html = post(url, data0);
			var list = JSON.parse(html).data.list
			list.forEach(data => {
				var url = data.preview_video;
				var up = data.member
				d.push({
					title: up.nickname,
					img: up.thumb + image,
					url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji()',
					col_type: "avatar",
					extra: {
						id: up.uuid
					}
				})
				d.push({
					title: data.title,
					desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data
						.duration_str + '\t\t\t' + data.tags,
					img: data.thumb_cover_str + image,
					url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', ''),
					col_type: "pic_1_card",
				})
			})
		} catch (e) {
			log(e.message)
			if (getMyVar('a') == '') {
				var hostArr = ['https://api2.50aapi.com', 'https://api1.ujmfeob.com',
					'https://api3.umwrqsap.com'
				];
				var host = hostArr[Math.floor(Math.random() * hostArr.length)];
				putMyVar('a', '1')
				setItem('host', host)
				refreshPage()
				toast('域名已更新')
			}
		}
	},
	// 短视频模块
	/* 	mini: () => {
			var d = csdown.d;
			eval(csdown.rely(csdown.aes))
			var pg = getParam('page');
			if (storage0.getItem('small_video') == '') {
				let small_video_body =
					'{"system_version":"6.2.1","system_token":"","system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"R3O2lxhWUaSamr8m3ih_1743502699655","system_app_type":"","system_build":"","system_build_id":""}';
				let small_video_url = getItem('host') + '/pwa.php/api/MvList/smallByTag';
				let small_video_data = JSON.parse(post(small_video_url, small_video_body)).data.list;
				storage0.setItem('small_video', small_video_data);
			}
			if (MY_PAGE == 1) {
				let mini_index = storage0.getItem('small_video')[0].value;
				putMyVar('mini_index', mini_index)
				storage0.getItem('small_video').forEach(data => {
					d.push({
						title: getMyVar('短视频', getMyVar('mini_index')) == data.value + '' ? strong(
							data.name, 'FF6699') : data.name,
						url: $('#noLoading#').lazyRule((title, id) => {
							putMyVar('短视频', id);
							refreshPage(false);
							return 'hiker://empty';
						}, data.name, data.value),
						col_type: 'scroll_button',
					})
				})
			}
			var data0 =
				'{"system_version":"6.2.1","system_token":"","system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"R3O2lxhWUaSamr8m3ih_1743502699655","system_app_type":"","system_build":"","system_build_id":"","page":' +
				pg + ',"size":10,"limit":10,"tag":"' + getMyVar('短视频', getMyVar('mini_index')) + '"}';
			var url = getItem('host') + '/pwa.php/api/MvList/smallVideoByTag';
			var html = post(url, data0);
			var list = JSON.parse(html).data.list;
			list.forEach(data => {
				d.push({
					title: data.title,
					desc: data.duration_str + '\t\t\t' + ((data.created_at) || (data.refresh_at)) +
						'\t\t\t' + data.tags,
					img: data.thumb_cover_str + image,
					url: data.preview_video.replace(/\/\/.*play\./, '//long.').replace(
						'&seconds=10', ''),
					col_type: "movie_3",
				})
			})
		}, */
	// 圈子模块
	news: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let pg = getParam('page');
		if (storage0.getItem('news_' + getMyVar('圈子', '0')) == '') {
			let cate_url = getItem('host') + '/pwa.php/api/community/home';
			let cate_body =
				'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","p_type":' +
				getMyVar('圈子', '0') + '}';
			let cate_data = JSON.parse(post(cate_url, cate_body)).data.slice(1);
			storage0.setItem('news_' + getMyVar('圈子', '0'), cate_data)
		}

		if (MY_PAGE == 1) {
			let longclick = [{
				title: getItem('open', '0') == '0' ? '开启禁区' : '关闭禁区',
				js: $.toString(() => {
					if (getItem('open', '0') == '0') {
						confirm({
							title: '是否开启禁区?',
							content: '此频道可能存在令人不适的内容,是否选择开启?',
							confirm: $.toString(() => {
								setItem('open', '0')
								toast('已开启禁区')
								refreshPage(false)
							}),
							cancel: $.toString(() => {})
						})
					} else {
						setItem('open', '0')
						putMyVar('圈子', '0')
						toast('已关闭禁区')
						refreshPage(false)
					}
				})
			}]
			if (getItem('open', '0') == 0) {
				log(getItem('open', '0'))
				var 圈子 = [{
					title: '圈子',
					id: '0',
				}]
			} else {
				var 圈子 = [{
					title: '圈子&禁区',
					id: '0&1',
				}]
			}
			Cate(圈子, '圈子', d, '', longclick);
			let index_n = storage0.getItem('news_' + getMyVar('圈子', '0'))[0].params_list.cate_id + '';
			putMyVar('news_index_' + getMyVar('圈子', '0'), index_n);
			storage0.getItem('news_' + getMyVar('圈子', '0')).forEach(data => {
				d.push({
					title: getMyVar('圈子分类' + getMyVar('圈子', '0'), getMyVar('news_index_' +
						getMyVar('圈子', '0'))) == data.params_list.cate_id + '' ? strong(data
						.name, 'FF6699') : data.name,
					url: $('#noLoading#').lazyRule((title, id, api) => {
						putMyVar('圈子分类' + getMyVar('圈子', '0'), id);
						putMyVar('圈子api' + getMyVar('圈子', '0'), api)
						refreshPage(false);
						return 'hiker://empty';
					}, data.name, data.params_list.cate_id + '', data.api_list),
					col_type: 'scroll_button',
				})
			})
			d.push({
				col_type: 'blank_block'
			})
			let 圈子_type = [{
				title: '热门&推荐&最新&精华&视频&最多收藏',
				id: 'hot&recommend&new&choice&video&favorite',
			}]
			Cate(圈子_type, '圈子_type', d);
			if (storage0.getItem('topics' + getMyVar('圈子', '0') + getMyVar('圈子分类' + getMyVar('圈子', '0'),
					getMyVar('news_index_' + getMyVar('圈子', '0')))) == '') {
				let topics_url = getItem('host') + '/pwa.php/api/community/topics';
				let topics_body =
					'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","tag":"recommend","more":"no","p_type":' +
					getMyVar('圈子', '0') + ',"p_id":' + getMyVar('圈子分类' + getMyVar('圈子', '0'), getMyVar(
						'news_index_' + getMyVar('圈子', '0'))) + ',"page":1,"size":10}';
				let topics_data = JSON.parse(post(topics_url, topics_body)).data.list;
				storage0.setItem('topics' + getMyVar('圈子', '0') + getMyVar('圈子分类' + getMyVar('圈子', '0'),
					getMyVar('news_index_' + getMyVar('圈子', '0'))), topics_data);
			}
			storage0.getItem('topics' + getMyVar('圈子', '0') + getMyVar('圈子分类' + getMyVar('圈子', '0'), getMyVar(
				'news_index_' + getMyVar('圈子', '0')))).forEach(data => {
				d.push({
					title: data.name,
					img: data.thumb + image,
					url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").topic()',
					col_type: 'text_3',
					extra: {
						id: data.id,
					}
				})
			})
		}
		try {
			var data0 =
				'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","page":' +
				pg + ',"tag":"' + getMyVar('圈子_type', 'hot') + '","p_type":' + getMyVar('圈子', '0') +
				',"cate_id":' + getMyVar('圈子分类' + getMyVar('圈子', '0'), getMyVar('news_index_' + getMyVar('圈子',
					'0'))) + '}';
			var url = getItem('host') + '/pwa.php/' + getMyVar('圈子api', storage0.getItem('news_' + getMyVar(
				'圈子', '0'))[0].api_list);
			var html = post(url, data0);
			var list = JSON.parse(html).data;
			list.forEach(data => {
				//图片
				let imgs = data.imgs;
				//视频
				let videos = data.videos;
				//up
				let up = data.user;
				//圈子
				let topic = data.topic_ary;
				d.push({
					title: up.nickname,
					desc: data.refresh_at,
					img: up.thumb_url + image,
					url: 'hiker://empty',
					col_type: "avatar",
					extra: {
						id: data.uid,
					}
				}, {
					title: data.title,
					desc: data.content,
					url: 'hiker://empty@rule=js:$.require("csdown").news_erji()',
					col_type: 'text_1',
					extra: {
						id: data.id,
						videos: videos,
						lineVisible: false,
					}
				})
				imgs.forEach(data => {
					d.push({
						img: data.media_url + image,
						col_type: "pic_3",
						url: data.media_url + image,
					})
				})
				videos.forEach(data => {
					d.push({
						title: '视频▶️',
						img: data.cover + image,
						col_type: "movie_3",
						url: data.media_url.replace(/\/\/.*play\./, '//long.').replace(
							'&seconds=30', ''),
					})
				})
				try {
					topic.forEach(data => {
						d.push({
							title: data.name,
							url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").topic()',
							col_type: 'flex_button',
							extra: {
								id: data.id,
							}
						})
					})
				} catch {}
			})
		} catch (e) {
			log(e.message)
		}
	},
	//圈子二级
	news_erji: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		let videos = MY_PARAMS.videos;
		var data0 =
			'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","id":"' +
			id + '"}';
		var url = getItem('host') + '/pwa.php/api/community/post_detail';
		var html = post(url, data0);
		var data = JSON.parse(html).data;
		//图片
		let imgs = data.imgs;
		d.push({
			title: data.title,
			url: 'hiker://empty',
			col_type: 'rich_text',
		}, {
			title: data.content,
			url: 'hiker://empty',
			col_type: 'long_text',
		})
		if (videos) {
			videos.forEach(data => {
				d.push({
					title: '视频▶️',
					desc: '0',
					img: data.cover + image,
					col_type: "card_pic_1",
					url: data.media_url.replace(/\/\/.*play\./, '//long.').replace(
						'&seconds=30', ''),
				})
			})
		}
		imgs.forEach(data => {
			d.push({
				img: data.media_url + image,
				col_type: "pic_1_full",
				url: data.media_url + image,
			})
		})
		setResult(d)
	},
	topic: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let pg = getParam('page');
		let id = MY_PARAMS.id;
		try {
			if (MY_PAGE == 1) {
				let 圈子 = [{
					title: '热门&推荐&最新&精华&视频&最多收藏',
					id: 'hot&recommend&new&choice&video&favorite',
				}]
				Cate(圈子, '圈子', d)
			}
			var data0 =
				'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","page":' +
				pg + ',"size":12,"limit":12,"tag":"' + getMyVar('圈子', 'hot') + '","topic_id":"' + id + '"}';
			var url = getItem('host') + '/pwa.php/api/community/list_topic_post';
			var html = post(url, data0);
			var list = JSON.parse(html).data;
			list.forEach(data => {
				//图片
				let imgs = data.imgs;
				//视频
				let videos = data.videos;
				//圈子
				let topic = data.topic_ary;
				d.push({
					title: data.title,
					desc: data.content,
					url: 'hiker://empty@rule=js:$.require("csdown").news_erji()',
					col_type: 'text_1',
					extra: {
						id: data.id,
						videos: videos,
						lineVisible: false,
					}
				})
				imgs.forEach(data => {
					d.push({
						img: data.media_url + image,
						col_type: "pic_card_3",
						url: data.media_url + image,
					})
				})
				videos.forEach(data => {
					d.push({
						title: '视频▶️',
						img: data.cover + image,
						col_type: "movie_3",
						url: data.media_url.replace(/\/\/.*play\./, '//long.').replace(
							'&seconds=30', ''),
					})
				})
				try {
					topic.forEach(data => {
						d.push({
							title: data.name,
							url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").topic()',
							col_type: 'flex_button',
							extra: {
								id: data.id,
							}
						})
					})
				} catch {}
			})
		} catch (e) {
			log(e.message)
		}
		setResult(d)
	},
	// 黑料模块	
	heiliao: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let pg = getParam('page');
		if (MY_PAGE == 1) {
			let cate_url = getItem('host') + '/pwa.php/api/contents/list_category';
			let cate_body =
				'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"sVGcMzkHADQjj8EZt1J_1761009442702","system_app_type":"","system_build":"","system_build_id":""}';
			let cate_data = JSON.parse(post(cate_url, cate_body)).data.list;
			cate_data.forEach(data => {
				d.push({
					title: data.name,
					url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").heiliao_erji()',
					col_type: 'scroll_button',
					extra: {
						id: data.mid,
					}
				})
			})
		}
		var data0 =
			'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"sVGcMzkHADQjj8EZt1J_1761009442702","system_app_type":"","system_build":"","system_build_id":"","page":' +
			pg + ',"mid":0,"size":12}';
		var url = getItem('host') + '/pwa.php/api/contents/list_contents';
		var html = post(url, data0);
		var list = JSON.parse(html).data.list.slice(1)
		list.forEach(data => {
			d.push({
				title: data.title,
				img: data.thumb + image,
				url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").heiliao_detail()',
				col_type: "pic_1_card",
				extra: {
					id: data.id
				}
			})
		})
		setResult(d)
	},
	heiliao_erji: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let pg = getParam('page');
		let id = MY_PARAMS.id;
		var data0 =
			'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"sVGcMzkHADQjj8EZt1J_1761009442702","system_app_type":"","system_build":"","system_build_id":"","page":' +
			pg + ',"mid":' + id + ',"size":12}';
		var url = getItem('host') + '/pwa.php/api/contents/list_contents';
		var html = post(url, data0);
		var list = JSON.parse(html).data.list.slice(1)
		list.forEach(data => {
			d.push({
				title: data.title,
				img: data.thumb + image,
				url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").heiliao_detail()',
				col_type: "pic_1_card",
				extra: {
					id: data.id
				}
			})
		})
		setResult(d)
	},
	heiliao_detail: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		var data0 =
			'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"sVGcMzkHADQjj8EZt1J_1761009442702","system_app_type":"","system_build":"","system_build_id":"","id":"' + id + '"}';
		var url = getItem('host') + '/pwa.php/api/contents/detail_content';
		var html = escape4Html(post0(url, data0));
		var detail = JSON.parse(html).data.cur;
		var htmlString = detail.txt
		var videoRegex = /<video[^>]*src\s*=\s*['"]([^'"]*)['"][^>]*>/gi;
		var imgRegex = /<img[^>]*src\s*=\s*['"]([^'"]*)['"][^>]*>/gi;
		var detailText = htmlString.replace(videoRegex, '').replace(imgRegex, '').replace('<br>', '')
		d.push({
			title: detail.title,
			url: 'hiker://empty',
			col_type: 'rich_text',
		})
		var videoMatch;
		while ((videoMatch = videoRegex.exec(htmlString)) !== null) {
			d.push({
				title: "播放视频 ▶",
				url: videoMatch[1],
				col_type: 'text_center_1',
			})
		}
		d.push({
			title: detailText,
			url: 'hiker://empty',
			col_type: 'long_text',
		})
		var imgMatch;
		while ((imgMatch = imgRegex.exec(htmlString)) !== null) {
			d.push({
				img: imgMatch[1] + image,
				url: imgMatch[1] + image,
				col_type: 'pic_1_full',
			})
		}
		setResult(d)
	},
	vodlei: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		if (MY_PAGE == 1) {
			let c5 = [{
        title: 'SM&少女&窥视&人兽&恋物&肛门&真人coser&泄物&人妖&道具&孕妇&泄露门&猎奇&内涵段子&PUA撩妹&中文剧情&女同',
        id: '0&1&2&3&4&5&6&7&8&9&10&11&13&14&15&16&17'
			}];
			Cate(c5, 'c5', d);
		}
		if (storage0.getItem('cate_') == '') {
			var data0 =
				'{"system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_token":"","system_app_type":"","system_build":"","system_build_id":""}';
			var url = getItem('host') + '/pwa.php/api/MvSearch/getStyle';
			var html = post(url, data0);
			var list0 = JSON.parse(html).data;
			storage0.setItem('cate_', list0);
		}
		var list = storage0.getItem('cate_')[getMyVar('c5', '0')].child;
		list.forEach(data => {
			d.push({
				title: data.name,
				url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji3()',
				col_type: "text_3",
				extra: {
					id: data.id,
				}
			})
		})
	},
	heji: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		var pg = getParam('page');
		try {
			var data0 = '{"page":"' + pg +
				'","sort":"new","system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_token":"","system_app_type":"","system_build":"","system_build_id":""}';
			var url = getItem('host') + '/pwa.php/api/compilation/list';
			var html = post(url, data0);
			var list = JSON.parse(html).data;
			list.forEach(data => {
				d.push({
					title: data.title,
					desc: data.date,
					img: data.image + image,
					url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji2()',
					col_type: "pic_1_card",
					extra: {
						id: data.id,
					}
				})
			})
		} catch {}
		setResult(d)
	},
	fans: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		var pg = getParam('page');
		var data0 =
			'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","page":' +
			pg + ',"size":20,"type":"month"}';
		var url = getItem('host') + '/pwa.php/api/club/rank';
		let html = post(url, data0);
		var lista = JSON.parse(html).data;
		lista.forEach((data) => {
			d.push({
				title: color(data.name),
				img: data.thumb + image,
				col_type: "text_icon",
				url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji()',
				extra: {
					id: data.uuid,
				}
			})
		})
		setResult(d)
	},
	erji: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		let pg = getParam('page');
		try {
			if (MY_PAGE == 1) {
				let video_up = [{
					title: '视频&合集&粉丝团专属',
					id: '1&2&3',
				}]
				Cate(video_up, 'video_up', d)
			}
			if (getMyVar('video_up', '1') == 1) {
				var p0 = (pg - 1) * 50;
				var data0 = '{"size":"15","uuid":"' + id +
					'","lastId":"","system_oauth_type":"pwa","lastId":"' + p0 +
					'","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_token":"","system_app_type":"","system_build":"","system_build_id":""}';
				var url = getItem('host') + '/pwa.php/api/Creator/featured';
				var html = post(url, data0);
				var list = JSON.parse(html).data.list;
				list.forEach(data => {
					var url = data.preview_video;
					d.push({
						title: data.title,
						desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t\t' + data
							.duration_str,
						img: data.thumb_cover_str + image,
						url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', '')
					})
				})
			} else if (getMyVar('video_up', '1') == 2) {
				var data0 =
					'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","page":' +
					pg + ',"uuid":"' + id + '"}';
				var url = getItem('host') + '/pwa.php/api/compilation/her';
				var html = post(url, data0);
				var list = JSON.parse(html).data;
				list.forEach(data => {
					d.push({
						title: data.title,
						desc: data.date,
						img: data.image + image,
						url: 'hiker://empty?page=fypage@rule=js:$.require("csdown").erji2()',
						col_type: "pic_1_card",
						extra: {
							id: data.id,
						}
					})
				})
			} else {
				var data0 =
					'{"system_version":"6.2.1","system_token":null,"system_oauth_new_id":"","system_oauth_type":"pwa","system_oauth_id":"aaCidFG3mAldGW405wx_1743160264138","system_app_type":"","system_build":"","system_build_id":"","page":' +
					pg + ',"size":1,"uuid":"' + id + '"}';
				var url = getItem('host') + '/pwa.php/api/club/clubVideos';
				var html = post(url, data0);
				var list = JSON.parse(html).data;
				list.forEach(data => {
					d.push({
						title: data.title,
						desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data
							.duration_str + '\t\t\t' + data.tags,
						img: data.thumb_cover_str + image,
						url: data.preview_video.replace(/\/\/.*play\./, '//long.').replace(
							'&seconds=30', ''),
						col_type: "pic_1_card",
					})
				})
			}
		} catch (e) {
			log(e.message)
		}
		setResult(d)
	},
	erji2: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		let pg = getParam('page')
		var data0 = '{"limit":"10","id":"' + id + '","page":"' + pg +
			'","system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_token":"","system_app_type":"","system_build":"","system_build_id":""}';
		var url = getItem('host') + '/pwa.php/api/compilation/mvlist';

		var html = post(url, data0);
		var list = JSON.parse(html).data;
		list.forEach(data => {
			var url = data.preview_video;
			d.push({
				title: data.title,
				desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data.duration_str,
				img: data.thumb_cover_str + image,
				url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', '')
			})
		})
		setResult(d)
	},
	erji3: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		let pg = getParam('page');
		var data0 = '{"page":"' + pg + '","size":"15","id":"' + id +
			'","orderBy":"id","system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_token":"","system_app_type":"","system_build":"","system_build_id":""}';
		var url = getItem('host') + '/pwa.php/api/MvList/style';
		var html = post(url, data0);
		var list = JSON.parse(html).data.list;
		list.forEach(data => {
			var url = data.preview_video;
			d.push({
				title: data.title,
				desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data.duration_str,
				img: data.thumb_cover_str + image,
				url: url.replace(/\/\/.*play\./, '//long.').replace('&seconds=30', '')
			})
		})
		setResult(d)
	},
	erji4: () => {
		var d = csdown.d;
		eval(csdown.rely(csdown.aes))
		let id = MY_PARAMS.id;
		let pg = getParam('page');
		var data0 = '{"id":"' + id + '","sort":"new","page":"' + pg +
			'","system_oauth_type":"pwa","system_oauth_id":"DJ1iNBf5HiuIjSs7_1715823105441","system_oauth_new_id":"","system_version":"6.2.1","system_app_type":"","system_build":"","system_build_id":""}';
		var url = getItem('host') + '/pwa.php/api/element/list_more';

		var html = post(url, data0);
		var list = JSON.parse(html).data.list;
		list.forEach(data => {
			d.push({
				title: data.title,
				desc: ((data.created_at) || (data.refresh_at)) + '\t\t\t' + data.duration_str,
				img: data.thumb_cover_str + image,
				url: data.id + lazy,
			})
		})
		setResult(d)
	},
}
$.exports = csdown
