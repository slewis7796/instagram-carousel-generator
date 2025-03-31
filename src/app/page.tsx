'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
// Remove the Head import as it's not compatible with Next.js App Router
// import Head from 'next/head';

// Define font options with display names and CSS class names
const fontOptions = [
  { name: 'Roboto', class: 'font-roboto' },
  { name: 'Montserrat', class: 'font-montserrat' },
  { name: 'Open Sans', class: 'font-opensans' },
  { name: 'Lato', class: 'font-lato' },
  { name: 'Poppins', class: 'font-poppins' },
  // Playful fonts
  { name: 'Pacifico', class: 'font-pacifico' },
  { name: 'Bangers', class: 'font-bangers' },
  { name: 'Lobster', class: 'font-lobster' },
  { name: 'Permanent Marker', class: 'font-permanent-marker' },
  { name: 'Fredoka One', class: 'font-fredoka-one' },
  // Impactful fonts
  { name: 'Bebas Neue', class: 'font-bebas-neue' },
  { name: 'Anton', class: 'font-anton' },
  { name: 'Oswald', class: 'font-oswald' },
  { name: 'Abril Fatface', class: 'font-abril-fatface' },
  { name: 'Righteous', class: 'font-righteous' },
];

// Color options
const colorOptions = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#000000' },
  { name: 'Gray', value: '#4b5563' },
  { name: 'Light Gray', value: '#9ca3af' },
  { name: 'Silver', value: '#d1d5db' },
  { name: 'Yellow', value: '#fbbf24' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
];

export default function Home() {
  // State for carousel customization
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontStyle, setFontStyle] = useState(fontOptions[0]);
  const [fontColor, setFontColor] = useState('#000000');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [carouselText, setCarouselText] = useState('Preview text with selected colors');
  const [showGeneratedSlides, setShowGeneratedSlides] = useState(false);
  const [generatedSlides, setGeneratedSlides] = useState<string[]>([]);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preload fonts
  useEffect(() => {
    // This ensures fonts are loaded when the component mounts
    document.body.classList.add('fonts-loaded');
    
    // Create link elements for each font to ensure they're loaded
    fontOptions.forEach(font => {
      const fontName = font.name.replace(/\s+/g, '+');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, []);

  // Handle logo upload
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setLogoImage(event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Handle font selection - Fixed to properly update the font style
  const handleFontChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = fontOptions.find(font => font.name === e.target.value);
    if (selectedFont) {
      setFontStyle(selectedFont);
    }
  };

  // Click handler for logo upload area
  const handleLogoAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Generate carousel slides
  const handleGenerateSlides = () => {
    // Create sample slides with the selected styling
    const sampleTexts = [
      "Welcome to your Instagram carousel!",
      "This slide showcases your selected font and colors.",
      "You can customize each slide with your own content.",
      "Perfect for creating engaging social media content.",
      "Share your message with style!"
    ];
    
    setGeneratedSlides(sampleTexts);
    setShowGeneratedSlides(true);
  };

  // Go back to editor
  const handleBackToEditor = () => {
    setShowGeneratedSlides(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Remove the Head component as it's not compatible with Next.js App Router */}
      
      {/* Header */}
      <header className="header-gradient p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Instagram Carousel Generator</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Instagram Carousel Generator</h1>
        
        {!showGeneratedSlides ? (
          <div className="bg-white text-black rounded-lg p-8 max-w-4xl mx-auto">
            <p className="mb-6">Choose the background color, font style, and upload an optional logo for your carousel slides.</p>
            
            {/* Background Color */}
            <div className="mb-6">
              <label className="block mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 border border-gray-300" 
                  style={{ backgroundColor: backgroundColor }}
                ></div>
                <input 
                  type="text" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="border border-gray-300 px-2 py-1 w-32"
                />
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                      onClick={() => setBackgroundColor(color.value)}
                      aria-label={`Select ${color.name} color`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Font Style */}
            <div className="mb-6">
              <label className="block mb-2">Font Style</label>
              <select 
                value={fontStyle.name}
                onChange={handleFontChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              >
                {fontOptions.map((font) => (
                  <option key={font.name} value={font.name} style={{fontFamily: font.name}}>
                    {font.name}
                  </option>
                ))}
              </select>
              
              {/* Font preview - Using the actual font class */}
              <div className="mt-2 p-4 border border-gray-300">
                <p className={fontStyle.class} style={{fontFamily: fontStyle.name}}>
                  This is a preview of the {fontStyle.name} font
                </p>
              </div>
            </div>
            
            {/* Font Color */}
            <div className="mb-6">
              <label className="block mb-2">Font Color</label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 border border-gray-300" 
                  style={{ backgroundColor: fontColor }}
                ></div>
                <input 
                  type="text" 
                  value={fontColor} 
                  onChange={(e) => setFontColor(e.target.value)}
                  className="border border-gray-300 px-2 py-1 w-32"
                />
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                      onClick={() => setFontColor(color.value)}
                      aria-label={`Select ${color.name} color`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Text Preview */}
            <div className="mb-6">
              <div 
                className="p-4 border border-gray-300"
                style={{ color: fontColor, backgroundColor: backgroundColor }}
              >
                <input
                  type="text"
                  value={carouselText}
                  onChange={(e) => setCarouselText(e.target.value)}
                  className={`w-full bg-transparent border-none outline-none ${fontStyle.class}`}
                  style={{ color: fontColor, fontFamily: fontStyle.name }}
                />
              </div>
            </div>
            
            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block mb-2">Logo (Optional, 75px height)</label>
              <div 
                onClick={handleLogoAreaClick}
                className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer"
              >
                {logoImage ? (
                  <div className="flex justify-center">
                    <img 
                      src={logoImage} 
                      alt="Uploaded logo" 
                      className="max-h-[75px]" 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-purple-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                    <span>Click to upload logo</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Logo will be resized to 75px height with proportional width and placed in the bottom corner of each slide.
              </p>
            </div>
            
            {/* Carousel Preview */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Carousel Preview</h2>
              <div 
                className="border border-gray-300 p-8 flex flex-col items-center justify-center min-h-[400px]"
                style={{ backgroundColor: backgroundColor }}
              >
                <div className="text-center mb-auto mt-auto">
                  <p 
                    className={fontStyle.class}
                    style={{ color: fontColor, fontFamily: fontStyle.name }}
                  >
                    {carouselText}
                  </p>
                </div>
                
                {logoImage && (
                  <div className="self-end mt-auto">
                    <img 
                      src={logoImage} 
                      alt="Logo" 
                      className="max-h-[75px]" 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Generate Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={handleGenerateSlides}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Generate Carousel Slides
              </button>
            </div>
          </div>
        ) : (
          /* Generated Slides View */
          <div className="bg-white text-black rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Generated Carousel Slides</h2>
            
            <div className="grid grid-cols-1 gap-8">
              {generatedSlides.map((text, index) => (
                <div 
                  key={index}
                  className="border border-gray-300 p-8 flex flex-col items-center justify-center min-h-[400px] relative"
                  style={{ backgroundColor: backgroundColor }}
                >
                  <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full">
                    Slide {index + 1}
                  </div>
                  
                  <div className="text-center mb-auto mt-auto">
                    <p 
                      className={fontStyle.class}
                      style={{ color: fontColor, fontFamily: fontStyle.name }}
                    >
                      {text}
                    </p>
                  </div>
                  
                  {logoImage && (
                    <div className="self-end mt-auto">
                      <img 
                        src={logoImage} 
                        alt="Logo" 
                        className="max-h-[75px]" 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={handleBackToEditor}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Back to Editor
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Font Category Section - Only show in editor view */}
      {!showGeneratedSlides && (
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white text-black rounded-lg p-8 max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Font Categories</h2>
            
            {/* Standard Fonts */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Standard Fonts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fontOptions.slice(0, 5).map((font) => (
                  <div key={font.name} className="p-4 border border-gray-200 rounded">
                    <p className={font.class} style={{fontFamily: font.name}}>
                      {font.name} - Sample Text
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Playful Fonts */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Playful Fonts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fontOptions.slice(5, 10).map((font) => (
                  <div key={font.name} className="p-4 border border-gray-200 rounded">
                    <p className={font.class} style={{fontFamily: font.name}}>
                      {font.name} - Sample Text
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Impactful Fonts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Impactful Fonts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fontOptions.slice(10).map((font) => (
                  <div key={font.name} className="p-4 border border-gray-200 rounded">
                    <p className={font.class} style={{fontFamily: font.name}}>
                      {font.name} - Sample Text
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* PayPal Donation */}
      <div className="mt-12 text-center">
        <p className="mb-4">If you found this tool helpful, consider buying me a coffee!</p>
        <a 
          href="https://www.paypal.com/donate" 
          target="_blank" 
          rel="noopener noreferrer"
          className="donation-button inline-block"
        >
          Buy Me a Coffee ☕
        </a>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-8 bg-gray-800 text-center text-white">
        <p>© 2023 Instagram Carousel Generator. All rights reserved.</p>
        <p className="mt-2 text-sm">Created with Next.js and Tailwind CSS</p>
      </footer>
    </main>
  );
}
