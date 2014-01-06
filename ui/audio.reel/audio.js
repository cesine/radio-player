/**
 * @module ui/audio.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Audio
 * @extends Component
 */
exports.Audio = Component.specialize( /** @lends Audio# */ {
	constructor: {
		value: function Audio() {
			this.super();
		}
	},

	_src: {
		value: null
	},

	/**
	 * @type {string}
	 * @default null
	 */
	src: {
		get: function() {
			return this._src;
		},
		set: function(value) {
			if (value && value.trim() && value.trim() === this._src) {
				return;
			}
			this._src = value;
			console.log("Changed audio source" + value);
		}
	},

	enterDocument: {
		value: function(firstTime) {
			this.super(firstTime);

			if (firstTime) {
				this.addOwnPropertyChangeListener("src", this);
				this._audioElement = this.templateObjects.owner.element;
				this._audioElement.src = this.src;
			}
		}
	},

	handleSrcChange: {
		value: function(oldValue, newValue) {
			console.log("Handle audio source change ", oldValue, newValue);
		}
	},

	_audioElement: {
		value: null
	},

	play: {
		value: function(evt) {
			if (this._audioElement) {
				this._audioElement.play();
			}
		}
	},

	pause: {
		value: function(evt) {
			if (this._audioElement) {
				this._audioElement.pause();
			}
		}
	},

	stop: {
		value: function(evt) {
			if (this._audioElement) {
				this._audioElement.pause();
				// this._audioElement.currentTime = 0;
			}
		}
	},

	decode: {
		value: function(formatIn, formatOut) {
			// var myAudioContext = new webkitAudioContext();

			// function bufferSound(event) {
			// 	var request = event.target;
			// 	var source = myAudioContext.createBufferSource();
			// 	source.buffer = myAudioContext.createBuffer(request.response, false);
			// 	source.connect(myAudioContext.destination);
			// 	source.noteOn(0);
			// }

			// var request = new XMLHttpRequest();
			// request.open('GET', 'http://178.32.57.58:8817/;', true);
			// request.responseType = 'arraybuffer';
			// request.addEventListener('load', bufferSound, false);
			// request.addEventListener('error', function(error) {
			// 	console.log("error loading stream " + error);
			// }, false);
			// request.onload = bufferSound;
			// request.onerror = function(e, f, g) {
			// 	console.log(e, f, g);
			// };
			// request.send();
		}
	}
});