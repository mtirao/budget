import { Link } from 'react-router-dom';
import { type Player } from '../api/players';

type Props = { 
    player: Player;
};

function PlayersTableRow({player}: Props) { 
    return (
        <tr className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors">
            <td className="px-lg py-md flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-bold border border-outline-variant">
                {`${player.firstname.charAt(0)}${player.lastname.charAt(0)}`.toUpperCase()}
                </div>
                <span className="font-semibold">{player.firstname + ' ' + player.lastname}</span>
            </td>
            <td className="px-lg py-md font-semibold text-primary">N/A</td>
            <td className="px-lg py-md">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[12px] font-bold">{player.position}</span>
            </td>
            <td className="px-lg py-md"> N/A</td>
            <td className="px-lg py-md font-semibold text-secondary-container">{player.block + player.defence + player.serve + player.spike}</td>
            <td className="px-lg py-md text-right">
                <div className="flex items-center justify-end gap-sm">
                    <button className="p-xs hover:bg-surface-container rounded text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button className="p-xs hover:bg-error-container rounded text-on-surface-variant hover:text-error">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                </div>
            </td>
        </tr>
    );
};


export default PlayersTableRow;