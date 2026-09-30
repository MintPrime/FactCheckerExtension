/*  content.js is klippy's window and lair. 
    ...it's the widget. this replaces the v0.103 side panel.    */

let aifceWidget = null;     //define the widget.

function createWidget() {
        console.log("document.body at widget creation:", document.body, "readyState:", document.readyState);    
        if (aifceWidget) return; //if this isn't null, fall through. 

        if (!document.body) {
            console.log("god must first let there be light, can't exist before that.");
            document.addEventListener("DOMContentLoaded", createWidget);
            return
        }

        aifceWidget = document.createElement("div");    //define the widget. this is the window.
        aifceWidget.id = "klippy-widget-root";          //widget id

        Object.assign(aifceWidget.style, {
                position: "fixed",
                top: "100px",
                left: "100px",
                width: "250px",
                height: "150px",
                backgroundColor: "#fef9e7",
                border: "2px solid #e6e5e5",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                zIndex: "2147483647", // maximum z-index. this puts the window on top of everything.
                padding: "12px",
                fontFamily: "sans-serif",
                fontSize: "14px",
                display: "none"
            }
        );

        const closeButton = document.createElement("button");   //create the close button element
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
            }
        );
        closeButton.addEventListener("click", hideWidget);      //close button functionality - trigger hideWidget on click

        const textElement = document.createElement("div");
        textElement.textContent = "yep, it's me. The Legally Distinct Paper Clip Klippy."; //temporary text to display in the window.
        textElement.style.marginTop = "16px";

        aifceWidget.appendChild(closeButton);
        aifceWidget.appendChild(textElement);
        document.body.appendChild(aifceWidget);
}



function showWidget() {   //open widget
        createWidget();
        aifceWidget.style.display = "block";
    }

function hideWidget() {   //dismiss widget (disable display)
        if (aifceWidget) {
                aifceWidget.style.display = "none";
            }
    }

function toggleWidget() {     //if the widget is active, dismiss it. if it isn't open it.
        if (!aifceWidget || aifceWidget.style.display === "none") {
                console.log("klippy rises")
                showWidget();
            } else {
                console.log("klippy falls")
                hideWidget();
            } 
    }

chrome.runtime.onMessage.addListener((message) => { //interact with the background.js - browser actions call on functions through here
        if (message.type === "TOGGLE_KLIPPY") {
                console.log("klippy hears your call");
                toggleWidget();    
            } else if (message.type === "SHOW_KLIPPY") {
                        console.log("klippy answers your call");
                        showWidget();
                    }
            }
)