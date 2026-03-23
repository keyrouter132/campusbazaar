import { useState, useEffect } from 'react'
import { createShop, getMyShop, updateShop } from '../../services/shopService'
import { supabase } from '../../services/supabaseClient'

export default function CreateShop() {
  const [shop, setShop] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  // Temp login state
  const [tempUID, setTempUID] = useState('')
  const [tempPass, setTempPass] = useState('')

  useEffect(() => {
    loadShop()
  }, [])

  async function loadShop() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }
    setUser(user)
    const existing = await getMyShop(user.id)
    if (existing) {
      setShop(existing)
      setName(existing.name)
      setDescription(existing.description || '')
    }
    setLoading(false)
  }

  // Temp login function
  async function handleTempLogin(e) {
    e.preventDefault()
    const email = `${tempUID}@campusbazaar.edu`
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: tempPass })
    if (error) {
      setMessage('Login error: ' + error.message)
      return
    }
    setUser(data.user)
    setMessage('Logged in as ' + data.user.email)
    loadShop()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        setMessage('Error: You must be logged in.')
        setSaving(false)
        return
      }

      if (shop) {
        const updated = await updateShop(shop.id, { name, description })
        setShop(updated)
        setMessage('Shop updated successfully!')
      } else {
        const newShop = await createShop(currentUser.id, name, description)
        setShop(newShop)
        setMessage('Shop created successfully!')
      }
    } catch (err) {
      setMessage('Error: ' + err.message)
    }

    setSaving(false)
  }

  if (loading) return <p>Loading...</p>

  // Show temp login if not logged in
  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '0 1rem' }}>
        <h2>Test Login</h2>
        <form onSubmit={handleTempLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Enter UID (e.g. 2305000)"
            value={tempUID}
            onChange={e => setTempUID(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={tempPass}
            onChange={e => setTempPass(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', borderRadius: '6px', background: '#1E40AF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Login & Continue
          </button>
          {message && <p style={{ color: 'red' }}>{message}</p>}
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>
      <p style={{ color: '#888', fontSize: '13px' }}>Logged in as: {user.email}</p>
      <h2>{shop ? 'Edit Your Shop' : 'Create Your Shop'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter shop name"
            required
            style={{ display: 'block', width: '100%', marginTop: '4px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What do you sell?"
            rows={4}
            style={{ display: 'block', width: '100%', marginTop: '4px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{ padding: '10px', borderRadius: '6px', background: '#1E40AF', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {saving ? 'Saving...' : shop ? 'Update Shop' : 'Create Shop'}
        </button>

        {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
      </form>
    </div>
  )
}