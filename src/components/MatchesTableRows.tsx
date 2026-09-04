import { Link } from 'react-router-dom';
import type { Game } from '../api/useGames';
import { WinBadge, LossBadge, UpcomingBadge } from './Badges';

type Props = { 
    game: Game;
};

function MatchesTablesRows({game}: Props) {
    console.log('game', game);
    return (
        <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors bg-tertiary/[0.02]">
            <td className="px-lg py-md font-semibold">{game.local === "CV Furia" ? game.visit : game.local}</td>
            <td className="px-lg py-md text-on-surface-variant">Oct 21 • 15:00</td>
            <td className="px-lg py-md text-on-surface-variant">{game.court}</td>
            <td className="px-lg py-md">{game.local === "CV Furia" ? `${game.setlocal}-${game.setvisit}` : `${game.setvisit}-${game.setlocal}`}</td>
            <td className="px-lg py-md">
                {game.setlocal === game.setvisit ? (
                    <UpcomingBadge />
                ) : game.local === "CV Furia" ? (
                    game.setlocal > game.setvisit ? (
                        <WinBadge />
                    ) : (
                        <LossBadge />
                    )
                ) : game.setvisit > game.setlocal ? (
                    <WinBadge />
                ) : (
                    <LossBadge />
                )}
            </td>
            <td className="px-lg py-md text-right">
                <div className="inline-flex gap-sm">
                    <button className="p-xs hover:text-secondary">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button className="p-xs hover:text-error">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default MatchesTablesRows;