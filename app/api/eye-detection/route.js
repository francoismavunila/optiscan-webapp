import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { image } = await request.json()

    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/detr-resnet-50',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: image,
          parameters: {
            candidate_labels: ['human eye', 'not an eye', 'animal eye', 'object', 'background'],
          },
        }),
      }
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process the image' },
      { status: 500 }
    )
  }
} 