#!/usr/bin/env node
import { Command } from 'commander';
import { generateDirectusTypes } from './generate.js';

// CLI logic
if (import.meta.url === `file://${process.argv[1]}`) {
    const program = new Command();
    program
      .name('directus-sdk-typegen')
      .description('CLI and library to generate TypeScript types from Directus collections for use with Directus SDK.')
      .version('1.0.0')
      .option('-o, --output <path>', 'Output file path including filename', './directus-schema.ts')
      .option('-u, --url <url>', 'Directus API URL', 'http://localhost:8055')
      .option('-t, --token <token>', 'Directus API token', 'your-token-here')
      .action(async (options) => {
        try {
          await generateDirectusTypes({
            outputPath: options.output,
            directusUrl: options.url,
            directusToken: options.token,
          });
        } catch (error) {
          console.error('Error generating Directus types:', error);
          process.exit(1);
        }
      });
    program.parse();
  }

// Export for use as a module
export { generateDirectusTypes } from './generate.js';
export * from './api.js';
export * from './logic.js';
export * from './utils.js';
