<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index(){
        // get users with roles
        $users = User::with('roles')->get();
        return response()->json(['message' => 'Get Users Successfully','users'=>$users]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;
            return response()->json(['user' => $user, 'token' => $token]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('register_token')->plainTextToken;

        return response()->json(['user' => $user, 'token_register' => $token]);
    }
    public function getUserName(Request $request)
    {
        $user = $request->user();

        if ($user) {
            return response()->json(['username' => $user->name]);
        } else {
            return response()->json(['message' => 'User Not Found'], 404);
        }
    }

}
