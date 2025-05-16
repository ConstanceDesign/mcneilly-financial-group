import React from 'react';

interface AnimatedLinkProps {
  url: string;
  name: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ url, name }) => {
  return (
    <div className="flex justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group p-5 cursor-pointer relative text-xl font-normal border-0 
          flex items-center justify-center bg-transparent text-white 
          w-full overflow-hidden transition-all duration-100
        "
      >
        {/* Left Border */}
        <span className="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-white transition-all duration-500"></span>

        {/* Text Transitions */}
        <p className="group-hover:opacity-0 group-hover:-translate-x-full absolute translate-x-0 transition-all duration-200">
          {name}
        </p>
        <span className="group-hover:translate-x-0 group-hover:opacity-100 absolute translate-x-full opacity-0 transition-all duration-200">
          Visit
        </span>

        {/* Right Border */}
        <span className="group-hover:w-full absolute right-0 h-full w-5 border-y border-r border-white transition-all duration-500"></span>
      </a>
    </div>
  );
};

export default AnimatedLink;