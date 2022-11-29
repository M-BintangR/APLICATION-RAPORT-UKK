<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardGuru;
use App\Http\Controllers\DashboardSiswa;
use App\Http\Controllers\DashboardWalas;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TapelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalasController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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
        Route::get('/data/guru/{query}', [GuruController::class, 'search']);

        //? Route Data User

        Route::get('/data/user', [UserController::class, 'index']);
        Route::post('/data/user', [UserController::class, 'store']);
        Route::get('/data/user/{user:id}/edit', [UserController::class, 'edit']);
        Route::put('/data/user/{user:id}', [UserController::class, 'update']);
        Route::delete('/data/user/{user:id}', [UserController::class, 'destroy']);
        Route::get('/data/user/{query}', [UserController::class, 'search']);
        Route::post('/data/user/reset/password/{user:id}', [UserController::class, 'resetPassword']);

        //? Route Data Mapel

        Route::get('/data/mapel', [MapelController::class, 'index']);
        Route::post('/data/mapel', [MapelController::class, 'store']);
        Route::get('/data/mapel/{mapel:id}/edit', [MapelController::class, 'edit']);
        Route::post('/data/mapel/{mapel:id}', [MapelController::class, 'update']);
        Route::delete('/data/mapel/{mapel:id}', [MapelController::class, 'destroy']);
        Route::get('/data/mapel/{query}', [MapelController::class, 'search']);

        //? Route Data Walas

        Route::get('/data/walas', [WalasController::class, 'index']);
        Route::post('/data/walas', [WalasController::class, 'store']);
        Route::get('/data/walas/{walas:id}/edit', [WalasController::class, 'edit']);
        Route::put('/data/walas/{walas:id}', [WalasController::class, 'update']);
        Route::delete('/data/walas/{walas:id}', [WalasController::class, 'destroy']);
        Route::get('/data/walas/{query}', [WalasController::class, 'search']);

        //? Route Data Jurusan

        Route::get('/data/jurusan', [JurusanController::class, 'index']);
        Route::post('/data/jurusan', [JurusanController::class, 'store']);
        Route::get('/data/jurusan/{jurusan:id}/edit', [JurusanController::class, 'edit']);
        Route::put('/data/jurusan/{jurusan:id}', [JurusanController::class, 'update']);
        Route::delete('/data/jurusan/{jurusan:id}', [JurusanController::class, 'destroy']);
        Route::get('/data/jurusan/{query}', [JurusanController::class, 'search']);

        //? Route Data Kelas

        Route::get('/data/kelas', [KelasController::class, 'index']);
        Route::post('/data/kelas', [KelasController::class, 'store']);
        Route::get('/data/kelas/{kelas:id}/edit', [KelasController::class, 'edit']);
        Route::put('/data/kelas/{kelas:id}', [KelasController::class, 'update']);
        Route::delete('/data/kelas/{kelas:id}', [KelasController::class, 'destroy']);
        Route::get('/data/kelas/{query}', [KelasController::class, 'search']);

        //? Route Data Tapel

        Route::get('/data/tapel', [TapelController::class, 'index']);
        Route::post('/data/tapel', [TapelController::class, 'store']);
        Route::get('/data/tapel/{tapel:id}/edit', [TapelController::class, 'edit']);
        Route::put('/data/tapel/{tapel:id}', [TapelController::class, 'update']);
        Route::delete('/data/tapel/{tapel:id}', [TapelController::class, 'destroy']);
        Route::get('/data/tapel/{query}', [TapelController::class, 'search']);

        //? Route Data Siswa

        Route::get('/data/siswa', [SiswaController::class, 'index']);
        Route::post('/data/siswa', [SiswaController::class, 'store']);
        Route::get('/data/siswa/{siswa:id}/edit', [SiswaController::class, 'edit']);
        Route::put('/data/siswa/{siswa:id}', [SiswaController::class, 'update']);
        Route::delete('/data/siswa/{siswa:id}', [SiswaController::class, 'destroy']);
        Route::get('/data/siswa/{query}', [SiswaController::class, 'search']);

        //? Route Dashboard Home

        Route::get('/data/home/cards', [DashboardController::class, 'countData']);
    });

    Route::group(['prefix' => 'guru', 'middleware' => 'guru'], function () {
        Route::get('/dashboard/guru', [DashboardGuru::class, 'index']);
    });

    Route::group(['prefix' => 'walas', 'middleware' => 'walas'], function () {
        Route::get('/dashboard/walas', [DashboardWalas::class, 'index']);
    });

    Route::group(['prefix' => 'siswa', 'middleware' => 'siswa'], function () {
        Route::get('/dashboard/siswa', [DashboardSiswa::class, 'index']);
    });

    Route::get('/data/user/show/{user:id}', [UserController::class, 'show']);
    Route::post('/logout', [LoginController::class, 'logout']);
});


//* register and login
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);