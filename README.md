# HackWeekBot
A proof of concept voice channel moderator (didn't finish since we started Thursday evening)

The Voice Mod Bot is meant to join a voice channel with other users when prompted to keep track of user speech. The bot is integrated with IBM Watson AI's Speech to Text functionality, which allows it to convert the audio from users into text. In the future, the text could be parsed for keywords as bot commands, and could also evaluate the wholesomeness (for lack of a better word) of the dialogue.

The bot could run the dialogue transcript through the Perspective API's Machine Learning model to estimate its level of toxicity and, if past a certain threshold, could report the user and said dialogue to moderators.
