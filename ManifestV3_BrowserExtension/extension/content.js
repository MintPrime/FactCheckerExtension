var aifceWidget = null;                                         //define the widget.
var userSelection = null;

function createWidget() {
    if (aifceWidget) return;                                //if the widget exists already, exit. 

    if (!document.body) {                                   //if the page doesn't exist yet, add an event listener to do it when the page is ready. 
        console.log("klippy: god hasn't let there be light yet, patience, patience...");    
        document.addEventListener("DOMContentLoaded", createWidget);
        return;
    }

    const WIDGET_W = 360;
    const WIDGET_H = 280;
    const SKEW = 148;            // the parallelogram leans
    const OVERFLOW = 32;         // upwards offset

    let x = document.documentElement.clientWidth - WIDGET_W - 33;
    let y = 75;
    let grabX = 0, grabY = 0, maxX = 0, maxY = 0;

    aifceWidget = document.createElement("div");            //define the widget. this is the window
    aifceWidget.id = "aifceWidgetID";                       //widget id

    Object.assign(aifceWidget.style, {                      //styling the widget
        position: "fixed",
        top: "0",
        left: "0",
        width: `${WIDGET_W}px`,
        height: `${WIDGET_H}px`,
        zIndex: "2147483647",
        pointerEvents: "none",              // transparent container, only the bg itself can be dragged*
        willChange: "transform",
        transform: `translate(${x}px, ${y}px)`,
        display: "none"
    });

    const paper = document.createElement("div");
    Object.assign(paper.style, {
        position: "absolute",
        inset: "0",
        backgroundColor: "#fef9e7",
        clipPath: `polygon(${SKEW}px 0, 100% 0, calc(100% - ${SKEW}px) 100%, 0 100%)`,
        pointerEvents: "auto",
        cursor: "grab",
        userSelect: "none"
    });

    const contentSlot = document.createElement("div");   // an angular iframe is going to be slotted in here later
    Object.assign(contentSlot.style, {
        position: "absolute",
        top: "12px",
        bottom: "12px",
        left: `${SKEW}px`,                  // inside the slanted edges at both top and bottom
        right: `${SKEW}px`,
        fontFamily: "sans-serif",
        fontSize: "14px",
        overflow: "hidden"
    });

    const klippy = document.createElement("img");                           //klippy image 
    klippy.src = chrome.runtime.getURL("images/klippy.png")                 //directory
    klippy.alt = "Yep it's me, the Legally Distinct Paper Clip Klippy!";    //description
    klippy.draggable = false;                                               //no you cannot move him
    Object.assign(klippy.style, {
        position: "absolute",
        top: `-${OVERFLOW}px`,
        left: "35%",
        transform: "translateX(-35%)",
        width: "160px",
        height: "auto",
        pointerEvents: "auto",
        cursor: "grab",
        userSelect: "none"
    });

    function onDown(e) {
        if (e.button !== 0) return;
        grabX = e.clientX - x;
        grabY = e.clientY - y;
        maxX = document.documentElement.clientWidth - WIDGET_W;     // read once per drag
        maxY = document.documentElement.clientHeight - WIDGET_H;
        e.currentTarget.setPointerCapture(e.pointerId);
        aifceWidget.style.cursor = "grabbing";
    }

    function onUp() {aifceWidget.style.cursor = "";}

    function onMove(e) {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        x = Math.min(Math.max(0, e.clientX - grabX), maxX);
        y = Math.min(Math.max(OVERFLOW, e.clientY - grabY), maxY);
        aifceWidget.style.transform = `translate(${x}px, ${y}px)`;
    }

    [paper, klippy].forEach((handle) => {
        handle.addEventListener("pointerdown", onDown);
        handle.addEventListener("pointermove", onMove);
        handle.addEventListener("lostpointercapture", onUp);
    });

    aifceWidget.appendChild(paper);                             //he got his own surfboard yo
    aifceWidget.appendChild(klippy);                            //it's really him! 
    paper.appendChild(contentSlot);
    document.body.appendChild(aifceWidget);                     //append the widget to the page.
}

function showWidget() {   //open widget
        createWidget();
        if (!aifceWidget) return;
                console.log("klippy rises")
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
                //saveSelection(message.text || "");
                //userSelection = message.text || "";
                showWidget();
            }
        });