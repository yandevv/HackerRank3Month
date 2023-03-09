'use strict';

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
    main(inputLines);
});

function readLine(): string {
    return inputLines[currentLine++];
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function decapitalize(word: string): string {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

function isCharUpperCase(char: string): boolean {
    return /[A-Z]/.test(char);
}

function main(input: string[]) {
    let output: string[] = [];

    for(let i: number = 0; i < input.length; i++) {        
        let word = input[i].slice(4)
        
        if(input[i].slice(0, 1) == "S") { // Case First Command is Split
            let splittedLetters: string[] = word.split('');
            let lastIndex: number = 0;
            let newWord: string = '';
            
            switch (input[i].slice(2, 3)) {
                case "M": //Method
                    for(let j: number = 0; j <= splittedLetters.length; j++) {
                        if(j != 0 && isCharUpperCase(splittedLetters[j]) || j == splittedLetters.length) {                           if(lastIndex != 0) {
                                newWord = newWord + ' ' + decapitalize(word.slice(lastIndex, j))
                            } else {
                                newWord = newWord + decapitalize(word.slice(lastIndex, j))
                            }
                            lastIndex = j;
                        }
                    }     
                                   
                    output.push(newWord);
                break;                
                case "C": //Class
                    for(let j: number = 0; j <= splittedLetters.length; j++) {
                        if(j != 0 && isCharUpperCase(splittedLetters[j]) || j == splittedLetters.length) {                           if(lastIndex != 0) {
                                newWord = newWord + ' ' + decapitalize(word.slice(lastIndex, j))
                            } else {
                                newWord = newWord + decapitalize(word.slice(lastIndex, j))
                            }
                            lastIndex = j;
                        }                        
                    }  
                    
                    output.push(newWord);
                break;
                case "V": //Variable
                    for(let j: number = 0; j <= splittedLetters.length; j++) {
                        if(j != 0 && isCharUpperCase(splittedLetters[j]) || j == splittedLetters.length) {                           if(lastIndex != 0) {
                                newWord = newWord + ' ' + decapitalize(word.slice(lastIndex, j))
                            } else {
                                newWord = newWord + decapitalize(word.slice(lastIndex, j))
                            }
                            lastIndex = j;
                        }                        
                    }
                    
                    output.push(newWord);
                break;
            }
        } else{ //Case First Command is Combine
            let splittedWords: string[] = word.split(' ');
            
            switch (input[i].slice(2, 3)) {
                case "M": //Method
                    word = '';
                    
                    for(let j: number = 0; j < splittedWords.length; j++) { //Capitalizing Words
                        if(j != 0) {                            
                            splittedWords[j] = capitalize(splittedWords[j]);
                        }
                        
                        word = word + splittedWords[j];
                    }                    
                    
                    word = word + "()"
                    
                    output.push(word);
                break;
                case "C": //Class
                    word = '';
                    
                    for(let j in splittedWords) {
                        splittedWords[j] = capitalize(splittedWords[j]);
                        
                        word = word + splittedWords[j];
                    }
                    
                    output.push(word);
                break;
                case "V": //Variable
                    word = '';
                    
                    for(let j: number = 0; j< splittedWords.length; j++) {
                        if(j != 0){                            
                            splittedWords[j] = capitalize(splittedWords[j]);
                        }
                        
                        word = word + splittedWords[j];
                    }
                    
                    output.push(word);
                break;
            }
        }
    }
    
    output.map((x) => console.log(x));
}