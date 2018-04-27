var fileTypes = [
  'image/jpeg',
  'image/bmp',
  'image/png',
  'image/gif'
]

var sw = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var sh = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

sh=sh-100;
sw=sw-50;

const useBlob = true;
let video = false;
let zzz = "";
zzz = window.location.search;
if (zzz == "?v") {
  video = true;
}

let im = document.getElementById("her");
let nrher = document.getElementById("nr");

function validFileType(file) {
  if (video) {
    if(file.type === "video/mp4") {
      return true;
    }
  }
  else {
    for(var i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      }
    }
  }
  return false;
}

let output;
let files;
let i = 0;
let minTimer;
let timerOn = false;
let v = document.getElementById("video");
let xx;
var f;
let ratio;
let tilfaeldig = true;
let tabel = [];
// v.style.visibility = "hidden";

function lav_tabel() {
	for (var f = 0; f < files.length; f++) {
		tabel[f] = f;
	}
}

function lars() {
  document.body.classList.add('busy-cursor');
}

function videoRun2() {
  console.log(files[i],' hej');
  // v.style.visibility = "visible";
  
  
}
function videoRun() {
      window.URL.revokeObjectURL(f);
      f = window.URL.createObjectURL(files[i]);
  //  console.log(f);
  //  document.getElementById("videoher").src = f;
  //  document.getElementById("videoher").src = "test.mp4";

    xx = document.getElementById("mediaer").lastChild;
    document.getElementById("mediaer").removeChild(xx);
    var x = document.createElement("VIDEO");

    if (x.canPlayType("video/mp4")) {
      x.setAttribute("src", f);
    } 
    x.setAttribute("width", sw-100);
    x.setAttribute("max-height", sh-200);
    x.setAttribute("controls", "controls");
    x.setAttribute("id", "video1");
    x.setAttribute("autoplay", "autoplay");
    document.getElementById("mediaer").appendChild(x);
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
 // alert('keydown event\n\n' + 'key: ' + keyName);
  if (keyName == "ArrowRight") {frem();}
  else if (keyName == "ArrowLeft") {tilbage();}
  else if (keyName == " ") {
  	if (!timerOn) {
  		timer();
  	}
  	else {pause();}
  }
});


document.getElementById("filepicker").addEventListener("change", function(event) {
  output = document.getElementById("listing");
  
  files = event.target.files;
  //for (i=0; i<files.length; i++) {
 //   let item = document.createElement("li");
//    item.innerHTML = files[i].webkitRelativePath;
//    output.appendChild(item);
//  };

if (files.length > 0) {
	if (tilfaeldig) {
		lav_tabel();
	}
  frem();
  document.body.classList.remove('busy-cursor');
}
}, false);

// document.body.classList.remove('busy-cursor');

function frem2() {
	alert("frem2");
	var x = document.getElementById("startfra").value;
	console.log(x);
	if (x > 0) {
		i = x-1;
		document.getElementById("startfra").value = 0;
	}
	
	do {
		i++;
	}
	while ((i == files.length) || (validFileType(files[i]) == false));
	if (!(i == files.length)) {
		im = document.getElementById("her");
		var hej = window.URL.createObjectURL(files[i]);
		im.src = hej;
		console.log("img højder="+im.height);
		document.getElementById("nr").innerHTML = i+" "+files[i].webkitRelativePath;
	    im.onload = function() {
	        window.URL.revokeObjectURL(this.src);
	    }
	} 
}

function frem() {
	var x = document.getElementById("startfra").value;
	console.log(x);
	if (x > 0) {
		i = x-1;
		document.getElementById("startfra").value = 0;
	}
	
	do {
		if (tilfaeldig) {
			if (tabel.length == 0) {lav_tabel();}
			var t = Math.floor((Math.random() * (tabel.length-1)));
			i = tabel[t];
			tabel.splice(t,1);
		}
		else {i++;}
		
		console.log(i);
		if (i == files.length + 1) {i = 1;}
	}
	while ((validFileType(files[i]) == false));
  
  if (video) {

    videoRun();
  }
  else
  {
  	if (!(i == files.length)) {
  		readImage(files[i]);
  	}}
//	im = document.getElementById("her");
//	var hej = window.URL.createObjectURL(files[i]);
//	im.src = hej;
//	console.log("img højder="+im.height);
//	document.getElementById("nr").innerHTML = i+" "+files[i].webkitRelativePath;
    if (!video) {
    im.onload = function() {
        window.URL.revokeObjectURL(this.src);
    }} 
}

function readImage (file) {

  // Create a new FileReader instance
  // https://developer.mozilla.org/en/docs/Web/API/FileReader
  var reader = new FileReader();

  // Once a file is successfully readed:
  reader.addEventListener("load", function () {

    // At this point `reader.result` contains already the Base64 Data-URL
    // and we've could immediately show an image using
    // `elPreview.insertAdjacentHTML("beforeend", "<img src='"+ reader.result +"'>");`
    // But we want to get that image's width and height px values!
    // Since the File Object does not hold the size of an image
    // we need to create a new image and assign it's src, so when
    // the image is loaded we can calculate it's width and height:
    var image  = new Image();
    image.addEventListener("load", function () {

      // Concatenate our HTML image info 
      var imageInfo = file.name    +' '+ // get the value of `name` from the `file` Obj
          image.width  +'×'+ // But get the width from our `image`
          image.height +' '+
          file.type    +' '+
          Math.round(file.size/1024) +'KB';

    ratio = image.width / image.height;

    if ((image.height / image.width) > 1) {
    	im.style.height = sh +"px";
  		im.style.width = (sh * ratio)+"px";
    } 
    else {
    	im.style.maxHeight = sh+"px";
      im.style.maxWidth = sw+"px";
    	im.style.width = sw +"px";
    	var h = (sw / ratio);
    	im.style.height = h+"px";
    	if (h > (sh-200)) {
    		im.style.height = sh +"px";
    		im.style.width = (sh * ratio)+"px";
    	}
    }

    document.getElementById("nr").innerHTML = "nr. "+i+"  "+imageInfo;
    if (useBlob) {
      // Free some memory for optimal performance
      window.URL.revokeObjectURL(image.src);
    }
    });
    
    image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
    im.src = image.src;
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  reader.readAsDataURL(file);  
}


function timer() {
	if (!timerOn) {
		minTimer = setInterval(function(){frem()}, 2500);
		timerOn = true;
	}
	
}
function pause() {
	clearInterval(minTimer);
	timerOn = false;
}

function tilbage() {
	do {
		i = i - 1;
	}
	while (validFileType(files[i]) == false);
	readImage(files[i]);
//	im = document.getElementById("her");
//	im.src = window.URL.createObjectURL(files[i]);
//	document.getElementById("nr").innerHTML = i+" "+files[i].webkitRelativePath;
    im.onload = function() {
        window.URL.revokeObjectURL(this.src);}
     
}