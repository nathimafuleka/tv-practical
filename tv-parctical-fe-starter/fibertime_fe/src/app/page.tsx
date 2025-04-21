'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.startsWith('device.')) {
      router.push('/tv');
    } else if (hostname.startsWith('mobile.')) {
      router.push('/mobile');
    } else {
      // Default to mobile view
      router.push('/mobile');
    }
  }, [router]);

  return null;
}