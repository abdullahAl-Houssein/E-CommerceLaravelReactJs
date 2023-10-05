<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
    public function store(Request $request)
    {
        if (Gate::allows('create categories')) {
            $data = $request->validate([
                'name' => 'required|string|unique:categories,name',
            ]);

            $category = Category::create($data);
            return response()->json(['message' => 'Category created successfully', 'data' => $category]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
    public function show(Category $category)
    {
        return response()->json(['data' => $category]);
    }


    public function update(Request $request, Category $category)
    {
        if (Gate::allows('edit categories', $category)) {
            $data = $request->validate([
                'name' => 'required|string|unique:categories,name,' . $category->id,
            ]);

            $category->update($data);
            return response()->json(['message' => 'Category updated successfully', 'data' => $category]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    public function destroy(Category $category)
    {
        if (Gate::allows('delete categories', $category)) {
            $category->delete();
            return response()->json(['message' => 'Category deleted successfully']);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    //get products by category
    public function showProducts(Category $category)
    {
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $products = $category->products;

        if ($products->isEmpty()) {
            return response()->json(['message' => 'There are no products for this category'], 404);
        }

        return response()->json($products);
    }

}
