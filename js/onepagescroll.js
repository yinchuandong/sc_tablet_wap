var onepagescroll = {
	index: 0,
	height: 0,
	body: null,
	main: null,
	isMoving: false,
	startY: null,
	imgUrl: './images/',
	progress: 0,
	page: 1,
	init: function() {
		var self = this;
		self.height = $(".page1").height();
		self.body = $("body");
		self.main = $(".main");
		self.preload();
		self.bindEvent();
	},
	getPage: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return 1;
	},
	preload: function() {
		var self = this;
		var url = self.imgUrl;
		var page = self.getPage('index');
		var imgArr = ['text', 'title', 'windows', 'logo', 'bg2', 'list', 'bg1', 'arrow', 'android'];
		if (window.devicePixelRatio > 1.25) {
			for (var i = 0; i < imgArr.length; i++) {
				imgArr[i] += '@2x.png';
			}
		} else {
			for (var i = 0; i < imgArr.length; i++) {
				imgArr[i] += '.png';
			}
		}
		for (var i = 0; i < imgArr.length; i++) {
			var img = new Image();
			img.src = url + imgArr[i];
			img.onload = function() {
				self.progress += 90 / imgArr.length;
				if (self.progress >= 90) {
					// $.ajax({
					// 	url:'background.mp3',
					// 	type:'get',
					// 	// dataType:'',
					// 	// data:{},
					// 	success:function(){
					// 		$("#music").attr('src','background.mp3');
					// 		if (page == 1) {
					// 			$(".preload").hide();
					// 			$(".page").show();
					// 			$(".android").addClass('gpu android-animate');
					// 			$(".windows").addClass('gpu windows-animate');
					// 			$(".text").addClass('gpu text-animate');
					// 		} else {
					// 			$(".preload").hide();
					// 			$(".page").show();
					// 			self.main.css({
					// 				'top': '-100%'
					// 			});
					// 			$(".list").children().each(function(index) {
					// 				var $ele = $(this);
					// 				$ele.css({
					// 					'animation-delay': '0.' + 3 * index + 's',
					// 					'-webkit-animation-delay': '0.' + 3 * index + 's'
					// 				});
					// 				$ele.addClass("list-animate");
					// 			});
					// 		}							
					// 	}
					// });

					if (page == 1) {
						$(".preload").hide();
						$(".page").show();
						$(".android").addClass('gpu android-animate');
						$(".windows").addClass('gpu windows-animate');
						$(".text").addClass('gpu text-animate');

					} else {
						$(".preload").hide();
						$(".page").show();
						self.main.css({
							'top': '-100%'
						});
						$(".list").children().each(function(index) {
							var $ele = $(this);
							$ele.css({
								'animation-delay': '0.' + 3 * index + 's',
								'-webkit-animation-delay': '0.' + 3 * index + 's'
							});
							$ele.addClass("list-animate");
						});
					}		
				}
				$(".progress").html(Math.floor(self.progress) + "%");
			}
		}
	},
	bindEvent: function() {
		var self = this;
		self.body.on("touchstart",
		function(e) {
			self.onTouchStart(e)
		});
		self.body.on("touchmove",
		function(e) {
			self.onTouchMove(e)
		});
		$(".arrow").click(function() {
			self.index++;
			self.main.animate({
				top: ( - 1) * self.index * self.height + "px"
			},
			function() {
				$(".android").removeClass("android-animate");
				$(".windows").removeClass("windows-animate");
				$(".text").removeClass("text-animate");
				$(".list").children().each(function(index) {
					var $ele = $(this);
					$ele.css({
						'animation-delay': '0.' + 3 * index + 's',
						'-webkit-animation-delay': '0.' + 3 * index + 's'
					});
					$ele.addClass("list-animate");
				});
			})
		})
	},
	onTouchStart: function(e) {
		var self = this;
		self.startY = e.originalEvent.targetTouches[0].pageY;
		self.isMoving = true
	},
	cancelTouch: function() {
		var self = this;
		self.startY = null;
		self.isMoving = false
	},
	onTouchMove: function(e) {
		var self = this;
		if (self.isMoving) {
			var index = self.index;
			var height = self.height;
			var y = e.originalEvent.targetTouches[0].pageY;
			var dy = self.startY - y;
			if (Math.abs(dy) >= 50) {
				self.cancelTouch();
				if (dy > 0) {
					if (index == 0) {
						self.index++;
						self.main.animate({
							top: ( - 1) * self.index * height + "px"
						},
						function() {
							$(".android").removeClass("android-animate");
							$(".windows").removeClass("windows-animate");
							$(".text").removeClass("text-animate");
							$(".list").children().each(function(index) {
								var $ele = $(this);
								$ele.css({
									'animation-delay': '0.' + 3 * index + 's',
									'-webkit-animation-delay': '0.' + 3 * index + 's'
								});
								$ele.addClass("list-animate");
							});
						})
					}
				} else {
					if (index == 1) {
						self.index--;
						self.main.animate({
							top: ( - 1) * self.index * height + "px"
						},
						function() {
							$(".android").addClass("android-animate");
							$(".windows").addClass("windows-animate");
							$(".text").addClass("text-animate");
							$(".list").children().removeClass("list-animate")
						})
					}
				}
			}
		}
	}
};
