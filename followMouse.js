var followMouse = (function(){
	my = {};
	my.elements = []
	my.add = function(e,c,l,t,s,m,sh){
		var elementToAdd = {element:e, color:c, length:l, tilt:t, steps:s, maxAngle:m, dropShadow:sh}
		my.elements.push(elementToAdd);
	}
	my.activate = function(){
		document.addEventListener('mousemove', my.follow, true);
	}
	my.follow = function(e){
		for(var j = 0; j < my.elements.length; j++){
			var v = my.elements[j]
			var xt0 = (v.element.getBoundingClientRect().right + v.element.getBoundingClientRect().left) / 2,
			yt0 = (v.element.getBoundingClientRect().bottom + v.element.getBoundingClientRect().top) / 2;
			var xm=window.innerWidth,
			ym=window.innerHeight;
			var x = (xt0 - e.clientX)/xm,
			y = (yt0 - e.clientY)/ym,
			shadow = '',
			i;
			console.log(v.element);
			if(Math.abs(v.tilt*y) > v.maxAngle){y = v.maxAngle*y/Math.abs(y)/v.tilt;}
			if(Math.abs(v.tilt*x) > v.maxAngle){x = v.maxAngle*x/Math.abs(x)/v.tilt;}
			for (i=0; i<v.steps; i++) {
				tx = Math.round(100*v.length * x / v.steps * i)/100;
				ty = Math.round(100*v.length * y / v.steps * i)/100;
				shadow += tx + 'px ' + ty + 'px 0px '+v.color + ', ';
			}
			var dropShadowOpacity = (v.dropShadow)?"0.6":"0";
			shadow += x*1.5 + 'px ' + y*1.5 + 'px 5px rgba(0,0,0,' + dropShadowOpacity + ')';
			v.element.style.textShadow = shadow;
			v.element.style.webkitTransform = 'translateZ(0) rotateX(' + String(v.tilt*y) + 'deg) rotateY(' + String(-v.tilt*x) + 'deg)';
			v.element.style.MozTransform = 'translateZ(0) rotateX(' + String(v.tilt*y) + 'deg) rotateY(' + String(-v.tilt*x) + 'deg)';
		}
	}
	return my;
}())
