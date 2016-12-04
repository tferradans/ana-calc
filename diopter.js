//used to store the last modified field
var last_edited = null;

function lastEdit(e) {
    checkMe(e);
    last_edited = e.target.id;
    
    //for testing against tabs
    var testValue = convertComma(document.getElementById(last_edited).value);
    
    //test for zeros and NaNs to override last_edited
    if (testValue === 0 || isNaN(testValue)) {
        last_edited = null;
    }
}

function calcDiopter() {
    
    //import values from form
    var new_minfocus = convertComma(document.getElementById("new_minfocus").value);
    var minfocus = convertComma(document.getElementById("minfocus").value);
    var new_maxfocus = convertComma(document.getElementById("new_maxfocus").value);
    var diopter = convertComma(document.getElementById("diopter").value);
    
    //check if any of the inputs is NaN
    var checkNaN = (isNaN(diopter) || isNaN(minfocus) || isNaN(new_minfocus) || isNaN(new_maxfocus));
    
    //abort math and display warning
	//if nothing has been changed
    if ((diopter === 0 && new_minfocus === 0 && minfocus === 0 && new_maxfocus === Infinity) ||
		//if any field is NaN
		checkNaN ||
		//if the last edited fields are minimum focus and one of them is still 0
		((last_edited == "minfocus" || last_edited == "new_minfocus") && (minfocus === 0 || new_minfocus === 0) && diopter === 0 && new_maxfocus === Infinity)) {
        document.getElementById("warning").innerHTML = "Something went wrong.<br>Use numbers only!";
    }
    //go on with math
    else {
        //hide alert
        document.getElementById("warning").innerHTML = "";
        if (last_edited == "diopter") {
        }
        //find diopter strength
        else if ((last_edited == "minfocus" || last_edited == "new_minfocus") && (minfocus !== 0 && new_minfocus !== 0)) {
            //calculate based on min focus
            diopter = (minfocus - new_minfocus)/(minfocus * new_minfocus);
        }
        //calculate based on max focus
        else if (last_edited == "new_maxfocus" && new_maxfocus !== Infinity) {
            diopter = 1 / new_maxfocus;
        }
        //bypass all last_edited with null
        else {
            if (diopter !== 0) {
            }
            //find diopter strength
            else if (diopter === 0) {
                //calculate based on min focus
                if (new_minfocus !== 0) {
                    //calculate diopter strength
                    diopter = (minfocus - new_minfocus)/(minfocus * new_minfocus);
                }
                //calculate based on max focus
                else if (new_maxfocus !== Infinity) {
                    diopter = 1 / new_maxfocus;
                }
            }
        }
		
		//calculate all fields based on diopter strength
		new_maxfocus = 1 / diopter;
		new_minfocus = minfocus / (diopter * minfocus + 1);
		
		//blink the ones that changed
		if (document.getElementById("diopter").value != diopter) {
			document.getElementById("diopter").className = "blink";
		}
		
		if (document.getElementById("new_maxfocus").value != new_maxfocus) {
			document.getElementById("new_maxfocus").className = "blink";
		}
		
		if (document.getElementById("new_minfocus").value != new_minfocus) {
			document.getElementById("new_minfocus").className = "blink";
		}		
		
		//output to the page
		document.getElementById("diopter").value = diopter.toFixed(2);
		document.getElementById("new_maxfocus").value = new_maxfocus.toFixed(2);
		document.getElementById("new_minfocus").value = new_minfocus.toFixed(2);
		
		//timeout to reverse classes
		setTimeout(function(){
				document.getElementById("diopter").className = "";
				document.getElementById("new_maxfocus").className = "";
				document.getElementById("new_minfocus").className = "";
		}, 2500);

	}

    
}