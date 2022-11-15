<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Siswa::with(['kelas', 'jurusan'])->get();

        if ($items) {
            return response()->json([
                'items' => $items,
                'message' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'not found',
            ], 404);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nis' => ['required', 'max:7', 'min:7'],
            'nama' => ['required', 'min:1', 'max:100'],
            'profil' => ['nullable'],
            'id_kelas' => ['required'],
            'id_jurusan' => ['required'],
            'jk' => ['required', 'min:1', 'max:1'],
            'agama' => ['required', 'min:1', 'max:15'],
            'nisn' => ['required', 'min:10', 'max:10'],
        ]);

        if ($validateData) {
            $check = Siswa::create($validateData);
        }

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success',
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function show(Siswa $siswa)
    {
        $item = $siswa->with(['jurusan', 'kelas'])->get();

        if ($item) {
            return response()->json([
                'item' => $item,
                'message' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function edit(Siswa $siswa)
    {
        $item = $siswa;

        if ($item) {
            return response()->json([
                'item' => $item,
                'message' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'not found',
            ], 404);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Siswa $siswa)
    {
        $validateData = $request->validate([
            'nis' => ['required', 'max:7', 'min:7'],
            'nama' => ['required', 'min:1', 'max:100'],
            'profil' => ['nullable'],
            'id_kelas' => ['required'],
            'id_jurusan' => ['required'],
            'jk' => ['required', 'min:1', 'max:1'],
            'agama' => ['required', 'min:1', 'max:15'],
            'nisn' => ['required', 'min:10', 'max:10'],
        ]);

        if ($validateData) {
            $check = $siswa->update($validateData);
        }

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success',
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Siswa $siswa)
    {
        $check = $siswa->delete();

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success',
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }
}