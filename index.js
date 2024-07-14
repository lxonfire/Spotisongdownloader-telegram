const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const express = require("express");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const port = process.env.PORT || 3000;
const { search } = require("@nechlophomeriaa/spotifydl");

const bot = new Telegraf("6986927046:AAEP_ZtyWYVLJgT8u7tNlsAWN18Bcp9heLU"); // Add here your bot token

let userState = {};

////////////////////// Start Command //////////////////////

bot.command("start", async (ctx) => {
  const welcomeMessage =
    '<b>Hello! I am Spotify Downloader Bot 🎶</b>\n\nI can download any song from Spotify and send it to you as an audio file.\n\nJust send me the Spotify song URL like this /download SONG_URL or use the /search command to search for a song and directly download it.\n⁉️ For more information use the /help command.\n\n🗑️ <i>Feel free to delete message to keep our chat clean and focused on music!</i>\n\n<b>🎵 Developed with ❤️ by @Abdul_Kioum</b>';

  const gifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9zeWpuNHNoOHViejMzcm5jZmcwZjVpeGFrdWlqbzlhYXFhd29vZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EFGXDUBXcUd131C0CR/giphy.gif";

  try {
    await ctx.replyWithAnimation(gifUrl, {
      caption: welcomeMessage,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Error sending welcome message:", error);
    await ctx.reply(welcomeMessage);
  }
});

bot.command("help", async (ctx) => {
  const helpMessage =
    "<b>⁉️ How to use?</b>\n\n<b>🔍 Search and download</b>\nYou can directly search and download from spotify by using /search command and selecting your song.\n\n<i>Example:\n</i><pre>/search daku</pre>\n\n<b>📩 Directly download by song URL</b>\nYou can directly download from spotify by using /download command.\n\n<i>Example:</i>\n<pre>/download https://open.spotify.com/track/71XxylHoSigwo354LSy5p6?si=fa0b9772252b4ca0</pre>\n\n🗑️ <i>Feel free to delete messages to keep our chat clean and focused on music!</i>\n\n<b>🎧Happy lisenting...</b>";

  await ctx.reply(helpMessage, {
    parse_mode: "HTML",
  });
});

////////////////////// Search Command //////////////////////

const getInlineKeyboard = (currentPage, totalPages, isSelected) => {
  const buttons = [];

  if (isSelected) {
    buttons.push(Markup.button.callback("⚙️ Processing...", "none"));
  } else {
    if (currentPage > 0) {
      buttons.push(
        Markup.button.callback("⬅️ Backward", `backward:${currentPage}`),
      );
    }

    buttons.push(
      Markup.button.callback(
        `🎧 Select (${currentPage + 1}/${totalPages + 1})`,
        `select:${currentPage}`,
      ),
    );

    if (currentPage < totalPages) {
      buttons.push(
        Markup.button.callback("➡️ Forward", `forward:${currentPage}`),
      );
    }
  }

  return Markup.inlineKeyboard([buttons]);
};

const updateMessage = async (
  ctx,
  searchResults,
  currentPage,
  isSelected = false,
) => {
  const track = searchResults[currentPage];
  const songName = track.name;
  const description = `Artist: ${track.artists[0].name} - Album: ${track.album.name}`;
  const image = track.album.images[1].url || "";
  const duration = `${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}`;
  const release = track.album.release_date || "";

  await ctx.editMessageText(
    `<b>Song:</b> ${songName}\n<b>Artist:</b> ${track.artists[0].name}\n<b>Album:</b> ${track.album.name}\n<b>Duration:</b> ${duration}\n<b>Release Date:</b> ${release}<a href="${track.album.images[0].url}">&#8205;</a>`,
    {
      parse_mode: "HTML",
      reply_markup: getInlineKeyboard(
        currentPage,
        searchResults.length - 1,
        isSelected,
      ).reply_markup,
    },
  );
};

bot.command("search", async (ctx) => {
  const query = ctx.message.text.split(" ").slice(1).join(" ");

  if (!query) {
    return ctx.reply("Please enter a valid query");
  }

  try {
    const searchTrack = await search(query, 10);
    let searchResults = searchTrack.items;

    if (searchResults.length === 0) {
      return ctx.reply("No results found");
    }

    const currentPage = 0;
    userState[ctx.from.id] = { searchResults, currentPage };

    const track = searchResults[currentPage];
    const songName = track.name;
    const description = `Artist: ${track.artists[0].name} - Album: ${track.album.name}`;
    const image = track.album.images[1].url || "";
    const duration = `${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}`;
    const release = track.album.release_date || "";

    await ctx.reply(
      `<b>Song:</b> ${songName}\n<b>Artist:</b> ${track.artists[0].name}\n<b>Album:</b> ${track.album.name}\n<b>Duration:</b> ${duration}\n<b>Release Date:</b> ${release}<a href="${track.album.images[0].url}">&#8205;</a>`,
      {
        parse_mode: "HTML",
        reply_markup: getInlineKeyboard(
          currentPage,
          searchResults.length - 1,
          false,
        ).reply_markup,
      },
    );
  } catch (error) {
    console.error(error);
    ctx.reply("Failed to search for tracks");
  }
});

bot.action(/^(forward|backward|select):(\d+)$/, async (ctx) => {
  const action = ctx.match[1];
  const currentPage = parseInt(ctx.match[2]);
  const userId = ctx.from.id;

  if (!userState[userId]) {
    return ctx.answerCbQuery("Session expired. Please search again.");
  }

  let { searchResults } = userState[userId];

  let newPage = currentPage;
  if (action === "forward") {
    newPage = Math.min(currentPage + 1, searchResults.length - 1);
  } else if (action === "backward") {
    newPage = Math.max(currentPage - 1, 0);
  }

  if (action === "select") {
    const selectedTrack = searchResults[currentPage];
    const spotifyUrl = selectedTrack.external_urls.spotify;
    userState[userId].selected = true;

    await updateMessage(ctx, searchResults, currentPage, true);
    await ctx.answerCbQuery("⬇️ Downloading, please wait...");

    try {
      const data = new FormData();
      data.append("url", spotifyUrl);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://spotisongdownloader.com/api/composer/spotify/swd.php",
        headers: {
          ...data.getHeaders(),
        },
        data: data,
      };

      const response = await axios.request(config);

      const downloadUrl = response.data.dlink;

      let songData = await axios.get(
        `https://spotifydownloaders.com/api/getSpotifyDetails?url=${spotifyUrl}`,
      );
      songData = songData.data;


      let songName = songData.tracks[0].name;
      let artistName = songData.tracks[0].artist;
      let albumArt = songData.preview.image;
      let songDuration = songData.tracks[0].duration / 1000;

      await ctx.telegram.sendChatAction(
        ctx.callbackQuery.from.id,
        "upload_audio",
      );

      try {
        await ctx.telegram.sendAudio(
          ctx.callbackQuery.from.id,
          {
            url: downloadUrl,
            filename: `${artistName} - ${songName}.mp3`,
            thumbnail: { url: albumArt, filename: "albumArt.jpg" },
          },
          {
            title: songName,
            performer: artistName,
            thumbnail: { url: albumArt, filename: "albumArt.jpg" },
            duration: songDuration,
          }
        );
      } catch (error) {
        await ctx.telegram.sendAudio(ctx.callbackQuery.from.id, { url: downloadUrl });
      }

      await ctx.deleteMessage();
    } catch (error) {
      console.error("Error processing download:", error);
      await ctx.telegram.sendMessage(
        ctx.callbackQuery.from.id,
        "Failed to download and send audio.",
      );
    }

    return;
  }

  userState[userId].currentPage = newPage;
  await updateMessage(ctx, searchResults, newPage);
});

////////////////////// Download Command //////////////////////

bot.command("download", async (ctx) => {
  const spotifyUrl = ctx.message.text.split(" ").slice(1).join(" ").trim();

  if (!spotifyUrl.startsWith("https://open.spotify.com/track/")) {
    const errorMessage = await ctx.reply(
      "❌ Please enter a valid Spotify song URL, starting with 'https://open.spotify.com/track/'.\n\n🗑️ This message will be automatically deleted in 10 seconds...",
    );

    setTimeout(async () => {
      try {
        await ctx.telegram.deleteMessage(ctx.chat.id, errorMessage.message_id);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }, 10000);

    return;
  }

  try {
    const processingMessage = await ctx.reply("⚙️ Processing...");

    const data = new FormData();
    data.append("url", spotifyUrl);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://spotisongdownloader.com/api/composer/spotify/swd.php",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(config);

    const downloadUrl = response.data.dlink;

    let songData = await axios.get(
      `https://spotifydownloaders.com/api/getSpotifyDetails?url=${spotifyUrl}`,
    );
    songData = songData.data;

    let songName = songData.tracks[0].name;
    let artistName = songData.tracks[0].artist;
    let albumArt = songData.preview.image;
    let songDuration = songData.tracks[0].duration / 1000;

    await ctx.telegram.sendChatAction(ctx.from.id, "upload_audio");

    try {
      await ctx.telegram.sendAudio(
        ctx.from.id,
        {
          url: downloadUrl,
          filename: `${artistName} - ${songName}.mp3`,
          thumbnail: { url: albumArt, filename: "albumArt.jpg" },
        },
        {
          title: songName,
          performer: artistName,
          thumbnail: { url: albumArt, filename: "albumArt.jpg" },
          duration: songDuration,
        },
      );
    } catch (error) {
      await ctx.telegram.sendAudio(ctx.callbackQuery.from.id, { url: downloadUrl });
    }

    await ctx.telegram.deleteMessage(ctx.from.id, processingMessage.message_id);
  } catch (error) {
    console.error("Error processing download:", error);
    await ctx.reply("Failed to download and send audio.");
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

bot.launch();

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

