import { Link } from 'react-router-dom';
import type {PlayerStats} from '../api/dashboard';

type Props = {
    playerStats?: PlayerStats[];
};



function TopScorers({playerStats}: Props) {
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
                {playerStats?.map(scorer => (
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