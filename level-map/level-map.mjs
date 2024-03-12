import { Level } from "level";

const currentDir = process.cwd();
const defaultDbPath = `${currentDir}/data/default`;

export class LevelMap {
    static levels = new Map(); // Set of all Level instances

    constructor(sublevelName = null, dbPath = defaultDbPath) {
        if (!LevelMap.levels.has(dbPath)) {
            // Initialize LevelDB if not already done
            LevelMap.levels.set(
                dbPath,
                new Level(dbPath, { valueEncoding: "json" })
            );
        }
        if (sublevelName === null) {
            // Access the top level
            this.db = LevelMap.levels.get(dbPath);
        } else {
            // Access or create a sublevel
            this.db = LevelMap.levels.get(dbPath).sublevel(sublevelName, {
                valueEncoding: "json"
            });
        }
    }

    async set(key, value) {
        // the value might have properties that are not serializable
        // so we need to change those to serializable values
        // before we store them in the database

        const serializableValue = JSON.stringify(value, (key, value) => {
            if (value instanceof LevelEntry) {
                return {
                    _lorm: "LevelEntry",
                    dbPath: value.db.location,
                    sublevelName: value.db.prefix,
                    key
                }
            }

            if (value instanceof LevelMap) {
                return {
                    _lorm: "LevelMap",
                    dbPath: value.db.location,
                    sublevelName: value.db.prefix
                }
            }

            if (value instanceof Map) {
                return {
                    _lorm: "Map",
                    entries: Array.from(value)


            if (value instanceof Set) {
                return {
                    _lorm: "Set",
                    values: Array.from(value)
                }
            }
        });
        try {
            await this.db.put(key, value);
            return true;
        } catch (error) {
            console.error("Set operation failed:", error);
            return false;
        }
    }

    async get(key) {
        try {
            const value = await this.db.get(key);
            return value;
        } catch (error) {
            if (error.type === "NotFoundError") {
                // Key not found
                return undefined;
            }
            console.error("Get operation failed:", error);
            return undefined;
        }
    }

    async delete(key) {
        try {
            await this.db.del(key);
            return true;
        } catch (error) {
            console.error("Delete operation failed:", error);
            return false;
        }
    }

    async clear() {
        try {
            for await (const { key } of this.db.iterator({
                keys: true,
                values: false
            })) {
                await this.db.del(key);
            }
            return true;
        } catch (error) {
            console.error("Clear operation failed:", error);
            return false;
        }
    }
}

module.exports = LevelMap;
