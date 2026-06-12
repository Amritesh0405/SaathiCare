export const HELPERS = [
    {
      name: 'Rajesh Kumar',
      age: 35,
      experience: '3 years',
      rating: 4.9,
      reviews: 87,
      skills: ['Grocery', 'Hospital', 'Bank Help'],
      languages: ['Hindi', 'Bengali'],
      verified: true,
      available: true,
      avatar: '👨'
    },
    {
      name: 'Priya Singh',
      age: 28,
      experience: '2 years',
      rating: 4.8,
      reviews: 64,
      skills: ['Walk Companion', 'Pharmacy', 'Errands'],
      languages: ['Hindi', 'English'],
      verified: true,
      available: true,
      avatar: '👩'
    },
    {
      name: 'Amit Sharma',
      age: 42,
      experience: '5 years',
      rating: 5.0,
      reviews: 112,
      skills: ['Hospital', 'Bank Help', 'Grocery'],
      languages: ['Hindi', 'Bengali', 'English'],
      verified: true,
      available: false,
      avatar: '👨'
    },
    {
      name: 'Sunita Devi',
      age: 32,
      experience: '2 years',
      rating: 4.7,
      reviews: 43,
      skills: ['Walk Companion', 'Grocery', 'Errands'],
      languages: ['Hindi', 'Bengali'],
      verified: true,
      available: true,
      avatar: '👩'
    },
    {
      name: 'Mohan Das',
      age: 38,
      experience: '4 years',
      rating: 4.9,
      reviews: 95,
      skills: ['Hospital', 'Bank Help', 'Pharmacy'],
      languages: ['Hindi', 'Bengali'],
      verified: true,
      available: true,
      avatar: '👨'
    },
    {
      name: 'Kavita Rani',
      age: 30,
      experience: '1 year',
      rating: 4.6,
      reviews: 28,
      skills: ['Grocery', 'Walk Companion', 'Errands'],
      languages: ['Hindi'],
      verified: true,
      available: true,
      avatar: '👩'
    }
  ];
  
  export const SERVICES = [
    { id: 'grocery', icon: '🛒', name: 'Grocery Shopping', desc: 'Accompany to market, carry bags' },
    { id: 'hospital', icon: '🏥', name: 'Hospital Visit', desc: 'Escort, wait, help with paperwork' },
    { id: 'bank', icon: '🏦', name: 'Bank & Office Help', desc: 'Forms, queues, govt offices' },
    { id: 'walk', icon: '🚶', name: 'Walk Companion', desc: 'Morning/evening walks' },
    { id: 'pharmacy', icon: '💊', name: 'Pharmacy Run', desc: 'Medicine pickup & delivery' },
    { id: 'errand', icon: '📦', name: 'Errands & More', desc: 'Post office, bills, courier' }
  ];
  
  export const PRICING = {
    perHour: 150,
    minHours: 1,
    currency: '₹'
  };
  
  export const COMPANY = {
    name: 'SaathiCare',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    phone: '+91 98765 43210',
    email: 'hello@saathicare.in',
    whatsapp: '919876543210'
  };

  export const SAMPLE_USER = {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    city: 'Jamshedpur'
  };
  
  export const SAMPLE_BOOKINGS = [
    {
      id: 'SC001',
      service: 'Grocery Shopping',
      icon: '🛒',
      date: '2024-06-10',
      time: '10:00 AM',
      hours: 2,
      amount: 300,
      hasVehicle: true,
      status: 'completed',
      helper: 'Rajesh Kumar',
      otp: '4821'
    },
    {
      id: 'SC002',
      service: 'Hospital Visit',
      icon: '🏥',
      date: '2024-06-15',
      time: '09:00 AM',
      hours: 3,
      amount: 450,
      hasVehicle: false,
      status: 'upcoming',
      helper: 'Priya Singh',
      otp: '7364'
    },
    {
      id: 'SC003',
      service: 'Bank Help',
      icon: '🏦',
      date: '2024-06-20',
      time: '11:00 AM',
      hours: 2,
      amount: 300,
      hasVehicle: true,
      status: 'pending',
      helper: 'Assigned soon',
      otp: '2951'
    }
  ];