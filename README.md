# Kety Folf's Discord Bot
Bot Made by:
- Kety_the_folf#0001
- AbnerSquared

---

# Hosted on an AWS Server
bot invite: https://top.gg/bot/425138772221362176

---

# Setup
1. Run `update.bat`. This will automatically attempt to install all of the required files.
2. Create `config.json` in the same location as `index.js`.
The `config.json` must contain the following:
```
{
    "token": "DISCORD_TOKEN_KEY", // This is the token that is used to log in as the bot
    "prefix": "PREFIX", // This represents the prefix that the bot will listen to
    "devId": "DEV_ID", // This represents the Discord ID to be marked as a developer
    "commandPath": "COMMAND_PATH", // This defines where the command files are stored
    "debug": false // This  determines if specific things are to be logged on the console
}
```

3. Once everything is set up, you can now launch the bot using `run.bat`.
