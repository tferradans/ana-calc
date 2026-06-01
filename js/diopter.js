//used to store the last modified field
var last_edited = null;

function lastEdit(e) {
    checkMe(e);
    last_edited = e.target.id;

    //test for zeros and NaNs to override last_edited
    var testValue = convertComma(document.getElementById(last_edited).value);
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
    if ((diopter === 0 && new_minfocus === 0 && minfocus === 0 && new_maxfocus === Infinity) ||
        checkNaN ||
        ((last_edited === "minfocus" || last_edited === "new_minfocus") && (minfocus === 0 || new_minfocus === 0) && diopter === 0 && new_maxfocus === Infinity)) {
        document.getElementById("warning").innerHTML = "Something went wrong.<br>Use numbers only!";
    }
    //go on with math
    else {
        document.getElementById("warning").innerHTML = "";

        //determine diopter strength from the appropriate source
        if (last_edited === "diopter") {
            //diopter value already entered — nothing to derive
        }
        else if ((last_edited === "minfocus" || last_edited === "new_minfocus") && minfocus !== 0 && new_minfocus !== 0) {
            diopter = (minfocus - new_minfocus) / (minfocus * new_minfocus);
        }
        else if (last_edited === "new_maxfocus" && new_maxfocus !== Infinity) {
            diopter = 1 / new_maxfocus;
        }
        else if (diopter === 0) {
            //null fallback: derive from whichever value is available
            if (new_minfocus !== 0) {
                diopter = (minfocus - new_minfocus) / (minfocus * new_minfocus);
            }
            else if (new_maxfocus !== Infinity) {
                diopter = 1 / new_maxfocus;
            }
        }
        //else: diopter is already known and wasn't the last edited field — use it as-is

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
        setTimeout(function() {
            document.getElementById("diopter").className = "";
            document.getElementById("new_maxfocus").className = "";
            document.getElementById("new_minfocus").className = "";
        }, 2500);
    }
}
