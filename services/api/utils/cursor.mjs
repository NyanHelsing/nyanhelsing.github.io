export const cursor = (generatorFunction) => {
    const generator = generatorFunction();
    let buffer = []; // Buffer to store values for peek and take
    let done = false; // Track if the generator is done

    function refillBuffer() {
        if (!done && buffer.length === 0) {
            let { value, done: generatorDone } = generator.next();
            done = generatorDone;
            if (!done) {
                buffer.push(value);
            }
        }
    }

    return {
        next() {
            refillBuffer(); // Ensure buffer has the next value if available
            if (buffer.length > 0) {
                return { value: buffer.shift(), done: false };
            } else {
                return { done: true };
            }
        },
        peek() {
            refillBuffer(); // Ensure buffer is filled for peeking
            return buffer[0]; // Return the next value without removing it from the buffer
        },
        take(n) {
            let taken = [];
            for (let i = 0; i < n; i++) {
                refillBuffer();
                if (buffer.length === 0) break; // Stop if there are no more items
                taken.push(buffer.shift()); // Take the next item from the buffer
            }
            return taken;
        },
        [Symbol.iterator]() {
            return this;
        }
    };
};
