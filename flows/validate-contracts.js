#!/usr/bin/env node

/**
 * Validate swarm contracts against JSON Schema
 */

const fs = require('fs');
const path = require('path');

// Simple JSON Schema validation
function validateSchema(schemaPath) {
  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    
    // Basic schema validation checks
    if (!schema.$schema) {
      throw new Error('Missing $schema property');
    }
    
    if (!schema.title) {
      throw new Error('Missing title property');
    }
    
    if (!schema.type || schema.type !== 'object') {
      throw new Error('Schema must have type: object');
    }
    
    if (!schema.required || !Array.isArray(schema.required)) {
      throw new Error('Schema must have required array');
    }
    
    if (!schema.properties || typeof schema.properties !== 'object') {
      throw new Error('Schema must have properties object');
    }
    
    console.log(`✅ ${path.basename(schemaPath)}: Valid JSON Schema`);
    console.log(`   - Title: ${schema.title}`);
    console.log(`   - Required fields: ${schema.required.join(', ')}`);
    console.log(`   - Properties: ${Object.keys(schema.properties).length}`);
    
    return true;
  } catch (error) {
    console.error(`❌ ${path.basename(schemaPath)}: ${error.message}`);
    return false;
  }
}

// Validate both contracts
console.log('Validating swarm contracts...\n');

const contractsDir = path.join(__dirname, 'contracts');
const requestSchema = path.join(contractsDir, 'swarm-request.schema.json');
const outputSchema = path.join(contractsDir, 'swarm-output.schema.json');

let valid = true;
valid = validateSchema(requestSchema) && valid;
console.log();
valid = validateSchema(outputSchema) && valid;

console.log(`\n${valid ? '✅ All contracts are valid!' : '❌ Some contracts have errors'}`);
process.exit(valid ? 0 : 1);