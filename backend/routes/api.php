<?php
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\VoitureController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LogoutController::class, 'logout']);
Route::get('/users', [LoginController::class, 'index']);
Route::get('/index', [VoitureController::class, 'index']);
Route::get('/voitures/{id}', [VoitureController::class, 'show']);

Route::middleware('auth:sanctum')->post('/reservations', [ReservationController::class, 'store']);
Route::middleware('auth:sanctum')->get('/admin/reservations', [ReservationController::class, 'index']);

Route::delete('/admin/reservations/{id}', [ReservationController::class, 'destroy']);
Route::put('/admin/reservations/{id}/valider', [ReservationController::class, 'valider']);

Route::middleware(['auth:sanctum'])->get('/mes-reservations', [ReservationController::class, 'mesReservations']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Groupe des routes admin
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::middleware(['admin'])->group(function () {
            Route::get('/dashboard', function () {
                return response()->json(['message' => 'Bienvenue sur le dashboard admin']);
            }); 
               
        });
    });
});

// Routes pour les voitures
Route::apiResource('voitures', VoitureController::class);

