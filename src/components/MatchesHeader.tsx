import { Link } from 'react-router-dom';


function MatchesHeader() {
    return (
        <div>
            <div className="flex justify-between items-center mb-xl">
                <h1 className="font-headline-lg text-headline-lg font-bold text-primary">Matches &amp; Schedule</h1>
                <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-sm px-lg rounded-lg flex items-center gap-xs hover:bg-secondary transition-colors border-b-2 border-secondary-fixed">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add New Match
                </button>
            </div>
            <div className="flex gap-sm mb-lg border-b border-outline-variant pb-sm">
                <button className="px-md py-sm rounded-lg font-label-bold bg-primary text-on-primary">All Matches</button>
                <button className="px-md py-sm rounded-lg font-label-bold text-on-surface-variant hover:bg-surface-container">Upcoming</button>
                <button className="px-md py-sm rounded-lg font-label-bold text-on-surface-variant hover:bg-surface-container">Past</button>
            </div>
        </div>
    );
}

export default MatchesHeader;