import { useState, useRef } from "react";

const COLORS = {
  bg: "#0f0e0c",
  card: "#1a1814",
  cardBorder: "#2e2a22",
  gold: "#d4a843",
  goldLight: "#f0c96a",
  amber: "#b87333",
  green: "#4caf7d",
  red: "#e05c5c",
  text: "#f0ead8",
  muted: "#8a7f6e",
  accent: "#e8c070",
};

const NAV_ITEMS = [
  { id: "inventory", icon: "📦", label: "ዕቃ ምዝገባ" },
  { id: "finance", icon: "💰", label: "ወጪ & ትርፍ" },
  { id: "hr", icon: "👥", label: "ሰራተኞች" },
  { id: "social", icon: "🔗", label: "ሶሻል ሚዲያ" },
];

const EXPENSE_CATEGORIES = [
  { key: "purchase", label: "የግዢ ዋጋ", icon: "🛒" },
  { key: "rent", label: "የቤት ኪራይ", icon: "🏠" },
  { key: "food", label: "የምግብ ወጪ", icon: "🍽️" },
  { key: "transport", label: "የመኪና ኪራይ", icon: "🚗" },
  { key: "labor", label: "የጫኝ/አውራጅ", icon: "💪" },
];

export default function App() {
  const [tab, setTab] = useState("inventory");

  // Inventory State
  const [items, setItems] = useState([
    { id: 1, name: "ሽሮ ወጥ (1kg)", qty: 50, type: "ምግብ", priority: true, image: null },
    { id: 2, name: "ቅቤ (500g)", qty: 30, type: "ምግብ", priority: false, image: null },
    { id: 3, name: "ቡና (250g)", qty: 80, type: "ጠጥ", priority: true, image: null },
  ]);
  const [newItem, setNewItem] = useState({ name: "", qty: "", type: "", priority: false, image: null });
  const [showAddItem, setShowAddItem] = useState(false);
  const fileRef = useRef();

  // Finance State
  const [expenses, setExpenses] = useState({ purchase: "", rent: "", food: "", transport: "", labor: "" });
  const [sellPrice, setSellPrice] = useState("");
  const [qty, setQty] = useState("");

  // HR State
  const [employees, setEmployees] = useState([
    { id: 1, name: "አበበ ጎሳዬ", role: "ሻጭ" },
    { id: 2, name: "ሰላም ተክሉ", role: "ጠባቂ" },
  ]);
  const [newEmp, setNewEmp] = useState({ name: "", role: "" });
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  // Social State
  const [links, setLinks] = useState([
    { id: 1, platform: "facebook", url: "https://facebook.com/", label: "Facebook ገጽ" },
    { id: 2, platform: "telegram", url: "https://t.me/", label: "Telegram ቻናል" },
  ]);
  const [newLink, setNewLink] = useState({ platform: "facebook", url: "", label: "" });

  // Finance calc
  const totalCost = Object.values(expenses).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const totalRevenue = (parseFloat(sellPrice) || 0) * (parseFloat(qty) || 1);
  const profit = totalRevenue - totalCost;

  function addItem() {
    if (!newItem.name) return;
    setItems([...items, { ...newItem, id: Date.now(), qty: parseInt(newItem.qty) || 0 }]);
    setNewItem({ name: "", qty: "", type: "", priority: false, image: null });
    setShowAddItem(false);
  }

  function togglePriority(id) {
    setItems(items.map(i => i.id === id ? { ...i, priority: !i.priority } : i));
  }

  function deleteItem(id) {
    setItems(items.filter(i => i.id !== id));
  }

  function addEmployee() {
    if (!newEmp.name) return;
    setEmployees([...employees, { ...newEmp, id: Date.now() }]);
    setNewEmp({ name: "", role: "" });
  }

  function addNote() {
    if (!noteText.trim()) return;
    setNotes([{ id: Date.now(), text: noteText, date: new Date().toLocaleDateString("am-ET") }, ...notes]);
    setNoteText("");
  }

  function addLink() {
    if (!newLink.url) return;
    setLinks([...links, { ...newLink, id: Date.now() }]);
    setNewLink({ platform: "facebook", url: "", label: "" });
  }

  function handleImagePick(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setNewItem(n => ({ ...n, image: ev.target.result }));
    reader.readAsDataURL(file);
  }

  const platformIcons = { facebook: "📘", telegram: "✈️", instagram: "📸", tiktok: "🎵", other: "🔗" };
  const platformColors = { facebook: "#1877f2", telegram: "#229ed9", instagram: "#e1306c", tiktok: "#010101", other: COLORS.gold };

  const styles = {
    root: {
      fontFamily: "'Noto Serif Ethiopic', 'Georgia', serif",
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      maxWidth: 480,
      margin: "0 auto",
      paddingBottom: 80,
    },
    header: {
      background: `linear-gradient(135deg, #1a1510 0%, #2a1f0e 100%)`,
      borderBottom: `2px solid ${COLORS.gold}`,
      padding: "20px 20px 16px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 700,
      color: COLORS.goldLight,
      letterSpacing: 1,
      margin: 0,
    },
    headerSub: {
      fontSize: 11,
      color: COLORS.muted,
      marginTop: 2,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    nav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#12100e",
      borderTop: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      zIndex: 200,
    },
    navBtn: (active) => ({
      flex: 1,
      padding: "10px 4px 8px",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      color: active ? COLORS.goldLight : COLORS.muted,
      fontSize: 10,
      fontFamily: "inherit",
      borderTop: active ? `2px solid ${COLORS.gold}` : "2px solid transparent",
      transition: "all 0.2s",
    }),
    navIcon: { fontSize: 20 },
    section: { padding: "16px" },
    card: {
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 13,
      color: COLORS.gold,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    itemRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 0",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
    },
    itemImg: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: "#2a2620",
      objectFit: "cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
    },
    badge: (color) => ({
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: 20,
      fontSize: 10,
      padding: "2px 8px",
      fontWeight: 700,
    }),
    input: {
      width: "100%",
      background: "#0f0e0c",
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 8,
      padding: "10px 12px",
      color: COLORS.text,
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
    },
    btn: (variant = "primary") => ({
      background: variant === "primary" ? COLORS.gold : variant === "danger" ? COLORS.red + "22" : "#2a2620",
      color: variant === "primary" ? "#1a1200" : variant === "danger" ? COLORS.red : COLORS.text,
      border: variant === "danger" ? `1px solid ${COLORS.red}44` : "none",
      borderRadius: 8,
      padding: "10px 18px",
      fontFamily: "inherit",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      transition: "opacity 0.2s",
    }),
    statBox: {
      background: "#0f0e0c",
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 10,
      padding: "12px 14px",
      flex: 1,
    },
    statLabel: { fontSize: 11, color: COLORS.muted, marginBottom: 4 },
    statValue: (color) => ({ fontSize: 22, fontWeight: 700, color: color || COLORS.text }),
    row: { display: "flex", gap: 10, marginBottom: 10 },
    label: { fontSize: 12, color: COLORS.muted, marginBottom: 4, marginTop: 10, display: "block" },
    empRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.gold})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flexShrink: 0,
    },
    noteItem: {
      background: "#0f0e0c",
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 8,
      padding: "10px 12px",
      marginBottom: 8,
    },
    socialLink: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 14px",
      borderRadius: 10,
      background: "#0f0e0c",
      border: `1px solid ${COLORS.cardBorder}`,
      marginBottom: 8,
      textDecoration: "none",
      cursor: "pointer",
      transition: "border-color 0.2s",
    },
    checkbox: { width: 16, height: 16, accentColor: COLORS.gold, cursor: "pointer" },
  };

  return (
    <div style={styles.root}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Ethiopic:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🏪</span>
          <div>
            <h1 style={styles.headerTitle}>የንግድ አስተዳዳሪ</h1>
            <p style={styles.headerSub}>Business Manager · v1.0</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {/* ========== INVENTORY ========== */}
        {tab === "inventory" && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>📦</span> የዕቃ ዝርዝር
              <span style={{ marginLeft: "auto" }}>
                <button style={styles.btn()} onClick={() => setShowAddItem(v => !v)}>+ አክል</button>
              </span>
            </div>

            {/* Add Item Form */}
            {showAddItem && (
              <div style={{ ...styles.card, borderColor: COLORS.gold + "55" }}>
                <div style={styles.sectionTitle}>ዕቃ ምዝገባ</div>

                {/* Image picker */}
                <div style={{ marginBottom: 10, textAlign: "center" }}>
                  <div
                    onClick={() => fileRef.current.click()}
                    style={{
                      width: 80, height: 80, borderRadius: 10, background: "#2a2620",
                      border: `2px dashed ${COLORS.gold}55`, margin: "0 auto 8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", overflow: "hidden",
                    }}
                  >
                    {newItem.image
                      ? <img src={newItem.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 30 }}>📷</span>
                    }
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImagePick} />
                  <span style={{ fontSize: 11, color: COLORS.muted }}>ፎቶ ለመምረጥ ጫን</span>
                </div>

                <span style={styles.label}>የዕቃ ስም</span>
                <input style={styles.input} placeholder="ለምሳሌ፦ ሽሮ ወጥ (1kg)" value={newItem.name}
                  onChange={e => setNewItem(n => ({ ...n, name: e.target.value }))} />

                <div style={{ ...styles.row, marginTop: 8 }}>
                  <div style={{ flex: 1 }}>
                    <span style={styles.label}>ብዛት</span>
                    <input style={styles.input} type="number" placeholder="0" value={newItem.qty}
                      onChange={e => setNewItem(n => ({ ...n, qty: e.target.value }))} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={styles.label}>ዓይነት</span>
                    <input style={styles.input} placeholder="ምግብ/ጨርቅ..." value={newItem.type}
                      onChange={e => setNewItem(n => ({ ...n, type: e.target.value }))} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, marginBottom: 14 }}>
                  <input type="checkbox" style={styles.checkbox} checked={newItem.priority}
                    onChange={e => setNewItem(n => ({ ...n, priority: e.target.checked }))} id="pricheck" />
                  <label htmlFor="pricheck" style={{ fontSize: 13, color: COLORS.accent, cursor: "pointer" }}>
                    ⭐ ቅድሚያ ሊሸጥ ይገባዋል (Priority)
                  </label>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...styles.btn(), flex: 1 }} onClick={addItem}>✓ አስቀምጥ</button>
                  <button style={{ ...styles.btn("ghost"), flex: 1 }} onClick={() => setShowAddItem(false)}>ሰርዝ</button>
                </div>
              </div>
            )}

            {/* Priority items first */}
            {[...items].sort((a, b) => b.priority - a.priority).map(item => (
              <div key={item.id} style={{ ...styles.card, borderLeft: item.priority ? `3px solid ${COLORS.gold}` : undefined }}>
                <div style={styles.itemRow}>
                  <div style={styles.itemImg}>
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                      : "📦"
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                      {item.priority && <span style={{ color: COLORS.gold, marginRight: 4 }}>⭐</span>}
                      {item.name}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={styles.badge(COLORS.amber)}>ብዛት: {item.qty}</span>
                      {item.type && <span style={styles.badge(COLORS.muted)}>{item.type}</span>}
                      {item.priority && <span style={styles.badge(COLORS.gold)}>Priority</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button style={{ ...styles.btn("ghost"), padding: "4px 8px", fontSize: 12 }}
                      onClick={() => togglePriority(item.id)}>
                      {item.priority ? "⭐" : "☆"}
                    </button>
                    <button style={{ ...styles.btn("danger"), padding: "4px 8px", fontSize: 12 }}
                      onClick={() => deleteItem(item.id)}>✕</button>
                  </div>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: COLORS.muted }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
                <div>ምንም ዕቃ አልተመዘገበም</div>
              </div>
            )}
          </div>
        )}

        {/* ========== FINANCE ========== */}
        {tab === "finance" && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}><span>💰</span> የወጪና ትርፍ ስሌት</div>

            {/* Stats */}
            <div style={{ ...styles.row, marginBottom: 14 }}>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>ጠቅላላ ወጪ</div>
                <div style={styles.statValue(COLORS.red)}>{totalCost.toLocaleString()} ብር</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>ጠቅላላ ትርፍ</div>
                <div style={styles.statValue(profit >= 0 ? COLORS.green : COLORS.red)}>
                  {profit >= 0 ? "+" : ""}{profit.toLocaleString()} ብር
                </div>
              </div>
            </div>

            {/* Profit prediction banner */}
            {profit !== 0 && (
              <div style={{
                background: profit >= 0 ? COLORS.green + "18" : COLORS.red + "18",
                border: `1px solid ${profit >= 0 ? COLORS.green : COLORS.red}44`,
                borderRadius: 10, padding: "12px 14px", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 24 }}>{profit >= 0 ? "📈" : "📉"}</span>
                <div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>የትርፍ ትንቢት</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: profit >= 0 ? COLORS.green : COLORS.red }}>
                    {profit >= 0
                      ? `በዚህ ዋጋ ብትሸጠው ${profit.toLocaleString()} ብር ታተርፋለህ!`
                      : `ጥንቃቄ! ${Math.abs(profit).toLocaleString()} ብር ኪሳራ አለ።`
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Expense Inputs */}
            <div style={styles.card}>
              <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, marginBottom: 12 }}>📋 የወጪ ምድቦች</div>
              {EXPENSE_CATEGORIES.map(cat => (
                <div key={cat.key}>
                  <span style={styles.label}>{cat.icon} {cat.label}</span>
                  <input style={styles.input} type="number" placeholder="0 ብር"
                    value={expenses[cat.key]}
                    onChange={e => setExpenses(ex => ({ ...ex, [cat.key]: e.target.value }))} />
                </div>
              ))}
            </div>

            {/* Sell price */}
            <div style={styles.card}>
              <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, marginBottom: 12 }}>🏷️ የሽያጭ ዋጋ</div>
              <div style={styles.row}>
                <div style={{ flex: 2 }}>
                  <span style={styles.label}>የሽያጭ ዋጋ (በብር)</span>
                  <input style={styles.input} type="number" placeholder="0" value={sellPrice}
                    onChange={e => setSellPrice(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={styles.label}>ብዛት</span>
                  <input style={styles.input} type="number" placeholder="1" value={qty}
                    onChange={e => setQty(e.target.value)} />
                </div>
              </div>
              <div style={{ marginTop: 10, padding: "10px 12px", background: "#0f0e0c", borderRadius: 8, fontSize: 13 }}>
                <div style={{ color: COLORS.muted, marginBottom: 2 }}>ቀመር: Total_Cost = Purchase + Σ(ሌሎች ወጪዎች)</div>
                <div style={{ color: COLORS.text }}>
                  <strong style={{ color: COLORS.gold }}>{totalCost.toLocaleString()} ብር</strong> ጠቅላላ ወጪ ×
                  {qty || 1} ×  ዋጋ {sellPrice || 0} ብር = <strong style={{ color: profit >= 0 ? COLORS.green : COLORS.red }}>{profit.toLocaleString()} ብር ትርፍ</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== HR ========== */}
        {tab === "hr" && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}><span>👥</span> ሰራተኞች ({employees.length})</div>

            {/* Employee list */}
            <div style={styles.card}>
              {employees.map(emp => (
                <div key={emp.id} style={styles.empRow}>
                  <div style={styles.avatar}>{emp.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{emp.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>{emp.role}</div>
                  </div>
                  <span style={styles.badge(COLORS.amber)}>{emp.role}</span>
                </div>
              ))}

              {/* Add employee */}
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>+ አዲስ ሰራተኛ</div>
                <div style={styles.row}>
                  <input style={{ ...styles.input, flex: 2 }} placeholder="ስም" value={newEmp.name}
                    onChange={e => setNewEmp(n => ({ ...n, name: e.target.value }))} />
                  <input style={{ ...styles.input, flex: 1 }} placeholder="ድርሻ" value={newEmp.role}
                    onChange={e => setNewEmp(n => ({ ...n, role: e.target.value }))} />
                </div>
                <button style={{ ...styles.btn(), marginTop: 8, width: "100%" }} onClick={addEmployee}>አክል ✓</button>
              </div>
            </div>

            {/* Digital Notepad */}
            <div style={styles.sectionTitle}><span>📝</span> ማሻሻያ ማስታወሻ</div>
            <div style={styles.card}>
              <textarea
                style={{
                  ...styles.input,
                  minHeight: 80,
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
                placeholder="ዛሬ በስራ ላይ የታዘብከውን ጻፍ..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
              />
              <button style={{ ...styles.btn(), marginTop: 8, width: "100%" }} onClick={addNote}>💾 አስቀምጥ</button>
            </div>

            {notes.map(note => (
              <div key={note.id} style={styles.noteItem}>
                <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>📅 {note.date}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{note.text}</div>
              </div>
            ))}

            {notes.length === 0 && (
              <div style={{ textAlign: "center", padding: 20, color: COLORS.muted, fontSize: 13 }}>
                ምንም ማስታወሻ የለም
              </div>
            )}
          </div>
        )}

        {/* ========== SOCIAL ========== */}
        {tab === "social" && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}><span>🔗</span> ማህበራዊ ሚዲያ</div>

            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{ ...styles.socialLink, borderColor: (platformColors[link.platform] || COLORS.gold) + "55" }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: (platformColors[link.platform] || COLORS.gold) + "22",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
                }}>
                  {platformIcons[link.platform] || "🔗"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{link.label || link.platform}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, wordBreak: "break-all" }}>{link.url}</div>
                </div>
                <span style={{ fontSize: 18, color: COLORS.muted }}>→</span>
              </a>
            ))}

            {/* Add link */}
            <div style={{ ...styles.card, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700, marginBottom: 10 }}>+ አዲስ ሊንክ አክል</div>

              <span style={styles.label}>Platform</span>
              <select
                style={{ ...styles.input, marginBottom: 8 }}
                value={newLink.platform}
                onChange={e => setNewLink(n => ({ ...n, platform: e.target.value }))}
              >
                <option value="facebook">📘 Facebook</option>
                <option value="telegram">✈️ Telegram</option>
                <option value="instagram">📸 Instagram</option>
                <option value="tiktok">🎵 TikTok</option>
                <option value="other">🔗 ሌላ</option>
              </select>

              <span style={styles.label}>መለያ ስም</span>
              <input style={{ ...styles.input, marginBottom: 8 }} placeholder="ለምሳሌ: የሱቄ Facebook ገጽ"
                value={newLink.label} onChange={e => setNewLink(n => ({ ...n, label: e.target.value }))} />

              <span style={styles.label}>ሊንክ (URL)</span>
              <input style={{ ...styles.input, marginBottom: 12 }} placeholder="https://..."
                value={newLink.url} onChange={e => setNewLink(n => ({ ...n, url: e.target.value }))} />

              <button style={{ ...styles.btn(), width: "100%" }} onClick={addLink}>✓ አስቀምጥ</button>
            </div>

            <div style={{
              marginTop: 14, padding: "12px 14px", background: COLORS.card,
              border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10,
              fontSize: 12, color: COLORS.muted, lineHeight: 1.8,
            }}>
              💡 <strong style={{ color: COLORS.accent }}>ጠቃሚ ምክር:</strong> ሊንኮቹን ጋርተው ዕቃዎቻቸሁን ለማስተዋወቅ፣ ፎቶዎቻቸሁን ወደ ሶሻል ሚዲያ ፖስት አድርጉ።
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav style={styles.nav}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} style={styles.navBtn(tab === item.id)} onClick={() => setTab(item.id)}>
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
