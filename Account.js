const db = require("quick.db");

/** 
 * Represents a generic user account.
 */
class Account
{
	constructor(userId, balance) {
		this.userId = userId;
		this.balance = balance;
		this.updated = false;
		this.endpoints = { bal: ".bal" };
	}

	/**
	 * Takes money from this account.
	 * @param {number} amount The amount to take.
	 */
	take(amount) {
		this.balance -= amount;
		this.updated = true;

		return this;
	}

    /**
	 * Gives money to this account.
	 * @param {number} amount The amount to take.
	 */
	give(amount) {
		this.balance += amount;
		this.updated = true;

		return this;
	}
    
    /**
     * Synchronizes this account to the database.
     */
	sync() {
		if (this.updated)
			db.set(this.userId + this.endpoints.bal, this.balance);
	}
}

module.exports = Account;
