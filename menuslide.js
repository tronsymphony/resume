jQuery(document).ready(function($) {


 window.onorientationchange = function() { 
        var orientation = window.orientation; 
            switch(orientation) { 
                case 0:
                case 90:
                case -90: window.location.reload(); 
                break; } 
    };
    
    // Main Menu Bar Dragged Up
  function swipeMenu(element) {
            var self = this;
            element = $(element);
            var container = $('#mainpanels');
            var panes = $('#mainpanels > .page');
            var pane_width = 0;
            var pane_count = panes.length;
            var current_pane = 0;
            this.init = function() {
                setPaneDimensions();
                $(window).on('load resize orientationchange', function() {
                    // setPaneDimensions();
                });

            };

            function setPaneDimensions() {
                pane_width = element.width();
                panes.each(function() {
                    $(this).width(pane_width);
                });
                container.width(pane_width * pane_count);
            };
            this.showPane = function(index, animate) {
                index = Math.max(0, Math.min(index, pane_count - 1));
                current_pane = index;
                var offset = -(100 / pane_count * current_pane);
                setContainerOffset(offset, animate);

                $('.locitem').removeClass('active');
                $('.locitem[data-slideselect="' + current_pane + '"]').toggleClass('active');

            };

            function setContainerOffset(percent, animate) {
                container.removeClass('animate');
                if (animate) {
                    container.addClass('animate');
                }
                if (Modernizr.csstransforms3d) {
                    container.css('transform', 'translate3d(' + percent + '%,0,0) scale3d(1,1,1)');
                } else if (Modernizr.csstransforms) {
                    container.css('transform', 'translate(' + percent + '%,0)');
                } else {
                    var px = pane_width * pane_count / 30 * percent;
                    container.css('left', px + 'px');
                }
            }

            this.next = function() {
                return this.showPane(current_pane + 1, true);
            };
            this.prev = function() {
                return this.showPane(current_pane - 1, true);
            };

            function handleHammer(ev) {
                // ev.gesture.preventDefault();
                switch (ev.type) {
                    case 'dragright':
                    case 'dragleft':

                        var pane_offset = -(100 / pane_count) * current_pane;
                        var drag_offset = 1555 / pane_width * ev.gesture.deltaX / pane_count;
                        if (current_pane == 0 && ev.gesture.direction == 'right' || current_pane == pane_count - 1 && ev.gesture.direction == 'left') {
                            drag_offset *= 0.2;
                        }
                        setContainerOffset(drag_offset + pane_offset);
                        break;
                    case 'swipeleft':
                        self.next();
                        ev.gesture.stopDetect();
                        break;
                    case 'swiperight':
                        self.prev();
                        ev.gesture.stopDetect();
                        break;
                    case 'release':
                        if (Math.abs(ev.gesture.deltaX) > pane_width / 2) {

                            if (ev.gesture.direction == 'right') {
                                self.prev();
                            } else {
                                self.next();
                            }
                        } else {
                            self.showPane(current_pane, true);
                        }
                        break;
                }
            }
            new Hammer(element[0], { drag_lock_to_axis: true }).on('release dragleft dragright swipeleft swiperight', handleHammer);
        }
        var swipeMenu = new swipeMenu('#mainpanels');
        swipeMenu.init();
        swipeMenu.showPane(0, false);



        // CHANGE IN DRAG AMOUNT
        var heg = $('div#swipemenu').height() - 300;


        $(window).on("orientationchange resize ", function(){
                    var paneHeight = $('#swipemenu').height() - $('.grabmenubar').outerHeight();
                    /* Act on the event */

                    if($('div#hidcontainer').hasClass('showcont')){
                        if (Modernizr.csstransforms3d) {
                            $('#swipemenu').css('transform', 'translate3d(0,' + -paneHeight + 'px,0) scale3d(1,1,1)');
                        } else if (Modernizr.csstransforms) {
                            $('#swipemenu').css('transform', 'translate(0,' + -paneHeight + 'px)');
                        } else {
                            var px = pane_width * pane_count / 30 * -paneHeight;
                            $('#swipemenu').css('bottom', px + 'px');
                        }
                    } else {
                        if (Modernizr.csstransforms3d) {
                            $('#swipemenu').css('transform', 'translate3d(0,' + 0 + 'px,0) scale3d(1,1,1)');
                        } else if (Modernizr.csstransforms) {
                            $('#swipemenu').css('transform', 'translate(0,' + 0 + 'px)');
                        } else {
                            var px = pane_width * pane_count / 30 * 0;
                            $('#swipemenu').css('bottom', px + 'px');
                        }
                    }

        });
        // MAIN DRAG BAR UP
        var paneHeight = $('#swipemenu').height() - $('.grabmenubar').outerHeight();

 
        
        function swipeBar(element) {
            var self = this;
            
            element = $(element);
            var container = $('#swipemenu');
            var panes = $('#swipemenu');
            var pane_width = pane_width = element.height();
            var pane_count = 2;
            var current_pane = 0;

            this.init = function() {};

            function setPaneDimensions() {};

            this.showPane = function(index, animate) {
                index = Math.max(0, Math.min(index, pane_count - 1));

                current_pane = index;
                var offset = (paneHeight * current_pane);
                setContainerOffset(offset, animate);

            };

            function setContainerOffset(percent, animate) {
                container.removeClass('animate');
                if (animate) {
                    container.addClass('animate');
                }

                if (Modernizr.csstransforms3d) {
                    container.css('transform', 'translate3d(0px,' + percent + 'px,0) scale3d(1,1,1)');
                } else if (Modernizr.csstransforms) {
                    container.css('transform', 'translate(0,' + percent + 'px');
                } else {
                    container.css('bottom', percent + 'px');
                }
            }

            function setContainerOffsetDown(percent, animate) {
        
                container.removeClass('animate');

                if (animate) {
                    container.addClass('animate');
                }

                if (Modernizr.csstransforms3d) {
                    container.css('transform', 'translate3d(0,' + -heg + 'px,0) scale3d(1,1,1)');
                } else if (Modernizr.csstransforms) {
                    container.css('transform', 'translate(0,' + -heg + 'px');
                } else {
                    container.css('bottom', -heg + 'px');
                }

            }
            // SWIPE CLASSES
            this.up = function() {
                $('span#menum').addClass('liftedup');
                $('#overlay').addClass('liftedup');
                $('body').addClass('closescroll');
                $('#touchdisabl').addClass('liftedup');
                $('div#hidcontainer').addClass('showcont');
                $('.logok').addClass('liftedup');
                $('div#page , div#quicknavtext , div#sidebartoggle').addClass('liftedup');
                var paneHeight = $('#swipemenu').height() - $('.grabmenubar').outerHeight();
                setContainerOffset(-paneHeight, true);
                $('div#page , div#quicknavtext , div#sidebartoggle,#swipemenu').addClass('liftedup');

            };
            // SWIPE CLASSES
            this.down = function() {
                $('span#menum').removeClass('liftedup');
                $('#overlay').removeClass('liftedup');
                $('body').removeClass('closescroll');
                $('#touchdisabl').removeClass('liftedup');
                $('div#hidcontainer').removeClass('showcont');
                $('.logok').removeClass('liftedup');
                $('div#page , div#quicknavtext , div#sidebartoggle').removeClass('liftedup');
                setContainerOffset(0, true);
                $('div#page , div#quicknavtext , div#sidebartoggle,#swipemenu').removeClass('liftedup');
            };

            function handleHammerBar(ev) {
                ev.gesture.preventDefault();
                switch (ev.type) {

                    case 'dragup':
                        container.addClass('animate');
                        if (Modernizr.csstransforms3d) {
                            container.css('transform', 'translate3d(0px,' + ev.gesture.deltaY + 'px,0) ');
                        } else if (Modernizr.csstransforms) {
                            container.css('transform', 'translate(0,' + ev.gesture.deltaY + 'px');
                        } else {
                            container.css('bottom', ev.gesture.deltaY + 'px');
                        }


                        break;

                    case 'dragdown':
                        container.addClass('animate');
                        var delyaY = paneHeight - ev.gesture.deltaY;

                        if (Modernizr.csstransforms3d) {
                            container.css('transform', 'translate3d(0px,' + -delyaY + 'px,0) scale3d(1,1,1)');
                        } else if (Modernizr.csstransforms) {
                            container.css('transform', 'translate(0,' + -delyaY + 'px');
                        } else {
                            container.css('bottom', -delyaY + 'px');
                        }
                        break;

                    case 'swipeup':
                        self.up();
                        container.removeClass('animate');
                        ev.gesture.stopDetect();
                        break;

                    case 'swipedown':
                        self.down();
                        container.removeClass('animate');
                        ev.gesture.stopDetect();
                        break;

                    case 'release':
                        container.removeClass('animate');
                        var hasC = $('span#menum').hasClass('liftedup');

                        if (hasC == false) {

                            setContainerOffset(-paneHeight);
                            $('span#menum').addClass('liftedup');
                            $('#overlay').addClass('liftedup');
                            $('body').addClass('closescroll');
                            $('#touchdisabl').addClass('liftedup');
                            $('div#hidcontainer').addClass('showcont');
                            $('.logok').addClass('liftedup');
                            $('div#page , div#quicknavtext , div#sidebartoggle,#swipemenu').addClass('liftedup');
                        } else {
                            setContainerOffset(0);
                            $('span#menum').removeClass('liftedup');
                            $('#overlay').removeClass('liftedup');
                            $('body').removeClass('closescroll');
                            $('#touchdisabl').removeClass('liftedup');
                            $('div#hidcontainer').removeClass('showcont');
                            $('.logok').removeClass('liftedup');
                            $('div#page , div#quicknavtext , div#sidebartoggle,#swipemenu').removeClass('liftedup');
                        }

                        break;
                }


            }

            new Hammer(element[0], { drag_lock_to_axis: true }).on('release dragup swipeup swipedown dragdown ', handleHammerBar);
        }
        var swipeBar = new swipeBar('span#menum');
        swipeBar.init();




        var paneHeight = $('#swipemenu').height()  - $('.grabmenubar').outerHeight();

        var visited = $.cookie('visited'); // create the cookie
        setTimeout(function() {
            $('#mainlogo').addClass('loaded');
            $('div#loabard').fadeOut(300);
            setTimeout(function() {
                $('#mainlogo').fadeOut(300);
                setTimeout(function() {
                    $('div#willies-menu').addClass('menuload');
                    $('div#willies-landing ').addClass('landingload');
                    $('div#willies-rest ').addClass('restload');
                    if ($('.home').length) {
                        console.log(visited);
                        if (visited == 'yes') {
                            visitiScript();

                        } else {

                            if ($(window).width() < 768) {
                               introScripts();
                            }
                            else {
                               visitiScript();
                            }

                        }
                        $('div#swipemenu').css({ 'bottom': -paneHeight });

                    } else {
                        $('div#instructionsoverlay').fadeOut(0);
                        $('#swipemenu').attr('style', 'transform: translate3d(0, 0px, 0px) scale3d(1, 1, 1);');
                        $('div#swipemenu').css({ 'bottom': -paneHeight });
                    }
                }, 0);
            }, 300);
        }, 222);
        $.cookie('visited', 'yes', {
            expires: 7 // the number of days the cookie will be effective
        });


        function visitiScript() {
            console.log('visi');
            $('#swipemenu ul.mainmenu li#togglemenu').addClass('hideafeter');

        }


        function introScripts() {
            setTimeout(function(){
            console.log('introScripts');
            $('div#page').css('opacity', '.1');
            $('#stronoverlay').show();
            $('#instructionsoverlay').removeClass('hiddenal');

            $('#swipemenu').attr('style', 'transform: translate3d(0, 0px, 0px) scale3d(1, 1, 1);');
            $('div#swipemenu').css({ 'bottom': -paneHeight });


            setTimeout(function() {
                $('div#grabhand').fadeIn();
                $('#swipemenu ul.mainmenu li#togglemenu').addClass('grabgged');
            }, 300);

            setTimeout(function() {


                $('i#handgrab').addClass('grabbed');
                setTimeout(function() {
                    $('#swipemenu').attr('style', 'transform: translate3d(0, -55%, 0px) scale3d(1, 1, 1); -webkit-transition: all 1500ms cubic-bezier(0.19, 1, 0.22, 1); transition: all 1500ms cubic-bezier(0.19, 1, 0.22, 1);');
                    $('div#swipemenu').css({ 'bottom': -paneHeight });
                    
                    setTimeout(function() {
                        $('#swipemenu ul.mainmenu li#togglemenu').removeClass('grabgged');
                        $('i#handgrab').removeClass('grabbed');

                        setTimeout(function() {
                            $('#swipemenu').attr('style', 'transform: translate3d(0, 0px, 0px) scale3d(1, 1, 1);');
                            $('div#swipemenu').css({ 'bottom': -paneHeight });
                            $('div#instructionsoverlay').fadeOut();

                            setTimeout(function() {
                                $('div#grabhand').fadeOut();
                                $('#stronoverlay').hide();
                                $('div#page').css('opacity', '1');
                                $('#swipemenu ul.mainmenu li#togglemenu').addClass('hideafeter');
                            }, 700);


                        }, 1000);

                    }, 700);
                }, 600);
            }, 700);
        },4000);

        }



        $.cookie('visited', 'yes', {
            expires: 7 // the number of days the cookie will be effective
        });




        $('#overlay').click(function () {
                $('span#menum').removeClass('liftedup');
                $('#overlay').removeClass('liftedup');
                $('body').removeClass('closescroll');
                $('#touchdisabl').removeClass('liftedup');
                $('div#hidcontainer').removeClass('showcont');
                $('.logok').removeClass('liftedup');
                $('div#page').removeClass('liftedup');
                if (Modernizr.csstransforms3d) {
                    $('#swipemenu').css('transform', 'translate3d(0px,' + 0 + 'px,0) scale3d(1,1,1)');
                } else if (Modernizr.csstransforms) {
                    $('#swipemenu').css('transform', 'translate(0,' + 0 + 'px');
                } else {
                    $('#swipemenu').css('bottom', 0 + 'px');
                }       
        });


        $('.locitem').click(function () {
            var slideTurn = $(this).data('slideselect');
            $('.locitem').removeClass('active');
            $(this).toggleClass('active');
            swipeMenu.showPane(slideTurn, true);
            return false;
        });


         $('#swipemenu').attr('style', 'transform: translate3d(0, 0px, 0px) scale3d(1, 1, 1);'); 
         $('div#swipemenu').css({'bottom': -paneHeight });

        var widthDym = $(window).width() * 3;
        // console.log($(window).width());
        $('#swipemenu #panels ul > li.page').width($(window).width());
        
        $('#swipemenu #panels ul#mainpanels').width(widthDym);

        $(window).on(' resize orientationchange', function () {
            var widthDym = $(window).width() * 3;
            // console.log(widthDym);
            $('#swipemenu #panels ul > li.page').width($(window).width());
            $('#swipemenu #panels ul#mainpanels').width(widthDym);

            var paneHeight = $('#swipemenu').height()  - $('.grabmenubar').outerHeight();
            // MESSES UP KEYBOARD FEATURE ON PHONES
                     // $('#swipemenu').attr('style', 'transform: translate3d(0, 0px, 0px) scale3d(1, 1, 1);'); 
            $('div#swipemenu').css({'bottom': -paneHeight });
        });


});