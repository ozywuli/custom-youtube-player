// var tag = document.createElement('script');
// tag.id = 'youtube-iframe';
// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


/*
var videoId;
var $youtubeIframe;
var $adaptiveEl;


function onYouTubeIframeAPIReady() {

    videoId = 'ODn5-gb8gbQ';

    Player = new YT.Player('youtube-player-iframe', {
        videoId: videoId,
        playerVars: {
            'controls': true,
            'start': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    turnOnAdaptiveVid();
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

    $adaptiveEl.on('resize.ytModal', function() {

        console.log( $adaptiveEl.height() / $adaptiveEl.width() );

        let newWidth = $adaptiveEl.width() * 0.9;
        let newHeight = $adaptiveEl.height() * 0.9;

        if ( ($adaptiveEl.height() / $adaptiveEl.width()) > 0.5625 ) {
            $youtubeIframe.each(function() {
                let $thisEl = $(this);
                $thisEl
                    .width(newWidth)
                    .height(newWidth * $thisEl.attr('data-aspectratio'))
            });
        } else {
            $youtubeIframe.each(function() {
                let $thisEl = $(this);
                $thisEl
                    .width(newHeight * $thisEl.attr('data-aspectratio-h'))
                    .height(newHeight)
            });
        }

    }).trigger('resize');

}

function turnOffAdaptiveVid() {
    $adaptiveEl.off('resize.ytModal');
}
*/