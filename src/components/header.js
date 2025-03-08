"use client";

export default function Header() {

    const toggleSidebar = () => {
        console.log('lol')
    }

    return (
        <div className="fixed top-0 left-0 w-full flex justify-between z-50 items-center p-4 bg-transparent">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
            >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </button>
            <div className="header-profile-container">
            </div>
        </div>
    )
}