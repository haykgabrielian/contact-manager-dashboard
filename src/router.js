import { jsx as _jsx } from "react/jsx-runtime";
import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Home from './components/Home';
import About from './components/About';
import UserDetails from './components/UserDetails';
import NotFound from './components/NotFound';
const rootRoute = createRootRoute({
    component: () => (_jsx("div", { children: _jsx(Outlet, {}) })),
    notFoundComponent: NotFound,
});
const HomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});
const UserDetailsRoute = createRoute({
    getParentRoute: () => HomeRoute,
    path: '/$userId', // Use dynamic routing to match user IDs
    component: UserDetails,
});
const AboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
});
const routeTree = rootRoute.addChildren([AboutRoute, HomeRoute]);
HomeRoute.addChildren([UserDetailsRoute]);
const router = createRouter({ routeTree });
export default router;
