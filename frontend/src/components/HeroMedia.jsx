import React from 'react';

const HeroMedia = ({ type, src, title, subtitle, buttonText }) => {
    return (
        <div className="absolute inset-0 w-full h-full">
            {type === 'video' ? (
                <video
                    className="w-full h-full object-cover"
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={src}
                    alt={title}
                />
            )}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                    {title}
                </h2>
                <p className="text-lg md:text-xl font-light mb-8 max-w-md drop-shadow-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                    {subtitle}
                </p>
                <button className="bg-white text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-200 ease-out">
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default HeroMedia;
