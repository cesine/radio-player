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
	}
});