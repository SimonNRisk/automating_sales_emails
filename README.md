# Cold Email Generator - Chrome Extension

This Chrome extension helps users generate and draft personalized cold outreach emails using OpenAI's GPT and the Gmail API. Built as a practice project, it combines sales template prompting, optional company information enrichment, and programmatic drafting into Gmail.

---

## 🚀 Features
- 🧠 GPT-generated outreach emails based on customizable templates
- 🏢 Inputs: recipient email + company name (Clearbit integration optional)
- 📄 Generates email content from a general-purpose prompt
- 📬 Drafts the email directly in the user's Gmail account using Gmail API
- 🔐 Secure API key storage using `chrome.storage`
- 🧰 Easy-to-modify templates with support for Retrieval-Augmented Generation (RAG)

---

## 🔧 Installation & Setup

### 1. Clone or Download the Repo
```
git clone https://github.com/yourusername/cold-email-generator.git
```

### 2. Add Your OpenAI API Key
- When prompted in the extension popup, enter your OpenAI API key.
- It will be stored securely in `chrome.storage.local`.

### 3. Configure OAuth2 with Google Cloud
1. Create a Google Cloud Project
2. Enable the **Gmail API**
3. Create **OAuth credentials** (Chrome App type)
4. Copy your Client ID and update `manifest.json`:
```json
"oauth2": {
  "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
  "scopes": [
    "https://www.googleapis.com/auth/gmail.compose"
  ]
}
```
5. Add yourself as a **Test User** in OAuth consent screen settings

### 4. Load Extension in Chrome
- Visit `chrome://extensions`
- Enable "Developer mode"
- Click "Load unpacked" and select your project folder

---

## 📁 Project Structure
```
├── popup.html          # Extension UI
├── popup.js            # Core logic (GPT + Gmail API)
├── popup.css           # Styles for popup
├── templates/
│   └── sales_template.txt  # RAG-ready sales template
├── manifest.json       # Chrome extension config
├── README.md           # You're here!
```

---

## 🧠 How It Works
1. User enters company name and recipient email
2. Extension loads a generalized GPT prompt from `sales_template.txt`
3. OpenAI generates a personalized email
4. Gmail API creates a **draft email** inside the user’s account

---

## 📎 Attachments (Coming Soon)
Future updates will allow:
- Adding PDF attachments (e.g., Club info package)
- Full MIME formatting for rich HTML + files

---

## 🧩 Tech Stack
- OpenAI GPT-3.5 Turbo
- Gmail API (OAuth2)
- Chrome Extension APIs: `identity`, `storage`, `scripting`

---

## 🤝 Contributions
PRs are welcome! Feel free to fork this and improve it for other use cases.

---

## 📄 License
MIT License

---

Made with ❤️
