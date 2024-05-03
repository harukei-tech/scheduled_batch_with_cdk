import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";


export const handler = async (event, context) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
    console.log("Received context:", JSON.stringify(context, null, 2));
    // Create an S3 client
    const region = process.env.REGION;
    const s3Client = new S3Client({ region: region });

    // Set the S3 bucket and file details
    const bucketName = process.env.BUCKET_NAME;
    const fileName = "practice001.txt";
    const fileContent = "file-content";

    const tableName = process.env.TABLE_NAME;

    // Create the PutItem command
    const putItemCommand = new PutItemCommand({
        TableName: tableName,
        Item: {
            id: { S: "1" },
            name: { S: "my-name" },
        },
    });

    // Create a DynamoDB client
    const dynamoDBClient = new DynamoDBClient({ region: region });
    dynamoDBClient.send(putItemCommand);


    // Create the PutObject command
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
    });

    try {
        // Upload the file to S3
        const response = await s3Client.send(putObjectCommand);
        console.log("File uploaded successfully:", response);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};