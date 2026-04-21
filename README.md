# Professional Portfolio Website

A modern, fully responsive portfolio website built with HTML5, Bootstrap 5, and vanilla JavaScript. No frameworks required - perfect for GitHub Pages deployment!

## 🎨 Features

✅ **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
✅ **Modern UI/UX** - Beautiful dark theme with purple accent colors
✅ **Smooth Animations** - Scroll animations, hover effects, and transitions
✅ **No Dependencies** - Only Bootstrap and Font Awesome (via CDN)
✅ **GitHub Pages Ready** - Can be deployed directly to GitHub Pages
✅ **SEO Friendly** - Proper semantic HTML structure
✅ **Performance Optimized** - Fast loading and smooth scrolling
✅ **Keyboard Navigation** - Arrow keys for section navigation

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript for interactivity
├── assets/             # Images and media folder
│   └── profile.jpg     # Your profile picture
└── README.md           # This file
```

## 🚀 Quick Setup

### 1. **Download your profile picture**

- Place your profile image in the `assets/` folder
- Name it `profile.jpg` (or update the `index.html` reference)

### 2. **Customize Content**

Open `index.html` and update:

- `<title>My Portfolio</title>` - Browser tab title
- Your name: `<h1 class="name">Your Name</h1>`
- Professional role: `<div class="role-badge">Your Professional Role</div>`
- Bio text: `<p class="bio">Your bio here</p>`
- Email: `<a href="mailto:your.email@gmail.com">`
- LinkedIn/GitHub URLs
- Projects, skills, achievements, certifications
- Education details
- Download CV link

### 3. **Deploy to GitHub Pages**

```bash
# Initialize git (if not already done)
git init

# Add files
git add .
git commit -m "Initial portfolio commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

Then go to repository settings → Pages → select "main" branch and save.

### 4. **Local Testing**

```bash
# Option 1: Use Python
python -m http.server 8000

# Option 2: Use Node.js (http-server)
npx http-server

# Then open: http://localhost:8000
```

## 🎯 Sections Guide

### Hero Section

- **Profile Image**: Update the `src` in `.profile-img`
- **Name & Role**: Edit the text in the hero section
- **Bio**: Update the paragraph text
- **Buttons**: Modify button links and text
- **Social Icons**: Update GitHub and LinkedIn URLs

### About Section

- **Bio Text**: Edit the two paragraphs
- **Soft Skills**: Add/remove skill tags
- **Education**: Update your degrees and schools

### Skills Section

- **6 Categories**: Languages, Frameworks, Databases, Tools, Core, Others
- **Edit Skills**: Add or remove skill tags in each category
- **Colors**: Purple gradient background (customizable in CSS)

### Projects Section

- **Project Cards**: Add your projects with descriptions
- **Technologies**: List tech stack for each project
- **View Code Buttons**: Link to your GitHub repos

### Achievements Section

- **Timeline Format**: Achievements with dates and descriptions
- **Icons**: Different icons for different types of achievements

### Certifications Section

- **Similar to Achievements**: Timeline format for certifications

### Contact Section

- **Contact Details**: Email, LinkedIn, GitHub
- **Download CV**: Link to your resume PDF

## 🎨 Customization Guide

### Colors

Edit the CSS variables at the top of `styles.css`:

```css
:root {
  --primary-color: #7c2ae8; /* Purple */
  --secondary-color: #9d4edd; /* Lighter Purple */
  --bg-dark: #0a0015; /* Dark Background */
  --text-light: #e0e0e0; /* Light Text */
}
```

### Fonts

To change fonts, update the `font-family` in CSS or add Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap"
  rel="stylesheet"
/>
```

### Animations

- Disable animations by removing `animation` properties in CSS
- Adjust animation speed by changing the duration (e.g., `0.8s`)
- Modify animation keyframes in the CSS file

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:

- **1200px**: Desktop (3-column layouts)
- **768px**: Tablet (2-column layouts)
- **< 768px**: Mobile (1-column layouts)

## 🔧 JavaScript Features

- **Smooth Scrolling**: Animated scroll to sections
- **Active Nav Links**: Highlights current section in navbar
- **Scroll Animations**: Elements animate in as you scroll
- **Parallax Effect**: Subtle background movement
- **Type Animation**: Hero text types out on load
- **Keyboard Navigation**: Use arrow keys to navigate
- **Lazy Image Loading**: Images load on demand

## 📦 Adding More Sections

To add a new section:

1. **Add HTML**:

```html
<section id="new-section" class="new-section">
  <div class="container">
    <h2 class="section-title">Section <span>Title</span></h2>
    <!-- Your content -->
  </div>
</section>
```

2. **Add CSS**:

```css
.new-section {
  padding: 6rem 0;
  /* Your styles */
}
```

3. **Update Navigation**: Add a new nav link in the navbar

## 🔐 Security Tips

- Don't commit personal files with sensitive data
- Keep email/phone private or use contact form
- Review links before deploying
- Use HTTPS when possible

## 📊 Best Practices

1. **Keep Content Updated**: Update projects and achievements regularly
2. **Optimize Images**: Compress profile image before uploading
3. **SEO**: Add meta descriptions and keywords to HTML
4. **Testing**: Test on different devices before deploying
5. **Version Control**: Commit changes with meaningful messages

## 🆘 Troubleshooting

### Images not showing

- Check the file path in `src` attribute
- Ensure image is in the `assets/` folder
- Use correct image format (jpg, png, webp)

### Styles not applying

- Clear browser cache (Ctrl+Shift+Delete)
- Check if CSS file is linked in HTML
- Verify CSS file path

### Animations not working

- Check browser compatibility
- Ensure JavaScript is enabled
- Check browser console for errors

### Responsive issues

- Test with browser DevTools (F12)
- Check viewport meta tag in HTML head
- Verify CSS media queries

## 📚 Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [GitHub Pages Docs](https://pages.github.com/)

## 📝 License

This portfolio template is free to use for personal projects.

## 🤝 Support

For issues or customizations, check:

- Browser console (F12) for JavaScript errors
- HTML structure for proper nesting
- CSS media queries for responsive issues

---

**Ready to deploy?** Push to GitHub and enable GitHub Pages! 🚀
