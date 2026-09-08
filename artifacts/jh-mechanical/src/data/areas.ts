import img1 from '@assets/image_1788866147775.png';
import img3 from '@assets/image_1788866176971.png';
import img6 from '@assets/image_1788866232386.png';
import img7 from '@assets/image_1788866246504.png';
import img8 from '@assets/image_1788866276475.png';
import heroImg from '@assets/image_1788154192187.png';

export type AreaData = {
  slug: string;
  cityName: string;
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
};

export const areas: Record<string, AreaData> = {
  'heathcote': {
    slug: 'heathcote',
    cityName: 'Heathcote',
    metaTitle: 'Diesel Mechanic Heathcote | JH Mechanical',
    metaDescription: 'Dependable diesel mechanic serving Heathcote. Heavy vehicle repairs, tractor maintenance, and truck servicing for local operators and agricultural businesses.',
    h1: 'Diesel Mechanic Heathcote',
    subtitle: 'Practical heavy vehicle support for the Heathcote region.',
    heroImg: img6,
    intro: 'Heathcote relies heavily on transport and agricultural machinery. Whether you are running trucks along the McIvor Highway or operating tractors out in the vineyards, equipment failure holds up the job. JH Mechanical provides straight-talking, reliable diesel repairs for the machinery working in and around Heathcote.',
    sections: [
      {
        title: 'Agricultural & Transport Support',
        content: [
          'The seasonal nature of work around Heathcote means your machinery cannot afford to be down when the pressure is on. We handle routine servicing and repairs for farm equipment, rigid trucks, and heavy combinations.',
          'We understand the strain that dust, heat, and heavy loads put on diesel engines, and we keep that in mind when checking filters and fluids.'
        ]
      },
      {
        title: 'Local Understanding',
        content: [
          'Being familiar with the local area means we understand the common routes and the types of work our clients are doing. We aim to provide repairs that last, keeping the local industry moving.'
        ]
      },
      {
        title: 'Planning for the Season',
        content: [
          'Getting machinery checked before the busy season hits is just good sense. We can help you spot worn belts and tired hoses before they let go in the middle of a paddock.'
        ]
      }
    ],
    symptoms: [
      'Dust ingress affecting engine performance',
      'Overheating under heavy seasonal loads',
      'Rough idling or poor response from tractors',
      'Transmission slipping during heavy towing'
    ],
    callReady: [
      'The make, model, and year of the machinery',
      'Where the vehicle is currently located',
      'What it was doing when the issue started'
    ],
    relatedServices: ['diesel-mechanic', 'diesel-servicing', 'vehicle-repairs']
  },
  'bendigo': {
    slug: 'bendigo',
    cityName: 'Bendigo',
    metaTitle: 'Diesel Mechanic Bendigo | Local Truck & Machinery Repairs',
    metaDescription: 'Bendigo’s trusted local diesel mechanic. We provide straightforward servicing, breakdown help, and heavy vehicle repairs right across the Bendigo region.',
    h1: 'Diesel Mechanic Bendigo',
    subtitle: 'Your local diesel experts in the heart of Bendigo.',
    heroImg: heroImg,
    intro: 'As our home base, Bendigo is where we do the bulk of our work. From civil construction machinery working on new developments to line-haul trucks running the Calder, we see it all. JH Mechanical gives Bendigo operators honest advice and repairs that stand up to hard work.',
    sections: [
      {
        title: 'Complete Workshop Services',
        content: [
          'Our Bendigo workshop handles everything from routine fluid changes to mechanical diagnostic work on diesel engines. We focus on identifying the actual problem rather than just swapping parts and hoping for the best.',
          'We work on a wide range of diesel engines, understanding the specific quirks of different platforms.'
        ]
      },
      {
        title: 'Straightforward Approach',
        content: [
          'We don\'t believe in confusing jargon. We\'ll tell you clearly what needs fixing now, what can wait, and what it\'s likely to cost.'
        ]
      },
      {
        title: 'Supporting the Local Fleet',
        content: [
          'Many local businesses trust us with their fleet maintenance. We help manage defect repairs proactively and keep communication clear so fleet managers know where they stand.'
        ]
      }
    ],
    symptoms: [
      'Dashboard warning lights or derate codes',
      'Unusual suspension knocking on local roads',
      'Brake squeal or reduced stopping power',
      'Fluid leaks noticed where the vehicle is parked'
    ],
    callReady: [
      'Vehicle make, model, and rego',
      'A clear description of the current fault',
      'Whether the truck can be driven to the workshop'
    ],
    relatedServices: ['diesel-mechanic', 'vehicle-maintenance', 'vehicle-breakdown']
  },
  'seymour': {
    slug: 'seymour',
    cityName: 'Seymour',
    metaTitle: 'Diesel Mechanic Seymour | Truck & Heavy Vehicle Services',
    metaDescription: 'Reliable diesel mechanic services for Seymour and surrounding districts. Practical repairs and maintenance for highway trucks and heavy machinery.',
    h1: 'Diesel Mechanic Seymour',
    subtitle: 'Keeping heavy transport moving through the Seymour corridor.',
    heroImg: img7,
    intro: 'Seymour is a critical junction for heavy transport running the Hume Highway. When a truck runs into trouble passing through, or local agricultural machinery needs a service, JH Mechanical provides a capable, no-nonsense response.',
    sections: [
      {
        title: 'Highway Transport Repairs',
        content: [
          'Trucks working the Hume demand reliability. We assist Seymour operators with driveline maintenance, brake jobs, and engine diagnostics to help keep vehicles safe at highway speeds.',
          'If a warning light appears, we can help check the issue before it turns into a major breakdown.'
        ]
      },
      {
        title: 'Honest Answers, No Jargon',
        content: [
          'We know you just want the vehicle fixed and back to work. We explain exactly what has failed and the most practical way to fix it.'
        ]
      },
      {
        title: 'Routine Maintenance',
        content: [
          'Staying on top of scheduled servicing is the best way to prevent highway breakdowns. We help you establish a maintenance rhythm that makes sense.'
        ]
      }
    ],
    symptoms: [
      'Vibrations felt at highway speeds',
      'Loss of power on long inclines',
      'Air system struggling to maintain pressure',
      'Sudden increase in fuel consumption'
    ],
    callReady: [
      'Your location relative to the highway',
      'Any warning lights displayed',
      'Make, model, and whether the vehicle is loaded'
    ],
    relatedServices: ['diesel-mechanic', 'vehicle-breakdown', 'diesel-servicing']
  },
  'macedon': {
    slug: 'macedon',
    cityName: 'Macedon',
    metaTitle: 'Diesel Mechanic Macedon | Machinery & Truck Repairs',
    metaDescription: 'JH Mechanical provides practical diesel servicing and repairs for the Macedon Ranges. Reliable mechanical support for trucks and heavy equipment.',
    h1: 'Diesel Mechanic Macedon',
    subtitle: 'Dependable diesel repairs for the Macedon Ranges.',
    heroImg: img1,
    intro: 'Operating heavy vehicles in the Macedon Ranges involves dealing with steep grades and variable weather. This puts extra strain on brakes, transmissions, and cooling systems. JH Mechanical helps keep your equipment mechanically sound and ready for the terrain.',
    sections: [
      {
        title: 'Brake & Cooling System Focus',
        content: [
          'Working in hilly areas requires confidence in your retarders, foundation brakes, and cooling fans. We look at these systems closely during our maintenance routines.',
          'We repair air leaks, replace worn friction material, and check that engine operating temperatures remain stable under heavy loads.'
        ]
      },
      {
        title: 'Balancing Uptime',
        content: [
          'We try to balance necessary repairs with your need to keep working. By catching small issues during services, we help Macedon operators avoid the stress of unexpected downtime.'
        ]
      },
      {
        title: 'Heavy Vehicle Diagnostics',
        content: [
          'When trucks throw codes while working hard up a grade, we use diagnostic scanning to help figure out whether it\'s a simple sensor fault or something more involved.'
        ]
      }
    ],
    symptoms: [
      'Brakes feeling spongy or smelling hot',
      'Engine temperature spiking on inclines',
      'Transmission struggling to select the right gear',
      'Coolant or oil leaks after a heavy run'
    ],
    callReady: [
      'The specific systems you are concerned about',
      'Make, model, and typical working routes',
      'Any recent repairs carried out'
    ],
    relatedServices: ['vehicle-maintenance', 'vehicle-repairs', 'diesel-servicing']
  },
  'shepparton': {
    slug: 'shepparton',
    cityName: 'Shepparton',
    metaTitle: 'Diesel Mechanic Shepparton | Agricultural & Fleet Repairs',
    metaDescription: 'Diesel mechanic supporting Shepparton’s agricultural and transport sectors. Straightforward machinery maintenance and truck repairs.',
    h1: 'Diesel Mechanic Shepparton',
    subtitle: 'Mechanical support for Shepparton’s transport and agriculture.',
    heroImg: img8,
    intro: 'Shepparton is a hub for agriculture and the transport required to move it. During harvest or busy freight seasons, you need a mechanic who understands the urgency. JH Mechanical delivers practical diesel repair services for the machinery driving the Goulburn Valley.',
    sections: [
      {
        title: 'Harvest & Freight Demand',
        content: [
          'When the season peaks, machinery runs hard. We offer pre-harvest checks to identify worn belts, tired bearings, and dirty fuel systems before they stop you in the paddock or on the highway.',
          'We understand that a broken-down truck in Shepparton during harvest is a serious problem.'
        ]
      },
      {
        title: 'Electronic Diagnostics',
        content: [
          'Modern agricultural and transport equipment relies heavily on electronics. We use diagnostic scanning to help read fault codes and trace electronic issues that traditional checks might miss.'
        ]
      },
      {
        title: 'Keeping Cool Under Load',
        content: [
          'The heat in the valley means cooling systems have to be working perfectly. We check radiators, viscous hubs, and water pumps to help prevent overheating.'
        ]
      }
    ],
    symptoms: [
      'Engine running hot during long shifts',
      'Electronic warnings or sensor failures',
      'Hydraulic systems feeling sluggish',
      'Fuel system issues or rough running'
    ],
    callReady: [
      'What the machine is currently doing (or failing to do)',
      'Any fault codes on the display',
      'Make, model, and engine hours'
    ],
    relatedServices: ['diesel-mechanic', 'diesel-servicing', 'vehicle-repairs']
  },
  'lockington': {
    slug: 'lockington',
    cityName: 'Lockington',
    metaTitle: 'Diesel Mechanic Lockington | Tractor & Truck Services',
    metaDescription: 'JH Mechanical serves the Lockington area with dependable diesel repairs. Heavy vehicle servicing, machinery maintenance, and practical advice.',
    h1: 'Diesel Mechanic Lockington',
    subtitle: 'Reliable machinery and truck repairs for the Lockington area.',
    heroImg: img3,
    intro: 'For the farmers and transport operators around Lockington, having a mechanic you can call on is essential. JH Mechanical provides straight-talking advice and durable repairs to keep the local equipment working hard.',
    sections: [
      {
        title: 'Farm Machinery & Local Freight',
        content: [
          'We handle work from tractor servicing to repairing the rigid trucks used for local cartage. We know that working in dusty environments accelerates wear on air intakes, cooling fins, and suspension joints.'
        ]
      },
      {
        title: 'Practical Advice',
        content: [
          'We will tell you what needs fixing right now to remain safe and operational, and what can wait. We aim to respect your budget and your operational needs.'
        ]
      },
      {
        title: 'Dust & Hard Work',
        content: [
          'Our servicing routines involve blowing out radiators, checking air filtration systems, and greasing pivot points properly to deal with the realities of farm work.'
        ]
      }
    ],
    symptoms: [
      'Blocked air filters causing black smoke',
      'Suspension clunks on rough roads',
      'PTO or hydraulic issues',
      'Hard starting on cold mornings'
    ],
    callReady: [
      'Type of machinery and the specific fault',
      'Whether it can be brought into town',
      'Any recent changes in performance'
    ],
    relatedServices: ['vehicle-maintenance', 'diesel-mechanic', 'vehicle-repairs']
  },
  'melbourne': {
    slug: 'melbourne',
    cityName: 'Melbourne',
    metaTitle: 'Diesel Mechanic Melbourne Services | Heavy Transport',
    metaDescription: 'JH Mechanical supports heavy transport operating between Bendigo and Melbourne. Reliable servicing and repairs for line-haul and fleet vehicles.',
    h1: 'Diesel Support for Melbourne Routes',
    subtitle: 'Keeping the freight moving between the regions and the city.',
    heroImg: img6,
    intro: 'While we are based in Bendigo, many of our clients run daily routes into Melbourne. If your trucks are handling the stop-start traffic of the city and the highway run up the Calder, they need sensible maintenance to handle both extremes.',
    sections: [
      {
        title: 'Driveline & Clutch Wear',
        content: [
          'Navigating city traffic puts strain on clutches and automated manual transmissions (AMTs). We check fluid levels and driveline slack to keep things shifting smoothly.',
          'We help ensure that when your trucks head down the highway, they are reliable enough to make the return trip.'
        ]
      },
      {
        title: 'Managing Emissions Systems',
        content: [
          'City driving can sometimes cause issues for DPFs and EGR valves due to a lack of passive regeneration. We can help check soot levels and resolve restrictive exhaust faults.'
        ]
      },
      {
        title: 'Highway Reliability',
        content: [
          'A breakdown on the Ring Road is a headache nobody wants. Regular, thorough servicing is the best defense against it.'
        ]
      }
    ],
    symptoms: [
      'Clutch slipping or rough AMT shifting',
      'DPF warning lights coming on frequently',
      'Brake wear from heavy city traffic',
      'Coolant leaks or running hot in stop-start conditions'
    ],
    callReady: [
      'Make, model, and typical route',
      'Any specific warning lights or codes',
      'When the vehicle is next available for a check'
    ],
    relatedServices: ['vehicle-maintenance', 'diesel-servicing', 'vehicle-breakdown']
  },
  'sunbury': {
    slug: 'sunbury',
    cityName: 'Sunbury',
    metaTitle: 'Diesel Mechanic Sunbury | Truck & Earthmoving Repairs',
    metaDescription: 'Practical diesel mechanic services for Sunbury operators. Heavy vehicle maintenance, civil machinery repairs, and dependable diagnostics.',
    h1: 'Diesel Mechanic Sunbury',
    subtitle: 'Capable diesel support for Sunbury’s civil and transport industries.',
    heroImg: img7,
    intro: 'With ongoing development in and around Sunbury, earthmoving machinery and tipper fleets are working hard. JH Mechanical supports these operations with sensible diesel repairs and maintenance routines.',
    sections: [
      {
        title: 'Earthmoving & Civil',
        content: [
          'Tipper trucks and excavators live in harsh, high-vibration environments. We look at chassis rails, suspension pins, and hydraulic PTO systems to help ensure the equipment remains functional.',
          'We know that downtime on a job site holds up the whole project.'
        ]
      },
      {
        title: 'Minimising Disruption',
        content: [
          'We try to fit servicing in when it causes the least disruption to your work. Whether it is a routine oil change or diagnosing a stubborn hydraulic leak, you can expect clear communication.'
        ]
      },
      {
        title: 'Hydraulic & PTO Checks',
        content: [
          'Civil work leans heavily on auxiliary systems. We check lines, pumps, and fluid conditions to catch leaks before they turn into major failures.'
        ]
      }
    ],
    symptoms: [
      'Hydraulic leaks or slow operation',
      'Suspension airbags failing or leaning',
      'PTO engaging roughly or making noise',
      'General heavy vibration or clunking'
    ],
    callReady: [
      'Type of equipment and what it\'s used for',
      'Description of the fault or leak',
      'Make, model, and engine hours'
    ],
    relatedServices: ['diesel-mechanic', 'vehicle-repairs', 'diesel-servicing']
  }
};
