"use client";

import React from "react";
import SciTechLayout from "../../components/SciTechLayout";
import UrlInspector from "../../components/UrlInspector";

export default function UrlPage() {
    return (
        <SciTechLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] mb-12">
                <UrlInspector />
            </div>
        </SciTechLayout>
    );
}
