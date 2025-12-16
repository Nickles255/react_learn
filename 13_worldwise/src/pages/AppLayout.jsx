import PageNav from "../components/PageNav.jsx";
import AppNav from "../components/AppNav.jsx";
function AppLayout() {
    return (
        <div>
            <PageNav />
            <AppNav />
            <p>App</p>
        </div>
    );
}

export default AppLayout;