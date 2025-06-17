import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container-home flex flex-col items-center justify-center w-full gap-10">
      <h1 className="text-4xl font-bold">Seja Bem Vindo!</h1>
      <div>
        <Button>
          <NotebookPen />
          <Link href="/registers">Acessar Rotinas</Link>
        </Button>
      </div>
    </div>
  );
}
