/**
 * @module ui/audio-viz.reel
 * @requires digit/ui/video.reel
 */
var Video = require("digit/ui/video.reel").Video;

/**
 * @class AudioViz
 * @extends Component
 */
exports.AudioViz = Video.specialize( /** @lends AudioViz# */ {
	constructor: {
		value: function AudioViz() {
			this.super();
			var self = this;
			setTimeout(function() {
				// self.artist = "Korean pop music albums";
				var stream = "http://178.32.57.58:8131";
				var xhr = new XMLHttpRequest();
				var url = "http://yp.shoutcast.com/Metadata_Info1.php?surl=http://178.32.57.58:81310752d5730fb4ef3c-221b4998ec12974102282b6d4a8fafbe";

				xhr.open("GET", url);
				xhr.onload = function(e, f, g) {
					var text = xhr.responseText;
					console.log(text);
				};
				xhr.onerror = function(e, f, g) {
					console.log(e, f, g);
				};
				// xhr.send();
			}, 1000);
		}
	},

	_artist: {
		value: null
	},

	/**
	 * @type {string}
	 * @default null
	 */
	artist: {
		get: function() {
			return this._artist;
		},
		set: function(artist) {
			if (artist && artist.trim() && artist.trim() === this._artist) {
				return;
			}

			var self = this;
			this._artist = artist.trim();

			// https://developers.google.com/image-search/v1/jsondevguide
			this.jsonpCall("https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + artist + "%20album%20cover&userip=69.70.68.82&safe=active",
				function(data) {
					console.log("Got album covers for "+ artist);
					console.log(data);
					var whichPicture = Math.floor(Math.random() * data.responseData.results.length);
					console.log("Showing image "+whichPicture);
					var result = data.responseData.results[whichPicture];
					if(result){
						self.posterSrc = result.url;
					}
				});
		}
	},

	handleArtistChange: {
		value: function() {
			console.log("artist changed");
		}
	},

	handlePosterSrcChange: {
		value: function(value) {
			if (this.posterSrc !== value) {
				console.log("postersrc changed " + value);
				this.posterSrc = value;
			}
			this.showPoster();
		}
	},

	handlePlayAction: {
		value: function() {
			console.log("Play");
			this.super();
			this.artist = this.currentArtist;
			this.track = this.currentTrack;
		}
	},

	/**
	 *
	 * https://github.com/montagejs/popcorn/blob/master/model/remotemediator.js
	 *
	 * @type {Object}
	 */
	jsonpCall: {
		value: function(url, callback) {
			var callbackName = "scriptCallback" + callback.uuid.replace(/-/g, "_"),
				script = document.createElement("script");

			window[callbackName] = function(data) {
				delete window[callbackName];
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}
				callback.apply(this, arguments);
			};

			script.type = 'text/javascript';
			script.src = url + "&callback=" + callbackName;
			document.head.appendChild(script);
		}
	}


});