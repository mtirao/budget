import { Link } from 'react-router-dom';
import type { Game } from '../api/useGames';
import MatchesTableRows from './MatchesTableRows';

type Props = { 
    games: Game[];
};

function MatchesTables({games}: Props) {  
    return (
        <div>
            <section className="bg-surface rounded-xl card-shadow overflow-hidden border border-surface-variant">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-lowest text-on-surface-variant font-label-bold text-label-bold uppercase border-b border-outline-variant">
                                    <th className="px-lg py-sm">Opponent</th>
                                    <th className="px-lg py-sm">Date &amp; Time</th>
                                    <th className="px-lg py-sm">Venue</th>
                                    <th className="px-lg py-sm">Score</th>
                                    <th className="px-lg py-sm">Status</th>
                                    <th className="px-lg py-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-body-md text-body-md text-on-background">
                                {games.map((game) => (
                                    <MatchesTableRows game={game} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
        </div>
    );
}

export default MatchesTables;