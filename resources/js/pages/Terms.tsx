import { Head } from '@inertiajs/react';
import React from 'react';
import Layout from '../components/Layout';

export default function Terms() {
    return (
        <Layout>
            <Head>
                <title>Terms of Service - Regal Resto</title>
                <meta name="description" content="Terms of Service for Regal Resto restaurant management system" />
            </Head>

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to Regal Resto. These Terms of Service govern your use of our restaurant management system and services.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    By accessing and using Regal Resto, you accept and agree to be bound by these Terms of Service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Restaurant Services</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Regal Resto provides online table reservations, menu browsing, and order management services.
                                    We reserve the right to modify or discontinue services at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You are responsible for maintaining the confidentiality of your account credentials.
                                    You agree to accept responsibility for all activities under your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Reservations</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Table reservations are subject to availability and confirmation.
                                    We reserve the right to cancel reservations due to unforeseen circumstances.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All payments are processed securely through our payment partners.
                                    Prices are subject to change without notice.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Privacy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Your privacy is important to us. Please review our Privacy Policy for details on how we collect, use, and protect your information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Regal Resto shall not be liable for any indirect, incidental, or consequential damages.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to modify these Terms of Service at any time.
                                    Changes will be effective immediately upon posting.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have questions about these Terms of Service, please contact us at:
                                </p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-900">Email: info@regalresto.com</p>
                                    <p className="font-medium text-gray-900">Phone: +1 (555) 123-4567</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Regal Resto operates.
                                </p>
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
