<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Guru;
use App\Models\Mapel;
use App\Models\User;
use App\Models\Walas;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Guru::create([
            "id_mapel" => 1,
            "nama_guru" => "Bintang Sensei",
        ]);

        Mapel::create([
            "nama_mapel" => 'matematika',
            "kkm" => 70,
            'level' => "admin",
            'id_jurusan' => 1,
        ]);

        Walas::create([
            "id_guru" => 1,
            'id_kelas' => 1
        ]);

        User::create([
            "nama_pengguna" => "Muhammad Bintang",
            "username" => "HoshiChan",
            "password" => bcrypt("adminadmin"),
            "role" => "admin",
        ]);
    }
}