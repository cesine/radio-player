var Montage = require("montage/core/core").Montage;
var Component = require("montage/ui/component").Component;
var PressComposer = require("montage/composer/press-composer").PressComposer;
var MediaController = require("montage/core/media-controller").MediaController;
var AbstractAudio = require("montage/ui/base/abstract-audio").AbstractAudio;

exports.Audio = Montage.create(AbstractAudio, {

    // Lifecycle

    /**
     * @private
     */
    constructor: {
        value: function Audio() {
            AbstractAudio.constructor.call(this); // super
            this.addPathChangeListener("audioController.status", this, "handleControllerStatusChange");
        }
    },

    enterDocument: {
        value: function(firstTime) {
            // Call super method
            if (AbstractAudio.enterDocument) {
                AbstractAudio.enterDocument.call(this, firstTime);
            }
            
            if (firstTime) {
                this.setupFirstPlay();
                
                this.addOwnPropertyChangeListener("src", this);
                this.addOwnPropertyChangeListener("posterSrc", this);
            }
        }
    },

    prepareForActivationEvents: {
        value: function() {
            this._pressComposer.addEventListener("pressStart", this, false);
            this._pressComposer.addEventListener("press", this, false);
            this._pressComposer.addEventListener("pressCancel", this, false);
        }
    },

    // Event Handlers

    handlePlayAction: {
        value: function (e) {
            this.loadMedia();
            this.audioController.play();
            this.classList.remove("digit-Audio--firstPlay");
        }
    },

    handleAudioPress: {
        value: function(event) {
            if (this.audioController.status === this.audioController.EMPTY) {
                this.loadMedia();
                this.classList.remove("digit-Audio--firstPlay");
                this._pressComposer.unload();
                this._pressComposer.removeEventListener("pressStart", this, false);
                this._pressComposer.removeEventListener("press", this, false);
                this._pressComposer.removeEventListener("pressCancel", this, false);

                this._pressComposer = null;
            }
        }
    },

    handleTouchstart: {
        value: function() {
            this.clearHideControlsTimeout();
            this.classList.add("digit-Audio--showControls");
            document.addEventListener("touchend",this , false);
        }
    },
    handleTouchend: {
        value: function() {
            var self = this;
            this.setHideControlsTimeout();
        }
    },

    handleMousedown: {
        value: function() {
            this.clearHideControlsTimeout();
            this.classList.add("digit-Audio--showControls");
            document.addEventListener("mouseup",this , false);
        }
    },
    handleMouseup: {
        value: function() {
            var self = this;
            this.setHideControlsTimeout();
        }
    },

    handleControllerStatusChange: {
        value: function (newValue, path, myObject) {
            if (this.audioController) {
                if (!this._firstPlay && newValue !== this.audioController.PLAYING) {
                    this.clearHideControlsTimeout();
                    this.classList.add("digit-Audio--showControls");
                } else if (this._firstPlay && newValue === this.audioController.PLAYING) {
                    this.doFirstPlay();
                }
            }
        }
    },

    handleSrcChange: {
        value: function() {
            // We need to create a new audio element because there's really
            // no good way to unload the current audio in order to show the
            // cover for the next audio (without loading the new audio in the
            // first place but we want to avoid doing it, only when the user
            // presses play).
            var currentAudioElement = this.mediaElement,
                newAudioElement = document.createElement("audio");

            newAudioElement.className = currentAudioElement.className;
            this.element.replaceChild(newAudioElement, currentAudioElement);
            this.mediaElement = newAudioElement;

            this.setupFirstPlay();
        }
    },

    handlePostersrcChange: {
        value: function() {
            this.showPoster();
        }
    },

    // Properties

    // Machinery

    setupFirstPlay: {
        value: function() {
            this.element.removeEventListener("touchstart", this, false);
            this.element.removeEventListener("mousedown", this, false);
            this._firstPlay = true;
            this.audioController.stop();

            this.classList.add("digit-Audio--firstPlay");
            this.classList.remove("digit-Audio--showControls");

            this._pressComposer = PressComposer.create();
            this._pressComposer.identifier = "audio";
            this.addComposerForElement(this._pressComposer, this.mediaElement);
            this.showPoster();
        }
    },

    draw: {
        value: function() {
            // Call super method
            if (AbstractAudio.draw) {
                AbstractAudio.draw.call(this);
            }

            if (this.supportsFullScreen) {
                if (!this.isFullScreen) {
                    this.element.classList.remove("fullscreen");
                } else {
                    this.element.classList.add("fullscreen");
                }
            } else {
                this.element.classList.remove("fullscreen");
            }
        }
    },
    
    doFirstPlay: {
        value: function(newValue) {
            this.element.addEventListener("touchstart",this , false);
            this.element.addEventListener("mousedown",this , false);
            this._firstPlay = false;
        }
    },

    setHideControlsTimeout: {
        value: function(newValue) {
            var self = this;
            this.clearHideControlsTimeout();
            this._hideControlsTimeout = setTimeout(function() {
                self.classList.remove("digit-Audio--showControls");
            }, 2500);
        }
    },

    clearHideControlsTimeout: {
        value: function(newValue) {
            if(this._hideControlsTimeout) {
                clearTimeout(this._hideControlsTimeout);
            }
        }
    },

    _firstPlay: {
        value: true
    },

    _hideControlsTimeout: {
        value: null
    }
});