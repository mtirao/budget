import { Link } from 'react-router-dom';
import PlayersTableRow from './PlayersTableRow';
import { type Player } from '../api/players';

type Props = { 
    players: Player[];
};

function PlayersTables({players}: Props) {
    return (
        <div>
            <section className="bg-surface rounded-xl card-shadow overflow-hidden border border-surface-variant">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-lowest text-on-surface-variant font-label-bold text-label-bold uppercase border-b border-outline-variant">
                                    <th className="px-lg py-sm">Player</th>
                                    <th className="px-lg py-sm">Jersey #</th>
                                    <th className="px-lg py-sm">Position</th>
                                    <th className="px-lg py-sm">Matches Played</th>
                                    <th className="px-lg py-sm">Total Points</th>
                                    <th className="px-lg py-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-body-md text-body-md text-on-background">
                                {players.map((player) => (
                                    <PlayersTableRow player={player}/>
                                ))}
                            
                            </tbody>
                        </table>
                    </div>
                </section>
        </div>
    );
};


export default PlayersTables;