// Init AOS animation
AOS.init({duration: 800, once: true, offset: 100});

// Function buka WhatsApp - biar nomor gak gampang di-scrape bot
function openWA() {
  window.open('https://wa.me/62895351432524', '_blank');
}

// Anti-Phising: Warning kalau klik link luar
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const url = this.href;
    const isExternal = !url.includes(window.location.hostname);

    if(isExternal && !url.includes('wa.me')) {
      if(!confirm('⚠️ Kamu akan keluar ke website eksternal:\n' + url + '\n\nPastikan ini website resmi. Lanjutkan?')) {
        e.preventDefault();
      }
    }
  });
});
