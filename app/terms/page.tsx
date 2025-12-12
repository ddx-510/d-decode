"use client";

import React from "react";
import SciTechLayout from "@/components/SciTechLayout";
import HolographicCard from "@/components/HolographicCard";

export default function TermsPage() {
    return (
        <SciTechLayout>
            <div className="max-w-4xl mx-auto py-12">
                <HolographicCard title="TERMS_OF_SERVICE_AGREEMENT">
                    <div className="prose prose-invert prose-sm max-w-none text-zinc-400 font-mono">
                        <h2 className="text-neon-cyan/80">1. Terms</h2>
                        <p>
                            By accessing this website, accessible from d-decode, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this website are protected by copyright and trade mark law.
                        </p>

                        <h2 className="text-neon-cyan/80">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials on d-decode's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose or for any public display;</li>
                            <li>attempt to reverse engineer any software contained on d-decode's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                        <p>
                            This will let d-decode to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
                        </p>

                        <h2 className="text-neon-cyan/80">3. Disclaimer</h2>
                        <p>
                            All the materials on d-decode's website are provided "as is". d-decode makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, d-decode does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.
                        </p>

                        <h2 className="text-neon-cyan/80">4. Limitations</h2>
                        <p>
                            d-decode or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on d-decode's Website, even if d-decode or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
                        </p>

                        <h2 className="text-neon-cyan/80">5. Revisions and Errata</h2>
                        <p>
                            The materials appearing on d-decode's Website may include technical, typographical, or photographic errors. d-decode will not promise that any of the materials in this Website are accurate, complete, or current. d-decode may change the materials contained on its Website at any time without notice. d-decode does not make any commitment to update the materials.
                        </p>

                        <h2 className="text-neon-cyan/80">6. Links</h2>
                        <p>
                            d-decode has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by d-decode of the site. The use of any linked website is at the user's own risk.
                        </p>

                        <h2 className="text-neon-cyan/80">7. Site Terms of Use Modifications</h2>
                        <p>
                            d-decode may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
                        </p>

                        <h2 className="text-neon-cyan/80">8. Your Privacy</h2>
                        <p>
                            Please read our Privacy Policy.
                        </p>

                        <h2 className="text-neon-cyan/80">9. Governing Law</h2>
                        <p>
                            Any claim related to d-decode's Website shall be governed by the laws of without regards to its conflict of law provisions.
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-zinc-600">
                            Last Updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </HolographicCard>
            </div>
        </SciTechLayout>
    );
}
