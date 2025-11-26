// import { imageMap } from "@/lib/imageMap";
// import ClientButton from "./ClientButton";

// async function getProduct(pid) {
//     const res = await fetch(`http://localhost:8080/api/product/${pid}`, {
//         cache: "no-store",
//     });

//     if (!res.ok) {
//         throw new Error("Failed to fetch product");
//     }

//     return res.json();
// }

// async function getVariants(pid) {
//     const res = await fetch(`http://localhost:8080/api/product_variant/byProduct/${pid}`, {
//         cache: "no-store",
//     });

//     if (!res.ok) {
//         throw new Error("Failed to fetch variants");
//     }

//     return res.json();
// }

// export default async function ProductDetailPage({ params }) {
//     const { pid } = params;

//     const product = await getProduct(pid);
//     const variants = await getVariants(pid);

//     return (
//         <div className="max-w-4xl mx-auto px-6 py-10">
//             <img
//                 src={`/assets/products/${pid}/${imageMap[pid]}`}
//                 alt={product.name}
//                 className="w-full h-96 object-cover rounded-lg"
//             />

//             <h1 className="text-3xl mt-6 font-semibold">{product.name}</h1>

//             <p className="text-gray-600 mt-2">
//                 {product.description}
//             </p>

//             <p className="text-xl mt-4 font-medium">
//                 ${variants[0]?.price ?? "N/A"}
//             </p>

//             <div className="mt-6">
//                 <ClientButton />
//             </div>
//         </div>
//     );
// }


import ProductView from "./ProductView";

export default async function Page({ params }) {
    const { pid } = await params;  // <-- THIS is needed!
  return <ProductView productId={pid}/>;
}

