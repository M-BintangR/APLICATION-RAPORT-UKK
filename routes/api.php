<?php

use App\Http\Controllers\GuruController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TapelController;
use App\Http\Controllers\WalasController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'admin', 'middleware' => 'admin'], function () {
        //? Route Data Guru

        Route::get('/data/guru', [GuruController::class, 'index']);
        Route::post('/data/guru', [GuruController::class, 'store']);
        Route::get('/data/guru/{guru:id}/edit', [GuruController::class, 'edit']);
        Route::post('/data/guru/{guru:id}', [GuruController::class, 'update']);
        Route::delete('/data/guru/{guru:id}', [GuruController::class, 'destroy']);

        //? Route Data Mapel

        Route::get('/data/mapel', [MapelController::class, 'index']);
        Route::post('/data/mapel', [MapelController::class, 'store']);
        Route::get('/data/mapel/{id}', [MapelController::class, 'show']);
        Route::get('/data/mapel/{mapel:id}/edit', [MapelController::class, 'edit']);
        Route::put('/data/mapel/{mapel:id}', [MapelController::class, 'update']);
        Route::delete('/data/mapel/{mapel:id}', [MapelController::class, 'destroy']);

        //? Route Data Walas

        Route::get('/data/walas', [WalasController::class, 'index']);
        Route::post('/data/walas', [WalasController::class, 'store']);
        Route::get('/data/walas/{walas:id}', [WalasController::class, 'show']);
        Route::get('/data/walas/{walas:id}/edit', [WalasController::class, 'edit']);
        Route::put('/data/walas/{walas:id}', [WalasController::class, 'update']);
        Route::delete('/data/walas/{walas:id}', [WalasController::class, 'destroy']);

        //? Route Data Jurusan

        Route::get('/data/jurusan', [JurusanController::class, 'index']);
        Route::post('/data/jurusan', [JurusanController::class, 'store']);
        Route::get('/data/jurusan/{jurusan:id}', [JurusanController::class, 'show']);
        Route::get('/data/jurusan/{jurusan:id}/edit', [JurusanController::class, 'edit']);
        Route::put('/data/jurusan/{jurusan:id}', [JurusanController::class, 'update']);
        Route::delete('/data/jurusan/{jurusan:id}', [JurusanController::class, 'destroy']);

        //? Route Data Kelas

        Route::get('/data/kelas', [KelasController::class, 'index']);
        Route::post('/data/kelas', [KelasController::class, 'store']);
        Route::get('/data/kelas/{kelas:id}', [KelasController::class, 'show']);
        Route::get('/data/kelas/{kelas:id}/edit', [KelasController::class, 'edit']);
        Route::put('/data/kelas/{kelas:id}', [KelasController::class, 'update']);
        Route::delete('/data/kelas/{kelas:id}', [KelasController::class, 'destroy']);

        //? Route Data Tapel

        Route::get('/data/tapel', [TapelController::class, 'index']);
        Route::post('/data/tapel', [TapelController::class, 'store']);
        Route::get('/data/tapel/{tapel:id}', [TapelController::class, 'show']);
        Route::get('/data/tapel/{tapel:id}/edit', [TapelController::class, 'edit']);
        Route::put('/data/tapel/{tapel:id}', [TapelController::class, 'update']);
        Route::delete('/data/tapel/{tapel:id}', [TapelController::class, 'destroy']);
    });

    Route::group(['prefix' => 'guru', 'middleware' => 'guru'], function () {
    });

    Route::group(['prefix' => 'walas', 'middleware' => 'walas'], function () {
    });

    Route::group(['prefix' => 'siswa', 'middleware' => 'siswa'], function () {
    });


    Route::post('/logout', [LoginController::class, 'logout']);
});

//* register and login
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);