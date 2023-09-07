const consoleProxy = new Proxy(console, {
    get: (target, property) => {
        return (...args) => {
            const timestamp = new Date();
            target[property](`${timestamp.toISOString()} | `, ...args)
        }
    }
})

consoleProxy.group('Hallo! I`m Steven',343434)