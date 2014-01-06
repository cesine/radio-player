# Audio

Status: __In progress__

![Audio](https://raw.github.com/montagejs/digit/master/ui/audio.reel/screenshot.png)

The Audio component wraps a audio element and provides custom controls.

## How to use

```html
<div data-montage-id="audio"></div>
```

```json
"audio": {
    "prototype": "ui/audio.reel",
    "properties": {
        "element": {"#": "audio"},
        "src": "music.ogg",
        "posterSrc": "poster.png"
    }
}
```


## Available properties

* `src` - Source file of the audio.
* `posterSrc` - An image that gets shown while the audio plays, the cover art.
* `sources` - Array of audio source files.
* `audioController` - The MediaController object used to control playback.


## Using multiple sources

Multiple source files can be specified with the `sources` property. The Audio component will use the first source with a supported media type.

```json
"audio": {
    "prototype": "ui/audio.reel",
    "properties": {
        "element": {"#": "audio"},
        "sources": [
            {"src": "music.ogg", "type": "audio/ogg"},
            {"src": "music.mp4", "type": "audio/mpeg"}
        ]
    }
}
```


## Synchronized playback

Playback of multiple audios can be synchronized by using the same MediaController.

```html
<div data-montage-id="audio1"></div>
<div data-montage-id="audio2"></div>
```

```json
"audio1": {
    "prototype": "ui/audio.reel",
    "properties": {
        "element": {"#": "audio1"},
        "audioController" : {"@": "mediaController"},
        "src": "music1.mp4"
    }
},
"audio2": {
    "prototype": "ui/audio.reel",
    "properties": {
        "element": {"#": "audio2"},
        "audioController" : {"@": "mediaController"},
        "src": "music2.mp4"
    }
},
"mediaController": {
    "prototype": "montage/core/media-controller",
    "properties": {
        "autoplay": false
    }
}
```

## Customizing with CSS

* `.digit-Audio` - The Audio component
* `.digit-Audio-frame` - The actual audio element
* `.digit-Audio-cover` - Initial cover with a play button
* `.digit-Audio-cover-button` - Initial play button
* `.digit-Audio-controls` - Controls
* `.digit-Audio-controls-button-play` - Play button
* `.digit-Audio-controls-button-fullscreen` - Fullscreen button
* `.digit-Audio-controls-track` - Audio track
* `.digit-Audio-controls-track-timeline` - Timeline bar
* `.digit-Audio-controls-track-timeline-progress` - Progress of the timeline bar
* `.digit-Audio-controls-track-thumb` - Handle with remaining time


```css
.digit-Audio-controls {
    background: pink;
}
```



## Browser support

* TBD