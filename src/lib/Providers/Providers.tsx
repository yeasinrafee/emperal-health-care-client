'use client';

import { ReactNode } from 'react';
import { theme } from '../theme/theme';
import { ThemeProvider } from '@mui/material';

export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
