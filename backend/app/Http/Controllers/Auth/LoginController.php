<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        $credentials= $request-> validate([
            'email'=> 'required|email',
            'password'=> 'required|min:8'
        ]);
        if(Auth::attempt($credentials)){
           $user= User::where('email',$request->email)->firstOrFail();
           $token= $user->createToken('token_login')->plainTextToken;
        
            return response()->json([
                'token'=> $token,
                'status'=> 200,
                'type'=> 'Bearer',
                'user'=> $user
            ])->cookie('jwt', $token);
        }else{
            return response()->json([
                'msg'=> 'non valide',
                'status'=> 401
            ]);
        }
        
    }
}
