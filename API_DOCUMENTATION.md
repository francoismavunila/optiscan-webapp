# OptiScan API Documentation

This documentation provides details about the OptiScan backend API endpoints for eye detection and diabetic retinopathy analysis.

## Base URL

The base URL for all API endpoints is:
```
https://optiscan-backend-s1n1.onrender.com
```

## Authentication

Currently, the API does not require authentication. However, ensure you have the necessary API keys configured on the server side.

## Endpoints

### 1. Eye Detection from URL

**Endpoint:** `/classify/`  
**Method:** POST  
**Description:** Detects if an image from a URL contains a human eye.

#### Request Format
```json
{
    "image_url": "https://example.com/path/to/image.jpg"
}
```

#### Response Format
```json
{
    "is_eye": true/false
}
```

#### Error Response
```json
{
    "error": "No image URL provided"
}
```
or
```json
{
    "error": "Invalid image URL or unable to fetch image"
}
```

### 2. Eye Detection from File Upload

**Endpoint:** `/classify/file/`  
**Method:** POST  
**Description:** Detects if an uploaded image file contains a human eye.

#### Request Format
- Content-Type: `multipart/form-data`
- Parameter: `image_file` (file upload)

#### Response Format
```json
{
    "is_eye": true/false
}
```

#### Error Response
```json
{
    "error": "No image file provided"
}
```
or
```json
{
    "error": "Invalid image file or unable to process image"
}
```

### 3. Diabetic Retinopathy Detection

**Endpoint:** `/classify/file/retinopathy/`  
**Method:** POST  
**Description:** Analyzes an eye image for diabetic retinopathy and provides classification results.

#### Request Format
- Content-Type: `multipart/form-data`
- Parameter: `image_file` (file upload)

#### Response Format
```json
{
    "retinopathy": "classification_label",
    "confidences": {
        "label1": confidence_score1,
        "label2": confidence_score2,
        ...
    }
}
```

#### Error Response
```json
{
    "error": "No image file provided"
}
```
or
```json
{
    "error": "Invalid image file or unable to process image"
}
```

## Image Requirements

1. **Format:** JPEG, PNG
2. **Size:** Recommended to be under 5MB
3. **Content:** Clear images of human eyes for best results
4. **Quality:** High-resolution images are preferred for accurate detection

## Example Usage

### JavaScript Fetch API Example

```javascript
// Eye Detection from URL
async function detectEyeFromUrl(imageUrl) {
    const response = await fetch('http://your-server-domain/classify/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_url: imageUrl
        })
    });
    return await response.json();
}

// Eye Detection from File
async function detectEyeFromFile(file) {
    const formData = new FormData();
    formData.append('image_file', file);

    const response = await fetch('http://your-server-domain/classify/file/', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

// Diabetic Retinopathy Detection
async function detectRetinopathy(file) {
    const formData = new FormData();
    formData.append('image_file', file);

    const response = await fetch('http://your-server-domain/classify/file/retinopathy/', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}
```

## Error Handling

1. Always check for error responses in the API responses
2. Handle network errors appropriately
3. Validate image files before sending them to the API
4. Implement proper error messages for users when API calls fail

## Rate Limiting

Currently, there are no rate limits implemented, but it's recommended to:
1. Implement client-side rate limiting
2. Add appropriate delays between requests
3. Cache results when possible

## Best Practices

1. Always validate images before sending them to the API
2. Implement proper error handling and user feedback
3. Consider implementing retry mechanisms for failed requests
4. Cache results when appropriate to reduce server load
5. Implement proper loading states while waiting for API responses 