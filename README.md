# 🎭 Meme Generator

A modern, interactive meme generator built with React that allows you to create hilarious memes with customizable text labels.

## ✨ Features

- **Upload Your Own Images**: Upload any image from your device to create custom memes
- **Popular Meme Templates**: Choose from a gallery of popular meme templates
- **Draggable Labels**: Add text labels that can be freely moved around the image
- **Resizable Labels**: Adjust label size using four corner handles with black backgrounds
- **Color Customization**: Change label colors from a palette or use a custom color picker
- **Font Size Control**: Adjust text size with an easy-to-use slider
- **Download**: Export your meme as a high-quality PNG image
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

1. **Select an Image**: 
   - Upload your own image using the "Upload Your Image" button
   - OR choose from popular meme templates

2. **Add Labels**:
   - Click the "➕ Add Label" button to create a new text label
   - Click and drag labels to reposition them
   - Use the black corner handles to resize labels

3. **Customize**:
   - Click on a label to select it
   - Choose a color from the palette or use the custom color picker
   - Adjust font size using the slider

4. **Download**:
   - Click "⬇️ Download Meme" to save your creation as a PNG file

## 🛠️ Technologies Used

- **React 18**: Modern UI library
- **Vite**: Fast build tool and development server
- **html2canvas**: For exporting memes as images
- **CSS3**: Modern styling with gradients and animations

## 📁 Project Structure

```
src/
├── components/
│   ├── DraggableLabel.jsx      # Draggable/resizable text label component
│   ├── DraggableLabel.css
│   ├── ImageSelector.jsx        # Image upload and template selection
│   ├── ImageSelector.css
│   ├── MemeEditor.jsx          # Main meme editing canvas
│   ├── MemeEditor.css
│   ├── ControlsPanel.jsx       # Color picker and controls
│   └── ControlsPanel.css
├── App.jsx                     # Main application component
├── App.css
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## 🎨 Features in Detail

### Draggable Labels
- Click and drag to move labels anywhere on the image
- Four black corner handles (marked with "+") for intuitive resizing
- Delete button appears when label is selected

### Color Customization
- 10 preset colors to choose from
- Custom color picker for unlimited color options
- Real-time preview as you change colors

### Download Functionality
- High-quality PNG export
- Automatically hides editing controls in the final image
- Unique filename based on timestamp

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for meme lovers everywhere

