import ProductView from "./ProductView";

export default async function Page({ params }) {
    const { pid } = await params;  // <-- THIS is needed!
  return <ProductView productId={pid}/>;
}

