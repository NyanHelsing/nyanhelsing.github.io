export class RateLimitedTaskExecutor {

    taskQueue = [];
    running = false;

    constructor(rateLimitPerSecond) {
        this.rateLimitPerSecond = rateLimitPerSecond;
        this.running = false;
    }

    get interval() {
        if (this.taskQueue.length > 1) {
            return 1000 / this.rateLimitPerSecond;
        }
        return 0;
    }
        
    // Adds a task to the queue
    exec(taskFunction, immediate = false) {
        return new Promise((resolve, reject) => {
            this.taskQueue[immediate ? 'unshift' : 'push']({
                taskFunction,
                resolve,
                reject,
            });
            this.ensureRunning();
        });
    }

    // Ensures the task executor is running
    ensureRunning() {
        if (this.running) return;
        this.running = true;
        this.executeNextTask();
    }

    // Executes the next task from the queue
    async executeNextTask() {
        if (this.taskQueue.length === 0) {
            this.running = false;
            return;
        }

        // Schedule the next task execution after the rate limit interval
        setTimeout(() => this.executeNextTask(), this.interval);

        const { taskFunction, resolve, reject } = this.taskQueue.shift();

        try {
            const result = await taskFunction();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }
}
