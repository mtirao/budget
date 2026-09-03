import { Link } from 'react-router-dom';

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

function QuickStats() {
    return (
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
    );
};

export default QuickStats;