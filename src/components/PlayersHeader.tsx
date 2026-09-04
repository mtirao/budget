import { Link } from 'react-router-dom';


function PlayersHeader() {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-bold text-primary">Team Roster</h1>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Manage all active players, view stats, and update player details.</p>
                </div>
                <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-sm px-lg rounded-lg flex items-center gap-xs hover:bg-secondary transition-colors border-b-2 border-secondary-fixed">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                        Add Player
                    </button>
            </div>
            <div className="bg-surface rounded-xl p-md card-shadow border border-surface-variant mb-lg flex flex-col md:flex-row justify-between items-center gap-md">
                <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input className="w-full pl-[36px] pr-sm py-xs rounded-lg border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest text-body-sm" placeholder="Search players..." type="text"/>
                </div>
                <div className="flex flex-wrap gap-xs w-full md:w-auto">
                    <button className="px-md py-xs rounded-lg bg-secondary-container text-on-secondary-container font-label-bold text-label-bold">All</button>
                    <button className="px-md py-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-bold text-label-bold transition-colors">OH</button>
                    <button className="px-md py-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-bold text-label-bold transition-colors">MB</button>
                    <button className="px-md py-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-bold text-label-bold transition-colors">Setter</button>
                    <button className="px-md py-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-bold text-label-bold transition-colors">Libero</button>
                </div>
            </div>
        </div>
    );
};

export default PlayersHeader;