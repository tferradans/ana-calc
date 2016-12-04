//hide or display the focus slider for single focus solutions
function sfSlider(e) {
    var option = document.getElementById(e.target.id).value;
    
    if (option == "1") {
        //if NONE, disable focus slider and hide title
        document.getElementById("focus").disabled = true;
        document.getElementById("focusSlider").style = "visibility:hidden;";
        document.getElementById("focusSliderTitle").style = "visibility:hidden;";
    }
    else {
        // if NOT NONE, show slider and title
        document.getElementById("focus").disabled = false;
        document.getElementById("focusSlider").style = "";
        document.getElementById("focusSliderTitle").style = "padding-left:30px;";
    }
}

//for all custom fields from dropdown menus
function checkCustom(e) {
    function returnTags(id) {
        var result = [];
        var custom = ("custom" + document.getElementById(id).id);
        var XY;
        
        //sets for custom ids and alts
        switch (id) {
            case "crop":
                XY = "customCF";
                break;
            case "reducer":
                XY = "customFR";
                break;
            case "ana":
                XY = "customAA";
                break;
            case "sar":
                XY = "customAR";
                break;
        }
        result = [XY, custom];
        return result;
    }
    
    var id = e.target.id;
    var check = document.getElementById(id).value;
    var tags = returnTags(id);
    
    //enable custom value fields if "custom" is selected from dropdown menu
    if (check == "custom") {
        document.getElementById(tags[0]).innerHTML = ('<input class="blink" type="input" id="' + tags[1] + '" value="1.0">');
        if (tags[0] == "customAR") {
            document.getElementById(tags[0]).innerHTML += "&nbsp;:1";
        }
        document.getElementById(tags[1]).addEventListener("blur", checkMe);
    }
    else {
        document.getElementById(tags[0]).innerHTML = "";
        document.getElementById(tags[0]).removeEventListener("blur", checkMe);
    }
}

//checks if user input data is valid
function checkMe(e) {
    var id = e.target.id;
    var check = convertComma(document.getElementById(id).value);
    
    //make sure the values are positive
    if (isNaN(check) || check < 0) {
        //if not valid, blink red on the field
        document.getElementById(id).className = "redAlert";
    }
    else {
        //when corrected, turn white
        document.getElementById(id).className = "";
    }
    
}

//gets string input, replaces comma with dot and returns a number
function convertComma(str) {
    if (str.indexOf(",") != -1) {
        str = str.replace(",",".");
    }
    return Number(str);
}

//performs a last check before running the calculations
function checkArray(list) {
    //check if any fields have invalid inputs and alerts the user.
    function checkInput(num) {
        check = Number(num);
        
        //make sure the values are positive
        if (isNaN(check) || check < 0) {
            return false;
        }
        else {
            return true;
        }
    }
 
    var goAhead = true;
    var count = 0;
    var skip;
    
    //checks if values in the array are all numbers
    while (goAhead && count < inputData.length) {
        goAhead = checkInput(inputData[count]);
        count++;
    }//end while
    
    //if all checks are good...
    if (goAhead && count == inputData.length) {
        return true;
    }
    else {
        return false;
    }
}

//alerts user of problems.
function warningSign(bool) {
    if (bool) {
        document.getElementById("alert").innerHTML = "Something went wrong.<br>Use numbers only!";
    }
    else{
        document.getElementById("alert").innerHTML = "";
    }
}

function sfVignette(tag) {
    var single = Number(tag);
    var stretch = inputData[3];
    
    switch (single) {
        case 1: //rangefinder
            single = 11 * stretch;
            break;
        case 0.93: //fm lens
            single = 4.5 * stretch;
            break;
        case 0.88: //rectilux 3ff
            single = 8.5 * stretch;
            break;
        case 0.91: //rectilux coreDNA
            single = 3 * stretch;
            break;
    }

    return single;
}

//obscure reverse aspect ratio
function aspectRatioB(num,custom) {
    var result;
    
    //if it's a custom value
    if (custom) {
        result = Number((num/1.78).toFixed(2));
    }
    //if using standard dropdown values
    else {
        switch (num) {
            case 1.50:
                result = 1;
                break;
            case 1.333:
                result = 0.895;
                break;
            case 2.88:
                result = 0.81;
                break;
            case 1.85:
                result = 1;
                break;
            default:
                result = Number((num/1.78).toFixed(2));
                break;
        }
    }
    return result;
}

function willVignette(hfov) {
    //set border upon change
    document.getElementById("vignette").className = "vignette";
    //timeout to reverse classes for blinking
    setTimeout(function(){
        document.getElementById("vignette").className = "";
    }, 2500);
    
    //assign parameters
    var stretch = inputData[3];
    var fov = hfov;
    
    //evaluates checkboxes and single focus
    var pancake = document.getElementById("pancake").checked;
    var baby = document.getElementById("baby").checked;
    var sf = Number(document.getElementById("sf").value);
    
    //bigger tolerance for pancake lenses (15%)
    if (pancake) {
        fov *= 1.15;
    }
    
    //when dealing with baby scopes, use different values and don't take into account sfSolutions
    if (baby === true) {
        //set which lenses have data
        anaArray = [1.5, 1.75, 2, 2.001];
        
        //full-on vignette
        if ((stretch === 1.5 && fov < 45) || //isco anamorphot & vm lens & yashicascope
            (stretch === 1.75 && fov < 29) || //baby hypergonar
            (stretch === 2 && fov < 42) || //isco s8
            (stretch === 2.001 && fov < 55)) { //bell and howell projection lens
                return "Yes, it will vignette.";
        }
        //partial vignette
        else if ((stretch === 1.5 && (fov >= 45 && fov < 50)) || //isco anamorphot & vm lens
                (stretch === 1.75 && (fov >=29 && fov < 33)) || //baby hypergonar
                (stretch === 2 && (fov >= 42 && fov < 48)) || //isco s8
                (stretch === 2.001 && (fov >= 55 && fov < 64))) { //bell and howell projection lens
                    return "Very likely show dark corners";
        }
        //no data
        else if (anaArray.indexOf(stretch) == -1) {
            return "Not enough data!";
        }
        //no problem
        else {
            return "Nope!";
        }
    }
    else if (baby === false) {
        //set which stretches have data
        anaArray = [1.33, 1.333, 1.5, 1.75, 2, 2.001];
        
        //add vignetting for single focus solutions
        if (sf < 1) {
            console.log("fov", fov);
            fov -= sfVignette(sf);
            console.log("fov", fov);
        }
        
        //full-on vignette
        if ((stretch === 1.33 && fov < 22) || //century, optex, soligor
            (stretch === 1.333 && fov < 29) || //slr magic and isco
            (stretch === 1.5 && fov < 30) || //iscoramas
            (stretch === 1.75 && fov < 32) || //aivascope, kowa inflight
            (stretch === 2 && fov < 29) || //kowa, slr magic, cinelux
            (stretch === 2.001 && fov < 60)) { //sankor, hifi
                return "Yes, it will vignette.";
        }
        //partial vignette
        else if ((stretch === 1.33 && (fov >= 22 && fov < 26)) || //century, optex, soligor
                (stretch === 1.333 && (fov >= 29 && fov < 34)) || //slr magic and isco
                (stretch === 1.5 && (fov >= 30 && fov < 33)) || //iscoramas
                (stretch === 1.75 && (fov >=32 && fov < 34)) || //aivascope, kowa inflight
                (stretch === 2 && (fov >= 29 && fov < 38)) || //kowa, slr magic, cinelux
                (stretch === 2.001 && (fov >= 60 && fov < 67.5))) { //sankor, hifh
                    return "Very likely show dark corners";
        }
        //no data
        else if (anaArray.indexOf(stretch) == -1) {
            return "Not enough data!";
        }
        //no problem
        else {
            return "Nope!";
        }
    }
}

//declaring global array
var inputData = [];
    
//gets data from all the fields, verifies if custom and adjusts accordingly
function getData() {
    var tklens, crop, reducer, ana, sar, sarB, focus, iris;
    
    //tklens
    tklens = convertComma(document.getElementById("tklens").value);

    //crop
    if (document.getElementById("crop").value == "custom") {
        crop = convertComma(document.getElementById("customcrop").value);
    }
    else {
        crop = Number(document.getElementById("crop").value);
    }

    //reducer
    if (document.getElementById("reducer").value == "custom") {
        reducer = convertComma(document.getElementById("customreducer").value);
    }
    else {
        reducer = Number(document.getElementById("reducer").value);
    }

    //anamorphic
    if (document.getElementById("ana").value == "custom") {
        ana = convertComma(document.getElementById("customana").value);
    }
    else {
        ana = Number(document.getElementById("ana").value);
    }
    
    //single focus
    sf = Number(document.getElementById("sf").value);

    //aspect ratio
    if (document.getElementById("sar").value == "custom") {
        sar = convertComma(document.getElementById("customsar").value);
        sarB = aspectRatioB(sar,true);
    }
    else {
        sar = Number(document.getElementById("sar").value);
        sarB = aspectRatioB(sar, false);
    }
    
    hfov = convertComma(document.getElementById("hfov").value);
    
    rar = convertComma(document.getElementById("rar").value);
    
    //flip value from 0 to 1 into 1 to 0
    focus = -Number((document.getElementById("focus").value - 100)/100);
    iris = Number((document.getElementById("iris").value)/100);
    backsize = convertComma(document.getElementById("backsize").value);
    
    //throw it all in an array
    inputData = [tklens, crop, reducer, ana, sar, sarB, hfov, rar, sf, focus, iris, backsize];
}

function calculateHFOV() {
    getData();
    
    //splice out hFOV and Resulting Aspect Ratio
    inputData.splice(6,2,0,0);
    
    //expand array into several variables
    if (checkArray(inputData)) {
        var tklens = inputData[0];
        var crop = inputData[1];
        var reducer = inputData[2];
        var ana = inputData[3];
        var sar = inputData[4];
        var sarB = inputData[5]
        var hfov = inputData[6];
        var rar = inputData[7];
        //1 - sf wide factor * square focus
        var sfWide = (1 - inputData[8]) * Math.pow(inputData[9],2);
        
        //do the math
        hfov = Math.round(((crop * reducer * tklens * (1/ana)) / sarB)); //* (1-sfWide)
        rar = (sar * ana).toFixed(2);
        
        //update values and blink modified fields
        document.getElementById("rar").value = rar;
        document.getElementById("rar").className = "blink";
        document.getElementById("vignette").value = willVignette(hfov);

        //factor in single focus widening, which isnt applied to vignetting
        hfov = Math.round(hfov * (1-sfWide));
        document.getElementById("hfov").value = hfov;
        document.getElementById("hfov").className = "blink";
        
        //clear alert message
        warningSign(false);
        
        //timeout to reverse classes for blinking
        setTimeout(function(){
            document.getElementById("hfov").className = "";
            document.getElementById("rar").className = "";
        }, 2500);
    }
    else {
        //display alert and clear array
        warningSign(true);
        inputData = [];
    }
}
    
function calculateTkLens() {
    getData();
    
    //splice out Taking Lens
    inputData.splice(0,1,0);
    
    if (checkArray(inputData)) {
    
        //assign "custom" value to SAR, so it can be set later
        document.getElementById("sar").value = "custom";
        document.getElementById("customAR").innerHTML = ('<input class="blink" type="input" id="customsar" value="1.0">&nbsp;:1');
        
        //assign all variables
        var crop = inputData[1];
        var reducer = inputData[2];
        var ana = inputData[3];
        var sar = inputData[4];
        var sarB = inputData[5]
        var hfov = inputData[6];
        var rar = inputData[7];
        //1 - sf wide factor * square focus
        var sfWide = (1 - inputData[8]) * Math.pow(inputData[9],2);

        //calculate sensor aspect ratio based on final aspect ratio
        sar = rar/ana;
        //calculate sarB
        sarB = aspectRatioB(sar, true);
        //calculate taking lens
        tklens = Math.round(hfov / (crop * reducer * 1/ana / sarB)/ (1-sfWide));
        
        //assign value to custom sar
        document.getElementById("customsar").value = sar.toFixed(2);
        //fix hfov based on variance from single focus distance
        hfov = Math.round(hfov / (1-sfWide));
        //calculate vignetting
        document.getElementById("vignette").value = willVignette(hfov);
        //assign value and blink tklens
        document.getElementById("tklens").value = tklens;
        document.getElementById("tklens").className = "blink";
        
        //clear alert message
        warningSign(false);
        
        //timeout to reverse classes
        setTimeout(function(){
            document.getElementById("tklens").className = "";
        }, 2500);
    }
    else {
        //display alert and clear array
        warningSign(true);
        inputData = [];
    }
}

function calcAperture() {
    getData();
    
    if (checkArray(inputData)) {
        //assign variables
        var tklens = inputData[0];
        var backsize = inputData[11];
        
        var result = (tklens/backsize).toFixed(2);
        
        document.getElementById("effectAperture").value = result;
        document.getElementById("effectAperture").className = "blink";
        
        //clear alert message
        warningSign(false);
        
        //timeout to reverse classes
        setTimeout(function(){
            document.getElementById("effectAperture").className = "";
        }, 2500);
    }
    else {
            //display alert and clear array
            warningSign(true);
            inputData = [];
    }
}