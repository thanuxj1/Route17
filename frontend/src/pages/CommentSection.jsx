"use client"

import { useEffect, useState } from "react"
import { getComments, createComment } from "../../api/commentApi"
import { Send } from "lucide-react"

export default function CommentSection({ busId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const comments = await getComments(busId)
      setComments(comments)
    } catch (err) {
      console.error("Failed to fetch comments", err)
      setError("Failed to load updates")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      await createComment({ content: newComment, busId })
      setNewComment("")
      await fetchComments()
    } catch (err) {
      console.error("Failed to post comment", err)
      setError("Failed to post update")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [busId])

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white/90">Updates</h3>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-xl px-4 py-3 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors resize-none"
          placeholder="Share an update about this bus..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-white/30 text-white font-medium px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          disabled={isSubmitting || !newComment.trim()}
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Posting..." : "Post Update"}
        </button>
      </form>

      {isLoading ? (
        <div className="text-center text-white/40 py-8">Loading updates...</div>
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl px-4 py-3 space-y-2">
              <p className="text-white/80 text-sm leading-relaxed">{comment.content}</p>
              <span className="text-xs text-orange-500/50">Update #{comment.id}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white/30 py-8 text-sm">No updates yet. Be the first to share!</div>
      )}
    </div>
  )
}
