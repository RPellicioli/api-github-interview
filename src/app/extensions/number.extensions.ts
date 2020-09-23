interface Number {
    pad(size: number): string;
}

Number.prototype.pad = function(size: number): string {
    let s = String(this);
    while (s.length < (size || 2)) {
        s = ('0' + s);
    }
    return s;
}
