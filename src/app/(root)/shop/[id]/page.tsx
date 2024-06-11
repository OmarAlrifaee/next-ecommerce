import { getOneProduct } from "@/actions/products";

type Props = {
  params: { id: string };
};
const ProductDetails = async ({ params }: Props) => {
  const product = await getOneProduct(params.id);
  return <div>ProductDetails</div>;
};
export default ProductDetails;