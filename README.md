# OptiScan Frontend

A Next.js application for eye analysis using AI, featuring eye detection and diabetic retinopathy detection.

## Features

- Eye Detection: Upload images to detect if they contain human eyes
- Diabetic Retinopathy Detection: Analyze eye images for signs of diabetic retinopathy
- Modern UI with Tailwind CSS
- Real-time analysis using Hugging Face API

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Hugging Face API key

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd optiscan-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create a \`.env.local\` file in the root directory and add your API keys:
\`\`\`
NEXT_PUBLIC_HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
NEXT_PUBLIC_RETINOPATHY_API_URL=https://bhimrazy-diabetic-retinopathy-detection.hf.space/predict
\`\`\`

## Development

Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Navigate to either the Eye Detection or Diabetic Retinopathy Detection page
2. Upload an image using the file input
3. Click "Analyze Image" to process the image
4. View the results and confidence scores

## Technologies Used

- Next.js 13+
- React 18
- TypeScript
- Tailwind CSS
- Hugging Face API

## License

MIT 