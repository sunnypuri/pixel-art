
class PixelArt {

    constructor() {
        this.bindEvents();

        this.animation = true;
        this.udacityPixels = [];
        this.pixelStack = [];
        this.activeColor = "#000";
        this.pencilColor = "#000";
        this.eyeDropper = false;
        this.topPixelStackIndex = this.pixelStack.length ? this.pixelStack.length -1 : 0;
        this.flag = false;
        this.savedFrames = [];
        
        this.makeGrid(30, 50);

        let theme;
        if(localStorage.getItem("theme")){
            theme = localStorage.getItem("theme");
        }else{
            localStorage.setItem("theme", "primary");
            theme = "primary";
        }

        $("body").attr("data-theme", theme);

        if(localStorage.getItem("pixels")){
            this.udacityPixels = JSON.parse(localStorage.getItem("pixels"));
            this.pixelStack.push(this.udacityPixels.slice());
            this.topPixelStackIndex = this.pixelStack.length ? this.pixelStack.length -1 : 0;
            this.drawImage(JSON.parse(localStorage.getItem("pixels")), false);
        }else{
            //this.loadingImage();
        }


        let udacityFrame = {
            id: 1,
            name: "Udacity",
            data: [{"coords":"2_15","color":"#000"},{"coords":"3_15","color":"#000"},{"coords":"4_15","color":"#000"},{"coords":"5_15","color":"#000"},{"coords":"6_15","color":"#000"},{"coords":"7_15","color":"#000"},{"coords":"8_15","color":"#000"},{"coords":"9_15","color":"#000"},{"coords":"10_15","color":"#000"},{"coords":"11_15","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"12_16","color":"#000"},{"coords":"12_17","color":"#000"},{"coords":"12_18","color":"#000"},{"coords":"12_19","color":"#000"},{"coords":"12_20","color":"#000"},{"coords":"12_21","color":"#000"},{"coords":"11_21","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"10_22","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"9_23","color":"#000"},{"coords":"8_23","color":"#000"},{"coords":"7_23","color":"#000"},{"coords":"6_23","color":"#000"},{"coords":"5_23","color":"#000"},{"coords":"4_24","color":"#000"},{"coords":"3_24","color":"#000"},{"coords":"2_24","color":"#000"},{"coords":"1_24","color":"#000"},{"coords":"2_23","color":"#000"},{"coords":"3_23","color":"#000"},{"coords":"4_23","color":"#000"},{"coords":"5_23","color":"#000"},{"coords":"5_24","color":"#000"},{"coords":"6_24","color":"#000"},{"coords":"7_24","color":"#000"},{"coords":"8_24","color":"#000"},{"coords":"9_24","color":"#000"},{"coords":"9_23","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"10_22","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"11_21","color":"#000"},{"coords":"11_20","color":"#000"},{"coords":"11_19","color":"#000"},{"coords":"11_18","color":"#000"},{"coords":"11_17","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"10_16","color":"#000"},{"coords":"9_16","color":"#000"},{"coords":"8_16","color":"#000"},{"coords":"7_16","color":"#000"},{"coords":"6_16","color":"#000"},{"coords":"5_16","color":"#000"},{"coords":"4_16","color":"#000"},{"coords":"3_16","color":"#000"},{"coords":"4_16","color":"#000"},{"coords":"5_16","color":"#000"},{"coords":"5_15","color":"#000"},{"coords":"6_15","color":"#000"},{"coords":"7_15","color":"#000"},{"coords":"8_16","color":"#000"},{"coords":"9_16","color":"#000"},{"coords":"10_16","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"12_17","color":"#000"},{"coords":"13_17","color":"#000"},{"coords":"13_18","color":"#000"},{"coords":"13_19","color":"#000"},{"coords":"13_20","color":"#000"},{"coords":"13_21","color":"#000"},{"coords":"12_22","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"11_23","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"11_23","color":"#000"},{"coords":"12_23","color":"#000"},{"coords":"12_22","color":"#000"},{"coords":"12_21","color":"#000"},{"coords":"12_20","color":"#000"}]
        }

        this.savedFrames.push(udacityFrame);

        for(let frame of this.savedFrames){
            $("#savedFramesList").append(`<div class="saved-frame" onclick="pixel.callSavedFrame(${frame.id})"><b>${frame.id}.</b> ${frame.name}</div>`);
        }

        return this;
    }

    bindEvents(){

        $("#myRange").on("change", ()=>{
            let width = $("#myRange").val();
            $(".inner").css("width", `${width}%`);
        });

        $("#sizePicker").submit((e)=>{
            e.preventDefault();
            const height = $('#inputHeight').val();
            const width = $('#inputWidth').val();
            this.makeGrid(height, width);
        });

        $("#saveFrame").submit((e)=>{
            e.preventDefault();
            const frameName = $('#frameName').val();

            let frame = {
                id: this.savedFrames.length+1,
                name: frameName || "Untitled",
                data: this.udacityPixels
            }

            this.savedFrames.push(frame);
            $('#saveModal').modal('toggle');
            $('#frameName').val("");

            $("#savedFramesList").append(`<div class="saved-frame" onclick="pixel.callSavedFrame(${frame.id})"><b>${frame.id}.</b> ${frame.name}</div>`);

            toastr.success('Frame Saved Successfully!');
        });
        


        $("#pixelCanvas").on("mousedown", ".tile",(e)=>{

            let $this = $(e.currentTarget);
            if(this.eyeDropper){
                console.log($this.css("background-color"));
                this.activeColor = $this.css("background-color");
                this.pencilColor = $this.css("background-color");
                document.getElementById('colorPicker').jscolor.fromString($this.css("background-color"));
                this.eyeDropper = false;
                $("#pixelCanvas").removeClass("eyeDropper");
                return;
            }
            $this.css("background-color", this.activeColor);
            this.udacityPixels.push({
                coords: $this.data('coord'),
                color: this.activeColor
            });
        });

        $("#pixelCanvas").on({
            mousedown: () => {
              this.flag = true;
            },
            mouseup: () => {
              this.flag = false;
              console.log(this.udacityPixels);
            }
        });

        $("#pixelCanvas").on("mouseover", ".tile", (e)=>{
    
            let $this = $(e.currentTarget);
        
            let [col, row] = $this.data("coord").split("_")
            $("#colCell").html(col);
            $("#rowCell").html(row);
        
            if(this.flag){
              $this.css("background-color", this.activeColor);
              this.udacityPixels.push({
                coords: $this.data('coord'),
                color: this.activeColor
              });
            }
        });

        $("#animation").on("click", ()=>{
            this.animation = !this.animation;
        });


        $("#undo").on("click", this.undo.bind(this));

        $("#redo").on("click", this.redo.bind(this));

        $("#reset").on("click", this.reset.bind(this));
        
        $("#eraser").on("click", ()=>{
            this.activeColor = "#fff";
            document.getElementById('colorPicker').jscolor.fromString("#fff");
        });
    
        $("#pencil").on("click", ()=>{
            this.activeColor = this.pencilColor;
            document.getElementById('colorPicker').jscolor.fromString(this.pencilColor);
        });

        $("#pixelCanvas").on("mouseup", ".tile",()=>{
            localStorage.setItem("pixels", JSON.stringify(this.udacityPixels));
            this.pixelStack.push(this.udacityPixels.slice());
            this.topPixelStackIndex = this.pixelStack.length ? this.pixelStack.length -1 : 0;
        });
        
        $("#toggleGrid").on("click", this.toggleGrid.bind(this));
        
        $("#eyeDropper").on("click", (e)=>{
            this.eyeDropper = true;
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

        $("#download").on("click", this.downloadGrid.bind(this));

        $("#help").on("click", this.help.bind(this));

        $("#save").on("click", this.save.bind(this));

        $("#logo").on("click", this.loadingImage.bind(this));


        /* CTRL+__ events */
        $(window).bind('keydown', $.proxy((event)=> {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                case 'c':
                    event.preventDefault();
                    console.log("Ctrl + C");
                    this.reset();
                    break;
                case 'd':
                    event.preventDefault();
                    console.log("Ctrl + D");
                    this.downloadGrid();
                    break;
                case 'g':
                    event.preventDefault();
                    console.log("Ctrl + G");
                    this.toggleGrid();
                    break;
                case 'h':
                    event.preventDefault();
                    console.log("Ctrl + H");
                    this.help();
                    break;
                case 's':
                    event.preventDefault();
                    console.log("Ctrl + S");
                    this.save();
                    break;
                case 'y':
                    event.preventDefault();
                    console.log("Ctrl + Y");
                    this.redo();
                    break;
                case 'z':
                    event.preventDefault();
                    console.log("Ctrl + Z");
                    this.undo();
                    break;
                default:
                    break;
                }
            }
        },this));

    }

    callSavedFrame(id){
        let frame = this.savedFrames.filter((frame)=>{
            return frame.id == id;
        })[0];

        this.clearGrid();
        this.drawImage(frame.data, true);
        //console.log(frame);
    }

    loadingImage(){
        this.clearGrid();
        let pixels = [{"coords":"2_15","color":"#000"},{"coords":"3_15","color":"#000"},{"coords":"4_15","color":"#000"},{"coords":"5_15","color":"#000"},{"coords":"6_15","color":"#000"},{"coords":"7_15","color":"#000"},{"coords":"8_15","color":"#000"},{"coords":"9_15","color":"#000"},{"coords":"10_15","color":"#000"},{"coords":"11_15","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"12_16","color":"#000"},{"coords":"12_17","color":"#000"},{"coords":"12_18","color":"#000"},{"coords":"12_19","color":"#000"},{"coords":"12_20","color":"#000"},{"coords":"12_21","color":"#000"},{"coords":"11_21","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"10_22","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"9_23","color":"#000"},{"coords":"8_23","color":"#000"},{"coords":"7_23","color":"#000"},{"coords":"6_23","color":"#000"},{"coords":"5_23","color":"#000"},{"coords":"4_24","color":"#000"},{"coords":"3_24","color":"#000"},{"coords":"2_24","color":"#000"},{"coords":"1_24","color":"#000"},{"coords":"2_23","color":"#000"},{"coords":"3_23","color":"#000"},{"coords":"4_23","color":"#000"},{"coords":"5_23","color":"#000"},{"coords":"5_24","color":"#000"},{"coords":"6_24","color":"#000"},{"coords":"7_24","color":"#000"},{"coords":"8_24","color":"#000"},{"coords":"9_24","color":"#000"},{"coords":"9_23","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"10_22","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"11_21","color":"#000"},{"coords":"11_20","color":"#000"},{"coords":"11_19","color":"#000"},{"coords":"11_18","color":"#000"},{"coords":"11_17","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"10_16","color":"#000"},{"coords":"9_16","color":"#000"},{"coords":"8_16","color":"#000"},{"coords":"7_16","color":"#000"},{"coords":"6_16","color":"#000"},{"coords":"5_16","color":"#000"},{"coords":"4_16","color":"#000"},{"coords":"3_16","color":"#000"},{"coords":"4_16","color":"#000"},{"coords":"5_16","color":"#000"},{"coords":"5_15","color":"#000"},{"coords":"6_15","color":"#000"},{"coords":"7_15","color":"#000"},{"coords":"8_16","color":"#000"},{"coords":"9_16","color":"#000"},{"coords":"10_16","color":"#000"},{"coords":"11_16","color":"#000"},{"coords":"12_17","color":"#000"},{"coords":"13_17","color":"#000"},{"coords":"13_18","color":"#000"},{"coords":"13_19","color":"#000"},{"coords":"13_20","color":"#000"},{"coords":"13_21","color":"#000"},{"coords":"12_22","color":"#000"},{"coords":"11_22","color":"#000"},{"coords":"11_23","color":"#000"},{"coords":"10_23","color":"#000"},{"coords":"11_23","color":"#000"},{"coords":"12_23","color":"#000"},{"coords":"12_22","color":"#000"},{"coords":"12_21","color":"#000"},{"coords":"12_20","color":"#000"}];
        this.drawImage(pixels, true);
    }

    help(){
        $('#helpModal').modal('toggle')
    }

    save(){
        $('#saveModal').modal('toggle');
    }

    downloadGrid(){
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
                toastr.success('Downloaded Successfully!');
                });
        
            },0);
    }

    toggleGrid(){
        $("#pixelCanvas").toggleClass("noframe");
    }

    undo(){
        if(this.topPixelStackIndex == 0){
            return;
        }
        this.clearGrid();
        this.topPixelStackIndex--;
        this.udacityPixels = this.pixelStack[this.topPixelStackIndex];
        this.drawImage(this.udacityPixels, false);
    }

    redo(){
        if(this.topPixelStackIndex == this.pixelStack.length-1){
            return;
        }
        this.clearGrid();
        this.topPixelStackIndex++;
        this.udacityPixels = this.pixelStack[this.topPixelStackIndex];
        this.drawImage(this.udacityPixels, false);
    }

    reset(){
        this.clearGrid();
        this.pixelStack.push([]);
        this.topPixelStackIndex = this.pixelStack.length ? this.pixelStack.length -1 : 0;
        localStorage.setItem("pixels", "");
    }

    drawImage(pixels, animationFlag){

        let genObj = genFunc();
        
        let interval = setInterval(() => {
            let val = genObj.next();
            if (val.done) {
            clearInterval(interval);
            } else {
            $(`#${val.value.coords}`).css("background-color", val.value.color);
            }
        }, animationFlag ? this.animation ? 100 : 0 : 0);
        
        function* genFunc() {
            for(let pixel of pixels) {
            yield pixel;
            }
        }
        
    }


    clearGrid(){

        const height = $('#inputHeight').val();
        const width = $('#inputWidth').val();
        
        for(let i=0; i<height; i++){
          for(let j=0; j<width; j++){
            $(`#${i}_${j}`).css('background-color', '');
          }
        }
      
        this.udacityPixels = [];
      
    }


    makeGrid(height, width){
        $('#pixelCanvas').empty();
        
        for(let i=0; i<height; i++){
          let row = `<div class="tileRow">`;
          for(let j=0; j<width; j++){
            row+=`<div class="tileWrap"><div class="tile" id="${i}_${j}" data-coord="${i}_${j}" style="background-color: rgb(255, 255, 255);"></div></div>`;
          }
          row+=`</div>`;
          $('#pixelCanvas').append(row);
        }

        this.pixelStack.push([]);
        this.topPixelStackIndex = this.pixelStack.length ? this.pixelStack.length -1 : 0;

      }

      updateColor(picker) {
        this.activeColor = picker.toHEXString();
        this.pencilColor = picker.toHEXString();
      }
    
      setColor(color){
        this.activeColor = color;
        this.pencilColor = color;
        document.getElementById('colorPicker').jscolor.fromString(color);
      }
    
      changeTheme(color){
        $("body").attr('data-theme', color);
        localStorage.setItem("theme", color);
      }


}
