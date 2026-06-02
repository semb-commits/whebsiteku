const OFFICIAL_DOMAINS = [
  "s-developer.netlify.app",
  "s-developer.com" // ganti kalau nanti punya domain custom
];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;
  
  try {
    const url = new URL(changeInfo.url);
    const hostname = url.hostname;
    
    if (OFFICIAL_DOMAINS.includes(hostname)) return;
    
    if (hostname.includes("s-developer") && !hostname.endsWith("netlify.app")) {
      chrome.action.setBadgeText({tabId, text: "!"});
      chrome.action.setBadgeBackgroundColor({tabId, color: "#ff0000"});
      
      chrome.notifications.create({
        type: "basic",
        title: "Peringatan Phishing",
        message: `Situs ${hostname} bukan situs resmi S-Developer. Hati-hati!`
      });
    }
  } catch (e) {}
});
