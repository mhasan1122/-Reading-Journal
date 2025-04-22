

# 📚 Reading Journal App

A cross-platform mobile app built with **React Native (Expo)** to help you track your reading journey. Log, view, and manage your books with custom genres, reading statuses, star ratings, and personal notes. filters, and a powerful search experience.

# Here this the Video link for this app
https://drive.google.com/drive/folders/139QIWtKmiIeoGVWAPyTV1eZC3Ewvn8yE

---

## 🌟 Features

- 🧾 **Book Log** – Add, edit, and delete books with details like title, author, genre, and status (To Read, Reading, Finished)
- ⭐ **Ratings** – 5-star rating system with visual feedback
- 🔍 **Search & Filter** – Filter by genre, status, sort options, and more
- 📅 **Timestamps** – Automatic tracking of creation and finish dates
- 📸 **Book Covers** – Upload from camera/gallery or use image URLs
- 📖 **Detailed View** – View and update personal notes and ratings for each book

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
- **AsyncStorage** – Local persistent storage
- **Expo Vector Icons** – Beautiful and customizable icons

---

## 📂 Project Structure

```
.
├── src
│   ├── components        # Reusable UI components (BookCard, ThemeToggle, etc.)
│   ├── context           # ThemeContext for light/dark mode
│   ├── hooks             # Custom hooks (e.g., useBooks for managing state)
│   ├── screens           # App screens (Home, BookDetail, Add/Edit)
│   ├── types             # Type definitions
├── App.tsx               # App entry point
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/reading-journal-app.git
cd reading-journal-app
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the app with Expo:

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app or run it in a simulator/emulator.

---

## 🧠 Architecture Overview

- **BooksProvider** – Handles CRUD operations for books
- **NavigationContainer** – Manages navigation using stack navigators

---

## 🌈 Customization

- **Genres/Statuses**: Update dropdowns and logic in the book form components

---

## ✅ Roadmap

- [x] Filter and search functionality  
- [x] Star rating system  
- [ ] Cloud sync ()  
- [ ] Book cover uploads via camera/gallery  

---

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

```bash
# Fork the repo
git checkout -b feature/your-feature
git commit -m 'Add your feature'
git push origin feature/your-feature
```

Then open a pull request. 💬

---

## 📬 Contact

Made with ❤️ by **Mirza Hasan**

For suggestions, ideas, or feedback — feel free to reach out via GitHub Issues or [email/contact info if applicable].

---

Let me know if you want this formatted for a specific theme (like GitHub Pages), want help with a logo, or need badges added (e.g., build status, license, etc.).
