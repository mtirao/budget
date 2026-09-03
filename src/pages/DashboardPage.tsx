import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

/**
 * Ported from design.html ("SpikeForce Dashboard"). All figures below are the
 * design's sample data — swap them for real fetches (see src/api/dashboard.ts
 * and src/api/games.ts) when wiring this page up to the backend.
 */
const QUICK_STATS = [
  {
    label: 'Matches Played',
    value: '24',
    caption: 'This Season',
    icon: 'sports_volleyball',
    iconBg: 'bg-primary-container',
  },
  {
    label: 'Active Players',
    value: '42',
    caption: 'Across 3 Teams',
    icon: 'groups',
    iconBg: 'bg-secondary-container',
  },
  {
    label: 'Points Scored',
    value: '1,845',
    caption: '+12% vs Last Season',
    icon: 'scoreboard',
    iconBg: 'bg-primary-container',
  },
];

const RECENT_MATCHES = [
  { opponent: 'Iron Blockers', date: 'Oct 21', score: '3 - 1', result: 'WIN' as const },
  { opponent: 'Net Ninjas', date: 'Oct 18', score: '3 - 0', result: 'WIN' as const },
  { opponent: 'Sky High VBC', date: 'Oct 14', score: '2 - 3', result: 'LOSS' as const },
];

const TOP_SCORERS = [
  {
    rank: 1,
    name: 'Sarah Jenkins',
    position: 'OH',
    points: 142,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCONXUxp8kOdt-SPe2j2rgBIsBCmTp2ZJS41MMkRMjM-my37t6F75F3XQwXaOGgEh5nCY3Giak2020sT_p-JMxMOi3OyuivgdfVzNPyLHIgfUo-ChDbbmaitQ6-pSay1xuEPmVM7u0Mo1IU_9hmj8iz6NYuVLsqIOnFWF0EOZ40afFnQELOH_9w8z9OJgGuKwcKECVq6gg_AilsLgIhldlxap3ax3hX9tIZDOTZGlhtHq2FzftRlv2OMA',
  },
  {
    rank: 2,
    name: 'Marcus Cole',
    position: 'MB',
    points: 118,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-wEYfzqbc-5VS42ZEY2mupvlDYyTugU10fCuofdT9SBjYW2I9qrg94KO5A-POAdvfl0rKUXSk0gWETljjGZ3A6SOmk_xq8_zzniQcxGf_od6H_UDFYKJbjqy-RUIjj2pPL6kF2CT-vr3xeJgwaxRAd9jpSAVNPRC43D9FBkNqjpIxBsh_uBxIKlwomHIGZGBTel9VtBkrcJMPJPS2r5wyJaeFc_1x-VftvRQT4iFKGh2ZSZG92Ex3WQ',
  },
  { rank: 3, name: 'Alex Turner', position: 'OPP', points: 95, initials: 'AT' },
  {
    rank: 4,
    name: 'Elena Rodriguez',
    position: 'OH',
    points: 88,
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJqwqjn6-EdRqdFHiEYzD1diFpCXseVAtAPRitkNk2oVohM2mzf86RmC5cBRVZet6x4AjKiP2IlKF5S7CsOR2HpuUE7kABbg3NuVuFUXwTFht-pk8_wh8iTV3WpfOArPLeYsTiKHRsW-WIuTWP_zunbO1owZLT1sunksMtYp_iHiIUKN_1fcS8RxuTq5VhvbBVX4mYQj2qkKh7narBzyCHojMuFltF_rat3ale1ArGu2w1PuBujeK2ZQ',
  },
  { rank: 5, name: 'David Bowen', position: 'MB', points: 76, initials: 'DB' },
];

const SIDE_NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { to: '/games', label: 'Matches', icon: 'sports_volleyball', active: false },
  { to: '/players', label: 'Players', icon: 'groups', active: false },
  { to: '/settings', label: 'Settings', icon: 'settings', active: false },
];

const RESULT_BADGE_CLASSES: Record<'WIN' | 'LOSS', string> = {
  WIN: 'bg-surface-container-high text-primary',
  LOSS: 'bg-error-container text-on-error-container',
};

function DashboardPage() {
  return (
     <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden min-h-screen">
      {/* SideNavBar */}
      <nav className="hidden md:block h-screen w-64 fixed left-0 top-0 bg-primary shadow-md z-50">
        <div className="flex flex-col p-md h-full">
          <div className="mb-xl flex items-center gap-sm mt-md">
            <img
              alt="Club Logo"
              className="w-10 h-10 rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyHV2MHXkYAPMHMhH5o_VzgXJg1HPh6H88iB017dfNxRnXp5tXMeydhfCxSpHOXp0MMMN-wTz8033QkrphJwS2SevILWEVFH_vg4tsUDQVzlL-KrVyJBx3pOzZiHiOw-vJCkNlRyaaJBN5clgYNdU7n-FSt0YHVMEYsKyImSpbntIqw8st0hW6FVD8uoPJEsqw-lSsIGJf_Ws7BgRLC-oJjdhozsHJx5QDuCpkjKt04QhA5Vqvwe0Tgw"
            />
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-on-primary">
                CV Furia Admin
              </h1>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Elite Club Management
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-sm flex-1">
            {SIDE_NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={
                    link.active
                      ? 'flex items-center gap-sm p-sm bg-secondary-container text-on-secondary-container rounded-lg font-label-bold hover:translate-x-1 transition-transform duration-200'
                      : 'flex items-center gap-sm p-sm text-on-primary-fixed-variant hover:bg-primary-container rounded-lg font-label-bold hover:translate-x-1 transition-transform duration-200'
                  }
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="mt-auto bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-sm px-md rounded-lg flex justify-center items-center gap-xs hover:bg-secondary transition-colors border-b-2 border-secondary-fixed">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Match
          </button>
        </div>
      </nav>

      {/* TopNavBar */}
      <header className="hidden md:flex bg-surface text-primary border-b border-outline-variant sticky top-0 z-40 justify-between items-center ml-64 px-xl py-md w-[calc(100%-16rem)]">
        <div>
          <span className="font-headline-md text-headline-md font-bold text-primary">
            Dashboard
          </span>
        </div>
        <div className="flex items-center gap-lg">
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJP6KDyV4Bq6JNaQ_IxFJeMrEk3xSSTmSrZwMvkyJNyStAP3ZcciFMObZrNhO4prQqFPh5OfKLUEu2dttUmLCcPKhHkWM_Tue9OFgC51-ANuMYnQIiczMNdOxkwHKkJnF-OGEsY6Dfg3nsqxdxDb1GMTiOaIZ3fUgN0_Lq0yVGVRvi_zp4zYCluc9DYbcEmVVaIdPGbbPbBIdZSxZhxXU5F1Jq3TuHBXpkdrLDNLgJazQE7PX9FQkLTQ"
          />
          <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-xs px-sm rounded-lg hover:bg-secondary transition-colors border-b-2 border-secondary-fixed">
            Add Match
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-lowest min-h-screen pb-24 md:pb-margin-desktop">
        {/* Quick Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
          {QUICK_STATS.map(stat => (
            <div
              key={stat.label}
              className="bg-surface rounded-xl p-lg card-shadow card-hover border border-surface-variant flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-md">
                <p className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </p>
                <span className={`material-symbols-outlined text-primary-container ${stat.iconBg} p-sm rounded-lg`}>
                  {stat.icon}
                </span>
              </div>
              <div>
                <h2 className="font-display-lg text-display-lg font-extrabold text-primary">
                  {stat.value}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                  {stat.caption}
                </p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Left Column: Next Match & Recent Matches */}
          <div className="lg:col-span-2 flex flex-col gap-lg">
            <section className="bg-primary-container text-on-primary-container rounded-xl p-lg card-shadow relative overflow-hidden flex items-center justify-between">
              <div className="absolute -right-10 -top-10 opacity-20">
                <span className="material-symbols-outlined text-[150px]">calendar_today</span>
              </div>
              <div className="relative z-10">
                <p className="font-label-bold text-label-bold text-secondary-fixed mb-xs uppercase">
                  Next Match
                </p>
                <h3 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                  vs. Thunder Spikes
                </h3>
                <p className="font-body-md text-body-md text-primary-fixed-dim mt-sm">
                  Saturday, Oct 28 • 14:00 PM • City Arena
                </p>
              </div>
              <div className="relative z-10 hidden md:block">
                <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-sm px-lg rounded-lg border-b-2 border-secondary hover:bg-secondary transition-colors">
                  View Details
                </button>
              </div>
            </section>

            <section className="bg-surface rounded-xl card-shadow overflow-hidden border border-surface-variant flex-1">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md font-bold text-primary">
                  Recent Matches
                </h3>
                <Link
                  to="/games"
                  className="font-label-bold text-label-bold text-secondary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-lowest text-on-surface-variant font-label-bold text-label-bold uppercase border-b border-outline-variant">
                      <th className="px-lg py-sm">Opponent</th>
                      <th className="px-lg py-sm">Date</th>
                      <th className="px-lg py-sm">Score</th>
                      <th className="px-lg py-sm">Result</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-background">
                    {RECENT_MATCHES.map(match => (
                      <tr
                        key={match.opponent}
                        className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors"
                      >
                        <td className="px-lg py-md font-semibold">{match.opponent}</td>
                        <td className="px-lg py-md text-on-surface-variant">{match.date}</td>
                        <td className="px-lg py-md">{match.score}</td>
                        <td className="px-lg py-md">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full font-label-bold text-[12px] ${RESULT_BADGE_CLASSES[match.result]}`}
                          >
                            {match.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Top Scorers Leaderboard */}
          <div className="lg:col-span-1">
            <section className="bg-surface rounded-xl card-shadow border border-surface-variant h-full">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md font-bold text-primary">
                  Top Scorers
                </h3>
                <span className="material-symbols-outlined text-outline">emoji_events</span>
              </div>
              <div className="p-md">
                <ul className="flex flex-col gap-sm">
                  {TOP_SCORERS.map(scorer => (
                    <li
                      key={scorer.rank}
                      className={`flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-lowest transition-colors group ${scorer.rank % 2 === 0 ? 'bg-tertiary/[0.02]' : ''}`}
                    >
                      <div className="flex items-center gap-md">
                        <div
                          className={
                            scorer.rank === 1
                              ? 'w-8 text-center font-headline-md text-primary font-bold'
                              : 'w-8 text-center font-label-bold text-on-surface-variant'
                          }
                        >
                          {scorer.rank}
                        </div>
                        {scorer.photo ? (
                          <img
                            alt="Player"
                            className="w-10 h-10 rounded-full border border-surface-variant object-cover"
                            src={scorer.photo}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-bold border border-outline-variant">
                            {scorer.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-label-bold text-label-bold text-on-background group-hover:text-primary transition-colors">
                            {scorer.name}
                          </p>
                          <div className="flex gap-xs mt-1">
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">
                              {scorer.position}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          scorer.rank === 1
                            ? 'font-headline-md text-headline-md font-bold text-secondary-container'
                            : 'font-headline-md text-[18px] font-bold text-primary'
                        }
                      >
                        {scorer.points}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Bottom NavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50 px-md py-sm flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to="/dashboard" className="flex flex-col items-center gap-xs text-secondary-container">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-label-bold">Dashboard</span>
        </Link>
        <Link to="/games" className="flex flex-col items-center gap-xs text-on-surface-variant">
          <span className="material-symbols-outlined">sports_volleyball</span>
          <span className="text-[10px] font-label-bold">Matches</span>
        </Link>
        <div className="relative -top-4">
          <button className="bg-secondary-container text-on-secondary-container p-sm rounded-full shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <Link to="/players" className="flex flex-col items-center gap-xs text-on-surface-variant">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[10px] font-label-bold">Players</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-xs text-on-surface-variant">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-label-bold">Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default DashboardPage;
