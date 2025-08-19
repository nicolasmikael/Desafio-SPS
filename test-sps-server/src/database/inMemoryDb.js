const bcrypt = require("bcryptjs");
const persistence = require("./persistence");

class InMemoryDatabase {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
    this.initialized = false;
    this.init();
  }

  async init() {
    try {
      const { users, nextId } = await persistence.loadData();
      this.users = users;
      this.nextId = nextId;

      if (this.users.size === 0) {
        await this.initializeAdminUser();
      }

      this.initialized = true;
      if (process.env.NODE_ENV !== "test") {
        console.log(`Database initialized with ${this.users.size} users`);
      }
    } catch (error) {
      console.error("Error initializing database:", error);

      await this.initializeAdminUser();
      this.initialized = true;
    }
  }

  async initializeAdminUser() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = {
      id: this.nextId++,
      email: "admin@admin.com",
      name: "Administrator",
      type: "admin",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    await this.saveToFile();
  }

  async saveToFile() {
    try {
      await persistence.saveData(this.users, this.nextId);
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }

  async waitForInitialization() {
    while (!this.initialized) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  async createUser(userData) {
    await this.waitForInitialization();

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      id: this.nextId++,
      email: userData.email,
      name: userData.name,
      type: userData.type || "standard",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);

    await this.saveToFile();

    return this.getUserWithoutPassword(user);
  }

  getAllUsers() {
    return Array.from(this.users.values()).map((user) =>
      this.getUserWithoutPassword(user)
    );
  }

  getUserById(id) {
    const user = this.users.get(parseInt(id));
    return user ? this.getUserWithoutPassword(user) : null;
  }

  getUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async updateUser(id, userData) {
    await this.waitForInitialization();

    const user = this.users.get(parseInt(id));
    if (!user) return null;

    const updatedUser = {
      ...user,
      name: userData.name || user.name,
      email: userData.email || user.email,
      type: userData.type || user.type,
      updatedAt: new Date(),
    };

    if (userData.password) {
      updatedUser.password = await bcrypt.hash(userData.password, 10);
    }

    this.users.set(parseInt(id), updatedUser);

    await this.saveToFile();

    return this.getUserWithoutPassword(updatedUser);
  }

  async deleteUser(id) {
    await this.waitForInitialization();

    const user = this.users.get(parseInt(id));
    if (!user) return false;

    this.users.delete(parseInt(id));

    await this.saveToFile();

    return true;
  }

  emailExists(email, excludeId = null) {
    for (const user of this.users.values()) {
      if (user.email === email && user.id !== excludeId) {
        return true;
      }
    }
    return false;
  }

  getUserWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

const database = new InMemoryDatabase();

module.exports = database;
