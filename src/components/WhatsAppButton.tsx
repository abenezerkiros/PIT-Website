// Render once in your root layout, after the SmoothScroll wrapper.
// The destination number must be registered with WhatsApp.
const WHATSAPP_URL = "https://wa.me/12029990346"


export default function WhatsAppButton() {
  return (
<a
  href="https://wa.me/12029990346"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with Premier on WhatsApp (opens in a new tab)"
  title="Chat with Premier on WhatsApp"
  className="fixed z-[60] inline-flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/20 bg-[#806b43] text-white shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-[#a38d65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5bc89] motion-reduce:transition-none md:h-[60px] md:w-[60px]"
  style={{
    right: "calc(20px + env(safe-area-inset-right, 0px))",
    bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.16 1.6 5.97L.02 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.64 23.83 24 18.48 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.9 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.87-9.96 9.87Z" />
    <path d="M17.5 14.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.49-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.62.72.23 1.37.2 1.89.12.58-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
</a>
  );
}
