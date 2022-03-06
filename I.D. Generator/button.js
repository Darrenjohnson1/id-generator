window.onload = function ScriptOnLoad() {
    const buttonSubmit = document.getElementById('buttonSubmit');
    console.log(document.forms)
    buttonSubmit.onclick = function submitAllForms() {
        if (document.forms[0]) {
            console.log("1 Rendered")
            document.forms[0].submit();
        }
        if (document.forms[1]) {
            console.log("2 Rendered")
            document.forms[1].submit();
        }
        if (document.forms[2]) {
            console.log("3 Rendered")
            document.forms[2].submit();
        }
    }
}