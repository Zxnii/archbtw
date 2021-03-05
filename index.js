const Scratch = require("scratch-site-api")
const fs = require("fs/promises")

const client = new Scratch.User()
const users = require("./users.json")
const config = require("./config.json")

let truth = require("./truth.json")

const messages = [
    "i use arch btw",
    "you should try arch btw!",
    "arch linux > ubuntu, try it out!",
    "i use arch btw, you should try it too!",
    "did you know arch linux only requires 128mb of ram?",
    "windows is spyware and bloated, try the lightweight linux distibution called arch!",
    "try out arch linux at https://archlinux.org/",
    "also try manjaro!"
]

const main = async () => {
    await client.login(config.username, config.password)
    const messages = await client.messages.getCount()

    console.log(`I have ${JSON.parse(messages.body).count} unread messages`)

    comment(users[Math.floor(Math.random() * users.length)])
}

const comment = async (user) => {
    const message = messages[Math.floor(Math.random()*messages.length)]
    await client.comments.commentOnUser(message, user)
    truth++
    await client.profile.setStatus(`i am the prophet of the linux gods sent to spread the truth, so far i have spread the truth to ${truth} people.`)
    console.log(`Commented on ${user}`)
    fs.appendFile("./log.txt", `[${new Date().toISOString()}] Commented on ${user} with comment ${message}\n`)
    fs.writeFile("./truth.json", JSON.stringify(truth))
    setTimeout(() => {
        comment(users[Math.floor(Math.random() * users.length)])
    }, (60000) + (Math.random() * 2) * 60000)
}

main()