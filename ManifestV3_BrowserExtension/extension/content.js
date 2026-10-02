/*  content.js is klippy's window and lair. 
    ...it's the widget. this replaces the v0.103 side panel.    */

var aifceWidget = null;                                         //define the widget.

function createWidget() {
        console.log("DEBUG: document.body at widget creation:", document.body, "readyState: ", document.readyState);       //debug log to check if the page exists. 
        if (aifceWidget) return;                                //if the widget exists already, exit. 
    
        if (!document.body) {                                   //if the page doesn't exist yet, add an event listener to do it when the page is ready. 
            console.log("klippy: god hasn't let there be light yet, patience, patience...");    
            document.addEventListener("DOMContentLoaded", createWidget);
            return;
        }

        let isDragging = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        aifceWidget = document.createElement("div");            //define the widget. this is the window.
        aifceWidget.id = "aifceWidgetID";                    //widget id.

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
            }
        );

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
            }
        );
        closeButton.addEventListener("click", hideWidget);      //close button functionality - trigger hideWidget on click.

        const textElement = document.createElement("div");
        textElement.textContent = "yep, it's me. The Legally Distinct Paper Clip Klippy."; //temporary text to display in the window.
        textElement.style.marginTop = "16px";

        aifceWidget.appendChild(closeButton);
        aifceWidget.appendChild(textElement);
        document.body.appendChild(aifceWidget);

        aifceWidget.addEventListener("mousedown", (e) => {          //dragging functionality for the widget.
            if (e.target === closeButton) return;                   //don't start dragging if the close button is clicked.
            if (e.button !== 0) return;                             //drag with left click only.
            
            isDragging = true;

            const rect = aifceWidget.getBoundingClientRect();       // get the current position of the widget.
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
        
            aifceWidget.addEventListener("contextmenu", (e) => { e.preventDefault(); });    // prevent the context menu from appearing while dragging. 
            e.preventDefault();                                     // prevent text selection while dragging.

            document.addEventListener("mousemove", onDragMove);
            document.addEventListener("mouseup", onDragEnd);
            }
        );

        function onDragMove(e) {                                    //dragging functionality for the widget.
            if (!isDragging) return;
            
            aifceWidget.style.cursor = "grabbing";                  // change the cursor icon to grabbing.

            const newLeft = e.clientX - dragOffsetX;
            const newTop = e.clientY - dragOffsetY;

            aifceWidget.style.left = `${newLeft}px`;
            aifceWidget.style.top = `${newTop}px`;
        }

        function onDragEnd() {                                  //clear event listeners when dragging stops.
            isDragging = false;

            aifceWidget.style.cursor = "default";                  // change the cursor icon back to default.

            document.removeEventListener("mousemove", onDragMove);
            document.removeEventListener("mouseup", onDragEnd);
        }
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
    const tab = document.createElement("div");
    tab.id = "aifceBookmarkID"
    tab.textcontent = "K";

    Object.assign(tab.style, {
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
        }
    );

    tab.addEventListener("click", toggleWidget);

    document.body.appendChild(tab);
}

createBookmarkIcon();

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