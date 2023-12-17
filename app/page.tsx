import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Evently</h1>
      <Button variant="destructive" className="px-4">
        Click me
      </Button>
    </div>
  );
}
