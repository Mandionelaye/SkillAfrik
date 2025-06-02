'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../../libs/gtag';

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    gtag.pageview(pathname);
  }, [pathname]);

  return null;
}
