<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Http\Request;
use App\Models\Siswa;
use App\Models\Tapel;
use App\Models\User;
use App\Models\Walas;

class DashboardController extends Controller
{
    public function countData()
    {
        $countSiswa = count(Siswa::all());
        $countWalas = count(Walas::all());
        $countMapel = count(Mapel::all());
        $countTapel = count(Tapel::all());
        $countKelas = count(Kelas::all());
        $countGuru = count(Guru::all());
        $countJurusan = count(Jurusan::all());
        $countUser = count(User::all());

        $jmlData = collect([
            'jmlSiswa' => $countSiswa,
            'jmlWalas' => $countWalas,
            'jmlMapel' => $countMapel,
            'jmlTapel' => $countTapel,
            'jmlKelas' => $countKelas,
            'jmlGuru' => $countGuru,
            'jmlJurusan' => $countJurusan,
            'jmlUser' => $countUser,
        ]);

        if ($jmlData) {
            return response()->json($jmlData);
        }

        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }
}