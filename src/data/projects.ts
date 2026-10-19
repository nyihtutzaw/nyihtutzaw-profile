import { workExperienceData } from './experience';

export type ProjectCategory = 'AI' | 'Security' | 'E-commerce' | 'Healthcare' | 'Platform' | 'Logistics' | 'Web' | 'Mobile';

export interface ProjectStep {
  title: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Work-experience project: must match a company in workExperienceData (role, period, logo and stack come from it). */
  company?: string;
  /** Standalone project (no employer): provide these instead of `company`. */
  standalone?: { org: string; role: string; skills: string[]; period?: string };
  /** Card image (16:10), used on the showcase page. */
  thumbnail?: string;
  /** Step-by-step walkthrough, rendered as a vertical-scroll presentation on the detail page. */
  steps?: ProjectStep[];
  /** 'mobile' shows walkthrough images as phone screenshots (portrait, unframed) instead of browser windows. */
  device?: 'web' | 'mobile';
  /** Public store listings for mobile apps, linked from the detail page. */
  stores?: { play?: string; appStore?: string };
  category: ProjectCategory;
  featured?: boolean;
  summary: string;
  highlights?: string[];
}

/** Each project is a body of work from one role; period, logo, stack and write-up come from the experience data. */
const projects: Project[] = [
  {
    slug: 'ezypos',
    title: 'EzyPOS — Multi-client Point of Sale',
    category: 'Platform',
    featured: true,
    standalone: { org: 'Personal project', role: 'Full-stack Developer', skills: ['Next.js', 'React', 'Vercel'] },
    thumbnail: '/projects/ezypos/thumbnail.jpg',
    summary:
      'A multi-client point-of-sale system. Each shop gets its own workspace to sell, manage stock and see reports, in English or Myanmar.',
    highlights: [
      'Multi-tenant: every client gets a branded workspace with its own users',
      'Sales with retail/wholesale pricing, product variants and live stock',
      'Dashboard and reports for revenue, profit and low-stock alerts',
    ],
    steps: [
      {
        title: 'See the shop at a glance',
        description: 'The dashboard answers "how is today going?" in one look.',
        bullets: ['30-day revenue, orders and gross profit', 'Total stock value', 'Recent sales and low-stock alerts'],
        image: '/projects/ezypos/dashboard.jpg',
        imageAlt: 'EzyPOS dashboard',
      },
      {
        title: 'Make a sale',
        description: 'Pick category, product and variant, then set payment and delivery.',
        bullets: ['Price follows the sale type (retail or wholesale)', 'Discount and delivery fee with a live total', 'Shop pickup or delivery company'],
        image: '/projects/ezypos/new-sale.jpg',
        imageAlt: 'EzyPOS new sale screen',
      },
      {
        title: 'Manage products and variants',
        description: 'Each product has size and colour variants, each with its own stock.',
        bullets: ['Search by name or SKU', 'Categories to organise the catalogue', 'Edit or deactivate in one click'],
        image: '/projects/ezypos/products.jpg',
        imageAlt: 'EzyPOS products list',
      },
      {
        title: 'Restock from suppliers',
        description: 'Record a purchase with cost, retail and wholesale prices per variant.',
        bullets: ['Prices become the current selling prices', 'Delivery companies managed separately'],
        image: '/projects/ezypos/purchase.jpg',
        imageAlt: 'EzyPOS new purchase screen',
      },
      {
        title: 'Understand the business',
        description: 'Reports show what sells and what it earns.',
        bullets: ['Sales by day, month, category and delivery company', 'Quick ranges: today, 7 days, 30 days, this year'],
        image: '/projects/ezypos/reports.jpg',
        imageAlt: 'EzyPOS reports',
      },
    ],
  },
  {
    slug: 'logistics-management-system',
    title: 'Logistics Management System',
    category: 'Logistics',
    featured: true,
    standalone: { org: 'Client project', role: 'Full-stack Developer', skills: ['React'] },
    thumbnail: '/projects/logistics-management-system/thumbnail.jpg',
    summary: 'A logistics management system for an international freight company. It runs pricing, orders, waybills, cargo loading and unloading, customs invoicing and payments on one platform.',
    highlights: [
      'Waybills, cargo loading and unloading, and customs invoicing in one system',
      'Freight pricing rules and estimated transit times by route',
      'Payments recorded in MMK and CNY, with English and Chinese labels',
    ],
    steps: [
      {
        title: 'Run the business from one screen',
        description: 'The home dashboard gives staff the key numbers, sales by branch and a menu for every department.',
        bullets: ['Total waybills, users, sales and transactions', 'Sale value by branch and monthly order charts', 'Menu for orders, documents, customs, finance and reports'],
        image: '/projects/logistics-management-system/dashboard.jpg',
        imageAlt: 'Logistics system: Run the business from one screen',
      },
      {
        title: 'Set freight pricing rules',
        description: 'Base freight is defined once and applied to every shipment.',
        bullets: ['Rules by departure and destination branch', 'Cargo group and type (general, medical, machinery; light, heavy)', 'Charged by weight or measurement above or below a limit'],
        image: '/projects/logistics-management-system/freight.jpg',
        imageAlt: 'Logistics system: Set freight pricing rules',
      },
      {
        title: 'Plan with estimated transit times',
        description: 'Each route and shipping mode has a standard duration in days.',
        bullets: ['Routes between China and Myanmar branches', 'Duration per shipping mode', 'Add, edit or remove routes'],
        image: '/projects/logistics-management-system/est.jpg',
        imageAlt: 'Logistics system: Plan with estimated transit times',
      },
      {
        title: 'Take customer orders',
        description: 'Every shipment starts as an order that can be searched and tracked.',
        bullets: ['Search by order number or date range', 'Shipment type (FCL / LCL), shipping mode and route', 'Export, edit and print'],
        image: '/projects/logistics-management-system/orders.jpg',
        imageAlt: 'Logistics system: Take customer orders',
      },
      {
        title: 'Create waybills',
        description: 'One form captures the shipper, the consignee and the cargo.',
        bullets: ['Shipment type, shipping mode, quotation and licence numbers', 'Shipper and consignee details', 'Cargo lines with weight, measurement and value'],
        image: '/projects/logistics-management-system/waybill.jpg',
        imageAlt: 'Logistics system: Create waybills',
      },
      {
        title: 'Find any waybill fast',
        description: 'Staff look up waybills by number or date and print documents in a click.',
        bullets: ['Search and date filters', 'Edit, print and export', 'A separate tracking page for customer enquiries'],
        image: '/projects/logistics-management-system/query.jpg',
        imageAlt: 'Logistics system: Find any waybill fast',
      },
      {
        title: 'Load cargo onto trucks and containers',
        description: 'Each loading record ties waybills to a route, a vehicle or container and an operator.',
        bullets: ['Departure branch and destination', 'Container / truck number and operator', 'Upload documents, edit or remove records'],
        image: '/projects/logistics-management-system/loading.jpg',
        imageAlt: 'Logistics system: Load cargo onto trucks and containers',
      },
      {
        title: 'Unload and confirm at the destination',
        description: 'Arrivals are recorded against the same waybill, so the trail is complete.',
        bullets: ['Waybill, date, destination and container / truck number', 'Operator who handled the unloading', 'Search by waybill and date, export'],
        image: '/projects/logistics-management-system/unloading.jpg',
        imageAlt: 'Logistics system: Unload and confirm at the destination',
      },
      {
        title: 'Invoice customs and licences',
        description: 'Finance issues invoices for import licences and duty.',
        bullets: ['Deposit invoices and invoices by customer code', 'Reference and licence numbers on each invoice', 'Export to spreadsheet and print'],
        image: '/projects/logistics-management-system/invoices.jpg',
        imageAlt: 'Logistics system: Invoice customs and licences',
      },
      {
        title: 'Record payments in MMK and CNY',
        description: 'Collected payments are logged per waybill and currency.',
        bullets: ['Bank or account collection', 'Billing amount in MMK or CNY', 'Search by waybill, customer and date, export'],
        image: '/projects/logistics-management-system/collected.jpg',
        imageAlt: 'Logistics system: Record payments in MMK and CNY',
      },
    ],
  },
  {
    slug: 'recruitment-document-management-system',
    title: 'Recruitment Document Management System',
    category: 'Platform',
    featured: true,
    standalone: { org: 'Side project', role: 'Full-stack Developer', skills: ['Next.js', 'React', 'Tailwind CSS'] },
    thumbnail: '/projects/recruitment-document-management-system/thumbnail.jpg',
    summary:
      'A document management system for a recruitment agency that sends workers from Myanmar to Japan. It covers the whole journey: CV, interview, government documents, departure and billing.',
    highlights: [
      'Student CVs filled in a step-by-step form and rendered as a Japanese 履歴書',
      'Interview groups with pass/fail results and terms-and-conditions acceptance',
      'Visa and document stages, approval-based spending, vouchers and invoices',
    ],
    steps: [
      {
        title: 'See where every student stands',
        description: 'The admin dashboard counts students at each stage, from registration to departure.',
        bullets: ['Students, CVs, interviews and waiting list', 'Passed, document-in-progress and departed totals'],
        image: '/projects/recruitment-document-management-system/dashboard.jpg',
        imageAlt: 'Recruitment system: See where every student stands',
      },
      {
        title: 'Collect student CVs',
        description: 'Every registered student has a CV record staff can filter, sort and review.',
        bullets: ['Japanese level, age, gender and Tokutei certificate at a glance', 'Tracks which CVs have all fields confirmed'],
        image: '/projects/recruitment-document-management-system/cvs.jpg',
        imageAlt: 'Recruitment system: Collect student CVs',
      },
      {
        title: 'Fill in the CV step by step',
        description: "Staff fill each student's CV in a 6-step Japanese register form, with Myanmar hints under every field.",
        bullets: ['Names in Myanmar, English and katakana', 'A checkbox on each field confirms it has been checked', 'Edit logs show who changed what'],
        image: '/projects/recruitment-document-management-system/cvform.jpg',
        imageAlt: 'Recruitment system: Fill in the CV step by step',
      },
      {
        title: 'Generate a Japanese-format CV',
        description: 'Each CV is rendered as a Japanese 履歴書 (rirekisho), ready to export for employers.',
        bullets: ['Profile, health, skills, education, work history and family', 'Edit, then export to share with Japanese companies'],
        image: '/projects/recruitment-document-management-system/cv.jpg',
        imageAlt: 'Recruitment system: Generate a Japanese-format CV',
      },
      {
        title: 'Organise interview groups',
        description: 'Candidates are grouped per interview, linked to the agency, the Japanese organisation and the employer.',
        bullets: ['One group per interview date', 'Export the list to Excel'],
        image: '/projects/recruitment-document-management-system/groups.jpg',
        imageAlt: 'Recruitment system: Organise interview groups',
      },
      {
        title: 'Record interview results',
        description: "Inside a group, staff see each candidate's Japanese level and whether they accepted the terms and conditions, then mark who passed.",
        bullets: ['Terms are written in Myanmar and accepted by each candidate', "Open any candidate's CV from the list", 'Download the name list for the employer'],
        image: '/projects/recruitment-document-management-system/candidates.jpg',
        imageAlt: 'Recruitment system: Record interview results',
      },
      {
        title: 'Track government documents',
        description: 'Admins define the visa and paperwork stages each passed worker goes through.',
        bullets: ['COE, visa application, visa, MOL contract, Smart Card', 'Each stage links to a date field and can be reordered by drag and drop'],
        image: '/projects/recruitment-document-management-system/stages.jpg',
        imageAlt: 'Recruitment system: Track government documents',
      },
      {
        title: 'Approve spending requests',
        description: 'Visa fees and travel costs go through an approval chain before they are paid.',
        bullets: ['Section leader, CFO and CEO approval', 'Amounts in USD or MMK'],
        image: '/projects/recruitment-document-management-system/requests.jpg',
        imageAlt: 'Recruitment system: Approve spending requests',
      },
      {
        title: 'Turn vouchers into invoices',
        description: 'Expenses are recorded as vouchers and then billed to the Japanese organisation.',
        bullets: ['Vouchers link to the invoice that bills them', 'Invoices track totals and payment deadlines'],
        image: '/projects/recruitment-document-management-system/vouchers.jpg',
        imageAlt: 'Recruitment system: Turn vouchers into invoices',
      },
    ],
  },
  {
    slug: 'lamonada',
    title: 'Lamonada — Beauty & Wellness App',
    category: 'Mobile',
    device: 'mobile',
    standalone: { org: 'Side project', role: 'Mobile Developer', skills: ['Android', 'iOS'] },
    stores: {
      play: 'https://play.google.com/store/apps/details?id=com.app.lamona',
      appStore: 'https://apps.apple.com/us/app/lamonada/id6776083694',
    },
    thumbnail: '/projects/lamonada/thumbnail.jpg',
    summary:
      'An iOS and Android app for a skin and aesthetic clinic. Customers browse treatments, buy promotion packages and prepaid cards, and earn loyalty points.',
    highlights: [
      'Treatments by category, with search and favourites',
      'Promotion packages and prepaid cards with usage history',
      'Loyalty points, push notifications and articles from the clinic',
    ],
    steps: [
      {
        title: "Open on what's new",
        description: "The home screen puts the clinic's banners, treatment categories and current packages in one scroll.",
        bullets: ['Category shortcuts with images', 'Promotion packages with price and number of services', 'Quick links to all services'],
        image: '/projects/lamonada/home.jpg',
        imageAlt: 'Lamonada: home screen',
      },
      {
        title: 'Browse and search treatments',
        description: 'Treatments are grouped by category, with a search bar at the top.',
        bullets: ['Search by name', 'Sections per category, such as biostimulator and Botox injections', 'Save favourites for later'],
        image: '/projects/lamonada/browse.jpg',
        imageAlt: 'Lamonada: browse treatments',
      },
      {
        title: 'Read the treatment details',
        description: 'Each treatment has its own page with price, photos and a full description in Myanmar.',
        bullets: ['Price and treatment tag', 'Service details written by the clinic'],
        image: '/projects/lamonada/service.jpg',
        imageAlt: 'Lamonada: treatment details',
      },
      {
        title: 'Buy a promotion package',
        description: 'Packages bundle treatments into one price that is valid for a set period.',
        bullets: ['Package price and validity, such as 12 months', 'Included services and number of visits'],
        image: '/projects/lamonada/package.jpg',
        imageAlt: 'Lamonada: promotion package',
      },
      {
        title: 'Collect points and use prepaid cards',
        description: "The profile keeps a customer's loyalty points, prepaid cards and purchase history.",
        bullets: ['Point balance and point history', 'Prepaid cards, purchases and usage', 'Customers can delete their account in the app'],
        image: '/projects/lamonada/profile.jpg',
        imageAlt: 'Lamonada: profile with points and prepaid cards',
      },
    ],
  },
  {
    slug: 'dkn-pos',
    title: 'DKN POS — Point of Sale for Small Shops',
    category: 'Mobile',
    device: 'mobile',
    standalone: { org: 'Side project', role: 'Mobile Developer', skills: ['Android'] },
    stores: { play: 'https://play.google.com/store/apps/details?id=com.dkn.dkn_pos' },
    thumbnail: '/projects/dkn-pos/thumbnail.jpg',
    summary:
      'An Android point-of-sale app for small shops. Ring up sales, print receipts on Bluetooth printers, keep stock right and see daily profit, in Burmese or English.',
    highlights: [
      'Retail and wholesale prices, discounts, credit sales and returns',
      'Burmese receipts on 58 mm and 80 mm Bluetooth thermal printers',
      'Stock that updates itself, low-stock alerts and real profit reports',
    ],
    steps: [
      {
        title: 'Ring up a sale',
        description: 'Pick items, set quantities and see the total update as you go.',
        bullets: ['Search items by name', 'Several sale prices per item, such as retail and wholesale', 'Switch between Burmese and English from any screen'],
        image: '/projects/dkn-pos/sell.jpg',
        imageAlt: 'DKN POS: sell screen',
      },
      {
        title: 'Take payment',
        description: 'Charge a walk-in or saved customer with the payment method they use.',
        bullets: ['Cash, KPay or any method the shop adds', 'Discount by percentage or amount', 'Sell on credit and record part payments later'],
        image: '/projects/dkn-pos/charge.jpg',
        imageAlt: 'DKN POS: charge sheet',
      },
      {
        title: 'Print a Burmese receipt',
        description: 'Receipts go to Bluetooth thermal printers as an image, so Burmese item names print as written.',
        bullets: ['58 mm and 80 mm printers', "Shop name, address, phone and logo on every receipt"],
        image: '/projects/dkn-pos/receipt.jpg',
        imageAlt: 'DKN POS: receipt preview',
      },
      {
        title: 'Keep stock right',
        description: 'Every item shows its stock, purchase price and margin, and stock moves with each sale.',
        bullets: ['Stock changes on sales, purchases, returns and write-offs', 'Low-stock and out-of-stock alerts', 'Day-by-day stock history per item'],
        image: '/projects/dkn-pos/items.jpg',
        imageAlt: 'DKN POS: items with stock and margin',
      },
      {
        title: 'See what the shop earned',
        description: 'Reports compare sales with cost of goods by day, month or year.',
        bullets: ['Total sales, purchases and gross profit', 'Each sale keeps the cost at the time, so old figures never change', 'Breakdown per day with voucher count'],
        image: '/projects/dkn-pos/reports.jpg',
        imageAlt: 'DKN POS: daily sales report',
      },
    ],
  },
  {
    slug: 'heaven-praise',
    title: 'Heaven Praise — Food Packaging Shop',
    category: 'Mobile',
    device: 'mobile',
    standalone: { org: 'Side project', role: 'Mobile Developer', skills: ['Android'] },
    stores: { play: 'https://play.google.com/store/apps/details?id=com.rcs_mm.heaven_praise.hp' },
    thumbnail: '/projects/heaven-praise/thumbnail.jpg',
    summary:
      'A shopping app for a food packaging supplier in Mandalay. Customers browse cups, boxes and bags by size and order in bulk with quantity pricing.',
    highlights: [
      'Product catalogue by category with sizes and dimensions',
      'Price tiers by order quantity',
      'Cart, payment options and in-app chat with the shop',
    ],
    steps: [
      {
        title: 'Shop by category',
        description: 'The home screen shows banners and the main product groups.',
        bullets: ['Paper cups, food boxes, food bags and more', 'Search and cart always at the top'],
        image: '/projects/heaven-praise/home.jpg',
        imageAlt: 'Heaven Praise: home screen',
      },
      {
        title: 'Compare sizes',
        description: 'Each product lists its size and dimensions, so customers pick the right cup or box.',
        bullets: ['Volume, width, height and length on every item'],
        image: '/projects/heaven-praise/products.jpg',
        imageAlt: 'Heaven Praise: product list',
      },
      {
        title: 'Order with quantity pricing',
        description: 'The product page shows the price for each quantity tier before adding to the cart.',
        bullets: ['Lower unit price for larger orders', 'Live total as the quantity changes'],
        image: '/projects/heaven-praise/product.jpg',
        imageAlt: 'Heaven Praise: product details with price tiers',
      },
      {
        title: 'Reach the shop',
        description: 'The menu links to products, contact details, chat, company info and payment.',
        bullets: ['In-app chat with the shop', 'Customer account and payment options'],
        image: '/projects/heaven-praise/menu.jpg',
        imageAlt: 'Heaven Praise: menu',
      },
    ],
  },
];

export interface ProjectWithRole extends Project {
  /** Organisation shown next to the role (company name or "Personal project"). */
  org: string;
  logo?: string;
  logoAlt?: string;
  role: string;
  startDate?: string;
  endDate?: string | null;
  period?: string;
  skills: string[];
  details?: string;
}

export const allProjects: ProjectWithRole[] = projects.map((p) => {
  if (p.standalone) {
    const { org, role, skills, period } = p.standalone;
    return { ...p, org, role, skills, period };
  }
  const exp = workExperienceData.find((e) => e.company === p.company);
  if (!exp) throw new Error(`No experience entry for project "${p.slug}" (company: ${p.company})`);
  return {
    ...p,
    org: exp.company.split(' (')[0],
    logo: exp.logo,
    logoAlt: exp.logoAlt,
    role: exp.title,
    startDate: exp.startDate,
    endDate: exp.endDate,
    skills: exp.skills ?? [],
    details: exp.details,
  };
});

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);
export const projectCategories: ('All' | ProjectCategory)[] = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
