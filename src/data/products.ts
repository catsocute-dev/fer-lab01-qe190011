export interface Product {
  id: number
  name: string
  image: string
  description: string
  price: number
  brand?: string
  category?: string
  stock?: number
  rating?: number
  specifications?: string[]
  features?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 2500000,
    brand: "AudioTech",
    category: "Audio",
    stock: 45,
    rating: 4.5,
    specifications: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Quick charge: 10 min = 3 hours",
      "Weight: 250g"
    ],
    features: [
      "Premium sound quality",
      "Comfortable over-ear design",
      "Foldable and portable",
      "Multi-device pairing"
    ]
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Advanced smartwatch with health tracking, GPS, and water resistance. Stay connected and monitor your fitness goals.",
    price: 5500000,
    brand: "TechWear",
    category: "Wearables",
    stock: 28,
    rating: 4.8,
    specifications: [
      "1.4-inch AMOLED display",
      "GPS + GLONASS",
      "Water resistance: 5ATM",
      "Battery: 7 days",
      "Health sensors: Heart rate, SpO2"
    ],
    features: [
      "24/7 health monitoring",
      "50+ workout modes",
      "Smart notifications",
      "Music control"
    ]
  },
  {
    id: 3,
    name: "Laptop Stand Ergonomic",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Adjustable aluminum laptop stand that improves posture and workspace ergonomics. Compatible with all laptop sizes.",
    price: 850000,
    brand: "ErgoDesk",
    category: "Accessories",
    stock: 62,
    rating: 4.6,
    specifications: [
      "Material: Aluminum alloy",
      "Adjustable height: 6-12 inches",
      "Weight capacity: 8kg",
      "Compatible: 10-17 inch laptops",
      "Weight: 800g"
    ],
    features: [
      "Ergonomic design",
      "Ventilation slots",
      "Foldable for portability",
      "Non-slip base"
    ]
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description: "Premium mechanical keyboard with RGB backlighting and Cherry MX switches. Perfect for gaming and typing enthusiasts.",
    price: 3200000,
    brand: "KeyMaster",
    category: "Peripherals",
    stock: 35,
    rating: 4.7,
    specifications: [
      "Switches: Cherry MX Red",
      "Layout: Full-size 104 keys",
      "RGB backlighting",
      "Anti-ghosting: N-key rollover",
      "Dimensions: 440 x 130 x 40mm"
    ],
    features: [
      "Durable mechanical switches",
      "Customizable RGB lighting",
      "Programmable keys",
      "Detachable USB-C cable"
    ]
  },
  {
    id: 5,
    name: "Wireless Mouse Ergonomic",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop",
    description: "Comfortable wireless mouse with ergonomic design and long battery life. Ideal for office work and gaming.",
    price: 1200000,
    brand: "ClickPro",
    category: "Peripherals",
    stock: 78,
    rating: 4.4,
    specifications: [
      "DPI: 1600 (adjustable)",
      "Connection: 2.4GHz wireless",
      "Battery: AA (12 months)",
      "Ergonomic right-handed design",
      "Weight: 95g"
    ],
    features: [
      "Comfortable grip",
      "Precise tracking",
      "Long battery life",
      "Plug and play"
    ]
  },
  {
    id: 6,
    name: "USB-C Hub Multiport",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Expand your laptop connectivity.",
    price: 950000,
    brand: "ConnectHub",
    category: "Accessories",
    stock: 51,
    rating: 4.3,
    specifications: [
      "HDMI: 4K @ 30Hz",
      "USB 3.0: 3 ports",
      "USB-C PD: 100W",
      "SD/TF card reader",
      "Ethernet: Gigabit"
    ],
    features: [
      "7-in-1 functionality",
      "Fast data transfer",
      "4K video output",
      "Compact design"
    ]
  },
  {
    id: 7,
    name: "Portable External SSD 1TB",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop",
    description: "Fast and reliable external SSD with USB 3.2 Gen 2. Perfect for backups, file transfers, and portable storage.",
    price: 2800000,
    brand: "SpeedStore",
    category: "Storage",
    stock: 42,
    rating: 4.9,
    specifications: [
      "Capacity: 1TB",
      "Interface: USB 3.2 Gen 2",
      "Read speed: 1050 MB/s",
      "Write speed: 1000 MB/s",
      "Dimensions: 75 x 55 x 10mm"
    ],
    features: [
      "Ultra-fast transfer speeds",
      "Shock and vibration resistant",
      "Compact and portable",
      "3-year warranty"
    ]
  },
  {
    id: 8,
    name: "Webcam HD 1080p",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    description: "Crystal clear HD webcam with auto-focus and built-in microphone. Great for video calls and streaming.",
    price: 1800000,
    brand: "ClearView",
    category: "Accessories",
    stock: 39,
    rating: 4.5,
    specifications: [
      "Resolution: 1080p @ 30fps",
      "Lens: Auto-focus",
      "Microphone: Built-in stereo",
      "Connection: USB 2.0",
      "Field of view: 78°"
    ],
    features: [
      "HD video quality",
      "Auto low-light correction",
      "Privacy shutter",
      "Universal clip mount"
    ]
  },
]

