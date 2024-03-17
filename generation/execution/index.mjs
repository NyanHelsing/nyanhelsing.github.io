export class RateLimitedTaskExecutor {
    constructor(rateLimitPerSecond) {
        this.rateLimitPerSecond = rateLimitPerSecond;
        this.taskQueue = [];
        this.running = false;
    }

    // Adds a task to the queue
    exec(taskFunction, immediate = false) {
        return new Promise((resolve, reject) => {
            this.taskQueue[
                immediate ? "unshift" : "push"
            ]({
                taskFunction,
                resolve,
                reject,
            });
            if (!this.running) {
                this.running = true;
                this.executeTasks();
            }
        });
    }

    // Executes tasks from the queue at the rate limit
    async executeTasks() {
        const interval = 1000 / this.rateLimitPerSecond;
        while (this.taskQueue.length > 0) {
            const { taskFunction, resolve, reject } = this.taskQueue.shift();
            try {
                const startTime = Date.now();
                const result = await taskFunction();
                resolve(result);
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                const sleepTime = interval - timeTaken;
                if (sleepTime > 0) {
                    await new Promise((r) => setTimeout(r, sleepTime));
                }
            } catch (error) {
                reject(error);
            }
        }
        this.running = false;
    }
}
