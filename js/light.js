function encodeLight(light){
	if(light[3]==1) return 8;
	if(light[0]==1&&light[1]==1&&light[2]==1) return 7;
	if(light[1]==1&&light[2]==1) return 6;
	if(light[0]==1&&light[2]==1) return 5;
	if(light[0]==1&&light[1]==1) return 4;
	if(light[2]==1) return 3;
	if(light[1]==1) return 2;
	if(light[0]==1) return 1;
	return 0;

}
function createLightSyntax(node_,light_){	

	if(light_==0){
		var light=document.createElement('span');
		light.className="record_light none";
		node_.appendChild(light);
	}

	if(light_==1 || light_==4 || light_==5 ||light_==7){
		var light=document.createElement('span');
		light.className="record_light r";
		node_.appendChild(light);
	}

	if(light_==2 || light_==4 || light_==6 ||light_==7){
		var light=document.createElement('span');
		light.className="record_light g";
		node_.appendChild(light);
	}

	if(light_==3 || light_==5 || light_==6 ||light_==7){
		var light=document.createElement('span');
		light.className="record_light y";
		node_.appendChild(light);
	}

	if(light_==8){
		var lightr=document.createElement('span');
		lightr.className="record_light r blink";
		node_.appendChild(lightr);	
		
		var lightg=document.createElement('span');
		lightg.className="record_light g blink";
		node_.appendChild(lightg);
		
		var lighty=document.createElement('span');
		lighty.className="record_light y blink";
		node_.appendChild(lighty);
	}

}

function setLightSelection(color_){
	
	var keys=document.getElementsByClassName(color_);
	var len=keys.length;
	for(var i=0;i<len;++i){
		keys[i].classList.add("Select");
	}	
}

function resetLightSelection(color_){
	
	if(color_!==undefined){
		var keys=document.getElementsByClassName(color_);
		var len=keys.length;
		for(var i=0;i<len;++i){
			keys[i].classList.remove("Select");
		}	
	}else{
		for(var k=0;k<3;++k){
			var keys=document.getElementsByClassName(_color_tag[k]);
			var len=keys.length;
			for(var i=0;i<len;++i){
				keys[i].classList.remove("Select");
			}		
		}
	}
}
