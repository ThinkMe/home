var iUp = (function () {
	var time = 0,
		duration = 150,
		clean = function () {
			time = 0;
		},
		up = function (element) {
			setTimeout(function () {
				element.classList.add("up");
			}, time);
			time += duration;
		},
		down = function (element) {
			element.classList.remove("up");
		},
		toggle = function (element) {
			setTimeout(function () {
				element.classList.toggle("up");
			}, time);
			time += duration;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();

function getBingImages(imgUrls) {
	/**
	 * 获取Bing壁纸
	 * 先使用 GitHub Action 每天获取 Bing 壁纸 URL 并更新 images.json 文件
	 * 然后读取 images.json 文件中的数据
	 */
	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var panel = document.querySelector('#panel');
	if (isNaN(index) || index == 7) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "https://www.cn.bing.com" + imgUrl;
	panel.style.background = "url('" + url + "') center center no-repeat #666";
	panel.style.backgroundSize = "cover";
	sessionStorage.setItem(indexName, index);
}

function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
}

document.addEventListener('DOMContentLoaded', function () {
	// 获取一言数据
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(this.responseText);
			document.getElementById('description').innerHTML = res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」";
		}
	};
	xhr.open("GET", "https://v1.hitokoto.cn", true);
	xhr.send();

	var iUpElements = document.querySelectorAll(".iUp");
	iUpElements.forEach(function (element) {
		iUp.up(element);
	});

	var avatarElement = document.querySelector(".js-avatar");
	avatarElement.addEventListener('load', function () {
		avatarElement.classList.add("show");
	});
});

var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
	if (navigationWrapper.style.display == "block") {
		navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			navigationWrapper.classList.toggle('visible');
			navigationWrapper.classList.toggle('animated');
			navigationWrapper.classList.toggle('bounceOutUp');
			navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
		});
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceOutUp');
	} else {
		navigationWrapper.classList.toggle('visible');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
	}
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-angleup');
	btnMobileMenu.classList.toggle('animated');
	btnMobileMenu.classList.toggle('fadeIn');
});

document.addEventListener('DOMContentLoaded', function() {
    // 文字内容数组
    const texts = [
        "在一切痛苦與歡樂之下，生命仍然要靜靜地流逝，永不再重回。",
        "应该有更好的方式开始新的一天，而不是千篇一律地在每个早晨醒来。",
        "试着每天给自己一个希望，也许生活就会不再一样。",
        "如果害怕人生的暴风雨，就无法找到那一方安宁土乐。",
        "对未来的真正慷慨，是把一切献给现在。"
    ];

    // 获取按钮元素
    const blogButton = document.querySelector('.texts');
    
    // 当前显示的文本索引
    let currentIndex = 0;
    
    // 定时器ID
    let intervalId;
    
    // 是否正在显示文字
    let loading = false;
    
    // 打字机效果显示文本
    function typeWriter(text) {	
        // 清空按钮内容
        blogButton.textContent = '';
        
        // 当前显示的字符位置
        let i = 0;
        
        // 定时器显示每个字符
        const timer = setInterval(function() {
            if (i < text.length) {
                blogButton.textContent += text.charAt(i);
                i++;
            } else {
                // 打字完成，清除定时器
                clearInterval(timer);
                loading = false; // 标记为不正在显示文字
            }
        }, 100); // 每个字符显示的间隔时间（毫秒）
    }
    
    // 更新按钮文本
    function updateButtonText() {
        // 如果正在显示文字，不执行
        if (loading) return;
        
        loading = true; // 标记为正在显示文字
        
        // 暂停定时任务
        clearInterval(intervalId);
        
        // 按顺序选择文本
        const text = texts[currentIndex];
        typeWriter(text);
        
        // 更新索引，循环显示
        currentIndex = (currentIndex + 1) % texts.length;
        
        // 恢复定时任务
        intervalId = setInterval(function() {
            updateButtonText();
        }, intervalTime);
    }
    
    // 设置定时器时间
    const intervalTime = 10000; // 10秒
    
    // 页面加载时更新按钮文本
    setTimeout(updateButtonText, 3000);
    
    // 设置定时器，每隔intervalTime秒自动更新按钮文本
    intervalId = setInterval(function() {
        updateButtonText();
    }, intervalTime);
    
    // 点击按钮时更新文本
    blogButton.addEventListener('click', function() {
        // 防止重复点击时打断当前打字效果
        if (!loading) {
            updateButtonText();
        }
    });
    
    // 当用户离开页面时清除定时器，避免内存泄漏
    window.addEventListener('beforeunload', function() {
        clearInterval(intervalId);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. 把下面日期改成你“开始躺平”的那一天
    const targetDate = '2009-01-28';   // ← 改这里，格式 YYYY-MM-DD

    // 2. 计算天数
    function calcDays() {
      const msPerDay = 24 * 60 * 60 * 1000;
      const days = Math.floor((Date.now() - new Date(targetDate)) / msPerDay);
      return days;
    }

    // 3. 写进页面
    document.getElementById('day').textContent =
      `${calcDays()}`;
});