interface Date {
    addMilliseconds(milliseconds: number): Date;
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;
}

Date.prototype.addMilliseconds = function(milliseconds: number): Date {
    const date = new Date(this.valueOf());
    date.setMilliseconds(date.getMilliseconds() + milliseconds);
    return date;
}

Date.prototype.addSeconds = function(seconds: number): Date {
    const date = new Date(this.valueOf());
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}

Date.prototype.addMinutes = function(minutes: number): Date {
    const date = new Date(this.valueOf());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

Date.prototype.addHours = function(hours: number): Date {
    const date = new Date(this.valueOf());
    date.setHours(date.getHours() + hours);
    return date;
}

Date.prototype.addDays = function(days: number): Date {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMonths = function(months: number): Date {
    const date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
}

Date.prototype.addYears = function(years: number): Date {
    const date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return date;
}

