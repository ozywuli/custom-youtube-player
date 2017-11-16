(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CustomYoutubePlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

;(function () {

    // IIFE
    var CustomYoutubePlayer = function () {

        /*------------------------------------*\
          CUSTOM YOUTUBE IFRAME API
        \*------------------------------------*/
        function CustomYouTubePlayer(userOptions) {

            // ADD YOUTUBE IFRAME API SCRIPT
            if (!document.getElementById('youtube-iframe')) {
                var tag = document.createElement('script');
                tag.id = 'youtube-iframe';
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            var videoId = void 0;
            var $youtubeIframeWrapper = $('.youtube-player-wrapper');
            var $youtubeIframe = $('#youtube-player-iframe');
            var $adaptiveEl = void 0;

            // SELF
            var self = this;

            // YOUTUBE IFRAME API PLAYER
            this.Player = undefined;

            /*------------------------------------*\
              CUSTOM METHODS
            \*------------------------------------*/
            self.customMethods = {
                onPlayerReady: function onPlayerReady() {
                    // TURN ON ADAPTIVE VIDEO IF USER HAS SELECTED IT
                    if (combinedExtendOptions.adaptiveVid) {
                        self.customMethods.turnOnAdaptiveVid();
                    }
                },

                onPlayerStateChange: function onPlayerStateChange() {
                    var playerState = self.Player.getPlayerState();

                    // WHEN THE VIDEO HAS ENDED
                    if (playerState === 0) {
                        combinedExtendOptions.onVidEnd();
                    }
                },

                // OPTION TO TURN OFF ADAPTIVE VIDEO DYNAMICALLY
                turnOffAdaptiveVid: function turnOffAdaptiveVid() {
                    $adaptiveEl.off('resize.ytModal');
                },

                // ADPATIVE VIDEO STUFF
                turnOnAdaptiveVid: function turnOnAdaptiveVid() {
                    $youtubeIframe = $('#youtube-player-iframe');
                    $adaptiveEl = $(combinedExtendOptions.adaptiveVidParent);

                    // LOOP THROUGH IFRAME IFRAME AND SET THE ASPECT RATIO BASED ON THE IFRAME'S DEFAULT WIDTH AND HEIGHT
                    $youtubeIframe.each(function () {
                        $(this).attr('data-aspectratio', this.height / this.width).attr('data-aspectratio-h', this.width / this.height).removeAttr('height width');
                    });

                    // RESIZE IFRAME FUNCTION
                    function resizeIframe() {

                        // NEW WIDTH BASED ON IFRAME'S ORIGINAL WIDTH AND THE DESIRED DIMENSIONS
                        var newWidth = $adaptiveEl.width() * combinedExtendOptions.adaptiveVidDimensions;
                        // NEW HEIGHT BASED ON IFRAME'S ORIGINAL HEIGHT AND THE DESIRED DIMENSIONS
                        var newHeight = $adaptiveEl.height() * combinedExtendOptions.adaptiveVidDimensions;

                        // RESIZE BASE ON WIDTH
                        if ($adaptiveEl.height() / $adaptiveEl.width() > $youtubeIframe.attr('data-aspectratio')) {
                            $youtubeIframe.each(function () {
                                var $thisEl = $(this);
                                $thisEl.width(newWidth).height(newWidth * $thisEl.attr('data-aspectratio'));
                            });

                            // RESIZE BASE ON HEIGHT
                        } else {
                            $youtubeIframe.each(function () {
                                var $thisEl = $(this);
                                $thisEl.width(newHeight * $thisEl.attr('data-aspectratio-h')).height(newHeight);
                            });
                        }
                    }

                    // CALL `resizeIframe` TO GET THE BALL ROLLING
                    resizeIframe();

                    // ONCE IFRAME HAS BEEN RESIZED, REVEAL THE IFRAME
                    $youtubeIframe.css('opacity', 1);

                    // RESIZE IFRAME SHOULD WORK WHEN THE WINDOW RESIZES
                    $adaptiveEl.on('resize.ytModal', function () {
                        resizeIframe();
                    });
                }

                /*------------------------------------*\
                  NATIVE YOUTUBE IFRAME API
                \*------------------------------------*/
            };var defaultNativeOptions = {
                events: {
                    'onReady': self.customMethods.onPlayerReady,
                    'onStateChange': self.customMethods.onPlayerStateChange
                }
            };

            var combinedNativeOptions = $.extend(defaultNativeOptions, userOptions.native);

            window.onYouTubeIframeAPIReady = function () {
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
            };

            var combinedExtendOptions = $.extend(defaultExtendOptions, userOptions.extend);

            // HIDE THE YOUTUBE IFRAME IF ADAPTIVE VIDEO IS TURNED ON SO THAT USERS DON'T SEE THE IFRAME BEING RESIZED
            if (combinedExtendOptions.adaptiveVid) {
                $youtubeIframe.css('opacity', 0);
            }
        } // END `CustomYouTubePlayer()`

        // RETURN
        return CustomYouTubePlayer;
    }(); // END `CustomYouTubePlayer` IIFE


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return CustomYoutubePlayer;
        });
    } else if (typeof exports !== "undefined" && exports !== null) {
        module.exports = CustomYoutubePlayer;
    } else {
        window.CustomYoutubePlayer = CustomYoutubePlayer;
    }
}).call(undefined);

},{}]},{},[1])(1)
});