<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use PDO;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = User::all();

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
            'message' => 'Unauthorizaed'
        ], 401);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function show(User $user)
    {
        $item = $user;

        if ($item) {
            return response()->json([
                'message' => 'success',
                'item' => $item,
            ]);
        }

        return response()->json([
            'message' => 'Unauthorizaed',
        ], 401);
    }

    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function search($query)
    {
        $search = User::where('nama_pengguna', 'like', "%{$query}%")
            ->orWhere('username', 'like', "%{$query}%")
            ->orWhere('role', 'like', "%{$query}%")->get();

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
            'nama_pengguna' => ['required'],
            'username' => ['required'],
            'password' => ['required'],
            'role' => ['required'],
        ]);

        $validateData['password'] = bcrypt($validateData['password']);

        if ($validateData) {
            $check = User::create($validateData);
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $item = $user;

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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validateData = $request->validate([
            'nama_pengguna' => ['required'],
            'username' => ['required'],
            'role' => ['required'],
        ]);

        if ($validateData) {
            $check = $user->update($validateData);
        }

        if ($check) {
            return response()->json([
                'item' => $check,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'message' => 'Unauthorizaed'
        ], 401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $check = $user->delete();

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