'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the static admin file in public folder
        window.location.href = '/admin/index.html';
    }, []);

    return null;
}
