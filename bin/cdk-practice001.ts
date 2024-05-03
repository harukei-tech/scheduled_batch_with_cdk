#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkPractice001Stack } from '../lib/cdk-practice001-stack';

const app = new cdk.App();
new CdkPractice001Stack(app, 'CdkPractice001Stack');
