export const secondsToReadableTime=(seconds) => {
    const h = Math.floor(seconds / 60 / 60 );
   
    const m = Math.floor(seconds / 60) - h * 60;

    const s = Math.floor(seconds % 60 );

    const formatNumber = (v) => `0${Number.parseInt(v,10)}`.slice(-2);
    const readbleTime = [h,m,s].map(formatNumber).join(':');

    return readbleTime;

}