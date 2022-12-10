<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Walas;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class WalasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item = Walas::with(['guru', 'kelas'])
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        if ($item) {
            return response()->json([
                'items' => $item,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'message' => 'failed',
        ], 402);
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
    public function search($query)
    {
        $search = Walas::with(['guru', 'kelas'])->where(function ($data) use ($query) {
            $data
                ->where('id_kelas', 'like', "%{$query}%")
                ->orWhere('id_guru', 'like', "%{$query}%");
        })->orWhereHas('guru', function ($data) use ($query) {
            $data
                ->where('nama_guru', 'like', "%{$query}%");
        })->orWhereHas('kelas', function ($data) use ($query) {
            $data
                ->where('nama_kelas', 'like', "%{$query}%");
        })->orderBy('created_at', 'desc')
            ->paginate(5);

        if ($query) {
            return response()->json([
                'items' => $search,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    public function store(Request $request)
    {
        $idGuru = Guru::pluck('id')->toArray();
        $idKelas = Kelas::pluck('id')->toArray();

        $validateData = $request->validate([
            'id_guru' => ['required', Rule::in($idGuru)],
            'id_kelas' => ['required', Rule::in($idKelas)],
        ]);

        if ($validateData) {
            $check = Walas::create($validateData);
        }

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'message' => 'failed'
        ], 402);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Walas  $walas
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Walas  $walas
     * @return \Illuminate\Http\Response
     */
    public function edit(Walas $walas)
    {
        $item = $walas;

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
            'message' => 'failed',
        ], 402);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Walas  $walas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Walas $walas)
    {
        $idGuru = Guru::pluck('id')->toArray();
        $idKelas = Guru::pluck('id')->toArray();

        $validateData = $request->validate([
            'id_guru' => ['required', Rule::in($idGuru)],
            'id_kelas' => ['required', Rule::in($idKelas)],
        ]);

        if ($validateData) {
            $check = $walas->update($validateData);
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
     * @param  \App\Models\Walas  $walas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Walas $walas)
    {
        $check = $walas->delete();

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