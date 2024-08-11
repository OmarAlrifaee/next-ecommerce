import { getAllCategories } from "@/actions/categories";
import CategoryRow from "../CategoryRow";

type Props = {
  searchParams: {
    search: string;
  };
};
const CategoriesTable = async ({ searchParams }: Props) => {
  const categories = await getAllCategories(searchParams.search);
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-5">
        <thead className="font-semibold text-black-text">
          <tr>
            <td className="p-3">Title</td>
            <td>Created At</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryRow category={category} key={category.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoriesTable;
