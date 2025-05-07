"use client"

import { thousandSeparator } from "@/lib/number";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductApiResponse = {
  success: boolean,
  message: string,
  data: Product[];
  
};

const baseUrl = "http://localhost:5050/api"

export default function ProductSearch() {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/product`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: ProductApiResponse = await res.json();
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (err) {
        const errorMessage = (err as Error).message;
        Swal.fire({
          title: "Oops...",
          text: errorMessage,
          icon: "error",
          showConfirmButton: false,
          timer: 5000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id} className="p-2 border-b">
            <span className="font-semibold">{product.name}</span> - Rp.{thousandSeparator(product.price)},-
          </li>
        ))}
      </ul>
    </div>
  );
}