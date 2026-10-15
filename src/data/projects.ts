import { workExperienceData } from './experience';

export type ProjectCategory = 'AI' | 'Security' | 'E-commerce' | 'Healthcare' | 'Platform' | 'Logistics' | 'Web';

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
