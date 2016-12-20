$(document).ready(function(){

	// Add directories to module search path, Prevents requiring local imports like ./js/lib/abc.js - instead becomes js/lib/abc.js
	require('app-module-path').addPath(__dirname);
	const path = require('path')
	global.isSleeping = false
	const ipcRenderer = require('electron').ipcRenderer
	
	const onlineStatus = require('js/check-online-status')()
	
	////**** WIFI SCANNING ****////

	//const wifi = require('js/wifi-scan.js')();

	//const mic = require('js/listen')()
	//const hotword = require('js/hotword')()
	
	const socket = require('js/socket')()

	const event = require('js/events')
	const listeners = require('js/listeners')()

	event.emit("show-div","eyeWrapper")
	event.emit("start-blinking")

	//mic.start(hotword.detector)

	$("body").on("click", function(e){
		
		var boop = path.join(__dirname, './images', 'local', 'r_boop', 'boop.gif')
		event.emit("servo","boop")
		event.emit("stop-music")
		event.emit("play-gif",boop)

		setTimeout(function(){
			event.emit("gif-timer-ended",null)
		},2000)
	})

	ipcRenderer.on("hotword", function(event,arg){
		console.log("HOTWORD",arg)
	})
	ipcRenderer.on("final-results", function(event,msg){
		console.log("FINAL", msg)
	})
	ipcRenderer.on("partial-results", function(event, msg){
		console.log("Partial", msg)
	})

})