import discord
from discord.ext import commands
from discord import app_commands
import os
import secrets
import string
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI          = os.getenv("MONGO_URI")
DISCORD_TOKEN      = os.getenv("DISCORD_TOKEN")
PREMIUM_ROLE_ID    = int(os.getenv("DISCORD_PREMIUM_ROLE_ID"))
DEV_ROLE_ID        = int(os.getenv("DISCORD_DEV_ROLE_ID"))
GUILD_ID           = int(os.getenv("DISCORD_GUILD_ID"))
WELCOME_CHANNEL_ID = int(os.getenv("DISCORD_WELCOME_CHANNEL_ID"))
REDEEM_CHANNEL_ID  = int(os.getenv("DISCORD_REDEEM_CHANNEL_ID"))

COOLDOWN_DAYS = 3

client         = MongoClient(MONGO_URI)
db             = client["footcard_gacha"]
premium_tokens = db["premium_tokens"]

intents                 = discord.Intents.default()
intents.members         = True
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

def generate_token(length=16):
    chars = string.ascii_uppercase + string.digits
    return "FCG-" + "".join(secrets.choice(chars) for _ in range(length))

@bot.event
async def on_ready():
    print(f"Bot {bot.user} siap!")
    try:
        guild  = discord.Object(id=GUILD_ID)
        synced = await bot.tree.sync(guild=guild)
        print(f"{len(synced)} command berhasil disync")
    except Exception as e:
        print(f"Error sync: {e}")

@bot.event
async def on_member_join(member: discord.Member):
    channel = bot.get_channel(WELCOME_CHANNEL_ID)
    if channel is None:
        return
    await channel.send(
        f"👋 Selamat datang di **FootCard Gacha Community**, {member.mention}!\n"
        f"⚽ Yuk cek channel <#{REDEEM_CHANNEL_ID}> buat ambil token redeem premium kamu."
    )

@bot.tree.command(
    name="gettoken",
    description="Dapatkan token redeem FootCard Gacha kamu",
    guild=discord.Object(id=GUILD_ID)
)
async def gettoken(interaction: discord.Interaction):
    if interaction.channel_id != REDEEM_CHANNEL_ID:
        await interaction.response.send_message(
            f"❌ Command ini cuma bisa dipakai di <#{REDEEM_CHANNEL_ID}>!",
            ephemeral=True
        )
        return

    member      = interaction.user
    guild       = bot.get_guild(GUILD_ID)
    member_full = guild.get_member(member.id)

    role = discord.utils.get(member_full.roles, id=PREMIUM_ROLE_ID)
    if not role:
        await interaction.response.send_message(
            "❌ Kamu belum punya role **Premium Member**!\nHubungi admin untuk berlangganan.",
            ephemeral=True
        )
        return

    is_dev = discord.utils.get(member_full.roles, id=DEV_ROLE_ID) is not None

    # ── Cooldown 3 hari, kecuali Dev ──
    if not is_dev:
        last_token = premium_tokens.find_one(
            { "discordId": str(member.id) },
            sort=[("createdAt", -1)]
        )
        if last_token:
            elapsed = datetime.utcnow() - last_token["createdAt"]
            if elapsed < timedelta(days=COOLDOWN_DAYS):
                remaining   = timedelta(days=COOLDOWN_DAYS) - elapsed
                hours_left  = int(remaining.total_seconds() // 3600)
                await interaction.response.send_message(
                    f"⏳ Kamu baru bisa ambil token lagi dalam **{hours_left} jam**.\n"
                    f"Token cuma bisa diambil sekali per {COOLDOWN_DAYS} hari.",
                    ephemeral=True
                )
                return

    existing = premium_tokens.find_one({
        "discordId": str(member.id),
        "status":    "active",
        "expiredAt": { "$gt": datetime.utcnow() }
    })

    if existing:
        await interaction.response.send_message(
            f"✅ Kamu masih punya token aktif!\n"
            f"```{existing['token']}```\n"
            f"⏰ Expire: **{existing['expiredAt'].strftime('%d %B %Y')}**\n"
            f"🎁 Reward: **{existing['reward']['description']}**\n\n"
            f"⚠️ Jangan share token ini ke siapapun!",
            ephemeral=True
        )
        return

    token = generate_token()

    premium_tokens.insert_one({
        "token":       token,
        "discordId":   str(member.id),
        "discordName": str(member),
        "status":      "active",
        "reward": {
            "type":        "pulls",
            "amount":      10,
            "description": "+10 Pull Premium"
        },
        "expiredAt": datetime.utcnow() + timedelta(days=30),
        "usedAt":    None,
        "usedBy":    None,
        "createdAt": datetime.utcnow()
    })

    await interaction.response.send_message(
        f"🎉 Token redeem kamu sudah siap!\n"
        f"```{token}```\n"
        f"🎁 Reward: **+10 Pull Premium**\n"
        f"⏰ Berlaku sampai: **{(datetime.utcnow() + timedelta(days=30)).strftime('%d %B %Y')}**\n\n"
        f"📋 Cara pakai:\n"
        f"1. Buka web FootCard Gacha\n"
        f"2. Pergi ke menu **Redeem**\n"
        f"3. Masukkan token di atas\n\n"
        f"⚠️ **JANGAN share token ini!** Token hanya bisa dipakai 1x.",
        ephemeral=True
    )

@bot.tree.command(
    name="cekstatus",
    description="Cek status langganan premium kamu",
    guild=discord.Object(id=GUILD_ID)
)
async def cekstatus(interaction: discord.Interaction):
    member      = interaction.user
    guild       = bot.get_guild(GUILD_ID)
    member_full = guild.get_member(member.id)
    role        = discord.utils.get(member_full.roles, id=PREMIUM_ROLE_ID)

    if role:
        token = premium_tokens.find_one({
            "discordId": str(member.id),
            "status":    "active",
            "expiredAt": { "$gt": datetime.utcnow() }
        })
        token_info = f"\n🎫 Token aktif: `{token['token']}`" if token else "\n🎫 Belum ada token — gunakan `/gettoken`"
        await interaction.response.send_message(
            f"✅ Status: **Premium Member**\n"
            f"👑 Role: {role.mention}"
            f"{token_info}",
            ephemeral=True
        )
    else:
        await interaction.response.send_message(
            "❌ Kamu belum Premium Member.\nHubungi admin untuk berlangganan.",
            ephemeral=True
        )

bot.run(DISCORD_TOKEN)