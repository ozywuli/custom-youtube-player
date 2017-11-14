Custom YouTube Player
=======
This jQuery plugin augments the [YouTube Iframe API](https://developers.google.com/youtube/iframe_api_reference) with additional capabilities like [adaptive sizing](https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php), video event callbacks, and custom appearance for player controls. 

Getting Started
======

### Requirements
The following elements are required on your page:

```html
<!-- JQUERY IS THE ONLY HARD EXTERNAL REQUIREMENT -->
<script src="jquery.js"></script>
<script src="CustomYouTubePlayer.js"></script>
<div id="youtube-player-iframe" class="youtube-player-iframe"></div>
```

### Initialization

Then initialize your Custom YouTube Player. Below are some example options. The `native` object accepts any options listed in the (YouTube Iframe API)[https://developers.google.com/youtube/iframe_api_reference]. The `extend` object holds options for augmented video capabilities like adaptive sizing, video event callbacks, and custom appearance for player controls.

```js
var newCustomYouTubePlayer = new CustomYouTubePlayer({
    native: {
        videoId: 'F-eMt3SrfFU',
    },
    extend: {
        adaptiveVid: true,
        adaptiveVidParent: window,
        adaptiveVidDimensions: 0.9,
        onVidEnd: function() {
            $('.easy-peasy-modal').removeClass('is-visible');
        }
    }
});
```

## Licensing
The Custom YouTube Player project is released under the "Be Chill" license. There are no restrictions on this plugin so long as you're chill.