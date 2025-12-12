"use client";

import React from "react";
import SciTechLayout from "@/components/SciTechLayout";
import HolographicCard from "@/components/HolographicCard";

export default function PrivacyPage() {
    return (
        <SciTechLayout>
            <div className="max-w-4xl mx-auto py-12">
                <HolographicCard title="PRIVACY_POLICY_PROTOCOL">
                    <div className="prose prose-invert prose-sm max-w-none text-zinc-400 font-mono">
                        <h2 className="text-neon-cyan/80">1. Introduction</h2>
                        <p>
                            Welcome to d-decode ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by d-decode.
                        </p>

                        <h2 className="text-neon-cyan/80">2. Information We Collect</h2>
                        <p>
                            <strong>Log Files:</strong> Like many other websites, d-decode makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                        </p>
                        <p>
                            <strong>Cookies and Web Beacons:</strong> d-decode does use cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.
                        </p>

                        <h2 className="text-neon-cyan/80">3. Google DoubleClick DART Cookie</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to d-decode and other sites on the internet.</li>
                            <li>However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-neon-purple hover:text-neon-cyan transition-colors">https://policies.google.com/technologies/ads</a></li>
                        </ul>

                        <h2 className="text-neon-cyan/80">4. Advertising Partners Privacy Policies</h2>
                        <p>
                            You may consult this list to find the Privacy Policy for each of the advertising partners of d-decode. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on d-decode, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                        </p>
                        <p>
                            Note that d-decode has no access to or control over these cookies that are used by third-party advertisers.
                        </p>

                        <h2 className="text-neon-cyan/80">5. Third Party Privacy Policies</h2>
                        <p>
                            d-decode's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                        </p>
                        <p>
                            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                        </p>

                        <h2 className="text-neon-cyan/80">6. GDPR Data Protection Rights</h2>
                        <p>
                            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The right to access – You have the right to request copies of your personal data.</li>
                            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                        </ul>

                        <h2 className="text-neon-cyan/80">7. Children's Information</h2>
                        <p>
                            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                        </p>
                        <p>
                            d-decode does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
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
