# 🎭 Meme Generator - Social Platform

A modern, interactive meme generator and social platform built with React and InstantDB. Create hilarious memes, share them with the community, and vote on your favorites!

## ✨ Features

### Meme Creation
- **Upload Your Own Images**: Upload any image from your device to create custom memes
- **Popular Meme Templates**: Choose from a gallery of popular meme templates
- **Draggable Labels**: Add text labels that can be freely moved around the image
- **Resizable Labels**: Adjust label size using four corner handles with black backgrounds
- **Color Customization**: Change label colors from a palette or use a custom color picker
- **Font Size Control**: Adjust text size with an easy-to-use slider (16px-72px)
- **Download**: Export your meme as a high-quality PNG image

### Social Features
- **User Authentication**: Secure email-based authentication with 6-digit verification code
- **Meme Feed**: Browse all posted memes in real-time
- **Voting System**: Upvote and downvote memes to show your appreciation
- **Sort Options**: Sort feed by newest or most popular memes
- **Post to Feed**: Share your creations with the community
- **Delete Your Memes**: Remove your own posts anytime
- **Responsive Design**: Works great on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎮 How to Use

### Getting Started
1. **Sign In**: 
   - Enter your email to receive a 6-digit verification code
   - Check your email and enter the code to authenticate

### Creating Memes
2. **Navigate to Create**:
   - Click the "✨ Create Meme" button in the navigation

3. **Select an Image**: 
   - Upload your own image using the "📤 Upload Your Image" button
   - OR choose from popular meme templates

4. **Add Labels**:
   - Click the "➕ Add Label" button to create a new text label
   - Click and drag labels to reposition them
   - Use the black corner handles to resize labels

5. **Customize**:
   - Click on a label to select it
   - Choose a color from the palette or use the custom color picker
   - Adjust font size using the slider

6. **Share or Download**:
   - Click "📤 Post to Feed" to share with the community
   - OR click "⬇️ Download Meme" to save locally as a PNG file

### Browsing & Voting
7. **Explore the Feed**:
   - Click "📱 Feed" to see all posted memes
   - Sort by newest or most popular
   - Upvote (▲) or downvote (▼) memes you like/dislike
   - Delete your own memes using the 🗑️ button

## 🛠️ Technologies Used

- **React 18**: Modern UI library for building interactive interfaces
- **Vite**: Lightning-fast build tool and development server
- **InstantDB**: Real-time database with built-in authentication
- **html2canvas**: For capturing and exporting memes as images
- **CSS3**: Modern styling with gradients, animations, and responsive design

## 📁 Project Structure

```
src/
├── lib/
│   └── instant.js              # InstantDB configuration
├── components/
│   ├── Auth.jsx                # Authentication component (email + code)
│   ├── Auth.css
│   ├── DraggableLabel.jsx      # Draggable/resizable text label component
│   ├── DraggableLabel.css
│   ├── ImageSelector.jsx        # Image upload and template selection
│   ├── ImageSelector.css
│   ├── MemeEditor.jsx          # Main meme editing canvas with post feature
│   ├── MemeEditor.css
│   ├── ControlsPanel.jsx       # Color picker and label controls
│   ├── ControlsPanel.css
│   ├── MemeFeed.jsx            # Feed displaying all posted memes
│   ├── MemeFeed.css
│   ├── MemeCard.jsx            # Individual meme card with voting
│   └── MemeCard.css
├── App.jsx                     # Main application with navigation
├── App.css
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## 🎨 Features in Detail

### Authentication System
- Email-based authentication using InstantDB
- 6-digit verification code sent to email
- Secure and passwordless login
- Persistent sessions

### Draggable Labels
- Click and drag to move labels anywhere on the image
- Four black corner handles for intuitive resizing
- Delete button appears when label is selected
- Classic meme font with black outline

### Color Customization
- 10 preset colors to choose from
- Custom color picker for unlimited color options
- Real-time preview as you change colors
- Colors persist with saved memes

### Social Features
- **Real-time Feed**: See new memes instantly as they're posted
- **Voting System**: Upvote/downvote with visual feedback
- **Vote Counts**: See total votes for each meme
- **User Profiles**: Each meme shows the creator
- **Sorting Options**: View by newest or most popular
- **Delete Control**: Users can only delete their own memes

### Export & Share
- High-quality PNG download (local save)
- Post to feed (share with community)
- Automatically hides editing controls in captures
- Unique filenames with timestamps

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for meme lovers everywhere

