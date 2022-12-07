<?php

namespace App\Http\Controllers;

use App\Models\Tapel;
use Dotenv\Repository\RepositoryInterface;
use Illuminate\Http\Request;

class TapelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Tapel::latest()->get();

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
        ], 404);
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
        $search = Tapel::where('tahun_pelajaran', 'like', "%{$query}%")
            ->orWhere('semester', 'like', "%{$query}%")
            ->orWhere('aktif', 'like', "%{$query}")->latest()->get();

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
        $validateData = $request->validate([
            'tahun_pelajaran' => ['required'],
            'semester' => ['required'],
            'aktif' => ['required'],
        ]);

        if ($validateData) {
            $check = Tapel::create($validateData);
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
     * @param  \App\Models\Tapel  $tapel
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tapel  $tapel
     * @return \Illuminate\Http\Response
     */
    public function edit(Tapel $tapel)
    {
        $item = $tapel;

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
     * @param  \App\Models\Tapel  $tapel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tapel $tapel)
    {
        $validateData = $request->validate([
            'tahun_pelajaran' => ['required'],
            'semester' => ['required'],
            'aktif' => ['required'],
        ]);

        if ($validateData) {
            $check = $tapel->update($validateData);
        }

        if ($check) {
            return response()->json([
                'item' => $check,
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tapel  $tapel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tapel $tapel)
    {
        $check = $tapel->delete();

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