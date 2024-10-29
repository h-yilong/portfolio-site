import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-white/5 bg-black/20 py-6">
      <div className="max-width flex flex-col items-center sm:flex-row sm:justify-between">
        <p>&copy; 2024 All Rights Reserved, Yilong HUANG</p>
        <div className="mt-3 flex items-center gap-2 sm:mt-0">
          <Link target="_blank" href="https://github.com/h-yilong/portfolio-site">
            <svg width="32px" height="32px" className="fill-white hover:fill-indigo-600" viewBox="0 0 24 24">
              <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
            </svg>
          </Link>
          <div className="h-6 w-[1px] bg-white/30" />
          <Link target="_blank" href="https://www.linkedin.com/in/yilonghuang/">
            <svg width="32px" height="32px" className="fill-white hover:fill-indigo-600" viewBox="0 0 16 16">
              <path d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
