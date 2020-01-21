/**
 * Performs an AJAX request
 * Capable of setting response text to an HTML element and/or calling a callback function (with or without response text) via extra
 * 
 * @param {FormData} formData the data in key/value pairs being sent with the request
 * @param {string} postFile the name of the PHP file to run (note: the path must be relative to the HTML file that sources the JavaScript files)
 * @param {object} extra map of extra functionality like {outputElement: "html_element_name"} and/or {callbackFunction: callbackFunctionName}
 */
function sendAjaxRequest(formData, postFile, extra) {
    // Create, configure, and send the XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open("POST", postFile, true);
    request.send(formData);

    // Called automatically when the request is completed
    request.onload = function() {
        if (request.status === 200) {

            // If there is extra functionality to do
            if (extra != null) {
                if (extra.hasOwnProperty("outputElement")) {
                    document.getElementById(extra["outputElement"]).innerHTML = request.responseText;
                }

                if (extra.hasOwnProperty("callbackFunction")) {
                    extra["callbackFunction"]();
                }
                else if (extra.hasOwnProperty("callbackFunctionReturn")) {
                    extra["callbackFunctionReturn"](request.responseText);
                }
            }
        }
        else {
            alert(postFile + " request status: " + parseInt(request.status));
        }
    };
}
