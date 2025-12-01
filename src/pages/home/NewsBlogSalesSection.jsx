// NewsBlogSalesSection.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "components/ui/Carousel";

const NewsBlogSalesSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/news"
        );
        const data = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          link: item.url,
          createdAt: item.createdAt,
          image:
            item.imageUrl ||
            `https://source.unsplash.com/400x300/?bird,news,${item.id}`, // fallback
        }));
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, []);

  const BlogCard = ({ post }) => (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl hover:shadow-[12px] hover:-translate-y-1 hover:scale-[1.05] transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden block w-[275px] min-h-[250px]"
    >
      <div className="flex flex-col h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[150px] object-cover flex-shrink-0"
        />
        <div className="p-3 flex-grow flex flex-col justify-between">
          <h3 className="text-base font-semibold leading-tight line-clamp-2 flex-grow">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex-shrink-0">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </a>
  );

  const SectionTitle = ({ title }) => (
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  );

  return (
    <section className="py-10 px-6 bg-white text-center">
      <SectionTitle title="Tin tức phổ biến" />

      <div className="relative mt-6 justify-center">
        <Carousel className="w-full">
          <CarouselContent className="center ml-1 pl-6 justify-start">
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="pl-1 basis-1/5 min-w-0 justify-center"
              >
                <BlogCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 hover:bg-gray-50 h-8 w-8" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 hover:bg-gray-50 h-8 w-8" />
        </Carousel>
      </div>
    </section>
  );
};

export default NewsBlogSalesSection;
