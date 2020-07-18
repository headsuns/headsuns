/*
 * $Id$: main.js;
 * (c) 2020 Headsuns
 */

(function(window, document, undefined) {

	var UNSPLASH_API_URL = 'https://api.unsplash.com',
		UNSPLASH_CLIENT_ID = 'c4923613b4f9b0e8c9b5a10f632b73978e31937ff2c371226a7228345bf42805',
		UNSPLASH_PHOTO_RANDOM_URL = UNSPLASH_API_URL + '/photos/random?client_id=' + UNSPLASH_CLIENT_ID + '&query=mountain';

	try {

		// 测试执行，防止抛出错误影响浏览器渲染
		var ajax = new XMLHttpRequest();
		ajax.open('GET', UNSPLASH_PHOTO_RANDOM_URL, true);
		ajax.onload = function() {
			// parse
			if (ajax.status >= 200 && ajax.status < 400) {
				var data = JSON.parse(ajax.responseText);
			} else {
				var data = {
					width: 6000,
					height: 4000,
					color: "#0F2E37",
					description: "Pale mountain silhouettes",
					urls: {
						raw: "https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNzQzMH0",
						full: "https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEwNzQzMH0",
						regular: "https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwNzQzMH0"
					},
					user: {
						name: "ZS",
						links: {
							html: "https://unsplash.com/@kovacsz1"
						}
					}
				}
			}
			// load
			var image = new Image();
			image.onload = function() {
				// 只有首页触发加载背景图片
				var app = document.body.querySelector('#app');
				if (!!app) {
					document.body.style.backgroundImage = `url(${data.urls.regular})`;
					app.insertAdjacentHTML('beforeend', `<div class="source">Photo by <a href="${data.user.links.html}?utm_source=headsuns&utm_medium=referral" target="_blank">${data.user.name}</a> on <a href="https://unsplash.com?utm_source=headsuns&utm_medium=referral" target="_blank">Unsplash</a></div>`)
				}
			}
			image.src = data.urls.regular;
		}
		ajax.send();

	} catch (exception) {

		// 此处可以引入 GTM 来记录 js runtime error
		window.console || window.console.log || window.console.log('headsuns', 'backgroundImage', 'loading error.')
	}

	

})(window, document);