import { ChatInput } from "./_components/chat-input"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-background w-3/5 gap-4">
      <div className="w-full ">
        <ChatInput />
      </div>

      <div className=" text-center text-sm text-muted-foreground">
        <p>we provide deep insights about your image, Ask anything about your image...</p>
      </div>
    </main>
  )
}
// TODO : fix responsiveness of this page
