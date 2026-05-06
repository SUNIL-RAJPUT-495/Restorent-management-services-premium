import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url: SummaryApi.getPublicBlogs.url,
          method: SummaryApi.getPublicBlogs.method,
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

    fetchBlogs();
  }, []);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Our Blog</h1>
      <p className="text-lg text-slate-600">
        Read the latest news, tips, and insights on restaurant management.
      </p>

      {loading ? (
        <div className="mt-10 text-slate-500">Loading posts...</div>
      ) : blogs.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8 text-slate-500">
          No published posts yet.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article key={blog._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {blog.thumbnailUrl ? (
                <img
                  src={blog.thumbnailUrl}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-slate-100" />
              )}
              <div className="p-5">
                <p className="text-xs text-slate-500 mb-2">
                  {new Date(blog.createdAt).toLocaleDateString()} · {blog.author || "Admin"}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{blog.title}</h2>
                <p className="text-sm text-slate-600 line-clamp-4">{blog.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
