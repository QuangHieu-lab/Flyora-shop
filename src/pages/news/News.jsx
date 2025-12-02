import React, { useState, useEffect } from "react";

const formatDateVN = (isoDate) => {
  const d = new Date(isoDate);
  return `${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
};

const ITEMS_PER_PAGE = 6;

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/news")
      .then((res) => res.json())
      .then((data) => {
        const formatted = Array.isArray(data)
          ? data.map((item) => ({
            id: item.id || item._id,
            title: item.title,
            url: item.url,
            createdAt: item.createdAt,
            image:
              item.imageUrl ||
              `https://source.unsplash.com/400x300/?bird,news,${item.id}`,
          }))
          : [];
        setNewsList(formatted);
      })
      .catch(() => setError("Không tải được danh sách bài viết"))
      .finally(() => setLoading(false));
  }, []);

  const sortedNews = [...newsList].sort((a, b) => {
    if (sortType === "latest" || sortType === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const totalPages = Math.ceil(sortedNews.length / ITEMS_PER_PAGE);
  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white px-4 py-10 border">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tin tức mới nhất</h1>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border px-3 py-2 rounded text-sm focus:outline-none relative z-10"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        {loading && <div className="text-center py-10">Đang tải...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
              {paginatedNews.map((news) => (
                <div key={news.id}>
                  <a
                    href={
                      news.url && news.url.startsWith("http") ? news.url : "#"
                    }
                    target={
                      news.url && news.url.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    rel="noopener noreferrer"
                    className="block group w-[450px] h-[450px] mx-auto"
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full aspect-[4/3] object-cover rounded bg-gray-100"
                    />
                    <div className="mt-4">
                      <h3 className="font-medium underline underline-offset-2 group-hover:underline text-lg leading-snug text-black hover:underline cursor-pointer">
                        {news.title}
                      </h3>
                      <div className="mt-2 text-gray-400 text-[15px]">
                        {formatDateVN(news.createdAt)}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
              {/* Dòng chữ phía trên */}
              <span className="text-sm text-gray-500">
                Trang {currentPage} trên {totalPages}
              </span>

              {/* Các nút nằm hàng ngang phía dưới */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 flex items-center justify-center border rounded disabled:opacity-30"
                ></button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 flex items-center justify-center border rounded text-sm font-medium ${currentPage === i + 1
                        ? "bg-red-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 flex items-center justify-center border rounded disabled:opacity-30"
                ></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;
