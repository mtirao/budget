import { Link } from 'react-router-dom';


function TopNavbar() {
    return (
        <header className="hidden md:flex bg-surface text-primary border-b border-outline-variant sticky top-0 z-40 justify-between items-center ml-64 px-xl py-md w-[calc(100%-16rem)]">
        <div>
          <span className="font-headline-md text-headline-md font-bold text-primary">
            Dashboard
          </span>
        </div>
        <div className="flex items-center gap-lg">
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJP6KDyV4Bq6JNaQ_IxFJeMrEk3xSSTmSrZwMvkyJNyStAP3ZcciFMObZrNhO4prQqFPh5OfKLUEu2dttUmLCcPKhHkWM_Tue9OFgC51-ANuMYnQIiczMNdOxkwHKkJnF-OGEsY6Dfg3nsqxdxDb1GMTiOaIZ3fUgN0_Lq0yVGVRvi_zp4zYCluc9DYbcEmVVaIdPGbbPbBIdZSxZhxXU5F1Jq3TuHBXpkdrLDNLgJazQE7PX9FQkLTQ"
          />
          <button className="bg-secondary-container text-on-secondary-container font-label-bold text-label-bold py-xs px-sm rounded-lg hover:bg-secondary transition-colors border-b-2 border-secondary-fixed">
            Add Match
          </button>
        </div>
      </header>
    );

};

export default TopNavbar;