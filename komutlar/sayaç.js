const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')

exports.run = async (client, message, args) => {
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
						.setDescription(` Belirtti�in Say� �ok K���k Veya O Say�ya Zaten Ula�m��s�n :shrug:
                        �rnek Kullan�m : 
                        >saya� <Say�> #kanal `)
			.setColor("RED")
			.setTimestamp()
		message.channel.send({embed})
		return
  }
  
	let profil = JSON.parse(fs.readFileSync("sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const s1 = new Discord.RichEmbed()
			.setDescription(` Belirtti�in Say� �ok K���k Veya O Say�ya Zaten Ula�m��s�n <a:hata:531015060047396875>
                        �rnek Kullan�m : 
                        s!saya� <Say�> #kanal `)
  .setColor("RED")
			.setTimestamp()
  if (!mentionedChannel && args[0] !== "s�f�rla") return message.channel.send(s1);


	if(args[0] === "s�f�rla") {
		if(!profil[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Ayarlanmayan �eyi s�f�rlayamazs�n!`)
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
			.setDescription(`Saya� ba�ar�yla s�f�rland�!`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(isNaN(args[0])) {
		const embed = new Discord.RichEmbed()
			.setDescription(` Belirtti�in Say� �ok K���k Veya O Say�ya Zaten Ula�m��s�n :shrug:
                        �rnek Kullan�m : 
                        >saya� <Say�> #kanal `)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}

	if(args[0] <= message.guild.memberCount) {
		const embed = new Discord.RichEmbed()
			.setDescription(`Belirtti�in Say� �ok K���k [${message.guild.memberCount}]  Veya O Say�ya Zaten Ula�m��s�n :shrug:`)
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
		.setDescription(`---------DQ-AT-Saya�--------- 
                     �> :white_check_mark:   Saya� Aktif Edildi 
                     �> :white_check_mark:   \`${args[0]}\` Olarak G�ncelledim!  
                     �> :white_check_mark:   Saya� ${mentionedChannel} Olarak G�ncelledim! 
                     L--------------------`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayacayarla', 'sayac', 'saya�'],
	permLevel: 2
}

exports.help = {
	name: 'saya�',
	description: 'Sayac� ayarlar.',
	usage: 'saya� [say�/s�f�rla] [kanal]'
}