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
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */

function maximumPerimeterTriangle(sticks: number[]): number[] {
    let biggestTriangle: number[] = [-1, -1, -1];

    sticks.sort((a, b) => b - a);
    
    for(let i: number = 0; i < sticks.length; i++) {
        for(let j: number = 0; j < sticks.length; j++) {
            for(let h: number = 0; h < sticks.length; h++) {
                const differentIndexes: boolean = i !== j && i !== h && j !== h;
                if (!differentIndexes) continue;

                let sortedSticks: number[] = [sticks[i], sticks[j], sticks[h]];
                sortedSticks.sort((a, b) => a - b);
                const isDegenerative: boolean = (sortedSticks[0] + sortedSticks[1]) <= sortedSticks[2];
                
                if(!isDegenerative) {
                    biggestTriangle[0] = sortedSticks[0];
                    biggestTriangle[1] = sortedSticks[1];
                    biggestTriangle[2] = sortedSticks[2];
                    return biggestTriangle;
                }
            }
        }
    }
    
    return biggestTriangle[0] === -1 ? [-1] : biggestTriangle;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const sticks: number[] = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result: number[] = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
