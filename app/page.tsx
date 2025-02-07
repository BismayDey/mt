import dynamic from "next/dynamic"

const EyeWithNoSSR = dynamic(() => import("@/components/Eye"), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <EyeWithNoSSR />
    </main>
  )
}

