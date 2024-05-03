import AWS from '@aws-sdk';
import { TableViewer } from 'dynamodb-table-viewer';

exports.handler = async (event, context) => {
    try {
        // Initialize the AWS SDK
        AWS.config.update({ region: 'us-east-1' });

        // Create a DynamoDB client
        const dynamodb = new AWS.DynamoDB();

        // Specify the table name
        const tableName = 'your-dynamodb-table-name';

        // Create a TableViewer instance
        const tableViewer = new TableViewer({
            dynamodb,
            tableName,
        });

        // Get the table data
        const tableData = await tableViewer.getData();

        // Return the table data as the response
        return {
            statusCode: 200,
            body: JSON.stringify(tableData),
        };
    } catch (error) {
        // Handle any errors
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};