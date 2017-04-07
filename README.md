Custom YouTube Player
=======


```html
<div id="youtube-player-iframe" class="youtube-player-iframe"></div>
```

```js
var newCustomYouTubePlayer = new CustomYouTubePlayer({
    videoId: 'F-eMt3SrfFU',

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