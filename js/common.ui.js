// html엘리먼트 ie7,8인식;
 document.createElement('header');
 document.createElement('nav');
 document.createElement('article');
 document.createElement('section');
 document.createElement('aside');
 document.createElement('footer');

// ie css-hack
var ua = navigator.userAgent,
  doc = document.documentElement;
if ((ua.match(/MSIE 10.0/i))) {
	doc.className = doc.className + " ie10";
} else if((ua.match(/MSIE 9.0/i))) {
	doc.className = doc.className + " ie9";
} else if((ua.match(/MSIE 8.0/i))) {
	doc.className = doc.className + " ie8";
} else if((ua.match(/MSIE 7.0/i))) {
	doc.className = doc.className + " ie7";
} else if((ua.match(/rv:11.0/i))){
	doc.className = doc.className + " ie11";
}

//Tab
$.fn.uxeTabs = function (options) {
	var settings = $.extend({
		'selector' : 'js-tabs',
		'menuSelector': '.list-item-tab',
		'menuBtnSelector' : '.list-item-btn',
		'mainTargetAttribute' : 'name',
		'activeTabMenuClass': 'is-selected',
		'tabsContentSlector' : '.list-item-btn',
		'activeTabContentClass' : 'active',
		'speed': 0,
		'autoFirstActivate': false,
		'firstActiveIndex':0,
		'useSubTarget' : false,
		'useSubTargetAttribute' : 'data-subtarget',
		'subtargetClass' : 'is-selected',
		'navClickScrollToTabsTop' :false
	}, options);
	return this.each(function(){
		var $this = $(this);
		var $navs = $this.find(settings.menuSelector);
		$this.addClass(settings.selector);
		if(settings.autoFirstActivate === true){
			var fisrtMenuElement = $this.find(settings.menuSelector).eq(settings.firstActiveIndex);
			var fisrtHash = fisrtMenuElement.find('.list-item-btn').attr(settings.mainTargetAttribute);
			fisrtMenuElement.addClass(settings.activeTabMenuClass).siblings().removeClass(settings.activeTabMenuClass);
			$this.find(fisrtHash).addClass(settings.activeTabContentClass);
			if(settings.useSubTarget===true){
				var $firstsubTarget = $(fisrtMenuElement.find('.list-item-btn').attr(settings.useSubTargetAttribute));
				$firstsubTarget.addClass(settings.subtargetClass);
			}
		};
		$navs.find(settings.menuBtnSelector).click(function(e){
			e.preventDefault();
			var hash = $(this).attr(settings.mainTargetAttribute);
			var $tabContent = $this.find(settings.tabsContentSlector);

			$navs.removeClass(settings.activeTabMenuClass);
			$tabContent.removeClass(settings.activeTabContentClass);
			$(this).parents(settings.menuSelector).addClass(settings.activeTabMenuClass);
			$(hash).addClass(settings.activeTabContentClass);

			if(settings.useSubTarget===true){
				var $subTarget = $($(this).attr(settings.useSubTargetAttribute));
				$this.find($subTarget).addClass(settings.subtargetClass);
			}
		});
	});
};

//아코디언 메뉴
$.fn.uxeAccordionMenu = function (options) {
	var settings = $.extend({
		'selector' : 'js-accordion',
		'itemSelector' : '.section-info-item',
		'itemClass': 'js-accordion-item',
		'navigation' : '.btn-accordion',
		'activeItemClass': 'active',
		'clickedShowOnly': false
	}, options);
	return this.each(function(){
		var $this = $(this);
		var $nav = $(this).find(settings.navigation);
		$this.addClass(settings.selector).find(settings.itemSelector).addClass(settings.itemClass);
		$nav.each(function(){
			$(this).click(function(e){
				e.preventDefault();
				if(settings.clickedShowOnly === true){
					$(this).parents('.'+settings.itemClass).siblings().removeClass(settings.activeItemClass);
				}
				$(this).parents('.'+settings.itemClass).toggleClass(settings.activeItemClass);
			});
		});
	});
};

var APTNL = (function() {
		var callLayer = function() {
			var btnLayer = document.querySelectorAll('[data-layer]');
			for (var i = 0; i < btnLayer.length; i++) {
				btnLayer[i].addEventListener('click', function(e) {
					var targetId = this.dataset.layer;
					var targetLayer = document.querySelector('#' + targetId);
					targetLayer.classList.add('showing');
					console.log($(targetLayer));
					if ($(targetLayer).is('.layer-area, #cartLayer')) {
						$('html, body').addClass('scroll-off');
					}
				});
			}
			var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close');
			for (var i = 0; i < btnLayerClose.length; i++) {
				btnLayerClose[i].addEventListener('click', function(e) {
					var targetElem = e.target;
					while (!targetElem.classList.contains('layer_section')) {
						targetElem = targetElem.parentNode;
						if (targetElem.nodeName == 'BODY') {
							targetElem = null;
							return;
						}
					}
					targetElem.classList.remove('showing');
				})
			}
		};
		return {
			callLayer: callLayer,
		}
	}
)();

// tollTipLayer
var tollTipLayer = function() {
	var btnTooltip = document.querySelectorAll('[data-tooltip]');
	var targetLayer = null;
	for (var i = 0; i < btnTooltip.length; i++) {
		btnTooltip[i].addEventListener('click', function(e) {
			e.stopPropagation();
			var targetId = this.dataset.tooltip;
			targetLayer = document.querySelector('#' + targetId);
			targetLayer.classList.toggle('is-showing');
		});
	}
	document.body.addEventListener('click', function(evt) {
		var noRedirect = '.tooltip-layer, .tooltip-cont, .tooltip-txt';
		if (!evt.target.matches(noRedirect)) {
			if (targetLayer == null)
				return;
			targetLayer.classList.remove('is-showing');
		}
	})
};


$(document).ready(function(){
	$('.box-tab').uxeTabs({
		'tabsContentSlector':'.tab-contents',
		'useSubTarget': true,
		'autoFirstActivate': true,
		'navClickScrollToTabsTop':true
	});
	$('.box-tab-b').uxeTabs({
		'menuSelector': '.list-item-tab-b',
		'menuBtnSelector' : '.list-item-btn-b',
		'tabsContentSlector':'.tab-contents-b',
		'useSubTarget': true,
		'autoFirstActivate': true,
		'navClickScrollToTabsTop':true
	});
	$('.marker-structure-a').on('click', function (e) {
		$('.box-structure-info').addClass('open');
	});
	$('.box-structure-info .btn-layer-close').on('click', function (e) {
		$('.box-structure-info').removeClass('open');
	});
	// 비교분석
	$('.btn-compare').on('click', function (e) {
		$('.compare-analysis').addClass('open');
		$('.layer_section').removeClass('showing');
	});
	$('.btn-compare-close').on('click', function (e) {
		$('.compare-analysis').removeClass('open');
	});

	//  회사소개 메뉴
	$('.btn-nav-open').on('click', function (e) {
		$(this).toggleClass('close');
		$('.company-header').toggleClass('nav-m-view');
	});

	// 아코디언
	$('.box-detailed-index').uxeAccordionMenu({
		'clickedShowOnly': true,
		'itemSelector' : '.accordion-group'
	});
	// 슬라이더
	$( "#slider-a" ).slider({
		range: "min",
		value: 400,
		min: 1,
		max: 700,
		slide: function( event, ui ) {
			$( "#slider-value-a" ).val( "일자 : " + ui.value );
		}
	});
	$( "#slider-value-a" ).val( "일자 : " + $( "#slider-a" ).slider( "value" ) );

	$( "#slider-b" ).slider({
		range: "min",
		value: 9,
		min: 1,
		max: 24,
		slide: function( event, ui ) {
			$( "#slider-value-b" ).val( "시간 : " + ui.value );
		}
	});
	$( "#slider-value-b" ).val( "시간 : " + $( "#slider-b" ).slider( "value" ) );
})