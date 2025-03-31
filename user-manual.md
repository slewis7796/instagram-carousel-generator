# Instagram Carousel Generator - User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Usage](#basic-usage)
3. [Customization Guide](#customization-guide)
   - [Adding New Fonts](#adding-new-fonts)
   - [Adding New Colors](#adding-new-colors)
   - [Changing Slide Dimensions](#changing-slide-dimensions)
   - [Modifying Font Sizes](#modifying-font-sizes)
   - [Editing Header and Menu](#editing-header-and-menu)
   - [Creating Subpages](#creating-subpages)
   - [Changing the PayPal Donation Link](#changing-the-paypal-donation-link)
4. [Hosting the Application](#hosting-the-application)
   - [Option 1: Using a Static Site Hosting Service](#option-1-using-a-static-site-hosting-service)
   - [Option 2: Using Traditional Web Hosting](#option-2-using-traditional-web-hosting)
   - [Option 3: Using Vercel (Recommended for Next.js)](#option-3-using-vercel-recommended-for-nextjs)
5. [Technical Details](#technical-details)
6. [Troubleshooting](#troubleshooting)

## Introduction

The Instagram Carousel Generator is a web application that allows you to create Instagram carousel posts by converting text into visually appealing slides. This user manual provides instructions on how to use the application and customize it to meet your specific needs.

## Basic Usage

1. **Enter Text**: Type or paste your text (up to 270 words) in the text area.
2. **Choose Background Color**: Select a background color using the color picker, hex code input, or predefined color buttons.
3. **Select Font Style**: Choose from various font options in the dropdown menu.
4. **Choose Font Color**: Select a text color using the color picker, hex code input, or predefined color buttons.
5. **Upload Logo (Optional)**: Click the upload area to add a logo that will appear in the bottom corner of each slide.
6. **Generate Slides**: Click the "Generate Carousel Slides" button to create your slides.
7. **Edit Slides**: After generation, you can edit the text on each slide, add or delete slides, and add a cover slide.
8. **Download**: Click "Download Slides" to save your carousel as image files.

## Customization Guide

### Adding New Fonts

To add new fonts to the application, follow these steps:

1. **Import the Font in CSS**:
   Open `/src/app/globals.css` and add a new import statement for your font:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourNewFont:wght@400;700&display=swap');
   ```

2. **Add Font Class**:
   In the same CSS file, add a new class for your font:
   ```css
   .font-your-new-font {
     font-family: 'YourNewFont', sans-serif !important;
   }
   ```

3. **Add to Font Options**:
   Open `/src/app/page.tsx` and add your font to the `fontOptions` array:
   ```javascript
   const fontOptions = [
     // Existing fonts...
     { name: 'Your New Font', class: 'font-your-new-font' },
   ];
   ```

### Adding New Colors

To add new predefined colors:

1. Open `/src/app/page.tsx` and locate the `colorOptions` array.
2. Add your new color:
   ```javascript
   const colorOptions = [
     // Existing colors...
     { name: 'Your Color Name', value: '#HEXCODE' },
   ];
   ```

### Changing Slide Dimensions

To modify the slide dimensions:

1. **Update Dimensions Constant**:
   Open `/src/app/page.tsx` and locate the `CAROUSEL_DIMENSIONS` constant:
   ```javascript
   const CAROUSEL_DIMENSIONS = {
     width: 1080,
     height: 1350  // 4:5 aspect ratio
   };
   ```
   
   Change these values to your desired dimensions. Common Instagram ratios are:
   - Square: 1080x1080 (1:1)
   - Portrait: 1080x1350 (4:5)
   - Landscape: 1080x566 (1.91:1)

2. **Update CSS Aspect Ratio**:
   Open `/src/app/globals.css` and locate the `.carousel-slide` class:
   ```css
   .carousel-slide {
     /* Other properties... */
     aspect-ratio: 4/5;  /* Change this to match your dimensions */
   }
   ```
   
   Update the aspect-ratio to match your new dimensions:
   - Square: `aspect-ratio: 1/1;`
   - Portrait: `aspect-ratio: 4/5;`
   - Landscape: `aspect-ratio: 1.91/1;`

### Modifying Font Sizes

To adjust the font sizing algorithm:

1. Open `/src/app/page.tsx` and locate the `calculateFontSize` function:
   ```javascript
   const calculateFontSize = (text: string) => {
     if (!text) return 48; // Default size
     
     const length = text.length;
     
     if (length < 50) return 48;
     if (length < 100) return 42;
     if (length < 200) return 36;
     if (length < 300) return 30;
     return 24;
   };
   ```

2. Modify the return values to increase or decrease font sizes based on your preference.

### Editing Header and Menu

To edit the header and menu:

1. Open `/src/app/page.tsx` and locate the header section:
   ```javascript
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
   ```

2. Modify the header title by changing the text inside the `<h1>` tag.

3. Edit the menu items by modifying the `<li>` elements inside the `<ul>` tag. You can:
   - Change the text of existing menu items
   - Add new menu items by adding more `<li>` elements
   - Remove menu items by deleting `<li>` elements
   - Change the links by updating the `href` attributes

4. To change the header gradient colors, open `/src/app/globals.css` and modify the `.header-gradient` class:
   ```css
   .header-gradient {
     background: linear-gradient(90deg, #9333ea, #ec4899);
   }
   ```

### Creating Subpages

To create subpages in your Next.js application:

1. **Create New Page Files**:
   In the `/src/app` directory, create new directories for each route. For example:
   - For an "About" page: Create `/src/app/about/page.tsx`
   - For a "Support" page: Create `/src/app/support/page.tsx`

2. **Basic Page Structure**:
   Each page file should have a structure similar to this:
   ```javascript
   export default function AboutPage() {
     return (
       <main className="min-h-screen bg-gray-900 text-white">
         {/* Header (copy from main page) */}
         <header className="header-gradient p-4 flex justify-between items-center">
           {/* ... */}
         </header>

         <div className="container mx-auto py-8 px-4">
           <h1 className="text-4xl font-bold text-center mb-8">About</h1>
           
           {/* Page content */}
           <div className="bg-white text-black rounded-lg p-8 max-w-4xl mx-auto">
             <p>Your about page content here...</p>
           </div>
         </div>
       </main>
     );
   }
   ```

3. **Update Menu Links**:
   In the main page (`/src/app/page.tsx`), update the menu links to point to your new pages:
   ```javascript
   <nav>
     <ul className="flex space-x-4">
       <li><a href="/" className="hover:underline">Home</a></li>
       <li><a href="/about" className="hover:underline">About</a></li>
       <li><a href="/support" className="hover:underline">Support</a></li>
     </ul>
   </nav>
   ```

### Changing the PayPal Donation Link

To change the PayPal donation link:

1. Open `/src/app/page.tsx` and locate the PayPal donation section:
   ```javascript
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
   ```

2. Replace the `href` value with your PayPal donation link. For example:
   ```javascript
   href="https://www.paypal.com/paypalme/yourusername"
   ```

3. You can also customize the button text by changing the content between the `<a>` tags.

## Hosting the Application

### Option 1: Using a Static Site Hosting Service

This is the simplest method for beginners:

1. **Build the application**:
   - Open a command prompt or terminal
   - Navigate to your project folder
   - Run: `npm run build`
   - This creates a production-ready version in the `.next` folder

2. **Upload to a static site hosting service** (like Netlify, GitHub Pages, or Surge):
   - Create an account on the hosting service
   - Follow their "upload site" or "deploy site" instructions
   - Upload the entire project folder (including the `.next` folder)
   - The service will automatically detect it's a Next.js project and set it up correctly

3. **Connect your domain** (if you have one):
   - In your hosting service's dashboard, look for "Custom domain" or "Domain settings"
   - Enter your domain name (like yourdomain.com)
   - Follow the instructions to update your domain's DNS settings (this usually involves adding a CNAME record)
   - Wait for DNS changes to propagate (can take up to 48 hours)

### Option 2: Using Traditional Web Hosting

If you have a regular web hosting account (like GoDaddy, Bluehost, etc.):

1. **Build the application for export**:
   - Open a command prompt or terminal
   - Navigate to your project folder
   - Run: `npx next build && npx next export`
   - This creates a static version in the `out` folder

2. **Upload to your web hosting**:
   - Open your FTP client (like FileZilla)
   - Connect to your web hosting (using the FTP details provided by your host)
   - Navigate to your website's root folder (often called `public_html`, `www`, or `htdocs`)
   - Upload all files from the `out` folder to this location
   - Make sure to include all files and folders, especially the `_next` folder

3. **Set up your domain**:
   - If you already have a domain connected to your hosting, the site should be live at that domain
   - If not, follow your hosting provider's instructions to connect a domain

### Option 3: Using Vercel (Recommended for Next.js)

Vercel is the company behind Next.js and offers the easiest deployment experience:

1. **Create a Vercel account**:
   - Go to [vercel.com](https://vercel.com) and sign up (you can use GitHub to sign in)

2. **Install Vercel CLI** (optional but helpful):
   - Open a command prompt or terminal
   - Run: `npm install -g vercel`

3. **Deploy your application**:
   - Navigate to your project folder
   - Run: `vercel`
   - Follow the prompts to log in and configure your project
   - Vercel will automatically build and deploy your application

4. **Connect your domain**:
   - In the Vercel dashboard, go to your project
   - Click on "Domains"
   - Add your domain and follow the instructions to update your DNS settings

## Technical Details

The Instagram Carousel Generator is built with:
- Next.js (React framework)
- TypeScript
- Tailwind CSS for styling
- html2canvas for converting HTML to images
- JSZip for packaging downloaded images

The application structure:
- `/src/app/page.tsx`: Main application component
- `/src/app/globals.css`: Global styles and font definitions
- `/src/app/layout.tsx`: Layout component

## Troubleshooting

**Issue**: Fonts not displaying correctly
**Solution**: Ensure the font is properly imported in globals.css and that the font name in fontOptions matches exactly with the imported font name.

**Issue**: Images not downloading
**Solution**: Check browser permissions for downloading multiple files. Try using a different browser if issues persist.

**Issue**: Text appears too small/large on slides
**Solution**: Adjust the calculateFontSize function in page.tsx to return larger or smaller values based on your preference.

**Issue**: Slide dimensions look incorrect
**Solution**: Ensure both the CAROUSEL_DIMENSIONS constant in page.tsx and the aspect-ratio in globals.css match your desired dimensions.

**Issue**: Website not loading after uploading to hosting
**Solution**: Make sure you've uploaded all files, including the `.next` or `_next` folder. Check your hosting provider's documentation for specific instructions on hosting Next.js applications.
