<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class RegisterController extends Controller
{
    public function register(Request $request){
        $validations= Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users|max:255',
            'tel' => 'required|integer|min:8',
            'password' => 'required|min:4'
        ]);

        if($validations->fails()){
            $error= $validations->errors();
            return response()->json([
                'error' => $error,
                'status' => 401,
            ]);
        }

        if($validations->passes()){
            $user= User::create(
                [
                    'name'=> $request->name,
                    'email'=> $request->email,
                    'tel'=>$request->tel,
                    'password'=> Hash::make( $request->password)
                ]
                );
            $token= $user->createToken('token_user')->plainTextToken;
            return response()->json([
                'token'=> $token,
                'type'=> 'Bearer'
            ]);
        }
        
    }
}
