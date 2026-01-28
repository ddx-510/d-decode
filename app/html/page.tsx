"use client";

import React from "react";
import SciTechLayout from "../../components/SciTechLayout";
import HtmlEntityConverter from "../../components/HtmlEntityConverter";

export default function HtmlPage() {
    return (
        <SciTechLayout>
            <div className="flex flex-col items-center justify-center min-h-[50vh] mb-12">
                <HtmlEntityConverter />
            </div>
        </SciTechLayout>
    );
}
