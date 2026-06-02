const OFFICIAL_DOMAINS = [
  "s-developer.netlify.app",
  "s-developer.com" // ganti kalau nanti punya domain custom
];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;
  
  try {
    const url = new URL(changeInfo.url);
    const hostname = url.hostname;
    
    // Skip kalau domain resmi
    if (OFFICIAL_DOMAINS.includes(hostname)) return;
    
    // Cek kemiripan: ada kata "s-developer" tapi domain beda
    if (hostname.includes("s-developer") && !hostname.endsWith("netlify.app")) {
      chrome.action.setBadgeText({tabId, text: "!"});
      chrome.action.setBadgeBackgroundColor({tabId, color: "#ff0000"});
      
      // Notifikasi
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon128.png",
        title: "Peringatan Phishing",
        message: `Situs ${hostname} bukan situs resmi S-Developer. Hati-hati!`
      });
    }
  } catch (e) {}
});
