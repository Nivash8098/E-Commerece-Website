# E-Commerece-Website
GenCart is a high-performance, modern e-commerce application built with React and integrated with **Google Gemini AI**. It features a sleek, "Amazon/Flipkart-inspired" UI and offers a complete shopping journey from product discovery to real-time order tracking.

---

## ✨ Key Features

-   **🤖 AI Shopping Assistant**: A persistent floating chatbot powered by Gemini 3 Flash to help users find products and answer questions.
-   **🛍️ Smart Product Deep-Dives**: AI-generated sales pitches and technical insights for every product.
-   **🛒 Advanced Checkout Flow**: A professional 3-step checkout process (Cart → Delivery Address → Payment).
-   **💳 Multiple Payment Modes**: Support for Google Pay (UPI) and Cash on Delivery (COD).
-   **📦 Real-time Order Tracking**: A visual, Amazon-style progress tracker for placed orders.
-   **🔐 Auth System**: Integrated Login and Registration components.
-   **🛠️ Seller Dashboard**: An admin interface to bulk-upload products directly to the database.
-   **🔄 Intelligent Fallback**: Automatically switches to **Demo Mode** with mock data if the backend is unreachable.

---

## 🛠️ Tech Stack

-   **Frontend**: React 19 (ES6+ Modules), Tailwind CSS
-   **Icons**: Lucide React
-   **AI Engine**: Google Gemini API (`@google/genai`)
-   **HTTP Client**: Axios
-   **Routing**: React Router 7 (HashRouter for compatibility)
-   **Modules**: ESM via `esm.sh` (No build step required for frontend)

---

## 🚀 Getting Started

### 1. Frontend Setup (No Installation Needed)
Since this project uses an **Import Map**, you don't need `npm install`.

1.  Open the project folder in **VS Code**.
2.  Install the **"Live Server"** extension.
3.  Right-click `index.html` and select **"Open with Live Server"**.
4.  The app will run at `http://127.0.0.1:5500`.

### 2. Configure Gemini AI
The AI features require a Google AI Studio API Key.
-   The app expects the key in `process.env.API_KEY`.
-   If running locally without a proxy, you can temporarily add your key in `services/geminiService.ts`:
    ```typescript
    this.ai = new GoogleGenAI({ apiKey: 'YOUR_ACTUAL_KEY_HERE' });
    ```

### 3. Backend Integration (Optional)
The app is configured to talk to a **Django** backend at `http://127.0.0.1:8000/api`.

-   If the backend is offline, the app displays an **"Amber Banner"** and uses `MOCK_PRODUCTS`.
-   To sync your own backend, update the `BASE_URL` in `services/api.ts`.

---

## 📂 Project Structure

-   `/components`: Reusable UI elements (Navbar, AI Assistant, Cards).
-   `/context`: Global state management for Authentication and Cart.
-   `/pages`: Full-page views (Home, Product Details, Admin, Tracking).
-   `/services`: API communication and Gemini AI logic.
-   `types.ts`: TypeScript interfaces for the entire data model.
-   `constants.tsx`: Mock data and configuration constants.

---

## 📝 Troubleshooting

-   **MIME Type Errors**: Ensure you are using **Live Server**. Opening the file directly as `file:///` will block ES Modules.
-   **CORS Issues**: If your backend is running but calls fail, ensure your Django/Express server allows requests from `http://127.0.0.1:5500`.
-   **API Security**: If your site is hosted on HTTPS, your backend must also use HTTPS, or the browser will block the "Mixed Content" request.

---

Developed with ❤️ by the GenCart Team.
