import { Smartphone } from "lucide-react"

export default function SmallScreenMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4 text-center">
      <Smartphone className="w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Oops! Screen Too Small</h1>
      <p className="text-xl mb-4">This site is optimized for larger screens.</p>
      <p className="text-lg">Please view on a tablet or desktop for the best experience.</p>
    </div>
  )
}

