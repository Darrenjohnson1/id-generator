window.onload = function ScriptOnLoad() {
    var form1 = document.form1;
    var submitButton = document.getElementById("submit");

    function validateData(e) {
        //Icon builder & Validation Responce Routing
        function IconBuilder(target, targetValue, parentTargetElem, inputValidation) {

            var tryAgain = document.createTextNode("Enter Valid Text");
            var tryAgainElem = document.createElement("p");
            tryAgainElem.appendChild(tryAgain);
            tryAgainElem.setAttribute("class", "warning");

            var proofIcon = document.createElement("img");
                
            proofIcon.name ="proofIcon";
            proofIcon.setAttribute("class", "icon");
            proofIcon.height ="15";
            proofIcon.width ="15";

            //If target Text Field is empty
            if (targetValue == "") {
                console.log(target.name + ": String is empty");

                //If validation icon exists and field is empty, icon updates to Xed out
                if (parentTargetElem.lastChild.src != null) {
                    parentTargetElem.children[2].src = "img/falseIcon.png";
                    target.setAttribute("validated", "false");
                }

            //If target Text Field is not empty
            } else {
                //Target value is tested with RegEx function
                var test = inputValidation(targetValue);

                //If RegEx returned true, String failed Validation
                if (test == true) {
                    console.log(target.name + ": String is invalid");
                
                    //If Validation icon does not exist, a false one populates
                    if (parentTargetElem.children[2] == null) {
                        proofIcon.src = "img/falseIcon.png";
                        parentTargetElem.appendChild(proofIcon);
                        parentTargetElem.appendChild(tryAgainElem);
                        target.setAttribute("validated", "false");

                    //If Validation icon does exist, icon src is updated to false
                    } else {
                        parentTargetElem.children[2].src = "img/falseIcon.png";
                        target.setAttribute("validated", "false");
                        if (parentTargetElem.children[3] == null) {
                            parentTargetElem.appendChild(tryAgainElem);
                        }
                    }

                //If RegEx returned false, String passed Validation
                } else {
                    console.log(target.name + ": String is valid");

                    //If Validation icon does not exist, a true one populates
                    if (parentTargetElem.children[2] == null) {
                        proofIcon.src = "img/trueIcon.png"
                        target.setAttribute("validated", "true");
                        if (parentTargetElem.children[3] == null) {
                            parentTargetElem.appendChild(proofIcon);
                        }

                    //If Validation icon does exist, icon src is updated to true
                    } else {
                        parentTargetElem.children[2].src ="img/trueIcon.png"
                        target.setAttribute("validated", "true");
                        if (parentTargetElem.children[3] != null) {
                            parentTargetElem.removeChild(parentTargetElem.children[3]);
                        }
                    }
                }
            }
        }

        //First and last name validation called upon form element blur
        function NameValidation() {
            var target = e.target;
            var targetValue = e.target.value;
            var parentTargetElem = e.target.parentElement;

            //RegEx checking function that will check if there are symbols
            function inputValidation(e) {
                var charRegEx = /[^a-z]/gi;
                return charRegEx.test(e);
            }
            
            IconBuilder(target, targetValue, parentTargetElem, inputValidation);
        }

        //Phone Number validation called upon form element blur
        function pNumberValidation(e) {
            var target = e.target;
            var targetValue = e.target.value;
            var parentTargetElem = e.target.parentElement;

            //RegEx checking function that will check if there are symbols
            function inputValidation(e) {
                var charRegEx = /[a-z]/g;
                hasLetters = charRegEx.test(e);

                //If string has letters, validation returns false
                if (hasLetters == true) {
                    return true;
                
                //If string doesn't have letters continue with processing
                } else {
                    //Symbols removed for dynamic validation
                    charReplace = e.replace(/D/g, "");
                    //Checks to see if phone number has ten digits
                    sizeRegEx = /^[0-9]{10,10}$/g;
                    sizeValidator = sizeRegEx.test(charReplace);
                    return sizeValidator;
                }
            }

            IconBuilder(target, targetValue, parentTargetElem, inputValidation);
        }

        //E Mail validation called upon form element blur
        function eMailValidation(e) {
            var target = e.target;
            var targetValue = e.target.value;
            var parentTargetElem = e.target.parentElement;
        
            //RegEx checking function that will check if there are symbols
            function inputValidation(e) {
                var charRegEx = /[a-z\d]*[\@][a-z]*[a-z]*[\.][a-z]*/g;
                test = charRegEx.test(e);
                if (test == true) {
                    return false;
                } else {
                    return true;
                }
            }

            IconBuilder(target, targetValue, parentTargetElem, inputValidation);
        }

        //Website validation called upon form element blur
        function wSiteValidation(e) {
            var target = e.target;
            var targetValue = e.target.value;
            var parentTargetElem = e.target.parentElement;
                
            //RegEx checking function that will check if there are symbols
            function inputValidation(e) {
                var charRegEx = /((http):\/\/)/g;
                test = charRegEx.test(e);
                if (test == true) {
                    return false;
                } else {
                    return true;
                }
            }

            IconBuilder(target, targetValue, parentTargetElem, inputValidation);
        }

        //Function serving as final validation, checks if entire form is filled in and performs ID generation
        function submitValidator() {

            //Stores validation state created on element objects
            var fNameState = document.getElementById('fName').getAttribute("validated");
            var lNameState = document.getElementById('lName').getAttribute("validated");
            var pNumberState = document.getElementById('pNumber').getAttribute("validated");
            var eMailState = document.getElementById('eMail').getAttribute("validated");
            var wSiteState = document.getElementById('wSite').getAttribute("validated");

            //Creates Element for animal photo to exist upon
            var imageElem = document.createElement("img");
            var parentElem = document.getElementById("results");
            var container = document.createElement("div");

            //Stores location of where warning will populate
            var informationWarning = document.getElementById("information");
            var surveyWarning = document.getElementById("survey");

            //Creates Element for information text warning
            var informationWarningContainer = document.createElement("div");
            var informationWarningText = document.createTextNode("Please Fill out the Entire Form");
            var informationWarningElem = document.createElement("p");

            //Creates Element for survey warning
            var surveyWarningContainer = document.createElement("div");
            var surveyWarningText = document.createTextNode("Please Select an Option");
            var surveyWarningElem = document.createElement("p");

            var dog = document.getElementById("animalTypeDog");
            var cat = document.getElementById("animalTypeCat");
        
            //Defualt state for information section (OVERRIDE: set to true)
            var formComplete = false;
            
            //Checks if validation states attached to each input of the information section have been filled in and validated.
            if (fNameState == "true" && lNameState == "true" && pNumberState == "true" && eMailState == "true" && wSiteState == "true") {
                formComplete = true;
            } 

            //Checks if information section has been filled out, if not it prompts to select an option.
            if (informationWarning.parentElement.children[1] == null && formComplete == false) {

                informationWarningElem.appendChild(informationWarningText);
                informationWarningContainer.appendChild(informationWarningElem);
                informationWarning.parentElement.appendChild(informationWarningContainer);
                informationWarning.parentElement.children[1].setAttribute("class", "warning2");

            //Removes warning for information section if filled in to signify to user that information is correct.
            } else if (informationWarning.parentElement.children[1] != null && formComplete == true) {
                informationWarning.parentElement.removeChild(informationWarning.parentElement.children[1]);
            } 

            //Checks if survey has been filled out
            if (dog.checked == false && cat.checked == false && surveyWarning.parentElement.children[1] == null) {
                
                surveyWarningElem.appendChild(surveyWarningText);
                surveyWarningContainer.appendChild(surveyWarningElem);
                surveyWarning.parentElement.appendChild(surveyWarningContainer);
                surveyWarning.parentElement.children[1].setAttribute("class", "warning2");

            //Removes warning for survey section if filled in to signify to user that information is correct.
            } else if (surveyWarning.parentElement.children[1] != null && dog.checked == true || cat.checked == true) {
                //Extra if statement to remove console error when it trys to remove child element [1] and nothing is there
                if (surveyWarning.parentElement.children[1] != null) {
                    surveyWarning.parentElement.removeChild(surveyWarning.parentElement.children[1]);
                }
            }
            
            //Once true, script generates elements for ID card.
            if (formComplete == true) {
                var valueFName = document.createTextNode(fName.value + " " + lName.value);
                var valuePNumber = document.createTextNode("PHONE NUMBER: " + pNumber.value);
                var valueEMail = document.createTextNode("E-MAIL ADDRESS: " + eMail.value);
                var valueWSite = document.createTextNode("PERSONAL WEBSITE: "+ "\n" + wSite.value);
                var dogPerson = document.createTextNode("DOG PERSON");
                var catPerson = document.createTextNode("CAT PERSON");
                var fNElem = document.createElement('h2');
                var pNElem = document.createElement('p');
                var eMElem = document.createElement('p');
                var wSElem = document.createElement('p');
                var personType = document.createElement('h3');
                fNElem.appendChild(valueFName);
                pNElem.appendChild(valuePNumber);
                eMElem.appendChild(valueEMail);
                wSElem.appendChild(valueWSite);

                //Checks state of Survey to generate correct photo
                if (dog.checked == true && parentElem.children[0] == null){
                    parentElem.classList.remove('idCard:disabled');
                    parentElem.classList.add('idCard');
                    imageElem.src = "img/dogResult.png";
                    imageElem.height ="150";
                    imageElem.width ="150";
                    imageElem.classList.add('resultImg');
                    container.appendChild(imageElem);
                    parentElem.appendChild(container);
                    parentElem.children[0].children[0].setAttribute("alt", "Confused dog with hat and glasses as profile picture");
                    parentElem.appendChild(fNElem);
                    parentElem.appendChild(pNElem);
                    parentElem.appendChild(eMElem);
                    parentElem.appendChild(wSElem);
                    personType.appendChild(dogPerson);
                    parentElem.appendChild(personType);
                } else if (cat.checked == true && parentElem.children[0] == null){
                    parentElem.classList.remove('idCard:disabled');
                    parentElem.classList.add('idCard');
                    imageElem.src = "img/catResult.png";
                    imageElem.height ="150";
                    imageElem.width ="150";
                    imageElem.classList.add('resultImg');
                    container.appendChild(imageElem);
                    parentElem.appendChild(container);
                    parentElem.children[0].children[0].setAttribute("alt", "Startled cat as profile picture");
                    parentElem.appendChild(fNElem);
                    parentElem.appendChild(pNElem);
                    parentElem.appendChild(eMElem);
                    parentElem.appendChild(wSElem);
                    personType.appendChild(catPerson);
                    parentElem.appendChild(personType);
                }
            } 
        }
        
        if (e.target.name == "fName") {
            NameValidation(e);
        } else if (e.target.name == "lName"){
            NameValidation(e);
        } else if (e.target.name == "pNumber") {
            pNumberValidation(e);
        } else if (e.target.name == "eMail") {
            eMailValidation(e);
        } else if (e.target.name == "wSite") {
            wSiteValidation(e);
        } else if (e.target.name == "submit") {
            submitValidator();
        }
    }
    
    form1.fName.addEventListener("blur", validateData);
    form1.lName.addEventListener("blur", validateData);
    form1.pNumber.addEventListener("blur", validateData);
    form1.eMail.addEventListener("blur", validateData);
    form1.wSite.addEventListener("blur", validateData);
    submitButton.addEventListener("click", validateData);
}
