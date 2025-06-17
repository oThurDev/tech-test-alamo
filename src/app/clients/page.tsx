import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="container-home flex flex-col items-center justify-center w-full gap-10">
            <h1 className="text-4xl font-bold">Seja bem vindo</h1>
            <div>
                <Button>
                    <Link href="/registers">Acessar Rotinas</Link>
                </Button>
            </div>
        </div>
    );
}
