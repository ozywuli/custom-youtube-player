;(function() {

    // IIFE
    let CustomYoutubePlayer = (function() {
        /*------------------------------------*\
          CUSTOM YOUTUBE IFRAME API
        \*------------------------------------*/
        function CustomYouTubePlayer(userOptions) {
            
            // ADD YOUTUBE IFRAME API SCRIPT
            if (!document.getElementById('youtube-iframe')) {
                let tag = document.createElement('script');
                tag.id = 'youtube-iframe';
                tag.src = 'https://www.youtube.com/iframe_api';
                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            let videoId;
            let $youtubeIframeWrapper = $('.youtube-player-wrapper');
            let $youtubeIframe = $('#youtube-player-iframe');
            let $adaptiveEl;


            // SELF
            let self = this;

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
                        combinedExtendOptions.onVidReady();
                    }
                },

                onPlayerStateChange: function(data) {
                    let playerState = self.Player.getPlayerState();

                    combinedExtendOptions.onPlayerStateChange(data);
                    
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
                        let newWidth = $adaptiveEl.width() * combinedExtendOptions.adaptiveVidDimensions;
                        // NEW HEIGHT BASED ON IFRAME'S ORIGINAL HEIGHT AND THE DESIRED DIMENSIONS
                        let newHeight = $adaptiveEl.height() * combinedExtendOptions.adaptiveVidDimensions;

                        // RESIZE BASE ON WIDTH
                        if ( ($adaptiveEl.height() / $adaptiveEl.width()) > $youtubeIframe.attr('data-aspectratio') ) {
                            $youtubeIframe.each(function() {
                                let $thisEl = $(this);
                                $thisEl
                                    .width(newWidth)
                                    .height(newWidth * $thisEl.attr('data-aspectratio'))
                            });

                        // RESIZE BASE ON HEIGHT
                        } else {
                            $youtubeIframe.each(function() {
                                let $thisEl = $(this);
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
                },

            }



            /*------------------------------------*\
              NATIVE YOUTUBE IFRAME API
            \*------------------------------------*/
            let defaultNativeOptions = {
                events: {
                    'onReady': self.customMethods.onPlayerReady,
                    'onStateChange': self.customMethods.onPlayerStateChange
                }
            }

            let combinedNativeOptions = $.extend(defaultNativeOptions, userOptions.native)

            window.onYouTubeIframeAPIReady = function() {
                self.Player = new YT.Player('youtube-player-iframe', combinedNativeOptions);
            };


            /*------------------------------------*\
              EXTENDED YOUTUBE IFRAME API
            \*------------------------------------*/
            let defaultExtendOptions = {
                adaptiveVid: true,
                adaptiveVidParent: window,
                adaptiveVidDimensions: 0.9,
                onVidEnd: null
            }

            let combinedExtendOptions = $.extend(defaultExtendOptions, userOptions.extend);

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
    module.exports = CustomYoutubePlayer;


}).call(this);