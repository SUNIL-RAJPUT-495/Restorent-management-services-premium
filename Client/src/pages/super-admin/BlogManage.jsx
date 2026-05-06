import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Calendar, User, Loader2 } from 'lucide-react';
import AxiosSuperAdmin from '../../utils/axiosSuperAdmin';
import SummaryApi from '../../common/SummaryApi';

const BlogManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: 'Admin',
    thumbnailUrl: '',
    content: '',
    isPublished: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await AxiosSuperAdmin({
        url: SummaryApi.getAdminBlogs.url,
        method: SummaryApi.getAdminBlogs.method,
      });
      if (response.data.success) {
        setBlogs(response.data.blogs || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return blogs;
    return blogs.filter((blog) =>
      [blog.title, blog.author, blog.content].filter(Boolean).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [blogs, searchTerm]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await AxiosSuperAdmin({
        url: SummaryApi.createBlog.url,
        method: SummaryApi.createBlog.method,
        data: formData,
      });
      if (response.data.success) {
        setShowCreateForm(false);
        setFormData({
          title: '',
          author: 'Admin',
          thumbnailUrl: '',
          content: '',
          isPublished: true,
        });
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-500 text-sm">Create and manage content for your marketing website.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5" />
          Create New Post
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateBlog} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Create Blog Post</h2>
          <input
            required
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Post title"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-orange-500"
          />
          <input
            name="author"
            value={formData.author}
            onChange={onChange}
            placeholder="Author name"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-orange-500"
          />
          <input
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={onChange}
            placeholder="Thumbnail image URL"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-orange-500"
          />
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={onChange}
            placeholder="Write blog content..."
            rows={6}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-orange-500"
          />
          <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={onChange}
            />
            Publish immediately
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Add Post"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search blog posts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Post Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">{blog.title}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <User className="w-3 h-3" />
                        {blog.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      blog.isPublished
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-slate-100 text-slate-600'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManage;
