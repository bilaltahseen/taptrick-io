import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  try {
    const formData = await req.formData();

    if (formData.has("file")) {
      const file = formData.get("file");

      // Initialize S3 Client with the correct region and endpoint
      const s3Client = new S3Client({
        region: process.env.AWS_REGION, // Ensure this matches your bucket's region
        endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`, // Regional endpoint
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      });

      // Generate unique filename
      const randomId = uniqid();
      const ext = file.name.split(".").pop();
      const newFilename = `${randomId}.${ext}`;
      const bucketName = process.env.S3_BUCKET_NAME;

      // Convert file stream to buffer
      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }

      // Upload file to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: Buffer.concat(chunks),
          ContentType: file.type,
        })
      );

      // Generate public URL
      const link = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFilename}`;
      return Response.json({ link }, { status: 200 });
    } else {
      return Response.json({ error: "No file found in request" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}