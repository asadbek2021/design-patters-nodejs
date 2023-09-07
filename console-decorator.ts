const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";


interface EnhancedConsole extends Console {
    yellow(...params: any[]): void;
    green(...params: any[]): void;
    red(...params: any[]): void
}

function enhanceConsole(console: Console): EnhancedConsole {

    const extraFuncs = {
        yellow: (...params) => console.log(FgYellow, ...params),
        green: (...params) => console.log(FgGreen, ...params),
        red: (...params) => console.log(FgRed, ...params),
    }
    const enhancedConsole = Object.assign(console, extraFuncs);

    return enhancedConsole;
}

const enhancedCon = enhanceConsole(console);

enhancedCon.yellow('Hallo! Yellow Steven');
enhancedCon.green('Hallo! Green Steven');
enhancedCon.red('Hallo! Red Steven');


export {}