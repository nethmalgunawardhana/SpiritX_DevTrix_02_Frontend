# Spirit11 Fantasy - Next.js Frontend

This is the frontend for **Spirit11 Fantasy**, a platform built with [Next.js](https://nextjs.org) to provide an interactive experience, including chatbot functionality powered by Spiritor.

## Getting Started

### Prerequisites
Make sure you have **Node.js** installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/spirit11-fantasy.git
cd spirit11-fantasy
npm install  # or yarn install or pnpm install or bun install
```

### Running the Development Server

```bash
npm run dev  # or yarn dev or pnpm dev or bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Chatbot API Integration

Spirit11 Fantasy includes a chatbot named **Spiritor** that responds to user queries. Below is an example API call to interact with the chatbot:

```
GET http://localhost:5000/chatbot/query/?query=who is player nuwan?
```

Make sure the chatbot backend is running on port **5000**.

Chatbot repository: [Spiritor AI Chat](https://github.com/nethmalgunawardhana/spiriter-ai-chat)

## Project Structure
- `pages/` - Contains the Next.js pages.
- `components/` - Reusable React components.
- `styles/` - Global and component-specific styles.
- `public/` - Static assets like images.
- `utils/` - Utility functions.

## Learn More

To learn more about Next.js, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute and explore the source code.

## Deployment

You can deploy this project on [Vercel](https://vercel.com) using:

```bash
vercel
```

Alternatively, you can deploy it on any cloud provider that supports Next.js applications.

## License
This project is licensed under the MIT License.
