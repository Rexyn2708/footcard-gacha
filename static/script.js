'use strict';

/* ── 1. PLAYER DATABASE ─────────────────────────────────────── */
const PLAYERS_DB = [
  { id: 1, name: 'Eliesse Ben Seghir', rarity: 'Common', image: 'assets/images/common/eliesse-ben-seghir.png' },
  { id: 2, name: 'Benjamin Sesko', rarity: 'Common', image: 'assets/images/common/benjamin-sesko.png' },
  { id: 3, name: 'Arda Guler', rarity: 'Rare', image: 'assets/images/rare/arda-guler.png' },
  { id: 4, name: 'Endrick', rarity: 'Common', image: 'assets/images/common/endrick.png' },
  { id: 5, name: 'Alejandro Garnacho', rarity: 'Common', image: 'assets/images/common/alejandro-garnacho.png' },
  { id: 6, name: 'Rasmus Hojlund', rarity: 'Common', image: 'assets/images/common/rasmus-hojlund.png' },
  { id: 7, name: 'Joao Gomes', rarity: 'Common', image: 'assets/images/common/joao-gomes.png' },
  { id: 8, name: 'Levi Colwill', rarity: 'Common', image: 'assets/images/common/levi-colwill.png' },
  { id: 9, name: 'Micky van de Ven', rarity: 'Common', image: 'assets/images/common/micky-van-de-ven.png' },
  { id: 10, name: 'Riccardo Calafiori', rarity: 'Common', image: 'assets/images/common/riccardo-calafiori.png' },
  { id: 11, name: 'Piero Hincapie', rarity: 'Common', image: 'assets/images/common/piero-hincapie.png' },
  { id: 12, name: 'Yunus Musah', rarity: 'Common', image: 'assets/images/common/yunus-musah.png' },
  { id: 13, name: 'Morten Hjulmand', rarity: 'Common', image: 'assets/images/common/morten-hjulmand.png' },
  { id: 14, name: 'Ismael Bennacer', rarity: 'Common', image: 'assets/images/common/ismael-bennacer.png' },
  { id: 15, name: 'Igor Paixao', rarity: 'Common', image: 'assets/images/common/igor-paixao.png' },
  { id: 16, name: 'Jhon Lucumi', rarity: 'Common', image: 'assets/images/common/jhon-lucumi.png' },
  { id: 17, name: 'Ronald Araujo', rarity: 'Common', image: 'assets/images/common/ronald-araujo.png' },
  { id: 18, name: 'Xavi Simons', rarity: 'Uncommon', image: 'assets/images/uncommon/xavi-simons.png' },
  { id: 19, name: 'Desire Doue', rarity: 'Uncommon', image: 'assets/images/uncommon/desire-doue.png' },
  { id: 20, name: 'Alexander Isak', rarity: 'Uncommon', image: 'assets/images/uncommon/alexander-isak.png' },
  { id: 21, name: 'Jonathan David', rarity: 'Uncommon', image: 'assets/images/uncommon/jonathan-david.png' },
  { id: 22, name: 'Marcus Thuram', rarity: 'Uncommon', image: 'assets/images/uncommon/marcus-thuram.png' },
  { id: 23, name: 'Alexis Mac Allister', rarity: 'Uncommon', image: 'assets/images/uncommon/alexis-mac-allister.png' },
  { id: 24, name: 'Declan Rice', rarity: 'Uncommon', image: 'assets/images/uncommon/declan-rice.webp' },
  { id: 25, name: 'Bruno Guimaraes', rarity: 'Uncommon', image: 'assets/images/uncommon/bruno-guimaraes.webp' },
  { id: 26, name: 'Nicolo Barella', rarity: 'Uncommon', image: 'assets/images/uncommon/nicolo-barella.webp' },
  { id: 27, name: 'Alessandro Bastoni', rarity: 'Uncommon', image: 'assets/images/uncommon/alessandro-bastoni.webp' },
  { id: 28, name: 'Federico Dimarco', rarity: 'Uncommon', image: 'assets/images/uncommon/federico-dimarco.webp' },
  { id: 29, name: 'Jules Kounde', rarity: 'Uncommon', image: 'assets/images/uncommon/jules-kounde.webp' },
  { id: 30, name: 'Mike Maignan', rarity: 'Uncommon', image: 'assets/images/uncommon/mike-maignan.webp' },
  { id: 31, name: 'Gianluigi Donnarumma', rarity: 'Uncommon', image: 'assets/images/uncommon/gianluigi-donnarumma.webp' },
  { id: 32, name: 'Bukayo Saka', rarity: 'Rare', image: 'assets/images/rare/bukayo-saka.jpeg' },
  { id: 33, name: 'Cole Palmer', rarity: 'Rare', image: 'assets/images/rare/cole-palmer.jpeg' },
  { id: 34, name: 'Phil Foden', rarity: 'Rare', image: 'assets/images/rare/phil-foden.jpeg' },
  { id: 35, name: 'Khvicha Kvaratskhelia', rarity: 'Rare', image: 'assets/images/rare/khvicha-kvaratskhelia.jpeg' },
  { id: 36, name: 'Rafael Leao', rarity: 'Rare', image: 'assets/images/rare/rafael-leao.jpeg' },
  { id: 37, name: 'Federico Valverde', rarity: 'Rare', image: 'assets/images/rare/federico-valverde.jpeg' },
  { id: 38, name: 'Rodrygo', rarity: 'Rare', image: 'assets/images/rare/rodrygo.jpeg' },
  { id: 39, name: 'Martin Odegaard', rarity: 'Rare', image: 'assets/images/rare/martin-odegaard.jpeg' },
  { id: 40, name: 'Achraf Hakimi', rarity: 'Rare', image: 'assets/images/rare/achraf-hakimi.jpeg' },
  { id: 41, name: 'Alphonso Davies', rarity: 'Rare', image: 'assets/images/rare/alphonso-davies.jpeg' },
  { id: 42, name: 'Theo Hernandez', rarity: 'Rare', image: 'assets/images/rare/theo-hernandez.jpeg' },
  { id: 43, name: 'William Saliba', rarity: 'Rare', image: 'assets/images/rare/william-saliba.jpeg' },
  { id: 44, name: 'Ruben Dias', rarity: 'Rare', image: 'assets/images/rare/ruben-dias.jpeg' },
  { id: 45, name: 'Julian Alvarez', rarity: 'Rare', image: 'assets/images/rare/julian-alvarez.jpeg' },
  { id: 46, name: 'Lautaro Martinez', rarity: 'Rare', image: 'assets/images/rare/lautaro-martinez.jpeg' },
  { id: 47, name: 'Robert Lewandowski', rarity: 'Rare', image: 'assets/images/rare/robert-lewandowski.jpeg' },
  { id: 48, name: 'Omar Marmoush', rarity: 'Rare', image: 'assets/images/rare/omar-marmoush.jpeg' },
  { id: 49, name: 'Victor Osimhen', rarity: 'Rare', image: 'assets/images/rare/victor-osimhen.jpeg' },
  { id: 50, name: 'Nico Paz', rarity: 'Rare', image: 'assets/images/rare/nico-paz.jpeg' },
  { id: 51, name: 'Joao Neves', rarity: 'Rare', image: 'assets/images/rare/joao-neves.jpeg' },
  { id: 52, name: 'Viktor Gyokeres', rarity: 'Rare', image: 'assets/images/rare/viktor-gyokeres.jpeg' },
  { id: 53, name: 'Florian Wirtz', rarity: 'Epic', image: 'assets/images/epic/florian-wirtz.webp' },
  { id: 54, name: 'Jamal Musiala', rarity: 'Epic', image: 'assets/images/epic/jamal-musiala.webp' },
  { id: 55, name: 'Vitinha', rarity: 'Epic', image: 'assets/images/epic/vitinha.webp' },
  { id: 56, name: 'Michael Olise', rarity: 'Epic', image: 'assets/images/epic/michael-olise.webp' },
  { id: 57, name: 'Pedri', rarity: 'Epic', image: 'assets/images/epic/pedri.webp' },
  { id: 58, name: 'Vinicius Junior', rarity: 'Epic', image: 'assets/images/epic/vinicius-junior.webp' },
  { id: 59, name: 'Bruno Fernandes', rarity: 'Epic', image: 'assets/images/epic/bruno-fernandes.webp' },
  { id: 60, name: 'Kevin De Bruyne', rarity: 'Epic', image: 'assets/images/epic/kevin-de-bruyne.webp' },
  { id: 61, name: 'Son Heung-min', rarity: 'Epic', image: 'assets/images/epic/son-heung-min.webp' },
  { id: 62, name: 'Antoine Griezmann', rarity: 'Epic', image: 'assets/images/epic/antoine-griezmann.webp' },
  { id: 63, name: 'Bernardo Silva', rarity: 'Epic', image: 'assets/images/epic/bernardo-silva.webp' },
  { id: 64, name: 'Emiliano Martinez', rarity: 'Epic', image: 'assets/images/epic/emiliano-martinez.webp' },
  { id: 65, name: 'Alisson Becker', rarity: 'Epic', image: 'assets/images/epic/alisson-becker.webp' },
  { id: 66, name: 'Thibaut Courtois', rarity: 'Epic', image: 'assets/images/epic/thibaut-courtois.webp' },
  { id: 67, name: 'Virgil van Dijk', rarity: 'Epic', image: 'assets/images/epic/virgil-van-dijk.webp' },
  { id: 68, name: 'Harry Kane', rarity: 'Epic', image: 'assets/images/epic/harry-kane.webp' },
  { id: 69, name: 'Kenan Yildiz', rarity: 'Epic', image: 'assets/images/epic/kenan-yildiz.webp' },
  { id: 70, name: 'Kylian Mbappe', rarity: 'Mythic', image: 'assets/images/mythic/kylian-mbappe.webp' },
  { id: 71, name: 'Erling Haaland', rarity: 'Mythic', image: 'assets/images/mythic/erling-haaland.webp' },
  { id: 72, name: 'Jude Bellingham', rarity: 'Mythic', image: 'assets/images/mythic/jude-bellingham.webp' },
  { id: 73, name: 'Mohamed Salah', rarity: 'Mythic', image: 'assets/images/mythic/mohamed-salah.webp' },
  { id: 74, name: 'Lamine Yamal', rarity: 'Mythic', image: 'assets/images/mythic/lamine-yamal.webp' },
  { id: 75, name: 'Vinicius Junior', rarity: 'Mythic', image: 'assets/images/mythic/vinicius-junior.webp' },
  { id: 76, name: 'Harry Kane', rarity: 'Mythic', image: 'assets/images/mythic/harry-kane.webp' },
  { id: 77, name: 'Rodri', rarity: 'Mythic', image: 'assets/images/mythic/rodri.webp' },
  { id: 78, name: 'Jamal Musiala', rarity: 'Mythic', image: 'assets/images/mythic/jamal-musiala.webp' },
  { id: 79, name: 'Florian Wirtz', rarity: 'Mythic', image: 'assets/images/mythic/florian-wirtz.avif' },
  { id: 80, name: 'Pedri', rarity: 'Mythic', image: 'assets/images/mythic/pedri.webp' },
  { id: 81, name: 'Bukayo Saka', rarity: 'Mythic', image: 'assets/images/mythic/bukayo-saka.webp' },
  { id: 82, name: 'Ousmane Dembele', rarity: 'Secret', image: 'assets/images/secret/ousmane-dembele.png' },
  { id: 83, name: 'Kylian Mbappe', rarity: 'Secret', image: 'assets/images/secret/kylian-mbappe.png' },
  { id: 84, name: 'Erling Haaland', rarity: 'Secret', image: 'assets/images/secret/erling-haaland.png' },
  { id: 85, name: 'Bruno Fernandes', rarity: 'Secret', image: 'assets/images/secret/bruno-fernandes.png' },
  { id: 86, name: 'Lamine Yamal', rarity: 'Secret', image: 'assets/images/secret/lamine-yamal.png' },
  { id: 87, name: 'Jude Bellingham', rarity: 'Secret', image: 'assets/images/secret/jude-bellingham.png' },
  { id: 88, name: 'Vinicius Junior', rarity: 'Secret', image: 'assets/images/secret/vinicius-junior.png' },
  { id: 89, name: 'Florian Wirtz', rarity: 'Secret', image: 'assets/images/secret/florian-wirtz.png' },
  { id: 90, name: 'Jamal Musiala', rarity: 'Secret', image: 'assets/images/secret/jamal-musiala.png' },
  { id: 91, name: 'Harry Kane', rarity: 'Secret', image: 'assets/images/secret/harry-kane.png' },
  { id: 92, name: 'Rodri', rarity: 'Secret', image: 'assets/images/secret/rodri.webp' },
  { id: 93, name: 'Vitinha', rarity: 'Secret', image: 'assets/images/secret/vitinha.webp' },
  { id: 94, name: 'Michael Olise', rarity: 'Secret', image: 'assets/images/secret/michael-olise.webp' },
  { id: 95, name: 'Mohamed Salah', rarity: 'Secret', image: 'assets/images/secret/mohamed-salah.webp' },
  { id: 96, name: 'Lionel Messi', rarity: 'Secret', image: 'assets/images/secret/lionel-messi.webp' },
  { id: 97, name: 'Cristiano Ronaldo', rarity: 'Secret', image: 'assets/images/secret/cristiano-ronaldo.webp' },
  { id: 98, name: 'Pele', rarity: 'Heritage', image: 'assets/images/heritage/pele.png' },
  { id: 99, name: 'Diego Maradona', rarity: 'Heritage', image: 'assets/images/heritage/diego-maradona.png' },
  { id: 100, name: 'Johan Cruyff', rarity: 'Heritage', image: 'assets/images/heritage/johan-cruyff.png' },
  { id: 101, name: 'Ronaldo Nazario', rarity: 'Heritage', image: 'assets/images/heritage/ronaldo-nazario.png' },
  { id: 102, name: 'Zinedine Zidane', rarity: 'Heritage', image: 'assets/images/heritage/zinedine-zidane.png' },
  { id: 103, name: 'Ronaldinho', rarity: 'Heritage', image: 'assets/images/heritage/ronaldinho.png' },
  { id: 104, name: 'Franz Beckenbauer', rarity: 'Heritage', image: 'assets/images/heritage/franz-beckenbauer.png' },
  { id: 105, name: 'Alfredo Di Stefano', rarity: 'Heritage', image: 'assets/images/heritage/alfredo-di-stefano.png' },
  { id: 106, name: 'Marco van Basten', rarity: 'Heritage', image: 'assets/images/heritage/marco-van-basten.png' },
  { id: 107, name: 'Eusebio', rarity: 'Heritage', image: 'assets/images/heritage/eusebio.png' },
  { id: 108, name: 'Ferenc Puskas', rarity: 'Heritage', image: 'assets/images/heritage/ferenc-puskas.png' },
  { id: 109, name: 'Lev Yashin', rarity: 'Heritage', image: 'assets/images/heritage/lev-yashin.png' },
  { id: 110, name: 'Paolo Maldini', rarity: 'Heritage', image: 'assets/images/heritage/paolo-maldini.png' },
  { id: 111, name: 'Franco Baresi', rarity: 'Heritage', image: 'assets/images/heritage/franco-baresi.png' },
  { id: 112, name: 'Andres Iniesta', rarity: 'Heritage', image: 'assets/images/heritage/andres-iniesta.png' },
  { id: 113, name: 'Xavi Hernandez', rarity: 'Heritage', image: 'assets/images/heritage/xavi-hernandez.png' },
  { id: 114, name: 'Roberto Baggio', rarity: 'Heritage', image: 'assets/images/heritage/roberto-baggio.png' },
  { id: 115, name: 'Zico', rarity: 'Heritage', image: 'assets/images/heritage/zico.png' },
  { id: 116, name: 'Romario', rarity: 'Heritage', image: 'assets/images/heritage/romario.png' },
  { id: 117, name: 'Garrincha', rarity: 'Heritage', image: 'assets/images/heritage/garrincha.png' },
  { id: 118, name: 'Ole Romeny', rarity: 'Common', image: 'assets/images/common/ole-romeny.png' },
];

/* ── 2. RARITY CONFIG ───────────────────────────────────────── */
const RARITY_CONFIG = [
  { name: 'Heritage', icon: '👑', rate: 0.20,  color: '#f5c842', order: 1 },
  { name: 'Secret',   icon: '☄️', rate: 0.80,  color: '#29b6f6', order: 2 },
  { name: 'Mythic',   icon: '🔥', rate: 2.00,  color: '#f50057', order: 3 },
  { name: 'Epic',     icon: '✦',  rate: 12.00, color: '#ff6d00', order: 4 },
  { name: 'Rare',     icon: '💎', rate: 15.00, color: '#7c4dff', order: 5 },
  { name: 'Uncommon', icon: '🍀', rate: 25.00, color: '#4dd0e1', order: 6 },
  { name: 'Common',   icon: '●',  rate: 45.00, color: '#78909c', order: 7 },
];

/* ── 3. REDEEM CODES ────────────────────────────────────────── */
const REDEEM_CODES = [
  { code: 'WELCOME2025', type: 'pulls',  amount: 3,    description: '+3 Pull Tambahan',         usedKey: 'rc_welcome2025' },
  { code: 'FOOTCARD',    type: 'pulls',  amount: 1,    description: '+1 Pull Tambahan',         usedKey: 'rc_footcard' },
  { code: 'LEGENDARY',   type: 'pulls',  amount: 5,    description: '+5 Pull Tambahan',         usedKey: 'rc_legendary' },
  { code: 'GETMESSI',    type: 'player', playerId: 77, description: 'Kartu Lionel Messi!',      usedKey: 'rc_getmessi' },
  { code: 'GETRONALDO',  type: 'player', playerId: 78, description: 'Kartu Cristiano Ronaldo!', usedKey: 'rc_getronaldo' },
  { code: 'GETPELE',     type: 'player', playerId: 79, description: 'Kartu Pele Heritage!',     usedKey: 'rc_getpele' },
];

/* ── 4. LOCALSTORAGE KEYS ───────────────────────────────────── */
const LS = {
  SERIAL:     'fcg_serial_counter',
  HISTORY:    'fcg_history',
  PULLS_LEFT: 'fcg_pulls_left',
  LAST_PULL:  'fcg_last_pull_time',
  BONUS_PULLS:'fcg_bonus_pulls',
};

/* ── 5. STATE ───────────────────────────────────────────────── */
let state = {
  pendingCards:      [],
  revealIndex:       0,
  isRevealing:       false,
  pendingImportData: null,
};

/* ── 6. UTILITY FUNCTIONS ───────────────────────────────────── */
function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function lsSet(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function lsRemove(key) { localStorage.removeItem(key); }

function formatDate(ts) {
  return new Date(ts).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function zeroPad(n, digits = 8) { return String(n).padStart(digits, '0'); }

function nextSerial() {
  const count = lsGet(LS.SERIAL, 0) + 1;
  lsSet(LS.SERIAL, count);
  return `SR-${zeroPad(count)}`;
}

function showToast(msg, icon = '✅', duration = 3000) {
  const toast = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.remove('hidden');
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, duration);
}

function openFullscreen(src, alt = 'Player') {
  const overlay = document.getElementById('fullscreenOverlay');
  const img = document.getElementById('fullscreenImg');
  img.src = src;
  img.alt = alt;
  overlay.classList.remove('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
}

function rarityColor(rarityName) {
  const cfg = RARITY_CONFIG.find(r => r.name === rarityName);
  return cfg ? cfg.color : '#78909c';
}

function rarityIcon(rarityName) {
  const cfg = RARITY_CONFIG.find(r => r.name === rarityName);
  return cfg ? cfg.icon : '●';
}

function placeholderImg() {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='260' viewBox='0 0 200 260'%3E%3Crect width='200' height='260' fill='%231a2235'/%3E%3Ccircle cx='100' cy='90' r='40' fill='%23263348'/%3E%3Cellipse cx='100' cy='200' rx='55' ry='40' fill='%23263348'/%3E%3Ctext x='50%25' y='87%25' text-anchor='middle' fill='%23475569' font-size='12' font-family='Inter,sans-serif'%3EFoto tidak tersedia%3C/text%3E%3C/svg%3E`;
}

function handleImgError(img) {
  img.src = placeholderImg();
  img.onerror = null;
}

/* ── 7. GACHA ENGINE ─────────────────────────────────────────── */
function drawRarity() {
  const total = RARITY_CONFIG.reduce((s, r) => s + r.rate, 0);
  let rand = Math.random() * total;
  for (const cfg of RARITY_CONFIG) {
    rand -= cfg.rate;
    if (rand <= 0) return cfg.name;
  }
  return RARITY_CONFIG[RARITY_CONFIG.length - 1].name;
}

function playersByRarity(rarity) {
  return PLAYERS_DB.filter(p => p.rarity === rarity);
}

function drawCards(n = 5) {
  const drawn = [];
  for (let i = 0; i < n; i++) {
    const rarity = drawRarity();
    const pool = playersByRarity(rarity);
    if (!pool.length) { i--; continue; }
    const player = pool[Math.floor(Math.random() * pool.length)];
    drawn.push({ ...player, serial: nextSerial(), timestamp: Date.now() + i });
  }
  return drawn;
}

function saveToHistory(cards) {
  const history = lsGet(LS.HISTORY, []);
  history.unshift(...cards);
  lsSet(LS.HISTORY, history);
}

/* ── 8. PULL SYSTEM ──────────────────────────────────────────── */
const DAILY_PULLS = 3;
const CARDS_PER_PULL = 5;

function getPullsRemaining() {
  const base  = lsGet(LS.PULLS_LEFT, null);
  const bonus = lsGet(LS.BONUS_PULLS, 0);
  if (base === null) return DAILY_PULLS + bonus;
  return base + bonus;
}

function checkDailyReset() {
  const lastPull = lsGet(LS.LAST_PULL, null);
  if (!lastPull) return;
  const elapsed = Date.now() - lastPull;
  const msIn24h = 24 * 60 * 60 * 1000;
  if (elapsed >= msIn24h) {
    lsSet(LS.PULLS_LEFT, DAILY_PULLS);
    lsSet(LS.LAST_PULL, null);
    lsSet(LS.BONUS_PULLS, 0);
  }
}

function consumePull() {
  checkDailyReset();
  const bonus = lsGet(LS.BONUS_PULLS, 0);
  const base  = lsGet(LS.PULLS_LEFT, DAILY_PULLS);
  if (bonus > 0) {
    lsSet(LS.BONUS_PULLS, bonus - 1);
    if (lsGet(LS.LAST_PULL, null) === null) lsSet(LS.LAST_PULL, Date.now());
    return true;
  }
  if (base > 0) {
    lsSet(LS.PULLS_LEFT, base - 1);
    lsSet(LS.LAST_PULL, Date.now());
    return true;
  }
  return false;
}

function addBonusPulls(n) {
  const current = lsGet(LS.BONUS_PULLS, 0);
  lsSet(LS.BONUS_PULLS, current + n);
}

/* ── 9. HOME PAGE ────────────────────────────────────────────── */
async function renderDailyBar() {
  const token = localStorage.getItem('fcg_token');
  if (token) {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const remaining = (data.pullsLeft || 0) + (data.bonusPulls || 0);
        document.getElementById('pullsRemaining').textContent = remaining;
        updateBtnPull(remaining);
        renderCountdown();
        return;
      }
    } catch {}
  }
  checkDailyReset();
  const remaining = getPullsRemaining();
  document.getElementById('pullsRemaining').textContent = remaining;
  updateBtnPull(remaining);
  renderCountdown();
}

function updateBtnPull(remaining) {
  const btn = document.getElementById('btnPull');
  const isRevealing = state.pendingCards.length > 0 && state.revealIndex < state.pendingCards.length;
  btn.disabled = remaining <= 0 || isRevealing;
}

let countdownInterval = null;
function renderCountdown() {
  const lastPull = lsGet(LS.LAST_PULL, null);
  const el = document.getElementById('countdownTimer');
  if (!lastPull) { el.textContent = 'Tersedia!'; return; }
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const msIn24h = 24 * 60 * 60 * 1000;
    const diff = msIn24h - (Date.now() - lastPull);
    if (diff <= 0) {
      el.textContent = 'Tersedia!';
      clearInterval(countdownInterval);
      renderDailyBar();
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${zeroPad(h,2)}:${zeroPad(m,2)}:${zeroPad(s,2)}`;
  }, 1000);
}

function renderRates() {
  const grid = document.getElementById('ratesGrid');
  grid.innerHTML = RARITY_CONFIG.map(r => `
    <div class="rate-chip" style="border-color: ${r.color}22;">
      <div class="rate-icon">${r.icon}</div>
      <div class="rate-name" style="color:${r.color}">${r.name}</div>
      <div class="rate-pct" style="color:${r.color}">${r.rate.toFixed(2)}%</div>
    </div>
  `).join('');
}

function renderProgress() {
  const history = lsGet(LS.HISTORY, []);
  const uniqueOwned = new Set(history.map(h => h.id)).size;
  const total = PLAYERS_DB.length;
  document.getElementById('progressOwned').textContent = uniqueOwned;
  document.getElementById('progOwned').textContent = uniqueOwned;
  document.getElementById('progressTotal').textContent = total;
  const pct = total > 0 ? (uniqueOwned / total) * 100 : 0;
  document.getElementById('progressBarFill').style.width = `${pct}%`;
}

function renderHomeHistory() {
  const history = lsGet(LS.HISTORY, []);
  const el = document.getElementById('homeHistoryList');
  if (!history.length) {
    el.innerHTML = '<div class="history-empty">Belum ada gacha. Lakukan Pull pertamamu!</div>';
    return;
  }
  el.innerHTML = history.slice(0, 10).map(card => buildHistoryItemHTML(card)).join('');
}

function buildHistoryItemHTML(card) {
  const color = rarityColor(card.rarity);
  const icon  = rarityIcon(card.rarity);
  return `
    <div class="history-item">
      <img class="history-item-img" src="${card.image}" alt="${card.name}" onerror="handleImgError(this)" />
      <div class="history-item-info">
        <div class="history-item-name">${card.name}</div>
        <div class="history-item-meta">${formatDate(card.timestamp)}</div>
      </div>
      <div>
        <div class="history-item-rarity" style="color:${color}">${icon} ${card.rarity}</div>
        <div class="history-item-serial">${card.serial}</div>
      </div>
    </div>
  `;
}

/* ── 10. GACHA REVEAL FLOW ───────────────────────────────────── */
async function doPull() {
  const token = localStorage.getItem('fcg_token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const btn = document.getElementById('btnPull');
  btn.disabled = true;

  try {
    const res = await fetch(`${API_URL}/gacha/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (data.error) {
      showToast(data.error, '⏰');
      btn.disabled = false;
      return;
    }

    const drawnCards = data.cards.map(c => ({
      id:        c.playerId,
      name:      c.playerName,
      rarity:    c.rarity,
      image:     c.image,
      serial:    c.serial,
      timestamp: new Date(c.obtainedAt).getTime()
    }));

    saveToHistory(drawnCards);
    state.pendingCards = drawnCards;
    state.revealIndex  = 0;
    state.isRevealing  = false;

    renderDailyBar();
    renderProgress();
    renderHomeHistory();

    const orb = document.getElementById('gachaMachine').querySelector('.machine-orb');
    orb.classList.add('spinning');
    setTimeout(() => orb.classList.remove('spinning'), 700);

    showRevealArea();

  } catch (err) {
    showToast('Gagal konek ke server!', '❌');
    btn.disabled = false;
  }
}

function showRevealArea() {
  const area = document.getElementById('revealArea');
  const cardsEl = document.getElementById('revealCards');
  area.classList.remove('hidden');
  cardsEl.innerHTML = state.pendingCards.map((card, i) => `
    <div class="reveal-card${i === 0 ? '' : ' waiting-others'}" id="revealCard_${i}" data-index="${i}">
      <div class="reveal-card-inner">
        <div class="reveal-card-front">🎴</div>
        <div class="reveal-card-back rarity-${card.rarity}">
          <img class="rcard-img" src="${card.image}" alt="${card.name}" onerror="handleImgError(this)" />
          <div class="rcard-name" style="color:${rarityColor(card.rarity)}">${card.name}</div>
          <div class="rcard-rarity">${rarityIcon(card.rarity)} ${card.rarity}</div>
        </div>
      </div>
    </div>
  `).join('');
  document.getElementById('revealHint').textContent = 'Klik kartu untuk membuka!';
  activateRevealCard(0);
  updateBtnPull(getPullsRemaining());
}

function activateRevealCard(index) {
  document.querySelectorAll('.reveal-card').forEach((el, i) => {
    if (i === index) {
      el.classList.remove('waiting-others');
      el.onclick = () => revealCard(i);
    } else if (i > index) {
      el.classList.add('waiting-others');
      el.onclick = null;
    }
  });
}

function revealCard(index) {
  if (state.isRevealing) return;
  state.isRevealing = true;
  const cardEl = document.getElementById(`revealCard_${index}`);
  cardEl.classList.add('revealed');
  cardEl.onclick = null;
  setTimeout(() => {
    state.isRevealing = false;
    const nextIndex = index + 1;
    if (nextIndex < state.pendingCards.length) {
      activateRevealCard(nextIndex);
      document.getElementById('revealHint').textContent =
        `${state.pendingCards.length - nextIndex} kartu tersisa — klik untuk membuka!`;
    } else {
      document.getElementById('revealHint').textContent = '✅ Semua kartu terungkap!';
      state.pendingCards = [];
      setTimeout(() => {
        document.getElementById('revealArea').classList.add('hidden');
        document.getElementById('revealCards').innerHTML = '';
        updateBtnPull(getPullsRemaining());
      }, 2000);
    }
  }, 550);
}

/* ── 11. INVENTORY PAGE ──────────────────────────────────────── */
function renderInventory() {
  const history  = lsGet(LS.HISTORY, []);
  const search   = document.getElementById('inventorySearch').value.toLowerCase().trim();
  const rFilter  = document.getElementById('inventoryFilterRarity').value;
  const sortMode = document.getElementById('inventorySort').value;
  const grid = document.getElementById('inventoryGrid');

  let cards = [...history];
  if (rFilter !== 'all') cards = cards.filter(c => c.rarity === rFilter);
  if (search) cards = cards.filter(c => c.name.toLowerCase().includes(search));

  const rarityOrder = Object.fromEntries(RARITY_CONFIG.map(r => [r.name, r.order]));
  cards.sort((a, b) => {
    switch (sortMode) {
      case 'newest':      return b.timestamp - a.timestamp;
      case 'oldest':      return a.timestamp - b.timestamp;
      case 'rarity-desc': return rarityOrder[a.rarity] - rarityOrder[b.rarity];
      case 'rarity-asc':  return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case 'serial':      return a.serial.localeCompare(b.serial);
      default: return 0;
    }
  });

  if (!cards.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p>Tidak ada kartu yang cocok.</p></div>`;
    return;
  }

  grid.innerHTML = cards.map(card => buildPlayerCardHTML(card)).join('');
  grid.querySelectorAll('.player-card').forEach(el => {
    el.addEventListener('click', () => openCardDetailModal(el.dataset.serial));
  });
}

function buildPlayerCardHTML(card) {
  const color = rarityColor(card.rarity);
  return `
    <div class="player-card rarity-${card.rarity}" data-serial="${card.serial}" title="${card.name}">
      <img class="player-card-img" src="${card.image}" alt="${card.name}" onerror="handleImgError(this)" />
      <div class="player-card-body">
        <div class="player-card-name">${card.name}</div>
        <div class="player-card-meta">
          <span class="player-card-rarity" style="color:${color}">${rarityIcon(card.rarity)} ${card.rarity}</span>
          <span class="player-card-serial">${card.serial}</span>
        </div>
      </div>
    </div>
  `;
}

function openCardDetailModal(serial) {
  const history = lsGet(LS.HISTORY, []);
  const card = history.find(c => c.serial === serial);
  if (!card) return;
  const color = rarityColor(card.rarity);
  const icon  = rarityIcon(card.rarity);

  document.getElementById('detailCardVisual').innerHTML = `
    <img src="${card.image}" alt="${card.name}" onerror="handleImgError(this)"
         style="cursor:pointer; border: 2px solid ${color}33;"
         onclick="openFullscreen('${card.image}', '${card.name.replace(/'/g,"&#39;")}')" />
    <button class="btn-fullscreen" onclick="openFullscreen('${card.image}', '${card.name.replace(/'/g,"&#39;")}')">🔍 Lihat Fullscreen</button>
  `;
  document.getElementById('detailCardInfo').innerHTML = `
    <h2 style="color:${color}">${card.name}</h2>
    <div class="card-detail-row">
      <span class="card-detail-label">Rarity</span>
      <span class="card-detail-value" style="color:${color}">${icon} ${card.rarity}</span>
    </div>
    <div class="card-detail-row">
      <span class="card-detail-label">Nomor Seri</span>
      <span class="card-detail-value mono">${card.serial}</span>
    </div>
    <div class="card-detail-row">
      <span class="card-detail-label">Tanggal Didapat</span>
      <span class="card-detail-value">${formatDate(card.timestamp)}</span>
    </div>
  `;
  document.getElementById('modalCardDetail').classList.remove('hidden');
}

/* ── 12. ALL PLAYER PAGE ─────────────────────────────────────── */
function renderAllPlayer() {
  const history = lsGet(LS.HISTORY, []);
  const owned = new Map();
  history.forEach(h => {
    if (!owned.has(h.id)) owned.set(h.id, []);
    owned.get(h.id).push(h);
  });

  const container = document.getElementById('allPlayerContent');
  container.innerHTML = RARITY_CONFIG.map(cfg => {
    const players = PLAYERS_DB.filter(p => p.rarity === cfg.name);
    if (!players.length) return '';
    const ownedCount = players.filter(p => owned.has(p.id)).length;
    const cards = players.map(p => buildAllPlayerCard(p, owned.get(p.id) || null, cfg)).join('');
    return `
      <div class="rarity-section">
        <div class="rarity-section-header">
          <span class="rarity-section-icon">${cfg.icon}</span>
          <span class="rarity-section-title" style="color:${cfg.color}">${cfg.name}</span>
          <span class="rarity-section-count">${ownedCount}/${players.length} dimiliki</span>
        </div>
        <div class="all-player-grid">${cards}</div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.ap-card-serial[data-player-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openPlayerHistoryModal(parseInt(el.dataset.playerId));
    });
  });

  container.querySelectorAll('.ap-card.owned').forEach(el => {
    el.addEventListener('click', () => openPlayerHistoryModal(parseInt(el.dataset.playerId)));
  });
}

function buildAllPlayerCard(player, pulls, rarityCfg) {
  const isOwned    = pulls && pulls.length > 0;
  const isHeritage = player.rarity === 'Heritage';
  const displayName = (isHeritage && !isOwned) ? '?????' : player.name;
  const imgSrc = (isHeritage && !isOwned) ? placeholderImg() : player.image;
  const statusHTML = isOwned
    ? `<span class="ap-card-serial" data-player-id="${player.id}">${pulls[0].serial}${pulls.length > 1 ? ` (+${pulls.length-1})` : ''}</span>`
    : `<span class="ap-card-status">Belum Didapat</span>`;
  return `
    <div class="ap-card ${isOwned ? 'owned' : 'unowned'} rarity-${player.rarity}" data-player-id="${player.id}">
      <img class="ap-card-img" src="${imgSrc}" alt="${displayName}" onerror="handleImgError(this)" />
      <div class="ap-card-label">
        <div class="ap-card-name" style="color:${isOwned ? rarityCfg.color : '#475569'}">${displayName}</div>
        ${statusHTML}
      </div>
    </div>
  `;
}

function openPlayerHistoryModal(playerId) {
  const player = PLAYERS_DB.find(p => p.id === playerId);
  if (!player) return;
  const history = lsGet(LS.HISTORY, []);
  const pulls = history.filter(h => h.id === playerId);
  const color = rarityColor(player.rarity);

  const pullsList = pulls.length
    ? pulls.map(p => `
        <div class="history-pull-item">
          <span class="history-pull-serial">${p.serial}</span>
          <span class="history-pull-date">${formatDate(p.timestamp)}</span>
        </div>
      `).join('')
    : '<p style="color:#475569; font-style:italic;">Belum pernah didapat.</p>';

  document.getElementById('playerHistoryContent').innerHTML = `
    <div class="player-history-header">
      <img class="player-history-img" src="${player.image}" alt="${player.name}"
           onerror="handleImgError(this)"
           onclick="openFullscreen('${player.image}', '${player.name.replace(/'/g,"&#39;")}')" />
      <div class="player-history-meta">
        <h2 style="color:${color}">${player.name}</h2>
        <div style="color:${color}; margin-bottom:8px;">${rarityIcon(player.rarity)} ${player.rarity}</div>
        <button class="btn-fullscreen" style="max-width:200px;" onclick="openFullscreen('${player.image}', '${player.name.replace(/'/g,"&#39;")}')">🔍 Fullscreen</button>
      </div>
    </div>
    <h3 style="margin-bottom:12px; font-family:var(--font-display);">Riwayat Pull (${pulls.length}×)</h3>
    <div class="history-pull-list">${pullsList}</div>
  `;
  document.getElementById('modalPlayerHistory').classList.remove('hidden');
}

/* ── 13. REDEEM PAGE ─────────────────────────────────────────── */
async function processRedeem() {
  const input    = document.getElementById('redeemCode');
  const resultEl = document.getElementById('redeemResult');
  const code     = input.value.trim().toUpperCase();
  const token    = localStorage.getItem('fcg_token');

  resultEl.className = 'redeem-result';
  resultEl.classList.add('hidden');

  if (!code) {
    showResult('error', '⚠️ Masukkan kode terlebih dahulu.');
    return;
  }

  if (token) {
    try {
      const res = await fetch(`${API_URL}/redeem/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.error) {
        showResult('error', `❌ ${data.error}`);
      } else {
        showResult('success', `🎉 ${data.message}`);
        renderDailyBar();
      }
      input.value = '';
      return;
    } catch {}
  }

  // Fallback localStorage
  const codeData = REDEEM_CODES.find(c => c.code === code);
  if (!codeData) { showResult('error', '❌ Kode tidak valid.'); return; }
  if (lsGet(codeData.usedKey, false)) { showResult('error', '🔒 Kode sudah digunakan.'); return; }

  lsSet(codeData.usedKey, true);
  if (codeData.type === 'pulls') {
    addBonusPulls(codeData.amount);
    renderDailyBar();
    showResult('success', `🎉 Berhasil! ${codeData.description}`);
  } else if (codeData.type === 'player') {
    const player = PLAYERS_DB.find(p => p.id === codeData.playerId);
    if (player) {
      const card = { ...player, serial: nextSerial(), timestamp: Date.now() };
      saveToHistory([card]);
      renderProgress();
      renderHomeHistory();
      showResult('success', `🎉 Berhasil! Kamu mendapatkan ${codeData.description}`);
    }
  }
  input.value = '';

  function showResult(type, msg) {
    resultEl.classList.remove('hidden');
    resultEl.className = `redeem-result ${type}`;
    resultEl.textContent = msg;
  }
}

/* ── 14. SETTINGS ────────────────────────────────────────────── */
function obfuscate(str, pin) {
  const key = pin.split('').map(c => c.charCodeAt(0));
  return str.split('').map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key[i % key.length])
  ).join('');
}

function encodeData(data, pin) {
  const json = JSON.stringify(data);
  const obf  = obfuscate(json, pin);
  return btoa(unescape(encodeURIComponent(obf)));
}

function decodeData(encoded, pin) {
  try {
    const obf  = decodeURIComponent(escape(atob(encoded)));
    const json = obfuscate(obf, pin);
    return JSON.parse(json);
  } catch { return null; }
}

function gatherAllData() {
  return {
    version:    '1.0',
    exportedAt: Date.now(),
    serial:     lsGet(LS.SERIAL, 0),
    history:    lsGet(LS.HISTORY, []),
    pullsLeft:  lsGet(LS.PULLS_LEFT, DAILY_PULLS),
    lastPull:   lsGet(LS.LAST_PULL, null),
    bonusPulls: lsGet(LS.BONUS_PULLS, 0),
    redeemUsed: REDEEM_CODES.reduce((acc, c) => {
      const used = lsGet(c.usedKey, false);
      if (used) acc[c.usedKey] = true;
      return acc;
    }, {}),
  };
}

function restoreAllData(data) {
  lsSet(LS.SERIAL,      data.serial      ?? 0);
  lsSet(LS.HISTORY,     data.history     ?? []);
  lsSet(LS.PULLS_LEFT,  data.pullsLeft   ?? DAILY_PULLS);
  lsSet(LS.LAST_PULL,   data.lastPull    ?? null);
  lsSet(LS.BONUS_PULLS, data.bonusPulls  ?? 0);
  if (data.redeemUsed) {
    Object.entries(data.redeemUsed).forEach(([k, v]) => lsSet(k, v));
  }
}

function downloadFile(content, filename, mimeType = 'application/octet-stream') {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function resetAllProgress() {
  Object.values(LS).forEach(key => lsRemove(key));
  REDEEM_CODES.forEach(c => lsRemove(c.usedKey));
  showToast('Semua progres telah dihapus.', '🗑️');
  setTimeout(() => location.reload(), 1000);
}

/* ── 15. NAVIGATION ──────────────────────────────────────────── */
function navigateTo(pageId) {
  document.querySelectorAll('main.page').forEach(p => {
    p.classList.toggle('active', p.id === `page-${pageId}`);
    p.classList.toggle('hidden', p.id !== `page-${pageId}`);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  switch (pageId) {
    case 'home':      renderHomeAll();   break;
    case 'inventory': renderInventory(); break;
    case 'allplayer': renderAllPlayer(); break;
  }
  document.getElementById('navMenu').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHomeAll() {
  renderDailyBar();
  renderRates();
  renderProgress();
  renderHomeHistory();
}

/* ── 16. EVENT LISTENERS ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (!link.dataset.page) return; // biarkan link asli (misal Admin) jalan normal
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
});

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });

  document.getElementById('btnPull').addEventListener('click', doPull);

  document.getElementById('btnSeeAllHistory').addEventListener('click', () => navigateTo('inventory'));

  document.getElementById('inventorySearch').addEventListener('input', renderInventory);
  document.getElementById('inventoryFilterRarity').addEventListener('change', renderInventory);
  document.getElementById('inventorySort').addEventListener('change', renderInventory);

  document.getElementById('btnRedeem').addEventListener('click', processRedeem);
  document.getElementById('redeemCode').addEventListener('keydown', e => {
    if (e.key === 'Enter') processRedeem();
  });

  document.getElementById('closeCardDetail').addEventListener('click', () => {
    document.getElementById('modalCardDetail').classList.add('hidden');
  });
  document.getElementById('closePlayerHistory').addEventListener('click', () => {
    document.getElementById('modalPlayerHistory').classList.add('hidden');
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });

  document.getElementById('fullscreenClose').addEventListener('click', () => {
    document.getElementById('fullscreenOverlay').classList.add('hidden');
  });
  document.getElementById('fullscreenOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('fullscreenOverlay')) {
      document.getElementById('fullscreenOverlay').classList.add('hidden');
    }
  });

  document.getElementById('btnExport').addEventListener('click', () => {
    document.getElementById('modalPinCreate').classList.remove('hidden');
    document.getElementById('pinCreateInput').value  = '';
    document.getElementById('pinConfirmInput').value = '';
    document.getElementById('pinCreateError').classList.add('hidden');
  });
  document.getElementById('cancelPinCreate').addEventListener('click', () => {
    document.getElementById('modalPinCreate').classList.add('hidden');
  });
  document.getElementById('confirmPinCreate').addEventListener('click', () => {
    const pin1  = document.getElementById('pinCreateInput').value.trim();
    const pin2  = document.getElementById('pinConfirmInput').value.trim();
    const errEl = document.getElementById('pinCreateError');
    if (!pin1 || pin1.length < 4) {
      errEl.textContent = 'PIN minimal 4 karakter.'; errEl.classList.remove('hidden'); return;
    }
    if (pin1 !== pin2) {
      errEl.textContent = 'Konfirmasi PIN tidak cocok.'; errEl.classList.remove('hidden'); return;
    }
    const data    = gatherAllData();
    const encoded = encodeData(data, pin1);
    const ts      = new Date().toISOString().slice(0,10);
    downloadFile(encoded, `footcard-backup-${ts}.fcg`);
    document.getElementById('modalPinCreate').classList.add('hidden');
    showToast('Data berhasil diekspor!', '📤');
  });

  document.getElementById('btnImport').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });
  document.getElementById('importFileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      state.pendingImportData = evt.target.result;
      document.getElementById('modalPinImport').classList.remove('hidden');
      document.getElementById('pinImportInput').value = '';
      document.getElementById('pinImportError').classList.add('hidden');
    };
    reader.readAsText(file);
    e.target.value = '';
  });
  document.getElementById('cancelPinImport').addEventListener('click', () => {
    document.getElementById('modalPinImport').classList.add('hidden');
    state.pendingImportData = null;
  });
  document.getElementById('confirmPinImport').addEventListener('click', () => {
    const pin   = document.getElementById('pinImportInput').value.trim();
    const errEl = document.getElementById('pinImportError');
    if (!pin) { errEl.textContent = 'Masukkan PIN.'; errEl.classList.remove('hidden'); return; }
    const decoded = decodeData(state.pendingImportData, pin);
    if (!decoded || !decoded.version) {
      errEl.textContent = 'PIN salah atau file rusak.';
      errEl.classList.remove('hidden'); return;
    }
    restoreAllData(decoded);
    document.getElementById('modalPinImport').classList.add('hidden');
    state.pendingImportData = null;
    showToast('Data berhasil diimport!', '📥');
    setTimeout(() => location.reload(), 1200);
  });

  document.getElementById('btnReset').addEventListener('click', () => {
    document.getElementById('modalConfirmReset').classList.remove('hidden');
  });
  document.getElementById('cancelReset').addEventListener('click', () => {
    document.getElementById('modalConfirmReset').classList.add('hidden');
  });
  document.getElementById('confirmReset').addEventListener('click', () => {
    document.getElementById('modalConfirmReset').classList.add('hidden');
    resetAllProgress();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('fullscreenOverlay').classList.add('hidden');
      closeAllModals();
    }
  });

  renderHomeAll();
});