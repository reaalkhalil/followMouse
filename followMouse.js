var followMouse = (function(){
	my = {};
	my.elements = [];
	my.add = function(e,c,d,t,s,m,sh){
		var elementToAdd = {element:e, color:c, depth:d, tilt:t, steps:s, maxAngle:m, dropShadow:sh};
		my.elements.push(elementToAdd);
	};
    my.activate = function(){
		/// for desktop:
		function mousemove(e){
			my.follow(e.clientX,e.clientY);
		}
		document.addEventListener('mousemove',mousemove, true);
		/// for mobile:
		if (window.DeviceOrientationEvent) {
			window.ondeviceorientation = function(event) {
				var alpha = event.alpha;
				var beta = event.beta;
				var gamma = event.gamma;
				if (beta < 90) {
					gamma = Math.round(event.gamma);
					beta = Math.round(event.beta) - 50;
				}else{
					gamma = -Math.round(event.gamma);
					beta = Math.round(event.beta) - 120;
				}
             my.follow(window.innerWidth/2 - gamma*5, -beta*10 + window.innerHeight/2);
  	       };
		}
	};
	my.follow = function(clientX, clientY){
		for(var j = 0; j < my.elements.length; j++){
			var v = my.elements[j];
			var xt0 = (v.element.getBoundingClientRect().right + v.element.getBoundingClientRect().left) / 2,
			yt0 = (v.element.getBoundingClientRect().bottom + v.element.getBoundingClientRect().top) / 2;
			var xm=window.innerWidth,
			ym=window.innerHeight;
			var x = (xt0 - clientX)/xm,
			y = (yt0 - clientY)/ym,
			shadow = '',
			i;
			if(Math.abs(v.tilt*y) > v.maxAngle){y = v.maxAngle*y/Math.abs(y)/v.tilt;}
			if(Math.abs(v.tilt*x) > v.maxAngle){x = v.maxAngle*x/Math.abs(x)/v.tilt;}
			for (i=0; i<v.steps; i++) {
				tx = Math.round(100*v.depth * x / v.steps * i)/100;
				ty = Math.round(100*v.depth * y / v.steps * i)/100;
				shadow += tx + 'px ' + ty + 'px 0px '+v.color + ', ';
			}
			var dropShadowOpacity = (v.dropShadow)?"0.6":"0";
			shadow += x*1.5 + 'px ' + y*1.5 + 'px 5px rgba(0,0,0,' + dropShadowOpacity + ')';
			v.element.style.textShadow = shadow;
			v.element.style.webkitTransform = 'translateZ(0) rotateX(' + String(v.tilt*y) + 'deg) rotateY(' + String(-v.tilt*x) + 'deg)';
			v.element.style.MozTransform = 'translateZ(0) rotateX(' + String(v.tilt*y) + 'deg) rotateY(' + String(-v.tilt*x) + 'deg)';
		}
	};
	return my;
}());
