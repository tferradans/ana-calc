//load all sprites
var lens_img = new Image();
lens_img.src = "./img/tklens.png";

var crop_img = new Image();
crop_img.src = "./img/crop.png";

var crop_img = new Image();
crop_img.src = "./img/crop.png";

var reducer_img = new Image();
reducer_img.src = "./img/reducer.png";

var ana_img = new Image();
ana_img.src = "./img/ana.png";

var sf_img = new Image();
sf_img.src = "./img/sf.png";

window.onload = function () {

    //size for the canvas
    var WIDTH = 500;
    var HEIGHT = 125; // used to be 200
    
    //set up canvas
    var canvas = document.getElementById("schematic");
    var ctx = canvas.getContext("2d");
    
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    
    ctx.scale(0.6, 0.6);
    ctx.translate(0.3 * WIDTH, 5);
    
    //camera
    var crop = {
        'name': null,
        
        //placement in the chain
        'RANK': 0,
        'WIDTH': 222,
        'HEIGHT': 200,
        'MOUNT': 201, //fixed position
    
        //sprite data
        'position': {
            'x': null,
            'y': null,
        },
        
        'img': crop_img,
        
        //get name from field
        'getName': function() {
            
            var id = Number(document.getElementById("crop").value);
            
            if (!isNaN(id)) {
                this.name = id;
            }
            else {
                this.name = null;
            }
        },
        
        //set x position from img
        'setXPos': function() {
            
            // GH4 has multiple entries
            if ((this.name == 2.34) || (this.name == 2.49)) {
                this.name = 2.08;
            }
            
            switch (this.name) {
                //full frame
                case 1:
                    this.position.x = 68;
                    break;
                //aps-h
                case 1.3:
                    this.position.x = 75;
                    break;
                //s35
                case 1.5:
                    this.position.x = 181;
                    break;
                //aps-c
                case 1.6:
                    this.position.x = 82;
                    break;
                //mft
                case 2:
                    this.position.x = 141;
                    break;
                //gh4
                case 2.08:
                    this.position.x = 82;
                    break;
                //medium format
                case 0.5:
                    this.position.x = 117;
                    break;
                //bmpcc
                case 2.88:
                    this.position.x = 50;
                    break;
                //bm ursa
                case 1.85:
                    this.position.x = 201;
                    break;
                //custom
                case null:
                    this.position.x = 96; //not working either
                    break;
            }
        },
        
        //set position by comparing values with an array
        'setYPos': function() {
            
            var cam_array = [1, 1.3, 1.5, 1.6, 2, 2.08, 0.5, 1.85, 2.88, null];
            
            for (var i = 0; i < cam_array.length; i++) {
                if (this.name == cam_array[i]) {
                    //position y determined by the camera's placement in the array
                    this.position.y = this.HEIGHT * i;
                }
                
            } // end for
        },
        
        'init': function() {
            this.getName();
            this.setXPos();
            this.setYPos();
        },
    
        'draw': function() {
            //img, back crop, y start, width of img, height of img, canvas X, canvas Y, end X, end Y
            ctx.drawImage(this.img,
                        (this.MOUNT-this.position.x), this.position.y,
                        this.position.x, this.HEIGHT,
                        schematic.findLength(this.RANK), 0,
                        this.position.x, this.HEIGHT);
            
            //draw front part of the camera
            ctx.drawImage(this.img,
                        (this.MOUNT), this.position.y,
                        this.WIDTH - this.MOUNT, this.HEIGHT,
                        schematic.findLength(this.RANK) + this.position.x, 0,
                        21, this.HEIGHT);
        },
    };
    
    //reducer
    var reducer = {
        'name': null,
        
        //placement in the chain
        'RANK': 1,
        'HEIGHT': 200,
    
        //sprite data
        'position': {
            'x': null,
        },
        
        'img': reducer_img,
        
        //get name from field
        'getName': function() {
            this.name = Number(document.getElementById("reducer").value);
        },
        
        //set x position from img
        'setXPos': function() {
            
            if (this.name != 1) {
                this.position.x = 34;
            }
            else {
                this.position.x = 0;
            }
        },
        
        'init': function() {
            this.getName();
            this.setXPos();
        },
    
        'draw': function() {
            //img, back crop, y start, width of img, height of img, canvas X, canvas Y, end X, end Y
            ctx.drawImage(this.img,0, 0, this.position.x, this.HEIGHT, schematic.findLength(this.RANK), 0, this.position.x, this.HEIGHT);
        },
    };
    
    //lens
    var tklens = {
        'name': null,
        
        //placement in the chain
        'RANK': 2,
        'HEIGHT': 200, //fixed size
    
        //sprite data
        'position': {
            'x': null,
            'y': null,
        },
        
        'img': lens_img,

        //get name from field
        'getName': function() {
            this.name = Number(document.getElementById("tklens").value);
        },
        
        //set position from img
        'setPos': function() {
            
            //pancake
            if (document.getElementById("pancake").checked) {
                this.position.x = 27;
                this.position.y = 0 * this.HEIGHT;
            }
            //custom or error
            else if (this.name < 50 || isNaN(this.name)) {
                this.position.x = 72;
                this.position.y = 1 * this.HEIGHT;
            }
            else if (this.name >= 200) {
                this.position.x = 295;
                this.position.y =  5 * this.HEIGHT;
            }
            else if (this.name >= 135) {
                this.position.x = 243;
                this.position.y = 4* this.HEIGHT;
            }
            else if (this.name >= 85) {
                this.position.x = 143;
                this.position.y = 3 * this.HEIGHT;
            }
            else if (this.name >= 50) {
                this.position.x = 86;
                this.position.y = 2 * this.HEIGHT;
            }
        },
        
        'init': function() {
            this.getName();
            this.setPos();
        },
    
        'draw': function() {
            //img, back crop, y start, width of img, height of img, canvas X, canvas Y, end X, end Y
            ctx.drawImage(this.img, 0, this.position.y, this.position.x, this.HEIGHT, schematic.findLength(this.RANK), 0, this.position.x, this.HEIGHT);
        },
    };
    
    //anamorphic
    var ana = {
        'name': null,
        
        //placement in the chain
        'RANK': 3,
        'HEIGHT': 200, //fixed size
    
        //sprite data
        'position': {
            'x': null,
            'y': null,
        },
        
        'img': ana_img,

        //get name from field
        'getName': function() {
            
            var id = Number(document.getElementById("ana").value);
            
            if (!isNaN(id)) {
                this.name = id;
            }
            else {
                this.name = null;
            }
        },
        
        //set x position from img
        'setXPos': function() {
            
            //if baby scope
            if (document.getElementById("baby").checked) {
                //if exception, transform to null
                if ((this.name == 1.33) || (this.name == 1.333)) {
                    this.name = null;
                }
                
                switch (this.name) {
                    case 1.5:
                        this.position.x = 50;
                        break;
                    case 1.75:
                        this.position.x = 62;
                        break;
                    case 2:
                        this.position.x = 108;
                        break;
                    case 2.001:
                        this.position.x = 146;
                        break;
                    //custom
                    case null:
                        this.position.x = 49;
                        break;
                } //end switch
            }
            //if not baby scope
            else {
                switch (this.name) {
                    case 1.33:
                        this.position.x = 69;
                        break;
                    case 1.333:
                        this.position.x = 74;
                        break;
                    case 1.5:
                        this.position.x = 77;
                        break;
                    case 1.75:
                        this.position.x = 110;
                        break;
                    case 2:
                        this.position.x = 117;
                        break;
                    case 2.001:
                        this.position.x = 149;
                        break;
                    //custom
                    case null:
                        this.position.x = 109;
                        break;
                } //end switch
            }
        },
        
        //set position by comparing values with an array
        'setYPos': function() {
            //if baby scope
            if (document.getElementById("baby").checked) {
                //array of scopes
                var ana_array = [1.5, 1.75, 2, 2.001, null];
                
                for (var i = 0; i < ana_array.length; i++) {
                    if (this.name == ana_array[i]) {
                        //position y determined by the ana's placement in the array
                        this.position.y = 1400 + this.HEIGHT * i;
                    }
                } // end for
            }
            //if NOT baby scope
            else {
                //array of scopes
                var ana_array = [1.33, 1.333, 1.5, 1.75, 2, 2.001, null];
                
                for (var i = 0; i < ana_array.length; i++) {
                    if (this.name == ana_array[i]) {
                        //position y determined by the ana's placement in the array
                        this.position.y = this.HEIGHT * i;
                    }
                } // end for
            }
        },
        
        'init': function() {
            this.getName();
            this.setXPos();
            this.setYPos();
        },
    
        'draw': function() {
            //img, back crop, y start, width of img, height of img, canvas X, canvas Y, end X, end Y
            ctx.drawImage(this.img, 0, this.position.y, this.position.x, this.HEIGHT, schematic.findLength(this.RANK), 0, this.position.x, this.HEIGHT);
        },
    };
    
    //single focus
    var sf = {
        'name': null,
        
        //placement in the chain
        'RANK': 4,
        'WIDTH': 215,
        'HEIGHT': 200,
        'FIT': 151, //fixed position
    
        //sprite data
        'position': {
            'x': null,
            'y': null,
            'front': null,
        },
        
        'img': sf_img,
        
        //get name from field
        'getName': function() {
            this.name = Number(document.getElementById("sf").value);
        },
        
        //set x position from img
        'setXPos': function() {
            
            switch (this.name) {
                //none
                case 1:
                    this.position.x = 0;
                    this.position.front = 0;
                    break;
                //rangefinder
                case 0.99:
                    this.position.x = 12;
                    this.position.front = 33;
                    break;
                //fm
                case 0.93:
                    this.position.x = 150;
                    this.position.front = 40;
                    break;
                //rectilux
                case 0.88:
                    this.position.x = 89;
                    this.position.front = 31;
                    break;
                //coreDNA
                case 0.91:
                    this.position.x = 29;
                    this.position.front = 40;
                    break;
            }
            
            //3ff-s
            if ((this.name == 0.88) && document.getElementById("baby").checked) {
                this.position.x = 41;
                this.position.front = 27;
            }
        },
        
        //set position by comparing values with an array
        'setYPos': function() {
            
            var sf_array = [0.99, 0.93, 0.88, 0.91];
            
            for (var i = 0; i < sf_array.length; i++) {
                if (this.name == sf_array[i]) {
                    //position y determined by the camera's placement in the array
                    this.position.y = this.HEIGHT + this.HEIGHT * i;
                }
            } // end for
            
            //3ff-s
            if ((this.name == 0.88) && document.getElementById("baby").checked) {
                this.position.y = 0;
            }
        },
        
        'init': function() {
            this.getName();
            this.setXPos();
            this.setYPos();
        },
    
        'draw': function() {
            if (this.position.x != 0) {
                //img, back crop, y start, width of img, height of img, canvas X, canvas Y, end X, end Y
                ctx.drawImage(this.img,
                            (this.FIT - this.position.x), this.position.y,
                            this.position.x + this.position.front, this.HEIGHT,
                            schematic.findLength(this.RANK) - this.position.x, 0,
                            this.position.x + this.position.front, this.HEIGHT);
               
                //draw front part of the sf
//                ctx.drawImage(this.img,
  //                          (this.FIT), this.position.y,
    //                        this.WIDTH - this.FIT, this.HEIGHT,
      //                      schematic.findLength(this.RANK), 0,
        //                    64, this.HEIGHT);
            }
        },
    };
    
    //processing and drawing core
    var schematic = {
        
        'init': function() {
            tklens.init();
            crop.init();
            reducer.init();
            ana.init();
            sf.init();
        },
        
        //map ids into objects
        'mapping': {
            'crop': crop,
            'reducer': reducer,
            'tklens': tklens,
            'ana': ana,
            'sf': sf,
        },
        
        'draw': function(e) {
            
            //initializes and fixes the math for the altered element
            if (e != undefined) {
                var id = e.target.id;
                //in case checkboxes are activated
                if (id == "baby") {
                    //init singlefocus just in case.
                    schematic.mapping["sf"].init();
                    id = "ana";
                }
                else if (id == "pancake") {
                    id = "tklens"
                }
                
                //run init for the modified field
                schematic.mapping[id].init();
            }
            
            //find the new length of the system
            schematic.findLength(0);
            //clear the canvas
            ctx.clearRect(-200,-200, 1000, 400);
            
            //draw every part
            if (ana.position.x < sf.position.x) {
                sf.draw();
            }
            else {
                ana.draw();
                sf.draw();
            }
            tklens.draw();
            reducer.draw();
            crop.draw();
        },
        
        //returns the starting position for any given element in the system
        'findLength': function(p) {
            var length = 0;
            var pinpoint = 0;
            
            //array to loop through them
            //if sf longer than anamorphic lens, exclude ana from length
            if (ana.position.x < sf.position.x) {
                var items_array = [crop.position.x, reducer.position.x, tklens.position.x, sf.position.x];
                //fix length in case of not drawing taking lens
                length +=  sf.position.front;
            }
            else {
                var items_array = [crop.position.x, reducer.position.x, tklens.position.x, ana.position.x, sf.position.front];
            }
            
            for (var i = 0; i < items_array.length; i++) {
                //add all items in the array to find total length
                length += items_array[i];
                if (i < p) {
                    //add only until desired item's position
                    //subtract pixel for better overlap
                    pinpoint += items_array[i] - 1;
                }
            } //end for
            
            //half the canvas - half the length + element position
            //floor to avoid partial pixel movement
            return Math.floor((WIDTH - length)/2 + pinpoint)
        },
    }
    
    //init and draw when page loads
    schematic.init();
    schematic.draw();

    //event listeners for schematics.js
    document.getElementById("tklens").addEventListener("blur", schematic.draw);
    document.getElementById("pancake").addEventListener("click", schematic.draw);
    document.getElementById("crop").addEventListener("change", schematic.draw);
    document.getElementById("reducer").addEventListener("change", schematic.draw);
    document.getElementById("ana").addEventListener("change", schematic.draw);
    document.getElementById("baby").addEventListener("click", schematic.draw);
    document.getElementById("sf").addEventListener("change", schematic.draw);
    
}; // window onload