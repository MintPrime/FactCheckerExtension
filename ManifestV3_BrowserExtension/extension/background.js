chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true})
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => 
{
  chrome.contextMenus.create(
  {
    id: "klippy_check",
    title: "klippy is that true",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => 
{
  if (info.menuItemId === "klippy_check") 
    {
      chrome.sidePanel.open({tabId: tab.id});
    }
})
