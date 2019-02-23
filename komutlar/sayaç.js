const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
						.setDescription(` Belirttiðin Sayý Çok Küçük Veya O Sayýya Zaten Ulaþmýþsýn :shrug:
                        Örnek Kullaným : 
                        >sayaç <Sayý> #kanal `)
			.setColor("RED")
			.setTimestamp()
		message.channel.send({embed})
		return
  }
  
	let profil = JSON.parse(fs.readFileSync("sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const s1 = new Discord.RichEmbed()
			.setDescription(` Belirttiðin Sayý Çok Küçük Veya O Sayýya Zaten Ulaþmýþsýn <a:hata:531015060047396875>
                        Örnek Kullaným : 
                        s!sayaç <Sayý> #kanal `)
  .setColor("RED")
			.setTimestamp()
  if (!mentionedChannel && args[0] !== "sýfýrla") return message.channel.send(s1);


	if(args[0] === "sýfýrla") {
		if(!profil[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Ayarlanmayan þeyi sýfýrlayamazsýn!`)
				.setColor("RANDOM")
				.setTimestamp()
			message.channel.send({embed})
			return
		}
		delete profil[message.guild.id]
		fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Sayaç baþarýyla sýfýrlandý!`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(isNaN(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(` Belirttiðin Sayý Çok Küçük Veya O Sayýya Zaten Ulaþmýþsýn :shrug:
                        Örnek Kullaným : 
                        >sayaç <Sayý> #kanal `)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(args[0] <= message.guild.memberCount) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Belirttiðin Sayý Çok Küçük [${message.guild.memberCount}]  Veya O Sayýya Zaten Ulaþmýþsýn :shrug:`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(!profil[message.guild.id]){
		profil[message.guild.id] = {
			sayi: args[0],
      kanal: mentionedChannel.id
		};
	}
	
	profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].kanal = mentionedChannel.id
	
	fs.writeFile("sayac.json", JSON.stringify(profil), (err) => {
		console.log(err)
	})

	const embed = new Discord.RichEmbed()
		.setDescription(`---------DQ-AT-Sayaç--------- 
                     ¦> :white_check_mark:   Sayaç Aktif Edildi 
                     ¦> :white_check_mark:   \`${args[0]}\` Olarak Güncelledim!  
                     ¦> :white_check_mark:   Sayaç ${mentionedChannel} Olarak Güncelledim! 
                     L--------------------`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayacayarla', 'sayac', 'sayaç'],
	permLevel: 2
}

exports.help = {
	name: 'sayaç',
	description: 'Sayacý ayarlar.',
	usage: 'sayaç [sayý/sýfýrla] [kanal]'
}