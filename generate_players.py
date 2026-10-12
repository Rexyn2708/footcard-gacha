import json, re, os

with open('data/players.json', 'r', encoding='utf-8') as f:
    players = json.load(f)

# Fix path dulu
updated = 0
for p in players:
    old_image = p['image']
    base_path = '/'.join(old_image.split('/')[:-1])
    base_name = old_image.split('/')[-1].rsplit('.', 1)[0]
    for ext in ['webp', 'jpeg', 'jpg', 'png']:
        full_path = 'static/' + base_path + '/' + base_name + '.' + ext
        if os.path.exists(full_path):
            new_image = base_path + '/' + base_name + '.' + ext
            if p['image'] != new_image:
                p['image'] = new_image
                updated += 1
            break

print(f'Fixed {updated} image paths')

with open('data/players.json', 'w', encoding='utf-8') as f:
    json.dump(players, f, indent=2, ensure_ascii=False)

# Update script.js
output = 'const PLAYERS_DB = [\n'
for p in players:
    name = p['name'].replace("'", "\\'")
    output += f"  {{ id: {p['id']}, name: '{name}', rarity: '{p['rarity']}', image: '{p['image']}' }},\n"
output += '];'

with open('static/script.js', 'r', encoding='utf-8') as f:
    script = f.read()

new_script = re.sub(
    r'const PLAYERS_DB = \[.*?\];',
    output,
    script,
    flags=re.DOTALL
)

with open('static/script.js', 'w', encoding='utf-8') as f:
    f.write(new_script)

print(f'Done! {len(players)} pemain diupdate di script.js')