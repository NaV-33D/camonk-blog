import { Link, Outlet, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function AppShell() {
  const location = useLocation()

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-background dark:to-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* <div className="hidden text-xs font-medium text-muted-foreground sm:block">
              CA MONK
            </div> */}
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              CA
            </div>
            <div>
              {/* <div className="text-sm font-semibold leading-none tracking-tight">
                CA Monk Blog
              </div> */}
              <div className="mt-1 text-xs leading-snug text-muted-foreground max-w-xs">
                Stay updated with the latest trends in finance, accounting, and career growth
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {location.pathname !== '/new' ? (
              <Button asChild size="sm">
                <Link to="/new">Create</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="container px-4 pb-10 pt-6 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="container px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} CA Monk. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

