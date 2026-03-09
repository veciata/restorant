import { Head } from '@inertiajs/react';
import React from 'react';
import Layout from '../components/Layout';

export default function Privacy() {
    return (
        <Layout>
            <Head>
                <title>Privacy Policy - Regal Resto</title>
                <meta name="description" content="Privacy Policy for Regal Resto restaurant management system" />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                            <p className="text-gray-600 leading-relaxed">
                                At Regal Resto, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and share your information.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Name, email address, phone number, and payment information when you make reservations or orders.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Data</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Information about how you use our website, including pages visited and features used.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Device Information</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            IP address, browser type, and device information for security and analytics purposes.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Service Provision</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            To process reservations, manage orders, and provide customer support.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Communication</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            To send reservation confirmations, order updates, and promotional materials.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Improvement</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            To analyze usage patterns and improve our services and user experience.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
                                </p>
                                <div className="mt-4 space-y-3">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Service Providers</h4>
                                        <p className="text-gray-600">
                                            Payment processors, delivery services, and other third-party service providers necessary to operate our restaurant.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Legal Requirements</h4>
                                        <p className="text-gray-600">
                                            When we believe disclosure is required by law or to protect our rights.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Encryption</h3>
                                        <p className="text-gray-600">
                                            All data transmissions are encrypted using SSL/TLS protocols.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Controls</h3>
                                        <p className="text-gray-600">
                                            Strict access controls and authentication mechanisms for data protection.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We use cookies and similar tracking technologies to enhance your experience and analyze website usage.
                                </p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                                        <p className="text-gray-600">
                                            Required for basic website functionality and security.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                                        <p className="text-gray-600">
                                            Help us understand how visitors interact with our website.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Access and Correction</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            You have the right to access and correct your personal information.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Data Deletion</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            You can request deletion of your personal information, subject to legal obligations.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Opt-out</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            You can opt out of marketing communications at any time.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us:
                                </p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-900">Email: privacy@regalresto.com</p>
                                    <p className="font-medium text-gray-900">Phone: +1 (555) 123-4567</p>
                                    <p className="font-medium text-gray-900">Address: 123 Gourmet Street, Culinary District, NY 10001</p>
                                </div>
                            </section>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
