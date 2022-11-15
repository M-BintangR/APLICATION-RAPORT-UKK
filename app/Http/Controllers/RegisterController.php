<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validateData = $request->validate([
            'nama_pengguna' => ['required', 'min:5'],
            'username' => ['required', 'min:5'],
            'password' => ['required', 'min:8'],
        ]);

        $validateData['password'] = bcrypt($validateData['password']);

        $user = User::create($validateData);

        if ($user) {
            return response()->json([
                'data' => $user,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'message' => 'failed',
        ], 402);
    }
}