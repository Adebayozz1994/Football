"use client"

import { useState, useEffect } from "react"
import { Calendar, Tag, User, ArrowLeft, Clock, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import axios from '@/utils/axios';

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

interface NewsItem {
  _id: string
  title: string
  category: string
  state: string
  author: string
  description: string
  date: string
  image?: string
  createdAt?: string
}

const categories = ["All", "News", "Transfer", "Match", "Injury", "Analysis", "Rumor", "Other"]

export default function PublicNewsList() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterState, setFilterState] = useState("All")

  // Black and gold color palette
  const black = "rgb(24, 24, 24)"
  const gold = "#FFD700"
  const goldDark = "#BFA100"

  // Fetch news using Axios
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/news");
        setNews(res.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load news");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [])

  // --- Filtering ---
  const filteredNews = news.filter(item => {
    // Category filter
    const matchesCategory = filterCategory === "All" || item.category === filterCategory
    // Date filter (compare only date part)
    const matchesDate = !filterDate || item.date?.slice(0, 10) === filterDate
    // State filter
    const matchesState = filterState === "All" || item.state === filterState
    return matchesCategory && matchesDate && matchesState
  })

  if (selected) {
    // ... (your details code is unchanged)
    // See your original code for details view...
    // (keep as is)
    return (
      <>
        <Header />
        <div style={{ background: black }} className="min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <button
              style={{ color: gold }}
              className="group mb-8 flex items-center gap-3 font-semibold hover:underline"
              onClick={() => setSelected(null)}
              type="button"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
              <span className="text-lg">Back to News</span>
            </button>
            {/* ...rest of details view... */}
            <article
              style={{ background: black, borderColor: goldDark }}
              className="rounded-2xl shadow-xl overflow-hidden border"
            >
              {selected.image && (
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-auto"
                    style={{ borderBottom: `2px solid ${gold}` }}
                  />
                </div>
              )}
              <div className="relative p-8 -mt-20 z-20">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    style={{
                      background: gold,
                      color: black,
                      boxShadow: `0 2px 8px ${goldDark}40`,
                      fontWeight: 700
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-lg"
                  >
                    <Tag size={16} />
                    {selected.category}
                  </span>
                  {selected.state && (
                    <span
                      style={{
                        background: "rgba(255, 215, 0, 0.9)",
                        color: black,
                        boxShadow: `0 2px 8px ${goldDark}40`,
                        fontWeight: 600
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm shadow-lg"
                    >
                      📍 {selected.state}
                    </span>
                  )}
                  <time
                    style={{ background: black, color: gold, border: `1px solid ${goldDark}` }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-lg"
                  >
                    <Calendar size={16} className="text-yellow-400" />
                    {selected.date ? new Date(selected.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : ''}
                  </time>
                </div>
                <h1
                  className="text-4xl font-bold mb-6"
                  style={{ color: gold, textShadow: `0 2px 6px ${goldDark}` }}
                >
                  {selected.title}
                </h1>
                {selected.author && (
                  <div
                    className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full"
                    style={{ background: goldDark }}
                  >
                    <User size={18} className="text-yellow-200" />
                    <span className="font-medium text-white">{selected.author}</span>
                  </div>
                )}
                <div className="prose prose-lg max-w-none leading-relaxed" style={{ color: "#fafafa" }}>
                  {selected.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                {selected.createdAt && (
                  <div className="mt-12 pt-6 border-t" style={{ borderTopColor: goldDark }}>
                    <div
                      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full"
                      style={{ background: black, color: gold, border: `1px solid ${goldDark}` }}
                    >
                      <Clock size={16} className="text-yellow-400" />
                      <span>
                        Published on {new Date(selected.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div style={{ background: black }} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12 space-y-4">
            <h2
              className="text-2xl font-bold animate-blink"
              style={{
                color: gold,
                textShadow: `0 2px 12px ${goldDark}`,
                letterSpacing: "1px",
                animation: "blink 1.5s infinite"
              }}
            >
              Latest Football News
            </h2>
            <style jsx>{`
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
              }
              .animate-blink {
                animation: blink 1.5s infinite;
              }
            `}</style>
            <p style={{ color: goldDark }} className="text-xl">Stay updated with the latest football news and transfers</p>
            <div style={{ background: gold }} className="w-24 h-1 mx-auto rounded-full"></div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="border px-4 py-2 rounded text-black font-semibold"
              style={{ minWidth: 180 }}
            >
              {categories.map(c => (
                <option value={c} key={c}>{c}</option>
              ))}
            </select>
            <select
              value={filterState}
              onChange={e => setFilterState(e.target.value)}
              className="border px-4 py-2 rounded text-black font-semibold"
              style={{ minWidth: 180 }}
            >
              <option value="All">All States</option>
              {NIGERIAN_STATES.map(state => (
                <option value={state} key={state}>{state}</option>
              ))}
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="border px-4 py-2 rounded text-black font-semibold"
            />
            {(filterDate || filterCategory !== "All" || filterState !== "All") && (
              <button
                onClick={() => {
                  setFilterDate("");
                  setFilterCategory("All");
                  setFilterState("All");
                }}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold shadow hover:bg-yellow-300 transition"
              >
                Reset Filters
              </button>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div
                style={{ borderColor: gold, borderTopColor: "transparent" }}
                className="animate-spin rounded-full h-16 w-16 border-4"
              ></div>
            </div>
          )}

          {error && (
            <div style={{ background: "#222", borderLeft: `4px solid ${gold}` }} className="p-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p style={{ color: gold }}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {filteredNews.length === 0 && !loading && (
            <div className="text-center py-12 rounded-lg" style={{ background: "#222" }}>
              <p style={{ color: goldDark }}>No news available for selected filter.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <article
                key={item._id}
                className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border"
                style={{
                  background: black,
                  borderColor: goldDark
                }}
                onClick={() => setSelected(item)}
              >
                <div className="relative w-full overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto max-h-[200px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                      style={{ borderBottom: `2px solid ${gold}` }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full" style={{ background: goldDark }}>
                      <span style={{ color: gold }}>No image available</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <span
                      style={{
                        background: gold,
                        color: black,
                        fontWeight: 700,
                        boxShadow: `0 2px 8px ${goldDark}40`
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm shadow-lg"
                    >
                      <Tag size={14} />
                      {item.category}
                    </span>
                    {item.state && (
                      <span
                        style={{
                          background: "rgba(255, 215, 0, 0.9)",
                          color: black,
                          fontWeight: 600,
                          boxShadow: `0 2px 8px ${goldDark}40`
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs shadow-lg"
                      >
                        📍 {item.state}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 relative">
                  <h3
                    className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors"
                    style={{ color: gold }}
                  >
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                    {item.author && (
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full"
                        style={{ background: goldDark, color: "#fff" }}
                      >
                        <User size={14} className="text-yellow-200" />
                        <span className="font-medium">{item.author}</span>
                      </div>
                    )}
                    {item.date && (
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full"
                        style={{ background: black, color: gold, border: `1px solid ${goldDark}` }}
                      >
                        <Calendar size={14} className="text-yellow-400" />
                        <time className="font-medium">{new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</time>
                      </div>
                    )}
                  </div>

                  <p style={{ color: goldDark }} className="line-clamp-2 mb-6">
                    {item.description}
                  </p>

                  <div className="absolute bottom-6 right-6">
                    <div
                      className="flex items-center gap-2 font-bold group-hover:text-yellow-400 transition-all duration-300 transform group-hover:translate-x-2"
                      style={{ color: gold }}
                    >
                      <span className="text-sm">Read full story</span>
                      <ChevronRight size={20} className="group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}