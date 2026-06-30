<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products/index', [
            "products" => Product::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create');
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('products', 'public');

        Product::create($data);

        return redirect()->route('products.index')->with(['success' => 'Data Berhasil Disimpan!']);
    }
    public function show(int $id)
    {
        $products = Product::find($id);
        return Inertia::render('products/show', compact('products'));
    }
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
            Storage::disk('public')->delete($product->image);
        }
        $product->update($data);

        return redirect()->route('products.index')->with(['success' => 'Data Berhasil Diupdate!']);
    }
    public function destroy(Product $product)
    {
        Storage::disk('public')->delete($product->image);

        $product->delete();

        return redirect()->route('products.index')->with(['success' => 'Data Berhasil Dihapus!']);
    }
}
