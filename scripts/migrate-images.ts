/**
 * Image Migration Script
 * 
 * This script uploads all local images to Supabase Storage
 * and updates the database with the new URLs.
 * 
 * Run with: npx ts-node scripts/migrate-images.ts
 * Or: npx tsx scripts/migrate-images.ts
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

const BUCKET_NAME = 'portfolio-images';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface ImageMapping {
  localPath: string;
  storagePath: string;
  table?: string;
  column?: string;
  matchColumn?: string;
  matchValue?: string;
}

// Define all images to migrate
const imageMappings: ImageMapping[] = [
  // Profile image
  { localPath: 'profile.png', storagePath: 'profile/profile.png' },
  
  // Work experience logos
  { localPath: 'work/arcfusion.png', storagePath: 'work/arcfusion.png' },
  { localPath: 'work/rv.jpeg', storagePath: 'work/rv.jpeg' },
  { localPath: 'work/mbs.jpeg', storagePath: 'work/mbs.jpeg' },
  { localPath: 'work/heymm.jpeg', storagePath: 'work/heymm.jpeg' },
  { localPath: 'work/senyou.jpeg', storagePath: 'work/senyou.jpeg' },
  { localPath: 'work/union.jpeg', storagePath: 'work/union.jpeg' },
  
  // Education logos
  { localPath: 'education/mahidol.png', storagePath: 'education/mahidol.png' },
  { localPath: 'education/uclan.png', storagePath: 'education/uclan.png' },
  { localPath: 'education/ncc.jpeg', storagePath: 'education/ncc.jpeg' },
  
  // Certification images
  { localPath: 'certifications/aiforeveryone.png', storagePath: 'certifications/aiforeveryone.png' },
  { localPath: 'certifications/supervisedml.png', storagePath: 'certifications/supervisedml.png' },
  { localPath: 'certifications/blockchain.png', storagePath: 'certifications/blockchain.png' },
  { localPath: 'certifications/duolingo.png', storagePath: 'certifications/duolingo.png' },
  { localPath: 'certifications/advancedreact.png', storagePath: 'certifications/advancedreact.png' },
  
  // Skill logos
  { localPath: 'skills/js.png', storagePath: 'skills/js.png' },
  { localPath: 'skills/typescript.png', storagePath: 'skills/typescript.png' },
  { localPath: 'skills/php.png', storagePath: 'skills/php.png' },
  { localPath: 'skills/dart.png', storagePath: 'skills/dart.png' },
  { localPath: 'skills/python.png', storagePath: 'skills/python.png' },
  { localPath: 'skills/go.png', storagePath: 'skills/go.png' },
  { localPath: 'skills/react.png', storagePath: 'skills/react.png' },
  { localPath: 'skills/reactjs.png', storagePath: 'skills/reactjs.png' },
  { localPath: 'skills/fastapi.png', storagePath: 'skills/fastapi.png' },
  { localPath: 'skills/echo.png', storagePath: 'skills/echo.png' },
  { localPath: 'skills/laravel.png', storagePath: 'skills/laravel.png' },
  { localPath: 'skills/expressjs.png', storagePath: 'skills/expressjs.png' },
  { localPath: 'skills/strapi.png', storagePath: 'skills/strapi.png' },
  { localPath: 'skills/elysia.png', storagePath: 'skills/elysia.png' },
  { localPath: 'skills/flutter.png', storagePath: 'skills/flutter.png' },
  { localPath: 'skills/react native.png', storagePath: 'skills/react-native.png' },
  { localPath: 'skills/aws.png', storagePath: 'skills/aws.png' },
  { localPath: 'skills/docker.png', storagePath: 'skills/docker.png' },
  { localPath: 'skills/kubernetes.png', storagePath: 'skills/kubernetes.png' },
  { localPath: 'skills/githubaction.png', storagePath: 'skills/githubaction.png' },
  { localPath: 'skills/circle.png', storagePath: 'skills/circle.png' },
  { localPath: 'skills/jenkin.png', storagePath: 'skills/jenkin.png' },
  { localPath: 'skills/Terraform.png', storagePath: 'skills/terraform.png' },
  { localPath: 'skills/Grafana.png', storagePath: 'skills/grafana.png' },
  { localPath: 'skills/elk.png', storagePath: 'skills/elk.png' },
  { localPath: 'skills/openai.png', storagePath: 'skills/openai.png' },
  { localPath: 'skills/claude.png', storagePath: 'skills/claude.png' },
  { localPath: 'skills/langchain.png', storagePath: 'skills/langchain.png' },
  { localPath: 'skills/hugface.png', storagePath: 'skills/hugface.png' },
  { localPath: 'skills/pytorch.png', storagePath: 'skills/pytorch.png' },
  { localPath: 'skills/vercel.png', storagePath: 'skills/vercel.png' },
  { localPath: 'skills/solidity.png', storagePath: 'skills/solidity.png' },
  { localPath: 'skills/hardhat.png', storagePath: 'skills/hardhat.png' },
  { localPath: 'skills/truffle.png', storagePath: 'skills/truffle.png' },
  { localPath: 'skills/web3js.png', storagePath: 'skills/web3js.png' },
  { localPath: 'skills/etherjs.png', storagePath: 'skills/etherjs.png' },
  { localPath: 'skills/metamask.png', storagePath: 'skills/metamask.png' },
];

async function uploadImage(localPath: string, storagePath: string): Promise<string | null> {
  const fullPath = path.join(PUBLIC_DIR, localPath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${fullPath}`);
    return null;
  }
  
  const fileBuffer = fs.readFileSync(fullPath);
  const contentType = getContentType(localPath);
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });
  
  if (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath);
  
  console.log(`✅ Uploaded: ${localPath} -> ${urlData.publicUrl}`);
  return urlData.publicUrl;
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return types[ext] || 'application/octet-stream';
}

async function updateDatabaseUrls(uploadedImages: Map<string, string>) {
  console.log('\n📝 Updating database with new image URLs...\n');
  
  // Update profile image
  const profileUrl = uploadedImages.get('profile/profile.png');
  if (profileUrl) {
    const { error } = await supabase
      .from('profile')
      .update({ profile_image_url: profileUrl })
      .is('profile_image_url', null);
    
    if (!error) console.log('✅ Updated profile image URL');
  }
  
  // Update work experience logos
  const workMappings: Record<string, string> = {
    'work/arcfusion.png': 'ArcFusion Logo',
    'work/rv.jpeg': 'RV Connex Logo',
    'work/mbs.jpeg': 'Magic Box Solutions Logo',
    'work/heymm.jpeg': 'Hey Myanmar Logo',
    'work/senyou.jpeg': 'Senyou Logo',
    'work/union.jpeg': 'The Union Logo',
  };
  
  for (const [storagePath, logoAlt] of Object.entries(workMappings)) {
    const url = uploadedImages.get(storagePath);
    if (url) {
      const { error } = await supabase
        .from('work_experience')
        .update({ logo_url: url })
        .eq('logo_alt', logoAlt);
      
      if (!error) console.log(`✅ Updated work experience logo: ${logoAlt}`);
    }
  }
  
  // Update education logos
  const eduMappings: Record<string, string> = {
    'education/mahidol.png': 'Mahidol University Logo',
    'education/uclan.png': 'UCLan Logo',
    'education/ncc.jpeg': 'NCC Logo',
  };
  
  for (const [storagePath, logoAlt] of Object.entries(eduMappings)) {
    const url = uploadedImages.get(storagePath);
    if (url) {
      const { error } = await supabase
        .from('education')
        .update({ logo_url: url })
        .eq('logo_alt', logoAlt);
      
      if (!error) console.log(`✅ Updated education logo: ${logoAlt}`);
    }
  }
  
  // Update certification images
  const certMappings: Record<string, string> = {
    'certifications/aiforeveryone.png': 'AI For Everyone',
    'certifications/supervisedml.png': 'Supervised Machine Learning: Regression and Classification',
    'certifications/blockchain.png': 'Blockchain Expert',
    'certifications/duolingo.png': 'English Proficiency',
    'certifications/advancedreact.png': 'Advanced React',
  };
  
  for (const [storagePath, title] of Object.entries(certMappings)) {
    const url = uploadedImages.get(storagePath);
    if (url) {
      const { error } = await supabase
        .from('certifications')
        .update({ image_url: url })
        .eq('title', title);
      
      if (!error) console.log(`✅ Updated certification image: ${title}`);
    }
  }
  
  // Update skill logos
  const skillMappings: Record<string, string> = {
    'skills/js.png': 'Javascript',
    'skills/typescript.png': 'Typescript',
    'skills/php.png': 'PHP',
    'skills/dart.png': 'Dart',
    'skills/python.png': 'Python',
    'skills/go.png': 'Go',
    'skills/react.png': 'React',
    'skills/reactjs.png': 'React.js',
    'skills/fastapi.png': 'Fast Api',
    'skills/echo.png': 'Echo',
    'skills/laravel.png': 'Laravel',
    'skills/expressjs.png': 'Express',
    'skills/strapi.png': 'Strapi',
    'skills/elysia.png': 'Elysia',
    'skills/flutter.png': 'Flutter',
    'skills/react-native.png': 'React Native',
    'skills/aws.png': 'AWS',
    'skills/docker.png': 'Docker',
    'skills/kubernetes.png': 'Kubernetes',
    'skills/githubaction.png': 'Github Actions',
    'skills/circle.png': 'Circle CI',
    'skills/jenkin.png': 'Jenkins',
    'skills/terraform.png': 'Terraform',
    'skills/grafana.png': 'Grafana',
    'skills/elk.png': 'ELK Stack',
    'skills/openai.png': 'OpenAI GPT',
    'skills/claude.png': 'Claude',
    'skills/langchain.png': 'Langchain',
    'skills/hugface.png': 'Hugging Face',
    'skills/pytorch.png': 'PyTorch',
    'skills/vercel.png': 'Vercel AI',
    'skills/solidity.png': 'Solidity',
    'skills/hardhat.png': 'Hardhat',
    'skills/truffle.png': 'Truffle',
    'skills/web3js.png': 'Web3.js',
    'skills/etherjs.png': 'Ethers.js',
    'skills/metamask.png': 'MetaMask',
  };
  
  for (const [storagePath, skillName] of Object.entries(skillMappings)) {
    const url = uploadedImages.get(storagePath);
    if (url) {
      const { error } = await supabase
        .from('skills')
        .update({ logo_url: url })
        .eq('name', skillName);
      
      if (!error) console.log(`✅ Updated skill logo: ${skillName}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting image migration to Supabase Storage...\n');
  
  const uploadedImages = new Map<string, string>();
  
  for (const mapping of imageMappings) {
    const url = await uploadImage(mapping.localPath, mapping.storagePath);
    if (url) {
      uploadedImages.set(mapping.storagePath, url);
    }
  }
  
  console.log(`\n📊 Uploaded ${uploadedImages.size}/${imageMappings.length} images\n`);
  
  await updateDatabaseUrls(uploadedImages);
  
  console.log('\n✨ Migration complete!');
}

main().catch(console.error);
