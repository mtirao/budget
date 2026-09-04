export function WinBadge() {
    return (
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-high text-primary font-label-bold text-[12px]">WIN</span>
    );

}

export function LossBadge() {
    return (
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-on-error-container font-label-bold text-[12px]">LOSS</span>
    );
}

export function UpcomingBadge() {
    return (
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-bold text-[12px]">UPCOMING</span>
    );
}