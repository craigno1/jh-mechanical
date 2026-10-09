import img2 from '@/assets/optimized/image_1788866165181.webp';
import img3 from '@/assets/optimized/image_1788866176971.webp';
import img4 from '@/assets/optimized/image_1788866203536.webp';
import img5 from '@/assets/optimized/image_1788866217071.webp';
import dieselMechanicHero from '@/assets/optimized/image_1788866246504.webp';

export type ServiceData = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  heroImg: string;
  intro: string;
  sections: { title: string; content: string[] }[];
  symptoms: string[];
  callReady: string[];
  relatedServices: string[];
  relatedAreas: string[];
};

export const services: Record<string, ServiceData> = {
  'diesel-mechanic': {
    slug: 'diesel-mechanic',
    metaTitle: 'Diesel Mechanic Bendigo | Practical Heavy Vehicle Repairs',
    metaDescription: 'Experienced diesel mechanic serving Bendigo. We diagnose and repair heavy vehicles, trucks, and machinery so you can get back to work without the runaround.',
    h1: 'Diesel Mechanic',
    subtitle: 'Practical diagnosis and repairs for the engines that keep your work moving.',
    heroImg: dieselMechanicHero,
    intro: 'When your diesel equipment stops, your work stops. We provide straight-talking mechanical support for trucks, earthmoving machinery, and work fleets across the region. We focus on tracking down the root cause rather than just throwing parts at the problem.',
    sections: [
      {
        title: 'Proper Diagnostics, No Guesswork',
        content: [
          'Modern diesel engines are complex systems of sensors, high-pressure fuel, and emissions controls. When a warning light comes on or performance drops, finding the actual problem requires experience and a sensible diagnostic approach.',
          'We investigate electrical faults, fuel pressure issues, DPF/EGR faults, and mechanical wear to give you a clear picture of what is going wrong and what it takes to fix it.'
        ]
      },
      {
        title: 'Built for Heavy Work',
        content: [
          'Whether you are hauling freight down the Calder Highway or running civil machinery on site, your equipment takes a beating. We handle everything from clutch replacements and brake jobs to suspension work and mechanical repairs.',
          'When replacing parts, we look for dependable options that will handle the loads you\'re pulling, because a cheap fix isn\'t cheap if it fails again.'
        ]
      }
    ],
    symptoms: [
      'Engine warning lights or derate modes engaging',
      'Excessive black or white smoke under load',
      'Hard starting, especially on cold mornings',
      'Unusual knocking or ticking sounds from the engine bay',
      'Loss of power or poor fuel economy'
    ],
    callReady: [
      'The make, model, and year of the vehicle',
      'A description of what you were doing when the issue started',
      'Any warning lights or codes displayed on the dash'
    ],
    relatedServices: ['diesel-servicing', 'vehicle-repairs'],
    relatedAreas: ['bendigo', 'heathcote', 'sunbury']
  },
  'diesel-servicing': {
    slug: 'diesel-servicing',
    metaTitle: 'Diesel Servicing Bendigo | Truck & Machinery Maintenance',
    metaDescription: 'Thorough diesel servicing for trucks and machinery. Catch small problems before they cause major breakdowns with a sensible maintenance schedule.',
    h1: 'Diesel Servicing',
    subtitle: 'Scheduled servicing that catches small problems before they become expensive ones.',
    heroImg: img2,
    intro: 'Skipping a service on a heavy diesel vehicle usually ends up costing more in the long run. The dust, heat, and loads these machines endure mean oil degrades, filters block, and wear accelerates. A proper service is an opportunity to spot a frayed belt or a weeping seal before it snaps on a Friday afternoon.',
    sections: [
      {
        title: 'More Than Just Filters and Oil',
        content: [
          'A comprehensive diesel service looks at the whole vehicle. We check the driveline, inspect the brakes, look over suspension components, and monitor fluid condition across the transmission and differentials.',
          'By keeping a close eye on wear items, we help you plan for repairs rather than being surprised by them mid-job.'
        ]
      },
      {
        title: 'Working Around Your Schedule',
        content: [
          'We know that downtime costs money. We aim to establish a service rhythm that fits your work—whether that means tracking engine hours for site machinery or kilometres for highway trucks.',
          'We will communicate clearly about what needs replacing now and what we can monitor until the next scheduled stop.'
        ]
      }
    ],
    symptoms: [
      'Approaching scheduled service intervals (hours or kms)',
      'Engine oil feels gritty or smells burnt',
      'Increased fuel consumption over recent weeks',
      'Sluggish response or slightly elevated operating temperatures'
    ],
    callReady: [
      'Current odometer reading or engine hours',
      'Any minor issues or niggles you have noticed recently',
      'Your preferred timeframe for getting the vehicle into the shop'
    ],
    relatedServices: ['vehicle-maintenance', 'diesel-mechanic'],
    relatedAreas: ['bendigo', 'macedon', 'seymour']
  },
  'vehicle-maintenance': {
    slug: 'vehicle-maintenance',
    metaTitle: 'Fleet & Heavy Vehicle Maintenance | JH Mechanical',
    metaDescription: 'Dependable vehicle maintenance plans for trucks, machinery, and busy local fleets in Central Victoria. Keep your operation running smoothly.',
    h1: 'Vehicle Maintenance',
    subtitle: 'Maintenance plans for trucks, machinery and busy local fleets.',
    heroImg: img3,
    intro: 'Managing multiple vehicles means balancing uptime against maintenance costs. We work with owner-drivers and fleet managers to implement sensible, proactive maintenance that keeps the wheels turning without over-servicing.',
    sections: [
      {
        title: 'Proactive Defect Management',
        content: [
          'Catching a worn shackle pin, a weeping wheel cylinder, or a frayed airline early is the difference between a planned repair and an emergency call-out. We run thorough defect checks during maintenance inspections.',
          'You get a clear understanding of the condition of your vehicles, allowing you to budget for upcoming work rather than dealing with sudden failures.'
        ]
      },
      {
        title: 'Tailored to the Work You Do',
        content: [
          'A logging truck running dirt roads faces different stresses than a rigid delivery vehicle on the highway. We tailor our inspection focus to the specific conditions your vehicles deal with.',
          'We make note of the work done and issues spotted, so we have a better idea of what to look for next time.'
        ]
      }
    ],
    symptoms: [
      'Uneven tyre wear across drive or steer axles',
      'Slight fluid drips underneath parked vehicles',
      'Air system taking longer than usual to build pressure',
      'Vibrations or shudders at certain road speeds'
    ],
    callReady: [
      'The size and composition of your fleet',
      'The typical operating environment (highway, site, regional)',
      'Any recurring issues across multiple vehicles'
    ],
    relatedServices: ['diesel-servicing', 'vehicle-repairs'],
    relatedAreas: ['bendigo', 'shepparton', 'melbourne']
  },
  'vehicle-breakdown': {
    slug: 'vehicle-breakdown',
    metaTitle: 'Heavy Vehicle Breakdown Help Bendigo | Call JH Mechanical',
    metaDescription: 'Calm, capable response for heavy vehicle breakdowns. When your truck stops where it shouldn’t, get straight answers and practical help.',
    h1: 'Vehicle Breakdown',
    subtitle: 'A calm, capable response when a heavy vehicle stops where it should not.',
    heroImg: img4,
    intro: 'There is rarely a convenient time or place for a breakdown. When a heavy vehicle loses power or throws a critical code, you need someone on the end of the phone who understands the pressure and can troubleshoot efficiently. We aim to help get you moving or sort out a practical repair strategy.',
    sections: [
      {
        title: 'Assessing the Situation',
        content: [
          'The first step in any breakdown is understanding what has happened. We ask specific questions to determine if it is safe to limp the vehicle back, or if running it will cause catastrophic damage.',
          'From air leaks locking the brakes to sudden derate conditions, we try to narrow down the issue over the phone to figure out what gear we might need.'
        ]
      },
      {
        title: 'Practical Solutions',
        content: [
          'Sometimes the goal is a permanent fix on the spot; other times, it is safely bypassing a non-critical fault just to get the vehicle off the highway and into a workshop.',
          'We give you an honest assessment of when we can help and what the likely outcome will be, without stringing you along.'
        ]
      }
    ],
    symptoms: [
      'Sudden loss of air pressure or locked brakes',
      'Vehicle stuck in severe derate (limp mode)',
      'Massive coolant or oil loss',
      'Electrical failure or dead dash',
      'Engine will crank but refuses to fire'
    ],
    callReady: [
      'Your exact location (cross streets or highway markers)',
      'Whether the vehicle is safely off the road',
      'What you saw, heard, or felt right before the breakdown'
    ],
    relatedServices: ['diesel-mechanic', 'vehicle-repairs'],
    relatedAreas: ['bendigo', 'seymour', 'heathcote']
  },
  'vehicle-repairs': {
    slug: 'vehicle-repairs',
    metaTitle: 'Heavy Vehicle Repairs Bendigo | Straight Answers, Quality Work',
    metaDescription: 'Truck and machinery repairs built to last. We fix drivelines, suspension, brakes, and engine faults with quality parts and practical know-how.',
    h1: 'Vehicle Repairs',
    subtitle: 'Straight answers, dependable parts and repairs made to work hard again.',
    heroImg: img5,
    intro: 'When parts fail, they need to be replaced correctly by someone who understands the heavy loads these vehicles carry. We handle straightforward mechanical repairs with a focus on durability, ensuring the vehicle can handle the work it was designed for.',
    sections: [
      {
        title: 'Component Repair and Replacement',
        content: [
          'From replacing cracked manifolds and leaking water pumps to sorting out worn suspension components and steering boxes, we tackle the heavy jobs. We know how to deal with seized bolts, rusted pins, and the stubborn realities of working on heavy vehicles.',
          'We check surrounding components while we are in there. If we are replacing a clutch, we inspect the rear main seal and spigot bearing to save you pulling it apart twice.'
        ]
      },
      {
        title: 'Doing it Right',
        content: [
          'We aim to use replacement parts that will stand up to regional conditions.',
          'We explain exactly what we found, what caused the failure, and how we plan to fix it, so you are never left wondering what you are paying for.'
        ]
      }
    ],
    symptoms: [
      'Loud clunking when engaging gears',
      'Spongy brake pedal or long stopping distances',
      'Vehicle wandering or tracking poorly on the highway',
      'Visible damage to springs or suspension airbags'
    ],
    callReady: [
      'The specific part or system you suspect has failed',
      'Whether the vehicle is currently drivable',
      'Any parts you have already replaced trying to fix the issue'
    ],
    relatedServices: ['diesel-mechanic', 'vehicle-maintenance'],
    relatedAreas: ['bendigo', 'lockington', 'sunbury']
  }
};
