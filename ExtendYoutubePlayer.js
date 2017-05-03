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


    



    window.onYouTubeIframeAPIReady = function() {

        console.log(YT);

        Player = new YT.Player();

        console.log(Player);

        Player.test = function() {
            console.log('test');
        }

        Player.test();

        // ExtendPlayer = new YT.Player('youtube-player-iframe', {

        // });

        // console.log(ExtendPlayer);

        ExtendPlayer = new Player();

        console.log(ExtendPlayer);

        // ExtendPlayer.test();

    }


    // var testObj = function() {
    //     this.testProp = 1;
    // }

    // var Test = new testObj();

    // console.log(Test);




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


}).call(this);