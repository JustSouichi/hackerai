
# 🚀 HackerAI - Link Confirmation

![HackerAI Banner](./l.png)

![License](https://img.shields.io/github/license/JustSouichi/hackerai?style=flat-square)
![Version](https://img.shields.io/github/v/release/JustSouichi/hackerai?style=flat-square)
![Stars](https://img.shields.io/github/stars/JustSouichi/hackerai?style=social)
![Contributors](https://img.shields.io/github/contributors/JustSouichi/hackerai?style=flat-square)
![Issues](https://img.shields.io/github/issues/JustSouichi/hackerai?style=flat-square)
![Pull Requests](https://img.shields.io/github/issues-pr/JustSouichi/hackerai?style=flat-square)
![Build Status](https://img.shields.io/github/actions/workflow/status/JustSouichi/hackerai/main.yml?branch=main&style=flat-square)
![Code Size](https://img.shields.io/github/languages/code-size/JustSouichi/hackerai?style=flat-square)
![Languages](https://img.shields.io/github/languages/top/JustSouichi/hackerai?style=flat-square)
![Forks](https://img.shields.io/github/forks/JustSouichi/hackerai?style=social)

HackerAI is an open-source Chrome extension designed to improve online security by alerting users before they open potentially harmful links. It provides a lightweight solution to mitigate phishing attacks and suspicious links by prompting users for confirmation before they proceed.

---

## ✅ Key Features
| Feature                         | Description                                                                                   |
|---------------------------------|-----------------------------------------------------------------------------------------------|
| 🛑 **Link Confirmation Dialog**  | Displays a confirmation dialog before opening any link, ensuring users are aware of their actions. |
| 🔗 **Support for Custom Links**  | Handles both standard HTML links (`<a>` tags) and custom attributes like `data-link`.        |
| 🤝 **Beginner-Friendly**         | Designed for non-technical users to add an extra layer of security.                          |
| ⚡ **Lightweight and Efficient** | Minimal performance impact while providing essential protection.                             |
| 🌍 **Open-Source**               | Fully transparent codebase, open to contributions and community collaboration.               |

---

## 🛠️ Installation

Follow these steps to install the extension locally:

1. 🖥️ **Clone the repository**:
   ```bash
   git clone https://github.com/JustSouichi/hackerai.git
   ```
2. 🌐 **Go to the Chrome Extensions page**:
   Open `chrome://extensions/` in your browser.
3. 🛠️ **Enable Developer Mode**:
   Toggle the **Developer mode** in the top-right corner.
4. 📂 **Load the extension**:
   Click **Load unpacked** and select the folder containing the project files.
5. ✅ **Done**:
   The extension is now active and ready to use!

---

## ⚙️ How It Works

HackerAI injects a `content.js` script into all web pages. This script intercepts clicks on links and displays a confirmation dialog, allowing the user to decide whether to proceed or cancel.

### 🔍 Example Workflow:
1. A user clicks on a link.
2. ⚠️ A dialog appears:
   ```
   Do you really want to open this link?
   https://example.com
   ```
3. 🟢 The user can choose to proceed or 🛑 cancel.

---

## 📄 Code Overview

### `manifest.json`
Defines the extension’s metadata and permissions:
```json
{
  "manifest_version": 3,
  "name": "HackerAI - Link Confirmation",
  "version": "1.0",
  "description": "Prompts confirmation before opening a link.",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### `content.js`
Handles link interception and confirmation prompts:
```javascript
document.body.addEventListener('click', function (event) {
    let target = event.target;

    while (target && target !== document.body) {
      if (target.tagName === 'A' && target.href) {
        event.preventDefault();
        const confirmed = confirm(`Do you really want to open this link?
${target.href}`);
        if (confirmed) {
          window.location.href = target.href;
        }
        return;
      } else if (target.getAttribute && target.getAttribute('data-link')) {
        event.preventDefault();
        const link = target.getAttribute('data-link');
        const confirmed = confirm(`Do you really want to open this link?
${link}`);
        if (confirmed) {
          window.location.href = link;
        }
        return;
      }
      target = target.parentElement;
    }
});
```

---

## 🎯 Future Goals

| Feature                         | Status     |
|---------------------------------|------------|
| 🤖 **AI-Powered Link Analysis** | 🟡 Planned |
| 🛡️ **Phishing Database Integration** | 🟡 Planned |
| 📧 **Email Security Features**   | 🟡 Planned |
| ✏️ **Customizable Prompts**      | 🟡 Planned |
| 🖥️ **Integration with Antivirus Tools** | 🟡 Planned |
| 📊 **User-Friendly Dashboard**   | 🟡 Planned |
| 🌐 **Browser Compatibility**     | 🟡 Planned |

---

## 🙌 Contributing

Contributions are welcome! Follow these steps to get started:

1. 🔀 **Fork the repository** on GitHub.
2. 🖥️ **Clone your fork locally**:
   ```bash
   git clone https://github.com/<your-username>/hackerai.git
   ```
3. 🌱 **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```
4. 🛠️ **Make your changes** and test them thoroughly.
5. 📤 **Push your changes** to your fork:
   ```bash
   git push origin feature-name
   ```
6. 🔁 **Submit a pull request**:
   Provide a clear description of your changes.

Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 🛠️ Issues

If you encounter any problems or have feature requests, feel free to open an issue on GitHub: [https://github.com/JustSouichi/hackerai/issues](https://github.com/JustSouichi/hackerai/issues).

---

## 🌐 Social Links

Stay updated with the latest developments and connect with the creator:
- **GitHub Repository**: [https://github.com/JustSouichi/hackerai](https://github.com/JustSouichi/hackerai)
- **TikTok**: [@justsouichi](https://www.tiktok.com/@justsouichi)
- **LinkedIn**: [Tommaso Bertocchi](https://www.linkedin.com/in/tommaso-bertocchi-678ba22b5/)

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgements

HackerAI is inspired by the need to make online security accessible for everyone, especially for those with little technical expertise. Special thanks to the open-source community for their support and resources.
