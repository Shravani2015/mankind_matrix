import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ProductGrid = ({ searchQuery, category }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Hardcoded dummy product data for testing
  const dummyProducts = [
    // Graphics Processing Units (GPUs)
    {
      id: 1,
      name: 'SpectraForce X Series',
      shortDescription: 'High-performance graphics cards for gaming and creative professionals.',
      price: '$799',
      category: 'GPUs',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=SpectraForce+X+GPU'
    },
    {
      id: 2,
      name: 'NovaCore Vision',
      shortDescription: 'Professional GPUs for workstations, 3D rendering, and CAD applications.',
      price: '$999',
      category: 'GPUs',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=NovaCore+Vision'
    },
    {
      id: 3,
      name: 'ThunderCore AI GPU',
      shortDescription: 'High-performance GPUs for AI, machine learning, and data center applications.',
      price: '$1,499',
      category: 'GPUs',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=ThunderCore+AI+GPU'
    },
    {
      id: 4,
      name: 'FusionRender Series',
      shortDescription: 'GPUs designed for HPC (high-performance computing) and AI model training.',
      price: '$2,000',
      category: 'GPUs',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=FusionRender+Series'
    },
  
    // Artificial Intelligence (AI) and Deep Learning
    {
      id: 5,
      name: 'QuantumMind Systems',
      shortDescription: 'AI supercomputing systems for deep learning and AI model training.',
      price: 'Call for Pricing',
      category: 'AI Hardware',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=QuantumMind+Systems'
    },
    {
      id: 6,
      name: 'EdgeNexus Platform',
      shortDescription: 'AI-powered edge computing solutions for autonomous machines, robotics, and IoT devices.',
      price: 'Call for Pricing',
      category: 'AI Hardware',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=EdgeNexus+Platform'
    },
    {
      id: 7,
      name: 'NeuraFlow Suite',
      shortDescription: 'A parallel computing platform and API designed for accelerating AI and data-heavy workloads.',
      price: '$699',
      category: 'AI Hardware',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=NeuraFlow+Suite'
    },
    {
      id: 8,
      name: 'DeepStream AI Studio',
      shortDescription: 'A platform for creating AI-based video analytics applications for industries like retail, security, and automotive.',
      price: '$999',
      category: 'AI Hardware',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=DeepStream+AI+Studio'
    },
  
    // Data Center Products
    {
      id: 9,
      name: 'NovaGrid Solutions',
      shortDescription: 'GPUs designed for high-performance computing, scientific simulations, and AI workloads in data centers.',
      price: '$1,299',
      category: 'Data Center',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=NovaGrid+Solutions'
    },
    {
      id: 10,
      name: 'HyperEdge Processing',
      shortDescription: 'Advanced computing systems designed for scaling AI workloads in the cloud and on-premise.',
      price: 'Call for Pricing',
      category: 'Data Center',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=HyperEdge+Processing'
    },
    {
      id: 11,
      name: 'CloudSphere Accelerator',
      shortDescription: 'Data processing units designed for accelerating cloud, network, and storage functions in data centers.',
      price: '$1,499',
      category: 'Data Center',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=CloudSphere+Accelerator'
    },
  
    // Automotive Solutions
    {
      id: 12,
      name: 'DriveSense Platform',
      shortDescription: 'A suite of AI-driven solutions for self-driving vehicles, including hardware and software for autonomous driving.',
      price: 'Call for Pricing',
      category: 'Automotive',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=DriveSense+Platform'
    },
    {
      id: 13,
      name: 'OrionDrive SoC',
      shortDescription: 'A high-performance system-on-chip (SoC) for autonomous driving applications.',
      price: '$2,199',
      category: 'Automotive',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=OrionDrive+SoC'
    },
    {
      id: 14,
      name: 'AutoNexus AGX',
      shortDescription: 'Hardware and software solutions for developing intelligent autonomous vehicle systems.',
      price: 'Call for Pricing',
      category: 'Automotive',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=AutoNexus+AGX'
    },
  
    // Networking and Interconnect Products
    {
      id: 15,
      name: 'HyperLink Connect',
      shortDescription: 'High-speed Ethernet and InfiniBand network interconnects for enterprise and cloud environments.',
      price: '$499',
      category: 'Networking',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=HyperLink+Connect'
    },
    {
      id: 16,
      name: 'SwiftComm Network',
      shortDescription: 'High-throughput, low-latency networking solution for data centers and HPC applications.',
      price: '$799',
      category: 'Networking',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=SwiftComm+Network'
    },
  
    // AI and Machine Learning Software
    {
      id: 17,
      name: 'LumiFlow AI',
      shortDescription: 'A machine learning library for training deep learning models, optimized for multi-GPU performance.',
      price: '$199',
      category: 'AI Software',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=LumiFlow+AI'
    },
    {
      id: 18,
      name: 'InfernoForge',
      shortDescription: 'A dynamic deep learning framework for research and deployment, widely used in the AI community.',
      price: '$249',
      category: 'AI Software',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=InfernoForge'
    },
    {
      id: 19,
      name: 'CoreVision AI',
      shortDescription: 'A deep learning framework optimized for image recognition, computer vision, and object detection.',
      price: '$299',
      category: 'AI Software',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=CoreVision+AI'
    },
    {
      id: 20,
      name: 'CoreNeuron Suite',
      shortDescription: 'A scalable deep learning framework, designed for both experimental research and real-world application deployment.',
      price: '$399',
      category: 'AI Software',
      imageUrl: 'https://via.placeholder.com/300x200.png?text=CoreNeuron+Suite'
    }
  ];
  
  useEffect(() => {
    setProducts(dummyProducts);
    setFiltered(dummyProducts);
  }, []);

  useEffect(() => {
    let result = products;
    if (category) result = result.filter(p => p.category === category);
    if (searchQuery) result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1); // Reset to first page when filtering/searching
  }, [searchQuery, category, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  return (
    <div>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductGrid;