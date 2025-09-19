#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

/**
 * Validates a suggestion against the schema
 */
function validateSuggestion(suggestion: any, schemaPath: string): { valid: boolean; errors?: any[] } {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  const validate = ajv.compile(schema);
  
  const valid = validate(suggestion);
  
  return {
    valid: !!valid,
    errors: validate.errors || undefined
  };
}

/**
 * CLI interface for validation
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: ./validate.ts <suggestion.json> [schema.json]');
    console.error('\nExample:');
    console.error('  ./validate.ts suggestion.json');
    console.error('  ./validate.ts suggestion.json custom-schema.json');
    process.exit(1);
  }
  
  try {
    const suggestionFile = resolve(args[0]);
    const schemaFile = args[1] ? resolve(args[1]) : resolve(__dirname, 'suggestion.schema.json');
    
    const suggestionData = JSON.parse(readFileSync(suggestionFile, 'utf-8'));
    
    // Handle single suggestion or array
    const suggestions = Array.isArray(suggestionData) ? suggestionData : [suggestionData];
    
    let allValid = true;
    suggestions.forEach((suggestion, index) => {
      const result = validateSuggestion(suggestion, schemaFile);
      
      if (result.valid) {
        console.log(`✅ Suggestion ${index + 1} is valid`);
      } else {
        console.error(`❌ Suggestion ${index + 1} is invalid:`);
        console.error(JSON.stringify(result.errors, null, 2));
        allValid = false;
      }
    });
    
    process.exit(allValid ? 0 : 1);
  } catch (error) {
    console.error('❌ Error validating suggestion:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}