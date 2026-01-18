'use client';

import { useState } from 'react';

export default function R2UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError('');
        setUploadedUrl('');

        try {
            // 1. Request signed URL
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });

            if (!response.ok) throw new Error('Failed to get upload URL');
            const { url } = await response.json();

            // 2. Upload to R2
            const uploadResponse = await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (!uploadResponse.ok) throw new Error('Upload to R2 failed');

            // 3. Construct Public URL
            // Use the env var or fallback
            const publicDomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'YOUR_R2_PUBLIC_DOMAIN';
            const fileUrl = `${publicDomain}/${file.name}`;

            setUploadedUrl(fileUrl);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1210] text-[#d0e0c0] flex flex-col items-center justify-center p-4 font-mono">
            <div className="max-w-md w-full border border-[#d0e0c0] p-8 bg-black/50">
                <h1 className="text-2xl font-bold mb-6 text-[#8B0000] border-b border-[#d0e0c0] pb-2">
          // R2 SECURE UPLOAD
                </h1>

                <div className="mb-6">
                    <label className="block mb-2 text-sm uppercase">Select Massive Video File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full text-sm bg-[#0f1a15] border border-[#d0e0c0] p-2 focus:outline-none focus:border-[#a4cfa4]"
                        accept="video/*,audio/*,image/*"
                    />
                </div>

                {error && (
                    <div className="mb-4 text-red-500 border border-red-500 p-2 text-sm">
                        ERROR: {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`w-full py-3 font-bold border ${uploading
                            ? 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                            : 'bg-[#0f1a15] border-[#d0e0c0] hover:bg-[#d0e0c0] hover:text-black cursor-pointer'
                        } transition-colors uppercase tracking-widest`}
                >
                    {uploading ? 'TRANSMITTING...' : 'INITIATE UPLOAD'}
                </button>

                {uploadedUrl && (
                    <div className="mt-8 p-4 border border-[#a4cfa4] bg-[#a4cfa4]/10">
                        <p className="text-xs text-[#a4cfa4] mb-2">UPLOAD SUCCESSFUL. COPY LINK:</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value={uploadedUrl}
                                className="flex-1 bg-black border border-[#a4cfa4] p-2 text-xs text-white"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(uploadedUrl)}
                                className="bg-[#a4cfa4] text-black px-4 text-xs font-bold hover:bg-white"
                            >
                                COPY
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
