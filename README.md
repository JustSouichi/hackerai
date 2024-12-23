# HackerAI - Link Confirmation

HackerAI is an open-source Chrome extension designed to improve online security for beginners and small businesses. It provides a lightweight solution to mitigate phishing attacks and suspicious links by prompting the user for confirmation before opening any link.

## Key Features
- **Link Confirmation Dialog**: Displays a confirmation dialog before opening any link, ensuring users are aware of their actions.
- **Support for Custom Links**: Handles both standard HTML links (`<a>` tags) and custom attributes like `data-link`.
- **Beginner-Friendly**: Designed for non-technical users to add an extra layer of security.
- **Lightweight and Efficient**: Minimal performance impact while providing essential protection.
- **Open-Source**: Fully transparent codebase, open to contributions and community collaboration.

---

## Installation
Follow these steps to install the extension locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/JustSouichi/hackerai.git
   ```
2. Go to the Chrome Extensions page by typing `chrome://extensions/` in your browser.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing the project files.
5. The extension is now active and ready to use!

---

## How It Works
HackerAI injects a content script (`content.js`) into all web pages. This script intercepts clicks on links and displays a confirmation dialog, allowing the user to decide whether to proceed or cancel.

### Example Workflow:
1. A user clicks on a link.
2. A dialog appears:
   ```
   Do you really want to open this link?
   https://example.com
   ```
3. The user can choose to proceed or cancel.

This simple yet effective mechanism helps prevent accidental clicks on malicious or phishing links.

---

## Code Overview

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

## Future Goals
We aim to enhance HackerAI with the following features:

1. **AI-Powered Link Analysis**:
   - Use machine learning to analyze links in real-time for potential phishing or malicious activity.
   - Highlight risky links with visual cues.

2. **Phishing Database Integration**:
   - Compare URLs against known phishing databases for additional security.
   - Provide detailed warnings about flagged links.

3. **Email Security Features**:
   - Scan email links and attachments for potential threats.
   - Detect and flag suspicious patterns in email content.

4. **Customizable Confirmation Prompts**:
   - Allow users to customize the confirmation message.
   - Include additional context, such as website reputation scores.

5. **Integration with Antivirus Tools**:
   - Collaborate with existing antivirus solutions for enhanced threat detection.
   - Provide seamless interoperability between HackerAI and third-party security tools.

6. **User-Friendly Dashboard**:
   - Add a simple interface to view blocked links and security reports.
   - Enable users to adjust security settings and monitor flagged URLs.

7. **Browser Compatibility**:
   - Expand support to Firefox, Edge, and other major browsers.

---

## Contributing
Contributions are welcome! Follow these steps to get started:

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/hackerai.git
   ```
3. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
4. Make your changes and test them thoroughly.
5. Push your changes to your fork:
   ```bash
   git push origin feature-name
   ```
6. Submit a pull request with a clear description of your changes.

Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## Issues
If you encounter any problems or have feature requests, feel free to open an issue on GitHub: [https://github.com/JustSouichi/hackerai/issues](https://github.com/JustSouichi/hackerai/issues).

When reporting bugs, please include:
- Steps to reproduce the issue.
- Expected behavior vs. actual behavior.
- Screenshots or logs, if applicable.

---

## Social Links
Stay updated with the latest developments and connect with the creator:
- **GitHub Repository**: [https://github.com/JustSouichi/hackerai](https://github.com/JustSouichi/hackerai)
- **TikTok**: [@justsouichi](https://www.tiktok.com/@justsouichi)
- **LinkedIn**: [Tommaso Bertocchi](https://www.linkedin.com/in/tommaso-bertocchi-678ba22b5/)

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements
HackerAI is inspired by the need to make online security accessible for everyone, especially for those with little technical expertise. Special thanks to the open-source community for their support and resources.

