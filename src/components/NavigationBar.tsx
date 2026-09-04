import { Link } from 'react-router-dom';

const SIDE_NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { to: '/games', label: 'Matches', icon: 'sports_volleyball', active: false },
  { to: '/players', label: 'Players', icon: 'groups', active: false },
  { to: '/settings', label: 'Settings', icon: 'settings', active: false },
];

type Props = {
  activeLink?: string;
};

function NavigationBar({ activeLink }: Props) {
  return (
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
                  link.to === activeLink
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
  );
}

export default NavigationBar;
