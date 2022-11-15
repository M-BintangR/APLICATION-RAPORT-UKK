<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\CssSelector\Parser\Token;
use TheSeer\Tokenizer\Token as TokenizerToken;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $crendentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if (!auth()->attempt($crendentials)) {
            return response()->json(['message' => 'Unathorized'], 401);
        }
        $user =  User::where('username', $request->username)->first();
        $token = $user->createToken($user->username)->plainTextToken;

        if ($token && $user) {
            return response()->json([
                'token' => $token,
                'user' => $user,
                'message' => 'success'
            ], 200);
        }

        return response()->json([
            'message' => 'failed',
        ], 402);
    }

    public function logout(Request $request)
    {
        $check = auth()->user()->tokens()->delete();

        if ($check) {
            return response()->json(['message' => 'success'], 200);
        }
        return response()->json(['message' => 'failed'], 402);
    }
}