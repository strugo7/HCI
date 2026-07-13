import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';

export default function NotFoundPage(): ReactNode {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="font-mono text-5xl font-semibold text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">הדף לא נמצא</h1>
      <p className="max-w-md text-muted-foreground">
        ייתכן שהשיעור או המושג שחיפשתם עדיין לא נוספו למאגר התוכן.
      </p>
      <Button asChild className="mt-2">
        <Link to={ROUTES.dashboard}>חזרה לסקירה</Link>
      </Button>
    </div>
  );
}
