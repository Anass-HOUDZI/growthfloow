
export interface VariantContent {
  text?: string;
  color?: string;
  size?: string;
  position?: string;
  fields?: string[];
  layout?: string;
  validation?: string;
  placeholder?: string;
  price?: string;
  features?: string[];
  cta?: string;
  highlight?: boolean;
  content?: string;
  author?: string;
  rating?: number;
  list?: string[];
  icons?: string[];
  description?: string;
  image?: string;
  'alt-text'?: string;
  tone?: string;
  length?: string;
  structure?: string;
  'font-size'?: string;
  alignment?: string;
}

export interface TestVariant {
  id: string;
  name: string;
  description: string;
  content: VariantContent;
  isControl: boolean;
}

export interface TestConfig {
  element: string;
  trafficSplit: number;
  duration: number;
  significance: number;
  minimumDetectableEffect: number;
  currentConversionRate: number;
  dailyTraffic: number;
}
