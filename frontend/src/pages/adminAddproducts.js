/*import { useState ,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"


function AdminAddProduct() {
  
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [products,setProducts] = useState([])
  const [deleteId, setDeleteId] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const res = await API.get("/products")
    setProducts(res.data)
  }

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "admin") {
      alert("Access Denied. Admins only.")
      navigate("/")
    }
  }, [navigate])

  const addProduct = async () => {
    const token = localStorage.getItem("token")

    try {

      await API.post("/products", {
        name,
        category,
        price
      },
     {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert("Product Added")

    } catch (error) {

      alert("Error adding product")

    }
}
  
const deleteProduct = async () => {

    await API.delete(`/products/${deleteId}`)

    alert("Product Deleted")

  }

  return (

    <div>

      <h2>Add Product</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

      <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />

      <input placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />

      <button onClick={addProduct}>
        Add Product
      </button>
    <hr/>

    <h2>Delete Product</h2>

      <select onChange={(e)=>setDeleteId(e.target.value)}>

        <option>Select Product</option>

        {products.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}

      </select>

      <button onClick={deleteProduct}>
        Delete Product
      </button>

    </div>

  )

}

export default AdminAddProduct*/


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import { useToast } from "../context/ToastContext"
import Footer from "../components/footer"

const CAT_ICONS = { bat: "🏏", ball: "🔴", pad: "🦺", glove: "🧤", helmet: "⛑" }

function AdminAddProduct() {
  const [activeTab, setActiveTab] = useState("add")
  const [products, setProducts] = useState([])

  // Add
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")

  // Update (inline tab)
  const [updateId, setUpdateId] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updateCategory, setUpdateCategory] = useState("")
  const [updatePrice, setUpdatePrice] = useState("")
  const [showUpdateFields, setShowUpdateFields] = useState(false)

  // Delete
  const [deleteId, setDeleteId] = useState("")
  const [deletePreview, setDeletePreview] = useState(null)

  // Modal edit (from table)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalId, setModalId] = useState(null)
  const [modalName, setModalName] = useState("")
  const [modalCategory, setModalCategory] = useState("")
  const [modalPrice, setModalPrice] = useState("")

  const navigate = useNavigate()
  const showToast = useToast()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "admin") {
      showToast("Access Denied. Admins only.", "error")
      navigate("/")
    }
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await API.get("/products")
      const data = res.data
      setProducts(Array.isArray(data) ? data : data.products || data.data || [])
    } catch { showToast("Failed to load products", "error") }
  }

  /* ── ADD ── */
  const handleAdd = async () => {
    if (!name || !category || !price) { showToast("Please fill all fields", "error"); return }
    try {
      await API.post("/products", { name, category, price }, { headers: { Authorization: `Bearer ${token}` } })
      showToast(`"${name}" added successfully!`)
      setName(""); setCategory(""); setPrice("")
      loadProducts()
    } catch { showToast("Error adding product", "error") }
  }

  /* ── UPDATE (inline) ── */
  const handleUpdateSelect = (id) => {
    setUpdateId(id)
    if (!id) { setShowUpdateFields(false); return }
    const p = products.find(x => x._id === id)
    if (p) {
      setUpdateName(p.name); setUpdateCategory(p.category); setUpdatePrice(p.price)
      setShowUpdateFields(true)
    }
  }

  const handleUpdate = async () => {
    if (!updateId) { showToast("Select a product first", "error"); return }
    if (!updateName || !updateCategory || !updatePrice) { showToast("Please fill all fields", "error"); return }
    try {
      await API.put(`/products/${updateId}`, { name: updateName, category: updateCategory, price: updatePrice }, { headers: { Authorization: `Bearer ${token}` } })
      showToast(`"${updateName}" updated successfully!`)
      setUpdateId(""); setShowUpdateFields(false)
      loadProducts()
    } catch { showToast("Error updating product", "error") }
  }

  /* ── DELETE ── */
  const handleDeleteSelect = (id) => {
    setDeleteId(id)
    setDeletePreview(id ? products.find(p => p._id === id) : null)
  }

  const handleDelete = async () => {
    if (!deleteId) { showToast("Please select a product", "error"); return }
    try {
      await API.delete(`/products/${deleteId}`, { headers: { Authorization: `Bearer ${token}` } })
      showToast(`Product deleted`, "error")
      setDeleteId(""); setDeletePreview(null)
      loadProducts()
    } catch { showToast("Error deleting product", "error") }
  }

  /* ── QUICK DELETE from table ── */
  const quickDelete = async (id, pName) => {
    if (!window.confirm(`Delete "${pName}"?`)) return
    try {
      await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      showToast(`"${pName}" deleted`, "error")
      loadProducts()
    } catch { showToast("Error deleting product", "error") }
  }

  /* ── MODAL EDIT from table ── */
  const openModal = (p) => {
    setModalId(p._id); setModalName(p.name); setModalCategory(p.category); setModalPrice(p.price)
    setModalOpen(true)
  }
  const closeModal = () => { setModalOpen(false); setModalId(null) }

  const saveModal = async () => {
    if (!modalName || !modalCategory || !modalPrice) { showToast("Please fill all fields", "error"); return }
    try {
      await API.put(`/products/${modalId}`, { name: modalName, category: modalCategory, price: modalPrice }, { headers: { Authorization: `Bearer ${token}` } })
      showToast(`"${modalName}" updated successfully!`)
      closeModal(); loadProducts()
    } catch { showToast("Error updating product", "error") }
  }

  const tabs = [
    { key: "add", icon: "➕", label: "Add Product" },
    { key: "update", icon: "✏️", label: "Update Product" },
    { key: "delete", icon: "🗑", label: "Delete Product" },
    { key: "all", icon: "📋", label: "All Products" },
  ]

  return (
    <>
      {/* ── ADMIN HERO ── */}
      <div className="admin-hero">
        <div className="admin-hero-inner">
          <h1>Admin <em>Control Panel</em></h1>
          <p>Manage products, inventory, and store settings from one place.</p>
        </div>
      </div>

      {/* ── TABS BAR ── */}
      <div className="admin-tabs-bar">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`admin-tab${activeTab === t.key ? " active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: ADD ── */}
      {activeTab === "add" && (
        <div className="admin-panel fade-in">
          <div style={{ maxWidth: 520 }}>
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-icon green">➕</div>
                <div>
                  <div className="admin-card-title">Add New Product</div>
                  <div className="admin-card-subtitle">Add a cricket product to the store</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input className="form-input" placeholder="e.g. SG Optiplex Bat" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" placeholder="bat / ball / pad / glove / helmet" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input type="number" className="form-input" placeholder="e.g. 2499" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <button className="form-submit" onClick={handleAdd}>Add Product</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: UPDATE ── */}
      {activeTab === "update" && (
        <div className="admin-panel fade-in">
          <div style={{ maxWidth: 580 }}>
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-icon update-icon">✏️</div>
                <div>
                  <div className="admin-card-title">Update Product</div>
                  <div className="admin-card-subtitle">Edit name, category, or price of any product</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Select Product to Update</label>
                <select className="admin-select" value={updateId} onChange={e => handleUpdateSelect(e.target.value)}>
                  <option value="">— Choose a product —</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name} — ₹{Number(p.price).toLocaleString("en-IN")}</option>
                  ))}
                </select>
              </div>

              {showUpdateFields && (
                <>
                  <div style={{ height: 1, background: "var(--cream-dark)", margin: "0 0 1.5rem" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Product Name</label>
                      <input className="form-input" value={updateName} onChange={e => setUpdateName(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Category</label>
                      <input className="form-input" value={updateCategory} onChange={e => setUpdateCategory(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">Price (₹)</label>
                    <input type="number" className="form-input" value={updatePrice} onChange={e => setUpdatePrice(e.target.value)} />
                  </div>
                  <div style={{ background: "var(--cream)", borderRadius: "var(--radius)", padding: "12px 16px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--cream-dark)" }}>
                    <span style={{ fontSize: 28 }}>{CAT_ICONS[updateCategory?.toLowerCase()] || "🏏"}</span>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--mist)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Editing</div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--charcoal)" }}>{updateName}</div>
                    </div>
                  </div>
                  <button className="form-submit" style={{ background: "var(--forest-mid)" }} onClick={handleUpdate}>Save Changes</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: DELETE ── */}
      {activeTab === "delete" && (
        <div className="admin-panel fade-in">
          <div style={{ maxWidth: 520 }}>
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-icon red">🗑</div>
                <div>
                  <div className="admin-card-title">Delete Product</div>
                  <div className="admin-card-subtitle">Remove a product permanently from the store</div>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--mist)", marginBottom: "1rem" }}>
                This action cannot be undone. Please choose carefully.
              </p>
              <label className="form-label">Select Product</label>
              <select className="admin-select" value={deleteId} onChange={e => handleDeleteSelect(e.target.value)}>
                <option value="">— Choose a product —</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.name} — ₹{Number(p.price).toLocaleString("en-IN")}</option>
                ))}
              </select>
              {deletePreview && (
                <div style={{ display: "block", marginBottom: "1rem", padding: 14, background: "var(--cream)", borderRadius: "var(--radius)", border: "1px solid #EBC4C4" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--mist)", textTransform: "uppercase", letterSpacing: "0.06em" }}>About to delete</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--charcoal)", marginTop: 4 }}>{deletePreview.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--forest)", fontWeight: 600, marginTop: 2 }}>₹{Number(deletePreview.price).toLocaleString("en-IN")}</div>
                </div>
              )}
              <button className="delete-btn" onClick={handleDelete}>Delete Product</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ALL PRODUCTS ── */}
      {activeTab === "all" && (
        <div className="admin-panel fade-in">
          <div className="products-table-wrap">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td style={{ fontSize: 24 }}>{CAT_ICONS[p.category] || "🏏"}</td>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td><span className="table-cat-badge">{p.category}</span></td>
                    <td className="table-price">₹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td>
                      <div className="table-actions">
                        <button className="tbl-edit-btn" onClick={() => openModal(p)}>Edit</button>
                        <button className="tbl-del-btn" onClick={() => quickDelete(p._id, p.name)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {modalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <span>{CAT_ICONS[modalCategory] || "🏏"} {modalCategory}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input className="form-input" value={modalName} onChange={e => setModalName(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Category</label>
                  <input className="form-input" value={modalCategory} onChange={e => setModalCategory(e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Price (₹)</label>
                  <input type="number" className="form-input" value={modalPrice} onChange={e => setModalPrice(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              <button className="update-btn" onClick={saveModal}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default AdminAddProduct