# 🚀 Wails + Golang + React + TypeScript + TailwindCSS Starter

A powerful **Wails**, **Golang**, **ReactJS**, **TypeScript**, and **TailwindCSS** starter template for building modern desktop applications.

## 📌 Features

✅ **Wails + Golang** for cross-platform desktop apps
✅ **ReactJS + TypeScript** for the frontend
✅ **TailwindCSS** for styling with **custom colors**
✅ **Dark Mode** support
✅ **Multi-language support** (4 languages, easily extendable)
✅ **Reusable modal & toast components**
✅ **Hot reloading** for a smooth development experience

---

## 📂 Project Structure

```plaintext
📦 your-project
├── 📂 frontend/            # React + Tailwind frontend
│   ├── 📜 src/assets/Globals.css  # Global styles (custom colors included)
│   ├── 📜 src/locales/    # Multi-language JSON files
│   ├── 📜 src/components/
│   │   ├── 📜 Modal.tsx   # Reusable modal component
│   ├── 📜 src/context/
│   │   ├── 📜 ThemeContext.tsx  # Dark mode context
│   │   ├── 📜 LanguageContext.tsx  # Multi-language context
│   │   ├── 📜 ToastContext.tsx  # Toasts context
│   ├── 📜 src/main.tsx     # React entry point
│   ├── 📜 src/App.tsx      # Main App component
│   ├── 📜 vite.config.ts   # Vite configuration
│   └── ...
├── 📂 build/               # Compiled app
├── 📜 main.go              # Backend logic (Golang)
├── 📜 wails.json           # Wails configuration
└── ...
```

---

## ⚙️ Configuration

You can customize the project by editing:

- **`wails.json`** → Modify project settings. [Docs](https://wails.io/docs/reference/project-config)
- **`main.go`** → Backend logic in Golang
- **`frontend/src/assets/Globals.css`** → Global TailwindCSS styles (custom colors included)
- **`frontend/src/locales/`** → Multi-language JSON files
- **`frontend/src/context/ThemeContext.tsx`** → Toggle dark mode
- **`frontend/src/context/LanguageContext.tsx`** → Change language
- **`frontend/src/context/ToastContext.tsx`** → Edit Toast's design
- **`frontend/src/components/Modal.tsx`** → Edit the Modal's design

---

## 🌍 Multi-language Support

This starter includes support for **4 languages** and makes it easy to add more.

- Languages are stored in **`src/locales/`**
- You can switch between languages dynamically
- Easily add new languages by creating a new folder in locales and add a JSON file.
Example:
```json
// src/locales/en.json
{
  "buttons": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "modal": "Open a Modal",
    "toast-success": "Open a success toast",
    "primary": "Primary button",
    "secondary": "Secondary button",
    "back": "Go back to the home page"
  },
  "headings": {
    "greeting": "Hello beautiful people!",
    "toast-success-message": "You have successfully fired a success toast!"
  },
  "links": {
    "home": "Home",
    "setting": "Setting"
  }
}
```

---

## 🌓 Dark Mode

Dark mode is already built-in! 🌙

- Uses **context API** to manage theme
- Automatically remembers user preference
- Easily customizable

---

## 🔥 Modal & Toast System

- **Reusable `Modal.tsx`** → Easily show popups
- **Reusable `Toast.tsx`** → Show multiple toasts at once

---

## 🛠️ Development

To start in **live development mode**, run:

```sh
wails dev
```

This enables hot-reloading for a better development experience.

---

## 📦 Building for Production

To create a **production build**, run:

```sh
wails build
```

This generates a **redistributable package** for your platform.

---

## 📖 Documentation & Resources

- Wails Documentation: [https://wails.io/docs](https://wails.io/docs)
- ReactJS: [https://react.dev](https://react.dev)
- TailwindCSS: [https://tailwindcss.com](https://tailwindcss.com)

---

## 📝 License

This project is licensed under **MIT**. Feel free to modify and distribute.
