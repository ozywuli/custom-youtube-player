;(function() {

    var tag = document.createElement('script');
    tag.id = 'youtube-iframe';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoId;
    var $youtubeIframeWrapper = $('.youtube-player-wrapper');
    var $youtubeIframe = $('#youtube-player-iframe');
    var $adaptiveEl;

    CustomYouTubePlayer = (function() {

        function CustomYouTubePlayer(userOptions) {

            var defaultOptions = {
                width: null,
                height: null,
                videoId: 'dQw4w9WgXcQ',
                playerVars: {
                    controls: true,
                    start: 0
                },

                adaptiveVid: true,
                adaptiveVidParent: window,
                adaptiveVidDimensions: 0.9,
                onVidEnd: null
            }

            // https://api.jquery.com/jquery.extend/
            var daOptions = $.extend(defaultOptions, userOptions);

            window.onYouTubeIframeAPIReady = function() {

                Player = new YT.Player('youtube-player-iframe', {
                    width: null,
                    height: null,
                    videoId: daOptions.videoId,
                    playerVars: {
                        'controls': daOptions.playerVars.controls,
                        'start': daOptions.playerVars.start
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });

            }

            // HIDE THE YOUTUBE IFRAME IF ADAPTIVE VIDEO IS TURNED ON SO THAT USERS DON'T SEE THE IFRAME BEING RESIZED
            if (daOptions.adaptiveVid) {
                $youtubeIframe.css('opacity', 0);
            }

            // AFTER YOUTUBE API HAS BEEN LODED
            function onPlayerReady() {
                // TURN ON ADAPTIVE VIDEO IF USER HAS SELECTED IT
                if (daOptions.adaptiveVid) {
                    turnOnAdaptiveVid();
                }
            }

            // ON PLAYER STATE CHANGE
            function onPlayerStateChange() {
                var playerState = Player.getPlayerState()
                

                // WHEN THE VIDEO HAS ENDED
                if (playerState === 0) {
                    // https://github.com/nolimits4web/Swiper/blob/master/src/js/core.js
                    // http://stackoverflow.com/questions/32246262/what-is-emit-javascript-function
                    // http://stackoverflow.com/questions/1553342/custom-event-in-jquery-that-isnt-bound-to-a-dom-element#comment1417316_1556914
                    // http://stackoverflow.com/questions/4942639/add-event-to-jquery-plugin
                    // TRIGGER THE `onVidEnd` CALLBACK
                    daOptions.onVidEnd();
                }

            }

            // ADPATIVE VIDEO STUFF
            function turnOnAdaptiveVid() {

                $youtubeIframe = $('#youtube-player-iframe');
                $adaptiveEl = $(daOptions.adaptiveVidParent);

                // LOOP THROUGH IFRAME IFRAME AND SET THE ASPECT RATIO BASED ON THE IFRAME'S DEFAULT WIDTH AND HEIGHT
                $youtubeIframe.each(function() {
                    $(this)
                        .attr('data-aspectratio', this.height / this.width)
                        .attr('data-aspectratio-h', this.width / this.height)
                        .removeAttr('height width')
                });

                // RESIZE IFRAME FUNCTION
                function resizeIframe() {

                    // NEW WIDTH BASED ON IFRAME'S ORIGINAL WIDTH AND THE DESIRED DIMENSIONS
                    var newWidth = $adaptiveEl.width() * daOptions.adaptiveVidDimensions;
                    // NEW HEIGHT BASED ON IFRAME'S ORIGINAL HEIGHT AND THE DESIRED DIMENSIONS
                    var newHeight = $adaptiveEl.height() * daOptions.adaptiveVidDimensions;

                    // RESIZE BASE ON WIDTH
                    if ( ($adaptiveEl.height() / $adaptiveEl.width()) > $youtubeIframe.attr('data-aspectratio') ) {
                        $youtubeIframe.each(function() {
                            var $thisEl = $(this);
                            $thisEl
                                .width(newWidth)
                                .height(newWidth * $thisEl.attr('data-aspectratio'))
                        });

                    // RESIZE BASE ON HEIGHT
                    } else {
                        $youtubeIframe.each(function() {
                            var $thisEl = $(this);
                            $thisEl
                                .width(newHeight * $thisEl.attr('data-aspectratio-h'))
                                .height(newHeight)
                        });
                    }
                }

                // CALL `resizeIframe` TO GET THE BALL ROLLING
                resizeIframe();

                // ONCE IFRAME HAS BEEN RESIZED, REVEAL THE IFRAME
                $youtubeIframe.css('opacity', 1);

                // RESIZE IFRAME SHOULD WORK WHEN THE WINDOW RESIZES
                $adaptiveEl.on('resize.ytModal', function() {
                    resizeIframe();
                });

            }

            // OPTION TO TURN OFF ADAPTIVE VIDEO DYNAMICALLY
            function turnOffAdaptiveVid() {
                $adaptiveEl.off('resize.ytModal');
            }

        }


        /*------------------------------------*\
          PLAYBACK CONTROLS
        \*------------------------------------*/
        CustomYouTubePlayer.prototype.playVideo = function() {
            Player.playVideo();
        }

        CustomYouTubePlayer.prototype.stopVideo = function() {
            Player.stopVideo();
        }

        CustomYouTubePlayer.prototype.pauseVideo = function() {
            Player.pauseVideo();
        }



        // RETURN `CustomYouTubePlayer` SO THAT IT CAN BE INSTANTIATED
        return CustomYouTubePlayer;

    })();


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return CustomYouTubePlayer;
        });
    } else if (typeof exports !== "undefined" && exports !== null) {
        module.exports = CustomYouTubePlayer;
    } else {
        window.CustomYouTubePlayer = CustomYouTubePlayer;
    }


}).call(this);