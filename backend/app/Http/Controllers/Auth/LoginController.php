<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'=> 'required|email',
            'password'=> 'required|min:8'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides',
                'status' => 401
            ], 401);
        }

        $token = $user->createToken('token_login')->plainTextToken;

        return response()->json([
            'token' => $token,
            'type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function index(){
        return $users= User::all();
    }
}
