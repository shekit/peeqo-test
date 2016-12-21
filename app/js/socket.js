const ip = require('ip');
const config = require('config/config.js')
const event = require('js/events')
var socket = io(config.peeqo.server + '/peeqo')

module.exports = function(){

	socket.on("shutdown", function(msg){
		event.emit("shutdown")
	})

	socket.on("reboot", function(msg){
		event.emit("reboot")
	})

	socket.on("refresh", function(msg){
		event.emit("refresh")
	})

	socket.on("listen", function(msg){

		var obj = {
			gif_type:null,  //local/remote/null
			gif_category:null,
			gif_url: null,
			gif_loop_forever: false,
			servo:"alert",
			led:"alert",
			sound:"alert",
			sound_loop_forever: false
		}

		event.emit("animate",obj)
	})

	socket.on("sayHi", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"hello",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"greenBlink",
			sound:"hi",
			sound_loop_forever: false,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on("tickle", function(msg){
		event.emit("servo-raw",msg)

		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"r_tickle",
			gif_url: null,
			gif_loop_forever: true,
			servo:"tickle",
			led:null,
			sound:null,
			sound_loop_forever: true,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on('tickle-reset', function(){
		event.emit("stop-sound")
		event.emit("gif-timer-ended",null)
		var obj = {
			gif_type:null,  //local/remote
			gif_category:null,
			gif_url: null,
			gif_loop_forever: false,
			servo: "reset",
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: function(){

				var anim = {
					gif_type:"local",  //local/remote
					gif_category:"r_hate",
					gif_url: null,
					gif_loop_forever: false,
					servo:null,
					led:null,
					sound:null,
					sound_loop_forever: false,
					callback: null
				}

				setTimeout(function(){
					event.emit("animate", anim)
				},1500)
			}
		}
		event.emit("animate", obj)
	})

	socket.on('purpose', function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"r_purpose",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:null,
			sound:null,
			sound_loop_forever: true,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on('omg', function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"r_omg",
			gif_url: null,
			gif_loop_forever: false,
			servo:"sad",
			led:"fadeRed",
			sound:"sad",
			sound_loop_forever: false,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on("animate", function(obj){
		event.emit("animate", obj)
	})

	socket.on("sayBye", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"bye",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"blueBlink",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("sayYes", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"yes",
			gif_url: null,
			gif_loop_forever: false,
			servo:"yes",
			led:null,
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("blinkLed", function(msg){
		event.emit("led","error")
	})

	socket.on("takePicture", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"countdown",
			gif_url: null,
			gif_loop_forever: true,
			servo:null,
			led:null,
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
		setTimeout(function(){
			event.emit("take-picture", true)
		},4000)
	})

	socket.on("playMusic", function(msg){
		event.emit("play-music", "beatles")
	})

	socket.on("sleep", function(msg){

		var obj = {
			gif_type:null,  //local/remote
			gif_category:null,
			gif_url: null,
			gif_loop_forever: false,
			servo:"sleep",
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("close-eyes")
			}
		}

		event.emit("animate",obj)
	})

	socket.on("wakeUp", function(msg){

		event.emit("stop-sound")
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"hello",
			gif_url: null,
			gif_loop_forever: false,
			servo:"wakeup",
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("start-fast-blink")
			}
		}
		event.emit("animate", obj)
	})

	socket.on("blockFacebook", function(msg){
		event.emit("block-site", "facebook", true)
		event.emit("block-site", "reddit", true)
	})

	socket.on("blockTwitter", function(msg){
		event.emit("block-site", "twitter", true)
	})

	socket.on("unblockFacebook", function(msg){
		event.emit("block-site", "facebook", false)
		event.emit("block-site", "reddit", false)
	})

	socket.on("unblockTwitter", function(msg){
		event.emit("block-site", "twitter", false)
	})

	socket.on("blocked", function(msg){

		if(msg.indexOf("facebook")>-1){
			msg = "facebook"
		} else if(msg.indexOf("twitter")>-1){
			msg = "twitter"
		} else if(msg.indexOf("reddit")>-1){
			msg = "reddit"
		}
		event.emit("check-blocked",msg)
	})

	socket.on("lightsOn", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"thumbs_up",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"success",
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("hue",true)
			}
		}

		event.emit("animate", obj)
		
	})

	socket.on("lightsOff", function(msg){

		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"thumbs_up",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"success",
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("hue",false)
			}
		}

		event.emit("animate", obj)

		
	})

	socket.on("showDance", function(msg){

		var obj = {
			gif_type:"remote",  //local/remote
			gif_category:"superman",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"greenBlink",
			sound:"hi",
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("idle", function(msg){
		event.emit("find-local-gif","no",true)
		event.emit("servo","no")
	})

	socket.on("stopIdle", function(msg){
		event.emit("find-local-gif","love",true)
		event.emit("servo","lookup")
	})

	socket.on("resetAll", function(msg){
		event.emit("reset")
	})

	socket.on("getIp", function(msg){
		var myIp = ip.address();
		socket.emit("peeqoIp", myIp)
	})

	socket.on("moveCurious", function(msg){
		event.emit("servo","curious")
	})

	socket.on("moveHappy", function(msg){
		event.emit("servo","happy")
	})

	socket.on("moveSad", function(msg){
		event.emit("servo","sad")
	})

	socket.on("moveNo", function(msg){
		event.emit("servo","no")
	})

	socket.on("moveAlert", function(msg){
		event.emit("servo","alert")
	})

	socket.on("moveReset", function(msg){
		event.emit("servo","reset")
		event.emit("led","off")
	})

	socket.on("ledFade", function(msg){
		event.emit("led","fade")
	})

	socket.on("ledAlert", function(msg){
		event.emit("led","alert")
	})

	socket.on("ledError", function(msg){
		event.emit("led","error")
	})

	socket.on("ledIdle", function(msg){
		event.emit("servo","idle")
	})

	socket.on("activateMusic",function(msg){
		event.emit("learn","spotify")
	})

	socket.on("deactivateMusic", function(msg){
		event.emit("unlearn","spotify")
	})

	socket.on("stopMusic", function(msg){
		event.emit("stop-music")
	})

	socket.on("showExpression", function(msg){
		event.emit("refresh")
	})

	socket.on("remote-gif", function(msg){
		var obj = {
			gif_type:"remote",  //local/remote
			gif_category:msg,
			gif_url: null,
			gif_loop_forever: false,
			servo:null,
			led:"success",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("direct-gif", function(msg){
		var obj = {
			gif_type:"remote",  //local/remote
			gif_category: null,
			gif_url: msg,
			gif_loop_forever: false,
			servo:null,
			led:"success",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("servo-raw", function(msg){
		console.log(msg)
		if(typeof(msg)!= "object" || msg.length != 6){
			return
		}

		event.emit("servo-raw",msg)

	})

}