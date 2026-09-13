// sw.js — ตัวจำการติดตั้งแอป (Service Worker) แบบพื้นฐานที่สุด
// หน้าที่เดียวของไฟล์นี้ในตอนนี้คือ "ทำให้เบราว์เซอร์ยอมรับว่านี่คือแอปที่ติดตั้งได้"
// ยังไม่ทำ offline cache ของข้อมูลจริง เพราะ Mobile.html เดิมต้องต่อเน็ตอยู่แล้วเพื่อดึงข้อมูลสด

const CACHE_NAME = "opd-shell-v1";
const SHELL_FILES = [
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
