# Meme Generator Social App

A responsive React app for creating, exporting, and sharing memes in a community feed. Users can choose a template, place styled text freely on the canvas, download the result as an image, and interact through votes and comments.

## Features

- Template-based meme editor
- Draggable text labels with size, color, and position controls
- Add, edit, select, and remove multiple labels
- PNG export with `html2canvas`
- Passwordless authentication
- Shared meme feed with voting and comments
- Responsive desktop and mobile layout
- Persistent community data through InstantDB

## Stack

- React 18
- Vite
- InstantDB
- html2canvas
- CSS

## Run locally

```bash
git clone https://github.com/delevski/meme-generator.git
cd meme-generator
npm install
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite.

## Configuration

Add your InstantDB app ID to `.env`:

```env
VITE_INSTANT_APP_ID=your_app_id
```

Create an app at [instantdb.com](https://www.instantdb.com/) if you do not already have one. Keep production credentials out of source control.

## Build

```bash
npm run build
npm run preview
```

## How it works

1. Sign in with an email address.
2. Choose a template or image.
3. Add and drag labels on the canvas.
4. Adjust text styling and position.
5. Download the meme or publish it to the feed.
