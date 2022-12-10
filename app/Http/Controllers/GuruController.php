<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Guru::with(['mapel', 'walas'])
            ->orderBy('created_at', 'desc')
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function search($request)
    {
        $search = Guru::with(['mapel'])->where(function ($query) use ($request) {
            $query
                ->where('nama_guru', 'like', "%{$request}%");
        })->orWhereHas('mapel', function ($query) use ($request) {
            $query
                ->where('nama_mapel', 'like', "%{$request}%")
                ->orWhere('kkm', 'like', "%{$request}%")
                ->orWhere('level', 'like', "%{$request}%");
        })
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        if ($request) {
            return response()->json([
                'items' => $search,
                'message' => 'success',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorizaed',
            ], 401);
        }
    }

    public function store(Request $request)
    {
        $idMapel = Mapel::pluck('id')->toArray();
        $validateData = $request->validate([
            'nama_guru' => ['required'],
            'id_mapel' => ['required', Rule::in($idMapel)],
        ]);

        if ($validateData) {
            $check = Guru::create($validateData);
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
     * @param  \App\Models\Guru  $guru
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function edit(Guru $guru)
    {
        $item = $guru;

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
     * @param  \App\Models\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guru $guru)
    {
        $idMapel = Mapel::pluck('id')->toArray();

        $validateData = $request->validate([
            'nama_guru' => ['required'],
            'id_mapel' => ['required', Rule::in($idMapel)],
        ]);

        if ($validateData) {
            $check = $guru->update($validateData);
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
     * @param  \App\Models\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function destroy(Guru $guru)
    {

        $check = $guru->delete();

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