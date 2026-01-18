import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'
export const dynamic = 'force-static'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: '#0b1210',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d0e0c0', // Brand Green
                    fontWeight: 900,
                    fontFamily: 'monospace',
                    border: '2px solid #d0e0c0',
                }}
            >
                R
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
