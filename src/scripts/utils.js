export function Delay(fn, time = 1000) {
    let timeOutId;
    const delaiedFn = (event) => {
        if (!timeOutId) {
            timeOutId = setTimeout(() => {
                timeOutId = undefined;
                fn(event);
            }, time);
        }
    }
    return delaiedFn;
}


