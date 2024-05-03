#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Practice001PipelineStack } from '../lib/cdk-practice001-codepipeline-stack';

const app = new cdk.App();
new Practice001PipelineStack(app, 'Practice001PipelineStack');
