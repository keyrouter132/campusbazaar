// import { useState, useEffect } from 'react';
// import { supabase } from "../../supabaseClient";

// export default function ShopSettings() {
//   const [shop, setShop] = useState(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [logoFile, setLogoFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchShop();
//   }, []);

//   async function fetchShop() {
//     const { data: { user } } = await supabase.auth.getUser();
//     const { data } = await supabase.from("shops").select("*").eq("seller_id", user.id).single();
//     if (data) {
//       setShop(data);
//       setName(data.name);
//       setDescription(data.description || '');
//     }
//   }

//   async function handleUpdate(e) {
//     e.preventDefault();
//     setSaving(true);
//     let finalUrl = shop.shop_urls;

//     if (logoFile) {
//       const fileName = `logo-${shop.id}-${Date.now()}`;
//       const { data: uploadData } = await supabase.storage
//         .from('shop-logos')
//         .upload(fileName, logoFile);

//       if (uploadData) {
//         const { data: urlData } = supabase.storage.from('shop-logos').getPublicUrl(fileName);
//         finalUrl = urlData.publicUrl;
//       }
//     }

//     const { error } = await supabase
//       .from("shops")
//       .update({ name, description, shop_urls: finalUrl })
//       .eq("id", shop.id);

//     if (error) setMessage("Error: " + error.message);
//     else setMessage("Shop updated successfully!");
//     setSaving(false);
//   }

//   return (
//     <div className="shop-settings">
//       <h2>Shop Settings</h2>
//       <form onSubmit={handleUpdate}>
//         <div className="logo-upload">
//           <label>Shop Logo</label>
//           <img src={shop?.shop_urls || "/placeholder-logo.png"} alt="Logo" width="100" />
//           <input type="file" onChange={(e) => setLogoFile(e.target.files[0])} />
//         </div>
//         <input value={name} onChange={e => setName(e.target.value)} placeholder="Shop Name" />
//         <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
//         <button type="submit" disabled={saving}>Save Changes</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { supabase } from "../../supabaseClient";

const InputGroup = ({ label, children, hint }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label style={{ fontSize: "13px", fontWeight: 600, color: "#3D2B2B" }}>{label}</label>
    {children}
    {hint && <span style={{ fontSize: "12px", color: "#aaa" }}>{hint}</span>}
  </div>
);

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1.5px solid #EDE8E3",
  fontSize: "14px",
  color: "#2C1810",
  background: "#fff",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
  width: "100%",
  boxSizing: "border-box",
};

const CATEGORIES = ["Electronics", "Clothing", "Books", "Food & Beverages", "Stationery", "Accessories", "Sports", "Art & Craft", "Services", "Other"];

export default function ShopSettings() {
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', category: '', shop_urls: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchShop(); }, []);

  async function fetchShop() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("shops").select("*").eq("seller_id", user.id).single();
    if (data) {
      setShop(data);
      setForm({ name: data.name || '', description: data.description || '', category: data.Category || '', shop_urls: data.shop_urls || '' });
    }
    setLoading(false);
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      let finalUrl = form.shop_urls;

      if (logoFile) {
        const fileName = `logo-${shop.id}-${Date.now()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('shop-logos')
          .upload(fileName, logoFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('shop-logos').getPublicUrl(fileName);
        finalUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from("shops")
        .update({ name: form.name, description: form.description, Category: form.category, shop_urls: finalUrl })
        .eq("id", shop.id);

      if (error) throw error;
      setMessage({ type: "success", text: "Shop updated successfully!" });
      setShop(s => ({ ...s, name: form.name, description: form.description, shop_urls: finalUrl }));
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Update failed" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
      <span style={{ color: "#888", fontSize: "14px" }}>Loading shop settings...</span>
    </div>
  );

  const displayLogo = logoPreview || form.shop_urls;

  return (
    <div style={{ maxWidth: "680px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Logo Upload Card */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #EDE8E3", padding: "24px" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#2C1810", marginBottom: "18px" }}>Shop Logo</div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "90px", height: "90px", borderRadius: "14px",
              background: displayLogo ? "transparent" : "#F7F4F0",
              border: "2px dashed #C0392B",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
            }}>
              {displayLogo
                ? <img src={displayLogo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "28px" }}>🏪</span>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#3D2B2B",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "8px",
              }}>
                {logoFile ? "Change Logo" : "Upload Logo"}
                <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: "none" }} />
              </label>
              {logoFile && <div style={{ fontSize: "12px", color: "#22764A", fontWeight: 500 }}>✓ {logoFile.name}</div>}
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>PNG, JPG up to 5MB. Recommended: 200×200px</div>

              <div style={{ marginTop: "10px" }}>
                <InputGroup label="Or paste logo URL">
                  <input
                    style={inputStyle}
                    name="shop_urls"
                    value={form.shop_urls}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    onFocus={e => e.target.style.borderColor = "#C0392B"}
                    onBlur={e => e.target.style.borderColor = "#EDE8E3"}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Details Card */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #EDE8E3", padding: "24px" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#2C1810", marginBottom: "18px" }}>Shop Information</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InputGroup label="Shop Name" hint="This is how buyers will see your shop">
              <input
                style={inputStyle}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Neha's Stationery"
                onFocus={e => e.target.style.borderColor = "#C0392B"}
                onBlur={e => e.target.style.borderColor = "#EDE8E3"}
              />
            </InputGroup>

            <InputGroup label="Description" hint="Tell buyers what you sell">
              <textarea
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical", lineHeight: 1.6 }}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="We sell handmade bookmarks and stationery..."
                onFocus={e => e.target.style.borderColor = "#C0392B"}
                onBlur={e => e.target.style.borderColor = "#EDE8E3"}
              />
            </InputGroup>

            <InputGroup label="Category">
              <select
                style={inputStyle}
                name="category"
                value={form.category}
                onChange={handleChange}
                onFocus={e => e.target.style.borderColor = "#C0392B"}
                onBlur={e => e.target.style.borderColor = "#EDE8E3"}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </InputGroup>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: "12px 16px", borderRadius: "8px",
            background: message.type === "success" ? "#EDFBF3" : "#FEF0EE",
            color: message.type === "success" ? "#22764A" : "#C0392B",
            fontSize: "14px", fontWeight: 500,
          }}>
            {message.type === "success" ? "✓ " : "⚠ "}{message.text}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "13px",
            background: saving ? "#aaa" : "#3D2B2B",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.background = "#C0392B"; }}
          onMouseLeave={e => { if (!saving) e.currentTarget.style.background = "#3D2B2B"; }}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}