import { Link } from 'react-router-dom';

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

function TopScorers() {
    return (
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
    );
};

export default TopScorers;