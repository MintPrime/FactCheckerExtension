/*  content.js is klippy's window and lair. 
    ...it's the widget. this replaces the v0.103 side panel.    */

var aifceWidget = null;                                         //define the widget.
var userInput = "";                                             //direct input from the user
//var userSelection = "";                                         //text content of selection after activation
var userSelection = null;

function createWidget() {
        console.log("DEBUG: document.body at widget creation:", document.body, "readyState: ", document.readyState);       //debug log to check if the page exists. 
        if (aifceWidget) return;                                //if the widget exists already, exit. 
    
        if (!document.body) {                                   //if the page doesn't exist yet, add an event listener to do it when the page is ready. 
            console.log("klippy: god hasn't let there be light yet, patience, patience...");    
            document.addEventListener("DOMContentLoaded", createWidget);
            return;
        }

        let dragOffsetX = 0;
        let dragOffsetY = 0;

        aifceWidget = document.createElement("div");            //define the widget. this is the window.
        aifceWidget.id = "aifceWidgetID";                       //widget id.

        Object.assign(aifceWidget.style, {                      //styling the widget.
                position: "fixed",
                top: "75px",
                right: "33px",
                width: "250px",
                height: "150px",
                backgroundColor: "#fef9e7",
                border: "2px solid #e6e5e5",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                zIndex: "2147483647",                           // maximum z-index. this puts the window on top of everything.
                padding: "12px",
                fontFamily: "sans-serif",
                fontSize: "14px",
                display: "none"
            });

        const closeButton = document.createElement("button");   //create the close button element.
        closeButton.textContent = "x";
        Object.assign(closeButton.style, {
                position: "absolute",
                top: "4px",
                right: "8px",
                border: "none",
                background: "none",
                fontSize: "16px",
                cursor: "pointer",
                lineHeight: "1"
            });

        closeButton.addEventListener("click", hideWidget);      //close button functionality - trigger hideWidget on click.

        /*const textElement = document.createElement("div");
        textElement.textContent = "yep, it's me. The Legally Distinct Paper Clip Klippy."; //temporary text to display in the window.
        textElement.style.marginTop = "16px";   */

        const klippy = document.createElement("img");                           //klippy image 
        klippy.src = chrome.runtime.getURL("images/klippy.png")                 //directory
        klippy.alt = "Yep it's me, the Legally Distinct Paper Clip Klippy!";    //description
        klippy.draggable = false;                                               //no you cannot move him

        Object.assign(klippy.style, {
            position: "absolute",
            bottom: "calc(100% - 180px)",   // the image's bottom sits 180 pixels below the widget's top edge
            left: "50%",
            transform: "translateX(-50%)",  // image is horizontally centered
            width: "360px",                 // placeholder size
            height: "auto",                 // keeps aspect ratio
            pointerEvents: "none"
        });

        const inputBox = document.createElement("textarea");                //create the text box for user input
        inputBox.placeholder = "Ask me anything and I might answer.";

        Object.assign(inputBox.style, {     //styling the text box
            position: "absolute",
            bottom: "8px",
            left: "12px",
            width: "calc(100% - 24px)",   // prevent the text box from being wider than the widget and overflowing. 24/2 = 12px margin
            boxSizing: "border-box",
            resize: "none",
            fontFamily: "inherit",
            fontSize: "13px"
            });

        inputBox.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {         //shift + enter is new line, don't trigger when shift is pressed.
                e.preventDefault();                         //do not create a new line

                const trimmedText = e.target.value.trim();  //trims input, serves to prevent empty messages being sent.
                if (trimmedText === "") return;

                userInput = trimmedText;
                console.log("user input: ", userInput)
                inputBox.value = "";                        //reset text box after sending.
                }
            });

        aifceWidget.appendChild(closeButton);                       //append the close button to the widget window.
        aifceWidget.appendChild(klippy);                            //it's really him! 
        //aifceWidget.appendChild(textElement);                     //append the placeholder text.
        aifceWidget.appendChild(inputBox);                          //append the input text box.

        document.body.appendChild(aifceWidget);                     //append the widget to the page.
        
        aifceWidget.addEventListener("pointerdown", (e) => {                        //new dragging function. now based on pointer position.
            if (e.target === closeButton || e.target === inputBox) return;          //don't drag pressing on close or text box
            if (e.button !== 0) return                                              //drag with lmb only

            const rect = aifceWidget.getBoundingClientRect();       // get the current position of the widget.
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;

            aifceWidget.setPointerCapture(e.pointerId);             //update cursor position
            aifceWidget.style.cursor = "grabbing";                  // change the cursor icon to grabbing.
            aifceWidget.style.userSelect = "none";                  //disables text selection
        });

        aifceWidget.addEventListener("pointermove", (e) => {
            if (!aifceWidget.hasPointerCapture(e.pointerId)) return;                                        //only move during drag.

            const maxLeft = document.documentElement.clientWidth - aifceWidget.offsetWidth;                 //set maximum positions inside the viewport 
            const maxRight = document.documentElement.clientHeight - aifceWidget.offsetHeight;
                            
            aifceWidget.style.left = `${Math.min(Math.max(0, e.clientX - dragOffsetX), maxLeft)}px`;        //prevent the widget from being dragged outside the viewport
            aifceWidget.style.top = `${Math.min(Math.max(0, e.clientY - dragOffsetY), maxRight)}px`;
        });

        function endDrag(e) {
            if (aifceWidget.hasPointerCapture(e.pointerId)) {
                aifceWidget.releasePointerCapture(e.pointerId);     //release the pointer capture if there is one
            }
            aifceWidget.style.cursor = "default";                   //reset cursor styling
            aifceWidget.style.userSelect = "";                      //resets text selection restriction
        }
        
        aifceWidget.addEventListener("pointerup", endDrag);         
        aifceWidget.addEventListener("pointercancel", endDrag);
}

function saveSelection(text) {
    userSelection = {
        source: "selection",
        text: text,
        pageUrl: location.href,
        pageTitle: document.title,
        savedAt: new Date().toISOString() 
    };
    console.log("user selection: ", userSelection);
}

function showWidget() {   //open widget
        console.log("klippy rises")
        createWidget();
        aifceWidget.style.display = "block";
    }

function hideWidget() {   //dismiss widget (disable display)
        if (aifceWidget) {
                console.log("klippy falls")
                aifceWidget.style.display = "none";
            }
    }

function toggleWidget() {     //if the widget is active, dismiss it. if it isn't open it.
        if (!aifceWidget || aifceWidget.style.display === "none") {
                showWidget();
            } else {
                hideWidget();
            } 
    }

function createBookmarkIcon() {                 
    const tab = document.createElement("div");          //create a little bookmark element.
    tab.id = "aifceBookmarkID"
    tab.textContent = "📎";                             //📎

    Object.assign(tab.style, {                          //styling the bookmark
        position: "fixed",
        top: "8%",
        right: "0px",
        backgroundColor: "#fef9e7",
        border: "2px solid #e6e5e5",
        borderRight: "none",
        borderRadius: "8px 0 0 8px", // rounded on the left side only, flush against the edge on the right
        padding: "10px 6px",
        fontSize: "18px",
        cursor: "pointer",
        zIndex: "2147483647",
        boxShadow: "-2px 0 6px rgba(0,0,0,0.2)"
        });

    tab.addEventListener("click", toggleWidget);

    document.body.appendChild(tab);             //append the bookmark
}

createBookmarkIcon();

chrome.runtime.onMessage.addListener((message) => { //interact with the background.js - browser actions call on functions through here
        if (message.type === "TOGGLE_KLIPPY") {
                console.log("klippy hears your call");
                toggleWidget();    
        } else if (message.type === "SHOW_KLIPPY") {
                console.log("klippy answers your call");
                saveSelection(message.text || "");
                //userSelection = message.text || "";
                showWidget();
            }
        });