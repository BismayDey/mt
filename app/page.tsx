import dynamic from "next/dynamic";

const EyeWithNoSSR = dynamic(() => import("@/components/Eye"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <EyeWithNoSSR key={index} />
        ))}
      </div>
    </main>
  );
}
