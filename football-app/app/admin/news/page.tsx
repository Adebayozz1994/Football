"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import axios from "@/utils/axios"

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
  
  // Fetch all news (no filter in backend, fetch all for UI filtering)
  const fetchNews = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get("/news")
      setNews(res.data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error occurred")
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line
  }, [])

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
      await axios.post("/news", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
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
      await axios.put(`/news/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
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
      await axios.delete(`/news/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`
        }
      })
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

  // UI filtering (client-side)
  const filteredNews = news.filter(item => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesDate = !filterDate || item.date?.slice(0, 10) === filterDate
    return matchesCategory && matchesDate
  })

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white rounded shadow">
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
        {(filterCategory !== "all" || filterDate) && (
          <button
            type="button"
            onClick={() => { setFilterCategory("all"); setFilterDate(""); }}
            className="bg-gray-200 px-4 py-2 rounded text-sm"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* News List */}
      <h2 className="text-lg font-semibold mb-2">News List</h2>
      {loading ? <div>Loading...</div> : null}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length === 0 && <div className="col-span-full text-center text-gray-500">No news found.</div>}
        {filteredNews.map(item => (
          editingId === item._id ? (
            // Edit form
            <form key={item._id} onSubmit={handleEditSubmit} encType="multipart/form-data" className="col-span-full md:col-span-2 lg:col-span-1 space-y-2 border rounded p-2 bg-blue-50">
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
            <div
              key={item._id}
              className="relative flex flex-col border rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {item.image && (
                <div className="h-40 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    placeholder="blur"
                    blurDataURL="/placeholder.png" // Optional placeholder
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded font-semibold uppercase">{item.category}</span>
                  <span className="text-xs text-gray-500 ml-auto">{item.date?.slice(0, 10)}</span>
                </div>
                <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
                <div className="text-xs text-gray-500 mb-2">{item.author}</div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{item.description}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="flex-1 bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
                <button
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button class="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300" aria-label="Close">&times;</button>
                        <h2 class="text-2xl font-bold mb-2">${item.title}</h2>
                        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded font-semibold uppercase">${item.category}</span>
                          <span>${item.author}</span>
                          <span>${item.date?.slice(0, 10)}</span>
                        </div>
                        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-full rounded mb-4 max-h-60 object-cover"/>` : ''}
                        <p class="text-gray-700 whitespace-pre-line">${item.description}</p>
                      </div>
                    `;
                    document.body.appendChild(modal);
                    modal.querySelector('button[aria-label="Close"]')?.addEventListener('click', () => modal.remove());
                    modal.addEventListener('click', (e) => {
                      if (e.target === modal) modal.remove();
                    });
                  }}
                  className="mt-3 w-full text-center text-blue-600 hover:underline text-xs"
                >
                  View Full Details
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}