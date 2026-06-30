import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

interface Product {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    price: number;
    image: string;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    return (
            <>
            <Head title="Products" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-sm text-gray-500">
                            Manage your product list.
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        + Add Product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="h-14 w-14 rounded object-cover"
                                            />
                                        </td>

                                        <td className="px-4 py-3">
                                            {product.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {product.category.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            Rp{" "}
                                            {product.price.toLocaleString(
                                                "id-ID"
                                            )}
                                        </td>

                                        <td className="space-x-2 px-4 py-3 text-center">
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="rounded bg-yellow-500 px-3 py-1 text-sm text-white"
                                            >
                                                Edit
                                            </Link>

                                            <button className="rounded bg-red-600 px-3 py-1 text-sm text-white">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-8 text-center text-gray-500"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
    );
}