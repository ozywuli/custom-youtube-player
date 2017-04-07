Custom YouTube Player
=======


```html
<script src="customYouTubePlayer.js"></script>
<div id="youtube-player-iframe" class="youtube-player-iframe"></div>
```

```js
var newCustomYouTubePlayer = new CustomYouTubePlayer({
    videoId: 'F-eMt3SrfFU',
    width: null,
    height: null,

    adaptiveVid: true,
    adaptiveVidParent: window,
    adaptiveVidDimensions: 0.9,
    onVidEnd: function() {
        $('.easy-peasy-modal').removeClass('is-visible');
    }
});
```


## Play
```js
newCustomYouTubePlayer.playVideo();
```

## Stop

```js
newCustomYouTubePlayer.stopVideo();
```

## Pause
```js
newCustomYouTubePlayer.pauseVideo();
```


## Licensing
The Custom YouTube Player project is released under the "Be Chill" license. There are no restrictions on this plugin so long as you're chill.