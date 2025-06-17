'use client'

import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function CalendarPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="container-home flex flex-col items-center justify-center w-full gap-10">
            <h1 className="text-4xl font-bold">Sua Agenda</h1>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />
        </div>
    );
}
