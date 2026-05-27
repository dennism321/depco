import { Service, CityArea, Review, Booking } from '../types';
import plumbingTileImage from '../assets/images/plumbing_under_sink_1779831440103.png';
import drainSnakingHydrojettingImage from '../assets/images/drain_snaking_hydrojetting_1779852117788.png';
import hvacTileImage from '../assets/images/hvac_services_heat_cooling_tile_1779831893923.png';
import geothermalTileImage from '../assets/images/geothermal_comfort_tile_1779832137616.png';
import hydronicTileImage from '../assets/images/hydronic_heating_system_tile_1779844828966.png';
import electricalTileImage from '../assets/images/electrical_service_tile_1779845230007.png';

export const SERVICES: Service[] = [
  // PLUMBING
  {
    id: 'plumb-leak',
    name: 'Plumbing Services',
    category: 'plumbing',
    description: 'Repairs, installations and remodels for faucets, fixtures, water lines and full plumbing systems — residential and commercial.',
    features: [
      'Burst pipe clamp & full line bypass repairs',
      'Electronic leak localization to within 1 inch',
      'Copper, PEX, and PVC line repiping & restoration',
      'Ceiling & slab leak remediation'
    ],
    startingPrice: '$149',
    estimateTime: '1 - 3 hours',
    guaranteeText: '100% Leak-Free Guarantee',
    imageUrl: plumbingTileImage,
    iconName: 'wrench'
  },
  {
    id: 'plumb-drain',
    name: 'High-Power Drain Snaking & Hydrojetting',
    category: 'plumbing',
    description: 'Clogged sinks, backing toilets, or slow main sewer lines? We offer deep drain cleaning using visual fiber-optic main-line scopes followed by high-pressure hydrodynamic jetting.',
    features: [
      'Diagnostic fiber-optic sewer line video inspection',
      'Heavy root cut & sewer line snaking clears',
      '4000 PSI high-pressure hydrojetting cleanings',
      'Bio-clean eco-friendly drain treatment solutions'
    ],
    startingPrice: '$99',
    estimateTime: '1 - 2 hours',
    guaranteeText: '30-Day Free-Clear Guarantee',
    imageUrl: drainSnakingHydrojettingImage,
    iconName: 'droplet'
  },
  {
    id: 'plumb-heater',
    name: 'Water Heaters & Tankless',
    category: 'plumbing',
    description: 'Tank and tankless water heater installation, replacement and repair. Save up to 50% on your water heating bill.',
    features: [
      'Anode rod replacement & element descaling',
      'Standard water tank repairs & thermostat calibrations',
      'Premium tankless tank installations (Rinnai & Navien certs)',
      'Pressure relief valve safety inspections'
    ],
    startingPrice: '$189',
    estimateTime: '2 - 4 hours',
    guaranteeText: '6-Year Tank Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    iconName: 'droplet'
  },
  {
    id: 'plumb-sump',
    name: 'Sump Pump Repairs & Battery Backup Installs',
    category: 'plumbing',
    description: 'Keep your basement pristine, even during severe Connecticut storms. We service standard sump systems and design multi-tiered battery backup lifelines to trigger during complete utility blackouts.',
    features: [
      'Heavy-duty cast-iron sump pump installations',
      'Double-fail backup battery systems',
      'Sump basin cleaning & level float calibration',
      'High-water alarm integrations'
    ],
    startingPrice: '$159',
    estimateTime: '1 - 2 hours',
    guaranteeText: '3-Year Premium Replacement Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    iconName: 'shield'
  },
  {
    id: 'plumb-fixture',
    name: 'Toilets, Faucets, and Sinks Installation & Repair',
    category: 'plumbing',
    description: 'Tackle pesky running toilets, dripping bathroom faucets, or install luxurious high-efficiency low-flow utility systems that add instant value and performance to your space.',
    features: [
      'Low-flow commercial toilet installs (Kohler & Toto)',
      'Touchless and standard kitchen faucet hookups',
      'Garbage disposal repairs & high-torque installations',
      'Water pressure regulatory adjustments'
    ],
    startingPrice: '$85',
    estimateTime: '45 mins - 2 hours',
    guaranteeText: 'Part & Labor Comprehensive Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800',
    iconName: 'wrench'
  },

  // HEATING
  {
    id: 'heat-furnace-rep',
    name: 'Heating & HVAC',
    category: 'heating',
    description: 'Furnaces, boilers, heat pumps and central air. Installation, maintenance and emergency repair from licensed CT technicians.',
    features: [
      '24/7 furnace diagnostics with real-time pressure tests',
      'Flame sensor cleaning & thermostat sync calibrations',
      'Blower motor replacements & gas valve servicing',
      'Cracked heat exchanger carbon monoxide safety sweeps'
    ],
    startingPrice: '$89',
    estimateTime: '1 - 2 hours',
    guaranteeText: 'Fixed Right or It’s Free',
    imageUrl: hvacTileImage,
    iconName: 'thermometer'
  },
  {
    id: 'heat-furnace-inst',
    name: 'High-Efficiency Furnace Replacements & Systems',
    category: 'heating',
    description: 'Cut up to 35% on gas bills. We engineer and install high-performing Energy Star 96%+ AFUE rated furnace architectures tailored to suit the insulation specifications of your home.',
    features: [
      'Custom residential heating load analyses (Manual J counts)',
      'Standard high-capacity gas and electric furnaces',
      'Modern two-stage quiet blowers for perfect comfort control',
      'Up to 10-Year Parts & Labor combined warranty coverage'
    ],
    startingPrice: '$3,800',
    estimateTime: '1 - 2 days',
    guaranteeText: '10-Year Workmanship Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    iconName: 'flame'
  },
  {
    id: 'heat-boilers',
    name: 'Geothermal Heating & Cooling',
    category: 'geothermal',
    description: 'IGSHPA-certified geothermal installation. Cut energy consumption 20–50% with green, renewable heating and cooling.',
    features: [
      'Hydronic loop flushing & system valve air-purges',
      'Expansion tank repairs & relief valve maintenance',
      'Eco-hybrid heat pump heating cross-over loops',
      'Zoned radiant heating maintenance'
    ],
    startingPrice: '$249',
    estimateTime: '2 - 5 hours',
    guaranteeText: 'Elite Energy Conservation Guarantee',
    imageUrl: geothermalTileImage,
    iconName: 'snowflake'
  },
  {
    id: 'heat-hydronic',
    name: 'Hydronic Heating Systems',
    category: 'heating',
    description: 'Radiant floor and high-efficiency hydronic systems engineered for comfort, quiet operation and lower fuel bills.',
    features: [
      'Radiant floor manifold pressure tuning & balance checks',
      'High-efficiency boiler diagnostics & water pump swaps',
      'Hydronic zone routing and smart thermostat sync adjustments',
      'Oxidation inhibitor replenishment and line purges'
    ],
    startingPrice: '$199',
    estimateTime: '2 - 4 hours',
    guaranteeText: 'Pristine Hydronic Comfort Guarantee',
    imageUrl: hydronicTileImage,
    iconName: 'flame'
  },

  // COOLING
  {
    id: 'cool-rep',
    name: 'Rapid Air Conditioner Diagnostics & Freon Recharge',
    category: 'cooling',
    description: 'AC blowing warm air? Our technicians locate coolant leaks, replace burnt capacitors, flush fouled condensate lines, and execute precise EPA-compliant Freon/R-410A recharges.',
    features: [
      'Burnt electrical capacitor & compressor contactor swaps',
      'Condensate drain line flushing with anti-algae panels',
      'EPA-certified leak tests & custom coolant recharges',
      'Evaporator coil and condenser coil thorough cleaning'
    ],
    startingPrice: '$99',
    estimateTime: '1 - 3 hours',
    guaranteeText: 'Cool-Air Output Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    iconName: 'thermometer'
  },
  {
    id: 'cool-inst',
    name: 'Energy-Saver Central AC Unit Installations',
    category: 'cooling',
    description: 'Quiet, robust, and cost-effective cooling for humid summers. We install premium 16-22 SEER central cooling systems designed for balanced humidity and temperature controls.',
    features: [
      'Lennox, Carrier, and Goodman elite standard system options',
      'Acoustic compressor blankets for ultra-quiet operation',
      'Advanced digital coolant metering systems',
      'Comprehensive duct sizing alignment'
    ],
    startingPrice: '$3,200',
    estimateTime: '1 day',
    guaranteeText: 'Comfort Climate Satisfaction Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=800',
    iconName: 'thermometer'
  },
  {
    id: 'cool-mini',
    name: 'Ductless Mini-Split Zoning Configurations',
    category: 'cooling',
    description: 'No ducts? No problem. Create custom thermal climates in independent rooms with elite wall-mounted ductless mini-split units characterized by whisper-quiet performance.',
    features: [
      'Single and multi-zone outdoor inverter system units',
      'Premium wall-mounted, high-rise, or ceiling cassettes',
      'Individual wireless digital remote climate controllers',
      'Zero invasive woodwork or ducting overhead required'
    ],
    startingPrice: '$2,400',
    estimateTime: '4 - 8 hours',
    guaranteeText: 'Localized Climate Precision Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800',
    iconName: 'wind'
  },

  // INDOOR AIR QUALITY
  {
    id: 'iaq-purifier',
    name: 'Whole-Home UV Cleansers & HEPA Filtration',
    category: 'iaq',
    description: 'Deactivate 99.9% of bacteria, pet dander, viruses, and mold spores. We integrate active medical-grade UV lamps and high-performance MERV 16 HEPA air filters into your home HVAC manifold.',
    features: [
      'Dual UV-C germicidal light sanitizers',
      'Premium high-efficiency MERV 13 to 16 media filters',
      'Active ionization smell & smoke particle drop elements',
      'Ozone-free respiratory protection'
    ],
    startingPrice: '$450',
    estimateTime: '2 - 3 hours',
    guaranteeText: 'Pristine Pure-Air Filtration Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800',
    iconName: 'sparkles'
  },
  {
    id: 'iaq-humidifier',
    name: 'Smart Humidifier & Ventilation Integrations',
    category: 'iaq',
    description: 'Connecticut winters cause dry throats and damage hardwood floors, while summers trap stagnant air. Our smart steam humidifiers and Energy Recovery Ventilators (ERVs) balance indoor air exactly.',
    features: [
      'Steam & bypass humidifiers directly connected to water lines',
      'Smart digital humidi-stats synced with smart setups',
      'Energy Recovery Ventilator cycling for outdoor drafts',
      'Stagnant stale air removal'
    ],
    startingPrice: '$650',
    estimateTime: '2 - 4 hours',
    guaranteeText: 'Perfect Humidity Balance Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    iconName: 'wind'
  },
  {
    id: 'elec-general',
    name: 'Electrical Services',
    category: 'electrical',
    description: 'Licensed electrical contracting — panels, wiring, generators and service upgrades for your home or business.',
    features: [
      'Residential and commercial panel upgrades & circuit mapping',
      'Whole-house generator wiring & automatic transfer switches',
      'Safety inspections, grounding audits, and outlet additions',
      'LED lighting retrofits & structural smart lighting controls'
    ],
    startingPrice: '$119',
    estimateTime: '1 - 3 hours',
    guaranteeText: 'Double-Certified Electrical Safety Guarantee',
    imageUrl: electricalTileImage,
    iconName: 'zap'
  }
];

export const LOCAL_CITIES: CityArea[] = [
  {
    name: 'Plainville',
    zipCode: '06062',
    county: 'Hartford',
    activeTechs: 6,
    distanceMiles: 0,
    tier: 'premium',
    status: 'high',
    coordinates: { x: 50, y: 50 } // Center of our custom local map
  },
  {
    name: 'Bristol',
    zipCode: '06010',
    county: 'Hartford',
    activeTechs: 4,
    distanceMiles: 4.5,
    tier: 'premium',
    status: 'high',
    coordinates: { x: 30, y: 50 }
  },
  {
    name: 'New Britain',
    zipCode: '06051',
    county: 'Hartford',
    activeTechs: 5,
    distanceMiles: 4.8,
    tier: 'premium',
    status: 'high',
    coordinates: { x: 70, y: 50 }
  },
  {
    name: 'Southington',
    zipCode: '06489',
    county: 'Hartford',
    activeTechs: 3,
    distanceMiles: 5.5,
    tier: 'premium',
    status: 'high',
    coordinates: { x: 50, y: 72 }
  },
  {
    name: 'Farmington',
    zipCode: '06032',
    county: 'Hartford',
    activeTechs: 3,
    distanceMiles: 5.2,
    tier: 'premium',
    status: 'high',
    coordinates: { x: 50, y: 28 }
  },
  {
    name: 'West Hartford',
    zipCode: '06107',
    county: 'Hartford',
    activeTechs: 2,
    distanceMiles: 11.5,
    tier: 'quick-response',
    status: 'moderate',
    coordinates: { x: 68, y: 28 }
  },
  {
    name: 'Hartford',
    zipCode: '06103',
    county: 'Hartford',
    activeTechs: 2,
    distanceMiles: 14.5,
    tier: 'quick-response',
    status: 'moderate',
    coordinates: { x: 78, y: 22 }
  },
  {
    name: 'Meriden',
    zipCode: '06450',
    county: 'New Haven',
    activeTechs: 3,
    distanceMiles: 10.1,
    tier: 'quick-response',
    status: 'high',
    coordinates: { x: 65, y: 72 }
  },
  {
    name: 'Wolcott',
    zipCode: '06716',
    county: 'New Haven',
    activeTechs: 2,
    distanceMiles: 9.3,
    tier: 'quick-response',
    status: 'moderate',
    coordinates: { x: 32, y: 68 }
  },
  {
    name: 'Cheshire',
    zipCode: '06410',
    county: 'New Haven',
    activeTechs: 2,
    distanceMiles: 12.8,
    tier: 'quick-response',
    status: 'moderate',
    coordinates: { x: 42, y: 85 }
  },
  {
    name: 'Waterbury',
    zipCode: '06708',
    county: 'New Haven',
    activeTechs: 1,
    distanceMiles: 15.1,
    tier: 'standard',
    status: 'limited',
    coordinates: { x: 22, y: 78 }
  },
  {
    name: 'Plymouth',
    zipCode: '06782',
    county: 'Litchfield',
    activeTechs: 1,
    distanceMiles: 11.2,
    tier: 'standard',
    status: 'limited',
    coordinates: { x: 18, y: 45 }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Daniel M.',
    stars: 5,
    date: '2026-05-18',
    feedback: 'Had a burst water meter line at 2 AM. Absolutely frantic! I phoned DEPCO and their dispatch had a truck at my Plainville house within 25 minutes. Master plumber Marcus completely patched and secured the line flawlessly, and explained everything. Upfront pricing saved my budget!',
    serviceCategory: 'Plumbing',
    isVerified: true,
    location: 'Plainville, CT'
  },
  {
    id: 'rev-2',
    author: 'Sarah K.',
    stars: 5,
    date: '2026-05-22',
    feedback: 'Our old AC choked on the first hot humid day. I booked a technician through their site. They analyzed our ducts and installed a super quiet Goodman unit for a fantastic price. It has dropped our monthly energy bill substantially. Highly professional!',
    serviceCategory: 'Cooling / AC',
    isVerified: true,
    location: 'Bristol, CT'
  },
  {
    id: 'rev-3',
    author: 'David L.',
    stars: 5,
    date: '2026-05-10',
    feedback: 'The team at DEPCO came in to install a UV germicidal light array and dry-air steam humidifier. Incredible improvement in indoor respiratory health! Highly recommended for those with allergies.',
    serviceCategory: 'Indoor Air Quality',
    isVerified: true,
    location: 'New Britain, CT'
  },
  {
    id: 'rev-4',
    author: 'Patricia J.',
    stars: 5,
    date: '2026-05-04',
    feedback: 'Our furnace pressure switch failed during winter. Called DEPCO; they quickly dispatched a mechanic who checked the entire manifold for cracks and had our hot air flowing again in under an hour. Outstanding service, honest pricing!',
    serviceCategory: 'Heating',
    isVerified: true,
    location: 'Southington, CT'
  }
];

// Active technician team for simulations
export const TECHNICIANS = [
  {
    name: 'Marcus Vance',
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
    rating: 4.95,
    phone: '(586) 884-2451',
    vehiclePlate: 'DEPCO-001',
    description: 'Master Plumber with over 12 years of specialized emergency piping, residential hydrojetting, and backflow preventer installations.'
  },
  {
    name: 'Bradley "Brad" Miller',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 4.88,
    phone: '(586) 884-3329',
    vehiclePlate: 'DEPCO-012',
    description: 'NATE-Certified HVAC Specialist focusing on gas manifolds, electronic thermostats, and high-efficiency central compressor setups.'
  },
  {
    name: 'Sarah "Santi" Jenkins',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 4.97,
    phone: '(586) 884-1188',
    vehiclePlate: 'DEPCO-008',
    description: 'Senior IAQ Technician & Certified Pipe Welder. Expert in high-pressure steam distribution and UV air purifier array designs.'
  }
];

// Seed some active simulated bookings to show tracking state beautifully right out of the box!
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'DEPCO-DISP-491',
    customerName: 'Robert Mitchell',
    customerPhone: '(586) 332-9441',
    customerEmail: 'robert@mitchellinc.com',
    serviceId: 'plumb-leak',
    serviceCategory: 'plumbing',
    urgency: 'emergency',
    address: '104 Whiting St',
    city: 'Plainville',
    zipCode: '06062',
    scheduledDate: '2026-05-26',
    scheduledTime: 'Immediate Dispatch',
    status: 'dispatched',
    createdTime: '2026-05-26T20:30:00Z',
    trackingEta: 14,
    technician: TECHNICIANS[0],
    notes: 'Severe high-pressure basement pipe leak near gas meter. Shutoff valves rusted open.'
  },
  {
    id: 'DEPCO-DISP-128',
    customerName: 'Linda Albright',
    customerPhone: '(248) 991-3820',
    customerEmail: 'linda.a@gmail.com',
    serviceId: 'cool-rep',
    serviceCategory: 'cooling',
    urgency: 'high',
    address: '124 S Main St',
    city: 'West Hartford',
    zipCode: '06107',
    scheduledDate: '2026-05-26',
    scheduledTime: '17:00 - 19:00',
    status: 'pending',
    createdTime: '2026-05-26T18:15:00Z',
    notes: 'AC compressor humming loudly but fan not spinning. Blowing warm room-temperature air.'
  }
];
