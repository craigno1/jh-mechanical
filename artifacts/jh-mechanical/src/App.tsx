import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ServicePage from '@/pages/ServicePage';
import AreaPage from '@/pages/AreaPage';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        
        {/* Services */}
        <Route path="/services/diesel-mechanic">{() => <ServicePage slug="diesel-mechanic" />}</Route>
        <Route path="/services/diesel-servicing">{() => <ServicePage slug="diesel-servicing" />}</Route>
        <Route path="/services/vehicle-maintenance">{() => <ServicePage slug="vehicle-maintenance" />}</Route>
        <Route path="/services/vehicle-breakdown">{() => <ServicePage slug="vehicle-breakdown" />}</Route>
        <Route path="/services/vehicle-repairs">{() => <ServicePage slug="vehicle-repairs" />}</Route>
        
        {/* Service Areas */}
        <Route path="/service-areas/heathcote">{() => <AreaPage slug="heathcote" />}</Route>
        <Route path="/service-areas/bendigo">{() => <AreaPage slug="bendigo" />}</Route>
        <Route path="/service-areas/seymour">{() => <AreaPage slug="seymour" />}</Route>
        <Route path="/service-areas/macedon">{() => <AreaPage slug="macedon" />}</Route>
        <Route path="/service-areas/shepparton">{() => <AreaPage slug="shepparton" />}</Route>
        <Route path="/service-areas/lockington">{() => <AreaPage slug="lockington" />}</Route>
        <Route path="/service-areas/melbourne">{() => <AreaPage slug="melbourne" />}</Route>
        <Route path="/service-areas/sunbury">{() => <AreaPage slug="sunbury" />}</Route>

        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
