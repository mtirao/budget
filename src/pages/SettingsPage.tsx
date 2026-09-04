import NavigationBar from '../components/NavigationBar';
import TopNavbar from '../components/TopNavbar';


function SettingsPage() {
    const activeLink = '/settings';

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden min-h-screen">
            <NavigationBar activeLink={activeLink} />
            <TopNavbar activeLink={activeLink} />
        </div>
    );
}


export default SettingsPage;