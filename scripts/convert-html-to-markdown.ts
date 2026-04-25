/**
 * HTML to Markdown Conversion Script
 * 
 * This script converts existing HTML content in the database to Markdown.
 * Run with: npx tsx scripts/convert-html-to-markdown.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

loadEnvFile();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Convert HTML to Markdown
 */
function htmlToMarkdown(html: string): string {
  if (!html) return '';
  
  let markdown = html;
  
  // Remove extra whitespace and newlines
  markdown = markdown.replace(/\s+/g, ' ').trim();
  
  // Convert div with space-y-* classes to paragraphs
  markdown = markdown.replace(/<div[^>]*class="[^"]*space-y-\d+[^"]*"[^>]*>/gi, '');
  markdown = markdown.replace(/<\/div>/gi, '\n\n');
  
  // Convert headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  
  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Convert bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  
  // Convert italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert unordered lists
  markdown = markdown.replace(/<ul[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ul>/gi, '\n');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert ordered lists
  markdown = markdown.replace(/<ol[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ol>/gi, '\n');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Convert code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n');
  
  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/&amp;/g, '&');
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&#39;/g, "'");
  
  // Clean up multiple newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  markdown = markdown.trim();
  
  return markdown;
}

async function convertWorkExperienceDetails() {
  console.log('📝 Converting work experience details from HTML to Markdown...\n');
  
  const { data: experiences, error } = await supabase
    .from('work_experience')
    .select('id, title, company, details');
  
  if (error) {
    console.error('Error fetching work experiences:', error);
    return;
  }
  
  for (const exp of experiences || []) {
    if (exp.details && exp.details.includes('<')) {
      const markdown = htmlToMarkdown(exp.details);
      
      const { error: updateError } = await supabase
        .from('work_experience')
        .update({ details: markdown })
        .eq('id', exp.id);
      
      if (updateError) {
        console.error(`❌ Failed to update ${exp.company}:`, updateError.message);
      } else {
        console.log(`✅ Converted: ${exp.title} at ${exp.company}`);
      }
    } else {
      console.log(`⏭️  Skipped (no HTML): ${exp.title} at ${exp.company}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting HTML to Markdown conversion...\n');
  
  await convertWorkExperienceDetails();
  
  console.log('\n✨ Conversion complete!');
}

main().catch(console.error);
