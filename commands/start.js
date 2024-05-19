module.exports = {
    name: "start",
    execute: async (client, msg,chat) =>{
      client.sendMessage(chat, "start bot")
    }
}