import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { House, ContactRound, Calendar, CircleDollarSign, NotebookPen, Menu } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Link from 'next/link';

export default function NavBar() {
    return (
        <header className='mx-5 border-r-1 w-60 h-screen'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="flex flex-col gap-4">
                        <Button variant="ghost">Página Inicial</Button>
                        <Button variant="ghost">Clientes</Button>
                        <Button variant="ghost">Agenda</Button>
                        <Button variant="ghost">Financeiro</Button>
                        <Button variant="ghost">Rotinas</Button>
                    </nav>
                </SheetContent>
            </Sheet>

            <div className='user flex flex-row items-center mb-50 mt-10'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <h1 className='mx-3 md:hidden'>Arthur Bernardo</h1>
            </div>
            <div className='navigation md:hidden'>
                <nav>
                    <div className='flex flex-row items-center'>
                        <Button variant='ghost' className='text-lg'>
                            <House className='icon' />
                            <Link href="/">Pagina Inicial</Link>
                        </Button>
                    </div>
                    <div className='flex flex-row items-center'>
                        <Button variant='ghost' className='text-lg'>
                            <ContactRound className='icon' />
                            <Link href="/user">Clientes</Link>
                        </Button>
                    </div>
                    <div className='flex flex-row items-center'>
                        <Button variant='ghost' className='text-lg'>
                            <Calendar className='icon' />
                            <Link href="/calendar">Agenda</Link>
                        </Button>
                    </div>
                    <div className='flex flex-row items-center'>
                        <Button variant='ghost' className='text-lg'>
                            <CircleDollarSign className='icon' />
                            <Link href="/dashboard">Financeiro</Link>
                        </Button>
                    </div>
                    <div className='routines mt-60'>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <div className='flex flex-row'>
                                    <Button variant='ghost' className='text-lg items-center'>
                                        <NotebookPen className='icon' />
                                        <AccordionTrigger className='mx-3 text-lg'>Cadastros</AccordionTrigger>
                                    </Button>
                                </div>
                                <AccordionContent className='mx-10'>
                                    <Link href="/registers">Rotinas</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </nav>
            </div>
        </header>
    );
}