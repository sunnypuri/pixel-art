
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
            data: [{"coords":"4_20","color":"#02B3E4"},{"coords":"4_19","color":"#02B3E4"},{"coords":"4_18","color":"#02B3E4"},{"coords":"5_18","color":"#02B3E4"},{"coords":"5_17","color":"#02B3E4"},{"coords":"5_16","color":"#02B3E4"},{"coords":"6_16","color":"#02B3E4"},{"coords":"6_15","color":"#02B3E4"},{"coords":"6_14","color":"#02B3E4"},{"coords":"7_14","color":"#02B3E4"},{"coords":"8_14","color":"#02B3E4"},{"coords":"9_14","color":"#02B3E4"},{"coords":"10_14","color":"#02B3E4"},{"coords":"11_14","color":"#02B3E4"},{"coords":"12_14","color":"#02B3E4"},{"coords":"13_14","color":"#02B3E4"},{"coords":"14_14","color":"#02B3E4"},{"coords":"15_14","color":"#02B3E4"},{"coords":"16_14","color":"#02B3E4"},{"coords":"17_14","color":"#02B3E4"},{"coords":"18_14","color":"#02B3E4"},{"coords":"18_15","color":"#02B3E4"},{"coords":"20_15","color":"#02B3E4"},{"coords":"19_15","color":"#02B3E4"},{"coords":"20_16","color":"#02B3E4"},{"coords":"20_17","color":"#02B3E4"},{"coords":"21_17","color":"#02B3E4"},{"coords":"21_18","color":"#02B3E4"},{"coords":"21_19","color":"#02B3E4"},{"coords":"21_20","color":"#02B3E4"},{"coords":"21_21","color":"#02B3E4"},{"coords":"21_22","color":"#02B3E4"},{"coords":"21_23","color":"#02B3E4"},{"coords":"22_19","color":"#02B3E4"},{"coords":"22_20","color":"#02B3E4"},{"coords":"22_21","color":"#02B3E4"},{"coords":"20_24","color":"#02B3E4"},{"coords":"20_26","color":"#02B3E4"},{"coords":"20_25","color":"#02B3E4"},{"coords":"19_25","color":"#02B3E4"},{"coords":"19_26","color":"#02B3E4"},{"coords":"20_26","color":"#fff"},{"coords":"18_26","color":"rgb(2, 179, 228)"},{"coords":"18_25","color":"rgb(2, 179, 228)"},{"coords":"18_24","color":"rgb(2, 179, 228)"},{"coords":"18_27","color":"rgb(2, 179, 228)"},{"coords":"18_28","color":"rgb(2, 179, 228)"},{"coords":"18_23","color":"rgb(2, 179, 228)"},{"coords":"18_22","color":"rgb(2, 179, 228)"},{"coords":"17_22","color":"rgb(2, 179, 228)"},{"coords":"17_21","color":"rgb(2, 179, 228)"},{"coords":"16_21","color":"rgb(2, 179, 228)"},{"coords":"15_20","color":"rgb(2, 179, 228)"},{"coords":"5_20","color":"rgb(2, 179, 228)"},{"coords":"6_20","color":"rgb(2, 179, 228)"},{"coords":"7_20","color":"rgb(2, 179, 228)"},{"coords":"8_20","color":"rgb(2, 179, 228)"},{"coords":"9_20","color":"rgb(2, 179, 228)"},{"coords":"10_20","color":"rgb(2, 179, 228)"},{"coords":"11_20","color":"rgb(2, 179, 228)"},{"coords":"12_20","color":"rgb(2, 179, 228)"},{"coords":"13_20","color":"rgb(2, 179, 228)"},{"coords":"14_20","color":"rgb(2, 179, 228)"},{"coords":"15_20","color":"rgb(2, 179, 228)"},{"coords":"17_26","color":"rgb(2, 179, 228)"},{"coords":"16_26","color":"rgb(2, 179, 228)"},{"coords":"17_27","color":"rgb(2, 179, 228)"},{"coords":"17_28","color":"rgb(2, 179, 228)"},{"coords":"17_29","color":"rgb(2, 179, 228)"},{"coords":"17_30","color":"rgb(2, 179, 228)"},{"coords":"16_30","color":"rgb(2, 179, 228)"},{"coords":"16_31","color":"rgb(2, 179, 228)"},{"coords":"15_31","color":"rgb(2, 179, 228)"},{"coords":"14_31","color":"rgb(2, 179, 228)"},{"coords":"13_31","color":"rgb(2, 179, 228)"},{"coords":"12_31","color":"rgb(2, 179, 228)"},{"coords":"11_31","color":"rgb(2, 179, 228)"},{"coords":"10_31","color":"rgb(2, 179, 228)"},{"coords":"9_31","color":"rgb(2, 179, 228)"},{"coords":"8_31","color":"rgb(2, 179, 228)"},{"coords":"7_31","color":"rgb(2, 179, 228)"},{"coords":"6_31","color":"rgb(2, 179, 228)"},{"coords":"5_31","color":"rgb(2, 179, 228)"},{"coords":"4_31","color":"rgb(2, 179, 228)"},{"coords":"4_30","color":"rgb(2, 179, 228)"},{"coords":"4_29","color":"rgb(2, 179, 228)"},{"coords":"5_29","color":"rgb(2, 179, 228)"},{"coords":"5_28","color":"rgb(2, 179, 228)"},{"coords":"5_27","color":"rgb(2, 179, 228)"},{"coords":"6_27","color":"rgb(2, 179, 228)"},{"coords":"6_26","color":"rgb(2, 179, 228)"},{"coords":"7_26","color":"rgb(2, 179, 228)"},{"coords":"8_26","color":"rgb(2, 179, 228)"},{"coords":"9_26","color":"rgb(2, 179, 228)"},{"coords":"10_26","color":"rgb(2, 179, 228)"},{"coords":"11_26","color":"rgb(2, 179, 228)"},{"coords":"12_26","color":"rgb(2, 179, 228)"},{"coords":"13_26","color":"rgb(2, 179, 228)"},{"coords":"14_26","color":"rgb(2, 179, 228)"},{"coords":"15_26","color":"rgb(2, 179, 228)"}]
        }

        let googleFrame = {
            id: 1,
            name: "Google",
            data: [{"coords":"6_28","color":"#E84234"},{"coords":"6_27","color":"#E84234"},{"coords":"6_26","color":"#E84234"},{"coords":"6_25","color":"#E84234"},{"coords":"6_24","color":"#E84234"},{"coords":"6_23","color":"#E84234"},{"coords":"6_22","color":"#E84234"},{"coords":"6_21","color":"#E84234"},{"coords":"6_20","color":"#E84234"},{"coords":"6_19","color":"#E84234"},{"coords":"6_18","color":"#E84234"},{"coords":"7_28","color":"#E84234"},{"coords":"7_27","color":"#E84234"},{"coords":"7_26","color":"#E84234"},{"coords":"7_25","color":"#E84234"},{"coords":"7_24","color":"#E84234"},{"coords":"7_23","color":"#E84234"},{"coords":"7_22","color":"#E84234"},{"coords":"7_21","color":"#E84234"},{"coords":"7_20","color":"#E84234"},{"coords":"7_19","color":"#E84234"},{"coords":"7_18","color":"#E84234"},{"coords":"7_17","color":"#E84234"},{"coords":"7_17","color":"#E84234"},{"coords":"8_27","color":"#E84234"},{"coords":"8_26","color":"#E84234"},{"coords":"5_27","color":"#E84234"},{"coords":"5_26","color":"#E84234"},{"coords":"5_25","color":"#E84234"},{"coords":"5_24","color":"#E84234"},{"coords":"5_23","color":"#E84234"},{"coords":"5_22","color":"#E84234"},{"coords":"5_21","color":"#E84234"},{"coords":"5_20","color":"#E84234"},{"coords":"5_19","color":"#E84234"},{"coords":"8_16","color":"#E84234"},{"coords":"8_17","color":"#E84234"},{"coords":"8_18","color":"#E84234"},{"coords":"8_19","color":"#E84234"},{"coords":"8_20","color":"#E84234"},{"coords":"8_21","color":"#E84234"},{"coords":"9_19","color":"#E84234"},{"coords":"9_18","color":"#E84234"},{"coords":"9_17","color":"#E84234"},{"coords":"9_16","color":"#E84234"},{"coords":"9_15","color":"#E84234"},{"coords":"10_15","color":"#F9BB08"},{"coords":"11_15","color":"#F9BB08"},{"coords":"12_15","color":"#F9BB08"},{"coords":"13_15","color":"#F9BB08"},{"coords":"14_15","color":"#F9BB08"},{"coords":"15_15","color":"#F9BB08"},{"coords":"16_15","color":"#F9BB08"},{"coords":"17_15","color":"#F9BB08"},{"coords":"16_16","color":"#F9BB08"},{"coords":"15_16","color":"#F9BB08"},{"coords":"14_16","color":"#F9BB08"},{"coords":"13_16","color":"#F9BB08"},{"coords":"12_16","color":"#F9BB08"},{"coords":"11_16","color":"#F9BB08"},{"coords":"10_16","color":"#F9BB08"},{"coords":"10_17","color":"#F9BB08"},{"coords":"11_17","color":"#F9BB08"},{"coords":"12_17","color":"#F9BB08"},{"coords":"13_17","color":"#F9BB08"},{"coords":"14_17","color":"#F9BB08"},{"coords":"15_17","color":"#F9BB08"},{"coords":"15_18","color":"#F9BB08"},{"coords":"14_18","color":"#F9BB08"},{"coords":"13_18","color":"#F9BB08"},{"coords":"12_18","color":"#F9BB08"},{"coords":"10_17","color":"rgb(232, 66, 52)"},{"coords":"10_18","color":"rgb(232, 66, 52)"},{"coords":"11_18","color":"rgb(232, 66, 52)"},{"coords":"18_15","color":"#32A852"},{"coords":"19_16","color":"#32A852"},{"coords":"20_17","color":"#32A852"},{"coords":"21_18","color":"#32A852"},{"coords":"22_19","color":"#32A852"},{"coords":"21_19","color":"#32A852"},{"coords":"20_19","color":"#32A852"},{"coords":"19_19","color":"#32A852"},{"coords":"18_19","color":"#32A852"},{"coords":"17_16","color":"#32A852"},{"coords":"18_16","color":"#32A852"},{"coords":"16_17","color":"#32A852"},{"coords":"17_17","color":"#32A852"},{"coords":"18_17","color":"#32A852"},{"coords":"19_17","color":"#32A852"},{"coords":"19_18","color":"#32A852"},{"coords":"18_18","color":"#32A852"},{"coords":"17_18","color":"#32A852"},{"coords":"16_18","color":"#32A852"},{"coords":"20_18","color":"#32A852"},{"coords":"19_20","color":"#32A852"},{"coords":"19_21","color":"#32A852"},{"coords":"20_22","color":"#32A852"},{"coords":"20_23","color":"#32A852"},{"coords":"20_24","color":"#32A852"},{"coords":"20_25","color":"#32A852"},{"coords":"19_26","color":"#32A852"},{"coords":"19_27","color":"#32A852"},{"coords":"20_28","color":"#32A852"},{"coords":"21_28","color":"#32A852"},{"coords":"22_27","color":"#32A852"},{"coords":"22_27","color":"#32A852"},{"coords":"22_26","color":"#32A852"},{"coords":"22_25","color":"#32A852"},{"coords":"22_24","color":"#32A852"},{"coords":"22_23","color":"#32A852"},{"coords":"22_22","color":"#32A852"},{"coords":"22_21","color":"#32A852"},{"coords":"22_20","color":"#32A852"},{"coords":"21_20","color":"#32A852"},{"coords":"20_20","color":"#32A852"},{"coords":"20_21","color":"#32A852"},{"coords":"21_21","color":"#32A852"},{"coords":"21_22","color":"#32A852"},{"coords":"21_23","color":"#32A852"},{"coords":"21_24","color":"#32A852"},{"coords":"21_25","color":"#32A852"},{"coords":"21_26","color":"#32A852"},{"coords":"21_27","color":"#32A852"},{"coords":"20_27","color":"#32A852"},{"coords":"20_26","color":"#32A852"},{"coords":"20_25","color":"#32A852"},{"coords":"19_27","color":"#32A852"},{"coords":"19_28","color":"#4284F4"},{"coords":"18_28","color":"#4284F4"},{"coords":"18_29","color":"#4284F4"},{"coords":"18_30","color":"#4284F4"},{"coords":"18_31","color":"#4284F4"},{"coords":"19_30","color":"#4284F4"},{"coords":"19_29","color":"#4284F4"},{"coords":"20_29","color":"#4284F4"},{"coords":"17_29","color":"#4284F4"},{"coords":"16_29","color":"#4284F4"},{"coords":"17_30","color":"#4284F4"},{"coords":"17_31","color":"#4284F4"},{"coords":"16_31","color":"#4284F4"},{"coords":"16_30","color":"#4284F4"},{"coords":"15_31","color":"#4284F4"},{"coords":"15_30","color":"#4284F4"},{"coords":"15_29","color":"#4284F4"},{"coords":"15_28","color":"#4284F4"},{"coords":"15_27","color":"#4284F4"},{"coords":"15_26","color":"#4284F4"},{"coords":"15_25","color":"#4284F4"},{"coords":"15_24","color":"#4284F4"},{"coords":"14_24","color":"#4284F4"},{"coords":"13_24","color":"#4284F4"},{"coords":"13_25","color":"#4284F4"},{"coords":"13_26","color":"#4284F4"},{"coords":"13_27","color":"#4284F4"},{"coords":"13_28","color":"#4284F4"},{"coords":"13_29","color":"#4284F4"},{"coords":"13_30","color":"#4284F4"},{"coords":"13_31","color":"#4284F4"},{"coords":"14_31","color":"#4284F4"},{"coords":"14_30","color":"#4284F4"},{"coords":"14_29","color":"#4284F4"},{"coords":"14_28","color":"#4284F4"},{"coords":"14_27","color":"#4284F4"},{"coords":"14_26","color":"#4284F4"},{"coords":"14_25","color":"#4284F4"}]
        }

        let cartoonFrame = {
            id: 2,
            name: "Cartoon",
            data: [{"coords":"10_20","color":"#ffa500"},{"coords":"10_21","color":"#ffa500"},{"coords":"10_22","color":"#ffa500"},{"coords":"10_23","color":"#ffa500"},{"coords":"10_24","color":"#ffa500"},{"coords":"10_25","color":"#ffa500"},{"coords":"10_26","color":"#ffa500"},{"coords":"10_27","color":"#ffa500"},{"coords":"10_28","color":"#ffa500"},{"coords":"10_29","color":"#ffa500"},{"coords":"10_30","color":"#ffa500"},{"coords":"10_31","color":"#ffa500"},{"coords":"11_31","color":"#ffa500"},{"coords":"11_30","color":"#ffa500"},{"coords":"11_29","color":"#ffa500"},{"coords":"11_28","color":"#ffa500"},{"coords":"11_27","color":"#ffa500"},{"coords":"11_26","color":"#ffa500"},{"coords":"11_25","color":"#ffa500"},{"coords":"11_24","color":"#ffa500"},{"coords":"11_23","color":"#ffa500"},{"coords":"11_22","color":"#ffa500"},{"coords":"11_21","color":"#ffa500"},{"coords":"11_20","color":"#ffa500"},{"coords":"9_22","color":"#ffa500"},{"coords":"9_23","color":"#ffa500"},{"coords":"8_21","color":"#ffa500"},{"coords":"9_28","color":"#ffa500"},{"coords":"9_29","color":"#ffa500"},{"coords":"8_30","color":"#ffa500"},{"coords":"12_21","color":"#ffa500"},{"coords":"12_20","color":"#ffa500"},{"coords":"12_19","color":"#ffa500"},{"coords":"12_29","color":"#ffa500"},{"coords":"12_30","color":"#ffa500"},{"coords":"12_31","color":"#ffa500"},{"coords":"12_32","color":"#ffa500"},{"coords":"12_22","color":"#ffa500"},{"coords":"12_22","color":"#ffa500"},{"coords":"13_22","color":"#ffa500"},{"coords":"13_21","color":"#ffa500"},{"coords":"13_20","color":"#ffa500"},{"coords":"13_19","color":"#ffa500"},{"coords":"13_18","color":"#ffa500"},{"coords":"13_29","color":"#ffa500"},{"coords":"13_30","color":"#ffa500"},{"coords":"13_31","color":"#ffa500"},{"coords":"13_32","color":"#ffa500"},{"coords":"13_33","color":"#ffa500"},{"coords":"14_18","color":"#ffa500"},{"coords":"14_19","color":"#ffa500"},{"coords":"14_20","color":"#ffa500"},{"coords":"14_21","color":"#ffa500"},{"coords":"14_22","color":"#ffa500"},{"coords":"14_29","color":"#ffa500"},{"coords":"14_30","color":"#ffa500"},{"coords":"14_31","color":"#ffa500"},{"coords":"14_32","color":"#ffa500"},{"coords":"14_33","color":"#ffa500"},{"coords":"11_25","color":"#ffa500"},{"coords":"12_25","color":"#ffa500"},{"coords":"13_25","color":"#ffa500"},{"coords":"14_25","color":"#ffa500"},{"coords":"14_26","color":"#ffa500"},{"coords":"13_26","color":"#ffa500"},{"coords":"12_26","color":"#ffa500"},{"coords":"11_26","color":"#ffa500"},{"coords":"15_18","color":"#ffa500"},{"coords":"16_18","color":"#ffa500"},{"coords":"15_20","color":"#ffa500"},{"coords":"16_20","color":"#ffa500"},{"coords":"15_33","color":"#ffa500"},{"coords":"16_33","color":"#ffa500"},{"coords":"15_31","color":"#ffa500"},{"coords":"16_31","color":"#ffa500"},{"coords":"15_21","color":"#ffa500"},{"coords":"15_22","color":"#ffa500"},{"coords":"15_23","color":"#ffa500"},{"coords":"15_24","color":"#ffa500"},{"coords":"15_25","color":"#ffa500"},{"coords":"15_26","color":"#ffa500"},{"coords":"15_27","color":"#ffa500"},{"coords":"15_28","color":"#ffa500"},{"coords":"15_29","color":"#ffa500"},{"coords":"15_30","color":"#ffa500"},{"coords":"17_20","color":"#ffa500"},{"coords":"17_18","color":"#ffa500"},{"coords":"17_31","color":"#ffa500"},{"coords":"17_33","color":"#ffa500"},{"coords":"18_21","color":"#ffa500"},{"coords":"18_22","color":"#ffa500"},{"coords":"18_23","color":"#ffa500"},{"coords":"18_30","color":"#ffa500"},{"coords":"18_29","color":"#ffa500"},{"coords":"18_28","color":"#ffa500"},{"coords":"18_28","color":"#ffa500"}]
        }

        // this.savedFrames.push(udacityFrame);
        this.savedFrames.push(googleFrame);
        this.savedFrames.push(cartoonFrame);

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
        
            let [row, col] = $this.data("coord").split("_")
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
        let pixels = [{"coords":"4_20","color":"#02B3E4"},{"coords":"4_19","color":"#02B3E4"},{"coords":"4_18","color":"#02B3E4"},{"coords":"5_18","color":"#02B3E4"},{"coords":"5_17","color":"#02B3E4"},{"coords":"5_16","color":"#02B3E4"},{"coords":"6_16","color":"#02B3E4"},{"coords":"6_15","color":"#02B3E4"},{"coords":"6_14","color":"#02B3E4"},{"coords":"7_14","color":"#02B3E4"},{"coords":"8_14","color":"#02B3E4"},{"coords":"9_14","color":"#02B3E4"},{"coords":"10_14","color":"#02B3E4"},{"coords":"11_14","color":"#02B3E4"},{"coords":"12_14","color":"#02B3E4"},{"coords":"13_14","color":"#02B3E4"},{"coords":"14_14","color":"#02B3E4"},{"coords":"15_14","color":"#02B3E4"},{"coords":"16_14","color":"#02B3E4"},{"coords":"17_14","color":"#02B3E4"},{"coords":"18_14","color":"#02B3E4"},{"coords":"18_15","color":"#02B3E4"},{"coords":"20_15","color":"#02B3E4"},{"coords":"19_15","color":"#02B3E4"},{"coords":"20_16","color":"#02B3E4"},{"coords":"20_17","color":"#02B3E4"},{"coords":"21_17","color":"#02B3E4"},{"coords":"21_18","color":"#02B3E4"},{"coords":"21_19","color":"#02B3E4"},{"coords":"21_20","color":"#02B3E4"},{"coords":"21_21","color":"#02B3E4"},{"coords":"21_22","color":"#02B3E4"},{"coords":"21_23","color":"#02B3E4"},{"coords":"22_19","color":"#02B3E4"},{"coords":"22_20","color":"#02B3E4"},{"coords":"22_21","color":"#02B3E4"},{"coords":"20_24","color":"#02B3E4"},{"coords":"20_26","color":"#02B3E4"},{"coords":"20_25","color":"#02B3E4"},{"coords":"19_25","color":"#02B3E4"},{"coords":"19_26","color":"#02B3E4"},{"coords":"20_26","color":"#fff"},{"coords":"18_26","color":"rgb(2, 179, 228)"},{"coords":"18_25","color":"rgb(2, 179, 228)"},{"coords":"18_24","color":"rgb(2, 179, 228)"},{"coords":"18_27","color":"rgb(2, 179, 228)"},{"coords":"18_28","color":"rgb(2, 179, 228)"},{"coords":"18_23","color":"rgb(2, 179, 228)"},{"coords":"18_22","color":"rgb(2, 179, 228)"},{"coords":"17_22","color":"rgb(2, 179, 228)"},{"coords":"17_21","color":"rgb(2, 179, 228)"},{"coords":"16_21","color":"rgb(2, 179, 228)"},{"coords":"15_20","color":"rgb(2, 179, 228)"},{"coords":"5_20","color":"rgb(2, 179, 228)"},{"coords":"6_20","color":"rgb(2, 179, 228)"},{"coords":"7_20","color":"rgb(2, 179, 228)"},{"coords":"8_20","color":"rgb(2, 179, 228)"},{"coords":"9_20","color":"rgb(2, 179, 228)"},{"coords":"10_20","color":"rgb(2, 179, 228)"},{"coords":"11_20","color":"rgb(2, 179, 228)"},{"coords":"12_20","color":"rgb(2, 179, 228)"},{"coords":"13_20","color":"rgb(2, 179, 228)"},{"coords":"14_20","color":"rgb(2, 179, 228)"},{"coords":"15_20","color":"rgb(2, 179, 228)"},{"coords":"17_26","color":"rgb(2, 179, 228)"},{"coords":"16_26","color":"rgb(2, 179, 228)"},{"coords":"17_27","color":"rgb(2, 179, 228)"},{"coords":"17_28","color":"rgb(2, 179, 228)"},{"coords":"17_29","color":"rgb(2, 179, 228)"},{"coords":"17_30","color":"rgb(2, 179, 228)"},{"coords":"16_30","color":"rgb(2, 179, 228)"},{"coords":"16_31","color":"rgb(2, 179, 228)"},{"coords":"15_31","color":"rgb(2, 179, 228)"},{"coords":"14_31","color":"rgb(2, 179, 228)"},{"coords":"13_31","color":"rgb(2, 179, 228)"},{"coords":"12_31","color":"rgb(2, 179, 228)"},{"coords":"11_31","color":"rgb(2, 179, 228)"},{"coords":"10_31","color":"rgb(2, 179, 228)"},{"coords":"9_31","color":"rgb(2, 179, 228)"},{"coords":"8_31","color":"rgb(2, 179, 228)"},{"coords":"7_31","color":"rgb(2, 179, 228)"},{"coords":"6_31","color":"rgb(2, 179, 228)"},{"coords":"5_31","color":"rgb(2, 179, 228)"},{"coords":"4_31","color":"rgb(2, 179, 228)"},{"coords":"4_30","color":"rgb(2, 179, 228)"},{"coords":"4_29","color":"rgb(2, 179, 228)"},{"coords":"5_29","color":"rgb(2, 179, 228)"},{"coords":"5_28","color":"rgb(2, 179, 228)"},{"coords":"5_27","color":"rgb(2, 179, 228)"},{"coords":"6_27","color":"rgb(2, 179, 228)"},{"coords":"6_26","color":"rgb(2, 179, 228)"},{"coords":"7_26","color":"rgb(2, 179, 228)"},{"coords":"8_26","color":"rgb(2, 179, 228)"},{"coords":"9_26","color":"rgb(2, 179, 228)"},{"coords":"10_26","color":"rgb(2, 179, 228)"},{"coords":"11_26","color":"rgb(2, 179, 228)"},{"coords":"12_26","color":"rgb(2, 179, 228)"},{"coords":"13_26","color":"rgb(2, 179, 228)"},{"coords":"14_26","color":"rgb(2, 179, 228)"},{"coords":"15_26","color":"rgb(2, 179, 228)"}];
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
