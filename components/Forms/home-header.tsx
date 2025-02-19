import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeHeader() {
  return (
    <header className="w-full bg-[#FEEE00]">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Location */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Image src="/logo-2.svg" alt="noon" width={150} height={150} className="h-8 w-8" />
              </Link>
              <button className="flex items-center gap-1 text-sm">
                <span className="flex items-center gap-1">
                  Deliver to
                  <Image src="/https://f.nooncdn.com/s/app/com/common/images/flags/ae.svg" alt="UAE flag" width={20} height={14} className="h-3.5 w-5" />
                  Dubai
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium">العربية</button>
              <Button variant="ghost" className="text-sm font-medium">
                Log in
              </Button>
              <button className="flex items-center gap-1">
                <span className="sr-only">Wishlist</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
              <button className="relative flex items-center gap-1">
                <span className="sr-only">Cart</span>
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <div className="container flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder.svg" alt="noon" width={72} height={22} className="h-5.5 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <button>
              <Search className="h-6 w-6" />
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button className="flex items-center gap-1">
              <Image src="/placeholder.svg" alt="UAE flag" width={20} height={14} className="h-3.5 w-5" />
              <span className="text-sm">Dubai</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

