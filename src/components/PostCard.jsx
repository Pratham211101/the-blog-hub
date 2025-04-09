import React from 'react'
import appwriteService from "../appwrite/appWriteConfig"
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import parse from 'html-react-parser'

function PostCard({ $id, title, featuredImage, content }) {
  const parsedContent = parse(content)

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-sm mx-auto bg-[#FFF1D5] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden">
        
        {/* Top Image */}
        <div className="aspect-video w-full">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="p-4 flex flex-col h-[190px]">
          {/* Title and Content */}
          <div className="flex-grow">
            <h2 className="text-lg font-bold text-[#9FB3DF] mb-1 hover:text-[#9EC6F3] transition-colors">
              {title}
            </h2>
            <div className="text-sm text-gray-700 line-clamp-3">
              {parsedContent}
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <button className="flex items-center gap-1 px-4 py-2 text-[#9FB3DF] bg-[#FFF1D5] rounded-full text-sm font-medium hover:bg-[#9EC6F3] hover:text-white transition">
              Read More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
