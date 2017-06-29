var _noteDic={};
_noteDic['C4']=0;
_noteDic['C#4']=1;
_noteDic['D4']=2;
_noteDic['D#4']=3;
_noteDic['E4']=4;
_noteDic['F4']=5;
_noteDic['F#4']=6;
_noteDic['G4']=7;
_noteDic['G#4']=8;
_noteDic['A4']=9;
_noteDic['A#4']='A';
_noteDic['B4']='B';
_noteDic['C5']='C';
_noteDic['BR']='D';


var RecordLimit=50;

var _div_record;
//var _div_output;
var _div_blink;
var _div_add;

var _note;
var _len;

var _record_note=[];
var _beat_count=0;
// var _record_len=[];
var _record_light=[];

// for light
var _light_toggle=[0,0,0,0];
var _light_canvas;
var _color_tag=["Red","Green","Yellow"];

// for sound
var _synth;
var _transport_id;



window.onload=function(){
	
	_div_record=document.getElementById("_record");
	//_div_output=document.getElementById("_output");
	_div_blink=document.getElementById("_blink");
	_div_add=document.getElementById("_add");

	// set default_select
	_note='C4';
	var dn=document.getElementById("_default_note");
	dn.classList.add("Select");
	
	_len=1;
	var dl=document.getElementById("_default_len");
	dl.classList.add("Select");


	_synth=new Tone.Synth().toMaster();
	//_synth.triggerAttackRelease("C4", "8n");

	_light_canvas=document.getElementById("_light_canvas");

}

function setNote(sender,note){
	_note=note;	
	resetNoteSelection();
	sender.classList.add("Select");
}
function setLen(sender,len){
	_len=len;	
	resetLenSelection();
	sender.classList.add("Select");

}
function setLight(sender,light){
	if(_light_toggle[light]==0){
		if(light==3){
			resetLightSelection();	
			for(var i=0;i<3;++i) _light_toggle[i]=0;
			sender.classList.add("Select");
			_light_toggle[3]=1;

		}else{ 
			_div_blink.classList.remove("Select");		
			_light_toggle[3]=0;

			setLightSelection(_color_tag[light]);
			_light_toggle[light]=1;
		}
			
	}else{
		//sender.classList.remove("Select");
		resetLightSelection(_color_tag[light]);
		_light_toggle[light]=0;
	}
	
}

function addKey(){

	var len=_record_note.length;
	if(len>=RecordLimit) return;

	playNote(_note);
	
	_record_note.push({"time":_beat_count+"i","note":_note,"due":_len});
	_beat_count+=Tone.Transport.PPQ*_len;
	//_record_len.push(_len);
	_record_light.push(encodeLight(_light_toggle));
	updateRecord();
	checkLimit();
}
function clearKey(){
	// _record_len=[];
	_record_note=[];
	_record_light=[];
	_beat_count=0;
	updateRecord();
	checkLimit();
}
function deleteKey(){

	var len=_record_note.length;
	if(len<1) return;

	var note=_record_note.pop();
	_beat_count-=note.due*Tone.Transport.PPQ;
	// _record_len.pop();
	_record_light.pop();
	updateRecord();
	checkLimit();
}
function checkLimit(){
	
	var m=_record_note.length;
	if(m>=RecordLimit){
		_div_add.classList.add("Disable");
	}else{
		_div_add.classList.remove("Disable");
	}

}


function updateRecord(){
	_div_record.innerHTML="";

	var len=_record_note.length;
	for(var i=0;i<len;++i){
		var n=document.createElement('div');
		n.id="_note_"+i;
		n.className="RecordNote";
		n.style.width=120*_record_note[i].due+"px";
		n.innerHTML=String(i+1)+". "+_record_note[i].note;

		createLightSyntax(n,_record_light[i])

		_div_record.appendChild(n);
	}
}


function createOutput(){
	//_div_output.innerHTML="";
	var len=_record_note.length;
	if(len%2!=0){
		_record_note.push({"time":"192i","note":'BR',"due":0});
		//_record_len.push('0')
		len++;
	}
	
	var speed=document.getElementById("_speed").value;

	var txt="unsigned int _step="+Math.round(6000/speed)+";"
			// +"int _rest=10;"
			// +"int _blink=20;"
			+"unsigned int _song_len="+len+";"
			+"byte _song[]={"
			+createSongByte()
			+"};"
			+"byte _due[]={"
			+createLenByte()
			+"};"
			+"byte _light[]={"
			+createLightByte()
			+"};";

	// _div_output.innerHTML=txt;
	window.open('include/create_header.php?content='+txt,'_blank');


}

function resetNoteSelection(){
	var keys=document.getElementsByClassName("Note");
	var len=keys.length;
	for(var i=0;i<len;++i){
		keys[i].classList.remove("Select");
	}

}
function resetLenSelection(){
	var keys=document.getElementsByClassName("Length");
	var len=keys.length;
	for(var i=0;i<len;++i){
		keys[i].classList.remove("Select");
	}

}


function createSongByte(){
	var len=_record_note.length;
	var txt="";
	for(var i=0;i<len;++i){
		if(i%2==0) txt+="0x";
		txt+=_noteDic[_record_note[i].note];
		if(i%2==1 && i!=len-1) txt+=",";

	}
	return txt;

}

function createLenByte(){
	var len=_record_note.length;
	var txt="";
	for(var i=0;i<len;++i){
		if(i%2==0) txt+="0x";
		txt+=_record_note[i].due;
		if(i%2==1 && i!=len-1) txt+=",";

	}
	return txt;

}

function createLightByte(){
	var len=_record_light.length;
	var txt="";
	for(var i=0;i<len;++i){
		if(i%2==0) txt+="0x";
		txt+=_record_light[i];
		if(i%2==1 && i!=len-1) txt+=",";

	}
	return txt;

}
function playNote(note){
	if(note!='BR')
		_synth.triggerAttackRelease(note,"8n");
}
function playRecord(){
	setupSequence();
	//Tone.Transport.start();

}

function setupSequence(){
	var len=_record_note.length;
	var seq=new Tone.Part(function(time, note){
		if(note.note!="BR")
			_synth.triggerAttackRelease(note.note,note.due*Tone.Transport.PPQ+"i",time);		
		
	},_record_note);
	//Array(len).fill().map((x,i)=>i));
	Tone.Transport.start();
	Tone.Transport.bpm.value=document.getElementById("_speed").value;
	seq.loop=false;

	seq.start();

}




