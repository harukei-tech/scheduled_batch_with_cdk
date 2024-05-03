import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipelineSource } from 'aws-cdk-lib/pipelines';
import * as Codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodePipeline, CodeBuildStep } from 'aws-cdk-lib/pipelines';
import { DeployStage } from './deploy_stage';

export class Practice001PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const repo = new Codecommit.Repository(this, 'Practice001Repo', {
            repositoryName: 'Practice001Repo',
        });

        const pipeline = new CodePipeline(this, 'Practice001Pipeline', {
            pipelineName: 'Practice001Pipeline',
            synth: new CodeBuildStep('Synth', {
                input: CodePipelineSource.codeCommit(repo, 'master'),
                installCommands: ['npm install -g aws-cdk', 'npm install'],
                commands: [
                    'npm ci',
                    'npm run build',
                    'cdk synth'
                ],
            }),
        });

        const deployStage = new DeployStage(this, 'DeployStage');
        pipeline.addStage(deployStage);
    }
}