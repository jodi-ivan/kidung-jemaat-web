import React, { useEffect, useRef } from 'react'

class Song  {
    public hymnNo: number;
    public variant: string;
    public verse: number;
    public focus: boolean;
    public gregorian: boolean;

    constructor(hymnNo: number);
    constructor(hymnNo: number, variant: string);
    constructor(hymnNo: number, variant: string, verse: number);
    constructor(hymnNo: number, variant: string, verse: number, focus: boolean);

    /**
     * --------------------------------------------------------------
     */

    constructor(hymnNo: number, variant: string = "", verse: number = 0, focus: boolean = false, gregorian : boolean = true) {
        this.hymnNo = hymnNo;
        this.variant = variant;
        this.verse = verse;
        this.focus = focus;
        this.gregorian = gregorian; 
    }

    getURL(): string {
        const params: string[] = [];
        if (this.verse > 1) {
            params.push(`verse=${this.verse}`);
        }
        if (this.focus) {
            params.push(`focus=true`);
        }

        const queryString = params.length > 0 ? `?${params.join('&')}` : '';
        return `${this.hymnNo}${this.variant}${queryString}`;
    }

}
export default Song
