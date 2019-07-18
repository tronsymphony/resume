(function($) {
	jQuery(document).ready(function($) {
		// HEADER SEARCH---------------------------------------------------------------------------------------------------
		var search_val;
		var spacestring;
		var searchvali;
		var svgoheader = "<div id=\"svgloader\"><svg width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"lds-ripple\" style=\"background: none;\"><circle cx=\"50\" cy=\"50\" r=\"10.2008\" fill=\"none\" ng-attr-stroke=\"{{config.c1}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#28292f\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"30.9015\" fill=\"none\" ng-attr-stroke=\"{{config.c2}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#0a0a0a\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate></circle></svg></div>";

		function searchiThisHeader(searchvali, searchITag) {
			spacestring = searchvali;
			$('#resultsheader').empty();
			$('#resultsheader').append(svgoheader);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'headerSearchFunction',
					search_string: spacestring,
					search_tag: searchITag,
				},
				success: function(response) {
					$('#resultsheader').empty();
					$('#resultsheader').append(response);
					$('div#resoltuocintainerheader').addClass('resultos-dl');
					$('div#searchi').addClass("researchsown");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}

		function clickAndEnterSubmitHeader() {
			var valueIn = $('input#mainfield').val();
			var regex = /\s+/gi;
			var wordCount = valueIn.trim().replace(regex, ' ').split(' ').length;
			search_val_header = "";
			console.log($("input#mainfield").val());
			search_val_header = search_val_header + $('input#mainfield').val();
			if (valueIn.length > 2 && valueIn != "Default text") {
				$('#resultsheader').empty();
				$('#resultsheader').append(svgoheader);
				$('div#resoltuocintainerheader').addClass('resultos-dl');
				$('div#searchi').addClass("researchsown");
				if (wordCount >= 2) {
					search_val_header += " ";
				}
				searchiThisHeader(search_val_header.trim());
			} else {
				alert('Type in at least 3 characters');
			}
		}
		// ENTER IS PRESS ON FORM
		$('#mainsearch input#mainfield').keypress(function(e) {
			if (e.which == 13) {
				clickAndEnterSubmitHeader();
				console.log('hit eneter');
				return false; //<---- Add this line
			}
		});
		// FORM IS SUBMITTING VIA BUTTON
		$('#mainsearch div#submity').click(function(event) {
			clickAndEnterSubmitHeader();
		});
		// SEARCH HEADER FUNCTIONALITY
		$("a#searchlink").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			if ($('div#resoltuocintainerheader').hasClass("resultos-dl")) {
				$("div#searchheader").removeClass("activesearchheader");
				$('#resultsheader').empty();
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('div#resoltuocintainerheader').removeClass('resultos-dl');
				$('div#searchi').removeClass("researchsown");
				$("div#interiorpage-form").removeClass("activesearch");
				$('#glidersup').removeClass("atciveoverlay");
				$('#search-slider').slick('slickPlay');
			}
			$("#searchi").toggleClass("researchsown");
			$(this).toggleClass("activesearchheader");
			$("div#searchheader").toggleClass("activesearchheader");
		});
		$("#searchioco").on('click', function(event) {
			event.preventDefault();
			console.log("ASDASDASD");
			/* Act on the event */
			if ($('div#resoltuocintainerheader').hasClass("resultos-dl")) {
				$("div#searchheader").removeClass("activesearchheader");
				$('#resultsheader').empty();
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('div#resoltuocintainerheader').removeClass('resultos-dl');
				$('div#searchi').removeClass("researchsown");
				$("div#interiorpage-form").removeClass("activesearch");
				$('#glidersup').removeClass("atciveoverlay");
				$('#search-slider').slick('slickPlay');
			}
			$("#searchi").toggleClass("researchsown");
			$(this).toggleClass("activesearchheader");
			$("div#searchheader").toggleClass("activesearchheader");
		});
		// HEADER SEARCH---------------------------------------------------------------------------------------------------
		// INDUSTRY EXPERTISE
		$(".subtext").hide(0);
		$("a.contentoind").mouseenter(function(event) {
			/* Act on the event */
			$(this).find(".subtext").stop().slideDown(250);
		});
		$("a.contentoind").mouseleave(function(event) {
			/* Act on the event */
			$(this).find(".subtext").stop().slideUp(250);
		});
		// INDUSTRY EXPERTISE
		setTimeout(function() {
			$("header#masthead").addClass("activefade");
		}, 300);
		setTimeout(function() {
			$("h1.ifslogan").addClass("activefade");
		}, 600);
		setTimeout(function() {
			$(".page-headertitle,.welco,div#searchocontent,.bok").addClass("activefade");
		}, 600);
		if ($('[data-toggle="tooltip"]').length) {
			$('[data-toggle="tooltip"]').tooltip();
		}
		if (!localStorage.getItem('cookieDisclaimer233')) {
			$("#cookiedisclaimer").addClass("is-active");
		}
		$("#cookieok").click(function(event) {
			console.log("ASDASDASD");
			localStorage.setItem('cookieDisclaimer233', true);
			$("#cookiedisclaimer").removeClass("is-active");
		});
		// $('li.gchoice_3_8_1 label,li.gchoice_3_8_1 input').live('click', function(event) {
		// 	event.stopPropagation(); //<-- has no effect to the described behavior
		// 	if ($('li.gchoice_3_8_1 input:checked').length > 0) {
		// 		$("ul#input_3_8 input").prop("checked", true);
		// 		console.log($("li.gchoice_3_8_1 input").prop("checked", true));
		// 	} else {
		// 		$("ul#input_3_8 input").prop("checked", false);
		// 	}
		// });
		// QUICK NAV
		var underBar = $("div#nav-under").outerWidth(true);
		var quickNav = $("div#quick-nav");
		var shownDiv = $("div#nav-shown").outerWidth();
		var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		document.body.appendChild(outer);
		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";
		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);
		var widthWithScroll = inner.offsetWidth;
		// remove divs
		outer.parentNode.removeChild(outer);
		var barDeduct = widthNoScroll - widthWithScroll;
		var deduction = 330;
		console.log(underBar);
		$(quickNav).css('right', -deduction);
		var hiddenQuick = false;
		$("div#nav-shown,#overlay-under").click(function(event) {
			/* Act on the event */
			if (hiddenQuick == false) {
				$(quickNav).css('right', 0);
				$("#overlay-under").addClass("launched-overlay");
				hiddenQuick = true;
			} else {
				$(quickNav).css('right', -deduction);
				$("#overlay-under").removeClass("launched-overlay");
				hiddenQuick = false;
			}
		});
		// QUICK NAV
		if ($(window).width() <= 768) {
			$(".rd label").click(function() {
				$('html,body').animate({
					scrollTop: $("div#resulto").offset().top - 200
				}, 'slow');
			});
		}
		var monitorSearchActive = false;
		$('#sublistofmonitors').hide(0);
		// $('.cliocko,#monitorsearch').click(function(event) {
		// 	event.preventDefault();
		// 	$("div#interiorpage-form").toggleClass('activesearch');
		// 	$("#monitorsearch").toggleClass('toggledsearch');
		// 	/* Act on the event */
		// 	$(this).toggleClass('activlik');
		// 	$('#sublistofmonitors').slideToggle();
		// });
		$('.taxmoniotcontainer').hide(0);
		$('h3.taxnam').click(function(event) {
			event.preventDefault();
			/* Act on the event */
			$('.taxmoniotcontainer').slideUp();
			if ($(this).hasClass('activlik')) {
				$('h3.taxnam').removeClass('activlik');
				$(this).removeClass('activlik');
				$(this).closest('.posttaxo').find('.taxmoniotcontainer').slideUp();
			} else {
				$('h3.taxnam').removeClass('activlik');
				$(this).toggleClass('activlik');
				$(this).closest('.posttaxo').find('.taxmoniotcontainer').slideToggle();
			}
		});
		// GA LEADER SECTION FUNCTIONALITY 
		if ($(".my-shufflede").length) {
			$.getScript("//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/1.5.25/jquery.isotope.min.js", function(data, textStatus, jqxhr) {
				/* activate jquery isotope */
				var $container = $('#gacapitalleader').isotope({
					itemSelector: '.galeadercontainer',
					isFitWidth: true
				});
				$(window).smartresize(function() {
					$container.isotope({
						columnWidth: '.col-sm-3'
					});
				});
				$container.isotope({
					filter: '*'
				});
				// filter items on button click
				$('#filters').on('click', 'button', function() {
					$("#filters button").removeClass('activebuttono');
					$(this).addClass('activebuttono');
					var filterValue = $(this).attr('data-filter');
					$container.isotope({
						filter: filterValue
					});
				});
			});
		}
		// LOAD SEARCH RESULTS GA MEMBERS
		$(document).on('click', '.readiga,.readio', function(event) {
			event.preventDefault();
			var targetPost = $(this).data('targetpost');
			$('#targetcontent-gacontent').empty();
			$('#targetcontent-gacontent').fadeOut(0);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'loadgaleaderconent',
					searchTarget: targetPost,
				},
				success: function(response) {
					$('#targetcontent-gacontent').append(response);
					console.log(response);
					setTimeout(function() {
						$('#targetcontent-gacontent').slideDown();
					}, 250);
				}
			});
		});
		// LOAD SEARCH RESULTS GA MEMBERS
		$('.qulinjk').on('click', function(e) {
			// Make sure this.hash has a value before overriding default behavior
			if (this.hash !== "") {
				// Prevent default anchor click behavior
				event.preventDefault();
				// Store hash
				var hash = this.hash;
				var subsci = 100;
				if ($(window).width() <= 768) {
					subsci = 0;
				}
				console.log(hash);
				// Using jQuery's animate() method to add smooth page scroll
				// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
				$('html, body').animate({
					scrollTop: $(hash).offset().top - subsci
				}, 800, function() {
					// Add hash (#) to URL when done scrolling (default click behavior)
					// window.location.hash = hash;
				});
			} // End if
		});
		// GA LEADER SECTION FUNCTIONALITY 
		// TOMBSTONES
		$(".tombstoneimagew").click(function(event) {
			var currentSrc = $(this).attr('src');
			$('.tombist').attr('src', currentSrc);
		});
		// TOMBSTONES
		// CAREER LINK
		// $(".careerlinkajax").click(function(event) {
		// 	event.preventDefault();
		// 	var targetPost= $(this).data('targetpost');
		// 	$('#targetcontent').empty();
		// 	$('#targetcontent').fadeOut(0);
		// 		        $.ajax({
		// 		            type:"POST",
		// 		            url: "/wp-admin/admin-ajax.php",
		// 		            data: {
		// 		                action:'loadcareerscontent', 
		// 		                searchTarget:targetPost,
		// 		            },
		// 		            success:function(response){
		// 		                $('#targetcontent').append(response);
		// 		                console.log(response);
		// 		                setTimeout(function(){
		// 		                	$('#targetcontent').slideDown();
		// 		                },250);
		// 		            }
		// 		        });
		// });
		// CAREER LINK
		// SLICK SLIDER-----------------------------
		function slideSwitch(currentSwitch) {
			switch (currentSwitch) {
				case 0:
					$('#mainfield').attr('placeholder', 'Search for service offering, industry, or team member');
					break;
				case 1:
					$('#mainfield').attr('placeholder', 'Search for service offering, industry, or team member');
					break;
				case 2:
					$('#mainfield').attr('placeholder', 'Search for service offering, industry, or team member');
					break;
				case 3:
					$('#mainfield').attr('placeholder', 'Search for service offering, industry, or team member');
					break;
				case 4:
					$('#mainfield').attr('placeholder', 'Search for service offering, industry, or team member');
					break;
			}
		}
		// On swipe event
		$('#search-slider').on('init', function(event, slick, direction) {
			// console.log(slick.currentSlide);
			$('.rd[data-inputchoice="' + slick.currentSlide + '"]').addClass('active');
			$('.rd[data-inputchoice="' + slick.currentSlide + '"] input').attr('checked', 'checked');
			slideSwitch(slick.currentSlide);
			// left
		});
		// On before slide change
		$('#search-slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
			// console.log(slick);
			$('.rd').removeClass('active');
			$('.rd').attr('checked', false);
			$('.rd[data-inputchoice="' + slick.currentSlide + '"]').addClass('active');
			$('.rd[data-inputchoice="' + slick.currentSlide + '"] input').attr('checked', 'checked');
			slideSwitch(slick.currentSlide);
		});
		// INITIALIZE SLICK SLIDER
		if ($(".page-id-2").length) {
			// $('#search-slider').slick({
			// 	dots: false,
			// 	infinite: true,
			// 	autoplay: true,
			// 	autoplaySpeed: 3333,
			// 	arrows: false,
			// });
		} else {
			// $('#search-slider').slick({
			// 	dots: false,
			// 	infinite: true,
			// 	autoplay: false,
			// 	autoplaySpeed: 3333,
			// 	arrows: false,
			// });
		}
		// GO TO SLIDE
		if ($('.postid-280').length) {
			$('#search-slider').slick('slickGoTo', 1);
		}
		if ($('.postid-1255').length) {
			$('#search-slider').slick('slickGoTo', 3);
		}
		if ($('.postid-282').length) {
			$('#search-slider').slick('slickGoTo', 4);
		}
		if ($('.postid-283').length) {
			$('#search-slider').slick('slickGoTo', 3);
		}
		if ($('.postid-952').length) {
			$('#search-slider').slick('slickGoTo', 3);
		}
		$('.rd').click(function(e) {
			var slideno = $(this).data('inputchoice');
			$('.rd').removeClass('active');
			$('.rd').attr('checked', false);
			// console.log(slideno);
			$('#search-slider').slick('slickGoTo', slideno);
		});
		$('div#landingform input.search-field, div#submity, input[name=buttono]').on('click', function() {
			$('#search-slider').slick('slickPause');
			// console.log('slick paused');
		});
		/*START MAIN SEARCH*/
		// SLICK SLIDER ----------------------------------
		// DESELECT RADIO BUTTON
		var allRadios = document.getElementsByName('buttono');
		var booRadio;
		var x = 0;
		for (x = 0; x < allRadios.length; x++) {
			// allRadios[x].onclick = function() {
			//     if(booRadio == this){
			//         this.checked = false;
			//         booRadio = null;
			//     }else{
			//         booRadio = this;
			//     }
			// };
		}
		// document.getElementById("submity").disabled = true;
		var search_val;
		var spacei;
		var searchVarPassed;
		var searchTag;
		var svgo = "<div id=\"svgloader\"><svg width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"lds-ripple\" style=\"background: none;\"><circle cx=\"50\" cy=\"50\" r=\"10.2008\" fill=\"none\" ng-attr-stroke=\"{{config.c1}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#28292f\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"30.9015\" fill=\"none\" ng-attr-stroke=\"{{config.c2}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#0a0a0a\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate></circle></svg></div>";

		function searchiThis(searchVarPassed, searchITag) {
			$("div#interiorpage-form").addClass("activesearch");
			$('#glidersup').addClass("atciveoverlay");
			spacei = searchVarPassed;
			// console.log(searchVarPassed);
			$('#results').empty();
			$('#results').append(svgo);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'wpa56343_search',
					search_string: spacei,
					search_tag: searchITag,
				},
				success: function(response) {
					$('#results').empty();
					$('#results').append(response);
					$('div#resoltuocintainer').addClass('resultos-dl');
					$('div#searchi').addClass("researchsown");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}

		function clickAndEnterSubmit() {
			var valueIn = $('input.search-field').val();
			var regex = /\s+/gi;
			var wordCount = valueIn.trim().replace(regex, ' ').split(' ').length;
			search_val = "";
			searchTag = "";
			console.log($("input.search-field").val());
			search_val = search_val + $('input.search-field').val();
			if (valueIn.length > 2 && valueIn != "Default text") {
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('#results').empty();
				$('#results').append(svgo);
				$('div#resoltuocintainer').addClass('resultos-dl');
				$('div#searchi').addClass("researchsown");
				if (wordCount >= 2) {
					search_val += " ";
				}
				searchiThis(search_val.trim(), searchTag);
			} else {
				alert('Type in at least 3 characters');
			}
		}
		// ENTER IS PRESS ON FORM
		$('#mainsearch input.search-field').keypress(function(e) {
			if (e.which == 13) {
				clickAndEnterSubmit();
				console.log('hit eneter');
				return false; //<---- Add this line
			}
		});
		// FORM IS SUBMITTING VIA BUTTON
		$('#mainsearch div#submity').click(function(event) {
			clickAndEnterSubmit();
		});
		// SEARCH HEADER FUNCTIONALITY
		// $("a#searchlink").on('click', function(event) {
		// 	event.preventDefault();
		// 	/* Act on the event */
		// 	if($('div#resoltuocintainer').hasClass("resultos-dl")){
		// 		$("div#searchheader").removeClass("activesearchheader");
		// 		$('#results').empty();
		// 		$('.rd.active input').attr('checked', false);
		// 		$(".rd.active").removeClass("active");
		// 		$('div#resoltuocintainer').removeClass('resultos-dl');
		// 		$('div#searchi').removeClass("researchsown");
		// 		$("div#interiorpage-form").removeClass("activesearch");
		// 		$('#glidersup').removeClass("atciveoverlay");
		// 		$('#search-slider').slick('slickPlay');
		// 	}
		// 	$(this).toggleClass("activesearchheader");
		// 	$("div#searchheader").toggleClass("activesearchheader");
		// });
		// $("#searchioco").on('click', function(event) {
		// 	event.preventDefault();
		// 	/* Act on the event */
		// 	if ($('div#resoltuocintainer').hasClass("resultos-dl")) {
		// 		$("div#searchheader").removeClass("activesearchheader");
		// 		$('#results').empty();
		// 		$('.rd.active input').attr('checked', false);
		// 		$(".rd.active").removeClass("active");
		// 		$('div#resoltuocintainer').removeClass('resultos-dl');
		// 		$('div#searchi').removeClass("researchsown");
		// 		$("div#interiorpage-form").removeClass("activesearch");
		// 		$('#glidersup').removeClass("atciveoverlay");
		// 		$('#search-slider').slick('slickPlay');
		// 	}
		// 	$(this).toggleClass("activesearchheader");
		// 	$("div#searchheader").toggleClass("activesearchheader");
		// });
		// SEARCH HEADER FUNCTIONALITY
		// SLIDE CHANGES
		$(document).on("click change", ".rd input[name=buttono]", function() {
			if ($("div#searchheader").length) {
				$("div#searchheader").addClass("activesearchheader");
			}
			$('#results').empty();
			$('#results').append(svgo);
			$('div#resoltuocintainer').addClass('resultos-dl');
			$('div#searchi').addClass("researchsown");
			$('input.search-field').val('');
			search_val = "";
			searchTag = "";
			search_val = null;
			if (document.getElementById("contactChoice1").checked == true) {
				searchTag += document.getElementById("contactChoice1").value;
			} else if (document.getElementById("contactChoice2").checked == true) {
				searchTag += document.getElementById("contactChoice2").value;
			} else if (document.getElementById("contactChoice3").checked == true) {
				searchTag += document.getElementById("contactChoice3").value;
			} else if (document.getElementById("contactChoice4").checked == true) {
				searchTag += document.getElementById("contactChoice4").value;
			} else if (document.getElementById("contactChoice5").checked == true) {
				searchTag += document.getElementById("contactChoice5").value;
			}
			searchiThis(search_val, searchTag);
		});
		// NEW LANDING
		$(document).on("click change", ".rdlandingpage input[name=buttono]", function() {
			$('#resultsland').empty();
			$('#resultsland').append(svgo);
			$('.rdlandingpage.active').removeClass('active');
			$(this).parent().addClass('active');
			$('div#resoltuocintainerld').addClass('resultos-dl');
			$('div#searchi').addClass("searchlanding");
			$('input.search-field').val('');
			search_val = "";
			searchTag = "";
			search_val = null;
			if (document.getElementById("contactChoice1").checked == true) {
				searchTag += document.getElementById("contactChoice1").value;
			} else if (document.getElementById("contactChoice2").checked == true) {
				searchTag += document.getElementById("contactChoice2").value;
			} else if (document.getElementById("contactChoice3").checked == true) {
				searchTag += document.getElementById("contactChoice3").value;
			} else if (document.getElementById("contactChoice4").checked == true) {
				searchTag += document.getElementById("contactChoice4").value;
			} else if (document.getElementById("contactChoice5").checked == true) {
				searchTag += document.getElementById("contactChoice5").value;
			}
			searchiThisLanding(search_val, searchTag);
		});
		$(".rdlandingpage label").click(function() {
			$('html,body').animate({
				scrollTop: $("div#resultold").offset().top - 200
			}, 'slow');
		});
		var svgo = "<div id=\"svgloader\"><svg width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"lds-ripple\" style=\"background: none;\"><circle cx=\"50\" cy=\"50\" r=\"10.2008\" fill=\"none\" ng-attr-stroke=\"{{config.c1}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#28292f\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"30.9015\" fill=\"none\" ng-attr-stroke=\"{{config.c2}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#0a0a0a\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate></circle></svg></div>";

		function searchiThisLanding(searchVarPassed, searchITag) {
			spacei = searchVarPassed;
			$('#resultsland').finish().fadeOut(155);
			$('#resultsland').empty();
			$('#resultsland').append(svgo);
			$('#resultsland').finish().fadeIn(155);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'wpa56343_search',
					search_string: spacei,
					search_tag: searchITag,
				},
				success: function(response) {
					$('#resultsland').finish().fadeOut(155);
					$('#resultsland').empty();
					$('#resultsland').append(response);
					$('#resultsland').finish().fadeIn(155);
					var heighTo = $("div#resultsland").height();
					$("div#resoltuocintainerld").height(heighTo);
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}
		$("div#closild").click(function() {
			$('#resultsland').empty();
			$('#resultsland').empty();
			$('.rdlandingpage.active input').attr('checked', false);
			$(".rdlandingpage.active").removeClass("active");
			$('div#resoltuocintainerld').removeClass('resultos-dl');
			$('div#searchi').removeClass("searchlanding");
			$('.rdlandingpage.active').removeClass('active');
		});
		$(document).on("click", "div#searchi.searchlanding", function() {
			$('#resultsland').empty();
			$('#resultsland').empty();
			$('.rdlandingpage.active input').attr('checked', false);
			$(".rdlandingpage.active").removeClass("active");
			$('div#resoltuocintainerld').removeClass('resultos-dl');
			$('div#searchi').removeClass("searchlanding");
			$('.rdlandingpage.active').removeClass('active');
		});
		// NEW LANDING
		// CLOSE SEARCH
		/*END MAIN SEARCH*/
		/*START INSIGHTS SEARCH BAR*/
		// DESELECT RADIO BUTTON
		var allRadios = document.getElementsByName('buttono');
		var booRadio;
		var x = 0;
		var search_val;
		var spacei;
		var searchVarPassed;
		var searchTag;
		var svgo = "<div id=\"svgloader\"><svg width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"lds-ripple\" style=\"background: none;\"><circle cx=\"50\" cy=\"50\" r=\"10.2008\" fill=\"none\" ng-attr-stroke=\"{{config.c1}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#28292f\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"30.9015\" fill=\"none\" ng-attr-stroke=\"{{config.c2}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#0a0a0a\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate></circle></svg></div>";

		function searchiThisInsight(searchVarPassed, searchITag) {
			$("div#interiorpage-form").addClass("activesearch");
			$('#glidersup').addClass("atciveoverlay");
			spacei = searchVarPassed;
			// console.log(searchVarPassed);
			$('#results').empty();
			$('#results').append(svgo);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'insightssearch',
					search_string: spacei,
					search_tag: searchITag,
				},
				success: function(response) {
					$('#results').empty();
					$('#results').append(response);
					$('div#resoltuocintainer').addClass('resultos-dl');
					$('div#searchi').addClass("researchsown");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}

		function clickAndEnterSubmitInsight() {
			var valueIn = $('#mmoni input.search-field').val();
			var regex = /\s+/gi;
			var wordCount = valueIn.trim().replace(regex, ' ').split(' ').length;
			search_val = "";
			searchTag = "";
			console.log($("input.search-field").val());
			search_val = search_val + $('#input.search-field').val();
			if (valueIn.length > 2 && valueIn != "Default text") {
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('#results').empty();
				$('#results').append(svgo);
				$('div#resoltuocintainer').addClass('resultos-dl');
				$('div#searchi').addClass("researchsown");
				if (wordCount >= 2) {
					search_val += " ";
				}
				searchiThisInsight(search_val.trim(), searchTag);
			} else {
				alert('Type in at least 3 characters');
			}
		}
		// ENTER IS PRESS ON FORM
		$('#insighttext').keypress(function(e) {
			if (e.which == 13) {
				clickAndEnterSubmitInsight();
				console.log('hit enter');
				return false;
			}
		});
		// FORM IS SUBMITTING VIA BUTTON
		$('#submitinsightform').click(function(event) {
			clickAndEnterSubmitInsight();
			return false;
		});
		$("div#closi").click(function() {
			$("div#searchheader").removeClass("activesearchheader");
			$('#results').empty();
			$('.rd.active input').attr('checked', false);
			$(".rd.active").removeClass("active");
			$('div#resoltuocintainer').removeClass('resultos-dl');
			$('div#searchi').removeClass("researchsown");
			$("div#interiorpage-form").removeClass("activesearch");
			$('#glidersup').removeClass("atciveoverlay");
			$('#search-slider').slick('slickPlay');
			$("#searchioco").removeClass("activesearchheader");
			$("div#searchheader").removeClass("activesearchheader");
		});
		$(document).on("click", "div#searchi.researchsown", function() {
			$("div#searchheader").removeClass("activesearchheader");
			$('#results').empty();
			$('.rd.active input').attr('checked', false);
			$(".rd.active").removeClass("active");
			$('div#resoltuocintainer').removeClass('resultos-dl');
			$('div#searchi').removeClass("researchsown");
			$("div#interiorpage-form").removeClass("activesearch");
			$('#glidersup').removeClass("atciveoverlay");
			$('#search-slider').slick('slickPlay');
			$("#searchioco").removeClass("activesearchheader");
			$("div#searchheader").removeClass("activesearchheader");
		});
		/*END INSIGHTS SEARCH BAR*/
		// START
		// MONITOR SEARCH------------------------------------------------------------------------------------
		// DESELECT RADIO BUTTON
		var allRadios = document.getElementsByName('buttono');
		var booRadio;
		var x = 0;
		for (x = 0; x < allRadios.length; x++) {
			// allRadios[x].onclick = function() {
			//     if(booRadio == this){
			//         this.checked = false;
			//         booRadio = null;
			//     }else{
			//         booRadio = this;
			//     }
			// };
		}
		// document.getElementById("submity").disabled = true;
		var search_val;
		var spacei;
		var searchVarPassed;
		var searchTag;
		var svgo = "<div id=\"svgloader\"><svg width=\"200px\"  height=\"200px\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"lds-ripple\" style=\"background: none;\"><circle cx=\"50\" cy=\"50\" r=\"10.2008\" fill=\"none\" ng-attr-stroke=\"{{config.c1}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#28292f\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></circle><circle cx=\"50\" cy=\"50\" r=\"30.9015\" fill=\"none\" ng-attr-stroke=\"{{config.c2}}\" ng-attr-stroke-width=\"{{config.width}}\" stroke=\"#0a0a0a\" stroke-width=\"4\"><animate attributeName=\"r\" calcMode=\"spline\" values=\"0;40\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0 0.2 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate><animate attributeName=\"opacity\" calcMode=\"spline\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1.5\" keySplines=\"0.2 0 0.8 1\" begin=\"0s\" repeatCount=\"indefinite\"></animate></circle></svg></div>";

		function searchiThisMonitor(searchVarPassed, searchITag) {
			$("div#landingformmo").addClass("activesearch");
			$('#glidersup').addClass("atciveoverlay");
			$("div#interiorpage-form").addClass("interiorpageformtoggled");
			spacei = searchVarPassed;
			// console.log(searchVarPassed);
			$('#resultsmo').empty();
			$('#resultsmo').append(svgo);
			$.ajax({
				type: "POST",
				url: "/wp-admin/admin-ajax.php",
				data: {
					action: 'monitorsearch',
					search_string: spacei,
					search_tag: searchITag,
				},
				success: function(response) {
					$('#resultsmo').empty();
					$('#resultsmo').append(response);
					$('div#resoltuocintainermo').addClass('resultos-dl');
					$('div#searchi').addClass("researchsown");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}

		function clickAndEnterSubmitMonitor() {
			var valueIn = $('#insighttextmo').val();
			var regex = /\s+/gi;
			var wordCount = valueIn.trim().replace(regex, ' ').split(' ').length;
			search_val = "";
			searchTag = "";
			console.log($("#insighttextmo").val());
			search_val = search_val + $('#insighttextmo').val();
			if (valueIn.length > 2 && valueIn != "Default text") {
				$('#resultsmo').empty();
				$('#resultsmo').append(svgo);
				$('div#resoltuocintainermo').addClass('resultos-dl');
				$('div#searchi').addClass("researchsown");
				if (wordCount >= 2) {
					search_val += " ";
				}
				searchiThisMonitor(search_val.trim(), searchTag);
			} else {
				alert('Type in at least 3 characters');
			}
		}
		// ENTER IS PRESS ON FORM
		$('#insightformmo input#insighttextmo').keypress(function(e) {
			if (e.which == 13) {
				clickAndEnterSubmitMonitor();
				console.log('hit eneter');
				return false; //<---- Add this line
			}
		});
		// FORM IS SUBMITTING VIA BUTTON
		$('#insightformmo #submitinsightformmo').click(function(event) {
			clickAndEnterSubmitMonitor();
			return false;
		});
		// SEARCH HEADER FUNCTIONALITY
		$("div#closimo").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			if ($('div#resoltuocintainermo').hasClass("resultos-dl")) {
				$("div#searchheader").removeClass("activesearchheader");
				$('#resultsmo').empty();
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('div#searchi').removeClass("researchsown");
				$('#glidersup').removeClass("atciveoverlay");
				$('#search-slider').slick('slickPlay');
				$("div#interiorpage-form").removeClass("interiorpageformtoggled");
				$("div#landingformmo").removeClass("activesearch");
				$("div#resoltuocintainermo").removeClass("resultos-dl");
			}
			$(this).removeClass("activesearchheader");
			$("div#searchheader").removeClass("activesearchheader");
		});
		$("div#searchi").on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			if ($('div#resoltuocintainermo').hasClass("resultos-dl")) {
				$("div#searchheader").removeClass("activesearchheader");
				$("div#interiorpage-form").removeClass("interiorpageformtoggled");
				$("div#landingformmo").removeClass("activesearch");
				$("div#resoltuocintainermo").removeClass("resultos-dl");
				$('#resultsmo').empty();
				$('.rd.active input').attr('checked', false);
				$(".rd.active").removeClass("active");
				$('div#searchi').removeClass("researchsown");
				$('#glidersup').removeClass("atciveoverlay");
				$('#search-slider').slick('slickPlay');
			}
			$(this).removeClass("activesearchheader");
			$("div#searchheader").removeClass("activesearchheader");
		});
		// END
		// MONITOR SEARCH------------------------------------------------------------------------------------
		// NEWS FEED
		function formatDate(value) {
			return value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getFullYear();
		}
		// for (var i = 4 - 1; i >= 0; i--) {
		//     var datef = formatDate(irxmlnewsreleases[i].releasedate);
		//     console.log(datef);
		//     $( "ul.lk" ).prepend( '<li class="ki"><a target="_blank" href="http://ir.brileyfin.com/releasedetail.cfm?ReleaseID='+ irxmlnewsreleases[i].releaseid+'"><div class="contaiv"><div class="dateartgcl">'+ datef+'</div><div class="articletype">'+ irxmlnewsreleases[i].releasetype+'</div><div class="articletitle">'+ irxmlnewsreleases[i].title+'</div></div></a></li>');
		// }
		// var datefeat = formatDate(irxmlnewsreleasedetail[0].releasedate);
		// $( ".realsedate" ).append(datefeat);
		// $( ".featuredtitltes" ).prepend('<a target="_blank" href="http://ir.brileyfin.com/releasedetail.cfm?ReleaseID='+ irxmlnewsreleasedetail[0].releaseid +'">'+irxmlnewsreleasedetail[0].title + '</a>');
		// $( ".fie" ).append(irxmlnewsreleasedetail[0].body);
		// var _href = $(".ram").attr("href");
		// $("a.ram").attr("href", _href + irxmlnewsreleasedetail[0].releaseid);   
		// In this example, if you make an ajax request to the following website
		var myUrl = 'https://clientapi.gcs-web.com/data/d8536f49-3df9-4fbb-ad69-b7e2b9cc5090/News';
		//  But if you make it from a browser, then it will work without problem ...
		// However to make it work, we are going to use the cors-anywhere free service to bypass this
		var proxy = 'https://hidden-brook-69056.herokuapp.com/';
		$.ajax({
			// The proxy url expects as first URL parameter the URL to be bypassed
			// https://cors-anywhere.herokuapp.com/{my-url-to-bypass}
			url: proxy + myUrl,
			complete: function(data) {
				console.log(data);
				for (var i = 10 - 1; i >= 0; i--) {
					var date = new Date(data.responseJSON.data[i].releaseDate.date);
					$("ul.lk").prepend('<li class="ki"><a href="https://brileyfin.gcs-web.com/node/' + data.responseJSON.data[i].id + '" target="_blank"><div class="contaiv"><div class="dateartgcl">' + date.toLocaleDateString("en-US") + '</div><div class="articletitle">' + data.responseJSON.data[i].title + '</div></div></a></li>');
				}
			}
		});
		// NEWS FEED
	});
	// END READY
	jQuery(document).ready(function($) {
		// browser window scroll (in pixels) after which the "back to top" link is shown
		var offset = 300,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = $('.cd-top');
		//hide or show the "back to top" link
		$(window).scroll(function() {
			($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if ($(this).scrollTop() > offset_opacity) {
				$back_to_top.addClass('cd-fade-out');
			}
		});
		//smooth scroll to top
		$back_to_top.on('click', function(event) {
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0,
			}, scroll_top_duration);
		});
	});
	jQuery('#cody-info ul li').eq(1).on('click', function() {
		$('#cody-info').hide();
	});
	// TOMBSTONES JS
	if ($("div#tombstonessection").length) {
		$('div#tombstonessection').slick({
			nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="fa fa-arrow-right"></i></button>',
			prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button"><i class="fa fa-arrow-left"></i></button>',
			dots: false,
			infinite: true,
			autoplay: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			autoplaySpeed: 3333,
			arrows: true,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}, ]
		});
	}
	// TOMBSTONES JS
	// LAtest Tranasctions
	if ($("div#latestranction").length) {
		$('div#latestranction').slick({
			nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="fa fa-arrow-right"></i></button>',
			prevArrow: '<button class="slick-prev slick-arrow" aria-label="prev" type="button"><i class="fa fa-arrow-left"></i></button>',
			dots: false,
			infinite: true,
			autoplay: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplaySpeed: 3333,
			arrows: true,
		});
	}
	//  latest tranasctrons




})(jQuery);


