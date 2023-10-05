<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function index(){
        $product = Product::all();
        return response()->json($product);
    }
    public function store(Request $request)
    {
        if (Gate::allows('create product')) {
            $data = $request->validate([
                'name' => 'required|string',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'img_url' => 'required|string',
                'category_id' => 'required|numeric'
            ]);
            $product = Product::create($data);
            return response()->json(['message' => 'Product created successfully', 'data' => $product]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
    public function show(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }
    public function update(Request $request,string $id, Product $product)
    {
        if (Gate::allows('edit product', $product)) {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'image_url' => 'nullable|string',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            $product->update($request->all());

            return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
        public function destroy(Product $product,string $id)
    {
        if (Gate::allows('delete product', $product)) {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    //search on products
    public function search(Request $request)
    {
        $keyword = $request->input('keyword');

        if (empty($keyword)) {
            return response()->json([
                'message' => 'Please enter a search keyword.',
            ]);
        }

        $products = Product::where(function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%")
                ->orWhere('description', 'LIKE', "%$keyword%");
        })->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'No products found.',
            ]);
        }

        return response()->json([
            'products' => $products,
        ]);
    }






}
