import axios from 'axios';
import { IS_DEV_MODE, API_TIMEOUT, getAxiosConfig } from './config';

// Configure axios defaults
axios.defaults.timeout = API_TIMEOUT;

// Mocked products data for development
const mockProducts = [
  // Graphics Processing Units (GPUs)
  {
    id: 1,
    name: 'SpectraForce X Series',
    shortDescription: 'High-performance graphics cards for gaming and creative professionals.',
    longDescription: 'The SpectraForce X Series represents the pinnacle of gaming graphics technology. These cards deliver unparalleled performance for AAA gaming titles at 4K resolution with ray tracing enabled. Built on the latest architecture, they offer exceptional power efficiency while maintaining cool temperatures even under heavy loads.',
    price: '$799',
    category: 'GPUs',
    imageUrl: 'https://via.placeholder.com/500x400.png?text=SpectraForce+X+GPU',
    specifications: {
      'Memory': '12GB GDDR6X',
      'CUDA Cores': '5,888',
      'Base Clock': '1.5 GHz',
      'Boost Clock': '1.8 GHz',
      'TDP': '320W',
      'Recommended PSU': '750W'
    }
  },
  {
    id: 2,
    name: 'NovaCore Vision',
    shortDescription: 'Professional GPUs for workstations, 3D rendering, and CAD applications.',
    longDescription: 'NovaCore Vision cards are specially designed for content creators and professionals who demand reliability and performance. These workstation-class GPUs excel at 3D modeling, video editing, and complex CAD operations with certified drivers for all major professional applications.',
    price: '$999',
    category: 'GPUs',
    imageUrl: 'https://via.placeholder.com/500x400.png?text=NovaCore+Vision',
    specifications: {
      'Memory': '24GB GDDR6',
      'CUDA Cores': '4,608',
      'Base Clock': '1.3 GHz',
      'Boost Clock': '1.7 GHz',
      'TDP': '300W',
      'ECC Memory': 'Yes'
    }
  },
  // More mock products can be added here
];

// Production API calls
export const getAllProducts = async (page = 0, size = 10) => {
  try {
    if (IS_DEV_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const start = page * size;
      const end = start + size;
      const paginatedProducts = mockProducts.slice(start, end);
      
      return {
        content: paginatedProducts,
        totalElements: mockProducts.length,
        totalPages: Math.ceil(mockProducts.length / size),
        size,
        number: page
      };
    }
    
    // For production, call the actual API
    const res = await axios.get(`/products`, getAxiosConfig({
      params: { page, size }
    }));
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    if (IS_DEV_MODE) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const product = mockProducts.find(p => p.id.toString() === id.toString());
      
      if (!product) {
        // Simulate a 404 response
        const error = new Error('Product not found');
        error.response = { status: 404 };
        throw error;
      }
      
      return product;
    }
    
    // For production, call the actual API
    const res = await axios.get(`/products/${id}`, getAxiosConfig({
      headers: {
        'Cache-Control': 'no-cache',
      }
    }));
    return res.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
  
