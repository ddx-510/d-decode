"use client";

import React from "react";
import SciTechLayout from "../../components/SciTechLayout";
import JwtScanner from "../../components/JwtScanner";

export default function JwtPage() {
    return (
        <SciTechLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] mb-12">
                <JwtScanner />
            </div>
        </SciTechLayout>
    );
}
