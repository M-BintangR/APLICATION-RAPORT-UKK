<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MapelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Mapel::with(['jurusan'])->orderBy('created_at', 'desc')
            ->paginate(5);

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
    public function search($query)
    {
        $search = Mapel::with(['jurusan'])->where(function ($data) use ($query) {
            $data
                ->where('nama_mapel', 'like', "%{$query}%")
                ->orWhere('kkm', 'like', "%{$query}%")
                ->orWhere('level', 'like', "%{$query}%");
        })->orWhereHas('jurusan', function ($data) use ($query) {
            $data
                ->where('nama_jurusan', 'like', "%{$query}%")
                ->orWhere('kode_jurusan', 'like', "%{$query}%");
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
        $idJurusan = Jurusan::pluck('id')->toArray();
        $validateData = $request->validate([
            'nama_mapel' => ['required'],
            'kkm' => ['required'],
            'level' => ['required'],
            'id_jurusan' => ['required', Rule::in($idJurusan)],
        ]);

        if ($validateData) {
            $check = Mapel::create($validateData);
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
     * @param  \App\Models\Mapel  $mapel
     * @return \Illuminate\Http\Response
     */
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mapel  $mapel
     * @return \Illuminate\Http\Response
     */
    public function edit(Mapel $mapel)
    {
        $item = $mapel;

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
     * @param  \App\Models\Mapel  $mapel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mapel $mapel)
    {
        $idJurusan = Jurusan::pluck('id')->toArray();
        $validateData = $request->validate([
            'nama_mapel' => ['required'],
            'kkm' => ['required'],
            'level' => ['required'],
            'id_jurusan' => ['required', Rule::in($idJurusan)],
        ]);

        if ($validateData) {
            $check = $mapel->update($validateData);
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
     * @param  \App\Models\Mapel  $mapel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mapel $mapel)
    {
        $check = $mapel->delete();

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success'
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }
}