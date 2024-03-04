'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'pageCount' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER p
 */

function pageCount(n: number, p: number): number {
    let pagesSeparation: number[][] = [];
    let pageIndex: number;

    if(p === n || p === 1) {
        return 0;
    }
    
    for(let i: number = 0; i <= n; i = i + 2) {
        pagesSeparation.push([i, i+1]);
        if (i === p || i + 1 === p) {
            pageIndex = pagesSeparation.length - 1;
        }
    }
    
    return pageIndex! >= pagesSeparation.length / 2 ? (pagesSeparation.length - 1) - pageIndex! : pageIndex!;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const p: number = parseInt(readLine().trim(), 10);

    const result: number = pageCount(n, p);

    ws.write(result + '\n');

    ws.end();
}
