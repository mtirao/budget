import NavigationBar from '../components/NavigationBar';
import TopNavbar from '../components/TopNavbar';
import QuickStats from '../components/QuickStats';
import NextMatch from '../components/NextMatch';
import RecentMatches from '../components/RecentMatches';
import TopScorers from '../components/TopScorers';
import {useDashboard} from '../api/useDashboard';
import playerStyles from './PlayersPage.module.css';

function DashboardPage() {
    const { data, isLoading, error } = useDashboard();

    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden min-h-screen">
            <NavigationBar />
            <TopNavbar />
            {/* Main Content Area — offset with md:ml-64 so it clears the fixed
                sidebar; the loading/error/empty states need that offset just
                as much as the loaded content does, or they render hidden
                underneath the sidebar on desktop. */}
            <main className="md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-lowest min-h-screen pb-24 md:pb-margin-desktop">
                {isLoading ? <p className={playerStyles.message}>Loading data…</p> : null}
                {error ? (
                    <p className={`${playerStyles.message} ${playerStyles.errorMessage}`} role="alert">
                        {error}
                    </p>
                ) : null}
                {!isLoading && !error && data?.games.length === 0 ? (
                    <p className={playerStyles.message}>No games available.</p>
                ) : null}
                {data?.games && data.games.length > 0 && (
                    <div>
                        {/* Quick Stats Row */}
                        <QuickStats />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                            {/* Left Column: Next Match & Recent Matches */}
                            <div className="lg:col-span-2 flex flex-col gap-lg">
                                <NextMatch />
                                <RecentMatches />
                            </div>

                            {/* Right Column: Top Scorers Leaderboard */}
                            <div className="lg:col-span-1">
                                <TopScorers />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
  );
}

export default DashboardPage;
