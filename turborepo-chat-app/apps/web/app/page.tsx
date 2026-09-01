"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/input-text";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{
      height : "100vh", 
      width : "100vw",
      display : "flex", 
      alignItems : "center", 
      justifyContent : "center", 

    }}>
      <div>
      <TextInput  size="big" placeholder="Room ID" />
      <Button
          size="big"
          onClick={()=>
            router.push("/chat/123")
          }>
        Join Room
       </Button>
      </div>
    </div>
  );
}
