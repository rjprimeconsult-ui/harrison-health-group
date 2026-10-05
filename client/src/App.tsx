import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import Home from "@/pages/Home";
import AdminReviews from "@/pages/AdminReviews";
import NotFound from "@/pages/SiteNotFound";
import { AboutPage, BusinessPage, CareersPage, ContactPage, FAQPage, GuidePage, PrivacyPage, ResourcesPage, TermsPage } from "@/pages/ContentPages";
import { guides } from "@/content/guides";

function SiteRoutes() { return <Switch>
  <Route path="/" component={Home} />
  <Route path="/business" component={BusinessPage} />
  <Route path="/contact" component={ContactPage} />
  <Route path="/about" component={AboutPage} />
  <Route path="/resources" component={ResourcesPage} />
  <Route path="/resources/:slug">{(params) => { const guide = guides.find((item) => item.slug === params.slug); return guide ? <GuidePage guide={guide} /> : <NotFound />; }}</Route>
  <Route path="/faq" component={FAQPage} />
  <Route path="/careers" component={CareersPage} />
  <Route path="/privacy" component={PrivacyPage} />
  <Route path="/terms" component={TermsPage} />
  <Route path="/admin/reviews" component={AdminReviews} />
  <Route path="/404" component={NotFound} />
  <Route component={NotFound} />
</Switch>; }

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><ReviewProvider><TooltipProvider><Toaster /><WouterRouter ssrPath={ssrPath}><SiteRoutes /></WouterRouter></TooltipProvider></ReviewProvider></ThemeProvider></ErrorBoundary>;
}
