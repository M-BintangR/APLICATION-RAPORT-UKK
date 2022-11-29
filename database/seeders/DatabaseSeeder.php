<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\Tapel;
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

        // User seeder
        $users = [
            [
                "nama_pengguna" => "Muhammad Bintang",
                "username" => "User Admin",
                "password" => bcrypt("adminadmin"),
                "role" => "admin",
            ],
            [
                "nama_pengguna" => "Fery Fadul Rahman",
                "username" => "User Siswa",
                "password" => bcrypt("siswasiswa"),
                "role" => "siswa",
            ],
            [
                "nama_pengguna" => "Zhaka Hidayat",
                "username" => "User Walas",
                "password" => bcrypt("walaswalas"),
                "role" => "walas"
            ]
        ];

        $gurus = [
            [
                "id_mapel" => 1,
                "nama_guru" => "Zhaka Sensei"
            ],
            [
                "id_mapel" => 2,
                "nama_guru" => "Bintang Sensei",
            ],
            [
                "id_mapel" => 3,
                "nama_guru" => "Fery Sensei",
            ]
        ];

        $mapels = [
            [
                "nama_mapel" => 'Matematika',
                "kkm" => 70,
                "level" => "X",
                "id_jurusan" => 1,
            ],
            [
                "nama_mapel" => 'Bahasa Indonesia',
                "kkm" => 75,
                "level" => 'XI',
                "id_jurusan" => 2,
            ],
            [
                "nama_mapel" => 'Sejarah',
                "kkm" => 75,
                "level" => 'XI',
                "id_jurusan" => 3,
            ]
        ];

        $walass = [
            [
                "id_guru" => 1,
                'id_kelas' => 1
            ],
            [
                "id_guru" => 2,
                "id_kelas" => 2,
            ],
            [
                "id_guru" => 3,
                "id_kelas" => 3,
            ]
        ];

        $jurusans = [
            [
                "kode_jurusan" => 'RPL',
                "nama_jurusan" => 'Rekayasa Prangkat Lunak',
            ],
            [
                "kode_jurusan" => 'TKJ',
                "nama_jurusan" => 'Teknik Kompute Jaringan',
            ],
            [
                "kode_jurusan" => 'MMK',
                "nama_jurusan" => 'Multimedia Komputer',
            ]
        ];

        $kelass = [
            [
                "nama_kelas" => "RPL 2",
                "level" => "XI",
            ],
            [
                "nama_kelas" => "TKJ 1",
                "level" => "XI",
            ],
            [
                "nama_kelas" => "MMK 1",
                "level" => "XI"
            ]
        ];

        $tapels = [
            [
                "tahun_pelajaran" => "2019",
                "semester" => "Semester 6",
                "aktif" => '0',
            ],
            [
                "tahun_pelajaran" => "2020",
                "semester" => "Semester 5",
                "aktif" => '1',
            ],
            [
                "tahun_pelajaran" => "2021",
                "semester" => "Semester 4",
                "aktif" => '1',
            ]
        ];

        $siswas = [
            [
                "nis" => '202-001',
                "nama" => 'Muhammad Bintang',
                "id_kelas" => 1,
                "id_jurusan" => 1,
                "jk" => 'L',
                "agama" => 'Islam',
                "nisn" => '2020202001',
            ],
            [
                "nis" => '202-002',
                "nama" => 'Zhaka Hidayat',
                "id_kelas" => 2,
                "id_jurusan" => 2,
                "jk" => 'L',
                "agama" => 'Islam',
                "nisn" => '2020202002',
            ],
            [
                "nis" => '202-003',
                "nama" => 'Fery Fadul Rahman',
                "id_kelas" => 3,
                "id_jurusan" => 3,
                "jk" => 'L',
                "agama" => 'Islam',
                "nisn" => '2020202003',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }

        foreach ($gurus as $guru) {
            Guru::create($guru);
        }

        foreach ($mapels as $mapel) {
            Mapel::create($mapel);
        }

        foreach ($walass as $walas) {
            Walas::create($walas);
        }

        foreach ($jurusans as $jurusan) {
            Jurusan::create($jurusan);
        }

        foreach ($kelass as $kelas) {
            Kelas::create($kelas);
        }

        foreach ($tapels as $tapel) {
            Tapel::create($tapel);
        }

        foreach ($siswas as $siswa) {
            Siswa::create($siswa);
        }
    }
}