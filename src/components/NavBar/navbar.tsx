import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { House, ContactRound, Calendar, CircleDollarSign, NotebookPen, Menu } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Link from 'next/link';

export default function NavBar() {
    return (
        <header className='navbar mx-5 border-r-1 w-60 h-screen items-center justify-center'>
            <div className='navbar-mobile'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="icon-menu h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-4 justify-center items-center mt-10">
                            <Button variant="ghost">
                                <House className='icon' />
                                <Link href="/">Pagina Inicial</Link>
                            </Button>
                            <Button variant="ghost">
                                <ContactRound className='icon' />
                                <Link href="/user">Clientes</Link>
                            </Button>
                            <Button variant="ghost">
                                <Calendar className='icon' />
                                <Link href="/calendar">Agenda</Link>
                            </Button>
                            <Button variant="ghost">
                                <CircleDollarSign className='icon' />
                                <Link href="/dashboard">Financeiro</Link>
                            </Button>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <Button variant='ghost' className='items-center mt-40'>
                                        <NotebookPen className='icon' />
                                        <AccordionTrigger className='mx-3'>Cadastros</AccordionTrigger>
                                    </Button>
                                    <AccordionContent className='mx-10'>
                                        <Link href="/registers">Rotinas</Link>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            <div className='user flex flex-row items-center mb-50 mt-10'>
                <Avatar className="avatar">
                    <AvatarImage src="https://github.com/OThurDev.png" />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <h1 className='name mx-3'>Arthur Bernardo</h1>
            </div>
            <div className='navigation'>
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
                    <div className='routines mt-40'>
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