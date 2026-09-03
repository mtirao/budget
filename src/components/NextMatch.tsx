import { Link } from 'react-router-dom';


function NextMatch() {
    return (
        <section className="bg-primary-container text-on-primary-container rounded-xl p-lg card-shadow relative overflow-hidden flex items-center justify-between">    
            <div className="relative z-10">
            <p className="font-label-bold text-label-bold text-secondary-fixed mb-xs uppercase">
                Next Match
            </p>
            <h3 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                vs. Thunder Spikes
            </h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim mt-sm">
                Saturday, Oct 28 • 14:00 PM • City Arena
            </p>
            </div>
            <div className="relative z-10 hidden md:block">
            <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-sm px-lg rounded-lg border-b-2 border-secondary hover:bg-secondary transition-colors">
                View Details
            </button>
            </div>
        </section>
    );
};

export default NextMatch;