
let animation = true;
let udacityPixels = [];
let pixelStack = [];
let activeColor = "#000";
let pencilColor = "#000";
let eyeDropper = false;
let topPixelStackIndex = pixelStack.length ? pixelStack.length -1 : 0;

const drawImage = (pixels)=>{

  let genObj = genFunc();

  let interval = setInterval(() => {
    let val = genObj.next();
    if (val.done) {
      clearInterval(interval);
    } else {
      $(`#${val.value.coords}`).css("background-color", val.value.color);
    }
  }, animation ? 100 : 0);

  function* genFunc() {
    for(let pixel of pixels) {
      yield pixel;
    }
  }

}


const clearGrid = ()=>{

  const height = $('#inputHeight').val();
  const weight = $('#inputWeight').val();
  
  for(let i=0; i<height; i++){
    for(let j=0; j<weight; j++){
      $(`#${i}_${j}`).css('background-color', '');
    }
  }

  udacityPixels = [];

};

const makeGrid = ()=>{
    
    //Empty Canvas
    $('#pixelCanvas').empty();
    
    
    const height = $('#inputHeight').val();
    const weight = $('#inputWeight').val();
    
    for(let i=0; i<height; i++){
      let row = `<div class="tileRow">`;
      for(let j=0; j<weight; j++){
        row+=`<div class="tileWrap"><div class="tile" id="${i}_${j}" data-coord="${i}_${j}" style="background-color: rgb(255, 255, 255);"></div></div>`;
      }
      row+=`</div>`;
      $('#pixelCanvas').append(row);
    }



    pixelStack.push([]);
    topPixelStackIndex = pixelStack.length ? pixelStack.length -1 : 0;
    
    
    
  
  }
  
  

  $("#sizePicker").submit((e)=>{
      e.preventDefault();
      makeGrid();
  });
  
  $("#pixelCanvas").on("mousedown", ".tile",(e)=>{

    let $this = $(e.currentTarget);
    if(eyeDropper){
      console.log($this.css("background-color"));
      activeColor = $this.css("background-color");
      pencilColor = $this.css("background-color");
      document.getElementById('colorPicker').jscolor.fromString($this.css("background-color"));
      eyeDropper = false;
      $("#pixelCanvas").removeClass("eyeDropper");
      return;
    }
    $this.css("background-color", activeColor);
    udacityPixels.push({
      coords: $this.data('coord'),
      color: activeColor
    });
  });

  
  
  
  
  let flag = false;
  
  $("#pixelCanvas").on({
      mousedown: () => {
        flag = true;
      },
      mouseup: () => {
        flag = false;
        console.log(udacityPixels);
      }
  });
  
  $("#pixelCanvas").on("mouseover", ".tile", (e)=>{
    
    let $this = $(e.currentTarget);

    let [col, row] = $this.data("coord").split("_")
    $("#colCell").html(col);
    $("#rowCell").html(row);

    if(flag){
      $this.css("background-color", activeColor);
      udacityPixels.push({
        coords: $this.data('coord'),
        color: activeColor
      });
    }
  });
  

  $("#animation").on("click", ()=>{
    animation = !animation;
  });

  $("#undo").on("click", ()=>{
    if(topPixelStackIndex == 0){
      return;
    }
    clearGrid();
    topPixelStackIndex--;
    udacityPixels = pixelStack[topPixelStackIndex];
    drawImage(udacityPixels);
  });

  $("#redo").on("click", ()=>{
    if(topPixelStackIndex == pixelStack.length-1){
      return;
    }
    clearGrid();
    topPixelStackIndex++;
    udacityPixels = pixelStack[topPixelStackIndex];
    drawImage(udacityPixels);
  });

  $("#reset").on("click", ()=>{
    clearGrid();
    pixelStack.push([]);
    topPixelStackIndex = pixelStack.length ? pixelStack.length -1 : 0;
  });

  $("#eraser").on("click", ()=>{
    activeColor = "#fff";
    document.getElementById('colorPicker').jscolor.fromString("#fff");
  });

  $("#pencil").on("click", ()=>{
    activeColor = pencilColor;
    document.getElementById('colorPicker').jscolor.fromString(pencilColor);
  });



  $("#pixelCanvas").on("mouseup", ".tile",()=>{
    pixelStack.push(udacityPixels.slice());
    topPixelStackIndex = pixelStack.length ? pixelStack.length -1 : 0;
  });

  $("#toggleGrid").on("click", ()=>{
    $("#pixelCanvas").toggleClass("noframe");
  });

  $("#eyeDropper").on("click", (e)=>{
    eyeDropper = true;
    $("#pixelCanvas").addClass("eyeDropper");
  });

  $("#frame-box").on("click", ()=>{
    $("#frame-box").addClass("active");
    $("#frame-circle").removeClass("active");
    $("#pixelCanvas").removeClass("circle");
  });

  $("#frame-circle").on("click", ()=>{
    $("#frame-circle").addClass("active");
    $("#frame-box").removeClass("active");
    $("#pixelCanvas").addClass("circle");
  });

  $("#save").on("click", ()=>{
    $("#backdrop").addClass("show-backdrop");
    setTimeout(()=>{
      html2canvas(document.querySelector("#pixelCanvas")).then(canvas => {
        //document.body.appendChild(canvas)
        //console.log(canvas.toDataURL());
        //Canvas2Image.saveAsPNG(canvas);
        // let data =  canvas.toDataURL();
        
        // let blob = new Blob(data, {type: "image/jpeg"});
        // saveAs(blob, "pic.png");
  
        canvas.toBlob(function(blob){ saveAs(blob,"pic.png"); });
        $("#backdrop").removeClass("show-backdrop");
      });

    },0);
  });


  function updateColor(picker) {
    activeColor = picker.toHEXString();
    pencilColor = picker.toHEXString();
  }

  function setColor(color){
    activeColor = color;
    pencilColor = color;
    document.getElementById('colorPicker').jscolor.fromString(color);
  }

  function changeTheme(color){
    $("#theme").attr('data-theme', color);
  }


  


  /* CTRL+__ events */
	$(window).bind('keydown', $.proxy(function(event) {
		if (event.ctrlKey || event.metaKey) {
			switch (String.fromCharCode(event.which).toLowerCase()) {
			case 'z':
				event.preventDefault();
				console.log("Ctrl + z");
        break;
      case 'y':
				event.preventDefault();
				console.log("Ctrl + y");
				break;
			default:
				break;
			}
		}
	},this));