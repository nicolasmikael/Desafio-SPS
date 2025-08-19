const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const TEMP_FILE = path.join(DATA_DIR, "users.json.tmp");

class Persistence {
  async ensureDataDirectory() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
      console.error("Error creating data directory:", error);
    }
  }

  async loadData() {
    try {
      await this.ensureDataDirectory();

      const data = await fs.readFile(USERS_FILE, "utf8");
      const parsed = JSON.parse(data);

      // Validate the structure
      if (!parsed.nextId || !Array.isArray(parsed.users)) {
        throw new Error("Invalid data structure");
      }

      // Convert users array to Map with proper date objects
      const usersMap = new Map();
      parsed.users.forEach((user) => {
        usersMap.set(user.id, {
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        });
      });

      if (process.env.NODE_ENV !== "test") {
        console.log(
          `Loaded ${parsed.users.length} users from persistent storage`
        );
      }
      return {
        users: usersMap,
        nextId: parsed.nextId,
      };
    } catch (error) {
      if (error.code === "ENOENT") {
        if (process.env.NODE_ENV !== "test") {
          console.log("No persistent data found, starting with empty database");
        }
      } else {
        console.error("Error loading persistent data:", error.message);
        if (process.env.NODE_ENV !== "test") {
          console.log("Starting with empty database");
        }
      }

      return {
        users: new Map(),
        nextId: 1,
      };
    }
  }

  async saveData(usersMap, nextId) {
    try {
      await this.ensureDataDirectory();

      // Convert Map to array for JSON serialization
      const usersArray = Array.from(usersMap.values());

      const data = {
        nextId,
        users: usersArray,
        lastSaved: new Date().toISOString(),
      };

      // Atomic write: write to temp file then rename
      await fs.writeFile(TEMP_FILE, JSON.stringify(data, null, 2), "utf8");
      await fs.rename(TEMP_FILE, USERS_FILE);

      if (process.env.NODE_ENV !== "test") {
        console.log(`Saved ${usersArray.length} users to persistent storage`);
      }
    } catch (error) {
      console.error("Error saving data to persistent storage:", error);
      // Don't throw - let the operation continue in memory
    }
  }

  async resetData() {
    try {
      await fs.unlink(USERS_FILE);
      if (process.env.NODE_ENV !== "test") {
        console.log("Persistent data reset successfully");
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Error resetting persistent data:", error);
      }
    }
  }
}

module.exports = new Persistence();
