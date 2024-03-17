import { persistedSystemMessages } from './persistence.mjs';

export class SystemMessage {
    static systemMessages = new Map();
    static keys = new Set(
        persistedSystemMessages.keys().all()
    );

    static get(key) {
        if (!SystemMessage.keys.has(key)) {
            throw new Error('Unknown key');
        }
        if (SystemMessage.systemMessages.has(key)) {
            return SystemMessage.systemMessages.get(key);
        }
        return new SystemMessage(key, persistedSystemMessages.get(key));
    }

    static create(key, message) {
        if (this.keys.has(key)) {
            SystemMessage.get(key)
        }

        const systemMessage = new SystemMessage(key, message);
        systemMessage.save();
        return systemMessage;
    }

    constructor(key, messages) {
        this.key = key;
        this.messages = persistedSystemMessages.get(key);
        if (!Array.isArray(this.messages)) {
            throw new Error('Invalid messages');
        }
    }

    at(index) {
        return this.messages.at(index);
    }

    latest() {
        return this.at(-1);
    }

    add(message) {
        this.messages.push(message);
        this.save();
    }
    
    save() {
        persistedSystemMessages.put(this.key, [...this.messages.values()]);
    }
}
