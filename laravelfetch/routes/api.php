<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// jo bhi import hai vo neeche hai

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

//---------------------------------------------------//
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


Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/dashboard', [UserController::class, 'index']);
    Route::post('/post/create', [PostController::class, 'store']);
    Route::get('/post/get', [PostController::class, 'show']);
    Route::post('/post/update/{id}', [PostController::class, 'update']);
    Route::get('/post/delete/{id}', [PostController::class, 'delete']);
});


Route::post('/login-form', [UserController::class, 'login']);
Route::post('/post-form', [UserController::class, 'create']);
