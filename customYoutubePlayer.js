;(function() {

    // ADD YOUTUBE IFRAME API SCRIPT
    var tag = document.createElement('script');
    tag.id = 'youtube-iframe';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoId;
    var $youtubeIframeWrapper = $('.youtube-player-wrapper');
    var $youtubeIframe = $('#youtube-player-iframe');
    var $adaptiveEl;

    // IIFE
    CustomYouTubePlayer = (function() {

        /*------------------------------------*\
          CUSTOM YOUTUBE IFRAME API
        \*------------------------------------*/
        function CustomYouTubePlayer(userOptions) {
            var self = this;

            // YOUTUBE IFRAME API PLAYER
            this.Player = undefined;


            /*------------------------------------*\
              CUSTOM METHODS
            \*------------------------------------*/
            self.customMethods = {
                onPlayerReady: function() {
                    // TURN ON ADAPTIVE VIDEO IF USER HAS SELECTED IT
                    if (combinedExtendOptions.adaptiveVid) {
                        self.customMethods.turnOnAdaptiveVid();
                    }
                },

                onPlayerStateChange: function() {
                    var playerState = self.Player.getPlayerState()
                    
                    // WHEN THE VIDEO HAS ENDED
                    if (playerState === 0) {
                        combinedExtendOptions.onVidEnd();
                    }
                },

                // OPTION TO TURN OFF ADAPTIVE VIDEO DYNAMICALLY
                turnOffAdaptiveVid: function() {
                    $adaptiveEl.off('resize.ytModal');
                },

                // ADPATIVE VIDEO STUFF
                turnOnAdaptiveVid: function() {
                    $youtubeIframe = $('#youtube-player-iframe');
                    $adaptiveEl = $(combinedExtendOptions.adaptiveVidParent);

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
                        var newWidth = $adaptiveEl.width() * combinedExtendOptions.adaptiveVidDimensions;
                        // NEW HEIGHT BASED ON IFRAME'S ORIGINAL HEIGHT AND THE DESIRED DIMENSIONS
                        var newHeight = $adaptiveEl.height() * combinedExtendOptions.adaptiveVidDimensions;

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
            }


            /*------------------------------------*\
              NATIVE YOUTUBE IFRAME API
            \*------------------------------------*/
            var defaultNativeOptions = {
                events: {
                    'onReady': self.customMethods.onPlayerReady,
                    'onStateChange': self.customMethods.onPlayerStateChange
                }
            }

            var combinedNativeOptions = $.extend(defaultNativeOptions, userOptions.native)

            window.onYouTubeIframeAPIReady = function() {
                self.Player = new YT.Player('youtube-player-iframe', combinedNativeOptions);
            };


            /*------------------------------------*\
              EXTENDED YOUTUBE IFRAME API
            \*------------------------------------*/
            var defaultExtendOptions = {
                adaptiveVid: true,
                adaptiveVidParent: window,
                adaptiveVidDimensions: 0.9,
                onVidEnd: null
            }

            var combinedExtendOptions = $.extend(defaultExtendOptions, userOptions.extend);

            // HIDE THE YOUTUBE IFRAME IF ADAPTIVE VIDEO IS TURNED ON SO THAT USERS DON'T SEE THE IFRAME BEING RESIZED
            if (combinedExtendOptions.adaptiveVid) {
                $youtubeIframe.css('opacity', 0);
            }

        } // END `CustomYouTubePlayer()`

        // RETURN
        return CustomYouTubePlayer;
        
    })(); // END `CustomYouTubePlayer` IIFE


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    // if (typeof define === 'function' && define.amd) {
    //     define([], function() {
    //         return CustomYouTubePlayer;
    //     });
    // } else if (typeof exports !== "undefined" && exports !== null) {
    //     module.exports = CustomYouTubePlayer;
    // } else {
    //     window.CustomYouTubePlayer = CustomYouTubePlayer;
    // }

    window.CustomYouTubePlayer = CustomYouTubePlayer;

}).call(this);