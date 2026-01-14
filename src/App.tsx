import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Categories from "@/pages/Categories";
import Tags from "@/pages/Tags";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import PostDetail from "@/pages/PostDetail";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";

// Use hash-based routing (/#/) to support opening index.html directly via file:// protocol
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/">
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route path="/categories">
          <Layout>
            <Categories />
          </Layout>
        </Route>
        <Route path="/tags">
          <Layout>
            <Tags />
          </Layout>
        </Route>
        <Route path="/about">
          <Layout>
            <About />
          </Layout>
        </Route>
        <Route path="/post/:id">
          <Layout>
            <PostDetail />
          </Layout>
        </Route>
        {/* Reuse Projects page for Hot/More for now to avoid 404 */}
        <Route path="/hot">
           <Layout><Projects /></Layout>
        </Route>
        <Route path="/subscribe">
           <Layout><About /></Layout>
        </Route>
        <Route path="/guestbook">
           <Layout><About /></Layout>
        </Route>
        <Route path="/more">
           <Layout><Projects /></Layout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

// Note on theming:
// - Choose defaultTheme based on your design (light or dark background)
// - Update the color palette in index.css to match
// - If you want switchable themes, add `switchable` prop and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

