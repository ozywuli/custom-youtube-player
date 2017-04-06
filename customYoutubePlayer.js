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
                adaptiveVid: true,
                adaptiveVidDimensions: 0.9,
                videoId: 'dQw4w9WgXcQ',
                playerVars: {
                    controls: true,
                    start: 0
                }
            }

            var daOptions = $.extend(defaultOptions, userOptions);

            window.onYouTubeIframeAPIReady = function() {

                Player = new YT.Player('youtube-player-iframe', {
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

            if (daOptions.adaptiveVid) {
                $youtubeIframe.css('opacity', 0);
            }

            function onPlayerReady() {
                if (daOptions.adaptiveVid) {
                    turnOnAdaptiveVid();
                }
            }

            function onPlayerStateChange() {

            }

            function turnOnAdaptiveVid() {

                $youtubeIframe = $('#youtube-player-iframe');
                $adaptiveEl = $(window);

                $youtubeIframe.each(function() {
                    $(this)
                        .attr('data-aspectratio', this.height / this.width)
                        .attr('data-aspectratio-h', this.width / this.height)
                        .removeAttr('height width')
                });

                function resizeIframe() {

                    var newWidth = $adaptiveEl.width() * daOptions.adaptiveVidDimensions;
                    var newHeight = $adaptiveEl.height() * daOptions.adaptiveVidDimensions;

                    if ( ($adaptiveEl.height() / $adaptiveEl.width()) > 0.5625 ) {
                        $youtubeIframe.each(function() {
                            var $thisEl = $(this);
                            $thisEl
                                .width(newWidth)
                                .height(newWidth * $thisEl.attr('data-aspectratio'))
                        });
                    } else {
                        $youtubeIframe.each(function() {
                            var $thisEl = $(this);
                            $thisEl
                                .width(newHeight * $thisEl.attr('data-aspectratio-h'))
                                .height(newHeight)
                        });
                    }
                }

                resizeIframe();

                $youtubeIframe.css('opacity', 1);

                $adaptiveEl.on('resize.ytModal', function() {
                    resizeIframe();
                });

            }

            function turnOffAdaptiveVid() {
                $adaptiveEl.off('resize.ytModal');
            }

        }

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