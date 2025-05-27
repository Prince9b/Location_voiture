<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password) || $user->role !== 'admin') {
            return response()->json(['message' => 'Invalid credentials or not an admin'], 401);
        }

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
    
}
