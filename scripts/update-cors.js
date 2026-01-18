const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.error('Error: Mising R2 environment variables in .env.local');
    process.exit(1);
}

const client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

const corsParams = {
    Bucket: R2_BUCKET_NAME,
    CORSConfiguration: {
        CORSRules: [
            {
                AllowedHeaders: ['*'],
                AllowedMethods: ['PUT', 'POST', 'GET', 'HEAD'],
                AllowedOrigins: ['http://localhost:3000', 'https://rokorobo.com', 'https://*.netlify.app'],
                ExposeHeaders: ['ETag'],
                MaxAgeSeconds: 3600,
            },
        ],
    },
};

const run = async () => {
    try {
        const data = await client.send(new PutBucketCorsCommand(corsParams));
        console.log('Success: CORS Configuration Updated for bucket ' + R2_BUCKET_NAME);
        console.log(data);
    } catch (err) {
        console.error('Error', err);
    }
};

run();
