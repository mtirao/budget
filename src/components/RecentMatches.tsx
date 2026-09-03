import { Link } from 'react-router-dom';

const RECENT_MATCHES = [
  { opponent: 'Iron Blockers', date: 'Oct 21', score: '3 - 1', result: 'WIN' as const },
  { opponent: 'Net Ninjas', date: 'Oct 18', score: '3 - 0', result: 'WIN' as const },
  { opponent: 'Sky High VBC', date: 'Oct 14', score: '2 - 3', result: 'LOSS' as const },
];

const RESULT_BADGE_CLASSES: Record<'WIN' | 'LOSS', string> = {
  WIN: 'bg-surface-container-high text-primary',
  LOSS: 'bg-error-container text-on-error-container',
};

function RecentMatches() {
    return (
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
    );
};

export default RecentMatches;