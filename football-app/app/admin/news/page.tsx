"use client"

import { useState, useEffect, useRef } from "react"

interface NewsItem {
  _id: string
  title: string
  category: string
  author: string
  description: string
  date: string
  image?: string
  createdAt?: string
}

const categories = ["News", "Transfer", "Match", "Injury", "Analysis", "Rumor", "Other"]

export default function NewsCrud() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<NewsItem>>({})
  const imageRef = useRef<HTMLInputElement>(null)
  const editImageRef = useRef<HTMLInputElement>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("")
  
  // Fetch all news
  const fetchNews = async () => {
    setLoading(true)
    setError("")
    try {
      const queryParams = new URLSearchParams()
      if (filterCategory !== "all") queryParams.set("category", filterCategory)
      if (filterDate) queryParams.set("date", filterDate)
      const response = await fetch(`http://localhost:5000/api/news?${queryParams.toString()}`)
      if (!response.ok) throw new Error("Could not fetch news")
      const data = await response.json()
      setNews(data)
    } catch (err: any) {
      setError(err.message || "Error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line
  }, [filterCategory, filterDate])

  // Create news
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    const form = e.currentTarget
    const formData = new FormData(form)
    if (imageRef.current?.files?.[0]) {
      formData.set("image", imageRef.current.files[0])
    }
    try {
      const response = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
      if (!response.ok) throw new Error("Failed to create news")
      setSuccess("News created successfully!")
      form.reset()
      if (imageRef.current) imageRef.current.value = ""
      fetchNews()
    } catch (err: any) {
      setError(err.message || "Error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Edit news
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    if (!editingId) return
    const form = e.currentTarget
    const formData = new FormData(form)
    if (editImageRef.current?.files?.[0]) {
      formData.set("image", editImageRef.current.files[0])
    }
    try {
      const response = await fetch(`http://localhost:5000/api/news/${editingId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
      if (!response.ok) throw new Error("Failed to update news")
      setSuccess("News updated!")
      setEditingId(null)
      setEditData({})
      fetchNews()
    } catch (err: any) {
      setError(err.message || "Error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Delete news
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this news?")) return
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
      if (!response.ok) throw new Error("Failed to delete news")
      setSuccess("News deleted!")
      fetchNews()
    } catch (err: any) {
      setError(err.message || "Error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Set up edit form
  const startEdit = (item: NewsItem) => {
    setEditingId(item._id)
    setEditData({
      title: item.title,
      category: item.category,
      author: item.author,
      description: item.description,
      date: item.date?.slice(0, 10),
      image: item.image
    })
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create News</h2>
      {/* Create form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input name="title" className="w-full border px-2 py-1 rounded" placeholder="Title" required />
        <select name="category" className="w-full border px-2 py-1 rounded" required>
          <option value="">Choose Category</option>
          {categories.map(c => (<option value={c} key={c}>{c}</option>))}
        </select>
        <input name="author" className="w-full border px-2 py-1 rounded" placeholder="Author" required />
        <textarea name="description" className="w-full border px-2 py-1 rounded" placeholder="Description" required />
        <input name="date" type="date" className="w-full border px-2 py-1 rounded" />
        <input name="image" type="file" accept="image/*" ref={imageRef} className="w-full" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create News"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>

      {/* Filter section */}
      <div className="mt-8 mb-4 flex flex-col md:flex-row gap-2">
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-1/2"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (<option value={c} key={c}>{c}</option>))}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="border px-2 py-1 rounded w-full md:w-1/2"
          placeholder="Filter by date"
        />
      </div>

      {/* List */}
      <h2 className="text-lg font-semibold mb-2">News List</h2>
      {loading ? <div>Loading...</div> : null}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="space-y-4">
        {news.length === 0 && <div>No news found.</div>}
        {news.map(item => (
          editingId === item._id ? (
            // Edit form
            <form key={item._id} onSubmit={handleEditSubmit} encType="multipart/form-data" className="space-y-2 border rounded p-2 bg-blue-50">
              <input name="title" className="w-full border px-2 py-1 rounded" defaultValue={editData.title} required />
              <select name="category" className="w-full border px-2 py-1 rounded" defaultValue={editData.category} required>
                {categories.map(c => (<option value={c} key={c}>{c}</option>))}
              </select>
              <input name="author" className="w-full border px-2 py-1 rounded" defaultValue={editData.author} required />
              <textarea name="description" className="w-full border px-2 py-1 rounded" defaultValue={editData.description} required />
              <input name="date" type="date" className="w-full border px-2 py-1 rounded" defaultValue={editData.date} />
              <input name="image" type="file" accept="image/*" ref={editImageRef} className="w-full" />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={item._id} className="border rounded p-2 flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50">
              <div className="flex-1">
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.category} &bull; {item.author}</div>
                <div className="text-xs text-gray-500">{item.date?.slice(0, 10)}</div>
                <div className="mt-1">{item.description}</div>
                {item.image && (
                  <img src={item.image} alt="news" className="mt-2 rounded max-w-xs max-h-32" />
                )}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}