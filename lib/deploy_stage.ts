import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkPractice001Stack } from './cdk-practice001-stack';

export class DeployStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const stack = new CdkPractice001Stack(this, 'CdkPractice001Stack');
    }
}
