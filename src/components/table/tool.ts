export const unixTimeToText = (uxtime: number, onlyday = false) => {
    const now = new Date(uxtime);
    let time = now.getFullYear()
        + ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1)
        + (now.getDate()<10?'0':'') + now.getDate();
    if(!onlyday) 
        time += "_"
            + now.getHours()
            + (now.getMinutes()<10?'0':'') + now.getMinutes()
            + (now.getSeconds()<10?'0':'') + now.getSeconds();
    return time;
}