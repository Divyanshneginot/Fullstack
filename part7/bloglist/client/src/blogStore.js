import { create } from 'zustand'

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  appendBlog: (blog) => set((state) => ({ blogs: state.blogs.concat(blog) })),
  updateBlog: (updatedBlog) => set((state) => ({ blogs: state.blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog) })),
  removeBlog: (id) => set((state) => ({ blogs: state.blogs.filter(b => b.id !== id) })),
  commentBlog: (updatedBlog) => set((state) => ({
    blogs: state.blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
  })),
}))

export default useBlogStore