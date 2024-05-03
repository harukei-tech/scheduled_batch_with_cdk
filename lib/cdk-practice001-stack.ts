import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as S3 from 'aws-cdk-lib/aws-s3';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as Dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as Events from 'aws-cdk-lib/aws-events';
import * as Targets from 'aws-cdk-lib/aws-events-targets';
import * as ApiGateway from 'aws-cdk-lib/aws-apigateway';


import { Construct } from 'constructs';

export class CdkPractice001Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const region = 'us-east-1';

    const s3 = new S3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const table = new Dynamodb.Table(this, 'MyFirstTable', {
      partitionKey: { name: 'id', type: Dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const lambda = new Lambda.Function(this, 'PutS3Function', {
      runtime: Lambda.Runtime.NODEJS_20_X,
      handler: 'put_s3.handler',
      code: Lambda.Code.fromAsset('src'),
      environment: {
        BUCKET_NAME: s3.bucketName,
        TABLE_NAME: table.tableName,
        REGION: region,
      },
    });

    new Events.Rule(this, 'PutS3Rule', {
      schedule: Events.Schedule.expression('rate(5 minutes)'),
      targets: [new Targets.LambdaFunction(lambda)],
    });

    const tableViewer = new Lambda.Function(this, 'TableViewer', {
      runtime: Lambda.Runtime.NODEJS_20_X,
      handler: 'table_viewer.handler',
      code: Lambda.Code.fromAsset('src'),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    new ApiGateway.LambdaRestApi(this, 'Endpoint', {
      handler: tableViewer,
    });


    s3.grantReadWrite(lambda);
    table.grantWriteData(lambda);

  }
}
