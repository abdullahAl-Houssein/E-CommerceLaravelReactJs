<?php

use App\Http\Controllers\APIs\OrdersController;
use App\Http\Controllers\APIs\ProductsController;

use App\Http\Controllers\APIs\ProfileController;
use App\Http\Controllers\APIs\UsersController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\APIs\CategoriesController;

//CUD Categories with roles
Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware('can:create categories')->post('/categories', [CategoriesController::class, 'store']);
    Route::middleware('can:edit categories')->put('/categories/{category}', [CategoriesController::class, 'update']);
    Route::middleware('can:delete categories')->delete('/categories/{category}', [CategoriesController::class, 'destroy']);
});
// Categories without roles
Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{category}', [CategoriesController::class, 'show']);


//CUD Products with roles

Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware('can:create product')->post('/products', [ProductsController::class, 'store']);
    Route::middleware('can:edit product')->put('/products/{products}', [ProductsController::class, 'update']);
    Route::middleware('can:delete product')->delete('/products/{products}', [ProductsController::class, 'destroy']);
});
// Products
Route::get('/products/{products}', [ProductsController::class, 'show']);
Route::get('/products', [ProductsController::class, 'index']);

// get products by categories
Route::get('/categories/{category}/products', [CategoriesController::class,'showProducts']);


//CUD Orders with roles
Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware('can:create order')->post('/addOrder', [OrdersController::class, 'addOrder']);
    //Route::middleware('can:edit order')->put('/orders/{order}', [OrdersController::class, 'update']);
    Route::middleware('can:delete order')->delete('/orders/{order}', [OrdersController::class, 'destroy']);
});

// Orders
//Route::middleware(['auth:sanctum'])->get('/orders/{order}', [OrdersController::class, 'show']);
Route::middleware(['auth:sanctum'])->get('/orders', [OrdersController::class, 'index']);
Route::get('/orders', [OrdersController::class,'index']);
Route::get('/orders/{id}', [OrdersController::class,'show']);
//Route::get('/getOrders', [OrdersController::class,'getOrders']);
// my orders
Route::get('/user_orders/{id}', [OrdersController::class, 'user_orders']);
//  Order Edit
Route::put('/orders/{order}', [OrdersController::class,'update'])->name('orders.update');

//Users
Route::get('/users', [UsersController::class, 'index']);
Route::post('/users', [UsersController::class,'store']);
Route::middleware('auth:api')->get('/profile', [ProfileController::class,'show']);
Route::get('/userName', [UsersController::class,'getUserName'])->middleware('auth:sanctum');
Route::post('/search' , [ProductsController::class,'search']);



// Route for retrieving all orders
Route::get('/orders', [OrdersController::class, 'index']);

// Route for retrieving orders for a specific user
//Route::get('/orders/{id}', [OrdersController::class, 'user_orders']);

// Route for creating a new order
Route::post('/orders', [OrdersController::class, 'create_order']);

// Route for adding order details
Route::post('/orders/details', [OrdersController::class, 'add_order_details']);

// Route for updating order details
Route::put('/orders/details/{id}', [OrdersController::class, 'update_order_detail']);


require __DIR__.'/auth.php';
