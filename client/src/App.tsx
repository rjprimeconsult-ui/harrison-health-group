/*
 * HARRISON HEALTH GROUP — App Root
 * Dark theme. Single-page layout with admin routes.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ReviewProvider } from "./contexts/ReviewContext";
import Home from "./pages/Home";
import AdminReviews from "./pages/AdminReviews";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin/reviews"} component={AdminReviews} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <ReviewProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ReviewProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
