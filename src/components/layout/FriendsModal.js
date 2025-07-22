"use client";

import { useState } from "react";
import Button from "../ui/button";

export default function FriendsModal() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div
                className='fixed inset-0 bg-black/60 z-20'
                onClick={onClose}
            ></div>
            <div className="flex fixed items-center justify-center flex-col z-30 bg-neutral-100 p-6 w-150 h-100 rounded-2xl">
                <h1>Friends Modal</h1>
                <Button onClick={onClose}>Close</Button>
            </div>
        </>
    )
}