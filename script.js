function getGreeting() {
    var now = new Date();
    var hour = now.getHours();
    var greeting;

    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    return greeting;
}
function displayGreeting() {
    var greetingMessage = getGreeting();
    var greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.textContent = greetingMessage;
    }
}
window.onload = displayGreeting;
