chrome.runtime.onInstalled.addListener(() => {  //create the context menu function. 
  chrome.contextMenus.create( {
    id: "aifceCheck",
    title: "klippy is this real",
    contexts: ["selection"]
      }
    );
  }
);

chrome.action.onClicked.addListener((tab) => { // toggle the widget when clicking the extension icon.
  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_KLIPPY" });
  }
);

chrome.contextMenus.onClicked.addListener((info, tab) => { // toggle the widget through the context menu when selecting text.
  if (info.menuItemId === "aifceCheck") {
    chrome.tabs.sendMessage(tab.id, { type: "SHOW_KLIPPY" });
    }
  }
);