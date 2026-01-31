'use client';

import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link';

export default function ContactPage() {
    const [state, handleSubmit] = useForm("mzdgqaed");

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
                    <span>←</span> BACK TO INDEX
                </Link>

                {/* Header */}
                <h1 className="text-6xl font-bold mb-4" style={{ color: '#ff3333' }}>
                    /CONTACT
                </h1>
                <p className="text-gray-500 mb-16">Get in Touch with the RokoRobo Team</p>

                {/* Main Form Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold">// REACH OUT</h2>
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-sm text-gray-500">COMMUNICATION</span>
                    </div>

                    {/* Info Box */}
                    <div className="border border-gray-800 p-8 mb-12">
                        <p className="text-lg mb-2">Have questions about RokoRobo? Want to collaborate? Found an issue?</p>
                        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    {state.succeeded ? (
                        <div className="border border-green-500 bg-green-500/10 p-8 text-center">
                            <p className="text-green-400 text-xl mb-2">✓ MESSAGE SENT SUCCESSFULLY</p>
                            <p className="text-gray-400 mb-4">Your message has been received. We will respond shortly.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-black font-bold transition-colors"
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-3" style={{ color: '#ff3333' }}>
                                    NAME *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border border-gray-800 p-6 text-lg focus:outline-none focus:border-gray-600 text-white"
                                    style={{ color: 'white' }}
                                />
                                <ValidationError
                                    prefix="Name"
                                    field="name"
                                    errors={state.errors}
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm mb-3" style={{ color: '#ff3333' }}>
                                    EMAIL *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border border-gray-800 p-6 text-lg focus:outline-none focus:border-gray-600 text-white"
                                    style={{ color: 'white' }}
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm mb-3" style={{ color: '#ff3333' }}>
                                    SUBJECT *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full bg-transparent border border-gray-800 p-6 text-lg focus:outline-none focus:border-gray-600 text-white"
                                    style={{ color: 'white' }}
                                />
                                <ValidationError
                                    prefix="Subject"
                                    field="subject"
                                    errors={state.errors}
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm mb-3" style={{ color: '#ff3333' }}>
                                    MESSAGE *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={12}
                                    className="w-full bg-transparent border border-gray-800 p-6 text-lg focus:outline-none focus:border-gray-600 text-white resize-none"
                                    style={{ color: 'white' }}
                                />
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                    className="text-red-400 text-sm mt-2"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className={`px-12 py-4 font-bold transition-colors ${state.submitting
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-black cursor-pointer'
                                    }`}
                                style={{ backgroundColor: state.submitting ? '#333' : '#ff3333' }}
                            >
                                {state.submitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Alternative Channels */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold">// ALTERNATIVE CHANNELS</h2>
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-sm text-gray-500">OPTIONS</span>
                    </div>

                    <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
                        {/* Social Media */}
                        <div className="border border-gray-800 p-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs text-gray-600">CHANNEL</span>
                                <span className="text-xs text-gray-600">SOCIAL</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">SOCIAL MEDIA</h3>
                            <p className="text-gray-500 mb-6">
                                Follow us on social platforms for updates and content.
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="https://www.youtube.com/@rokorobo"
                                    target="_blank"
                                    className="block hover:text-red-500 transition-colors"
                                    style={{ color: '#ff3333' }}
                                >
                                    → YOUTUBE
                                </a>
                                <a
                                    href="https://www.tiktok.com/@rokorobotic"
                                    target="_blank"
                                    className="block hover:text-red-500 transition-colors"
                                    style={{ color: '#ff3333' }}
                                >
                                    → TIKTOK
                                </a>
                                <a
                                    href="https://soundcloud.com/rokorobo"
                                    target="_blank"
                                    className="block hover:text-red-500 transition-colors"
                                    style={{ color: '#ff3333' }}
                                >
                                    → SOUNDCLOUD
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
