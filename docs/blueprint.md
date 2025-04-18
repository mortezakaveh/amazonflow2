# **App Name**: ContentPilot

## Core Features:

- Data Import: Connect to RSS feeds and Google Merchant XML product feeds.
- Caption Generation: Generate SEO-optimized social media captions using Google Gemini based on imported data. The LLM should use its reasoning tool to figure out the best tone for the caption and the appropriate length, to suit the social media platform.
- Banner Generation: Generate product banners using DALL·E 3 or a compatible image model. The image generation should use an AI reasoning tool to figure out if a product from the feed needs to be present in the banner or not.
- Auto-Post to X: Auto-post generated content to X (Twitter).
- Analytics Dashboard: Provide a dashboard to view analytics (number of posts, likes, reach).

## Style Guidelines:

- Primary color: Clean white or light grey for the background.
- Secondary color: Dark grey or black for text to ensure readability.
- Accent: Teal (#008080) for buttons, links, and highlights.
- Clean and modern layout with clear sections for each function.
- Use a consistent set of icons throughout the application to represent different features and actions.
- Subtle transitions and animations to enhance user experience.

## Original User Request:
Build a Node.js-based AI-driven application that automates the entire content marketing workflow for blogs and social media. The app should:

Import data from RSS feeds and Google Merchant XML product feeds

Use Google Gemini to generate SEO-optimized blog posts, social media captions, and email content

Use DALL·E 3 or a compatible image model to generate blog visuals, product banners, and social images

Auto-post to X (Twitter), Instagram, Facebook Business Page, TikTok, Pinterest, Telegram, and WordPress

Integrate email marketing (e.g., Brevo, Mailchimp) for automated newsletter campaigns

Ensure full SEO support for blog content (meta, OpenGraph, sitemap, schema, etc.)

Support customer interactions via WhatsApp API, Instagram DM (Meta), and live chat (e.g., Crisp, Tawk.to)

Provide a dashboard with analytics, scheduler, and post status reports

Tech Stack Suggestions:

Backend: Node.js + Express.js

Frontend: Next.js / React

AI: Google Gemini API, DALL·E 3 API or Replicate

Database: MongoDB or PostgreSQL

Scheduler: BullMQ or Agenda.js

Authentication: Clerk or Auth0

Hosting: Vercel, Railway, or VPS
  