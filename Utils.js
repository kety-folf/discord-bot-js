const { MessageEmbed } = require("discord.js");
const { EmbedColors } = require("./Constants");
const config = require('./config.json');

/**
 * Represents a generic utility class containing helper methods.
 */
class Utils {
    constructor() {
        throw new Error("This class cannot be initialized.");
    }

    /**
     * Checks to see if an object exists.
     * @param {object} obj The object to check.
     * @returns {boolean}
     */
    static exists(obj) {
        return typeof obj == "undefined" || obj === null;
    }

    /**
     * Breaks any unsafe characters by appending a zero-width space after each one.
     * @param {string} text The text to break.
     * @returns {string}
     */
    static break(text) {
        const zeroWidthChar = String.fromCharCode(8203);

        if (text)
            return text
                .replace(/`/g, "`" + zeroWidthChar)
                .replace(/@/g, "@" + zeroWidthChar);
        else
            return text;
    }

    /**
     * Converts the specified text into Pascal case.
     * @param {string} text 
     * @example toPascalCase('hello') == 'Hello'
     * @returns {string}
     */
    static toPascalCase(text) {
        if (text)
        {
            var result = text.charAt(0).toUpperCase();

            if (text.length > 1)
                result += text.slice(1);

            return result;
        }

        return text;
    }

    /**
     * Gets a random number within the specified bounds.
     * @param {number} max The upper bound of this range.
     * @param {number} min The lower bound of this range.
     * @returns {number}
     */
    static getRandNum(max, min = 0) {
        const inclusive = min == 0 ? 0 : 1;
        return Math.floor(Math.random() * (max - min + (inclusive * 1))) + (inclusive * 1);
    }

    /**
     * Creates an embed preset.
     * @param {string} title The title of this embed.
     * @param {string} description The description of this embed.
     * @param {string} url The URL of this embed.
     * @param {string} imageUrl The image URL of this embed.
     * @returns {MessageEmbed}
     */
    static createEmbed(title = "", description = "", url = "", imageUrl = "") {
        var embed = new MessageEmbed().setColor(config.defaultColor || EmbedColors.Default);

        if (title)
            embed.setTitle(title);

        if (description)
            embed.setDescription(description);

        if (url)
            embed.setURL(url);

        if (imageUrl)
            embed.setImage(imageUrl);

        return embed;
    }

    /**
     * Sets the author of an embed to the specified user.
     * @param {MessageEmbed} embed The embed to set the author for.
     * @param {User} user The user that will represent the embed's author.
     * @returns {MessageEmbed}
     */
    static setAuthor(embed, user = null) {
        user = user || client.user;
        embed.setAuthor(user.username, user.avatarURL);
        return embed;
    }
}

module.exports = Utils;
